// app/api/chat/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const promptLower = prompt.toLowerCase();

    const isImageRequest = 
      promptLower.includes("generate image") || 
      promptLower.includes("create image") || 
      promptLower.includes("draw") || 
      promptLower.includes("picture") ||
      promptLower.includes("show an image");

    if (isImageRequest) {
      const imageModel = genAI.getGenerativeModel({ 
        model: "gemini-3.1-flash-image-preview", 
        systemInstruction: `
          You are Manee's Image Generation Engine. The user wants an image.
          You MUST create a detailed prompt and return ONLY a Markdown image link using pollinations.ai.
          Format: ![Image Description](https://image.pollinations.ai/prompt/your-detailed-image-prompt-with-hyphens?width=800&height=400&nologo=true)
        `
      });

      const result = await imageModel.generateContent(prompt);
      const response = await result.response;
      return NextResponse.json({ text: response.text() });

    } else {
      const textModel = genAI.getGenerativeModel({ 
        model: "gemini-3-flash-preview", 
        systemInstruction: `
          Your name is Manee. You are a Virtual Assistant trained by Career Lab Consulting.
          
          STRICT RULES:
          1. Only introduce yourself as "Manee, Your Virtual Assistant, trained by Career Lab Consulting" IF the user asks who you are, what your name is, or says "Hi/Hello" for the first time.
          2. For all other questions, answer directly without repeating your introduction.
          3. Always maintain a professional tone aligned with Career Lab Consulting's goals.
        `,
      });
      
      const result = await textModel.generateContent(prompt);
      const response = await result.response;
      return NextResponse.json({ text: response.text() });
    }

  } catch (error: any) {
    console.error("Manee API Error:", error.message);
    return NextResponse.json({ error: "Neural Engine Uplink Failed: " + error.message }, { status: 500 });
  }
}