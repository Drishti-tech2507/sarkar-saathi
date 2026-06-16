import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";

import RecentActivity
from "@/models/RecentActivity";

export async function POST(
  req: Request
) {
  try {
    await dbConnect();

    const body =
      await req.json();

    await RecentActivity.create(
      body
    );

    return NextResponse.json({
      success: true,
    });
  } catch {
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