import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/lib/models/User";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Please provide all the information!" }, { status: 400 });
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return NextResponse.json({ success: false, message: "User doesn't exist!" }, { status: 404 });
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return NextResponse.json({ success: false, message: "Invalid Password!" }, { status: 401 });
    }

    const { password: pass, ...rest } = validUser.toObject();

    const token = jwt.sign(
      { id: validUser._id, role: validUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return NextResponse.json(
      { success: true, message: "Signed In Successfully!", user: rest, token },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}
