import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planName, amount, paymentId, type, user } = body;

    const data = await resend.emails.send({
      from: 'InternX AI <onboarding@resend.dev>', 
      to: ['info@careerlabconsulting.com'],
      bcc: ['mr.deepanshujoshi@gmail.com'], 
      subject: `New Enrollment: ${planName} - ${user?.name || 'Student'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
          
          <h2 style="color: #2563eb; text-align: center; border-bottom: 2px solid #f3f4f6; padding-bottom: 15px;">
            Payment Confirmation Received
          </h2>

          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #1e293b; margin-top: 0;">Transaction Details</h3>
            <p style="margin: 5px 0;"><strong>Plan:</strong> ${planName}</p>
            <p style="margin: 5px 0;"><strong>Payment Type:</strong> ${type}</p>
            <p style="margin: 5px 0;"><strong>Amount Paid:</strong> ${amount}</p>
            <p style="margin: 5px 0;"><strong>Razorpay ID:</strong> <code style="background: #e2e8f0; padding: 2px 4px; rounded: 4px;">${paymentId}</code></p>
          </div>

          <div style="border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px;">
            <h3 style="color: #1e293b; margin-top: 0;">Student Information</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${user?.name || 'N/A'}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${user?.email}" style="color: #2563eb;">${user?.email || 'N/A'}</a></p>
            <p style="margin: 5px 0;"><strong>WhatsApp:</strong> ${user?.phone || 'N/A'}</p>
            <p style="margin: 5px 0;"><strong>Message:</strong> ${user?.message || 'No message provided.'}</p>
          </div>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;" />
          
          <p style="font-size: 12px; color: #64748b; text-align: center;">
            This is an automated notification from the InternX AI Enrollment Portal.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}