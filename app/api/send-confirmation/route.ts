import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { planName, amount, paymentId, type } = await req.json();

    const data = await resend.emails.send({
      from: 'InternX AI <onboarding@resend.dev>', 
      to: ['info@careerlabconsulting.com'],
      bcc: ['mr.deepanshujoshi@gmail.com'],
      subject: `New Enrollment: ${planName} (${type})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2>New Payment Received</h2>
          <p><strong>Plan:</strong> ${planName}</p>
          <p><strong>Payment Type:</strong> ${type}</p>
          <p><strong>Amount Paid:</strong> ${amount}</p>
          <p><strong>Razorpay Payment ID:</strong> ${paymentId}</p>
          <hr />
          <p>This is an automated notification from InternX AI Gateway.</p>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}