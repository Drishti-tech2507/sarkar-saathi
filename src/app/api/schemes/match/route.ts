import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Profile from "@/models/Profile";
import { matchSchemes } from "@/lib/matchSchemes";

export async function GET(
  request: NextRequest
) {
  try {
    await connectDB();

    const profileId =
      request.nextUrl.searchParams.get(
        "profileId"
      );

    if (!profileId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Profile ID is required",
        },
        {
          status: 400,
        }
      );
    }

    const profile =
      await Profile.findById(
        profileId
      ).lean();

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Profile not found",
        },
        {
          status: 404,
        }
      );
    }

    const matches =
      await matchSchemes(profile);

    return NextResponse.json({
      success: true,
      profile,
      totalMatches:
        matches.length,
      matches,
    });
  } catch (error) {
    console.error(
      "Scheme matching error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch recommendations",
      },
      {
        status: 500,
      }
    );
  }
}