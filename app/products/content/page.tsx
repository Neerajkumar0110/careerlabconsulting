import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import FeatureGrid from '@/components/sections/FeatureGrid';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { PenTool, Globe, Zap, Share2, Sparkles, Layout } from 'lucide-react';

const ContentSuitePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#1e3a8a_0%,transparent_70%)] opacity-10 -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">GenAI Site Builder & Content</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            AI WEBSITE & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600">
              CONTENT SUITE
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Architecting the next generation of digital presence. Deploy high-conversion websites 
            and enterprise-grade content assets using autonomous intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20">
              Launch Site Builder
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              View Content Samples
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: "Autonomous Site Builder", 
              desc: "Dynamic, SEO-optimized web architectures generated from simple natural language prompts.",
              icon: <Layout className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Enterprise Copywriting", 
              desc: "AI-driven content strategies that maintain your brand voice across thousands of assets.",
              icon: <PenTool className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Multi-Channel Sync", 
              desc: "Deploy content instantly across web, social, and internal portals with one click.",
              icon: <Share2 className="w-8 h-8 text-blue-400" /> 
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

      <FeatureGrid />

      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[3rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 italic">Start Your Digital Evolution</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
              Our experts in Gurugram are ready to help you scale your content operations.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="px-16 py-6 bg-white text-blue-900 rounded-full font-black text-xl hover:scale-105 transition-all shadow-2xl">
                GET STARTED
              </button>
              <div className="text-blue-400 font-mono text-sm">+91 870023 6923</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContentSuitePage;