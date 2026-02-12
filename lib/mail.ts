// lib/mail.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEnrollmentEmails = async (paymentDetails: any, userDetails: any) => {
  const { amount, transactionId, method } = paymentDetails;
  const { fullName, email, phone, college, branch, year, programId } = userDetails;

  const adminMailOptions = {
    from: `"Career Lab Consulting" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER, 
    subject: `🔔 New Enrollment: ${fullName} - ${programId}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #2563eb;">New Student Enrollment</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td><strong>Name:</strong></td><td>${fullName}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
          <tr><td><strong>College:</strong></td><td>${college}</td></tr>
          <tr><td><strong>Branch:</strong></td><td>${branch}</td></tr>
          <tr><td><strong>Year:</strong></td><td>${year}</td></tr>
          <tr><td><strong>Program:</strong></td><td>${programId}</td></tr>
          <tr><td><strong>Amount Paid:</strong></td><td>₹${amount}</td></tr>
          <tr><td><strong>Transaction ID:</strong></td><td>${transactionId}</td></tr>
          <tr><td><strong>Method:</strong></td><td>${method}</td></tr>
        </table>
      </div>
    `,
  };

  const userMailOptions = {
    from: `"InternX Team" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `✅ Enrollment Confirmed: ${programId}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb;">Welcome to InternX, ${fullName}!</h2>
        <p>Your seat for <strong>${programId}</strong> has been successfully reserved.</p>
        <p><strong>Payment Details:</strong></p>
        <ul>
          <li>Amount: ₹${amount}</li>
          <li>Transaction Ref: ${transactionId}</li>
        </ul>
        <p>Our team will contact you shortly with your LMS credentials.</p>
        <br/>
        <p>Best Regards,<br/>Team InternX</p>
      </div>
    `,
  };

  await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(userMailOptions)
  ]);
};