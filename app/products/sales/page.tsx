'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Target, Zap, ArrowRight, ShieldCheck, Rocket, X, Mail, User, Send, 
  ExternalLink, Layers, Globe, Cpu, Database
} from 'lucide-react';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

const B2BPricingSection = dynamic(() => import('@/components/sections/B2BPricingSection'), {
  loading: () => <div className="h-96 flex items-center justify-center text-blue-400">Initializing Core...</div>,
  ssr: false
});

// --- STAR CHART POPUP (New Component) ---
const StarChartModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const specs = [
    { icon: <Cpu className="w-5 h-5" />, label: "AI Core", detail: "Neural Engine v4.2" },
    { icon: <Database className="w-5 h-5" />, label: "Data Pool", detail: "1.2B B2B Nodes" },
    { icon: <Globe className="w-5 h-5" />, label: "Reach", detail: "Multi-Galaxy Sync" },
    { icon: <Layers className="w-5 h-5" />, label: "Stack", detail: "Quantum Encryption" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md" />
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-2xl bg-[#0f172a] border border-blue-500/40 p-10 rounded-[3rem] shadow-[0_0_100px_rgba(59,130,246,0.2)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 z-20">
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X /></button>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-black italic text-white mb-6 uppercase tracking-tighter">Sales Suite Architecture</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="text-blue-400">{spec.icon}</div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{spec.label}</p>
                      <p className="text-white font-bold">{spec.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl">
                <p className="text-blue-200 text-sm leading-relaxed italic">
                  "The Star Chart represents our proprietary mapping of the B2B landscape. It uses real-time telemetry to identify revenue clusters before your competitors even scan the sector."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- LEAD GEN POPUP ---
const ActionModal = ({ isOpen, onClose, title }: { isOpen: boolean, onClose: () => void, title: string }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "918700236923";
    const message = `*Mission Protocol Activated*%0A%0A*Action:* ${title}%0A*Commander:* ${formData.name}%0A*Email:* ${formData.email}%0A%0A_Sent via Sales Suite AI Dashboard_`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#020617]/95 backdrop-blur-xl" />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative w-full max-w-lg bg-[#0f172a] border border-blue-500/30 p-8 rounded-[2.5rem] shadow-[0_0_80px_rgba(37,99,235,0.25)]"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mb-6 mx-auto border border-blue-500/20">
                <Rocket className="w-10 h-10 text-blue-400 animate-pulse" />
              </div>
              <h3 className="text-4xl font-black italic tracking-tighter mb-2 uppercase text-white">{title}</h3>
              <p className="text-slate-400 mb-8 font-medium text-sm">Transmit coordinates to the Command Center.</p>
              <form className="space-y-4 text-left" onSubmit={handleWhatsAppRedirect}>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400" />
                  <input required type="text" placeholder="Commander Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400" />
                  <input required type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" />
                </div>
                <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
                  Launch Sequence <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const SalesSuitePage = () => {
  const [modalType, setModalType] = useState<string | null>(null);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <>
      <Head>
        <title>Sales Suite AI | Interstellar Revenue Growth</title>
      </Head>

      <main className="min-h-screen bg-[#020617] text-slate-50 overflow-x-hidden selection:bg-blue-500/30">
        <Navbar />

        <ActionModal isOpen={!!modalType} onClose={() => setModalType(null)} title={modalType === 'mission' ? 'Initiate Mission' : 'Claim Command'} />
        <StarChartModal isOpen={isChartOpen} onClose={() => setIsChartOpen(false)} />

        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0 stars-container opacity-40"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mb-10">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-blue-300">Live Telemetry Active</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter italic uppercase leading-[0.85] text-white"
            >
              Scale Beyond <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-200 to-blue-500">Atmosphere</span>
            </motion.h1>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <button onClick={() => setModalType('mission')} className="group relative px-10 py-6 bg-blue-600 rounded-2xl font-black text-xl transition-all hover:scale-105 shadow-[0_0_50px_rgba(37,99,235,0.4)] flex items-center gap-3">
                Initiate Mission <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setIsChartOpen(true)} className="px-10 py-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl font-bold text-xl hover:bg-white/10 transition-all flex items-center gap-3">
                View Star Chart <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-20 warp-lines"></div>
        </section>

        {/* --- STATS --- */}
        <section className="py-24 border-y border-white/5 bg-slate-950/50 backdrop-blur-md relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">
             {[{ label: "Vessels Scanned", val: "1.2M+" }, { label: "Warp Velocity", val: "99.9%" }, { label: "Systems Integrated", val: "500+" }, { label: "Fuel Efficiency", val: "4.5x" }].map((s, i) => (
               <div key={i}><div className="text-4xl md:text-6xl font-black mb-2">{s.val}</div><div className="text-blue-500/60 text-xs font-bold tracking-[0.3em] uppercase">{s.label}</div></div>
             ))}
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <ModuleCard icon={<Target className="w-8 h-8" />} title="Deep Space Target" desc="Identify high-intent buyers in the farthest reaches of the market using AI signals." />
            <ModuleCard icon={<ShieldCheck className="w-8 h-8" />} title="Atmospheric Shield" desc="Bank-grade security layers protecting your CRM data during high-speed transfers." />
            <ModuleCard icon={<Zap className="w-8 h-8" />} title="Fusion Outreach" desc="Personalized communication that hits like a solar flare. 10x engagement guaranteed." />
          </div>
        </section>

        {/* --- PRICING --- */}
        <section id="pricing" className="py-20 relative z-10"><B2BPricingSection /></section>

        {/* --- FINAL CTA --- */}
        <section className="py-32 px-6">
          <motion.div whileHover={{ scale: 1.01 }} className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden bg-gradient-to-br from-[#050a24] to-[#020617] border border-blue-500/20 shadow-[0_0_100px_rgba(37,99,235,0.1)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50" />
            <div className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-black mb-10 italic tracking-tighter text-white uppercase leading-none text-center">Ready for <br/> Lift-Off?</h2>
              <button onClick={() => setModalType('command')} className="bg-white text-slate-950 px-16 py-7 rounded-[2rem] font-black text-2xl hover:bg-blue-400 hover:text-white transition-all shadow-2xl active:scale-95">
                CLAIM YOUR COMMAND
              </button>
            </div>
          </motion.div>
        </section>

        <Footer />
      </main>

      <style jsx global>{`
        .stars-container {
          background-image: radial-gradient(1.5px 1.5px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 150px 150px, #fff, rgba(0,0,0,0));
          background-size: 300px 300px;
          animation: spaceRotate 200s linear infinite;
        }
        @keyframes spaceRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .warp-lines {
          background: repeating-linear-gradient(90deg, transparent 0, transparent 98%, rgba(59,130,246,0.03) 98%, rgba(59,130,246,0.03) 100%);
          background-size: 100px 100%;
          animation: warp 1.5s linear infinite;
        }
        @keyframes warp { 0% { opacity: 0.2; } 50% { opacity: 0.5; } 100% { opacity: 0.2; } }
      `}</style>
    </>
  );
};

const ModuleCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <motion.div whileHover={{ y: -12 }} className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group hover:border-blue-500/30 transition-all">
    <div className="mb-10 w-16 h-16 flex items-center justify-center bg-blue-500/10 text-blue-400 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">{icon}</div>
    <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-lg">{desc}</p>
  </motion.div>
);

export default SalesSuitePage;