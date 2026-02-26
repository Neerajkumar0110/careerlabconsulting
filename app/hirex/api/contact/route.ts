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
          <td valign="middle" style="padding-right: 12px;">
            <img src="https://careerlabconsulting.com/favicon.ico" width="40" height="40" alt="HireX Logo" style="display: block; border: none; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);" />
          </td>
          <td valign="middle" style="text-align: left;">
            <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 26px; font-weight: 900; font-style: italic; line-height: 1; letter-spacing: -0.5px;">
              <span style="color: #ffffff;">Hire</span><span style="color: #38bdf8;">X</span>
            </div>
            <div style="margin-top: 3px; font-family: 'JetBrains Mono', monospace, Arial; font-size: 9px; font-weight: 700; text-transform: uppercase; color: #94a3b8; letter-spacing: 1.5px;">
              <span style="color: #10b981;">●</span> Gateway to top talent
            </div>
          </td>
        </tr>
      </table>
    `;

    const footerHTML = `
      <div style="background-color: #f1f5f9; padding: 35px 20px; text-align: center; border-top: 1px solid #e2e8f0; border-radius: 0 0 12px 12px;">
        <p style="margin: 0 0 10px 0; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 15px; color: #334155; text-transform: uppercase; letter-spacing: 1px;">Career Lab Consulting</p>
        <p style="margin: 5px 0; font-family: 'Inter', sans-serif; color: #64748b; font-size: 13px; line-height: 1.5;">
          DLF Cyber City, 5th Floor, Cyber Green-2<br>Sec-25, Gurugram, India
        </p>
        
        <table border="0" cellpadding="0" cellspacing="0" style="margin: 15px auto;">
          <tr>
            <td style="padding: 0 10px; border-right: 1px solid #cbd5e1;">
              <a href="tel:+918700236923" style="color: #2563eb; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;">📞 +91 870023 6923</a>
            </td>
            <td style="padding: 0 10px;">
              <a href="mailto:info@careerlabconsulting.com" style="color: #2563eb; text-decoration: none; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;">✉️ info@careerlabconsulting.com</a>
            </td>
          </tr>
        </table>

        <table border="0" cellpadding="0" cellspacing="0" style="margin: 20px auto 10px auto;">
          <tr>
            <td style="padding: 0 8px;">
              <a href="https://www.facebook.com/careerlabconsultingofficial" target="_blank" style="text-decoration: none;">
                <img src="https://cdn.tools.unlayer.com/social/icons/circle-color/facebook.png" width="32" height="32" alt="Facebook" style="display: block; border: none;" />
              </a>
            </td>
            <td style="padding: 0 8px;">
              <a href="https://x.com/CareerLabConsul" target="_blank" style="text-decoration: none;">
                <img src="https://cdn.tools.unlayer.com/social/icons/circle-color/twitter.png" width="32" height="32" alt="Twitter / X" style="display: block; border: none;" />
              </a>
            </td>
            <td style="padding: 0 8px;">
              <a href="https://www.instagram.com/careerlabconsultingofficial" target="_blank" style="text-decoration: none;">
                <img src="https://cdn.tools.unlayer.com/social/icons/circle-color/instagram.png" width="32" height="32" alt="Instagram" style="display: block; border: none;" />
              </a>
            </td>
            <td style="padding: 0 8px;">
              <a href="https://www.youtube.com/@careerlabconsulting4691" target="_blank" style="text-decoration: none;">
                <img src="https://cdn.tools.unlayer.com/social/icons/circle-color/youtube.png" width="32" height="32" alt="YouTube" style="display: block; border: none;" />
              </a>
            </td>
            <td style="padding: 0 8px;">
              <a href="https://www.linkedin.com/company/38144534" target="_blank" style="text-decoration: none;">
                <img src="https://cdn.tools.unlayer.com/social/icons/circle-color/linkedin.png" width="32" height="32" alt="LinkedIn" style="display: block; border: none;" />
              </a>
            </td>
          </tr>
        </table>
        
        <p style="margin: 20px 0 0 0; font-family: 'Inter', sans-serif; color: #94a3b8; font-size: 11px;">
          © ${new Date().getFullYear()} Career Lab Consulting. All rights reserved.<br>
          <span style="color: #cbd5e1;">This message was sent securely.</span>
        </p>
      </div>
    `;

    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: 'info@careerlabconsulting.com',    
      bcc: 'mr.deepanshujoshi@gmail.com',    
      replyTo: email,
      subject: `New HireX Lead: ${name} - ${interest}`,
      html: `
        <div style="background-color: #f8fafc; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);">
            
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px 20px; text-align: center;">
              ${customLogoHTML}
            </div>
            
            <div style="padding: 40px 35px;">
              <div style="border-bottom: 2px solid #f1f5f9; padding-bottom: 15px; margin-bottom: 25px;">
                <h2 style="font-family: 'Inter', sans-serif; color: #0f172a; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">New Contact Request</h2>
                <p style="font-family: 'Inter', sans-serif; color: #64748b; margin: 8px 0 0 0; font-size: 14px;">A new prospect has submitted the website contact form.</p>
              </div>
              
              <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 14px;">
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px dashed #e2e8f0; width: 35%; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px;">Sender Name</td>
                  <td style="padding: 15px 0; border-bottom: 1px dashed #e2e8f0; color: #0f172a; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px dashed #e2e8f0; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px;">Work Email</td>
                  <td style="padding: 15px 0; border-bottom: 1px dashed #e2e8f0;">
                    <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500; background-color: #eff6ff; padding: 4px 8px; border-radius: 4px;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px dashed #e2e8f0; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px;">Organization</td>
                  <td style="padding: 15px 0; border-bottom: 1px dashed #e2e8f0; color: #0f172a; font-weight: 500;">${company || '<span style="color: #94a3b8; font-style: italic;">Not specified</span>'}</td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px dashed #e2e8f0; color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px;">Area of Interest</td>
                  <td style="padding: 15px 0; border-bottom: 1px dashed #e2e8f0; color: #059669; font-weight: 700; text-transform: capitalize;">${interest}</td>
                </tr>
              </table>

              <div style="margin-top: 35px;">
                <p style="font-family: 'Inter', sans-serif; color: #64748b; font-weight: 700; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; margin: 0 0 10px 0;">Message Details</p>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #38bdf8; padding: 20px; border-radius: 6px; font-family: 'Inter', sans-serif; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">${message}</div>
              </div>
            </div>
            
            ${footerHTML}
          </div>
        </div>
      `,
    };

    const userMailOptions = {
      from: `"HireX Team" <${process.env.SMTP_USER}>`,
      to: email, 
      subject: `Thank you for contacting HireX, ${name.split(' ')[0]}`,
      html: `
        <div style="background-color: #f8fafc; padding: 40px 20px;">
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);">
            
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px 20px; text-align: center;">
              ${customLogoHTML}
            </div>

            <div style="width: 100%; text-align: center; background-color: #e0f2fe; border-bottom: 4px solid #38bdf8;">
              <img src="https://img.freepik.com/free-vector/man-search-hiring-job-online-from-laptop_1150-52728.jpg?t=st=1772113141~exp=1772116741~hmac=fc0c977cde73aabd7da8cefcf954bcff189e2adb7438491e76c6bb4e57751402&w=1480" 
                   alt="Modern Online Hiring" 
                   style="width: 100%; max-width: 600px; height: auto; display: block;" />
            </div>

            <div style="padding: 45px 35px; color: #334155; line-height: 1.8; font-size: 16px;">
              <h1 style="color: #0f172a; font-size: 26px; font-weight: 800; margin-top: 0; margin-bottom: 25px; text-align: center; letter-spacing: -0.5px;">Message Received.</h1>
              
              <p style="font-size: 17px;">Hello <strong>${name}</strong>,</p>
              
              <p>Thank you for reaching out to HireX. We've successfully received your inquiry regarding our <strong>${interest}</strong> solutions.</p>
              
              <p>Our talent acquisition team is currently reviewing your request. We are committed to upgrading your hiring infrastructure, and <strong>a specialist will contact you directly within 24 hours.</strong></p>
              
              <div style="margin: 45px 0; background: linear-gradient(to bottom, #ffffff, #f8fafc); border-radius: 10px; padding: 35px 25px; text-align: center; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                <div style="background-color: #eff6ff; width: 60px; height: 60px; border-radius: 30px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                  <span style="font-size: 24px;">🎥</span>
                </div>
                <h3 style="color: #0f172a; margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">See the Future of Hiring</h3>
                <p style="font-size: 15px; color: #64748b; margin: 0 0 25px 0; line-height: 1.5;">Watch how our AI-driven platform connects you with top-tier talent instantly.</p>
                
                <a href="https://www.youtube.com/watch?v=whqLvigQWoE&t=18s" target="_blank" style="text-decoration: none;">
                  <div style="background-color: #2563eb; color: white; padding: 16px 32px; border-radius: 8px; font-weight: 700; font-size: 16px; display: inline-block; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);">
                    ▶ Watch Now
                  </div>
                </a>
              </div>
              
              <div style="margin-top: 40px; background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Copy of your message:</p>
                <p style="margin: 0; font-style: italic; color: #475569; font-size: 15px; border-left: 3px solid #cbd5e1; padding-left: 15px;">"${message}"</p>
              </div>
              
            </div>
            
            ${footerHTML}
          </div>
        </div>
      `,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    return NextResponse.json({ message: 'Messages sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json({ error: 'Failed to send messages' }, { status: 500 });
  }
}