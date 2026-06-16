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

    const supportKeywords = [
      "not working",
      "issue",
      "problem",
      "error",
      "unable",
      "help",
      "support",
      "login issue",
      "payment issue",
      "website issue",
      "account issue",
      "profile issue",
    ];

    const lower =
      message.toLowerCase();

    const needSupport =
      supportKeywords.some(
        (word) =>
          lower.includes(word)
      );

    if (needSupport) {
      return NextResponse.json({
        success: true,
        response: `
Sorry you're facing an issue.

📞 Contact Number:
7895081859

📧 Email:
papernest.support@gmail.com

Our support team will help you.
`,
      });
    }

    const prompt = `
You are PaperNest AI Assistant.

User Profile:
${JSON.stringify(profile)}

Language:
${language}

IMPORTANT RULES:

1 Reply in same language as user.
2 Be friendly.
3 Answer website related questions.
4 Help with navigation.
5 Explain features.
6 Give concise answers.

User:
${message}
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
        "No response generated",
    });

  } catch (error: any) {

    console.error(error);

    return NextResponse.json({
      success: true,
      response:
        "AI service temporarily unavailable.",
    });
  }
}