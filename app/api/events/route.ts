import connectDB from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"
import Event from "@/database/event.model"
export async function POST(req:NextRequest){
    try {
        
        // connect to db 
        await connectDB()

        // get form data
        const formData = await req.formData()

        let event;

        //parse the form data 

        try {
            event = Object.fromEntries(formData.entries())
            const createEvent = await new Event(event)

            return NextResponse.json(
                {
                    message:"Event Created Successfully",
                    event:createEvent
                }, {
                    status:201
                }
            )

        } catch (e) {   
            return NextResponse.json({
                message:"Invalid Form Data",
                error: e instanceof Error ? e.message : "Invalid JSON Form Data"
            },{status:400})
        }


    } catch (e) {
        console.log(e)
        return NextResponse.json({message:"Event Creation Failed",error: e instanceof Error ? e.message : "Unknown Error"
        },{status:500})
    }
}