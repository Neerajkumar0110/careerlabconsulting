'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  BarChart3, 
  ShieldCheck, 
  Layers, 
  Workflow, 
  Settings,
  ArrowRight,
  Sparkles,
  PieChart,
  Truck,
  Factory,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

const erpModules = [
  {
    title: "Inventory & Supply Chain",
    desc: "Real-time tracking of stock levels, automated re-ordering, and vendor management with AI forecasting.",
    icon: <Truck className="text-orange-500" />
  },
  {
    title: "Financial Management",
    desc: "Automated ledger maintenance, tax reporting, and multi-currency support for global operations.",
    icon: <BarChart3 className="text-blue-500" />
  },
  {
    title: "Smart Manufacturing",
    desc: "Optimize production lines using AI to predict machine downtime and manage resource allocation.",
    icon: <Factory className="text-purple-500" />
  }
];

export default function AIERPPage() {
  const whatsappNumber = "918700236923";

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30">
      <Navbar portal="B2B" />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(29,78,216,0.15),transparent_50%)] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8"
          >
            <Sparkles size={14} className="text-orange-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-400">All-In-One Business Intelligence</span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tight">
            One Unified <span className="text-blue-500">System.</span> <br className="hidden md:block" />
            Total Control.
          </h1>
          
          <p className="text-slate-400 text-lg md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed">
            The CLC AI-ERP is an intelligent ecosystem that connects your finance, supply chain, and operations into a single source of truth.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Hello CLC, I'm interested in the AI-ERP solution for my enterprise.`}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/20"
            >
              Request Enterprise Demo <ArrowRight size={20} />
            </a>
            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all">
              Our Methodology
            </button>
          </div>
        </div>
      </section>

      {/* --- LIVE STATS BAR --- */}
      <section className="py-10 border-y border-white/5 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Data Accuracy', val: '99.9%' },
            { label: 'Operational Speed', val: '+55%' },
            { label: 'Cost Reduction', val: '30%' },
            { label: 'Uptime Guarantee', val: '99.99%' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl md:text-4xl font-black text-white">{stat.val}</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- MODULES GRID --- */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold mb-4 text-white">Modular Architecture</h2>
              <p className="text-slate-400">Scale your ERP by activating only the modules you need. No bloatware, just performance.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {erpModules.map((module, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-10 rounded-[40px] bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8">
                  {module.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{module.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm flex-grow">{module.desc}</p>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest cursor-pointer hover:underline">Explore Module →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- OPERATIONAL FLOW SECTION --- */}
      <section className="py-24 px-6 bg-blue-600/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight">
              AI-Powered <br /> <span className="text-blue-500">Business Flow</span>
            </h2>
            <div className="space-y-6">
              {[
                { t: "Data Consolidation", d: "Sync data from every department into a single dashboard." },
                { t: "Predictive Insights", d: "AI analyzes historical data to forecast future trends and demands." },
                { t: "Automated Workflows", d: "Reduce manual approvals by 70% with smart rule-based triggers." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{step.t}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visualization Component */}
          <div className="lg:w-1/2 w-full p-8 bg-slate-900 rounded-[50px] border border-white/10 relative overflow-hidden">
            <div className="flex justify-between items-center mb-10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[10px] text-slate-500 font-mono">system_v3.0_live</span>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="p-2 bg-blue-500/20 rounded-lg"><PieChart size={20} className="text-blue-400" /></div>
                   <span className="text-sm font-medium">Resource Utilization</span>
                </div>
                <span className="text-emerald-400 font-bold">92%</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="p-2 bg-orange-500/20 rounded-lg"><TrendingUp size={20} className="text-orange-400" /></div>
                   <span className="text-sm font-medium">Projected Revenue</span>
                </div>
                <span className="text-blue-400 font-bold">$1.2M</span>
              </div>
            </div>

            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600 blur-[100px] -z-10"
            />
          </div>
        </div>
      </section>

      {/* --- ENTERPRISE COMMITMENT --- */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Built for Global Standards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: <ShieldCheck />, t: "ISO 27001", d: "Highest Security Compliance" },
              { icon: <Layers />, t: "Multi-Cloud", d: "AWS, Azure, or Private Cloud" },
              { icon: <Settings />, t: "API-First", d: "Connect with 1000+ Apps" }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="mx-auto w-12 h-12 mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="font-bold mb-2">{item.t}</h4>
                <p className="text-xs text-slate-500">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6 bg-[#020617] relative overflow-hidden">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-900 to-blue-700 rounded-[60px] p-12 md:p-24 text-center relative shadow-3xl">
          <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to Transform?</h2>
          <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Schedule a custom-built demo session where our architects show you how CLC AI-ERP can fit your unique business model.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href={`https://wa.me/${whatsappNumber}`}
              className="px-12 py-5 bg-white text-blue-700 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-100 transition-colors shadow-xl"
            >
              Contact Solution Expert
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}