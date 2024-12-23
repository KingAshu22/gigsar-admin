import { NextResponse } from "next/server";
import { connectToDB } from "@/app/_utils/mongodb";
import Event from "@/models/Event";

// Ensure the database connection is established
await connectToDB();

// POST: Create a new event
export async function POST(req) {
  try {
    // Parse the request body
    const { name, date, location, flyer, seats } = await req.json();

    // Validate the input
    if (!name || !date || !location || !flyer || !seats || !seats.length) {
      return NextResponse.json(
        {
          error:
            "All fields (name, date, location, flyer and seats) are required",
        },
        { status: 400 }
      );
    }

    const slug = name.replace(/ /g, "-").toLowerCase();

    // Create a new event
    const newEvent = await Event.create({
      name,
      slug,
      date,
      location,
      flyer,
      seats,
    });

    // Return the created event
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

// GET: Fetch all events
export async function GET() {
  try {
    // Fetch all events from the database
    const events = await Event.find();

    // Return the events
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
