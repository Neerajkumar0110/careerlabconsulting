'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, BrainCircuit, Timer, ShieldCheck, 
  ArrowRight, Search, Code2, Database, LayoutDashboard,
  CheckCircle2, Cpu, X, Loader2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer'; 

const HIRING_BENEFITS = [
  {
    icon: Timer,
    title: "48-Hour Deployment",
    desc: "Stop waiting weeks for candidates. Our AI matches you with available, pre-vetted experts ready to start immediately."
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Vetting",
    desc: "Every developer has passed rigorous live-coding, architecture, and communication assessments evaluated by our neural engine."
  },
  {
    icon: ShieldCheck,
    title: "Zero-Risk Contracts",
    desc: "Pay only when milestones are met. Our smart escrow system protects your budget and intellectual property."
  },
  {
    icon: Building2,
    title: "Enterprise Scalability",
    desc: "Whether you need a single Next.js expert or an entire autonomous full-stack pod, we scale with your product roadmap."
  }
];

const TALENT_CATEGORIES = [
  { name: "Full-Stack Engineering", tech: "Next.js, React, Node.js", icon: Code2, color: "text-blue-400", bg: "bg-blue-500/10" },
  { name: "Backend & Architecture", tech: "PHP, Laravel, Python, Go", icon: Database, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { name: "Enterprise AI Solutions", tech: "Custom LLMs, RAG, OpenAI", icon: BrainCircuit, color: "text-purple-400", bg: "bg-purple-500/10" },
  { name: "E-commerce & CMS", tech: "Shopify Advanced, WordPress", icon: LayoutDashboard, color: "text-amber-400", bg: "bg-amber-500/10" },
];

const TRUSTED_LOGOS = [
  { name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png" },
  { name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png" },
  { name: "Amazon", src: "https://www.pngall.com/wp-content/uploads/15/Amazon-Logo-White-Transparent.png" },
  { name: "IBM", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/512px-IBM_logo.svg.png" },
  { name: "Intel", src: "https://upload.wikimedia.org/wikipedia/commons/6/64/Intel-logo-2022.png" }
];

// --- Added FallbackImage Component ---
interface FallbackImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

const FallbackImage = ({ src, alt, fallbackSrc = "/placeholder-logo.png" }: FallbackImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-contain transition-opacity duration-300"
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
};
// -------------------------------------

export default function AIEmployersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [interestSource, setInterestSource] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    talentNeeded: "Full Stack Engineer",
    description: ""
  });

  const openModal = (source: string) => {
    setInterestSource(source);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/freelance-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: interestSource })
      });

      if (res.ok) {
        const adminWhatsAppNumber = "918700236923"; 
        const message = `*Enterprise Inquiry: ${interestSource}* %0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Looking For:* ${formData.talentNeeded}%0A*Details:* ${formData.description}`;
        
        window.open(`https://wa.me/${adminWhatsAppNumber}?text=${message}`, '_blank');
        
        setFormData({ name: "", email: "", phone: "", talentNeeded: "Full Stack Engineer", description: "" });
        setIsModalOpen(false);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white selection:bg-blue-500/30 font-sans">
      
      <Navbar />

      <main className="flex-grow pt-24 lg:pt-32 pb-24 overflow-hidden relative">
        
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/15 blur-[150px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 lg:mb-32">
            
            <div className="space-y-6 md:space-y-8 text-center lg:text-left z-10">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
              >
                <Cpu size={14} className="text-blue-400" />
                <span className="text-[10px] sm:text-[11px] font-black text-blue-400 uppercase tracking-widest">Enterprise Hiring Protocol</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] md:leading-[1.1]"
              >
                Hire the Top 1% <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
                  Without the Wait.
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium"
              >
                Bypass traditional recruiting. Access a curated pool of elite technical talent, verified by our autonomous AI protocol and ready to ship your product in 48 hours.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start"
              >
                <button 
                  onClick={() => openModal("Post a Project (Hero Section)")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded-full transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Post a Project <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => openModal("Book a Demo (Hero Section)")}
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-black text-xs sm:text-sm uppercase tracking-widest rounded-full transition-all flex items-center justify-center hover:-translate-y-1"
                >
                  Book a Demo
                </button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative mx-auto w-full max-w-md lg:max-w-full hidden sm:block z-10"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[2.5rem] blur-2xl" />
              
              <div className="relative bg-[#0a0f1d]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Match Found</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-wider border border-indigo-500/30">99% Match</span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=150&q=80" alt="Developer" className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
                  <div>
                    <h3 className="text-white font-bold text-lg">Alex Chen</h3>
                    <p className="text-blue-400 text-sm font-medium">Senior Next.js Architect</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Technical Score</span>
                    <span className="text-emerald-400 font-bold">98/100</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-1.5 rounded-full w-[98%]" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {['React', 'Node.js', 'AWS', 'System Design'].map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-xs font-medium">{skill}</span>
                  ))}
                </div>

                <div className="relative">
                  <button 
                    onClick={() => openModal("Deploy To Sprint (Alex Chen Mockup)")}
                    className="w-full py-3 bg-white text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 mb-4"
                  >
                    <CheckCircle2 size={16} /> Deploy to Sprint
                  </button>
                  
                  <div className="flex items-center gap-3 justify-center border-t border-white/5 pt-3">
                    <ShieldCheck className="text-emerald-500" size={16} />
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Verified Profile & NDA Ready</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          <div className="border-y border-white/5 py-8 mb-24 lg:mb-32">
            <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">Trusted by innovative teams worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
              {TRUSTED_LOGOS.map((logo, idx) => (
                <div key={idx} className="relative h-10 w-24 rounded-md">
                  {/* --- Updated to use FallbackImage --- */}
                  <FallbackImage src={logo.src} alt={logo.name} />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-24 lg:mb-32">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">The Modern Hiring Stack</h2>
              <p className="text-slate-400 max-w-2xl mx-auto font-medium">Why the world's fastest-growing companies rely on our autonomous protocol.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
              {HIRING_BENEFITS.map((benefit, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] rounded-3xl p-6 lg:p-10 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-[#0a0f1d] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-300">
                    <benefit.icon className="text-blue-400 w-6 h-6" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-24 lg:mb-32 relative">
            <div className="absolute inset-0 bg-blue-600/5 blur-3xl -z-10 rounded-[3rem]" />
            <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 lg:p-16">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">Specialized Talent Hubs</h2>
                  <p className="text-slate-400 font-medium">Pre-vetted professionals ready to integrate into your stack.</p>
                </div>
                <Link href="/freelancer-platform" className="text-blue-400 hover:text-blue-300 font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center gap-2 group shrink-0">
                  View All Hubs <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {TALENT_CATEGORIES.map((cat, idx) => (
                  <div key={idx} className="bg-[#020617] border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 cursor-pointer group hover:-translate-y-1 shadow-lg">
                    <div className={`w-12 h-12 rounded-xl ${cat.bg} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                      <cat.icon className={`${cat.color} w-6 h-6`} />
                    </div>
                    <h3 className="text-white font-bold text-base lg:text-lg mb-2 leading-tight">{cat.name}</h3>
                    <p className="text-[10px] lg:text-xs font-bold text-slate-500 uppercase tracking-wider line-clamp-2">{cat.tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-20" />
            
            <div className="relative z-10 p-10 sm:p-16 lg:p-24 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">Ready to scale your <br className="hidden sm:block"/> engineering team?</h2>
              <p className="text-blue-100/80 mb-10 text-base lg:text-lg font-medium max-w-2xl mx-auto">
                Tell us what you need. Our AI will instantly match you with the perfect candidate for your sprint, guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => openModal("Start Hiring Now (Bottom CTA)")}
                  className="px-8 py-4 bg-white text-blue-600 hover:bg-slate-100 font-black text-xs sm:text-sm uppercase tracking-widest rounded-full transition-all shadow-xl hover:scale-105 active:scale-95"
                >
                  Start Hiring Now
                </button>
                <button 
                  onClick={() => openModal("Talk to Sales (Bottom CTA)")}
                  className="px-8 py-4 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-black text-xs sm:text-sm uppercase tracking-widest rounded-full transition-all flex items-center justify-center"
                >
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-3xl p-8 shadow-2xl z-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors z-20"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-black text-white mb-2 relative z-10 tracking-tight">Enterprise Connect</h3>
              <p className="text-blue-400 font-bold mb-8 text-[10px] uppercase tracking-widest relative z-10">
                Action: <span className="text-white bg-white/10 px-2 py-1 rounded-md">{interestSource}</span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input required type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required type="tel" placeholder="Phone / WhatsApp" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer transition-colors text-sm" value={formData.talentNeeded} onChange={(e) => setFormData({...formData, talentNeeded: e.target.value})}>
                    <option value="Full Stack Engineer" className="bg-[#0f172a]">Full Stack Engineer</option>
                    <option value="Frontend Engineer" className="bg-[#0f172a]">Frontend Engineer (React/Vue)</option>
                    <option value="Backend Engineer" className="bg-[#0f172a]">Backend Engineer (Node/Python)</option>
                    <option value="UI/UX Designer" className="bg-[#0f172a]">UI/UX Designer</option>
                    <option value="DevOps/Cloud" className="bg-[#0f172a]">DevOps / Cloud Expert</option>
                    <option value="Not Sure" className="bg-[#0f172a]">Not Sure Yet / Let's Discuss</option>
                  </select>
                </div>

                <textarea required placeholder="Briefly describe your requirements..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none transition-colors text-sm" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />

                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg hover:-translate-y-1 text-xs uppercase tracking-widest disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : "Submit & Connect via WhatsApp"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}