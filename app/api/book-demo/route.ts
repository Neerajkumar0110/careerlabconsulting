// app/api/book-demo/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import ical from 'ical-generator';

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
    const SESSION_TITLE = "1-on-1 AI Career Consultation";

    const calendar = ical({
      name: 'Career Lab Events',
      events: [{
        start: new Date(`${selectedDate} ${selectedTime}`),
        end: new Date(new Date(`${selectedDate} ${selectedTime}`).getTime() + 30 * 60000), 
        summary: SESSION_TITLE,
        description: `Career Consultation for ${name}. Join here: ${MEETING_LINK}`,
        location: MEETING_LINK,
        url: MEETING_LINK,
        organizer: { name: 'Career Lab Consulting', email: process.env.SMTP_USER || '' }
      }]
    });

    const adminMailOptions = {
      from: `"InternX Booking System" <${process.env.SMTP_USER}>`,
      to: "info@careerlabconsulting.com", 
      subject: `🚀 New Booking: ${name} - ${selectedDate}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #333;">
          <h2 style="color: #2563eb;">New Demo Session Alert!</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Schedule:</strong> ${selectedDate} at ${selectedTime}</p>
            <p><strong>Message:</strong> ${message || 'No specific topics mentioned.'}</p>
          </div>
          <p style="margin-top: 20px;">
            <a href="${MEETING_LINK}" style="background: #000; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Launch Google Meet</a>
          </p>
        </div>
      `,
    };

    const userMailOptions = {
      from: `"Career Lab Consulting" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Confirmed: Your session on ${selectedDate}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 15px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Booking Confirmed! ✅</h1>
            <p style="color: #dbeafe; margin-top: 10px;">Hi ${name}, your career roadmap is ready to be built.</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <div style="margin-bottom: 25px;">
              <p style="font-size: 16px; line-height: 1.6;">Your 1-on-1 session with our AI Career Architect is scheduled. Please find the details below:</p>
            </div>

            <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
              <table width="100%">
                <tr>
                  <td style="padding-bottom: 10px; color: #64748b; font-size: 12px; font-weight: bold; text-transform: uppercase;">Date & Time</td>
                </tr>
                <tr>
                  <td style="font-size: 18px; font-weight: bold;">${selectedDate}</td>
                </tr>
                <tr>
                  <td style="font-size: 16px; color: #2563eb; font-weight: bold;">${selectedTime} (IST)</td>
                </tr>
              </table>
            </div>

            <div style="text-align: center; margin: 35px 0;">
              <a href="${MEETING_LINK}" style="background-color: #2563eb; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);">Join Google Meet</a>
              <p style="font-size: 12px; color: #94a3b8; margin-top: 15px;">Meeting Link: ${MEETING_LINK}</p>
            </div>

            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;">
            
            <p style="font-size: 14px; color: #475569;"><strong>Pro Tip:</strong> Please join from a Laptop/PC and keep your latest Resume ready for a live review.</p>
            
            <p style="font-size: 14px; color: #94a3b8; margin-top: 40px; text-align: center;">
              Career Lab Consulting Team<br>
              India's Leading AI Career Accelerator
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'invite.ics',
          content: calendar.toString(),
          contentType: 'text/calendar; charset=utf-8',
          method: 'REQUEST'
        }
      ]
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ success: true, message: "Emails sent successfully" });

  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Internal Server Error" 
    }, { status: 500 });
  }
}