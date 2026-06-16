import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import SavedScheme from "@/models/SavedScheme";

export async function POST(
  request: Request
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const existing =
      await SavedScheme.findOne({
        uid: body.uid,
        schemeId:
          body.schemeId,
      });

    if (existing) {
      return NextResponse.json({
        success: true,
        message:
          "Already saved",
      });
    }

    const saved =
      await SavedScheme.create(
        body
      );

    return NextResponse.json({
      success: true,
      saved,
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