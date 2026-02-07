'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { 
  ShieldCheck, Loader2, ArrowRight, Smartphone, 
  Lock, CheckCircle2, User, Mail, Phone, CreditCard, Ticket, 
  GraduationCap, Briefcase, Linkedin, Github, Zap, Trophy 
} from 'lucide-react';

export default function B2CCheckoutPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  
  const planName = searchParams.get('planName') || 'Foundation';
  const isIntl = searchParams.get('intl') === 'true';
  const rawAmountINR = parseInt(searchParams.get('rawAmountINR') || '0');
  const rawAmountUSD = parseInt(searchParams.get('rawAmountUSD') || '0'); 
  const priceDisplay = searchParams.get('priceDisplay') || '0'; 
  
  const scholarshipCode = searchParams.get('scholarshipCode');
  const discountPercent = parseInt(searchParams.get('discount') || '0');

  const SEAT_PRICE_INR = 1000000; 
  const SEAT_PRICE_USD = 15000;   

  const [paymentType, setPaymentType] = useState<'full' | 'seat'>(scholarshipCode ? 'full' : 'seat');
  const [paymentMethod, setPaymentMethod] = useState<'phonepe' | 'razorpay'>('phonepe');
  const [loading, setLoading] = useState(false);
  
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    gradYear: '',
    linkedin: '',
    github: ''
  });

  const currentAmount = paymentType === 'full' 
    ? (isIntl ? rawAmountUSD : rawAmountINR) 
    : (isIntl ? SEAT_PRICE_USD : SEAT_PRICE_INR);
    
  const currentCurrency = isIntl ? 'USD' : 'INR';
  
  const formattedAmount = new Intl.NumberFormat(isIntl ? 'en-US' : 'en-IN', {
    style: 'currency',
    currency: currentCurrency,
    maximumFractionDigits: 0
  }).format(currentAmount / 100);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.college || !userDetails.gradYear) {
        alert("Please fill all required fields marked with *");
        return;
    }
    
    setLoading(true);

    try {
      if (paymentMethod === 'phonepe') {
        const res = await fetch('/api/phonepe/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: currentAmount,
            mobileNumber: userDetails.phone,
            userDetails: userDetails,
            planDetails: { name: planName, type: paymentType === 'full' ? 'Full Enrollment' : 'Seat Reservation' }
          })
        });

        const data = await res.json();
        
        if (data.success && data.url) {
          window.location.href = data.url;
        } else {
          alert('PhonePe initiation failed. Please try again.');
          setLoading(false);
        }

      } else {
        if (!(window as any).Razorpay) {
          alert("Razorpay SDK not loaded. Check internet connection.");
          setLoading(false);
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: currentAmount,
          currency: currentCurrency,
          name: "InternX AI",
          description: `${paymentType === 'full' ? 'Enrollment' : 'Seat Booking'} - ${planName}`,
          prefill: {
            name: userDetails.name,
            email: userDetails.email,
            contact: userDetails.phone
          },
          handler: async (response: any) => {
            await fetch('/api/send-confirmation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                planName: planName,
                amount: formattedAmount,
                paymentId: response.razorpay_payment_id,
                type: paymentType === 'full' ? 'Full Payment' : 'Seat Registration',
                user: userDetails,
                scholarship: scholarshipCode ? { code: scholarshipCode, discount: discountPercent } : null
              })
            });
            
            alert('Payment Successful! Redirecting to Dashboard...');
            window.location.href = '/dashboard'; 
          },
          theme: { color: paymentType === 'full' ? "#2563eb" : "#10b981" },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
        rzp.on('payment.failed', function (response: any){
            alert("Payment Failed: " + response.error.description);
            setLoading(false);
        });
      }
    } catch (error) {
      console.error("Payment Error", error);
      setLoading(false);
      alert("An error occurred processing your request.");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] text-white py-12 px-4 md:px-8 font-sans">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <div className="lg:col-span-7 space-y-8">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 font-bold uppercase tracking-wider">
               Student Enrollment
            </div>
            <h1 className="text-3xl font-bold mb-2">Secure Checkout</h1>
            <p className="text-slate-400">Complete your profile to unlock LMS access.</p>
          </div>

          {scholarshipCode && (
              <div className="bg-gradient-to-r from-green-900/40 to-green-800/40 border border-green-500/30 p-6 rounded-2xl flex items-start gap-4 shadow-lg shadow-green-900/10">
                  <div className="p-3 bg-green-500/20 rounded-full text-green-400 shrink-0">
                      <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                      <h3 className="text-lg font-bold text-white mb-1">Scholarship Applied! 🎉</h3>
                      <p className="text-sm text-slate-300">
                          Congratulations! Your test performance has unlocked a 
                          <span className="text-green-400 font-bold mx-1">{discountPercent}% Discount</span> 
                          on the Full Enrollment plan.
                      </p>
                      <div className="mt-3 inline-block bg-black/30 px-3 py-1 rounded text-xs font-mono text-green-300 border border-green-500/20">
                          Code: {scholarshipCode}
                      </div>
                  </div>
              </div>
          )}

          <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-white">
              <User className="w-5 h-5 text-blue-500" />
              LMS Profile Details
            </h2>
            
            <div className="space-y-5">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div>
                      <label className="text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">Full Name <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                            required type="text" placeholder="John Doe"
                            value={userDetails.name}
                            onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                        />
                      </div>
                   </div>
                   <div>
                      <label className="text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">WhatsApp Number <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                            required type="tel" placeholder="+91 98765 43210"
                            value={userDetails.phone}
                            onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                        />
                      </div>
                   </div>
               </div>

               <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">Email Address <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                    <input 
                        required type="email" placeholder="john@university.edu"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                    />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div>
                      <label className="text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">College / Company <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Briefcase className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                            required type="text" placeholder="IIT Delhi / TCS"
                            value={userDetails.college}
                            onChange={(e) => setUserDetails({...userDetails, college: e.target.value})}
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                        />
                      </div>
                   </div>
                   <div>
                      <label className="text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">Graduation Year <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <GraduationCap className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                            required type="text" placeholder="2025"
                            value={userDetails.gradYear}
                            onChange={(e) => setUserDetails({...userDetails, gradYear: e.target.value})}
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                        />
                      </div>
                   </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div>
                      <label className="text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">LinkedIn URL</label>
                      <div className="relative">
                        <Linkedin className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" placeholder="linkedin.com/in/john"
                            value={userDetails.linkedin}
                            onChange={(e) => setUserDetails({...userDetails, linkedin: e.target.value})}
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                        />
                      </div>
                   </div>
                   <div>
                      <label className="text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">GitHub URL</label>
                      <div className="relative">
                        <Github className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" placeholder="github.com/john"
                            value={userDetails.github}
                            onChange={(e) => setUserDetails({...userDetails, github: e.target.value})}
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                        />
                      </div>
                   </div>
               </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl">
             <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-white">
               <Ticket className="w-5 h-5 text-blue-500" />
               Payment Preference
             </h2>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                   onClick={() => setPaymentType('seat')}
                   className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${paymentType === 'seat' ? 'bg-green-600/10 border-green-500' : 'bg-black/20 border-white/5 hover:border-white/10'}`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs font-black uppercase tracking-widest ${paymentType === 'seat' ? 'text-green-400' : 'text-slate-400'}`}>Reserve Seat</span>
                        {paymentType === 'seat' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    </div>
                    <div className="text-2xl font-black text-white">
                        {new Intl.NumberFormat(isIntl ? 'en-US' : 'en-IN', { style: 'currency', currency: currentCurrency, maximumFractionDigits: 0 }).format((isIntl ? SEAT_PRICE_USD : SEAT_PRICE_INR) / 100)}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2">Block your spot now, pay the rest later. <br/> (Scholarship applicable on pending fees)</p>
                </div>

                <div 
                   onClick={() => setPaymentType('full')}
                   className={`cursor-pointer p-4 rounded-2xl border-2 transition-all ${paymentType === 'full' ? 'bg-blue-600/10 border-blue-500 shadow-blue-500/20 shadow-lg' : 'bg-black/20 border-white/5 hover:border-white/10'}`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs font-black uppercase tracking-widest ${paymentType === 'full' ? 'text-blue-400' : 'text-slate-400'}`}>
                           {scholarshipCode ? 'Best Value with Scholarship' : 'Full Enrollment'}
                        </span>
                        {paymentType === 'full' && <CheckCircle2 className="w-5 h-5 text-blue-500" />}
                    </div>
                    <div className="text-2xl font-black text-white">
                       {priceDisplay}
                    </div>
                    {scholarshipCode && (
                        <p className="text-[10px] text-green-400 mt-1 font-bold">
                            {discountPercent}% Discount Applied
                        </p>
                    )}
                    <p className="text-[10px] text-slate-400 mt-2">Instant access to LMS & Dashboard.</p>
                </div>
             </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-white">
              <CreditCard className="w-5 h-5 text-blue-500" />
              Payment Method
            </h2>

            <div className="space-y-4">
              <div 
                onClick={() => setPaymentMethod('phonepe')}
                className={`relative cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                  paymentMethod === 'phonepe' 
                    ? 'bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-500/10' 
                    : 'bg-black/20 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-[3px] flex items-center justify-center ${paymentMethod === 'phonepe' ? 'border-blue-500' : 'border-slate-600'}`}>
                    {paymentMethod === 'phonepe' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                  </div>
                  <div className="flex flex-col">
                      <span className="font-bold text-lg flex flex-wrap items-center gap-2">
                        PhonePe / UPI
                        <span className="bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-black tracking-wider">Recommended</span>
                      </span>
                  </div>
                </div>
                <Smartphone className="text-purple-400" />
              </div>

              <div 
                onClick={() => setPaymentMethod('razorpay')}
                className={`relative cursor-pointer p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                  paymentMethod === 'razorpay' 
                    ? 'bg-blue-600/10 border-blue-500 shadow-lg' 
                    : 'bg-black/20 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-[3px] flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-blue-500' : 'border-slate-600'}`}>
                    {paymentMethod === 'razorpay' && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                  </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg">Razorpay / Cards / EMI</span>
                  </div>
                </div>
                <ShieldCheck className="text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
            <div className="sticky top-10">
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full -mr-10 -mt-10" />
                    
                    <h3 className="text-xl font-bold mb-6 relative z-10">Enrollment Summary</h3>
                    
                    <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/10 relative z-10">
                        <div>
                            <div className="text-xl font-bold text-white mb-1">{planName}</div>
                            <div className="text-sm text-blue-400 font-medium px-2 py-0.5 bg-blue-500/10 rounded-md inline-block">{paymentType === 'full' ? 'Full Access' : 'Seat Booking'}</div>
                        </div>
                        <div className="font-mono text-2xl font-bold tracking-tight">{formattedAmount}</div>
                    </div>

                    <div className="space-y-4 mb-8 relative z-10">
                        <div className="flex justify-between text-sm text-slate-400">
                            <span>Subtotal</span>
                            <span>{formattedAmount}</span>
                        </div>
                        
                        {scholarshipCode && paymentType === 'full' && (
                            <div className="flex justify-between text-sm text-green-400 font-bold">
                                <span>Scholarship ({discountPercent}%)</span>
                                <span>Applied</span>
                            </div>
                        )}

                        <div className="flex justify-between text-sm text-slate-400">
                            <span>Processing Fees</span>
                            <span className="text-green-400 font-medium">₹0</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-white pt-6 border-t border-white/10">
                            <span>Total Due</span>
                            <span className="text-blue-400">{formattedAmount}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handlePayment}
                        disabled={loading}
                        className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl relative z-10 
                          ${paymentType === 'seat' 
                              ? 'bg-green-600 text-white hover:bg-green-500 shadow-green-600/25' 
                              : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/25'
                          } disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                        ) : (
                            <>
                                Pay {formattedAmount} <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 mt-6 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                        <Lock size={12} />
                        <span>Secure SSL Encrypted Payment</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}