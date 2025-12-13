import connectDB from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"
import Event from "@/database/event.model"
import {v2 as cloudinary } from "cloudinary"
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

            // get the image file blob

            const file = formData.get("image") as File

            if(!file) return NextResponse.json({message:"Image file is required"},{status:400})

            // convert the blob to buffer 

            const arrayBuffer = await file.arrayBuffer()

            const buffer = Buffer.from(arrayBuffer)

            // upload to the cloudnary 

            const uploadResult = await new Promise((resolve, reject)=>{
                cloudinary.uploader.upload_stream({
                    resource_type:"image",
                    folder:"DevEvent"
            }, (error, results)=>{
                if(error) return reject(error)
                resolve(results)
            }).end(buffer)
            })    // returns a public url of the image 

            event.image = (uploadResult as {secure_url:string}).secure_url

 
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