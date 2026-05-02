// app/api/enroll/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, amount, gateway } = body;

    const transactionId = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    if (gateway === 'phonepe') {
      const merchantId = process.env.PHONEPE_MERCHANT_ID;
      const saltKey = process.env.PHONEPE_SALT_KEY;
      const saltIndex = process.env.PHONEPE_SALT_INDEX || "1";
      
      const data = {
        merchantId: merchantId,
        merchantTransactionId: transactionId,
        merchantUserId: `MUID-${phone.slice(-4)}${Date.now()}`,
        amount: amount * 100, // Amount in paise
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/status?id=${transactionId}`,
        redirectMode: "REDIRECT",
        mobileNumber: phone,
        paymentInstrument: { type: "PAY_PAGE" }
      };

      const payload = JSON.stringify(data);
      const payloadMain = Buffer.from(payload).toString('base64');
      const stringToHash = payloadMain + '/pg/v1/pay' + saltKey;
      const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
      const checksum = sha256 + '###' + saltIndex;

      const url = "https://api.phonepe.com/apis/hermes/pg/v1/pay"; 

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'accept': 'application/json'
        },
        body: JSON.stringify({ request: payloadMain })
      });

      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        return NextResponse.json({ 
          success: true, 
          url: jsonResponse.data.instrumentResponse.redirectInfo.url,
          orderId: transactionId 
        });
      } else {
        return NextResponse.json({ success: false, message: jsonResponse.message || "PhonePe Failed" });
      }
    }

    else if (gateway === 'razorpay') {
      const options = {
        amount: amount * 100, 
        currency: "INR",
        receipt: transactionId,
      };

      const order = await razorpay.orders.create(options);

      return NextResponse.json({
        success: true,
        orderId: order.id,
        amount: options.amount,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
      });
    }

    return NextResponse.json({ success: false, message: "Invalid Gateway" }, { status: 400 });

  } catch (error) {
    console.error("Enroll API Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}