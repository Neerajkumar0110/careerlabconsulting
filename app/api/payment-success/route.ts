// app/api/payment-success/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { userDetails, planDetails, paymentId } = await req.json();

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
      from: `"Career Lab Consulting" <${process.env.SMTP_USER}>`,
      to: "info@careerlabconsulting.com", 
      subject: `New Plan Purchased: ${planDetails.name}`,
      html: `
        <h2>New Subscription Alert 🚀</h2>
        <p><strong>Client Name:</strong> ${userDetails.name}</p>
        <p><strong>Email:</strong> ${userDetails.email}</p>
        <p><strong>Phone:</strong> ${userDetails.phone}</p>
        <hr />
        <p><strong>Plan:</strong> ${planDetails.name} (${planDetails.category})</p>
        <p><strong>Amount:</strong> ${planDetails.price}</p>
        <p><strong>Payment ID:</strong> ${paymentId}</p>
      `,
    };

    const userMailOptions = {
      from: `"CareerLab Consulting" <${process.env.SMTP_USER}>`,
      to: userDetails.email,
      subject: "Welcome to Career Lab Consulting - Payment Successful",
      html: `
        <h2>Hello ${userDetails.name},</h2>
        <p>Thank you for choosing CareerLab Consulting. Your payment has been successfully received.</p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            <p><strong>Plan:</strong> ${planDetails.name}</p>
            <p><strong>Transaction ID:</strong> ${paymentId}</p>
            <p><strong>Status:</strong> Active</p>
        </div>
        <p>Our team will contact you shortly to set up your account.</p>
        <br />
        <p>Regards,<br/>CareerLab Team</p>
      `,
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({ success: true, message: "Emails sent successfully" });

  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ success: false, error: "Failed to send emails" }, { status: 500 });
  }
}