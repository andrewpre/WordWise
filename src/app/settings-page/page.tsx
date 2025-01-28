import { Word } from "@prisma/client";
import { getAllWords } from "@/lib/wordUtils";
import { getUser } from "@/lib/getUser";
import WordComp from "@/components/ui/word";

export default async function SettingsPage() {
  const user = await getUser();
  if (!user) {
    return;
  }
  const allUserWords: Map<string, Word> = await getAllWords(user.id);

  return (
    <main>
      <h1 className="text-4xl font-bold text-center">Setting Page</h1>
      <section className="flex justify-center space-x-5">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold"> Update User Information</h1>
          <div>Username</div>
          <div>Password</div>
          <div>Email</div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold">Update Account Words</h1>
          {Array.from(allUserWords).map(([key, word], index) => (
            <div key={index}>
              <WordComp key={index} UserWordId={key} word={word} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
