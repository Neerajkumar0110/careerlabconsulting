'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Script from 'next/script'; 
import { 
  ShieldCheck, Zap, CreditCard, CheckCircle2, 
  AlertCircle, Loader2 
} from 'lucide-react';

const SEAT_RESERVATION_FEE = 10000;

const getCourseTitle = (id: string | null) => {
  if (!id) return "InternX Advanced Program";
  const formatted = id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return `InternX ${formatted}`;
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const programId = searchParams.get('programId');
  const courseTitle = getCourseTitle(programId);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false); 
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    branch: '',
    year: '',
  });

  const verifyPayment = async (gateway: string, paymentData: any) => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gateway,
          paymentData,
          userDetails: { ...formData, programId, amount: SEAT_RESERVATION_FEE }
        })
      });

      const result = await res.json();
      
      if (result.success) {
        router.push(`/checkout/status?id=${paymentData.razorpay_payment_id}&status=success`);
      } else {
        alert("Verification failed: " + result.message);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
      alert("Error verifying payment");
      setIsLoading(false);
    }
  };

  const handlePayment = async (method: 'phonepe' | 'razorpay') => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.college || !formData.branch || !formData.year) {
      alert("Please fill in all student details to proceed.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          programId,
          amount: SEAT_RESERVATION_FEE,
          gateway: method
        })
      });

      const data = await response.json();

      if (!data.success) {
        alert("Payment initialization failed: " + data.message);
        setIsLoading(false);
        return;
      }

      if (method === 'phonepe') {
        localStorage.setItem('pending_enrollment', JSON.stringify({
          ...formData,
          programId,
          amount: SEAT_RESERVATION_FEE
        }));
        window.location.href = data.url;
      } 
      
      else if (method === 'razorpay') {
        if (!(window as any).Razorpay) {
          alert("Razorpay SDK failed to load. Please check your internet connection.");
          setIsLoading(false);
          return;
        }

        const options = {
          key: data.key,
          amount: data.amount,
          currency: "INR",
          name: "InternX",
          description: `Seat Reservation: ${courseTitle}`,
          order_id: data.orderId,
          handler: function (response: any) {
             verifyPayment('razorpay', response);
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone
          },
          theme: {
            color: "#2563eb"
          },
          modal: {
            ondismiss: function() {
              setIsLoading(false);
            }
          }
        };

        const rzp1 = new (window as any).Razorpay(options);
        
        rzp1.on('payment.failed', function (response: any){
            alert(response.error.description);
            setIsLoading(false);
        });

        rzp1.open();
      }

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      
      <Script 
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setIsRazorpayLoaded(true)}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-blue-500 font-bold uppercase tracking-[0.3em] text-xs mb-4">
            <span className="w-8 h-[1px] bg-blue-500"></span>
            Official Seat Allocation
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
            Secure Your <span className="text-blue-500">Spot</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-[#0a1229]/50 border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="w-32 h-32 text-white" />
              </div>
              
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                  <ShieldCheck className="text-blue-500 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase italic">Candidate Details</h2>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">LMS Registration Data</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 relative z-10">
                {[
                  { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Enter your full name' },
                  { label: 'Email Address', name: 'email', type: 'email', placeholder: 'official@email.com' },
                  { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 99999 99999' },
                  { label: 'College / University', name: 'college', type: 'text', placeholder: 'Current Institution' },
                  { label: 'Branch / Stream', name: 'branch', type: 'text', placeholder: 'e.g. CSE, ECE, Mech' },
                  { label: 'Graduation Year', name: 'year', type: 'number', placeholder: 'e.g. 2026' },
                ].map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 ml-2">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-[#020617]/50 border border-white/10 p-4 rounded-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700 font-medium text-sm"
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-[#0a1229]/50 border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-purple-600/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
                  <CreditCard className="text-purple-500 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase italic">Payment Method</h2>
                  <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">256-Bit SSL Encrypted</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => handlePayment('phonepe')}
                  disabled={isLoading}
                  className="group relative overflow-hidden flex flex-col items-center justify-center gap-3 p-8 border border-white/5 rounded-3xl bg-white/5 hover:bg-[#5f259f] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Zap className="w-8 h-8 text-[#5f259f] group-hover:text-white transition-colors" />}
                  <span className="font-black uppercase text-sm tracking-widest group-hover:text-white">Pay via PhonePe</span>
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#5f259f] text-[8px] font-black rounded text-white opacity-0 group-hover:opacity-100 transition-opacity">FASTEST</div>
                </button>

                <button
                  onClick={() => handlePayment('razorpay')}
                  disabled={isLoading || !isRazorpayLoaded} // Disable if script not loaded
                  className="group flex flex-col items-center justify-center gap-3 p-8 border border-white/5 rounded-3xl bg-white/5 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-8 h-8 animate-spin text-blue-500" /> : <CreditCard className="w-8 h-8 text-blue-500" />}
                  <span className="font-black uppercase text-sm tracking-widest">Cards / NetBanking</span>
                </button>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-900/20 sticky top-10">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xs uppercase font-black tracking-[0.2em] opacity-80">Order Summary</h3>
                <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold backdrop-blur-sm">
                  Seat Reservation
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-black italic uppercase leading-tight mb-2">{courseTitle}</h2>
                <div className="flex items-center gap-2 text-xs font-bold opacity-80">
                  <CheckCircle2 className="w-3 h-3" /> Batch: Feb 2026
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/20">
                <div className="flex justify-between text-sm font-medium">
                  <span className="opacity-70">Reservation Fee</span>
                  <span className="font-bold">₹{SEAT_RESERVATION_FEE.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="opacity-70">LMS Credentials</span>
                  <span className="text-emerald-300 font-bold uppercase text-xs tracking-wider">Instant Access</span>
                </div>
                
                <div className="pt-4 mt-2 border-t border-white/10 flex justify-between items-end">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-70">Total Payable</span>
                  <span className="text-3xl font-black">₹{SEAT_RESERVATION_FEE.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 bg-black/20 rounded-xl p-4 flex items-start gap-3 backdrop-blur-sm">
                 <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                 <p className="text-[10px] leading-relaxed font-medium text-white/80">
                   This fee is adjusted against your total program cost. Paying this secures your scholarship and internship slot immediately.
                 </p>
              </div>
            </div>
          </aside>
        </div>

        <p className="mt-12 text-center text-slate-600 text-[10px] uppercase font-black tracking-[0.3em]">
          Secured By Career Lab Consulting Secure Systems • Terms & Conditions Apply
        </p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}