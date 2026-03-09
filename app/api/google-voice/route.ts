// app/api/google-voice/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const GOOGLE_CLOUD_API_KEY = process.env.GOOGLE_CLOUD_TTS_API_KEY; 
    if (!GOOGLE_CLOUD_API_KEY) throw new Error("Missing Google Cloud API Key");

    const ssmlText = `<speak><prosody rate="0.95" pitch="-1.0st">${text.replace(/,/g, '<break time="300ms"/>')}</prosody></speak>`;

    const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_CLOUD_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { ssml: ssmlText }, 
        voice: { 
          languageCode: 'en-IN', 
          name: 'en-IN-Neural2-D' 
        },
        audioConfig: { 
          audioEncoding: 'MP3',
          effectsProfileId: ['telephony-class-application'] 
        }
      })
    });

    if (!response.ok) throw new Error('Google TTS API Error');

    const data = await response.json();
    return NextResponse.json({ audioContent: data.audioContent });

  } catch (error) {
    console.error("Voice Generation Failed:", error);
    return NextResponse.json({ error: 'Failed to generate speech' }, { status: 500 });
  }
}