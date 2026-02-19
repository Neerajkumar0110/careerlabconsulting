// app/api/checkout/razorpay/route.ts

import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    
    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX;
    
    const transactionId = `MT${Date.now()}`;
    const payload = {
      merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: "MUID" + Date.now(),
      amount: amount * 100,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/status/${transactionId}`,
      redirectMode: "POST",
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/status/${transactionId}`,
      paymentInstrument: { type: "PAY_PAGE" },
    };

    const dataPayload = JSON.stringify(payload);
    const dataBase64 = Buffer.from(dataPayload).toString("base64");
    const fullURL = dataBase64 + "/pg/v1/pay" + saltKey;
    const dataSha256 = crypto.createHash("sha256").update(fullURL).digest("hex");
    const checksum = dataSha256 + "###" + saltIndex;

    const UAT_PAY_API_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";

    const response = await fetch(UAT_PAY_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      body: JSON.stringify({ request: dataBase64 }),
    });

    const res = await response.json();
    return NextResponse.json({ url: res.data.instrumentResponse.redirectInfo.url });
  } catch (error) {
    return NextResponse.json({ error: "PhonePe Init Failed" }, { status: 500 });
  }
}