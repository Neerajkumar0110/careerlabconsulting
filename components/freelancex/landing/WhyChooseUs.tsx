"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Globe, Shield, Rocket, 
  Search, Cpu, ArrowRight, Star,
  CheckCircle, Users, Briefcase
} from "lucide-react";
import { useState, useEffect } from "react";

const FREELANCE_FEATURES = [
  {
    icon: Rocket,
    title: "Instant Onboarding",
    desc: "Deploy developers to your stack in under 24 hours with pre-signed NDAs.",
    tag: "Speed",
    color: "from-blue-500 to-cyan-400"
  },
  {
    icon: Shield,
    title: "Escrow Protection",
    desc: "Smart-contract based payments ensure talent gets paid and milestones are met.",
    tag: "Security",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Search,
    title: "AI Vetting",
    desc: "Every freelancer passes a live coding & communication audit by our AI agent.",
    tag: "Quality",
    color: "from-emerald-500 to-teal-400"
  },
  {
    icon: Users,
    title: "Talent Pods",
    desc: "Hire pre-assembled teams (Dev + PM + QA) that have worked together before.",
    tag: "Scale",
    color: "from-orange-500 to-rose-500"
  }
];

const AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
];

export default function ModernFreelanceSection() {
  return (
    <section className="relative py-20 px-4 bg-[#030712] text-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full"
          >
            The Future of Remote Work
          </motion.span>
          <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-tight">
            Hire the Top 1% <br className="hidden md:block" /> Freelance Engineers.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Stop scrolling through thousands of resumes. Our engine matches you with 
            vetted experts ready to commit to your sprint today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FREELANCE_FEATURES.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} index={idx} />
          ))}
        </div>

        <div className="mt-12 p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent">
          <div className="bg-[#0f172a]/80 backdrop-blur-xl rounded-[2.4rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="space-y-6 max-w-md">
              <div className="flex -space-x-4">
                {AVATARS.map((url, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5, zIndex: 10 }}
                    className="relative w-14 h-14 rounded-full border-4 border-[#0f172a] overflow-hidden bg-gray-800 cursor-pointer transition-all"
                  >
                    <img src={url} alt="Dev Avatar" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
                <div className="w-14 h-14 rounded-full border-4 border-[#0f172a] bg-indigo-600 flex items-center justify-center text-xs font-bold shadow-xl">
                  +2k
                </div>
              </div>

              <h3 className="text-3xl font-bold italic leading-snug text-gray-100">
                "Best engineering hire we've ever made."
              </h3>
              
              <div className="flex items-center gap-2 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={18} />
                ))}
                <span className="text-gray-400 ml-2 font-mono text-sm tracking-tighter">5.0/5.0 Trust Score</span>
              </div>
            </div>

            <div className="w-full lg:w-[400px] space-y-4">
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group cursor-default">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-sm font-medium text-gray-300">Matching React Expert...</span>
                  </div>
                  <span className="text-xs font-mono text-indigo-400 font-bold">98% Match</span>
               </div>

               <motion.button 
                 whileHover={{ scale: 1.02, backgroundColor: "#f8fafc" }}
                 whileTap={{ scale: 0.98 }}
                 className="w-full py-5 rounded-2xl bg-white text-black font-black flex items-center justify-center gap-3 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
               >
                 START YOUR SPRINT <ArrowRight size={20} strokeWidth={3} />
               </motion.button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 flex flex-col h-full"
    >
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mb-8 group-hover:rotate-6 transition-transform shadow-lg`}>
        <div className="w-full h-full bg-[#030712] rounded-[calc(1rem-2px)] flex items-center justify-center">
          <feature.icon className="text-white" size={24} />
        </div>
      </div>
      
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">{feature.tag}</span>
      <h4 className="text-xl font-bold mt-2 mb-4 group-hover:text-white transition-colors">
        {feature.title}
      </h4>
      <p className="text-gray-500 text-sm leading-relaxed mb-8">
        {feature.desc}
      </p>

      <div className="mt-auto flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
        <span className="text-xs font-bold flex items-center gap-2 text-indigo-400">
          Learn More <ArrowRight size={14} />
        </span>
        <CheckCircle size={18} className="text-emerald-500" />
      </div>
    </motion.div>
  );
}