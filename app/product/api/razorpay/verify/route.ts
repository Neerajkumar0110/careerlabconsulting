// app/api/razorpay/verify/route.ts

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      userDetails, 
      planDetails 
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, 
      subject: `New Payment Received: ${planDetails.name} Plan`,
      html: `
        <h2>Payment Successful!</h2>
        <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
        <p><strong>Order ID:</strong> ${razorpay_order_id}</p>
        <br/>
        <h3>User Details:</h3>
        <p><strong>Name:</strong> ${userDetails.name}</p>
        <p><strong>Email:</strong> ${userDetails.email}</p>
        <p><strong>Phone:</strong> ${userDetails.mobile}</p>
        <br/>
        <h3>Plan Details:</h3>
        <p><strong>Role:</strong> ${planDetails.role}</p>
        <p><strong>Plan:</strong> ${planDetails.name} (${planDetails.billing})</p>
        <p><strong>Amount Paid:</strong> ₹${planDetails.amount}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Payment verified and email sent." });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}