

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/db/connect";
import { lucia } from "../../../../lib/auth";
import { cookies } from "next/headers";
import User from "../../../../lib/db/models/user";

export async function POST(request: NextRequest) {
    const {username, password}:{username:string,password:string}= await request.json()
    await dbConnect();
    const existingUser = await User.findOne({ username: username, password:password });

   if(!existingUser){
    return NextResponse.json({response:"Usuario no encontrado"},{status:400})
   }
    const session = await lucia.createSession(existingUser._id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return NextResponse.json({response:"Sesion iniciada"},{status:200})
    
}






