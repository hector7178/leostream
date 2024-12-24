

import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../../lib/db/connect";
import Accounts from "../../../lib/db/models/account"


export async function POST(request: NextRequest) {

    try {
        const {email}:{email:string}= await request.json()
        await dbConnect()
        const findAccount= await Accounts.find({email})
    
        if(findAccount.length<1){
            return NextResponse.json({msj:"error no se encontro la cuenta"},{status:400})
        }
        
    
        const labels= await fetch(`https://gmail.googleapis.com/gmail/v1/users/${findAccount[0].id}/labels?access_token=${findAccount[0].access_token}`, {
            headers: {
                Authorization: `Bearer ${findAccount[0].access_token}`,
                Accept: 'application/json'
            }}
         )
        const labelsGmail= await labels.json()
    
        console.log("LABELS", labelsGmail)
        const fetchgmail= await fetch(`https://gmail.googleapis.com/gmail/v1/users/${findAccount[0].id}/messages?q=from:Netflix • info@account.netflix.com&access_token=${findAccount[0].access_token}`, {
            headers: {
                Authorization: `Bearer ${findAccount[0].access_token}`,
                Accept: 'application/json'
            }}
         )
        const dataGmail= await fetchgmail.json()
         
        if(!dataGmail.messages){
            return NextResponse.json({response:"No se encontraron mensajes"},{status:400})
        }
        let data;
    
        for (let index = 0; index < 6; index++) {
            const element = dataGmail.messages[index];
    
            const fetchmsg= await fetch(` https://gmail.googleapis.com/gmail/v1/users/${findAccount[0].id}/messages/${element.id}?access_token=${findAccount[0].access_token}`, {
            headers: {
                Authorization: `Bearer ${findAccount[0].access_token}`,
                Accept: 'application/json'
            }}
            )
            const msg = await fetchmsg.json()
            const buff = new Buffer(msg.payload.parts[0].body.data, 'base64');
            const text = buff.toString('utf8');
    
            if( text.includes("acceso temporal")){
                data=text
            }else{
                return NextResponse.json({error:"No se encontraron mensajes"},{status:400})
            }
        
    
        }
    
        return NextResponse.json({data},{status:200})
    
    } catch (error) {
        console.log('error', error);
        return NextResponse.json({response:"Error"},{status:400})
    }
   

}


