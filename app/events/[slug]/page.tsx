import Image from "next/image";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


// EventDetailItem Component

const EventDetailItem = ({icon, alt, label}:{icon:string, alt:string, label:string})=>(
  <div className="flex-row-gap-2 items-center">
    <Image src={icon} alt={alt} width={17} height={17} />
    <p>{label}</p>
  </div>
)

// EventAgenda Component

const EventAgenda = ({agendaItems}: {agendaItems:string[]})=>(
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item)=>(
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
)

// EventTags

const EventTags = ({tags}: {tags:string[]})=>(
  
)


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const EventDetailsPage = async ({ params }: {params:Promise<{slug:string}>}) => {
  const {slug} = await params
  const response = await fetch(`${BASE_URL}/api/events/${slug}`)
  const {event: {description , image , overview , date , time , location, mode, agenda , audience, organizer }} = await response.json()

  if (!description) return notFound()

  return (
   <section id="event">
    <div className="header">
      <h1>
        Events Details
      </h1>
      <p>{description}</p>
    </div>
    <div className="details">
      
      {/* Left Side - Event Content  */}
      <div className="details">
        <div className="content">
            <Image src={image} alt="Event Banner" width={800} height={800}
            className="banner" />

            <section className="flex-col-gap-2">
              <h2>Overview</h2>
              <p>{overview}</p>
            </section>

            {/* event detail items */}

            <section className="flex-col-gap-2">
                <h2>Event Details</h2>
                <EventDetailItem  icon={'/icons/calendar.svg'} alt="calendar"
                label={date}
                />
                <EventDetailItem  icon={'/icons/clock.svg'} alt="clock"
                label={time}
                />
                <EventDetailItem  icon={'/icons/pin.svg'} alt="pin"
                label={location}
                />
                <EventDetailItem  icon={'/icons/mode.svg'} alt="mode"
                label={mode}
                />
                <EventDetailItem  icon={'/icons/audience.svg'} alt="audience"
                label={audience}
                />
            </section>

            {/* Event Agenda  */}
            <EventAgenda
              agendaItems={agenda}
            />

            {/* organizer of event  */}

            <section className="flex-col-gap-2">
                <h2>
                  About the organizer
                </h2>
                <p>{organizer}</p>
            </section>

        </div>
      </div>

      {/* Right Side - Booking Form  */}
      <aside className="booking">
        <p className="text-lg font-semibold">Book Event</p>
      </aside>

    </div>
   </section>
  );
};
export default EventDetailsPage;
