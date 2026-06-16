import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Profile from "@/models/Profile";

import {
  matchSchemes,
} from "@/lib/matchSchemes";

export async function GET() {
  await connectDB();

  const profile =
    await Profile.findOne().sort({
      createdAt: -1,
    });

  const schemes =
    await matchSchemes(
      profile
    );

  return NextResponse.json({
    profile,
    schemes,
  });
}