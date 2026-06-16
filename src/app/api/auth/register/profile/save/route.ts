import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Profile from "@/models/Profile";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const profile =
      await Profile.create(body);

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch {
    return NextResponse.json({
      success: false,
    });
  }
}