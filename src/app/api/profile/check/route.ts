import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Profile from "@/models/Profile";

export async function GET(
  request: Request
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(request.url);

    const uid =
      searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({
        completed: false,
      });
    }

    const profile =
      await Profile.findOne({
        uid,
      });

    return NextResponse.json({
      completed:
        profile?.profileCompleted ||
        false,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      completed: false,
    });
  }
}