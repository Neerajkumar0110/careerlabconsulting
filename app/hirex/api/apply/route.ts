// app/hirex/api/apply/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, portfolio, jobId, jobTitle, company } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: 'info@careerlabconsulting.com', 
      bcc: 'mr.deepanshujoshi@gmail.com', 
      replyTo: email,
      subject: `New AI Job Application: ${name} for ${jobTitle} (${company})`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f5; padding: 30px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="background-color: #0f172a; padding: 20px; text-align: center;">
              <h1 style="color: #38bdf8; margin: 0; font-size: 24px;">HireX <span style="color: white;">Platform</span></h1>
              <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 14px;">Autonomous AI Application Received</p>
            </div>
            
            <div style="padding: 30px;">
              <h2 style="color: #1e293b; margin-top: 0;">New Candidate Initialized</h2>
              <p style="color: #475569; line-height: 1.6;">A new candidate has submitted their profile to initialize the AI Assessment test.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold; width: 30%;">Job Title</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: bold;">${jobTitle}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Company</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${company} (ID: ${jobId})</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Name</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Email</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #2563eb;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Phone</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #0f172a;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Portfolio/Link</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #2563eb;"><a href="${portfolio}" target="_blank">${portfolio}</a></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      `,
    };

    const userMailOptions = {
      from: `"HireX Platform" <${process.env.SMTP_USER}>`,
      to: email, 
      subject: `HireX AI Evaluation Initialized: ${jobTitle} at ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f5; padding: 30px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="background-color: #0f172a; padding: 20px; text-align: center;">
               <h1 style="color: #38bdf8; margin: 0; font-size: 24px;">HireX <span style="color: white;">Platform</span></h1>
            </div>
            
            <div style="padding: 30px; color: #334155; line-height: 1.6;">
              <h2 style="color: #0f172a;">Hello ${name.split(' ')[0]},</h2>
              
              <p>Your profile for the <strong>${jobTitle}</strong> role at <strong>${company}</strong> has been successfully received by the Career Lab Consulting HireX Platform.</p>
              
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="margin: 0; font-weight: bold; color: #1e3a8a;">Next Step: AI Autonomous Assessment</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #1e3a8a;">Our AI system is generating your unique evaluation matrix. We will send you the test link shortly. Please prepare for a rigorous technical evaluation.</p>
              </div>
              
              <p>Thank you,<br><strong>Career Lab Consulting Team</strong></p>
            </div>
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return NextResponse.json({ message: 'Application processed securely' }, { status: 200 });
  } catch (error) {
    console.error('Error sending application emails:', error);
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
  }
}