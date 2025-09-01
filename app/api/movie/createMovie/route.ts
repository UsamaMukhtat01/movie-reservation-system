import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db"; // if you’re connecting to MongoDB
import Movie from "@/lib/models/Movie";

export async function POST(req: Request) {
  try {
    await connectDB(); // ensure DB is connected

    const body = await req.json();
    const { title, description, genres, showTime, type, user } = body;

    // Validation
    if (
      !title ||
      !description ||
      !genres ||
      !showTime ||
      title === "" ||
      description === "" ||
      genres === "" ||
      showTime === ""
    ) {
      return NextResponse.json({
        success: false,
        message: "All fields are mandatory to fill!",
      });
    }

    // Role check (in Next.js, you’ll probably extract user from middleware/session)
    if (user?.role === "User") {
      return NextResponse.json({
        success: false,
        message: "You are not allowed to create movie",
      });
    }

    // Create movie
    const movie = new Movie({
      title,
      description,
      genres,
      showTime,
      type,
    });

    await movie.save();

    return NextResponse.json({
      success: true,
      message: "Movie added Successfully!",
    });
  } catch (error: any) {
    console.error("Error creating movie:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
