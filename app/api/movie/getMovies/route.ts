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
  } catch (error: unknown) {
    console.error("Error fetching movies:", error);

    let errorMessage = "Failed to fetch movies";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
