import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(
  request: Request
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const {
      uid,
      name,
      email,
      photoURL,
    } = body;

    let user =
      await User.findOne({
        uid,
      });

    if (!user) {
      user = await User.create({
        uid,
        name,
        email,
        photoURL,
      });
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to save user",
      },
      {
        status: 500,
      }
    );
  }
}