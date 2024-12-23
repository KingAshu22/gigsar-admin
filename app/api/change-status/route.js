import { NextResponse } from "next/server";
import { connectToDB } from "@/app/_utils/mongodb";
import Artist from "@/models/Artist";

connectToDB;

export async function PUT(req) {
  const { _id } = req.body;

  try {
    // Find the artist by _id
    const artist = await Artist.findById(_id);

    if (!artist) {
      return NextResponse.status(404).json({ error: "Artist not found" });
    }

    // Toggle the value of showGigsar
    artist.showGigsar = !artist.showGigsar;

    // Save the updated artist
    await artist.save();

    // Send back the updated artist
    NextResponse.status(200).json({ artist });
  } catch (error) {
    console.error(error);
    return NextResponse.error("Server Error", { status: 500 });
  }
}
