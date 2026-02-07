import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planName, amount, paymentId, type, user } = body;

    const adminEmail = await resend.emails.send({
      from: 'InternX AI <onboarding@resend.dev>',
      to: ['info@careerlabconsulting.com'],
      bcc: ['mr.deepanshujoshi@gmail.com'],
      subject: `🚀 New B2C Enrollment: ${user?.name} - ${planName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          
          <div style="background-color: #0f172a; padding: 20px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 20px;">New Subscription Alert</h2>
          </div>

          <div style="padding: 24px;">
            <div style="background-color: #f0fdf4; padding: 16px; border-radius: 8px; border: 1px solid #bbf7d0; margin-bottom: 24px;">
              <h3 style="color: #166534; margin: 0 0 10px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em;">Transaction Details</h3>
              <p style="margin: 4px 0; color: #14532d;"><strong>Plan:</strong> ${planName}</p>
              <p style="margin: 4px 0; color: #14532d;"><strong>Type:</strong> ${type}</p>
              <p style="margin: 4px 0; color: #14532d;"><strong>Amount:</strong> ${amount}</p>
              <p style="margin: 4px 0; color: #14532d;"><strong>Payment ID:</strong> <span style="font-family: monospace;">${paymentId}</span></p>
            </div>

            <div style="margin-bottom: 24px;">
              <h3 style="color: #334155; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Student Profile</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; width: 140px;">Full Name:</td>
                  <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${user?.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Email:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${user?.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Phone:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${user?.phone}</td>
                </tr>
              </table>
            </div>

            <div>
              <h3 style="color: #334155; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">LMS / Academic Data</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; width: 140px;">College/Company:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${user?.college || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Graduation Year:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${user?.gradYear || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">LinkedIn:</td>
                  <td style="padding: 8px 0;"><a href="${user?.linkedin}" style="color: #2563eb; text-decoration: none;">${user?.linkedin || 'N/A'}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">GitHub:</td>
                  <td style="padding: 8px 0;"><a href="${user?.github}" style="color: #2563eb; text-decoration: none;">${user?.github || 'N/A'}</a></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      `,
    });

    const studentEmail = await resend.emails.send({
        from: 'InternX AI <onboarding@resend.dev>',
        to: [user?.email],
        subject: `Welcome to InternX - Enrollment Confirmed!`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            
            <div style="background-color: #2563eb; padding: 30px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 24px;">Welcome Aboard! 🚀</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your journey to an AI Career starts now.</p>
            </div>
  
            <div style="padding: 30px;">
              <p style="color: #334155; line-height: 1.6;">Hi <strong>${user?.name}</strong>,</p>
              <p style="color: #334155; line-height: 1.6;">Thank you for enrolling in the <strong>${planName}</strong> program. We have successfully received your payment.</p>
              
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
                <p style="margin: 5px 0; color: #475569; font-size: 14px;">Amount Paid</p>
                <p style="margin: 0; color: #0f172a; font-size: 24px; font-weight: bold;">${amount}</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 15px 0;">
                <p style="margin: 5px 0; color: #475569; font-size: 14px;">Transaction ID</p>
                <p style="margin: 0; color: #0f172a; font-family: monospace;">${paymentId}</p>
              </div>
  
              <h3 style="color: #0f172a;">What happens next?</h3>
              <ol style="color: #334155; line-height: 1.6; padding-left: 20px;">
                <li style="margin-bottom: 10px;">Our team is reviewing your profile details.</li>
                <li style="margin-bottom: 10px;">You will receive your <strong>LMS Credentials</strong> and <strong>Dashboard Access</strong> within 2-4 hours.</li>
                <li style="margin-bottom: 10px;">A dedicated mentor will be assigned to you shortly.</li>
              </ol>
  
              <div style="margin-top: 30px; text-align: center; color: #64748b; font-size: 12px;">
                <p>&copy; 2026 Career Lab Consulting Pvt. Ltd.</p>
                <p>Need help? Reply to this email.</p>
              </div>
            </div>
          </div>
        `,
      });

    return NextResponse.json({ success: true, adminEmail, studentEmail });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}