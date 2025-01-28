import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../db/connect";
import User from "../../../../models/User";
import { generate_key } from "../../../../lib/crypto";

// const response = await fetch(`/api/user/connections/${id}`, { method: 'DELETE' });
export async function GET(){
    try{
        await connectDB()
        const foundUser = await User.find();
        console.log(foundUser)
        return NextResponse.json({data: foundUser},{status:200})
    } catch (error){
        console.log(`Error: ${error}`)
        return NextResponse.json({error: 'Internal server error'},{status:500})
    }
}

export async function POST(request: NextRequest){
    try{
        await connectDB()
        const data = await request.formData();

        // create sessionToken
        // insert with sessionToken
        // store username
        // store hashed password
        const sessionToken = generate_key()
        
        const newUser = await User.insertMany({email:data.get('email'), password:data.get('password'), sessionToken:sessionToken})
        console.log(newUser)
        // return sessionID
        return NextResponse.json({session:sessionToken},{status:200})
    } catch (error){
        console.log(`Error: ${error}`)
        return NextResponse.json({error: 'Internal server error'},{status:500})
    }
}