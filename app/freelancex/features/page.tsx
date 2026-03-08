// app/freelancex/features/page.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Shield, Zap, Users, Code2, Globe, 
  ArrowRight, CheckCircle2, Cpu, BarChart3,
  Activity, ShieldCheck, Database, Fingerprint,
  Layers, Lock, Workflow, Rocket, Star, Layout
} from 'lucide-react';
import Link from 'next/link';
import HomeNavbar from "@/components/freelancex/layout/HomeNavbar";
import Footer from "@/components/freelancex/landing/Footer";

const CORE_FEATURES = [
  {
    icon: Brain,
    title: "Neural AI Vetting",
    desc: "Every freelancer passes a rigorous live coding audit conducted by proprietary AI agents.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: Shield,
    title: "Smart Contract Escrow",
    desc: "Payments are secured in escrow and released only when project milestones are verified.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Zap,
    title: "Instant Onboarding",
    desc: "Deploy verified developers to your stack in under 24 hours with pre-signed NDAs.",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Users,
    title: "Pre-Assembled Pods",
    desc: "Hire entire autonomous teams (Dev + PM + QA) with a proven track record.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Globe,
    title: "Global Compliance",
    desc: "We handle international taxes, labor laws, and cross-border compliance automatically.",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Track sprint progress and commit history through our transparent employer dashboard.",
    color: "from-rose-500 to-red-500"
  }
];

export default function FeaturesPage() {
  return (
    <>
    <HomeNavbar />
  
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-24 overflow-hidden selection:bg-indigo-500/30">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* --- SECTION 1: HERO MANIFESTO --- */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8"
          >
            <Cpu size={14} className="text-indigo-400" />
            <span className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">Protocol v4.0 Active</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1]"
          >
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              High-Fidelity.
            </span>
          </motion.h1>
          
          <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Discover the infrastructure powering the next generation of remote engineering. We've replaced manual screening with neural verification.
          </p>
        </div>

        {/* --- SECTION 2: LIVE TELEMETRY TICKER --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
          {[
            { label: "Talent Vetted", value: "31k+", icon: Fingerprint, color: "text-blue-400" },
            { label: "Deployment Time", value: "<24h", icon: Zap, color: "text-amber-400" },
            { label: "Success Rate", value: "99.8%", icon: Activity, color: "text-emerald-400" },
            { label: "Global Nodes", value: "12", icon: Globe, color: "text-purple-400" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl text-center"
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-4 ${stat.color}`} />
              <h4 className="text-3xl font-black mb-1">{stat.value}</h4>
              <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* --- SECTION 3: THE CORE CAPABILITIES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {CORE_FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 rounded-3xl p-8 transition-all duration-500"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-[1px] mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                <div className="w-full h-full bg-[#0a0f1d] rounded-[15px] flex items-center justify-center">
                  <feature.icon className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- SECTION 4: THE "DEV-ZERO" PROTOCOL (VISUAL) --- */}
        <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900/50 border border-indigo-500/20 rounded-[3rem] p-8 md:p-16 mb-32 relative overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-black leading-tight">
                Zero-Trust <br /> <span className="text-indigo-400">Engineering.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Our "Dev-Zero" protocol ensures that you never hire based on a resume. Every freelancer on our network has a verified, immutable skill matrix stored on the ledger.
              </p>
              <ul className="space-y-4">
                {[
                  "Source code analysis for logic consistency",
                  "Identity verification via biometric audit",
                  "Milestone-based automated escrow",
                  "IP protection via hardware-level encryption"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300 text-sm font-bold">
                    <ShieldCheck className="text-emerald-500 w-5 h-5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-[#020617] border border-white/10 rounded-2xl p-6 shadow-2xl">
                 <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Security_Audit.log</span>
                 </div>
                 <div className="font-mono text-xs md:text-sm space-y-4 text-slate-300">
                    <p className="text-emerald-400">INITIALIZING AI_VETTING_PROTOCOL...</p>
                    <p><span className="text-blue-400">&gt; Scanning GitHub Repo:</span> [COMPLETED]</p>
                    <p><span className="text-blue-400">&gt; Logic Integrity Check:</span> 98.4% [PASS]</p>
                    <p><span className="text-blue-400">&gt; Pedigree Anonymization:</span> [ACTIVE]</p>
                    <p className="text-indigo-400 animate-pulse pt-4">TALENT_NODE_IDENTIFIED: S-TIER ARCHITECT</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 5: THE BENTO INFRASTRUCTURE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
            <div className="md:col-span-2 bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-all">
                <Database className="w-10 h-10 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold mb-3">Distributed State Management</h3>
                <p className="text-slate-400 leading-relaxed">Our platform runs on distributed nodes to ensure your hiring data and communication logs are always available, even during regional network failures.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
                <Workflow className="w-10 h-10 text-purple-400 mb-6" />
                <h3 className="text-xl font-bold mb-2">Jira/GitHub Sync</h3>
                <p className="text-xs text-slate-500">Native integration with your developer tools.</p>
            </div>
            <div className="bg-indigo-600 rounded-3xl p-8 flex flex-col justify-between group cursor-pointer overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
                <Lock className="w-10 h-10 text-white mb-6" />
                <div>
                    <h3 className="text-xl font-bold text-white mb-2">NDA Automation</h3>
                    <p className="text-indigo-100 text-sm">Pre-signed legal safety for every gig.</p>
                </div>
            </div>
            <div className="md:col-span-2 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 flex items-center gap-8">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 shrink-0">
                    <BarChart3 className="w-8 h-8 text-emerald-500" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Efficiency Over Bidding</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">We don't do race-to-the-bottom bidding. We match you with the right talent at fair market value based on neural scores.</p>
                </div>
            </div>
        </div>

        {/* --- SECTION 6: CLIENT SOCIAL PROOF --- */}
        <div className="mb-32">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-4xl font-bold">Proven Performance</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { quote: "The speed of onboarding was insane. We had a senior backend dev in our Slack in under 12 hours.", author: "CTO, Nexus Systems", logo: "NX" },
                    { quote: "Smart contract escrow took all the risk out of international payments for us.", author: "Founder, Fintech Global", logo: "FG" }
                ].map((t, i) => (
                    <div key={i} className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 italic text-slate-300 relative">
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#020617] flex items-center justify-center font-black text-xs border border-white/10 rounded-xl text-indigo-400">{t.logo}</div>
                        "{t.quote}"
                        <div className="mt-6 not-italic font-bold text-white text-sm">— {t.author}</div>
                    </div>
                ))}
            </div>
        </div>

        {/* --- SECTION 7: FINAL CALL TO ACTION --- */}
        <div className="text-center max-w-2xl mx-auto">
          <motion.h2 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            className="text-4xl font-black text-white mb-6"
          >
            Ready to experience <br /> the future of work?
          </motion.h2>
          <p className="text-slate-400 mb-10 text-lg">Join the ecosystem today and deploy your first elite developer in under 24 hours.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/freelancex/signup" 
              className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
            >
              Start Hiring Now <ArrowRight size={18} />
            </Link>
            <Link 
              href="/freelancer-platform" 
              className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white border border-white/10 font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Join the Talent Node
            </Link>
          </div>
        </div>

      </div>
    </div>

    <Footer />
    </>
  );
}