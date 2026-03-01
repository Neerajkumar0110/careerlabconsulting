'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe2, Cpu, ShieldCheck, Zap, 
  Building2, Users, Target, ChevronRight,
  Network, Code2, LineChart, Hexagon
} from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const CORE_VALUES = [
  {
    title: "Autonomous Vetting",
    desc: "Our neural networks evaluate code efficiency, logic, and architecture, completely eliminating human bias from the hiring matrix.",
    icon: Cpu,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    title: "Zero-Latency Matching",
    desc: "We analyze thousands of data points to pair enterprise requirements with the exact elite engineering node in milliseconds.",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20"
  },
  {
    title: "Cryptographic Security",
    desc: "From smart-escrow payouts to strict NDAs, every interaction is shielded by military-grade encryption protocols.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    title: "Decentralized Freedom",
    desc: "We dissolve geographical borders. A top 1% architect in Tokyo collaborates seamlessly with a startup in San Francisco.",
    icon: Globe2,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20"
  }
];

const METRICS = [
  { label: "Active Nodes", value: "12,450+", icon: Network },
  { label: "Sprints Deployed", value: "85,000+", icon: Code2 },
  { label: "Capital Processed", value: "$120M+", icon: LineChart },
  { label: "Global Reach", value: "150+ Countries", icon: Globe2 }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 relative">
        {/* Cinematic Ambient Background */}
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[500px] md:h-[700px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-0" />
        <div className="absolute top-1/3 left-0 w-full md:w-[600px] h-[400px] md:h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20 md:space-y-32">
          
          {/* --- HERO SECTION --- */}
          <div className="text-center space-y-6 md:space-y-8 max-w-5xl mx-auto pt-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <Hexagon size={14} className="text-blue-400" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">The Global Matrix</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[1.05]"
            >
              We don't find talent. <br className="hidden md:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">We Compute It.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-sm md:text-xl font-medium leading-relaxed max-w-3xl mx-auto px-4"
            >
              FreelanceX is an AI-autonomous ecosystem built to replace outdated recruitment. We analyze, verify, and deploy the world's top 1% of digital architects at the speed of thought.
            </motion.p>
          </div>

          {/* --- IMMERSIVE IMAGE SHOWCASE --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10 opacity-80" />
            <img 
              src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Autonomous Tech Ecosystem" 
              className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-[2s]"
            />
            <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 z-20 flex items-center gap-4">
               <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-blue-600/20 border border-blue-500/50 backdrop-blur-md flex items-center justify-center">
                 <Building2 className="text-blue-400" size={24} />
               </div>
               <div>
                 <h3 className="text-xl md:text-3xl font-black text-white">HQ: The Cloud</h3>
                 <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400">Operating globally since 2026</p>
               </div>
            </div>
          </motion.div>

          {/* --- METRICS / STATS STRIP --- */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {METRICS.map((metric, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="bg-white/[0.02] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 text-center hover:bg-white/[0.04] transition-colors"
              >
                <metric.icon className="mx-auto text-slate-500 mb-4" size={28} />
                <h4 className="text-2xl md:text-4xl font-black text-white mb-2">{metric.value}</h4>
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* --- CORE ARCHITECTURE (VALUES) --- */}
          <div className="space-y-10 md:space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">The Platform <span className="text-blue-400">Architecture.</span></h2>
              <p className="text-slate-500 font-medium text-sm md:text-lg">Our ecosystem is governed by four immutable technological directives.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {CORE_VALUES.map((val, idx) => (
                <div key={idx} className={`p-8 md:p-12 bg-[#0a0f1d]/60 backdrop-blur-xl border ${val.border} rounded-[2rem] md:rounded-[3rem] hover:-translate-y-2 transition-transform duration-300 group`}>
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[2rem] ${val.bg} flex items-center justify-center mb-6 md:mb-8`}>
                    <val.icon className={val.color} size={28} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black mb-3 md:mb-4 leading-tight">{val.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-medium text-sm md:text-base">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- THE MANIFESTO (STORY) --- */}
          <div className="bg-[#0a0f1d]/40 border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 relative overflow-hidden">
             <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
                <Target size={500} />
             </div>
             
             <div className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                <div className="lg:col-span-5 space-y-6">
                   <h2 className="text-3xl md:text-5xl font-black leading-tight">Why We Built <br/><span className="text-indigo-400">The Protocol.</span></h2>
                   <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                     Traditional hiring is broken. Resumes are outdated, interviews are biased, and the best talent hates jumping through hoops.
                   </p>
                   <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                     We envisioned a world where code speaks for itself. An autonomous network that tests logic, verifies integrity, and securely connects the builders of tomorrow with the companies shaping the future.
                   </p>
                </div>
                
                <div className="lg:col-span-7 relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-2xl" />
                   <div className="relative bg-[#020617] border border-white/10 rounded-3xl p-6 md:p-8 font-mono text-[10px] md:text-sm text-slate-400 space-y-3">
                      <div className="flex gap-2 mb-4 border-b border-white/10 pb-4">
                         <div className="w-3 h-3 rounded-full bg-red-500" />
                         <div className="w-3 h-3 rounded-full bg-yellow-500" />
                         <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      </div>
                      <p><span className="text-blue-400">const</span> <span className="text-yellow-200">mission</span> = <span className="text-emerald-400">"Empower Creators"</span>;</p>
                      <p><span className="text-blue-400">function</span> <span className="text-yellow-200">deployTalent</span>(node) {'{'}</p>
                      <p className="pl-4"><span className="text-purple-400">if</span> (node.isVerified && node.iq {'>'} 95) {'{'}</p>
                      <p className="pl-8 text-slate-300">system.connect(node, highTicketClient);</p>
                      <p className="pl-8 text-slate-300">escrow.lockCapital();</p>
                      <p className="pl-4">{'}'} <span className="text-purple-400">else</span> {'{'}</p>
                      <p className="pl-8 text-red-400">system.reject("Skill level insufficient");</p>
                      <p className="pl-4">{'}'}</p>
                      <p>{'}'}</p>
                      <p className="text-emerald-400 pt-4 animate-pulse">// SYSTEM ONLINE. AWAITING NODES...</p>
                   </div>
                </div>
             </div>
          </div>

          {/* --- DUAL CTA SECTION --- */}
          <div className="grid md:grid-cols-2 gap-6">
             {/* Talent CTA */}
             <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-blue-900/40 to-[#020617] border border-blue-500/20 p-8 md:p-16 text-center md:text-left shadow-2xl group">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
               <div className="relative z-10 space-y-6">
                 <Users className="text-blue-400 mx-auto md:mx-0" size={40} />
                 <h3 className="text-2xl md:text-4xl font-black text-white">For Elite Talent</h3>
                 <p className="text-slate-400 text-sm md:text-base">Pass the AI audit and gain exclusive access to high-ticket global sprints. No bidding, no proposals.</p>
                 <Link href="/freelancex/signup" className="inline-flex items-center justify-center md:justify-start gap-3 px-8 py-4 bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
                    Initialize Identity <ChevronRight size={16} />
                 </Link>
               </div>
             </div>

             {/* Client CTA */}
             <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-indigo-900/40 to-[#020617] border border-indigo-500/20 p-8 md:p-16 text-center md:text-left shadow-2xl group">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
               <div className="relative z-10 space-y-6">
                 <Building2 className="text-indigo-400 mx-auto md:mx-0" size={40} />
                 <h3 className="text-2xl md:text-4xl font-black text-white">For Enterprise</h3>
                 <p className="text-slate-400 text-sm md:text-base">Stop interviewing. Tell us your technical requirements and our AI will deploy the perfect engineering pod instantly.</p>
                 <Link href="/freelancex/consulting" className="inline-flex items-center justify-center md:justify-start gap-3 px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:scale-105 transition-all">
                    Book Discovery <ChevronRight size={16} />
                 </Link>
               </div>
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}