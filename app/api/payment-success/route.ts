import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    let body;
    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('application/x-www-form-urlencoded')) {
        return NextResponse.redirect(new URL('/dashboard?status=success', req.url));
    } else {
        body = await req.json();
    }

    const { userDetails, planDetails, paymentId } = body;

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
      from: `"Career Lab System" <${process.env.SMTP_USER}>`,
      to: "info@careerlabconsulting.com", 
      subject: `New B2B Order: ${planDetails.name} - ${userDetails.company || userDetails.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #2563eb;">New Subscription Alert 🚀</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <h3 style="margin-top:0;">Client Details</h3>
            <p><strong>Name:</strong> ${userDetails.name}</p>
            <p><strong>Company:</strong> ${userDetails.company || 'N/A'}</p>
            <p><strong>Email:</strong> ${userDetails.email}</p>
            <p><strong>Phone:</strong> ${userDetails.phone}</p>
            <p><strong>GSTIN:</strong> ${userDetails.gstin || 'N/A'}</p>
            <p><strong>Address:</strong> ${userDetails.address}, ${userDetails.city}, ${userDetails.state} - ${userDetails.pincode}</p>
          </div>
          <br/>
          <div style="background: #f0fdf4; padding: 20px; border-radius: 10px; border: 1px solid #bbf7d0;">
            <h3 style="margin-top:0;">Order Details</h3>
            <p><strong>Plan:</strong> ${planDetails.name} (${planDetails.category})</p>
            <p><strong>Amount Paid:</strong> ${planDetails.price}</p>
            <p><strong>Payment ID:</strong> ${paymentId}</p>
          </div>
        </div>
      `,
    };

    const userMailOptions = {
      from: `"CareerLab Consulting" <${process.env.SMTP_USER}>`,
      to: userDetails.email,
      subject: "Payment Receipt - Career Lab Consulting",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Welcome aboard, ${userDetails.name}!</h2>
          <p>Thank you for choosing CareerLab Consulting. Your payment has been successfully processed.</p>
          
          <div style="background: #f4f4f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Plan:</strong> ${planDetails.name}</p>
              <p style="margin: 5px 0;"><strong>Transaction ID:</strong> ${paymentId}</p>
              <p style="margin: 5px 0;"><strong>Amount:</strong> ${planDetails.price}</p>
              <p style="margin: 5px 0;"><strong>Status:</strong> <span style="color: green; font-weight: bold;">Active</span></p>
          </div>
          
          <p>Our onboarding team will reach out to you within 2-4 hours to set up your Enterprise OS environment.</p>
          <br />
          <p style="font-size: 12px; color: #666;">Regards,<br/>CareerLab Team</p>
        </div>
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