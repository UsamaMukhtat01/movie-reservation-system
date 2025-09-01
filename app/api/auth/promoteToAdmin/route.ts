import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/User";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    // Find user by ID
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found!" }, { status: 404 });
    }

    if (user.role === "Admin") {
      return NextResponse.json({ success: false, message: "User is already an Admin" }, { status: 400 });
    }

    user.role = "Admin";
    await user.save();

    const { password, ...rest } = user.toObject();

    return NextResponse.json({ success: true, message: "User promoted to Admin successfully", user: rest }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
