// components/freelancex/landing/Pricing.tsx

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, Crown, Building2, ChevronRight, Smartphone, X, Loader2 } from "lucide-react";

type Role = "client" | "freelancer";
type Billing = "monthly" | "yearly";

const PRICING = {
  client: {
    badge: "For Employers",
    plans: [
      {
        name: "Basic",
        price: { monthly: 0, yearly: 0 },
        description: "Best for small one-off projects.",
        features: ["Post 2 jobs/mo", "Standard visibility", "Community support"],
        highlight: false,
      },
      {
        name: "Pro",
        price: { monthly: 2499, yearly: 24990 },
        description: "Perfect for growing startups.",
        features: ["Unlimited job posts", "AI Matchmaking", "Featured listings", "Priority support"],
        highlight: true,
      },
      {
        name: "Enterprise",
        price: { monthly: null, yearly: null },
        description: "Full-service talent acquisition.",
        features: ["Dedicated Account Manager", "Custom Vetting", "API access", "White-labeling"],
        highlight: false,
      },
    ],
  },
  freelancer: {
    badge: "For Professionals",
    plans: [
      {
        name: "Free",
        price: { monthly: 0, yearly: 0 },
        description: "Start your journey today.",
        features: ["15 connects/mo", "Standard profile", "Basic analytics"],
        highlight: false,
      },
      {
        name: "Gold",
        price: { monthly: 999, yearly: 8990 },
        description: "Stand out from the crowd.",
        features: ["Unlimited bidding", "Featured Profile Badge", "Skill assessments", "1% Service fee"],
        highlight: true,
      },
      {
        name: "Elite",
        price: { monthly: 2999, yearly: 28990 },
        description: "For the top 1% talent.",
        features: ["Verified Pro status", "Direct client invites", "0% Service fee", "Tax & GST help"],
        highlight: false,
      },
    ],
  },
};

export default function LuxuryPricing() {
  const [role, setRole] = useState<Role>("client");
  const [billing, setBilling] = useState<Billing>("monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const activePlans = PRICING[role].plans;

  const handlePlanSelection = (plan: any) => {
    if (plan.price[billing] === 0) {
      alert("Free plan activated successfully!");
      return;
    }
    if (plan.price[billing] === null) {
        window.location.href = `mailto:india.careerlabconsulting@gmail.com?subject=Enterprise Inquiry`;
        return;
    }
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const initRazorpay = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: selectedPlan.price[billing],
          planName: selectedPlan.name,
        }),
      });
      const order = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "CareerLab Online",
        description: `Subscription for ${selectedPlan.name}`,
        order_id: order.id,
        handler: function (response: any) {
          alert("Payment Successful! ID: " + response.razorpay_payment_id);
          setIsModalOpen(false);
        },
        prefill: {
          email: "india.careerlabconsulting@gmail.com",
        },
        theme: { color: "#6366f1" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setLoading(false);
    }
  };

  const initPhonePe = async () => {
    setLoading(true);
    try {
        const response = await fetch("/api/checkout/phonepe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: selectedPlan.price[billing],
              planName: selectedPlan.name,
            }),
          });
          const data = await response.json();
          if(data.url) window.location.href = data.url;
    } catch (error) {
        alert("PhonePe integration requires production environment verification.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <section className="relative bg-[#020617] py-24 px-6 overflow-hidden min-h-screen">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-sm font-bold tracking-widest uppercase"
          >
            {PRICING[role].badge}
          </motion.span>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mt-6 mb-8 tracking-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Level Up?</span>
          </h2>

          <div className="flex flex-col items-center gap-6">
            <div className="flex p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
              {(["client", "freelancer"] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                    role === r ? "bg-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm font-medium">
              <span className={billing === "monthly" ? "text-white" : "text-gray-500"}>Monthly</span>
              <button 
                onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")}
                className="w-12 h-6 rounded-full bg-white/10 relative transition-colors"
              >
                <motion.div 
                  animate={{ x: billing === "monthly" ? 2 : 26 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-indigo-500" 
                />
              </button>
              <span className={billing === "yearly" ? "text-white" : "text-gray-500"}>
                Yearly <span className="text-emerald-400 text-xs ml-1">(Save 20%)</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activePlans.map((plan, i) => (
            <motion.div
              key={`${role}-${plan.name}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`relative group p-8 rounded-[40px] border transition-all duration-500 ${
                plan.highlight 
                ? "bg-gradient-to-b from-[#0f172a] to-[#020617] border-indigo-500/50 shadow-2xl shadow-indigo-500/20 md:-translate-y-4" 
                : "bg-white/[0.03] border-white/10 hover:border-white/20"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-8">
                {plan.price[billing] !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white tracking-tighter">
                      ₹{plan.price[billing]?.toLocaleString('en-IN')}
                    </span>
                    <span className="text-gray-500 font-bold text-lg">
                      /{billing === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-black text-white">Custom</span>
                )}
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                      <Check size={12} className="text-indigo-400" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handlePlanSelection(plan)}
                className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group/btn ${
                plan.highlight 
                ? "bg-indigo-600 text-white hover:bg-indigo-500" 
                : "bg-white/10 text-white hover:bg-white/20"
              }`}>
                {plan.price[billing] === null ? "Contact Sales" : "Get Started Now"}
                <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center justify-center gap-6 opacity-60">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">Secure Payments Via</p>
          <div className="flex flex-wrap justify-center gap-8 grayscale hover:grayscale-0 transition-all">
              <span className="text-white font-black text-xl italic tracking-tighter">Razorpay</span>
              <span className="text-white font-black text-xl italic tracking-tighter">PhonePe</span>
              <span className="text-white font-black text-xl italic tracking-tighter">UPI</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#0f172a] border border-white/10 p-8 rounded-[32px] max-w-md w-full shadow-2xl"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white">
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Select Payment</h3>
                <p className="text-gray-400">
                  Complete your upgrade to <span className="text-indigo-400 font-bold">{selectedPlan?.name}</span> for ₹{selectedPlan?.price[billing]?.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="space-y-4">
                <button
                  disabled={loading}
                  onClick={initRazorpay}
                  className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500 hover:bg-indigo-500/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                      <Zap className="text-indigo-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold">Razorpay</p>
                      <p className="text-gray-500 text-xs">UPI, Cards, Netbanking</p>
                    </div>
                  </div>
                  {loading ? <Loader2 className="animate-spin text-gray-500" /> : <ChevronRight className="text-gray-600 group-hover:text-white" />}
                </button>

                <button
                  disabled={loading}
                  onClick={initPhonePe}
                  className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500 hover:bg-purple-500/5 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Smartphone className="text-purple-400" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold">PhonePe</p>
                      <p className="text-gray-500 text-xs">Direct App Payment</p>
                    </div>
                  </div>
                  {loading ? <Loader2 className="animate-spin text-gray-500" /> : <ChevronRight className="text-gray-600 group-hover:text-white" />}
                </button>
              </div>

              <p className="mt-8 text-center text-xs text-gray-500">
                Securely encrypted by 256-bit SSL
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}