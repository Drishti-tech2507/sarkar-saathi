import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Scheme from "@/models/Scheme";
import translate from "google-translate-api-x";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const search =
      request.nextUrl.searchParams.get("search") || "";

    const lang =
      request.nextUrl.searchParams.get("lang") || "en";

    const query = search
      ? {
          $or: [
            {
              name: {
                $regex: search,
                $options: "i",
              },
            },
            {
              category: {
                $regex: search,
                $options: "i",
              },
            },
            {
              description: {
                $regex: search,
                $options: "i",
              },
            },
            {
              keywords: {
                $in: [new RegExp(search, "i")],
              },
            },
          ],
        }
      : {};

    const schemes = await Scheme.find(query).lean();

    // No translation needed
    if (lang === "en") {
      return NextResponse.json(schemes);
    }

    const translatedSchemes = await Promise.all(
      schemes.map(async (scheme: any) => {
        try {
          const translatedName: any = await translate(
            scheme.name || "",
            { to: lang }
          );

          const translatedDescription: any = await translate(
            scheme.description || "",
            { to: lang }
          );

          const translatedCategory: any = await translate(
            scheme.category || "",
            { to: lang }
          );

          return {
            ...scheme,
            name:
              translatedName?.text ||
              translatedName ||
              scheme.name,

            description:
              translatedDescription?.text ||
              translatedDescription ||
              scheme.description,

            category:
              translatedCategory?.text ||
              translatedCategory ||
              scheme.category,
          };
        } catch (translationError) {
          console.error(
            "Translation Error:",
            translationError
          );

          return scheme;
        }
      })
    );

    return NextResponse.json(translatedSchemes);
  } catch (error) {
    console.error("Scheme API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch schemes",
      },
      {
        status: 500,
      }
    );
  }
}