import { NextRequest, NextResponse} from "next/server";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db";

export async function POST(request: NextRequest){
    try {
        const {email, password} = await request.json();

        if(!email || !password){
            return NextResponse.json(
                {error:"Email and Password are required"},
                {status:400}
            )
        }

        await connectToDatabase()

        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json(
                {error:"user already register"},
                {status:400}
            )
        }
9
        await User.create({
            email, 
            password
        })

         return NextResponse.json(
                {message:"user registered successfully"},
                {status:200}
            )
    } catch (error) {
        console.error("Regsiter error=> ",error);
        
        return NextResponse.json(
                {error:"user registered faild"},
                {status:500}
            )
    }
}