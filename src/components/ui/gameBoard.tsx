"use client";
import { useState } from "react";
import Gamecard from "@/components/ui/gamecard";
import { Button } from "@/components/ui/button";
import { Word } from "@prisma/client";

type Props = {
  wordTestData: {
    word: Word;
    cn: string;
  }[];
  testData: {
    word: string;
    id: number;
    index: number;
  }[];
  WORD_COUNT: number;
  SYNONYMS: number;
};

function GameBoard({ testData, WORD_COUNT, wordTestData, SYNONYMS }: Props) {
  const [data, setData] = useState(testData);
  // Array(X).fill(Y) -> fills X array with Y values
  // sets up the states of each gameCard
  const [gameState, setGameState] = useState(
    Array(testData.length).fill("not-clicked")
  );

  // checks for any buttons that have been clicked
  function createClickedArray(gs: string[]): { index: number; id: number }[] {
    const clickedArray = [];
    for (let i = 0; i < gameState.length; i++) {
      if (gs[i] === "clicked") {
        clickedArray.push({ index: testData[i].index, id: testData[i].id });
      }
    }
    return clickedArray;
  }

  function checkForSynonyms(
    clickedArray: { index: number; id: number }[],
    gs: string[]
  ): void {
    if (clickedArray.length === SYNONYMS) {
      // check if they are all good
      let allEqual = true;

      // clicked check
      const start = clickedArray[0].id;
      for (const i of clickedArray) {
        if (i.id !== start) {
          allEqual = false;
        }
      }
      for (const i of clickedArray) {
        if (allEqual) {
          gs[i.index] = "finished";
          changeFoundWord(i.id);
        } else {
          gs[i.index] = "not-clicked";
        }
      }
    }
  }

  const playAgain = () => {
    const gs = gameState;
    const clicked = gs.findIndex((data) => data === "not-clicked");
    if (clicked === -1) {
      for (let i = 0; i < gs.length; i++) {
        gs[i] = "not-clicked";
      }
      setGameState([...gs]);
      for (let i = 0; i < wordTestData.length; i++) {
        wordTestData[i].cn = "";
      }
    }
  };

  const changeGameState = (index: number) => {
    const gs = gameState; //array
    const id_state = gameState[index]; //string
    // not-clicked - clicked - finished - reset - game-restart
    let newState = "clicked";
    if (id_state === "not-clicked") {
      newState = "clicked";
      gs[index] = newState;
      const clickedArray = createClickedArray(gs);
      // checks for synonyms and if they are it sets state to 'found' else 'not-clicked'
      checkForSynonyms(clickedArray, gs);
      setGameState([...gs]);
    }

    return newState;
  };

  const shuffle = () => {
    data.sort(() => Math.random() - 0.5);
    setData([...data]);
  };

  const changeFoundWord = (index: number) => {
    wordTestData[index].cn = "text-red-500";
  };

  return (
    <main className="flex flex-col items-center border border-black ">
      <section>
        <h1 className="text-center text-2xl"> Words </h1>
        <b className="flex flex-row space-x-6 text-2xl">
          {wordTestData.map((word, index) => (
            <div className={word.cn} key={index}>
              {word.word.word}
            </div>
          ))}
        </b>
      </section>
      <section className="border border-red-500 grid grid-cols-3 w-[600px]">
        {data.map((word, index) => (
          <div key={index}>
            <Gamecard
              word={word.word}
              id={word.id}
              index={word.index}
              changeGameState={changeGameState}
              gameState={gameState[word.index]}
            />
          </div>
        ))}
      </section>
      <Button onClick={shuffle}> Shuffle The Array</Button>
      <Button onClick={shuffle}> Shuffle The Queue</Button>
      <Button onClick={playAgain}>Play Again!</Button>
      {/* <Button onClick={removeOne}> Remove One From Array</Button> */}
    </main>
  );
}

export default GameBoard;
