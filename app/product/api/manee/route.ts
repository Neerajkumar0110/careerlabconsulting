import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, phone, projectScope } = await req.json();

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: { responseMimeType: "application/json" } 
    });

    const prompt = `Act as 'Manee', an elite Principal Software Architect. 
    Analyze this client project idea: "${projectScope}". 
    Provide a high-level technical blueprint.
    Format exactly as JSON with these keys: 
    { 
      "techStack": "Recommended modern frameworks (e.g. Next.js, Rust, AWS)", 
      "timeline": "Estimated time to build MVP (e.g. 4-6 weeks)", 
      "analysis": "A 3-sentence professional executive summary of the approach." 
    }`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    if (!responseText) throw new Error("Empty AI response");
    
    const blueprint = JSON.parse(responseText);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const clientMail = {
      from: `"Manee AI Core" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `[Manee AI] Your Project Architecture Blueprint`,
      html: `
        <div style="font-family: Arial, sans-serif; max-w: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #4F46E5;">Manee AI Analysis Complete</h2>
          <p>Hello <b>${name}</b>,</p>
          <p>Manee has analyzed your project requirements. Here is the initial architectural blueprint:</p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px;">
            <p><strong>🛠 Recommended Stack:</strong> ${blueprint.techStack}</p>
            <p><strong>⏱ Estimated MVP Timeline:</strong> ${blueprint.timeline}</p>
            <p><strong>🧠 Executive Analysis:</strong><br/> ${blueprint.analysis}</p>
          </div>
          <p>Our elite engineering pods are ready to build this. We will contact you shortly.</p>
        </div>
      `
    };

    const adminMail = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `🔥 NEW MANEE LEAD: ${name}`,
      html: `
        <h3>New Project Analysis Request</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Project Scope:</b> ${projectScope}</p>
        <p><b>Manee's Recommendation:</b> ${blueprint.techStack}</p>
      `
    };

    await Promise.all([ transporter.sendMail(clientMail), transporter.sendMail(adminMail) ]);

    return NextResponse.json(blueprint);
  } catch (error) {
    console.error("Manee Core Error:", error);
    return NextResponse.json({ error: "Blueprint generation failed" }, { status: 500 });
  }
}