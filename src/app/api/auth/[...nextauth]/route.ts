import NextAuth from "next-auth";
import { options } from "@/auth/options";

export const handler = NextAuth(options)

export { handler as GET, handler as POST };