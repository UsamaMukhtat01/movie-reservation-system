import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/lib/models/User";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "All fields are required!" }, { status: 400 });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json({ success: true, message: "User Created Successfully!" }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Email already exists!" }, { status: 400 });
  }
}
