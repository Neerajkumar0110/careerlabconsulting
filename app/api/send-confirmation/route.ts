import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planName, amount, paymentId, type, user, isEarlyBird, scholarship } = body;

    const adminEmail = await resend.emails.send({
      from: 'InternX AI Onboarding <onboarding@resend.dev>',
      to: ['careerlabconsulting@gmail.com'],
      bcc: ['mr.deepanshujoshi@gmail.com'],
      subject: `🚀 [ACTION REQUIRED] New Enrollment: ${user?.name} - ${planName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0f172a; padding: 25px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 22px; letter-spacing: 0.5px;">New Subscription & Onboarding Alert</h2>
            <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 14px;">Manee LMS Ecosystem: Autonomous Notification</p>
          </div>

          <div style="padding: 30px;">
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #bbf7d0; margin-bottom: 24px;">
              <h3 style="color: #166534; margin: 0 0 12px 0; font-size: 15px; text-transform: uppercase; font-weight: 800;">Payment Summary</h3>
              <p style="margin: 6px 0; color: #14532d;"><strong>Plan:</strong> ${planName}</p>
              <p style="margin: 6px 0; color: #14532d;"><strong>Offer:</strong> ${isEarlyBird ? 'Early Bird (10% Discount Applied)' : 'Regular Enrollment'}</p>
              <p style="margin: 6px 0; color: #14532d;"><strong>Amount Received:</strong> ${amount}</p>
              <p style="margin: 6px 0; color: #14532d;"><strong>Transaction ID:</strong> <span style="font-family: monospace; background: #dcfce7; padding: 2px 4px;">${paymentId}</span></p>
            </div>

            <div style="margin-bottom: 30px;">
              <h3 style="color: #334155; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; font-size: 17px;">Student Profile Data</h3>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9; width: 150px;">Full Name:</td><td style="padding: 10px 0; color: #0f172a; font-weight: 600; border-bottom: 1px solid #f1f5f9;">${user?.name}</td></tr>
                <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Email:</td><td style="padding: 10px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${user?.email}</td></tr>
                <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">Phone (WA):</td><td style="padding: 10px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${user?.phone}</td></tr>
                <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">College:</td><td style="padding: 10px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${user?.college || 'N/A'}</td></tr>
                <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">LinkedIn:</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="${user?.linkedin}" style="color: #2563eb; text-decoration: none;">View Profile</a></td></tr>
                <tr><td style="padding: 10px 0; color: #64748b; border-bottom: 1px solid #f1f5f9;">GitHub:</td><td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;"><a href="${user?.github}" style="color: #2563eb; text-decoration: none;">View Repo</a></td></tr>
              </table>
            </div>

            <div style="background-color: #fff7ed; padding: 20px; border-left: 5px solid #f97316; border-radius: 4px;">
              <p style="margin: 0; font-weight: 700; color: #9a3412;">ADMIN INSTRUCTION:</p>
              <p style="margin: 8px 0 0 0; color: #c2410c; font-size: 14px; line-height: 1.6;">
                The user has successfully completed the payment. Please use the data above to <strong>manually create an account</strong> on the Career Lab LMS. Once created, share the login credentials with the user via Email and WhatsApp.
              </p>
            </div>
          </div>
          <div style="background: #f8fafc; padding: 15px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9;">
            This is an automated system message from Manee AI Dashboard.
          </div>
        </div>
      `,
    });

    const studentEmail = await resend.emails.send({
        from: 'InternX AI <onboarding@resend.dev>',
        to: [user?.email],
        subject: `Welcome Aboard! 🚀 Next Steps for your ${planName} Program`,
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #2563eb; padding: 35px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 26px;">Payment Confirmed!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Welcome to the Career Lab Consulting Community.</p>
            </div>
  
            <div style="padding: 30px;">
              <p style="font-size: 16px; color: #334155;">Hi <strong>${user?.name}</strong>,</p>
              <p style="color: #334155; line-height: 1.6;">Congratulations! Your seat for the <strong>${planName}</strong> has been secured. Our team is excited to have you onboard.</p>
              
              <div style="background-color: #fef2f2; padding: 20px; border-radius: 10px; border: 1px solid #fecaca; margin: 25px 0;">
                <h3 style="color: #991b1b; margin-top: 0; font-size: 16px; display: flex; items-center: center;">⚠️ CRITICAL: Onboarding Deadline</h3>
                <p style="color: #991b1b; font-size: 14px; line-height: 1.5; margin-bottom: 0;">
                  To maintain the integrity of our batch allocation, you must complete your <strong>Onboarding & Verification process within 5 days</strong> from today. 
                </p>
              </div>
  
              <h3 style="color: #0f172a; font-size: 18px; margin-top: 25px;">What Happens Next?</h3>
              <ul style="color: #334155; line-height: 1.8; padding-left: 20px;">
                <li><strong>Manual Verification:</strong> Our sales team is verifying your payment and profile.</li>
                <li><strong>LMS Access:</strong> Your <strong>LMS Credentials</strong> will be created manually by our admin.</li>
                <li><strong>Timeline:</strong> You will receive an email with your Dashboard Access within <strong>2-4 hours</strong>.</li>
              </ul>
  
              <div style="margin-top: 30px; padding: 20px; border-top: 2px dashed #e2e8f0;">
                 <p style="margin: 0; color: #64748b; font-size: 13px;"><strong>Enrollment Summary:</strong></p>
                 <p style="margin: 5px 0; color: #0f172a; font-size: 14px;">Amount Paid: <strong>${amount}</strong></p>
                 <p style="margin: 5px 0; color: #0f172a; font-size: 14px;">Transaction ID: <span style="font-family: monospace;">${paymentId}</span></p>
              </div>

              <div style="margin-top: 40px; text-align: center;">
                <p style="font-size: 12px; color: #94a3b8; margin-bottom: 5px;">&copy; 2026 Career Lab Consulting Pvt. Ltd.</p>
                <p style="font-size: 12px; color: #94a3b8;">For support, contact: <strong>careerlabconsulting@gmail.com</strong></p>
              </div>
            </div>
          </div>
        `,
      });

    return NextResponse.json({ success: true, adminEmail, studentEmail });
  } catch (error) {
    console.error('Fatal Onboarding Error:', error);
    return NextResponse.json({ error: 'Internal Server Error during onboarding' }, { status: 500 });
  }
}