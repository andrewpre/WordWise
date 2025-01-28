// import { useSession } from "next-auth/react";

import WordComp from "@/components/ui/word";
import { getUser } from "@/lib/getUser";
import { Word } from "@prisma/client";
import { getAllWords } from "@/lib/wordUtils";

export default async function SignUpPage() {
  const user = await getUser();
  if (!user) {
    return;
  }
  // uwID: Word of that UserWordID
  const allUserWords: Map<string, Word> = await getAllWords(user.id);

  return (
    <main>
      <div>Sign Up Page</div>
      <div className="flex flex-col">
        {Array.from(allUserWords).map(([key, word], index) => (
          <div key={index}>
            <WordComp key={index} UserWordId={key} word={word} />
          </div>
        ))}
      </div>
    </main>
  );
}

/*
const dataUser = await db.user.findFirst({
    where: {
      id: user?.id,
    },
  });
  const dataWord = await db.word.findFirst({
    where: {
      word: "something",
    },
  });
  const dataUserWord = await db.user_Word.findFirst({
    where: {
      userId: dataUser?.id || "",
      wordId: dataWord?.id,
    },
  });

  console.log(dataUser, dataWord, dataUserWord);
  const allUserUserWord = await db.user_Word.findMany({
    where: {
      userId: dataUser?.id,
    },
  });
  const allUserWords: Word[] = [];
  for (const w of allUserUserWord) {
    console.log("w", w);
    const word = await db.word.findFirst({
      where: {
        id: w.id,
      },
    });
    console.log("word", word);
    if (word) {
      allUserWords.push(word);
    }
  }
  console.log("UserWords", allUserWords);
  

*/
