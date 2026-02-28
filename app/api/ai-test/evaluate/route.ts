import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, answers, techStack } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Analyze these technical test results for a ${techStack} developer named ${name}. 
    Answers: ${JSON.stringify(answers)}. 
    Provide a professional summary of their strengths and a final score out of 100. 
    Format the response as JSON: { "score": number, "summary": "string" }`;

    const result = await model.generateContent(prompt);
    const evaluation = JSON.parse(result.response.text());

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Your AI Assessment Result - ${evaluation.score}/100`,
      html: `<h2>Assessment Complete</h2><p>Score: ${evaluation.score}</p><p>${evaluation.summary}</p>`
    });

    return NextResponse.json(evaluation);
  } catch (error) {
    return NextResponse.json({ error: "Evaluation failed" }, { status: 500 });
  }
}