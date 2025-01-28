import { Synonyms, Word } from "@prisma/client";
import { db } from "@/db/db";

// : Promise<Map<string, Word>>
export async function getAllSynonyms(
  currWord: Word,
  skip: number,
  index: number,
  SYNONYMS: number
) {
  let WordSynonyms: Synonyms[] = await db.synonyms.findMany({
    where: {
      wordId: currWord.id,
    },
  });
  if (WordSynonyms.length === 0) {
    // fetch synonym API and put into WordSynonyms
    // fetch("");
    WordSynonyms = [];
    for (let i = 0; i < SYNONYMS; i++) {
      const syn = await db.synonyms.create({
        data: {
          wordId: currWord.id,
          synonym: `${currWord.word}${i}`,
        },
      });
      WordSynonyms.push(syn);
    }
  }
  WordSynonyms.sort();
  const retArray = [];
  let newSkip = 0;
  for (const synonym of WordSynonyms) {
    const newId = index + newSkip;
    newSkip += skip;
    retArray.push({ word: synonym.synonym, id: index });
  }
  return retArray;
}
