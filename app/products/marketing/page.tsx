import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { Megaphone, Rocket, BarChart3, Globe2, Target, Mail, Zap } from 'lucide-react';

const MarketingSuitePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Megaphone className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Omnichannel Automation</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            MARKETING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600">
              SUITE
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Dominate every channel simultaneously. Our AI-driven marketing engine 
            automates campaign orchestration, customer segmentation, and performance 
            scaling across the global digital landscape.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20">
              Scale My Growth
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              View Capabilities
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "AI Campaign Architect", 
              desc: "Deploy multi-channel campaigns that automatically adjust messaging based on real-time user behavior.",
              icon: <Rocket className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Predictive Analytics", 
              desc: "Forecast ROAS and customer lifetime value (LTV) with 95% accuracy before spending a single rupee.",
              icon: <BarChart3 className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Neural Segmentation", 
              desc: "Hyper-target audiences using autonomous sentiment analysis and intent-based behavioral tracking.",
              icon: <Target className="w-8 h-8 text-blue-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-blue-900/5 border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl inline-block group-hover:bg-blue-600 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">Global Reach, Local Impact</h2>
            <div className="space-y-8">
              {[
                { t: "Automated Personalization", d: "Tailor emails, ads, and landing pages at a scale of millions.", i: <Mail className="text-blue-400" /> },
                { t: "Omnichannel Sync", d: "One central dashboard to rule Social, Search, and Web presence.", i: <Globe2 className="text-blue-400" /> },
                { t: "Real-time Optimization", d: "Autonomous bidding and budget allocation to maximize your ROI.", i: <Zap className="text-blue-400" /> }
              ].map((point, idx) => (
                <div key={idx} className="flex gap-5">
                  <div className="mt-1">{point.i}</div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{point.t}</h4>
                    <p className="text-gray-400">{point.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 group">
            <img 
              src="https://images.pexels.com/photos/3182766/pexels-photo-3182766.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Marketing Strategy Session" 
              className="w-full h-auto opacity-70 group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      <FeatureGrid />
      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[3rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">ACCELERATE GROWTH</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our marketing architects at DLF Cyber City are ready to design your 
              omnichannel future.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                BOOK GROWTH AUDIT
              </button>
              <div className="flex items-center gap-3 text-blue-400 font-mono text-sm tracking-widest">
                <Globe2 className="w-4 h-4" />
                <span>+91 870023 6923</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default MarketingSuitePage;