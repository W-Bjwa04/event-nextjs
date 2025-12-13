import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";



async function handleImageUpload(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "DevEvent",
      },
      (error, result) => {
        if (error) {
          return reject(new Error(`Image upload failed: ${error.message}`));
        }
        if (!result) {
            return reject(new Error("Image upload failed: No result from Cloudinary."));
        }
        resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}

export async function POST(req: NextRequest) {
    try {
      await connectDB();
  
      const formData = await req.formData();
  
      // 1. Check for Image
      const file = formData.get("image") as File | null;
      if (!file) {
        return NextResponse.json(
          { message: "Image file is required" },
          { status: 400 }
        );
      }
  
      // 2. Upload Image
      const uploadResult = await handleImageUpload(file) as { secure_url: string };
  
      // 3. Extract and Clean Data
      const agendaStr = formData.get("agenda") as string;
      const tagsStr = formData.get("tags") as string;
      
      // FIX: Normalize 'mode' to lowercase to match Schema enum ("Hybrid" -> "hybrid")
      const rawMode = formData.get("mode") as string;
      const cleanMode = rawMode ? rawMode.toLowerCase() : "";
  
      const eventData = {
        title: formData.get("title") as string,
        slug: formData.get("slug") as string,
        description: formData.get("description") as string,
        overview: formData.get("overview") as string, // Make sure this key exists in Postman!
        venue: formData.get("venue") as string,
        location: formData.get("location") as string,
        date: formData.get("date") as string,
        time: formData.get("time") as string,         // Make sure this key exists in Postman!
        mode: cleanMode,                              // Uses the lowercase version
        audience: formData.get("audience") as string,
        organizer: formData.get("organizer") as string,
        agenda: agendaStr ? JSON.parse(agendaStr.replace(/'/g, '"')) : [],
        tags: tagsStr ? JSON.parse(tagsStr.replace(/'/g, '"')) : [],
        image: uploadResult.secure_url,
      };
  
      const newEvent = new Event(eventData);
      await newEvent.save();
  
      return NextResponse.json(
        { message: "Event Created Successfully", event: newEvent },
        { status: 201 }
      );
  
    } catch (e: any) {
      console.error("Event creation error:", e);
      return NextResponse.json(
        {
          message: "Event Creation Failed",
          error: e.message,
          validationErrors: e.errors, 
        },
        { status: 500 }
      );
    }
}

// get all events 

export async function GET(){
    try {
        await connectDB();
        const events = await Event.find().sort({createdAt:-1});
        return NextResponse.json({
            message:"Events Fetch Successfully",
            events: events
        }, {
            status:200
        })
        
    } catch (e: any) {
        return NextResponse.json({
            message:"Error in fetching the events",
            error: e.message,
        }, {
        status: 500 
        })
    }
}
