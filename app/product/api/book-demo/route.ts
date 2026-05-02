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
    const SESSION_TITLE = `AI Career Consultation: ${name}`;

    const calendar = ical({
      name: 'Career Lab Events',
      events: [{
        start: new Date(`${selectedDate} ${selectedTime}`),
        end: new Date(new Date(`${selectedDate} ${selectedTime}`).getTime() + 30 * 60000), 
        summary: SESSION_TITLE,
        description: `1-on-1 Career Consultation for ${name}.\nPhone: ${phone}\nMessage: ${message || 'No message'}\nJoin here: ${MEETING_LINK}`,
        location: MEETING_LINK,
        url: MEETING_LINK,
        organizer: { name: 'Career Lab Consulting', email: "info@careerlabconsulting.com" }
      }]
    });

    const calendarContent = calendar.toString();

    const adminMailOptions = {
      from: `"InternX Booking Bot" <${process.env.SMTP_USER}>`,
      to: "info@careerlabconsulting.com", 
      bcc: "mr.deepanshujoshi@gmail.com", 
      subject: `🚨 New Demo Booking: ${name} - ${selectedDate}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #333; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 20px; text-align: center; color: white;">
             <h2 style="margin: 0;">New Demo Request 🚀</h2>
          </div>
          <div style="padding: 25px; background-color: #ffffff;">
            <p style="font-size: 16px;">Ek naya user connect hona chahta hai:</p>
            <table width="100%" style="border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Name:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Phone:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Schedule:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${selectedDate} at ${selectedTime}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;"><strong>Message:</strong></td>
                <td style="padding: 10px; border-bottom: 1px solid #f1f5f9;">${message || 'N/A'}</td>
              </tr>
            </table>
            <div style="text-align: center; margin-top: 30px;">
              <a href="${MEETING_LINK}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Launch Google Meet</a>
            </div>
          </div>
        </div>
      `,
      attachments: [{
        filename: 'invite.ics',
        content: calendarContent,
        contentType: 'text/calendar; charset=utf-8',
        method: 'REQUEST'
      }]
    };

    const userMailOptions = {
      from: `"Career Lab Consulting" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Confirmed: Your Career Consultation on ${selectedDate}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 26px; letter-spacing: -0.5px;">Booking Confirmed! ✅</h1>
            <p style="color: #dbeafe; margin-top: 10px; font-size: 16px;">Hi ${name}, your session is successfully scheduled.</p>
          </div>
          
          <div style="padding: 35px; background: white;">
            <p style="font-size: 16px; color: #475569; line-height: 1.6;">Our AI architects are excited to analyze your profile and map your career path.</p>

            <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #2563eb;">
              <h4 style="margin: 0 0 10px 0; color: #64748b; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Session Schedule</h4>
              <p style="margin: 0; font-size: 20px; font-weight: bold; color: #0f172a;">${selectedDate}</p>
              <p style="margin: 5px 0 0 0; font-size: 18px; color: #2563eb; font-weight: 600;">${selectedTime} (IST)</p>
            </div>

            <div style="text-align: center; margin: 40px 0;">
              <a href="${MEETING_LINK}" style="background-color: #2563eb; color: white; padding: 18px 35px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px; display: inline-block;">Join Google Meet</a>
              <p style="font-size: 12px; color: #94a3b8; margin-top: 15px;">Meeting Link: ${MEETING_LINK}</p>
            </div>

            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;">
            <p style="font-size: 14px; color: #64748b; line-height: 1.5;"><strong>Important:</strong> Please join from a Laptop/Desktop and keep your resume/portfolio ready for discussion.</p>
            
            <p style="font-size: 14px; color: #94a3b8; margin-top: 40px; text-align: center; font-style: italic;">
              Career Lab Consulting Team<br>
              Building India's AI Workforce
            </p>
          </div>
        </div>
      `,
      attachments: [{
        filename: 'invite.ics',
        content: calendarContent,
        contentType: 'text/calendar; charset=utf-8',
        method: 'REQUEST'
      }]
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ success: true, message: "Booking confirmed and emails sent" });

  } catch (error) {
    console.error("Booking System Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Internal Server Error" 
    }, { status: 500 });
  }
}