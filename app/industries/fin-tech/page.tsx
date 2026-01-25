import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Zap, 
  CreditCard, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight,
  Code2,
  PieChart,
  MessageSquare,
  Activity
} from 'lucide-react';

const FinTechIndustryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-400/10 border border-blue-400/20 mb-8 backdrop-blur-md">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Next-Gen Fintech Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            VELOCITY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500 italic">
              BANKING
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Building the intelligence layer for the next unicorn. We help fintechs 
            integrate AI-driven lending, autonomous customer support, and 
            high-velocity fraud detection into their existing API stacks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 text-white">
              Scale Your Feature Set <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Embedded AI Lending", 
              desc: "Deploying BNPL and micro-lending models that use behavioral telemetry to approve credit in under 200ms.",
              icon: <CreditCard className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Agentic Support", 
              desc: "Replacing simple bots with AI agents that can resolve disputes, process refunds, and modify subscriptions autonomously.",
              icon: <MessageSquare className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Transaction Enrichment", 
              desc: "Using LLMs to clean messy merchant data into clear, categorized insights for a superior user experience.",
              icon: <Activity className="w-8 h-8 text-blue-400" /> 
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
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">API-First <br/>Intelligence</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We specialize in "Invisible AI." Our solutions don't disrupt your 
              user journey; they enhance it through seamless API integrations 
              and real-time event processing that works behind the scenes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4">
                  <Code2 className="text-blue-400 w-6 h-6" />
                  <span className="font-bold text-sm tracking-widest uppercase">Developer-Centric SDKs</span>
               </div>
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4">
                  <Smartphone className="text-blue-400 w-6 h-6" />
                  <span className="font-bold text-sm tracking-widest uppercase">Mobile-Native AI</span>
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-cyan-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-cyan-400" />
                    <span className="text-[10px] text-gray-500 uppercase">USER_INSIGHTS_ENGINE</span>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
               </div>

               <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                     <p className="text-[10px] text-gray-500 uppercase mb-2">Predicted Churn Risk</p>
                     <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold">LOW</span>
                        <span className="text-blue-400 text-xs font-mono pb-1">3.2%</span>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500 uppercase mb-2">Cross-Sell Opportunity</p>
                     <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">Premium Card Upgrade</p>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-[#010101] rounded-xl border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-2">Real-time enrichment:</p>
                  <p className="text-[11px] text-gray-400 italic">
                    "T_88291: STARBUCKS_CYBER_CITY_GURUGRAM → Category: Food & Drink → Recurring: True"
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Scale Your <br/>Vision</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our fintech engineers at DLF Cyber City are ready to build the 
              next breakthrough in digital finance.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START FINTECH BUILD
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">DLF Cyber City, Gurugram</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FinTechIndustryPage;