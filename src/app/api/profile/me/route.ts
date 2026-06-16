import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Profile from "@/models/Profile";

export async function GET() {
  try {
    await connectDB();

    const profile = await Profile.findOne().sort({
      createdAt: -1,
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile",
      },
      { status: 500 }
    );
  }
}