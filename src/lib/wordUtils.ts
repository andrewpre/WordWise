import { Word, User_Word } from "@prisma/client";
import { db } from "@/db/db";

export async function getAllWords(userID: string): Promise<Map<string, Word>> {
  const UserWords = await db.user_Word.findMany({
    where: {
      userId: userID,
    },
  });
  const wordIDs: User_Word[] = [];
  const retval: Map<string, Word> = new Map();
  UserWords.forEach((uw) => {
    wordIDs.push(uw);
  });
  for (const uw of wordIDs) {
    const word = await db.word.findFirst({ where: { id: uw.wordId } });
    if (word) {
      retval.set(uw.id, word);
    }
  }
  return retval;
}
