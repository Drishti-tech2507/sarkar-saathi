import { NextResponse } from "next/server";

import { GoogleGenerativeAI }
from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
  );

export async function POST(
  request: Request
) {
  try {
    const {
      question,
      profile,
      schemes,
    } = await request.json();

    const model =
      genAI.getGenerativeModel({
        model:
          "gemini-2.5-flash",
      });

    const prompt = `
You are Sarkar Saathi AI.

User Profile:
${JSON.stringify(profile)}

Eligible Schemes:
${JSON.stringify(schemes)}

Question:
${question}

Answer professionally.
Mention relevant schemes.
Explain eligibility.
`;

    const result =
      await model.generateContent(
        prompt
      );

    const response =
      result.response.text();

    return NextResponse.json({
      success: true,
      response,
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