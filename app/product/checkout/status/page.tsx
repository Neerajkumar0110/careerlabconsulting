'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

function StatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const transactionId = searchParams.get('id');
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');

  useEffect(() => {
    if (!transactionId) return;

    const verifyPhonePe = async () => {
      const storedData = localStorage.getItem('pending_enrollment');
      if (!storedData) {
        setStatus('failed');
        return;
      }
      const userDetails = JSON.parse(storedData);

      try {
        const res = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gateway: 'phonepe',
            paymentData: { transactionId },
            userDetails
          })
        });

        const data = await res.json();
        if (data.success) {
          setStatus('success');
          localStorage.removeItem('pending_enrollment'); 
        } else {
          setStatus('failed');
        }
      } catch (error) {
        setStatus('failed');
      }
    };

    verifyPhonePe();
  }, [transactionId]);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-4">
      <div className="bg-[#0a1229] border border-white/10 p-10 rounded-3xl text-center max-w-md w-full">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold">Verifying Payment...</h2>
            <p className="text-slate-400 mt-2">Please do not close this window.</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white">Enrollment Successful!</h2>
            <p className="text-slate-400 mt-4 mb-8">
              We have sent a confirmation email with your LMS details.
            </p>
            <button onClick={() => router.push('/')} className="w-full py-4 bg-blue-600 rounded-xl font-bold">
              Go to Dashboard
            </button>
          </>
        )}

        {status === 'failed' && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white">Payment Failed</h2>
            <p className="text-slate-400 mt-4 mb-8">
              We couldn't verify your payment. If money was deducted, it will be refunded automatically.
            </p>
            <button onClick={() => router.push('/checkout/b2c/enroll')} className="w-full py-4 bg-white/10 rounded-xl font-bold">
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function StatusPage() {
  return <Suspense fallback={<div>Loading...</div>}><StatusContent /></Suspense>;
}