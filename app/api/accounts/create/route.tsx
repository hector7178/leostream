

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/db/connect";
import Accounts from "../../../../lib/db/models/account"
export async function POST(request: NextRequest) {
    const {token,id,email}:{email:string,token:string,id:string}= await request.json()
    await dbConnect()
    const listaccount=await Accounts.find({email})

    if(listaccount.length>0){

        const update= await Accounts.findOneAndUpdate({email}, {id, access_token:token, email})
        return NextResponse.json({msj:"cuenta actualizada",update},{status:200})
    }

    if(token !== "undefined" && typeof id !== "undefined" && typeof email !== "undefined" ){
        const newAccount= await Accounts.create({id, access_token:token, email})
            
        return NextResponse.json({msj:newAccount},{status:200})
    }

    return NextResponse.json({msj:"Error al Crear cuenta"},{status:400})
    
}


