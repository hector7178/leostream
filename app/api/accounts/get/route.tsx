import { NextResponse } from "next/server";

import dbConnect from "../../../../lib/db/connect";
import Accounts from "../../../../lib/db/models/account"


export async function GET() {

    try {
          await dbConnect()
    const accounts= await Accounts.find()
    
    return NextResponse.json({accounts},{status:200})
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({response:"Error"},{status:400})
    
    }
  

}