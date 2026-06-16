import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import SavedScheme from "@/models/SavedScheme";
import RecentActivity from "@/models/RecentActivity";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const savedScheme =
      await SavedScheme.findById(id);

    if (!savedScheme) {
      return NextResponse.json(
        {
          success: false,
          message: "Scheme not found",
        },
        {
          status: 404,
        }
      );
    }

    await RecentActivity.create({
      uid: savedScheme.uid,
      action: "Removed Scheme",
      description: `${savedScheme.schemeName} removed from saved schemes`,
    });

    await SavedScheme.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
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