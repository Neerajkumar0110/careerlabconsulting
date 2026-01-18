'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Zap, 
  Video, 
  Mic, 
  ArrowRight,
  Sparkles,
  Lock,
  CheckCircle2,
  ScanFace,
  BrainCircuit,
  Rocket,
  ShieldCheck,
  Play,
  Plus,
  Minus,
  X
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

// --- DATA ---
const processSteps = [
  {
    step: "01",
    title: "Data Injection",
    desc: "Upload 30 mins of your video and sync your docs/emails to train the brain.",
    icon: <ScanFace className="text-purple-400" />
  },
  {
    step: "02",
    title: "Neural Syncing",
    desc: "Our AI maps your micro-expressions and unique speech patterns.",
    icon: <BrainCircuit className="text-blue-400" />
  },
  {
    step: "03",
    title: "Deployment",
    desc: "Your Twin is ready to take meetings, create content, or handle support.",
    icon: <Rocket className="text-emerald-400" />
  }
];

const pricing = [
  {
    name: "Creator",
    price: "$99",
    features: ["1 Digital Twin", "5 Languages", "HD Video Exports", "Email Knowledge Sync"],
    highlight: false
  },
  {
    name: "Executive",
    price: "$299",
    features: ["3 Digital Twins", "50+ Languages", "4K Video & Live Calls", "Full Brain Sync (CRM/Docs)", "Priority Support"],
    highlight: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Unlimited Twins", "On-Premise Hosting", "Custom API Access", "White-label Rights", "Dedicated Manager"],
    highlight: false
  }
];

const faqs = [
  {
    q: "Is the AI Twin voice indistinguishable from mine?",
    a: "Yes. Our neural engine captures your specific frequency, pitch, and emotional cadence. With 30 minutes of training data, we achieve 99% vocal similarity."
  },
  {
    q: "How secure is my personal data?",
    a: "We use AES-256 encryption. Your training data is private and never shared. You retain 100% ownership."
  },
  {
    q: "Can my AI Twin take live Zoom meetings?",
    a: "Absolutely. On the Executive plan, your Twin can join live calls and respond in real-time with your face and voice."
  }
];

export default function AITwinXPage() {
  const whatsappNumber = "918700236923";
  const demoVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Replace with your actual AI Twin Demo Link

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Prevent scroll when video is open
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isVideoOpen]);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-purple-500/30">
      <Navbar portal="B2B" />

      {/* --- VIDEO MODAL OVERLAY --- */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl"
          >
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[110]"
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <iframe 
                src={`${demoVideoUrl}?autoplay=1`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-purple-600/10 blur-[120px] -z-10" />
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <Sparkles size={14} className="text-purple-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-400">Identity 2.0 is here</span>
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
          Clone Your Brain. <br /> 
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">Scale Your Life.</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Create a hyper-realistic AI Digital Twin that speaks, thinks, and works exactly like you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={`https://wa.me/${whatsappNumber}`} className="px-10 py-5 bg-purple-600 hover:bg-purple-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-3">
            Build Your Twin <ArrowRight size={20} />
          </a>
          <button 
            onClick={() => setIsVideoOpen(true)}
            className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Video size={20} className="text-purple-400" /> Watch Demo
          </button>
        </div>
      </section>

      {/* --- VIDEO PLAYER PLACEHOLDER --- */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            onClick={() => setIsVideoOpen(true)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] md:rounded-[3rem] blur opacity-25 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 aspect-video flex items-center justify-center">
               <img 
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1280" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" 
                alt="Founder Video"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
               <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-600/50 group-hover:scale-110 transition-transform">
                     <Play fill="white" size={32} className="ml-1" />
                  </div>
                  <p className="font-bold tracking-widest text-xs uppercase text-purple-300">Click to Play Demo</p>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">How it Works</h2>
            <p className="text-slate-500">From human to digital in three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent -z-10" />
            {processSteps.map((step, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-slate-900/50 border border-white/5 p-10 rounded-[2.5rem] backdrop-blur-xl">
                <div className="text-6xl font-black text-white/5 absolute top-6 right-8">{step.step}</div>
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8">{step.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-24 px-6 bg-slate-900/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {pricing.map((plan, i) => (
              <div key={i} className={`p-10 rounded-[3rem] border transition-all ${plan.highlight ? 'bg-gradient-to-b from-purple-600/20 to-indigo-900/20 border-purple-500' : 'bg-white/5 border-white/10'}`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-black mb-8">{plan.price}</div>
                <div className="space-y-4 mb-10">
                  {plan.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 size={16} className="text-emerald-500" /> {f}
                    </div>
                  ))}
                </div>
                <a href={`https://wa.me/${whatsappNumber}`} className={`w-full py-4 rounded-xl font-bold text-center block ${plan.highlight ? 'bg-purple-600' : 'bg-white/10'}`}>Get Started</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center"
                >
                  <span className="font-bold">{faq.q}</span>
                  {openFaq === i ? <Minus size={20} className="text-purple-500" /> : <Plus size={20} />}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="px-6 pb-6 text-slate-400">
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECURITY BAR --- */}
      <section className="py-12 px-6 border-y border-white/5 flex flex-wrap justify-center gap-12 opacity-40">
        <div className="flex items-center gap-2 font-bold"><ShieldCheck size={18} /> AES-256</div>
        <div className="flex items-center gap-2 font-bold"><Lock size={18} /> BIOMETRIC</div>
        <div className="flex items-center gap-2 font-bold"><Globe size={18} /> SOC2</div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[4rem] p-16 md:p-24 relative overflow-hidden">
          <h2 className="text-4xl md:text-7xl font-black mb-8 relative z-10">Multiply Your Impact.</h2>
          <a href={`https://wa.me/${whatsappNumber}`} className="relative z-10 inline-flex items-center gap-3 bg-white text-indigo-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all">
            Start Training Now <ArrowRight size={18} />
          </a>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full -mr-20 -mt-20" />
        </div>
      </section>

      <Footer />
    </div>
  );
}