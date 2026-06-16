import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const {
      message,
      profile,
      language,
    } = await req.json();

    const languageMap: Record<
      string,
      string
    > = {
      "en-IN": "English",
      "hi-IN": "Hindi",
      "ta-IN": "Tamil",
      "te-IN": "Telugu",
      "bn-IN": "Bengali",
      "gu-IN": "Gujarati",
      "mr-IN": "Marathi",
      "pa-IN": "Punjabi",
    };

    const selectedLanguage =
      languageMap[language] ||
      "English";

    const lower =
      message.toLowerCase();

    if (
      lower.includes("not working") ||
      lower.includes("issue") ||
      lower.includes("problem") ||
      lower.includes("error") ||
      lower.includes("unable") ||
      lower.includes("help")
    ) {
      return NextResponse.json({
        success: true,
        response: `
For assistance please contact our support team.

📞 Contact Number:
7895081859

📧 Email:
papernest.support@gmail.com
`,
      });
    }

    const prompt = `
You are Sarkar AI.

User Profile:
${JSON.stringify(profile)}

Reply ONLY in ${selectedLanguage}.

You help users with:

- Government Schemes
- Scholarships
- Ayushman Bharat
- PM Kisan
- PM Awas Yojana
- Pension Schemes
- Women Welfare Schemes
- Farmer Benefits
- Student Benefits
- Healthcare Benefits

Question:
${message}

Provide a helpful answer.
`;

    const result =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    return NextResponse.json({
      success: true,
      response:
        result.text ||
        "No response generated.",
    });

  } catch (error: any) {

    console.error(
      "GEMINI ERROR:",
      error
    );

    return NextResponse.json({
      success: false,
      response:
        error?.message ||
        "AI service unavailable",
    });
  }
}