import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { Layers, Zap, Shield, Cpu, ArrowRight, BarChart3 } from 'lucide-react';

const CLCOnePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 mb-8 backdrop-blur-md">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300 text-xs font-bold uppercase tracking-[0.3em]">
              All-In-One Intelligence
            </span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-[ -0.05em] leading-none">
            CLC <span className="text-white opacity-90">ONE</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-2xl leading-relaxed mb-12">
            The ultimate unified platform. Integrating Business, Growth, and 
            Operations into a single, seamless AI nervous system.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-12 py-5 bg-white text-black hover:bg-gray-200 rounded-full font-black text-xl transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)] hover:scale-105">
              Get Full Access
            </button>
            <button className="px-12 py-5 bg-blue-600/10 border border-blue-500/30 hover:bg-blue-600/20 rounded-full font-bold backdrop-blur-md transition-all">
              Watch Vision 2026
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="relative group p-[1px] rounded-[2.5rem] bg-gradient-to-b from-white/20 to-transparent">
            <div className="relative rounded-[2.4rem] overflow-hidden bg-[#03081a] border border-white/5">
              <img 
                src="https://images.pexels.com/photos/5900222/pexels-photo-5900222.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="CLC One Dashboard Preview" 
                className="w-full h-auto opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
              
              <div className="absolute bottom-10 left-10 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hidden md:block">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <BarChart3 className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">System Efficiency</div>
                    <div className="text-xl font-bold">99.98% Optimized</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Unified Data", desc: "No more silos. Your data flows across all suites instantly.", icon: <Layers /> },
              { title: "Quantum Speed", desc: "Powered by custom LLM architectures for sub-second responses.", icon: <Zap /> },
              { title: "Neural Security", desc: "Self-healing security protocols that learn from threats.", icon: <Shield /> },
              { title: "Auto-Scale", desc: "Intelligence that grows as your enterprise expands.", icon: <Cpu /> }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-blue-500/40 transition-all hover:bg-white/[0.08] group">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-blue-900/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic leading-tight">
              One Subscription. <br /> Total Control.
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Why manage five different vendors when you can have one partner? 
              CLC ONE replaces fragmented software stacks with a single source of truth.
            </p>
            <div className="space-y-4">
              {['Single Sign-On (SSO)', 'Global Support Hub', 'Custom AI Training'].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">✓</div>
                  <span className="text-gray-300 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-64 bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
               <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600" className="w-full h-full object-cover opacity-50" alt="Meeting" />
            </div>
            <div className="h-64 bg-white/5 rounded-3xl border border-white/10 mt-12 overflow-hidden">
               <img src="https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=600" className="w-full h-full object-cover opacity-50" alt="Code" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto p-12 md:p-24 rounded-[4rem] bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 border border-white/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">UNIFY NOW</h2>
            <p className="text-blue-100 text-lg md:text-xl mb-12 opacity-80">
              Transform your organization with the power of CLC ONE.
            </p>
            <button className="bg-white text-blue-900 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
              REQUEST INVITE
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CLCOnePage;