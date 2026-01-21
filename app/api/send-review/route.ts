import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, review, rating, ip, to } = body;

    if (!to) {
      return NextResponse.json({ error: "Missing recipient email" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: Array.isArray(to) ? to : [to], 
      subject: `⭐ ${rating} Star Review: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; max-width: 600px;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Student Review</h2>
          <p><strong>Full Name:</strong> ${name}</p>
          <p><strong>Rating:</strong> ${'⭐'.repeat(rating)} (${rating}/5)</p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <p style="margin: 0; font-style: italic; color: #334155;">"${review}"</p>
          </div>
          <p style="font-size: 11px; color: #94a3b8; margin-top: 20px;">
            Sent from IP: ${ip} | Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error Details:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Review sent successfully!", data });
  } catch (err) {
    console.error('Server Crash:', err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}