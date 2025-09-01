import { NextResponse } from "next/server";
import Movie from "@/lib/models/Movie";
import { connectDB } from "@/lib/config/db";

export async function GET(req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const movieDetail = await Movie.findById(params.id);
    if (!movieDetail) {
      return NextResponse.json(
        { success: false, message: "Movie not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Movie detail", data: movieDetail },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
