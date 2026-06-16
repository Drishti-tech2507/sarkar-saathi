import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import SavedScheme from "@/models/SavedScheme";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      uid: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { uid } =
      await params;

    const schemes =
      await SavedScheme.find({
        uid,
      });

    return NextResponse.json({
      success: true,
      schemes,
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