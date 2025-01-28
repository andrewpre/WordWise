"use client";
import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

import { User } from "@prisma/client";
import { toast } from "sonner";

type Props = {
  user: User | null;
};

function Upload({ user }: Props) {
  const [words, setWords] = useState<string[]>([]);
  const [currWord, setCurrWord] = useState("");
  const submitSuccessToast = (word: string) => {
    toast.success(`The word "${word}" has been added!`);
  };

  async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const submitErrorToast = (msg: string) => {
    toast.error(msg);
  };

  const submitWordButton = () => {
    console.log("Submit Word Button");
    const ws = words;
    // const curW = currWord.toLowerCase().trim();
    if (currWord.length <= 0) {
      submitErrorToast(
        `The word "${currWord}" has not been added! Please try another word or try again later!`
      );
      return;
    }
    ws.push(currWord);
    setWords([...ws]);
    submitSuccessToast(currWord);
  };

  async function uploadWords() {
    console.log("Current Words:", words);
    const len = words.length;
    let failed = false;
    for (let i = 0; i < len; i++) {
      const word = words.shift();
      if (word && user) {
        // call API here -> if error save it on the list
        const response = await fetch(`/api/user/word/${user.id}`, {
          method: "POST",
          body: JSON.stringify(word),
        });
        const data = await response.json();
        console.log(response, data);
        if (!response.ok) {
          failed = true;
          words.push(word);
          setWords([...words]);
          continue;
        }
        console.log("shifted word:", word);

        setWords([...words]);
        await sleep(3000);
      }
    }
    if (failed) {
      // create a toaster saying the following words have failed
      submitErrorToast(
        `The following words have failed: ${[
          ...words,
        ]}. Please use other words or try again later.`
      );
    }
  }

  return (
    <div className="flex flex-col items-center min-w-full px-64">
      {user != null ? `Hello ${user.name}` : ""}
      <h1 className="text-2xl">Added Words:</h1>
      <section className="grid grid-cols-10 min-h-64 min-w-full border border-black">
        {words.map((word, index) => (
          <div key={index}>{word}</div>
        ))}
      </section>
      <div className="flex w-full max-w-sm items-center space-x-2 border border-black">
        <Input
          type="secondary"
          onChange={(e) => {
            setCurrWord(e.target.value);
          }}
        />
        <Button type="submit" onClick={submitWordButton}>
          Add Word
        </Button>
      </div>
      <Button
        type="submit"
        className="border border-black"
        onClick={uploadWords}
      >
        Add All Words
      </Button>
    </div>
  );
}

export default Upload;
