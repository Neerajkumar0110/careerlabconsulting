// app/api/scholarship-submit/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, score, totalQuestions, scholarshipCode, discount } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"InternX System" <${process.env.SMTP_USER}>`,
      to: 'careerlabconsulting@gmail.com', 
      subject: `🎓 Scholarship Submission: ${name} - Score: ${score}`,
      html: `
        <h2>New Scholarship Test Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Score:</strong> ${score} / ${totalQuestions * 2}</p>
        <p><strong>Scholarship Code:</strong> ${scholarshipCode}</p>
        <p><strong>Discount Qualified:</strong> ${discount}%</p>
      `,
    });

    await transporter.sendMail({
      from: `"InternX AI" <${process.env.SMTP_USER}>`,
      to: email, 
      subject: `🎉 Congratulations! Your Scholarship Code: ${scholarshipCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Hi ${name},</h1>
          <p>You have successfully qualified for the InternX AI Scholarship!</p>
          
          <div style="background: #f4f4f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p style="margin: 0;">Your Score: <strong>${score} / ${totalQuestions * 2}</strong></p>
            <p style="margin: 10px 0 0 0;">Scholarship Unlocked: <strong style="color: #16a34a;">${discount}% OFF</strong></p>
          </div>

          <h3>Your Coupon Code:</h3>
          <div style="font-size: 24px; font-weight: bold; color: #2563eb; border: 2px dashed #2563eb; padding: 15px; display: inline-block; margin-bottom: 15px;">
            ${scholarshipCode}
          </div>

          <p>Use this code at checkout to claim your discount immediately.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">This is an automated email from InternX AI.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email Sending Error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}