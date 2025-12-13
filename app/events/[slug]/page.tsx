import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const EventDetailsPage = async ({ params }: {params:Promise<{slug:string}>}) => {
  const {slug} = await params
  const response = await fetch(`${BASE_URL}/api/events/${slug}`)
  const {event} = await response.json

  return (
   <section id="even">
    <h1>
      Events Details: <br/> {slug}
    </h1>

   </section>
  );
};
export default EventDetailsPage;
