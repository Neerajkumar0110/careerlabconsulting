'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, Share2, Copy, Users, DollarSign, 
  TrendingUp, ShieldCheck, Zap, ArrowRight,
  CheckCircle2, Rocket, Award, CreditCard, ChevronRight, X, Loader2
} from 'lucide-react';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const REFERRAL_TIERS = [
  { level: "Starter", commission: "2%", activeReq: "0-5 Users", icon: Zap, color: "text-blue-400", bg: "bg-blue-500/10" },
  { level: "Pro", commission: "5%", activeReq: "6-20 Users", icon: Award, color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { level: "Elite", commission: "8%", activeReq: "21+ Users", icon: Rocket, color: "text-purple-400", bg: "bg-purple-500/10" },
];

const ACTIVE_REFERRALS = [
  { name: "John Smith", role: "Sr. DevOps", status: "Active Sprint", earned: "₹4,200", date: "Feb 20" },
  { name: "Meera Iyer", role: "UI Architect", status: "Vetting", earned: "₹0", date: "Feb 24" },
];

export default function ReferralProgramPage() {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  
  const referralCode = "FREELANCEX-A91-NODE";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, referralCode })
      });

      if (res.ok) {
        const ownerPhone = "918700236923";
        const msg = `*New Referral Lead*%0A*Name:* ${formData.name}%0A*Code:* ${referralCode}`;
        window.open(`https://wa.me/${ownerPhone}?text=${msg}`, '_blank');
        setIsModalOpen(false);
      }
    } catch (err) {
      alert("Submission Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-full md:w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-32">
          
          {/* HERO SECTION */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Gift size={14} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Ecosystem Growth Protocol</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1]">
                Earn While You <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Onboard.</span>
              </h1>
              
              <p className="text-slate-400 text-base md:text-xl max-w-lg mx-auto lg:mx-0 font-medium">
                Unlock lifetime passive rewards by connecting top-tier talent to the global CLC network.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-2xl shadow-blue-900/40">
                  Initialize Referral
                </button>
                <div className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl">
                  <code className="text-sm font-bold text-blue-400">{referralCode}</code>
                  <button onClick={handleCopy} className="text-slate-500 hover:text-white transition-colors">
                    {copied ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: "Pending Payout", val: "₹18,450", icon: DollarSign, color: "text-emerald-400" },
                 { label: "Active Nodes", val: "42", icon: Users, color: "text-blue-400" },
                 { label: "Growth Index", val: "+14%", icon: TrendingUp, color: "text-indigo-400" },
                 { label: "Current Tier", val: "Pro", icon: Award, color: "text-amber-400" },
               ].map((stat, i) => (
                 <motion.div key={i} whileHover={{ y: -5 }} className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-[2rem] backdrop-blur-xl">
                    <stat.icon className={`${stat.color} mb-4`} size={24} />
                    <div className="text-xl md:text-3xl font-black text-white">{stat.val}</div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* TIER SECTION */}
          <div className="space-y-12">
            <h2 className="text-3xl md:text-5xl font-black text-center tracking-tight">Earning <span className="text-indigo-400">Tiers.</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REFERRAL_TIERS.map((tier, i) => (
                <div key={i} className={`p-8 rounded-[2.5rem] border transition-all duration-500 group relative overflow-hidden ${i === 1 ? 'bg-indigo-600/10 border-indigo-500/50 shadow-3xl' : 'bg-white/[0.02] border-white/10'}`}>
                  <div className={`w-12 h-12 rounded-xl ${tier.bg} flex items-center justify-center mb-6`}>
                    <tier.icon className={tier.color} size={24} />
                  </div>
                  <h3 className="text-xl font-black mb-1">{tier.level} Node</h3>
                  <div className="text-4xl font-black mb-6">{tier.commission} <span className="text-xs text-slate-500 uppercase tracking-widest">Share</span></div>
                  <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">{tier.activeReq}</p>
                </div>
              ))}
            </div>
          </div>

          {/* WITHDRAWAL CTA */}
          <div className="relative rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900 p-8 md:p-20 shadow-3xl">
             <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left space-y-6">
                   <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">Ready for <br/> <span className="text-blue-300 underline decoration-blue-400/50 underline-offset-8">Settlement?</span></h2>
                   <p className="text-blue-100/80 font-medium text-lg">Your earnings are ready for direct bank transfer. Protocol settlement time: 2-4 hours.</p>
                </div>
                <div className="bg-[#020617]/90 rounded-[2.5rem] p-8 md:p-12 space-y-8 backdrop-blur-xl border border-white/10">
                   <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available Credit</p>
                        <h4 className="text-4xl md:text-5xl font-black text-white mt-1">₹18,450</h4>
                      </div>
                      <CreditCard className="text-emerald-400" size={40} />
                   </div>
                   <button className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-3">
                      Withdraw Earnings <ChevronRight size={18} />
                   </button>
                </div>
             </div>
          </div>

          <div className="flex items-center justify-center gap-4 py-10 border-t border-white/5 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
             <ShieldCheck size={14} className="text-emerald-500" /> CLC HIRE-X VERIFIED GROWTH NETWORK
          </div>
        </div>
      </main>

      <Footer />

      {/* LEAD CAPTURE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-[#0a0f1d] border border-white/10 p-8 md:p-12 rounded-[2.5rem] max-w-lg w-full shadow-3xl">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24}/></button>
              <h3 className="text-2xl font-black mb-2 tracking-tight">Become an Ambassador</h3>
              <p className="text-slate-500 text-sm mb-8">Join the protocol and start earning rewards for every elite node you connect.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-all text-sm" onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-all text-sm" onChange={e => setFormData({...formData, email: e.target.value})} />
                <input required type="tel" placeholder="WhatsApp / Mobile" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-blue-500 transition-all text-sm" onChange={e => setFormData({...formData, phone: e.target.value})} />
                
                <button disabled={isSubmitting} type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] rounded-xl transition-all flex justify-center items-center gap-2">
                  {isSubmitting ? <Loader2 className="animate-spin" size={20}/> : "Register & Start Earning"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}