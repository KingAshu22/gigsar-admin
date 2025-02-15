import { NextResponse } from "next/server";
import { connectToDB } from "@/app/_utils/mongodb";
import GigsarBlog from "@/models/GigsarBlog";

// Ensure the database connection is established
await connectToDB();

// GET: Fetch all blogs
export async function GET() {
  try {
    // Fetch all blogs from the database
    const blogs = await GigsarBlog.find();

    // Return the blogs
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    // Parse the request body
    const {
      metaTitle,
      metaDescription,
      keywords,
      pageTitle,
      link,
      videos,
      content,
    } = await req.json();

    // Validate the input
    if (
      !metaTitle ||
      !metaDescription ||
      !keywords ||
      !pageTitle ||
      !link ||
      !videos ||
      !content
    ) {
      return NextResponse.json(
        {
          error:
            "All fields (metaTitle, metaDescription, keywords, pageTitle, link, videos and content) are required",
        },
        { status: 400 }
      );
    }

    const linkid = pageTitle.replace(/ /g, "-").toLowerCase();

    // Create a new Blog
    const newBlog = await GigsarBlog.create({
      metaTitle,
      metaDescription,
      keywords,
      linkid,
      pageTitle,
      link,
      videos,
      content,
    });

    // Return the created Blog
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating Blog:", error);
    return NextResponse.json(
      { error: "Failed to create Blog" },
      { status: 500 }
    );
  }
}
