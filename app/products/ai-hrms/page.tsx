'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Clock, 
  CreditCard, 
  LineChart, 
  ShieldCheck, 
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
  Layers
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

const hrmsFeatures = [
  {
    title: "AI-Payroll Automation",
    desc: "Calculate salaries, taxes, and statutory compliances with a single click. Zero manual errors guaranteed.",
    icon: <CreditCard className="text-emerald-500" />
  },
  {
    title: "Smart Attendance",
    desc: "Mobile-based attendance tracking featuring Geo-fencing and AI Facial Recognition for remote & on-site teams.",
    icon: <Clock className="text-blue-500" />
  },
  {
    title: "Performance Analytics",
    desc: "Leverage AI-driven insights to identify top talent, track KPIs, and map organizational growth.",
    icon: <LineChart className="text-purple-500" />
  }
];

const pricingPlans = [
  {
    name: "Startup",
    price: "Custom",
    features: ["Up to 50 Employees", "Core HR & Attendance", "Mobile App Access", "Email Support"],
    highlight: false
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    features: ["Unlimited Employees", "AI Payroll & Compliance", "API Integration", "Dedicated Manager"],
    highlight: true
  }
];

export default function AIHRMSPage() {
  const whatsappNumber = "918700236923";

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans">
      <Navbar portal="B2B" />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 md:pt-40 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] -z-10 rounded-full" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles size={16} className="text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Future of Workforce Management</span>
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-black mb-6 leading-[1.1] bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent">
            Empower People, <br /> Simplify Operations.
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mb-10 leading-relaxed">
            Career Lab Consulting's AI-HRMS automates your recruitment, payroll, and employee lifecycle management, allowing you to focus on building a winning culture.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Hello CLC, I am interested in a demo of your AI-HRMS solution.`}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
            >
              Request Free Demo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all">
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      {/* --- FEATURE GRID --- */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {hrmsFeatures.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm hover:border-blue-500/50 transition-all"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CORE CAPABILITIES --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:flex-1 order-2 lg:order-1">
              <div className="relative p-6 bg-gradient-to-br from-blue-600/20 to-transparent rounded-[40px] border border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'System Uptime', val: '99.9%', color: 'text-blue-400' },
                    { label: 'Time Saved', val: '60hrs/mo', color: 'text-emerald-400' },
                    { label: 'Compliance', val: 'Global', color: 'text-purple-400' },
                    { label: 'Security', val: 'AES-256', color: 'text-pink-400' }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-slate-900/80 p-6 rounded-2xl border border-white/5">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">{stat.label}</p>
                      <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:flex-1 order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
                Enterprise-Grade <br /> <span className="text-blue-500">Architecture</span>
              </h2>
              <ul className="space-y-4">
                {[
                  "Biometric & GPS-based Attendance Sytems",
                  "Automated Tax Compliance (PF, ESI, TDS, LWF)",
                  "Custom Workflow Engine for Approvals",
                  "End-to-End Employee Lifecycle Tracking"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 size={20} className="text-blue-500 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: INTEGRATIONS --- */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 italic opacity-80">Connects with your favorite tools</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all">
            <Layers size={48} />
            <Zap size={48} />
            <Lock size={48} />
            <ShieldCheck size={48} />
          </div>
        </div>
      </section>

      {/* --- NEW SECTION: PRICING --- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Scalable Pricing</h2>
            <p className="text-slate-400">Flexible plans tailored to your organization's size.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {pricingPlans.map((plan, i) => (
              <div key={i} className={`p-10 rounded-[40px] border ${plan.highlight ? 'border-blue-500 bg-blue-600/5' : 'border-white/10 bg-white/5'}`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-4xl font-black mb-8">{plan.price}</p>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 size={16} className="text-blue-500" /> {feat}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.highlight ? 'bg-blue-600' : 'bg-white/10 hover:bg-white/20'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- APP HIGHLIGHT --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-blue-600 rounded-[40px] p-10 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">HR in your pocket.</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-md italic">
              Empower your employees with a self-service portal for leave applications and pay slip downloads—anytime, anywhere.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
               <Smartphone size={40} className="text-white opacity-50" />
               <div className="h-10 w-[1px] bg-white/20" />
               <Users size={40} className="text-white opacity-50" />
            </div>
          </div>
          <a 
            href={`https://wa.me/${whatsappNumber}`}
            className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-100 transition-colors shadow-2xl"
          >
            Access Mobile App
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}