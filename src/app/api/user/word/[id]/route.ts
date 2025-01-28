/*
Given userID and word:
    1. Check if word is in word (if not add it)
    2. Add word to User_Word (given wordID and userID) 
    3. Add word to userWords (User)
    4. Find synonyms and add those to Synonyms
    5. If anything fails return an error 500 with the error message
*/

import { db } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { User_Word } from "@prisma/client";

type Params = Promise<{
  id: string;
}>;
// posting
export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;
  try {
    const myJson = await request.json();
    // get definition here
    const wordDB = await db.word.upsert({
      create: { word: myJson, definition: "" },
      update: {},
      where: { word: myJson },
    });
    console.log(`WordID For '${wordDB.word}' is '${wordDB.id}'`);
    if (!wordDB) {
      return NextResponse.json(
        { error: `Internal server error` },
        { status: 500 }
      );
    }

    // access the user_word database and add the word
    let user_word: User_Word | null = await db.user_Word.findFirst({
      where: {
        wordId: wordDB.id,
        userId: id,
      },
    });
    if (!user_word) {
      // create it here
      console.log(`User_Word Not Found For '${wordDB.word}'`);
      user_word = await db.user_Word.create({
        data: {
          wordId: wordDB.id,
          userId: id,
        },
      });
      if (!user_word) {
        return NextResponse.json(
          { error: `Internal server error` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ message: "Done!" }, { status: 200 });
  } catch (error) {
    // console.log(`Error: ${error}`);
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}

// get all wordId for given user
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = await params;
  return NextResponse.json({ message: [] }, { status: 200 });

  //   return NextResponse.json(
  //     { error: `Internal server error: ${error}` },
  //     { status: 500 }
  //   );
}
