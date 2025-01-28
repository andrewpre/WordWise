import type { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"

export const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: "Email", type: "email", placeholder: "Email*"},
                password: {label: "Password", type: "password", placeholder: "Password*"}
            },
            async authorize(credentials, req){
                // get credentials
                const user = {id:"42", username:"andrewpre@gmail.com", password: "duktom"}
                if (credentials?.username === user.username && credentials?.password === user.password){
                    return user
                }else{
                    return null
                }
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                //   })
                //   const user = await res.json()
            
                //   // If no error and we have user data, return it
                //   if (res.ok && user) {
                //     return user
                //   }
                //   // Return null if user data could not be retrieved
                //   return null
            }
        })
    ],

}