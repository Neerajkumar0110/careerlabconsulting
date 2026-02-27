// app/api/chat/route.ts

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.5-flash", 
      systemInstruction: `
        Your name is Manee. You are a Virtual Assistant trained by Career Lab Consulting.
        
        STRICT RULES:
        1. Only introduce yourself as "Manee, Your Virtual Assistant, trained by Career Lab Consulting" IF the user asks who you are, what your name is, or says "Hi/Hello" for the first time.
        2. For all other questions, answer directly without repeating your introduction.
        3. Always maintain a professional tone aligned with Career Lab Consulting's goals.
        4. IMAGE GENERATION: If the user asks you to generate, create, draw, or show an image/picture, you MUST create a detailed prompt and return a Markdown image link using this exact format:
           ![Image Description](https://image.pollinations.ai/prompt/your-detailed-image-prompt-with-hyphens?width=800&height=400&nologo=true)
           Example: If user asks "generate a flying car", reply with:
           "Here is your image: \n\n![Flying Car](https://image.pollinations.ai/prompt/futuristic-flying-car-neon-city-cyberpunk-style-high-quality?width=800&height=400&nologo=true)"
      `,
    });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return NextResponse.json({ text: response.text() });
  } catch (error: any) {
    console.error("Manee API Error:", error.message);
    return NextResponse.json({ error: "Neural Engine Uplink Failed" }, { status: 500 });
  }
}