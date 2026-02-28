'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Shield, Zap, Users, Code2, Globe, 
  ArrowRight, CheckCircle2, Cpu, BarChart3
} from 'lucide-react';
import Link from 'next/link';
import HomeNavbar from "@/components/freelancex/layout/HomeNavbar";
import Footer from "@/components/freelancex/landing/Footer";

const CORE_FEATURES = [
  {
    icon: Brain,
    title: "Neural AI Vetting",
    desc: "Every freelancer passes a rigorous live coding and behavioral audit conducted by our proprietary AI agents.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    icon: Shield,
    title: "Smart Contract Escrow",
    desc: "Payments are secured in escrow and released automatically only when predefined project milestones are met.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Zap,
    title: "Instant Onboarding",
    desc: "Skip the weeks of legal paperwork. Deploy verified developers to your stack in under 24 hours with pre-signed NDAs.",
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Users,
    title: "Pre-Assembled Pods",
    desc: "Hire entire autonomous teams (Dev + PM + QA) that have a proven track record of working together.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Globe,
    title: "Global Compliance",
    desc: "We handle international taxes, local labor laws, and cross-border compliance so you don't have to.",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    desc: "Track sprint progress, commit history, and milestone completion rates through our transparent employer dashboard.",
    color: "from-rose-500 to-red-500"
  }
];

const HIGHLIGHTS = [
  "Top 1% Global Talent Pool",
  "Zero Hiring Fees",
  "Automated Dispute Resolution",
  "Intellectual Property Protection",
  "Seamless GitHub/Jira Integration",
  "24/7 Dedicated Account Manager"
];

export default function FeaturesPage() {
  return (
    <>
    <HomeNavbar />
  
    <div className="min-h-screen bg-[#020617] text-white pt-32 pb-24 overflow-hidden selection:bg-indigo-500/30">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8"
          >
            <Cpu size={14} className="text-indigo-400" />
            <span className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">Platform Capabilities</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]"
          >
            Features built for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Scale & Security.
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed"
          >
            Discover the infrastructure powering the next generation of remote work. From AI-driven vetting to smart-contract escrow, we've engineered trust into every step.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {CORE_FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 pointer-events-none" />
              
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

        <div className="bg-[#0f172a]/50 border border-indigo-500/20 rounded-[3rem] p-8 md:p-16 relative overflow-hidden mb-32">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                The X-Secure <br/> <span className="text-indigo-400">Advantage.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                We don't just match you with freelancers; we provide an end-to-end ecosystem. Our autonomous protocol handles the friction so you can focus on shipping products.
              </p>
              
              <ul className="space-y-4">
                {HIGHLIGHTS.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-slate-300 font-bold"
                  >
                    <CheckCircle2 className="text-emerald-500 w-5 h-5 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="bg-[#020617] border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10">
                <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-4 text-xs font-mono text-slate-500">protocol-status.js</span>
                </div>
                <div className="font-mono text-sm space-y-3 text-slate-400">
                  <p><span className="text-purple-400">const</span> <span className="text-blue-400">matchmaker</span> = <span className="text-yellow-300">new</span> <span className="text-emerald-400">NeuralEngine</span>();</p>
                  <p><span className="text-purple-400">await</span> matchmaker.<span className="text-blue-400">verifyCandidate</span>({'{'}</p>
                  <p className="pl-4">skills: [<span className="text-green-300">'React'</span>, <span className="text-green-300">'Node.js'</span>],</p>
                  <p className="pl-4">clearance: <span className="text-orange-400">true</span>,</p>
                  <p className="pl-4">escrowReady: <span className="text-orange-400">true</span></p>
                  <p>{'});'}</p>
                  <p className="text-emerald-500 pt-4">// [SUCCESS] Top 1% Developer Deployed</p>
                </div>
              </div>
              
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-6">Ready to experience the future of work?</h2>
          <p className="text-slate-400 mb-10 text-lg">Join the ecosystem today and deploy your first elite developer in under 24 hours.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/ai-employers" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black text-sm uppercase tracking-widest rounded-full hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
            >
              Start Hiring Now <ArrowRight size={18} />
            </Link>
            <Link 
              href="/freelancer-platform" 
              className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white border border-white/10 font-black text-sm uppercase tracking-widest rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              Apply as Talent
            </Link>
          </div>
        </div>

      </div>
    </div>

    <Footer />
    </>
  );
}