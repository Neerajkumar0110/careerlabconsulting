import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { amount, mobileNumber, userDetails, planDetails } = await req.json();

    const MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
    const SALT_KEY = process.env.PHONEPE_SALT_KEY;
    const SALT_INDEX = process.env.PHONEPE_SALT_INDEX;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    if (!MERCHANT_ID || !SALT_KEY) {
      return NextResponse.json({ success: false, message: "Server Misconfiguration: PhonePe keys missing" }, { status: 500 });
    }

    const transactionId = "MT" + Date.now();

    const payload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: 'MUID-' + Date.now(),
      amount: amount, 
      redirectUrl: `${BASE_URL}/api/payment-success?provider=phonepe`, 
      redirectMode: "POST",
      callbackUrl: `${BASE_URL}/api/phonepe/callback`,
      mobileNumber: mobileNumber,
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');

    const stringToHash = base64Payload + "/pg/v1/pay" + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const checksum = sha256 + "###" + SALT_INDEX;

    const PHONEPE_API_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"; 

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      },
      body: JSON.stringify({
        request: base64Payload
      })
    };

    const response = await fetch(PHONEPE_API_URL, options);
    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ 
        success: true, 
        url: data.data.instrumentResponse.redirectInfo.url,
        transactionId: transactionId 
      });
    } else {
      return NextResponse.json({ success: false, message: data.message || "PhonePe Error" });
    }

  } catch (error) {
    console.error("PhonePe Initiation Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}