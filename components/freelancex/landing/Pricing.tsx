"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, X, User, Mail, Phone, Loader2, ShieldCheck } from "lucide-react";
import Script from "next/script";
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

type Billing = "monthly" | "yearly";

interface PricingPlan {
  name: string;
  price: { monthly: number | string; yearly: number | string };
  description: string;
  features: string[];
  highlight?: boolean;
}

const DEFAULT_CLIENT_PLANS = JSON.stringify([
  { name: "Basic",      price: { monthly: 0,       yearly: 0       }, description: "Best for small one-off projects.",        features: ["Post 2 jobs/mo", "Standard visibility", "Community support"],                                    highlight: false },
  { name: "Pro",        price: { monthly: 2499,    yearly: 24990   }, description: "Perfect for growing startups.",           features: ["Unlimited job posts", "AI Matchmaking", "Featured listings", "Priority support"],              highlight: true  },
  { name: "Enterprise", price: { monthly: "Custom", yearly: "Custom"}, description: "Full-service talent acquisition.",       features: ["Dedicated Account Manager", "Custom Vetting", "API access", "White-labeling"],                 highlight: false },
]);

const DEFAULT_FREELANCER_PLANS = JSON.stringify([
  { name: "Free",  price: { monthly: 0,     yearly: 0      }, description: "Start your journey today.",   features: ["15 connects/mo", "Standard profile", "Basic analytics"],                                    highlight: false },
  { name: "Gold",  price: { monthly: 999,   yearly: 8990   }, description: "Stand out from the crowd.",  features: ["Unlimited bidding", "Featured Profile Badge", "Skill assessments", "1% Service fee"],       highlight: true  },
  { name: "Elite", price: { monthly: 2999,  yearly: 28990  }, description: "For the top 1% talent.",     features: ["Verified Pro status", "Direct client invites", "0% Service fee", "Tax & GST help"],        highlight: false },
]);

export default function LuxuryPricing() {
  const { get } = usePageContent('pricing-section');
  const [role, setRole] = useState<"client" | "freelancer">("client");
  const [billing, setBilling] = useState<Billing>("monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });

  // CMS values
  const headline           = get('pricing', 'headline',             'Scale your');
  const headlineAccent     = get('pricing', 'headline_accent',      'Future.');
  const clientBadge        = get('pricing', 'client_badge',         'For Employers');
  const freelancerBadge    = get('pricing', 'freelancer_badge',     'For Professionals');
  const saveLabel          = get('pricing', 'save_label',           'Save 20%');
  const whatsappNumber     = get('pricing', 'whatsapp_number',      '918700827753');
  const razorpayKey        = get('pricing', 'razorpay_key',         '');
  const accentFrom         = get('pricing', 'accent_from',          '#6366f1');
  const accentTo           = get('pricing', 'accent_to',            '#06b6d4');
  const companyName        = get('pricing', 'company_name',         'Career Lab Consulting');

  const clientPlansRaw     = get('pricing', 'client_plans_json',    DEFAULT_CLIENT_PLANS);
  const clientPlans        = safeParse<PricingPlan[]>(clientPlansRaw, []);

  const freelancerPlansRaw = get('pricing', 'freelancer_plans_json', DEFAULT_FREELANCER_PLANS);
  const freelancerPlans    = safeParse<PricingPlan[]>(freelancerPlansRaw, []);

  const plans = role === 'client' ? clientPlans : freelancerPlans;
  const badge = role === 'client' ? clientBadge : freelancerBadge;

  const handlePlanSelection = (plan: PricingPlan) => {
    if (plan.price[billing] === 0 || plan.price[billing] === "Custom") {
      const ownerNumber = whatsappNumber;
      const message = `*Inquiry - ${companyName}*%0A%0A*Plan:* ${plan.name} (${billing})%0A*Role:* ${role}%0A*Interest:* I want to know more about this plan.`;
      window.open(`https://wa.me/${ownerNumber}?text=${message}`, "_blank");
      return;
    }
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const initiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;
    setIsProcessing(true);
    const amount = selectedPlan.price[billing] as number;
    try {
      const orderRes = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      const orderData = await orderRes.json();
      if (!orderData.id) throw new Error("Failed to create order");
      const options = {
        key: razorpayKey || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: companyName,
        description: `${selectedPlan.name} Plan (${billing})`,
        order_id: orderData.id,
        prefill: { name: formData.name, email: formData.email, contact: formData.mobile },
        theme: { color: accentFrom },
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
                planDetails: { name: selectedPlan.name, billing, role, amount }
              })
            });
            if (verifyRes.ok) {
              const message = `*✅ PAYMENT SUCCESSFUL - ${companyName}*%0A%0A*Name:* ${formData.name}%0A*Mobile:* ${formData.mobile}%0A*Plan Bought:* ${selectedPlan.name} (${billing})%0A*Amount Paid:* ₹${amount}%0A*Payment ID:* ${response.razorpay_payment_id}`;
              window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
              setIsModalOpen(false);
              setFormData({ name: "", email: "", mobile: "" });
            } else {
              alert("Payment received, but verification failed. Please contact support.");
            }
          } catch (err) { console.error(err); alert("Error verifying payment."); }
        }
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', (response: any) => { alert(`Payment Failed: ${response.error.description}`); });
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
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full" style={{ background: `${accentFrom}1a` }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full" style={{ background: `${accentTo}1a` }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.span className="px-4 py-1.5 rounded-full border text-sm font-bold tracking-widest uppercase"
              style={{ color: accentFrom, borderColor: `${accentFrom}50`, background: `${accentFrom}1a` }}>
              {badge}
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-black text-white mt-6 mb-8 tracking-tight">
              {headline} <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>{headlineAccent}</span>
            </h2>
            <div className="flex flex-col items-center gap-6">
              <div className="flex p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                {["client", "freelancer"].map((r) => (
                  <button key={r} onClick={() => setRole(r as "client" | "freelancer")} className="px-8 py-3 rounded-xl text-sm font-bold transition-all"
                    style={role === r ? { background: accentFrom, color: '#fff' } : { color: '#9ca3af' }}>
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm font-medium">
                <span style={{ color: billing === "monthly" ? '#fff' : '#6b7280' }}>Monthly</span>
                <button onClick={() => setBilling(billing === "monthly" ? "yearly" : "monthly")} className="w-12 h-6 rounded-full bg-white/10 relative transition-colors">
                  <motion.div animate={{ x: billing === "monthly" ? 2 : 26 }} className="absolute top-1 w-4 h-4 rounded-full" style={{ background: accentFrom }} />
                </button>
                <span style={{ color: billing === "yearly" ? '#fff' : '#6b7280' }}>Yearly <span className="text-emerald-400 text-xs ml-1">({saveLabel})</span></span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div key={i} className={`relative p-8 rounded-[40px] border transition-all duration-500 ${plan.highlight ? "md:-translate-y-4" : "bg-white/[0.03] border-white/10 hover:border-white/20"}`}
                style={plan.highlight ? { background: `linear-gradient(to bottom, #0f172a, #020617)`, borderColor: `${accentFrom}80`, boxShadow: `0 20px 60px ${accentFrom}20` } : {}}>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-5xl font-black text-white tracking-tighter">
                    {typeof plan.price[billing] === 'number' && (plan.price[billing] as number) > 0
                      ? `₹${(plan.price[billing] as number).toLocaleString('en-IN')}`
                      : plan.price[billing] === 0 ? "Free" : plan.price[billing]}
                  </span>
                  {typeof plan.price[billing] === 'number' && (plan.price[billing] as number) > 0 &&
                    <span className="text-gray-500 font-bold ml-1">/{billing === "monthly" ? "mo" : "yr"}</span>}
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                      <Check size={16} style={{ color: accentFrom }} /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handlePlanSelection(plan)} className="w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group"
                  style={plan.highlight ? { background: accentFrom, color: '#fff' } : { background: 'rgba(255,255,255,0.1)', color: '#fff' }}>
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
                {!isProcessing && <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={20} /></button>}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border"
                    style={{ background: '#16a34a1a', borderColor: '#16a34a33' }}>
                    <ShieldCheck className="text-green-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Secure Checkout</h3>
                  <p className="text-gray-400 text-sm">You are purchasing the <span className="font-bold" style={{ color: accentFrom }}>{selectedPlan.name} ({billing})</span> plan for ₹{(selectedPlan.price[billing] as number).toLocaleString('en-IN')}.</p>
                </div>
                <form onSubmit={initiatePayment} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input required disabled={isProcessing} type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none transition-all disabled:opacity-50"
                      style={{ '--tw-ring-color': accentFrom } as any} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input required disabled={isProcessing} type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none transition-all disabled:opacity-50" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input required disabled={isProcessing} type="tel" placeholder="Mobile Number" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none transition-all disabled:opacity-50" onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
                  </div>
                  <button type="submit" disabled={isProcessing} className="w-full text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                    style={{ background: accentFrom }}>
                    {isProcessing ? <><Loader2 className="animate-spin" size={18} /> Processing...</> : <>Pay ₹{(selectedPlan.price[billing] as number).toLocaleString('en-IN')} securely <ChevronRight size={18} /></>}
                  </button>
                </form>
                <div className="mt-6 flex items-center justify-center gap-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
                    <ShieldCheck size={12} /> Secured by Razorpay
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