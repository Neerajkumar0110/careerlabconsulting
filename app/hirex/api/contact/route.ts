// app/hirex/api/contact/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, interest, message } = body;

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
          <td valign="middle" style="padding-right: 15px;">
            <img src="https://careerlabconsulting.com/favicon.ico" width="48" height="48" alt="CLC Logo" style="display: block; border: none;" />
          </td>
          <td valign="middle" style="text-align: left;">
            <div style="font-family: Arial, sans-serif; font-size: 28px; font-weight: 900; font-style: italic; line-height: 1;">
              <span style="color: #ffffff;">Hire</span><span style="color: #38bdf8;">X</span>
            </div>
            <div style="margin-top: 4px; font-family: monospace, Arial, sans-serif; font-size: 10px; font-weight: bold; text-transform: uppercase; color: #94a3b8; letter-spacing: 1px;">
              <span style="color: #22c55e;">●</span> Your gateway to jobs and top talent
            </div>
          </td>
        </tr>
      </table>
    `;

    const footerHTML = `
      <div style="text-align: center; padding-top: 30px; padding-bottom: 20px; color: #64748b; font-size: 12px; line-height: 1.6;">
        <p style="margin: 0; font-weight: bold; font-size: 14px; color: #475569;">Career Lab Consulting</p>
        <p style="margin: 6px 0;">DLF Cyber City, 5th Floor, Cyber Green-2, Sec-25, Gurugram, India</p>
        <p style="margin: 6px 0;">
          <a href="tel:+918700236923" style="color: #2563eb; text-decoration: none; font-weight: bold;">+91 870023 6923</a> <span style="color: #cbd5e1; margin: 0 5px;">|</span> 
          <a href="mailto:info@careerlabconsulting.com" style="color: #2563eb; text-decoration: none; font-weight: bold;">info@careerlabconsulting.com</a>
        </p>
        <div style="margin: 20px 0; border-top: 1px solid #e2e8f0; width: 60%; margin-left: auto; margin-right: auto;"></div>
        <p style="margin-top: 15px; margin-bottom: 0;">© ${new Date().getFullYear()} Career Lab Consulting. All rights reserved.</p>
        <p style="margin: 4px 0 0 0;">Please do not reply to this automated email.</p>
      </div>
    `;

    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: 'info@careerlabconsulting.com',    
      bcc: 'mr.deepanshujoshi@gmail.com',    
      replyTo: email,
      subject: `New Lead Notification: ${name} - ${interest}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
          <div style="background-color: #0f172a; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center;">
            ${customLogoHTML}
          </div>
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1e293b; margin-top: 0; font-size: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">New Contact Form Submission</h2>
            <p style="color: #475569; font-size: 14px;">A prospect has submitted an inquiry via the HireX platform.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; width: 120px; color: #64748b; font-weight: bold;">Full Name:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Work Email:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Company:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${company || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: bold;">Primary Interest:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; text-transform: capitalize;">${interest}</td>
              </tr>
            </table>

            <h3 style="color: #1e293b; margin-top: 30px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message Payload:</h3>
            <div style="background-color: #f8fafc; padding: 20px; border-left: 4px solid #3b82f6; border-radius: 4px; color: #334155; font-size: 14px; white-space: pre-wrap; line-height: 1.6;">${message}</div>
          </div>
          ${footerHTML}
        </div>
      `,
    };

    const userMailOptions = {
      from: `"HireX Team" <${process.env.SMTP_USER}>`,
      to: email, 
      subject: `Welcome to HireX, ${name.split(' ')[0]} - Let's Transform Your Hiring`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          
          <div style="background-color: #0f172a; padding: 30px 20px; text-align: center;">
            ${customLogoHTML}
          </div>

          <div style="width: 100%; text-align: center; background-color: #f8fafc;">
            <img src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?t=st=1772113141~exp=1772116741~hmac=fc0c977cde73aabd7da8cefcf954bcff189e2adb7438491e76c6bb4e57751402&w=1480" 
                 alt="HireX Online Hiring" 
                 style="width: 100%; max-width: 600px; height: auto; display: block; border-bottom: 3px solid #3b82f6;" />
          </div>

          <div style="padding: 40px 30px; color: #334155; line-height: 1.7; font-size: 16px;">
            <h1 style="color: #0f172a; font-size: 24px; margin-top: 0; margin-bottom: 20px; text-align: center;">We've received your request!</h1>
            
            <p>Hi <strong>${name}</strong>,</p>
            
            <p>Thank you for initiating a connection with HireX. We are thrilled to see your interest in our <strong>${interest}</strong> solutions.</p>
            
            <p>Our talent acquisition experts are currently reviewing the details you provided. We are committed to helping you optimize your hiring workflow, and <strong>an agent will be in touch with you within the next 24 hours</strong> to discuss the next steps.</p>
            
            <div style="margin: 40px 0; background-color: #f8fafc; border-radius: 8px; padding: 25px; text-align: center; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; margin-top: 0; font-size: 18px;">See HireX in Action</h3>
              <p style="font-size: 14px; color: #64748b; margin-bottom: 20px;">Watch how we revolutionize talent acquisition.</p>
              
              <a href="https://videocdn.cdnpk.net/videos/6d8b7142-948a-477b-95f4-898cc2f20b3b/horizontal/previews/clear/large.mp4?token=exp=1772114620~hmac=7d44993cb368a20f4f4eea3fd3cbc885e1a2b7858a786e88fa918ed66a4cf3d4" target="_blank" style="display: inline-block; position: relative; text-decoration: none;">
                <div style="background-color: #0f172a; padding: 15px 30px; border-radius: 6px; color: white; font-weight: bold; font-size: 16px; display: inline-flex; align-items: center; justify-content: center; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
                  <span style="margin-right: 10px;">▶</span> Watch Video
                </div>
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-left: 15px; border-left: 4px solid #3b82f6;">
              <p style="margin-top: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Your Message:</p>
              <p style="margin-bottom: 0; font-style: italic; color: #475569; font-size: 15px;">"${message}"</p>
            </div>
            
          </div>
          
          <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
            ${footerHTML}
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return NextResponse.json({ message: 'Transmissions sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json({ error: 'Failed to send secure transmission' }, { status: 500 });
  }
}