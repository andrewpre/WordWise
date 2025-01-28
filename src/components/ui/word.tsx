"use client";
import { Word } from "@prisma/client";
import React from "react";
import { Button } from "./button";
import { toast } from "sonner";
type props = {
  UserWordId: string;
  word: Word;
};

function WordComp(props: props) {
  async function deleteThisWord() {
    console.log("Deleting Word");
    console.log(props.word);
    const response = await fetch(`/api/user/user_word/${props.UserWordId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log("Failed Deleting Word");
      toast.error(`Failed to delete '${props.word.word}'`);
      return;
    }
    toast.success(`Deleted '${props.word.word}'`);
    return;
  }
  function seeDefinition() {
    console.log(`Seeing definition of '${props.word.word}'`);
    toast(`Seeing definition of '${props.word.word}'`);
  }

  return (
    <div>
      <Button onClick={seeDefinition}>{props.word.word}</Button>
      <Button onClick={deleteThisWord}>Delete</Button>
    </div>
  );
}

export default WordComp;
