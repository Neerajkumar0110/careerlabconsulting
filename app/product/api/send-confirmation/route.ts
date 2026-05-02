// app/api/send-confirmation/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planName, amount, paymentId, type, user, isEarlyBird, scholarship } = body;

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
      bcc: 'mr.deepanshujoshi@gmail.com', 
      subject: `🚀 [ACTION REQUIRED] New Enrollment: ${user?.name} - ${planName}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 25px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 22px;">New Subscription Alert</h2>
            <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 14px;">Manee LMS Ecosystem</p>
          </div>

          <div style="padding: 30px;">
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #bbf7d0; margin-bottom: 24px;">
              <h3 style="color: #166534; margin: 0 0 12px 0; font-size: 15px; text-transform: uppercase;">Payment Summary</h3>
              <p style="margin: 6px 0; color: #14532d;"><strong>Plan:</strong> ${planName}</p>
              <p style="margin: 6px 0; color: #14532d;"><strong>Offer:</strong> ${isEarlyBird ? 'Early Bird (10% Discount)' : 'Regular Enrollment'}</p>
              <p style="margin: 6px 0; color: #14532d;"><strong>Amount:</strong> ${amount}</p>
              <p style="margin: 6px 0; color: #14532d;"><strong>Transaction ID:</strong> ${paymentId}</p>
            </div>

            <h3 style="color: #334155; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Student Data</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Full Name:</td><td style="padding: 10px 0; font-weight: 600; border-bottom: 1px solid #f1f5f9;">${user?.name}</td></tr>
              <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Email:</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${user?.email}</td></tr>
              <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Phone:</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${user?.phone}</td></tr>
              <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">College:</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${user?.college || 'N/A'}</td></tr>
              <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">LinkedIn:</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">${user?.linkedin || 'N/A'}</td></tr>
            </table>

            <div style="background-color: #fff7ed; padding: 20px; border-left: 5px solid #f97316; margin-top: 25px;">
              <p style="margin: 0; font-weight: 700; color: #9a3412;">ACTION REQUIRED:</p>
              <p style="margin: 8px 0 0 0; color: #c2410c; font-size: 14px;">
                Please manually create an account on the LMS and share credentials with the user via Email/WhatsApp.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"InternX AI" <${process.env.SMTP_USER}>`,
      to: user?.email, 
      subject: `Welcome Aboard! 🚀 Next Steps for your ${planName} Program`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #2563eb; padding: 35px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 26px;">Payment Confirmed!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Welcome to the Career Lab Consulting Community.</p>
          </div>

          <div style="padding: 30px;">
            <p style="font-size: 16px; color: #334155;">Hi <strong>${user?.name}</strong>,</p>
            <p style="color: #334155; line-height: 1.6;">Congratulations! Your seat for the <strong>${planName}</strong> has been secured.</p>
            
            <div style="background-color: #fef2f2; padding: 20px; border-radius: 10px; border: 1px solid #fecaca; margin: 25px 0;">
              <h3 style="color: #991b1b; margin-top: 0; font-size: 16px;">⚠️ CRITICAL: Onboarding Deadline</h3>
              <p style="color: #991b1b; font-size: 14px; margin-bottom: 0;">
                Complete your Onboarding & Verification process within <strong>5 days</strong>.
              </p>
            </div>

            <h3 style="color: #0f172a; font-size: 18px; margin-top: 25px;">What Happens Next?</h3>
            <ul style="color: #334155; line-height: 1.8; padding-left: 20px;">
              <li><strong>Verification:</strong> Our team is verifying your profile.</li>
              <li><strong>LMS Access:</strong> Credentials will be created manually.</li>
              <li><strong>Timeline:</strong> You will receive dashboard access within <strong>2-4 hours</strong>.</li>
            </ul>

            <div style="margin-top: 30px; padding: 20px; border-top: 2px dashed #e2e8f0;">
               <p style="margin: 0; color: #64748b; font-size: 13px;"><strong>Enrollment Summary:</strong></p>
               <p style="margin: 5px 0; color: #0f172a; font-size: 14px;">Amount Paid: <strong>${amount}</strong></p>
               <p style="margin: 5px 0; color: #0f172a; font-size: 14px;">Transaction ID: <span style="font-family: monospace;">${paymentId}</span></p>
            </div>

            <div style="margin-top: 40px; text-align: center;">
              <p style="font-size: 12px; color: #94a3b8;">&copy; 2026 Career Lab Consulting Pvt. Ltd.</p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Fatal Onboarding Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}