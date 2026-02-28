import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, phone, answers, techStack } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });

    const prompt = `Analyze these technical test results for a ${techStack} developer named ${name}. 
    Answers: ${JSON.stringify(answers)}. 
    Provide a professional summary of their strengths and a final score out of 100. 
    Format the response as JSON: { "score": number, "summary": "string" }`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    if (!responseText) throw new Error("Empty AI response");
    const evaluation = JSON.parse(responseText);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const candidateMail = {
      from: `"CLC HireX Protocol" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `[Verified] AI Assessment Result: ${evaluation.score}/100`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111;">
          <h2>Assessment Successful</h2>
          <p>Hello <b>${name}</b>,</p>
          <p>Your technical audit is complete. Your Neural Index score is: <b>${evaluation.score}</b></p>
          <hr/>
          <p><b>Executive Summary:</b></p>
          <p style="font-style: italic;">"${evaluation.summary}"</p>
          <p>You can now access your dashboard to view high-ticket opportunities.</p>
        </div>
      `
    };

    const adminMail = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, 
      subject: `🚨 NEW LEAD: ${name} scored ${evaluation.score}`,
      html: `
        <h3>New Candidate Assessment</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || 'Not provided'}</p>
        <p><b>Score:</b> ${evaluation.score}/100</p>
        <p><b>Analysis:</b> ${evaluation.summary}</p>
      `
    };

    await Promise.all([
      transporter.sendMail(candidateMail),
      transporter.sendMail(adminMail)
    ]);

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("Evaluation Protocol Error:", error);
    return NextResponse.json({ error: "Evaluation failed" }, { status: 500 });
  }
}