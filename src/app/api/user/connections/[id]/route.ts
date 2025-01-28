import connectDB from "../../../../../db/connect"
import User from "../../../../../models/User"

type Params = Promise<{
    email: string,
    password: string,
}>

export async function GET({params}:{params: Params}){
    try{
        const data = await params;
        await connectDB()
        const foundUser = await User.findOne({email:data.email})
        if(foundUser){
            
        }
    }catch (error){
        console.log(`Specific API Error: ${error}`)
    }
}