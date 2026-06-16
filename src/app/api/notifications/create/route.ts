import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const body =
      await req.json();

    const notification =
      await Notification.create(
        body
      );

    return NextResponse.json({
      success: true,
      notification,
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