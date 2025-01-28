import { db } from "@/db/db";
import { User_Word } from "@prisma/client";
import { NextResponse } from "next/server";

type Params = Promise<{
  id: string;
}>;

export async function DELETE(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const isFound = await db.user_Word.findFirst({ where: { id: id } });
  if (!isFound) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  const delUserWord: User_Word = await db.user_Word.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ message: delUserWord }, { status: 200 });
}
