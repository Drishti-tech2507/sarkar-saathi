import { NextResponse } from "next/server";

import Profile from "@/models/Profile";
import { matchSchemes } from "@/lib/matchSchemes";

import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();

    const profile = await Profile.findOne().sort({
      createdAt: -1,
    });

    if (!profile) {
      return NextResponse.json({
        success: false,
        message: "Profile not found",
      });
    }

    const recommendations =
      await matchSchemes(profile);

    return NextResponse.json({
      success: true,

      profile,

      totalMatches:
        recommendations.length,

      recommendations:
        recommendations.slice(0, 10),
    });
  } catch (error) {
    console.error(error);

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