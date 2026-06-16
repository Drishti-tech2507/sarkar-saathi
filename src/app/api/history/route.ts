import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SearchHistory from "@/models/SearchHistory";
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

    const history =
      await SearchHistory.find({
        uid,
      })
        .sort({
          createdAt: -1,
        })
        .limit(10);

    return NextResponse.json({
      success: true,
      history,
    });
  } catch {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
    await dbConnect();

    const body =
      await req.json();

    const history =
      await SearchHistory.create(
        body
      );

    // CREATE ACTIVITY ALSO

    await RecentActivity.create({
      uid: body.uid,

      action:
        "Scheme Search",

      description: `Searched for "${body.query}"`,
    });

    return NextResponse.json({
      success: true,
      history,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}