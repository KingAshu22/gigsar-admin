import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Artist from "@/models/Artist";
import { connectToDB } from "@/app/_utils/mongodb";
import { normalizeContactVisibility } from "@/lib/contactVisibility";

export async function GET(req, { params }) {
  if (!auth().userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDB();
  const artist = await Artist.findOne(
    { linkid: params.linkid },
    { name: 1, linkid: 1, contact: 1, email: 1, contactVisibility: 1 }
  ).lean();

  if (!artist) {
    return NextResponse.json({ error: "Artist not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...artist,
    contactVisibility: normalizeContactVisibility(artist.contactVisibility),
  });
}

export async function PUT(req, { params }) {
  if (!auth().userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const contactVisibility = normalizeContactVisibility(body.contactVisibility);

  await connectToDB();
  const result = await Artist.updateOne(
    { linkid: params.linkid },
    { $set: { contactVisibility } }
  );

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Artist not found" }, { status: 404 });
  }

  return NextResponse.json({ contactVisibility });
}
