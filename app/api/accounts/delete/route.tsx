

import { NextResponse } from "next/server";

import dbConnect from "../../../../lib/db/connect";

export async function POST() {
    await dbConnect()
    
    return NextResponse.json({msj:"Error al Crear cuenta"},{status:200})
    
}


