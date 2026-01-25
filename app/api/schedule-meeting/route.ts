import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000" 
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, query } = body;

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
      summary: `B2B Enterprise Inquiry: ${name}`,
      description: `Inquiry: ${query}\nPhone: ${phone}`,
      start: {
        dateTime: new Date(Date.now() + 3600000).toISOString(), 
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: new Date(Date.now() + 5400000).toISOString(), 
        timeZone: 'Asia/Kolkata',
      },
      attendees: [{ email: email }, { email: 'info@careerlabconsulting.com' }],
      conferenceData: {
        createRequest: { requestId: `meet_${Date.now()}`, conferenceSolutionKey: { type: 'hangoutsMeet' } },
      },
    };

    return NextResponse.json({ message: 'Inquiry Received', event });
  } catch (error) {
    console.error('Calendar Error:', error);
    return NextResponse.json({ error: 'Failed to schedule' }, { status: 500 });
  }
}