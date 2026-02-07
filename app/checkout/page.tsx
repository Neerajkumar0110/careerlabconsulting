'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { 
  ShieldCheck, Loader2, ArrowRight, CreditCard, 
  Smartphone, Lock, Building2, MapPin, Edit2, Tag, X, 
  CheckCircle2
} from 'lucide-react';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  
  const [step, setStep] = useState<1 | 2>(1);

  const planName = searchParams.get('plan') || 'Starter';
  const planCategory = searchParams.get('category') || 'Single Product';
  const originalAmountPaise = parseInt(searchParams.get('amount') || '0');

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    gstin: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'phonepe' | 'razorpay'>('phonepe');
  const [loading, setLoading] = useState(false);
  
  const [couponCode, setCouponCode] = useState('');
  const [discountPaise, setDiscountPaise] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });

  const platformFee = 0;
  const finalAmountPaise = originalAmountPaise - discountPaise;

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatCurrency = (amountInPaise: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amountInPaise / 100);
  };

  const handleApplyCoupon = () => {
    if (!couponCode) return;

    if (couponCode.toUpperCase() === 'SAVE20') {
        const discountValue = originalAmountPaise * 0.20; 
        setDiscountPaise(discountValue);
        setAppliedCoupon('SAVE20');
        setCouponMessage({ type: 'success', text: '20% Discount Applied!' });
    } else {
        setCouponMessage({ type: 'error', text: 'Invalid Coupon Code' });
        setDiscountPaise(0);
        setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
      setCouponCode('');
      setDiscountPaise(0);
      setAppliedCoupon(null);
      setCouponMessage({ type: '', text: '' });
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userDetails.name || !userDetails.email || !userDetails.phone || 
        !userDetails.address || !userDetails.city || !userDetails.state || !userDetails.pincode) {
      alert("Please fill in all required fields (marked with *) to proceed.");
      return;
    }
    
    setStep(2);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      if (paymentMethod === 'phonepe') {
        const res = await fetch('/api/phonepe/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: finalAmountPaise, 
            mobileNumber: userDetails.phone,
            userDetails: userDetails,
            planDetails: { name: planName, category: planCategory }
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
          amount: finalAmountPaise, 
          currency: "INR",
          name: "Career Lab Consulting",
          description: `${planName} - ${planCategory}`,
          prefill: {
            name: userDetails.name,
            email: userDetails.email,
            contact: userDetails.phone
          },
          handler: async (response: any) => {
            await fetch('/api/payment-success', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                userDetails,
                planDetails: { 
                    name: planName, 
                    category: planCategory, 
                    price: formatCurrency(finalAmountPaise) 
                }
              })
            });
            
            alert('Payment Successful!');
            window.location.href = '/dashboard';
          },
          theme: { color: "#2563eb" },
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
            <h1 className="text-3xl font-bold mb-2">Secure Checkout</h1>
            <p className="text-slate-400">Complete your registration details to access the Enterprise OS.</p>
          </div>

          <div className={`bg-white/5 border ${step === 1 ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-white/10'} p-6 md:p-8 rounded-3xl transition-all duration-300`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold flex items-center gap-2 ${step === 1 ? 'text-white' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 1 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>1</div>
                Billing Information
              </h2>
              {step === 2 && (
                <button onClick={() => setStep(1)} className="text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:text-blue-300">
                  <Edit2 size={12} /> Edit
                </button>
              )}
            </div>
            
            <form id="billing-form" onSubmit={handleProceedToPayment} className={step === 2 ? 'opacity-50 pointer-events-none grayscale' : ''}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    required type="text" placeholder="John Doe"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">Phone Number <span className="text-red-500">*</span></label>
                  <input 
                    required type="tel" placeholder="+91 98765 43210"
                    value={userDetails.phone}
                    onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    required type="email" placeholder="john@company.com"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">Company Name</label>
                  <div className="relative">
                    <input 
                      type="text" placeholder="Acme Inc."
                      value={userDetails.company}
                      onChange={(e) => setUserDetails({...userDetails, company: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                    />
                    <Building2 className="absolute left-3 top-3.5 text-slate-600" size={16} />
                  </div>
                </div>
              </div>

              <div className="mb-5">
                 <label className="text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">GSTIN (Optional)</label>
                 <input 
                    type="text" placeholder="22AAAAA0000A1Z5"
                    value={userDetails.gstin}
                    onChange={(e) => setUserDetails({...userDetails, gstin: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700 uppercase"
                  />
              </div>

              <div className="mb-5">
                 <label className="text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">Billing Address <span className="text-red-500">*</span></label>
                 <div className="relative">
                    <input 
                        required type="text" placeholder="123, Tech Park, Sector 62"
                        value={userDetails.address}
                        onChange={(e) => setUserDetails({...userDetails, address: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                    />
                    <MapPin className="absolute left-3 top-3.5 text-slate-600" size={16} />
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                 <div>
                    <label className="text-[10px] md:text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">City <span className="text-red-500">*</span></label>
                    <input 
                        required type="text" placeholder="Noida"
                        value={userDetails.city}
                        onChange={(e) => setUserDetails({...userDetails, city: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                    />
                 </div>
                 <div>
                    <label className="text-[10px] md:text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">State <span className="text-red-500">*</span></label>
                    <input 
                        required type="text" placeholder="UP"
                        value={userDetails.state}
                        onChange={(e) => setUserDetails({...userDetails, state: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                    />
                 </div>
                 <div>
                    <label className="text-[10px] md:text-[11px] font-bold uppercase text-slate-500 ml-1 mb-1.5 block">Pincode <span className="text-red-500">*</span></label>
                    <input 
                        required type="text" placeholder="201301"
                        value={userDetails.pincode}
                        onChange={(e) => setUserDetails({...userDetails, pincode: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-3 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                    />
                 </div>
              </div>
            </form>
          </div>

          <div className={`bg-white/5 border p-6 md:p-8 rounded-3xl transition-all duration-300 ${step === 2 ? 'border-blue-500/50 opacity-100 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-white/10 opacity-40 grayscale pointer-events-none'}`}>
            <h2 className={`text-xl font-bold flex items-center gap-2 mb-6 ${step === 2 ? 'text-white' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 2 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}>2</div>
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
                        PhonePe UPI / Cards
                        <span className="bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-black tracking-wider">Recommended</span>
                      </span>
                      <span className="text-xs text-slate-400 mt-1">Pay via UPI (GPay, Paytm), Credit/Debit Card, Netbanking</span>
                  </div>
                </div>
                <div className="hidden sm:block bg-white/10 p-2.5 rounded-xl">
                  <Smartphone size={28} className="text-purple-400" />
                </div>
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
                      <span className="font-bold text-lg">Razorpay</span>
                      <span className="text-xs text-slate-400 mt-1">Pay via Cards, Wallet, EMI</span>
                  </div>
                </div>
                <div className="hidden sm:block bg-white/10 p-2.5 rounded-xl">
                  <ShieldCheck size={28} className="text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
            <div className="sticky top-10">
                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full -mr-10 -mt-10" />
                    
                    <h3 className="text-xl font-bold mb-6 relative z-10">Order Summary</h3>
                    
                    <div className="flex items-start justify-between mb-6 pb-6 border-b border-white/10 relative z-10">
                        <div>
                            <div className="text-xl font-bold text-white mb-1">{planName} Plan</div>
                            <div className="text-sm text-blue-400 font-medium px-2 py-0.5 bg-blue-500/10 rounded-md inline-block">{planCategory} License</div>
                        </div>
                        <div className="font-mono text-xl font-bold tracking-tight">{formatCurrency(originalAmountPaise)}</div>
                    </div>

                    <div className="space-y-4 mb-8 relative z-10">
                        <div className="flex justify-between text-sm text-slate-400">
                            <span>Subtotal</span>
                            <span>{formatCurrency(originalAmountPaise)}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm text-slate-400">
                            <span>Platform Fee</span>
                            <span className="text-white font-medium">₹0</span>
                        </div>
                        
                        {discountPaise > 0 && (
                             <div className="flex justify-between text-sm text-green-400 font-bold">
                                <span>Coupon Discount (20%)</span>
                                <span>- {formatCurrency(discountPaise)}</span>
                            </div>
                        )}

                        {userDetails.gstin && (
                           <div className="flex justify-between text-sm text-slate-400">
                              <span>GST Input Credit</span>
                              <span className="text-green-400 font-medium">Available</span>
                          </div>
                        )}
                        
                        <div className="pt-4 pb-2">
                             {!appliedCoupon ? (
                                <div className="relative flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-3 text-slate-500" size={16} />
                                        <input 
                                            type="text" 
                                            placeholder="Promo Code" 
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors uppercase"
                                        />
                                    </div>
                                    <button 
                                        onClick={handleApplyCoupon}
                                        className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl px-4 text-sm font-bold transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                             ) : (
                                 <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex items-center justify-between">
                                     <div className="flex items-center gap-2">
                                         <CheckCircle2 className="text-green-500" size={16} />
                                         <span className="text-green-400 text-sm font-bold">Code '{appliedCoupon}' Applied</span>
                                     </div>
                                     <button onClick={handleRemoveCoupon} className="text-slate-400 hover:text-white">
                                         <X size={16} />
                                     </button>
                                 </div>
                             )}
                             {couponMessage.text && !appliedCoupon && (
                                 <p className={`text-xs mt-2 ${couponMessage.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                                     {couponMessage.text}
                                 </p>
                             )}
                              {!appliedCoupon && (
                                 <p className="text-[10px] text-slate-500 mt-2">Try code <strong className="text-blue-400 cursor-pointer" onClick={() => setCouponCode('SAVE20')}>SAVE20</strong> for instant discount.</p>
                             )}
                        </div>

                        <div className="flex justify-between text-2xl font-bold text-white pt-4 border-t border-white/10">
                            <span>Total Due</span>
                            <span className="text-blue-400">{formatCurrency(finalAmountPaise)}</span>
                        </div>
                    </div>

                    <button 
                        onClick={step === 1 ? (e) => handleProceedToPayment(e as any) : handlePayment}
                        disabled={loading}
                        className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl relative z-10 
                          ${step === 1 
                              ? 'bg-white text-black hover:bg-slate-200' 
                              : 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/25'
                          } disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                        ) : (
                            <>
                                {step === 1 ? (
                                  <>Proceed to Payment <ArrowRight className="w-4 h-4" /></>
                                ) : (
                                  <>Pay {formatCurrency(finalAmountPaise)} <ShieldCheck className="w-4 h-4" /></>
                                )}
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