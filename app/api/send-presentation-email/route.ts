// app/api/send-presentation-email/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: true, // SSL on port 465
  auth: {
    user: process.env.SMTP_USER ?? 'india.careerlabconsulting@gmail.com',
    pass: process.env.SMTP_PASS ?? 'wvph klwz iwfc vtcx',
  },
})

// ─── HTML email template ──────────────────────────────────────────────────────
function buildEmail(name: string, profession: string): string {
  const firstName = name.split(' ')[0]

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your InternX AI Presentation — Career Lab Consulting</title>
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,Helvetica,sans-serif;color:#1a1a2e;">

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- ── Header bar ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e0a3c 0%,#2d1259 50%,#0f1f4a 100%);border-radius:16px 16px 0 0;padding:36px 40px 28px;text-align:center;">
              <!-- Logo placeholder — swap src to your hosted logo URL -->
              <img
                src="https://careerlabconsulting.com/logo.png"
                alt="Career Lab Consulting"
                width="160"
                style="display:block;margin:0 auto 20px;height:auto;"
              />
              <div style="display:inline-block;background:rgba(124,58,237,0.20);border:1px solid rgba(167,139,250,0.30);border-radius:999px;padding:4px 16px;margin-bottom:16px;">
                <span style="font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4b5fd;">
                  ✦ InternX AI — Personalised Presentation
                </span>
              </div>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.02em;line-height:1.25;">
                Great to meet you, ${firstName}!
              </h1>
              <p style="margin:10px 0 0;font-size:13px;color:rgba(196,181,253,0.85);line-height:1.6;">
                Here's everything you explored in today's session, saved for you.
              </p>
            </td>
          </tr>

          <!-- ── Divider accent ── -->
          <tr>
            <td style="height:3px;background:linear-gradient(90deg,#7c3aed,#a855f7,#10f5a0);"></td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;padding:36px 40px;">

              <!-- Greeting -->
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">
                Thanks for taking the time to go through the <strong>InternX AI</strong> presentation.
                As a <strong>${profession}</strong>, we believe this programme has a lot to offer you —
                from real-world AI projects and mentorship to global job-readiness training.
              </p>
              <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.7;">
                We've saved your presentation links below so you can revisit or share them anytime:
              </p>

              <!-- ── Link cards ── -->

              <!-- Card 1: Web view -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="border:1px solid #e5e7eb;border-radius:12px;margin-bottom:16px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <div style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7c3aed;margin-bottom:6px;">
                      📄 Single-Page Web View
                    </div>
                    <div style="font-size:14px;font-weight:600;color:#111827;margin-bottom:6px;">
                      InternX AI — Programme Overview
                    </div>
                    <div style="font-size:12px;color:#6b7280;margin-bottom:14px;line-height:1.6;">
                      A clean, scrollable overview of the full programme — perfect for quick reference
                      or sharing with someone you know.
                    </div>
                    <a href="https://careerlabconsulting.com/internship/internx-ai"
                      style="display:inline-block;background:#f5f3ff;border:1px solid #ddd6fe;border-radius:8px;
                             padding:9px 20px;font-size:13px;font-weight:600;color:#6d28d9;text-decoration:none;">
                      View Programme Page →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Card 2: Immersive presentation -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="border:1px solid #e5e7eb;border-radius:12px;margin-bottom:28px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;">
                    <div style="font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#7c3aed;margin-bottom:6px;">
                      ✨ Immersive Personalised Presentation
                    </div>
                    <div style="font-size:14px;font-weight:600;color:#111827;margin-bottom:6px;">
                      Relive the Full Interactive Experience
                    </div>
                    <div style="font-size:12px;color:#6b7280;margin-bottom:14px;line-height:1.6;">
                      The complete slide-by-slide presentation — personalised with your name and
                      profile, exactly as you saw it today.
                    </div>
                    <a href="https://careerlabconsulting.com/internx-presentation"
                      style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#6d28d9);border-radius:8px;
                             padding:9px 20px;font-size:13px;font-weight:600;color:#ffffff;text-decoration:none;">
                      Rewatch Presentation →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- ── What's inside ── -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="background:#faf5ff;border:1px solid #ede9fe;border-radius:12px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <div style="font-size:12px;font-weight:700;color:#5b21b6;margin-bottom:12px;letter-spacing:0.04em;">
                      WHAT'S INSIDE THE PROGRAMME
                    </div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      ${[
                        ['🚀', 'Live AI/ML Projects', 'Work on real-world problems with industry mentors'],
                        ['🎓', 'Structured Curriculum', '12-week intensive with weekly milestones & reviews'],
                        ['🌐', 'Global Job Readiness', 'Resume, LinkedIn, mock interviews & referrals'],
                        ['📜', 'Dual Certification', 'InternX AI + partnered industry certificates'],
                        ['💼', 'Hiring Support', 'Direct placement assistance with hiring partners'],
                      ].map(([icon, title, desc]) => `
                      <tr>
                        <td style="padding:5px 0;vertical-align:top;width:24px;font-size:16px;">${icon}</td>
                        <td style="padding:5px 0 5px 8px;vertical-align:top;">
                          <span style="font-size:13px;font-weight:600;color:#3b0764;">${title}</span>
                          <span style="font-size:12px;color:#6b7280;"> — ${desc}</span>
                        </td>
                      </tr>`).join('')}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ── CTA ── -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                style="background:linear-gradient(135deg,#1e0a3c,#2d1259);border-radius:14px;margin-bottom:28px;">
                <tr>
                  <td style="padding:28px 32px;text-align:center;">
                    <div style="font-size:18px;font-weight:700;color:#ffffff;margin-bottom:6px;">
                      Ready to Take the Next Step?
                    </div>
                    <div style="font-size:13px;color:rgba(196,181,253,0.85);margin-bottom:20px;line-height:1.6;">
                      Limited seats available in the next cohort.<br/>
                      Book a free 1:1 counselling call with our team today.
                    </div>
                    <a href="https://careerlabconsulting.com/internship/internx-ai#enroll"
                      style="display:inline-block;background:linear-gradient(135deg,#10f5a0,#059669);
                             border-radius:10px;padding:12px 32px;font-size:14px;font-weight:700;
                             color:#052e16;text-decoration:none;letter-spacing:0.02em;">
                      Enrol Now — Secure My Seat
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <p style="margin:0 0 6px;font-size:14px;color:#374151;line-height:1.7;">
                If you have any questions, just reply to this email or reach us on WhatsApp —
                we're always happy to help.
              </p>
              <p style="margin:0 0 24px;font-size:14px;color:#374151;line-height:1.7;">
                Warm regards,<br/>
                <strong>The InternX AI Team</strong><br/>
                <span style="color:#7c3aed;">Career Lab Consulting</span>
              </p>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #f3f4f6;margin:0 0 20px;" />

              <!-- Footer -->
              <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;line-height:1.7;">
                Career Lab Consulting · InternX AI Programme<br/>
                <a href="https://careerlabconsulting.com" style="color:#7c3aed;text-decoration:none;">careerlabconsulting.com</a>
                &nbsp;·&nbsp;
                <a href="mailto:india.careerlabconsulting@gmail.com" style="color:#7c3aed;text-decoration:none;">india.careerlabconsulting@gmail.com</a>
                <br/><br/>
                You're receiving this because you attended an InternX AI presentation session.
              </p>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim()
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, profession } = body as {
      name: string
      email: string
      profession: string
      whatsapp?: string
    }

    if (!name || !email) {
      return NextResponse.json({ error: 'name and email are required' }, { status: 400 })
    }

    const html = buildEmail(name, profession ?? 'Professional')

    await transporter.sendMail({
      from: `"InternX AI — Career Lab Consulting" <${process.env.SMTP_USER ?? 'india.careerlabconsulting@gmail.com'}>`,
      to: email,
      subject: `${name.split(' ')[0]}, your InternX AI presentation is saved 🚀`,
      html,
      // Plain-text fallback
      text: `
Hi ${name},

Thanks for attending the InternX AI presentation!

Here are your saved links:

1. Single-Page Web View:
   https://careerlabconsulting.com/internship/internx-ai

2. Immersive Personalised Presentation:
   https://careerlabconsulting.com/internx-presentation

Ready to enrol? Visit:
https://careerlabconsulting.com/internship/internx-ai#enroll

Warm regards,
The InternX AI Team — Career Lab Consulting
      `.trim(),
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    console.error('[send-presentation-email]', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}