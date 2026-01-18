'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Video, 
  Award, 
  BarChart, 
  Users, 
  Monitor, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Zap,
  PlayCircle,
  ShieldCheck,
  TrendingUp,
  Clock
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

const lmsFeatures = [
  {
    title: "AI-Personalized Learning",
    desc: "AI analyzes learner behavior to suggest custom learning paths and content speed adjustments.",
    icon: <Sparkles className="text-yellow-500" />
  },
  {
    title: "Interactive Assessments",
    desc: "Auto-graded quizzes, coding challenges, and AI-proctored exams for high-integrity testing.",
    icon: <Award className="text-purple-500" />
  },
  {
    title: "Live & Recorded Sessions",
    desc: "Seamlessly integrate Zoom/Meet for live classes or host high-bandwidth 4K recorded lectures.",
    icon: <Video className="text-blue-500" />
  }
];

const capabilities = [
  "SCORM & xAPI Compliant Architecture",
  "White-Labeling: Your Brand, Your Domain",
  "Gamification: Leaderboards, Badges, & Points",
  "Detailed Analytics: Track Progress & ROI"
];

// Reliable image sources for the avatars
const trustedLearners = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
];

export default function AILMSPage() {
  const whatsappNumber = "918700236923";

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30">
      <Navbar portal="B2B" />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden text-center">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 blur-[100px] -z-10" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/10 blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <BookOpen size={14} className="text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Education Redefined</span>
          </motion.div>

          <h1 className="text-3xl md:text-8xl font-black mb-8 leading-tight tracking-tight bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
            The Intelligent Way <br /> To Train Your Team.
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            From onboarding new hires to complex technical certifications, our AI-LMS delivers a seamless, engaging, and measurable learning experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Hi CLC, I'm interested in the AI-LMS for our corporate training.`}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/20"
            >
              Start Your Free Pilot <ArrowRight size={20} />
            </a>
            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all flex items-center justify-center gap-2">
              <PlayCircle size={20} /> Watch Product Tour
            </button>
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID --- */}
      <section className="py-24 px-6 bg-slate-900/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Powerful Learning Infrastructure</h2>
          <p className="text-slate-500">Every tool you need to build a high-performance culture.</p>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lmsFeatures.map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[40px] bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all shadow-inner group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- LEARNER EXPERIENCE SECTION (FIXED IMAGES) --- */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Side: Real Dashboard Data & Visuals */}
          <div className="lg:w-1/2 w-full order-2 lg:order-1">
            <div className="relative">
              {/* Main Course Image */}
              <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Corporate Training" 
                  className="w-full h-[450px] object-cover opacity-80"
                />
              </div>

              {/* Floating Data Overlay 1: Analytics */}
              <motion.div 
                initial={{ x: -20 }}
                whileInView={{ x: 0 }}
                className="absolute -top-10 -left-6 bg-[#0f172a] p-6 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-xl md:w-64"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-500"><TrendingUp size={20}/></div>
                  <span className="text-sm font-bold text-white">Retention Rate</span>
                </div>
                <div className="text-3xl font-black text-emerald-400">98.2%</div>
                <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">+12% from last quarter</div>
              </motion.div>

              {/* Floating Data Overlay 2: Active Learners */}
              <motion.div 
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                className="absolute -bottom-10 -right-6 bg-blue-600 p-6 rounded-[2rem] shadow-2xl md:w-56"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Users size={20} className="text-white"/>
                  <span className="text-xs font-bold text-blue-100 uppercase tracking-widest text-white">Active Now</span>
                </div>
                <div className="text-2xl font-black text-white">1,429</div>
                <div className="mt-3 flex -space-x-2">
                  {trustedLearners.slice(0, 4).map((url, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-blue-600 bg-slate-200 overflow-hidden relative">
                       <img 
                        src={url} 
                        alt={`active-user-${i}`} 
                        className="w-full h-full object-cover"
                       />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Professional Copy & Social Proof */}
          <div className="lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight text-white">
              A Platform Employees <br /> <span className="text-blue-500">Actually Love.</span>
            </h2>
            <div className="space-y-6 mb-12">
              {capabilities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="bg-blue-600/20 p-1 rounded-full group-hover:bg-blue-600 transition-colors">
                    <CheckCircle2 size={20} className="text-blue-500 group-hover:text-white" />
                  </div>
                  <span className="text-lg text-slate-300 font-medium group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>

            {/* Trusted By Section with Fixed Avatar Layout */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center gap-6">
               <div className="flex -space-x-3">
                  {trustedLearners.map((url, i) => (
                    <div key={i} className="w-14 h-14 rounded-full border-4 border-[#020617] bg-slate-800 overflow-hidden transition-transform hover:scale-110 hover:z-10 relative">
                       <img 
                        src={url} 
                        alt={`learner-${i}`} 
                        className="w-full h-full object-cover"
                       />
                    </div>
                  ))}
                  <div className="w-14 h-14 rounded-full border-4 border-[#020617] bg-blue-600 flex items-center justify-center text-xs font-bold text-white z-10">+10k</div>
               </div>
               <div>
                  <p className="font-bold text-white tracking-tight text-lg">Trusted by 10,000+ learners</p>
                  <p className="text-sm text-slate-500 leading-none">Across top-tier global enterprises</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUST & COMPLIANCE --- */}
      <section className="py-20 px-6 border-t border-white/5 bg-slate-900/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-10 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-3 font-bold tracking-tighter text-xl"><ShieldCheck size={28} className="text-blue-500"/> GDPR READY</div>
            <div className="flex items-center gap-3 font-bold tracking-tighter text-xl"><Monitor size={28} className="text-blue-500"/> MULTI-PLATFORM</div>
            <div className="flex items-center gap-3 font-bold tracking-tighter text-xl"><Users size={28} className="text-blue-500"/> SSO ENABLED</div>
            <div className="flex items-center gap-3 font-bold tracking-tighter text-xl">
               <svg className="w-7 h-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
               CLOUD SCALE
            </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="py-24 px-6 bg-[#020617]">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-700 via-indigo-900 to-black rounded-[4rem] p-12 md:p-24 text-center relative shadow-3xl overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-white">
                Ready to build your <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white text-white">Corporate University?</span>
            </h2>
            <p className="text-blue-100/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium">
              Transform the way your organization learns. Scale knowledge, track progress, and drive measurable ROI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white">
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                className="inline-flex items-center gap-3 bg-white text-blue-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl shadow-black/40"
              >
                Contact Sales Expert <ArrowRight size={18} />
              </a>
              <div className="flex items-center gap-2 text-blue-200/60 text-sm italic">
                <Clock size={16} /> 24-hour response time
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)] opacity-50 group-hover:opacity-30 transition-opacity" />
        </div>
      </section>

      <Footer />
    </div>
  );
}