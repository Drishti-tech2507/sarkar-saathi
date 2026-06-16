import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function GET(
  req: Request
) {
  await connectDB();

  const { searchParams } =
    new URL(req.url);

  const uid =
    searchParams.get("uid");

  const notifications =
    await Notification.find({
      uid,
    })
      .sort({
        createdAt: -1,
      })
      .limit(50);

  return NextResponse.json({
    success: true,
    notifications,
  });
}