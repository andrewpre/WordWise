"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type Props = {
  word: string;
  id: number;
  changeGameState: (id: number) => string;
  gameState: string;
  index: number;
};

function Gamecard(prop: Props) {
  // each button has their own state
  // not-clicked - clicked - finished - reset - game-restart
  const { id, word, changeGameState, gameState, index } = prop;
  const [c, setC] = useState("");

  useEffect(() => {
    if (gameState === "not-clicked") {
      setC("");
    } else if (gameState === "clicked") {
      setC("border border-black");
    } else if (gameState === "finished") {
      setC("border border-red-500");
    }
  }, [gameState]);

  const clicked = () => {
    if (gameState === "clicked") {
      return;
    }
    changeGameState(index);
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn("flex w-full rounded-none", c)}
        onClick={clicked}
      >
        <div>{word}</div>
      </Button>
    </>
  );
}

export default Gamecard;
