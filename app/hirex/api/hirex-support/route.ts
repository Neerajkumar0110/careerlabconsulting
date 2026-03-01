// app/api/hirex-support/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company = 'Not Provided', subject = 'General Inquiry', message } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const customLogoHTML = `
      <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
        <tr>
          <td valign="middle" style="padding-right: 12px;">
            <img src="https://careerlabconsulting.com/favicon.ico" width="40" height="40" alt="HireX Logo" style="display: block; border-radius: 8px;" />
          </td>
          <td valign="middle" style="text-align: left;">
            <div style="font-family: Arial, sans-serif; font-size: 24px; font-weight: 900; line-height: 1;">
              <span style="color: #ffffff;">Hire</span><span style="color: #38bdf8;">X</span>
            </div>
            <div style="font-family: monospace; font-size: 10px; color: #94a3b8; letter-spacing: 1px; margin-top: 2px;">
              SUPPORT CENTER
            </div>
          </td>
        </tr>
      </table>
    `;

    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: 'careerlabconsulting@gmail.com', 
      bcc: 'mr.deepanshujoshi@gmail.com', 
      replyTo: email,
      subject: `[HireX Support] ${subject.toUpperCase()} - ${name}`,
      html: `
        <div style="background-color: #f8fafc; padding: 40px 20px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            
            <div style="background: #0f172a; padding: 30px 20px; text-align: center;">
              ${customLogoHTML}
            </div>
            
            <div style="padding: 30px;">
              <h2 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">New Support Ticket</h2>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold; width: 30%;">Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #2563eb;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Category</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; text-transform: capitalize;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Company</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${company}</td>
                </tr>
              </table>
              
              <h3 style="color: #1e293b; margin-top: 30px; font-size: 14px; text-transform: uppercase;">Message Detail:</h3>
              <div style="background-color: #f8fafc; border-left: 4px solid #38bdf8; padding: 15px; border-radius: 4px; color: #475569; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            
            </div>
          </div>
        </div>
      `,
    };

    const userMailOptions = {
      from: `"HireX Support Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Request Received: ${subject} Support`,
      html: `
        <div style="background-color: #f8fafc; padding: 40px 20px; font-family: Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            
            <div style="background: #0f172a; padding: 30px 20px; text-align: center;">
              ${customLogoHTML}
            </div>
            
            <div style="padding: 30px; color: #334155; line-height: 1.6;">
              <h2 style="color: #0f172a;">Hello ${name.split(' ')[0]},</h2>
              
              <p>Thank you for reaching out to the HireX Support Hub. We have successfully received your transmission regarding <strong>${subject}</strong>.</p>
              
              <p>Our engineering and support teams review all tickets promptly. You can expect a response from one of our agents within <strong>2 to 4 hours</strong>.</p>
              
              <div style="background-color: #eff6ff; padding: 15px; border-radius: 8px; margin: 25px 0;">
                <p style="margin: 0; font-size: 13px; color: #1e40af;"><strong>Your Message Copy:</strong><br/><br/>"${message}"</p>
              </div>
              
              <p style="margin-bottom: 0;">Best Regards,<br/><strong>HireX Technical Team</strong><br/>Career Lab Consulting</p>
            </div>
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Support API Error:", error);
    return NextResponse.json({ error: "Failed to send inquiry" }, { status: 500 });
  }
}