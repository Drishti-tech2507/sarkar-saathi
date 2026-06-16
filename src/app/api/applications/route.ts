import { NextResponse } from "next/server";

import dbConnect from "@/lib/mongodb";

import Application from "@/models/Application";

export async function GET(
  req: Request
) {
  try {
    await dbConnect();

    const { searchParams } =
      new URL(req.url);

    const uid =
      searchParams.get("uid");

    const applications =
      await Application.find({
        uid,
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error) {
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

    const body =
      await req.json();

    const application =
      await Application.create(
        body
      );

    return NextResponse.json({
      success: true,
      application,
    });
  } catch (error) {
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