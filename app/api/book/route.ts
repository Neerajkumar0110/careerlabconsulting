import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, phone, date, slot, category, tier } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing in environment variables");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    const googleMeetLink = `https://meet.google.com/new`; 
    
    const cleanPhone = phone.replace(/\D/g, '');

    const whatsappMsg = encodeURIComponent(
      `*🚀 NEW B2B LEAD CAPTURED*\n\n` +
      `*🎯 INTERESTED IN:* ${category} (${tier})\n` +
      `*👤 CLIENT:* ${name}\n` +
      `*🏢 COMPANY:* ${company}\n` +
      `*📅 SCHEDULE:* ${date} @ ${slot}\n\n` +
      `*💻 MEET LINK:* ${googleMeetLink}`
    );

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'CareerLab Leads <onboarding@resend.dev>', 
        to: 'artomaticaiindia@gmail.com', 
        reply_to: email, 
        subject: `⚡ [${category}] New Lead: ${name} (${company})`,
        html: `
          <div style="background-color: #f8fafc; padding: 30px; font-family: sans-serif; line-height: 1.6;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;">
              
              <div style="background: #0f172a; padding: 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">New Appointment</h1>
                <p style="color: #3b82f6; margin-top: 10px; font-weight: bold; font-size: 16px;">Target: ${category} - ${tier}</p>
              </div>

              <div style="padding: 40px;">
                <div style="background: #f1f5f9; border-left: 5px solid #3b82f6; border-radius: 12px; padding: 25px; margin-bottom: 30px;">
                  <p style="margin: 10px 0; color: #1e293b; font-size: 15px;"><strong>👤 Name:</strong> ${name}</p>
                  <p style="margin: 10px 0; color: #1e293b; font-size: 15px;"><strong>🏢 Company:</strong> ${company}</p>
                  <p style="margin: 10px 0; color: #1e293b; font-size: 15px;"><strong>📅 Schedule:</strong> ${date} | ${slot}</p>
                  <p style="margin: 10px 0; color: #1e293b; font-size: 15px;"><strong>📱 WhatsApp:</strong> ${phone}</p>
                </div>

                <div style="background: #eff6ff; border: 2px dashed #3b82f6; border-radius: 20px; padding: 30px; text-align: center; margin-bottom: 35px;">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/512px-Google_Meet_icon_%282020%29.svg.png" alt="Google Meet" width="50" style="margin-bottom: 15px;">
                  <h2 style="color: #1e40af; margin: 0; font-size: 18px;">Virtual Office Ready</h2>
                  <p style="color: #64748b; font-size: 14px; margin: 10px 0 20px 0;">Instantly start the consultation session:</p>
                  <a href="${googleMeetLink}" style="background: #3b82f6; color: white; padding: 14px 30px; border-radius: 12px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 14px;">START MEETING NOW</a>
                </div>

                <div style="text-align: center;">
                  <a href="https://wa.me/${cleanPhone}?text=${whatsappMsg}" 
                     style="background: #22c55e; color: white; padding: 16px 32px; border-radius: 14px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);">
                     📲 CONNECT ON WHATSAPP
                  </a>
                  <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">Lead captured via B2B Pricing Portal</p>
                </div>
              </div>
            </div>
          </div>
        `,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Resend API Error:", result);
      return NextResponse.json({ error: result.message || "Failed to send email" }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: result.id });

  } catch (error: any) {
    console.error("Route Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Internal Server Error" 
    }, { status: 500 });
  }
}