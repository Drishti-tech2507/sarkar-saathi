import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Profile from "@/models/Profile";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    console.log("Received Profile:", body);

    const profile = await Profile.create({
      name: body.name,
      age: Number(body.age),
      gender: body.gender,

      state: body.state,
      district: body.district,

      maritalStatus: body.maritalStatus,
      children: Number(body.children || 0),
      dependents: Number(body.dependents || 0),

      education: body.education,

      occupation: body.occupation,

      income: Number(
        String(body.income).replace(/\D/g, "")
      ),

      bpl: body.bpl,
      rationCard: body.rationCard,

      categories: body.categories || [],

      aadhaar: body.aadhaar,
      mobile: body.mobile,
    });

    return NextResponse.json({
      success: true,
      message: "Profile Saved Successfully",
      profile,
    });
  } catch (error) {
    console.error("Profile Save Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed To Save Profile",
      },
      { status: 500 }
    );
  }
}