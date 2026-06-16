import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Profile from "@/models/Profile";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const profile = await Profile.create(body);

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save profile",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const profileId =
      searchParams.get("profileId");

    if (!profileId) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile ID required",
        },
        {
          status: 400,
        }
      );
    }

    const profile =
      await Profile.findById(profileId);

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile",
      },
      {
        status: 500,
      }
    );
  }
}