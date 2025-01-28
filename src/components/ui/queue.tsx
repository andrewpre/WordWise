import { Word } from "@prisma/client";
import React from "react";

type Props = {
  wordArray: Word[];
};

function Queue({ wordArray }: Props) {
  return (
    <section className="border border-black w-fit px-5 text-center">
      <b>Up Next:</b>
      <div className="flex flex-col space-y-2">
        {wordArray.map((d, index) => (
          <div key={index}>{d.word}</div>
        ))}
      </div>
    </section>
  );
}

export default Queue;
