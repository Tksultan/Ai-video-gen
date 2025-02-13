import { ChatSession } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req){
  try{
    const {prompt} = await req.json()
    console.log(prompt);

    const result = await ChatSession.sendMessage(prompt);
    console.log(result.responce.text());
    return NextResponse.json({'result':JSON.parse(result.responce.text())})
  }catch(e){
      return NextResponse.json({'Error:':e})
  }
}