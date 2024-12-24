import { NextResponse } from "next/server";

import dbConnect from "../../../../lib/db/connect";
import Accounts from "../../../../lib/db/models/account"


export async function GET() {
    await dbConnect()
    const accounts= await Accounts.find()
    
    return NextResponse.json({accounts},{status:200})

}