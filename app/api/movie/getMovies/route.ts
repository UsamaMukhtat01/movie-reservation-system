import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import Movie from "@/lib/models/Movie";

export async function GET() {
  try {
    await connectDB();

    const allMovies = await Movie.find();

    return NextResponse.json({
      message: "List of All Movies",
      count: allMovies.length,
      data: allMovies,
    });
  } catch (error: any) {
    console.error("Error fetching movies:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch movies", error: error.message },
      { status: 500 }
    );
  }
}
