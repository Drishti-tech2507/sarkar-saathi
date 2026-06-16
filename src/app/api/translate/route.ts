import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, target } =
    await req.json();

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          q: text,
          target,
        }),
      }
    );

    const data =
      await response.json();

    return NextResponse.json({
      translated:
        data.data.translations[0]
          .translatedText,
    });
  } catch (error) {
    return NextResponse.json(
      {
        translated: text,
      }
    );
  }
}