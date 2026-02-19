"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, ChevronRight, X, User, Mail, Phone, MessageCircle } from "lucide-react";

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
  
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });

  const handlePlanSelection = (plan: any) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();

    const ownerNumber = "918700827753"; 
    const priceDisplay = typeof selectedPlan.price[billing] === 'number' 
      ? `₹${selectedPlan.price[billing].toLocaleString('en-IN')}` 
      : selectedPlan.price[billing];

    const message = `*New Plan Inquiry - Career Lab Consulting*%0A%0A` +
      `*Plan:* ${selectedPlan.name} (${billing.toUpperCase()})%0A` +
      `*Price:* ${priceDisplay}%0A` +
      `*Role:* ${role === "client" ? "Employer" : "Freelancer"}%0A%0A` +
      `*User Details:*%0A` +
      `- Name: ${formData.name}%0A` +
      `- Email: ${formData.email}%0A` +
      `- Mobile: ${formData.mobile}`;

    const whatsappUrl = `https://wa.me/${ownerNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    setIsModalOpen(false);
  };

  return (
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
                  {typeof plan.price[billing] === 'number' ? `₹${plan.price[billing].toLocaleString('en-IN')}` : plan.price[billing]}
                </span>
                {typeof plan.price[billing] === 'number' && <span className="text-gray-500 font-bold ml-1">/{billing === "monthly" ? "mo" : "yr"}</span>}
              </div>
              <ul className="space-y-4 mb-10">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                    <Check size={16} className="text-indigo-400" /> {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => handlePlanSelection(plan)} className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group ${plan.highlight ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-white/10 text-white hover:bg-white/20"}`}>
                Get Started Now <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[#0f172a] border border-white/10 p-8 rounded-[32px] max-w-md w-full shadow-2xl">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={20} /></button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="text-indigo-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Almost There!</h3>
                <p className="text-gray-400 text-sm">Fill in your details to discuss the <span className="text-indigo-400 font-bold">{selectedPlan?.name}</span> plan on WhatsApp.</p>
              </div>

              <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all" 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input required type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all" 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input required type="tel" placeholder="Mobile Number" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-indigo-500 outline-none transition-all" 
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
                </div>

                <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-green-900/20">
                  Proceed to WhatsApp <ChevronRight size={18} />
                </button>
              </form>
              <p className="text-[10px] text-gray-500 text-center mt-6 uppercase tracking-widest">Instant response guaranteed</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}