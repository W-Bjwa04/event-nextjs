import connectDB from "@/lib/mongodb"
import { NextRequest, NextResponse } from "next/server"
import Event from "@/database/event.model";

type Props = {
    params :{
        slug:string
    }
}


export async function GET(req:NextRequest, props: Props){
    try {

        await connectDB()

        // 1. AWAIT PARAMS: unwraps the Promise to get the actual object
        const params = await props.params
        const slug = params.slug


        // 2. Query the Database
        const event = await Event.findOne({ slug });

        if (!event) {
            return NextResponse.json(
              { message: "Event not found" },
              { status: 404 }
            );
          }
      
          // 3. Return the data
          return NextResponse.json(
            { message: "Success", event },
            { status: 200 }
          );

        
    } catch (error:any) {
        return NextResponse.json({
            message:"Error fetching event",
            error: error.message
        },{ status: 500 })
    }
}