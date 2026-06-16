import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { email, password } = body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Wrong password",
        },
        { status: 401 }
      );
    }

    const token = generateToken(
      user._id.toString()
    );

    return NextResponse.json({
      success: true,
      token,
      user,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}