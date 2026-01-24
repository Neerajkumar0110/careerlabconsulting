import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  Layout, 
  Smartphone, 
  Globe, 
  Monitor, 
  Code2, 
  Zap, 
  ArrowRight,
  MousePointer2,
  Sparkles,
  Search
} from 'lucide-react';

const AIWebAppsPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Layout className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">AI-Native Web Engineering</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            INTELLIGENT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 italic">
              WEB APPS
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            We don't just build websites; we build autonomous web ecosystems. 
            From AI-driven SaaS platforms to predictive dashboards, we merge 
            world-class UX with neural compute.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "AI SaaS Platforms", 
                desc: "Full-scale software-as-a-service development with embedded LLMs and agentic features.",
                icon: <Globe className="w-8 h-8 text-blue-400" /> 
              },
              { 
                title: "Predictive Dashboards", 
                desc: "Data-heavy interfaces that don't just show the past, but forecast future trends using AI.",
                icon: <Monitor className="w-8 h-8 text-blue-400" /> 
              },
              { 
                title: "Generative UI/UX", 
                desc: "Interfaces that adapt in real-time based on user behavior and AI-driven personalization.",
                icon: <MousePointer2 className="w-8 h-8 text-blue-400" /> 
              }
            ].map((item, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-blue-900/5 border border-white/5 hover:border-blue-500/30 transition-all">
                <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl inline-block group-hover:bg-blue-600 transition-all">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 bg-blue-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
              <div className="flex gap-4 mb-10">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>

              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Code2 className="text-blue-400 w-5 h-5" />
                      <span className="font-mono text-sm uppercase">Frontend Stack</span>
                   </div>
                   <span className="text-xs text-gray-500">Next.js / Tailwind</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Zap className="text-yellow-400 w-5 h-5" />
                      <span className="font-mono text-sm uppercase">AI Integration</span>
                   </div>
                   <span className="text-xs text-gray-500">LangChain / OpenAI</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <Search className="text-emerald-400 w-5 h-5" />
                      <span className="font-mono text-sm uppercase">Vector Search</span>
                   </div>
                   <span className="text-xs text-gray-500">Pinecone / Supabase</span>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/5 flex justify-center">
                 <div className="flex items-center gap-2 text-blue-400">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-widest">Optimized for Speed</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">Beyond The <br/>Browser</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We leverage modern frameworks like Next.js and React, infused with 
              proprietary AI middleware, to create high-performance web experiences. 
              Our apps are mobile-responsive, SEO-optimized, and built to handle 
              millions of tokens per minute.
            </p>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <Smartphone className="text-blue-400 mb-2" />
                  <p className="font-bold text-sm">PWA Ready</p>
               </div>
               <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <Zap className="text-blue-400 mb-2" />
                  <p className="font-bold text-sm">Edge Latency</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Build the Future <br/>on Web</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our engineering team at DLF Cyber City is ready to develop your 
              AI-native web application.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START CODING
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">+91 870023 6923</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AIWebAppsPage;