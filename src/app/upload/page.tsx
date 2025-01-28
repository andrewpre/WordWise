import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Upload from "@/components/ui/upload";
import { db } from "@/db/db";
import { getUser } from "@/lib/getUser";
export default async function UploadPage() {
  //   function to get the user
  const user = await getUser();

  async function uploadWord(word: string) {
    // given word -> upload it to database
    if (!user) {
      return;
    }
    // call API Endpoint
    // if good -> delete from total words and keep calling for other words
    // else -> give an error saying that the "word" couldnt be found and delete it and try again
    return;
  }

  async function uploadSynonyms(word: string) {
    // given word -> find 3 synonyms and upload it to database
    if (!user) {
      return;
    }
    return;
  }

  return (
    <main className="border border-red-600 flex flex-row justify-center ">
      <Upload user={user} />
    </main>
  );
}

/*

<Card>
            <CardTitle>Upload Your Words Here To Practice Them!</CardTitle>
            <CardHeader>Header</CardHeader>
            <CardContent>
              Here is the content | Option 1: File | Option 2: Manual Adding
            </CardContent>
            <CardFooter>Footer</CardFooter>
          </Card>

*/
