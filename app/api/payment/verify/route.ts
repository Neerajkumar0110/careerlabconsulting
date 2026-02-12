// app/api/payment/verify/route.ts
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendEnrollmentEmails } from '@/lib/mail';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { gateway, paymentData, userDetails } = body;

    if (gateway === 'razorpay') {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;
      
      const bodyStr = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
        .update(bodyStr.toString())
        .digest("hex");

      if (expectedSignature === razorpay_signature) {
        await sendEnrollmentEmails(
          { amount: userDetails.amount, transactionId: razorpay_payment_id, method: 'Razorpay' },
          userDetails
        );
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, message: "Invalid Signature" });
      }
    }

    else if (gateway === 'phonepe') {
      const { transactionId } = paymentData;
      const merchantId = process.env.PHONEPE_MERCHANT_ID;
      const saltKey = process.env.PHONEPE_SALT_KEY;
      const saltIndex = process.env.PHONEPE_SALT_INDEX || "1";

      const stringToHash = `/pg/v1/status/${merchantId}/${transactionId}` + saltKey;
      const sha256 = crypto.createHash('sha256').update(stringToHash).digest('hex');
      const checksum = sha256 + '###' + saltIndex;

      const url = `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${transactionId}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': merchantId!
        }
      });

      const data = await response.json();

      if (data.code === 'PAYMENT_SUCCESS') {
        await sendEnrollmentEmails(
          { amount: data.data.amount / 100, transactionId: data.data.transactionId, method: 'PhonePe' },
          userDetails
        );
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, message: "Payment Pending or Failed" });
      }
    }

    return NextResponse.json({ success: false, message: "Invalid Request" }, { status: 400 });

  } catch (error) {
    console.error("Verify API Error:", error);
    return NextResponse.json({ success: false, message: "Verification Failed" }, { status: 500 });
  }
}