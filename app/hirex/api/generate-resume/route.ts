import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { profileData } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
  Role: Professional AI Recruiter for HireX Empire.
  Task: Generate a high-fidelity A4 resume based on these parameters:
  - Candidate: ${JSON.stringify(profileData)}
  - Focus: Quantify achievements (e.g., "Reduced latency by 14ms", "Synced 15,000+ data streams").
  - Tone: Futuristic, professional, and technical.
  - Integration: Mention GitHub Sync and Manee Pro 2.5 verified scores.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return NextResponse.json({ resume: response.text() });

  } catch (error) {
    return NextResponse.json({ error: "Autonomous Generation Failed" }, { status: 500 });
  }
}