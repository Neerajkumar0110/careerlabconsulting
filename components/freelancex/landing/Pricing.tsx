"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, ChevronRight, X, User, Mail, Phone, Loader2, ShieldCheck } from "lucide-react";
import Script from "next/script";

type Role = "client" | "freelancer";
type Billing = "monthly" | "yearly";

const PRICING = {
  client: {
    badge: "For Employers",
    plans: [
      { name: "Basic", price: { monthly: 0, yearly: 0 }, description: "Best for small one-off projects.", features: ["Post 2 jobs/mo", "Standard visibility", "Community support"] },
      { name: "Pro", price: { monthly: 2499, yearly: 24990 }, description: "Perfect for growing startups.", features: ["Unlimited job posts", "AI Matchmaking", "Featured listings", "Priority support"], highlight: true },
      { name: "Enterprise", price: { monthly: "Custom", yearly: "Custom" }, description: "Full-service talent acquisition.", features: ["Dedicated Account Manager", "Custom Vetting", "API access", "White-labeling"] },
    ],
  },
  freelancer: {
    badge: "For Professionals",
    plans: [
      { name: "Free", price: { monthly: 0, yearly: 0 }, description: "Start your journey today.", features: ["15 connects/mo", "Standard profile", "Basic analytics"] },
      { name: "Gold", price: { monthly: 999, yearly: 8990 }, description: "Stand out from the crowd.", features: ["Unlimited bidding", "Featured Profile Badge", "Skill assessments", "1% Service fee"], highlight: true },
      { name: "Elite", price: { monthly: 2999, yearly: 28990 }, description: "For the top 1% talent.", features: ["Verified Pro status", "Direct client invites", "0% Service fee", "Tax & GST help"] },
    ],
  },
};

export default function LuxuryPricing() {
  const [role, setRole] = useState<Role>("client");
  const [billing, setBilling] = useState<Billing>("monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });

  const handlePlanSelection = (plan: any) => {
    if (plan.price[billing] === 0 || plan.price[billing] === "Custom") {
      handleFreeOrCustomRedirect(plan);
      return;
    }
    
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleFreeOrCustomRedirect = (plan: any) => {
    const ownerNumber = "918700827753";
    const message = `*Inquiry - Career Lab Consulting*%0A%0A*Plan:* ${plan.name} (${billing})%0A*Role:* ${role}%0A*Interest:* I want to know more about this plan.`;
    window.open(`https://wa.me/${ownerNumber}?text=${message}`, "_blank");
  };

  const initiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const amount = selectedPlan.price[billing];

    try {
      const orderRes = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      const orderData = await orderRes.json();

      if (!orderData.id) throw new Error("Failed to create order");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Career Lab Consulting",
        description: `${selectedPlan.name} Plan (${billing})`,
        order_id: orderData.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#4f46e5" 
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                userDetails: formData,
                planDetails: {
                  name: selectedPlan.name,
                  billing: billing,
                  role: role,
                  amount: amount
                }
              })
            });

            if (verifyRes.ok) {
              const ownerNumber = "918700827753";
              const message = `*✅ PAYMENT SUCCESSFUL - Career Lab Consulting*%0A%0A` +
                `*Name:* ${formData.name}%0A` +
                `*Mobile:* ${formData.mobile}%0A` +
                `*Plan Bought:* ${selectedPlan.name} (${billing})%0A` +
                `*Amount Paid:* ₹${amount}%0A` +
                `*Payment ID:* ${response.razorpay_payment_id}%0A%0A` +
                `_Payment verified and account is ready for activation._`;
              
              window.open(`https://wa.me/${ownerNumber}?text=${message}`, "_blank");
              setIsModalOpen(false);
              setFormData({ name: "", email: "", mobile: "" });
            } else {
              alert("Payment received, but verification failed. Please contact support.");
            }
          } catch (err) {
            console.error(err);
            alert("Error verifying payment.");
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on('payment.failed', function (response: any){
        alert(`Payment Failed: ${response.error.description}`);
      });

      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Something went wrong while initiating payment.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <section className="relative bg-[#020617] py-24 px-6 overflow-hidden min-h-screen font-sans">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.span className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-bold tracking-widest uppercase">
              {PRICING[role].badge}
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-black text-white mt-6 mb-8 tracking-tight">
              Scale your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Future.</span>
            </h2>

            <div className="flex flex-col items-center gap-6">
              <div className="flex p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                {["client", "freelancer"].map((r) => (
                  <button key={r} onClick={() => setRole(r as Role)} className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${role === r ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}>
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <span className={billing === "monthly" ? "text-white" : "text-gray-500"}>Monthly</span>
                <button onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")} className="w-12 h-6 rounded-full bg-white/10 relative transition-colors">
                  <motion.div animate={{ x: billing === "monthly" ? 2 : 26 }} className="absolute top-1 w-4 h-4 rounded-full bg-indigo-500" />
                </button>
                <span className={billing === "yearly" ? "text-white" : "text-gray-500"}>Yearly <span className="text-emerald-400 text-xs ml-1">(Save 20%)</span></span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING[role].plans.map((plan, i) => (
              <motion.div key={i} className={`relative p-8 rounded-[40px] border transition-all duration-500 ${plan.highlight ? "bg-gradient-to-b from-[#0f172a] to-[#020617] border-indigo-500/50 shadow-2xl md:-translate-y-4" : "bg-white/[0.03] border-white/10 hover:border-white/20"}`}>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-5xl font-black text-white tracking-tighter">
                    {typeof plan.price[billing] === 'number' && plan.price[billing] > 0 ? `₹${plan.price[billing].toLocaleString('en-IN')}` : (plan.price[billing] === 0 ? "Free" : plan.price[billing])}
                  </span>
                  {typeof plan.price[billing] === 'number' && plan.price[billing] > 0 && <span className="text-gray-500 font-bold ml-1">/{billing === "monthly" ? "mo" : "yr"}</span>}
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                      <Check size={16} className="text-indigo-400" /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handlePlanSelection(plan)} className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group ${plan.highlight ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-white/10 text-white hover:bg-white/20"}`}>
                  {plan.price[billing] === 0 || plan.price[billing] === "Custom" ? "Contact Us" : "Get Started Now"} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isModalOpen && selectedPlan && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isProcessing && setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#0f172a] border border-white/10 p-8 rounded-[32px] max-w-md w-full shadow-2xl">
                {!isProcessing && (
                  <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={20} /></button>
                )}
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                      <ShieldCheck className="text-green-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Secure Checkout</h3>
                  <p className="text-gray-400 text-sm">You are purchasing the <span className="text-indigo-400 font-bold">{selectedPlan.name} ({billing})</span> plan for ₹{selectedPlan.price[billing].toLocaleString('en-IN')}.</p>
                </div>

                <form onSubmit={initiatePayment} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input required disabled={isProcessing} type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all disabled:opacity-50" 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input required disabled={isProcessing} type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all disabled:opacity-50" 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input required disabled={isProcessing} type="tel" placeholder="Mobile Number" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all disabled:opacity-50" 
                      onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-indigo-900/20 disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <><Loader2 className="animate-spin" size={18} /> Processing...</>
                    ) : (
                      <>Pay ₹{selectedPlan.price[billing].toLocaleString('en-IN')} securely <ChevronRight size={18} /></>
                    )}
                  </button>
                </form>
                <div className="mt-6 flex items-center justify-center gap-2">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
                     <ShieldCheck size={12}/> Secured by Razorpay
                   </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}