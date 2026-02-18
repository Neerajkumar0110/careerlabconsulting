// app/api/scholarship-submit/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, score, totalQuestions, scholarshipCode, discount, planName } = body;

    const mrpAmount = planName === 'Foundation' ? 149999 : 249999;
    
    const scholarshipAmount = Math.round((mrpAmount * discount) / 100);
    
    const finalFee = mrpAmount - scholarshipAmount;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

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
      from: `"InternX AI" <${process.env.SMTP_USER}>`,
      to: email, 
      subject: `🎉 Scholarship Unlocked: Save ${formatCurrency(scholarshipAmount)} on ${planName}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          
          <div style="background-color: #2563eb; padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Congratulations, ${name}!</h1>
            <p style="color: #bfdbfe; margin: 10px 0 0 0; font-size: 16px;">You have qualified for the InternX AI Scholarship.</p>
          </div>

          <div style="padding: 30px;">
            
            <div style="text-align: center; margin-bottom: 25px;">
              <p style="font-size: 14px; color: #64748b; margin-bottom: 5px;">Your Aptitude Score</p>
              <div style="font-size: 32px; font-weight: 800; color: #0f172a;">${score} <span style="font-size: 18px; color: #94a3b8; font-weight: normal;">/ ${totalQuestions * 2}</span></div>
            </div>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Total Fees (MRP)</td>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px; text-align: right; text-decoration: line-through;">${formatCurrency(mrpAmount)}</td>
                </tr>

                <tr>
                  <td style="padding: 8px 0; color: #166534; font-weight: 600; font-size: 15px;">
                    Scholarship Unlocked (${discount}%)
                  </td>
                  <td style="padding: 8px 0; color: #166534; font-weight: 600; font-size: 15px; text-align: right;">
                    - ${formatCurrency(scholarshipAmount)}
                  </td>
                </tr>

                <tr>
                  <td colspan="2" style="border-bottom: 1px dashed #cbd5e1; padding: 10px 0;"></td>
                </tr>

                <tr>
                  <td style="padding: 15px 0 0 0; color: #0f172a; font-weight: 800; font-size: 16px;">New Fees After Scholarship</td>
                  <td style="padding: 15px 0 0 0; color: #2563eb; font-weight: 800; font-size: 20px; text-align: right;">
                    ${formatCurrency(finalFee)}
                  </td>
                </tr>
              </table>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <p style="font-size: 13px; color: #64748b; margin-bottom: 10px;">Your Exclusive Coupon Code</p>
              <div style="background: #eff6ff; border: 2px dashed #2563eb; color: #2563eb; font-size: 24px; font-weight: 800; padding: 15px 25px; border-radius: 8px; display: inline-block; letter-spacing: 1px;">
                ${scholarshipCode}
              </div>
              <p style="font-size: 12px; color: #94a3b8; margin-top: 15px;">
                Use this code at checkout to claim your <strong>${formatCurrency(scholarshipAmount)}</strong> discount immediately.
              </p>

              <a href="https://internx.ai/checkout/b2c?scholarshipCode=${scholarshipCode}&planName=${planName}" style="display: block; width: 100%; background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 16px 0; border-radius: 8px; font-weight: bold; margin-top: 20px; text-align: center;">
                Claim Scholarship Now
              </a>
            </div>

          </div>
          
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 11px; color: #64748b;">
            &copy; 2026 InternX AI. This scholarship is valid for 48 hours only.
          </div>
        </div>
      `,
    });

    const transporterAdmin = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
    });

    await transporterAdmin.sendMail({
      from: `"InternX System" <${process.env.SMTP_USER}>`,
      to: 'careerlabconsulting@gmail.com',
      subject: `🎓 Scholarship: ${name} (Save ${formatCurrency(scholarshipAmount)})`,
      html: `
        <h2>New Scholarship Qualified</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Plan:</strong> ${planName}</p>
        <p><strong>Score:</strong> ${score}</p>
        <p><strong>Discount:</strong> ${discount}%</p>
        <p><strong>Scholarship Amount:</strong> ${formatCurrency(scholarshipAmount)}</p>
        <p><strong>Code:</strong> ${scholarshipCode}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email Sending Error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}