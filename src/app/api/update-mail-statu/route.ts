import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(
  request: Request
) {
  try {
    await connectDB();

    const {
      uid,
      type,
    } = await request.json();

    if (
      type === "welcome"
    ) {
      await User.updateOne(
        { uid },
        {
          welcomeMailSent:
            true,
        }
      );
    }

    if (
      type === "profile"
    ) {
      await User.updateOne(
        { uid },
        {
          profileMailSent:
            true,
        }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}