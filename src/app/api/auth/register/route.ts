import { NextRequest } from "next/server";

export default async function POST(req:NextRequest) {
    try{
        const {email, password} = await req.json();
        console.log({email, password})
    }catch (error){
        console.log("Register Request Error: ",error)
    }
}