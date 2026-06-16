import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import RecentActivity from "@/models/RecentActivity";

export async function GET(
  req: Request
) {
  try {
    await dbConnect();

    const { searchParams } =
      new URL(req.url);

    const uid =
      searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({
        success: false,
        message: "UID required",
      });
    }

    const activities =
      await RecentActivity.find({
        uid,
      })
        .sort({
          createdAt: -1,
        })
        .limit(20);

    return NextResponse.json({
      success: true,
      activities,
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

export async function POST(
  req: Request
) {
  try {
    await dbConnect();

    const {
      uid,
      action,
      description,
    } = await req.json();

    const activity =
      await RecentActivity.create({
        uid,
        action,
        description,
      });

    return NextResponse.json({
      success: true,
      activity,
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