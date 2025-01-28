import GameBoard from "@/components/ui/gameBoard";
import Queue from "@/components/ui/queue";
import { getServerSession } from "next-auth";
import { getUser } from "@/lib/getUser";
import { Word } from "@prisma/client";
import { getAllWords } from "@/lib/wordUtils";
import { getAllSynonyms } from "@/lib/synonymUtils";
import { toast } from "sonner";

type UserWordData = {
  word: Word;
  cn: string;
};

type Synonyms = {
  word: string;
  id: number;
  index: number;
};

const WORD_COUNT = 3;
const SYNONYMS = 3;

export default async function GamePage() {
  const session = await getServerSession();
  const user = await getUser();
  if (!user) {
    return;
  }
  const allUserWordsMap: Map<string, Word> = await getAllWords(user.id);
  const UserWords: Word[] = [];
  for (const [, v] of allUserWordsMap) {
    UserWords.push(v);
  }
  console.log("Session", session);
  console.log("User", user);

  // get data from server
  async function getUserWords(): Promise<UserWordData[]> {
    // maybe get the last seen here?
    if (!user) {
      return [];
    }

    const retArray: UserWordData[] = [];
    for (const [, word] of allUserWordsMap) {
      retArray.push({ word: word, cn: "" });
    }
    return retArray;
  }

  async function getSynonymWords(wordData: Word[]): Promise<Synonyms[]> {
    // will get the synonyms from the database

    const retArray: Synonyms[] = [];
    let currId = 0;
    for (let i = 0; i < wordData.length; i++) {
      const currWord = wordData[i];
      const syns = await getAllSynonyms(currWord, WORD_COUNT, i, SYNONYMS);
      if (syns) {
        for (const s of syns) {
          retArray.push({ word: s.word, id: s.id, index: currId });
          currId++;
        }
      } else {
        toast.error("ERROR IN GETSYNONYM WORDS");
        return [];
      }
    }
    return retArray;
  }

  const userWordData: UserWordData[] = await getUserWords();
  const synonymWordData: Synonyms[] = await getSynonymWords(
    UserWords.slice(0, WORD_COUNT)
  );

  return (
    <main className="flex flex-row justify-evenly h-screen">
      <div className="flex h-fit">
        <GameBoard
          testData={synonymWordData.slice(0, WORD_COUNT * SYNONYMS)}
          wordTestData={userWordData.slice(0, WORD_COUNT)}
          WORD_COUNT={WORD_COUNT}
          SYNONYMS={SYNONYMS}
        />
        <Queue wordArray={UserWords.slice(WORD_COUNT)} />
      </div>
    </main>
  );
}
