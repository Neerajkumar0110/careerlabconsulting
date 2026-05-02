// app/api/send-otp/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, otp, name } = await req.json();

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
      from: `"InternX Security" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `${otp} is your Verification Code`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #2563eb;">Email Verification</h2>
          <p>Hi <strong>${name || 'User'}</strong>,</p>
          <p>You are registering for the InternX Scholarship Test. Your One-Time Password (OTP) is:</p>
          <div style="font-size: 32px; font-weight: bold; color: #000; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTP Email Error:", error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}