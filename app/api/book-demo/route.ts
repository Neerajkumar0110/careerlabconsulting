import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, selectedDate, selectedTime } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const MEETING_LINK = "https://meet.google.com/ysb-pxcw-tpj";

    const adminMailOptions = {
      from: `"InternX Demo Bot" <${process.env.SMTP_USER}>`,
      to: "info@careerlabconsulting.com", 
      subject: `New Demo Booking: ${name}`,
      html: `
        <h2>New Demo Request 🚀</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${selectedDate}</p>
        <p><strong>Time:</strong> ${selectedTime}</p>
        <p><strong>Message:</strong> ${message || 'No message'}</p>
        <hr />
        <p>Meeting Link: <a href="${MEETING_LINK}">${MEETING_LINK}</a></p>
      `,
    };

    const userMailOptions = {
      from: `"Career Lab Consulting" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Demo Confirmed: Your Career Consultation Session",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #2563eb; padding: 20px; text-align: center; color: white;">
                <h2 style="margin: 0;">Demo Confirmed! ✅</h2>
            </div>
            <div style="padding: 20px; background-color: #ffffff; color: #333333;">
                <p>Hi ${name},</p>
                <p>Your 1-on-1 career consultation session has been successfully booked. Our AI architects are looking forward to analyzing your profile.</p>
                
                <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${selectedDate}</p>
                    <p style="margin: 5px 0;"><strong>⏰ Time:</strong> ${selectedTime}</p>
                    <p style="margin: 5px 0;"><strong>📹 Format:</strong> Google Meet</p>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${MEETING_LINK}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Join Meeting</a>
                    <p style="margin-top: 10px; font-size: 12px; color: #666;">Or click here: <a href="${MEETING_LINK}">${MEETING_LINK}</a></p>
                </div>

                <p>Please be ready 5 minutes before the scheduled time with your resume/portfolio if available.</p>
                <p>See you there!</p>
                <br/>
                <p style="font-size: 12px; color: #888;">Career Lab Consulting Team</p>
            </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ success: true, message: "Booking confirmed" });

  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ success: false, error: "Failed to send emails" }, { status: 500 });
  }
}