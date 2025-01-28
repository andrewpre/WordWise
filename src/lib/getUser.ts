import { getServerSession } from "next-auth";
import { User } from "@prisma/client";
import { db } from "@/db/db";

const session = await getServerSession();

export async function getUser(): Promise<User | null> {
  const sessionEmail = session?.user?.email;
  if (!sessionEmail) {
    return null;
  }
  const foundUser = await db.user.findFirst({
    where: { email: sessionEmail },
  });
  if (!foundUser) {
    //user is none
    console.log("User not found. Creating new user...");
    const newUser = await db.user.create({
      data: {
        name: session?.user?.name,
        email: sessionEmail,
      },
    });
    return newUser;
  }
  console.log("User found. Returning user...");
  console.log(foundUser);
  return foundUser;
}
