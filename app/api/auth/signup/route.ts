

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/db/connect";
import { lucia } from "../../../../lib/auth";
import { cookies } from "next/headers";
import User from "../../../../lib/db/models/user";

export async function POST(request: NextRequest) {
    
    try {
        
        const {username, password}:{username:string,password:string}= await request.json()
        await dbConnect();

        const users= await User.find()
        users.forEach((element)=>{
            if(element.username == username){
                return NextResponse.json({msj:"error ya el usuario existe"}, )
            }
        })
        const user = await User.create({
          username: username,
          password: password,
        });
     
        const session = await lucia.createSession(user._id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
        return NextResponse.json({response:"usuario Creado"})
      } catch (e) {
        console.log('error', e);
        return NextResponse.json({response:"Error"},{status:400})
      }
    
    
}





