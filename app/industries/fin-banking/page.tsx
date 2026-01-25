import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Landmark, 
  ShieldCheck, 
  TrendingUp, 
  Scale, 
  RefreshCcw, 
  UserCheck, 
  ArrowRight,
  Wallet,
  PieChart
} from 'lucide-react';

const BankingIndustryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Landmark className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Retail & Enterprise Banking Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            AUTONOMOUS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-blue-400 to-indigo-600 italic">
              FINANCE
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            The era of manual banking is over. We build enterprise-grade AI that 
            automates credit scoring, detects sophisticated money laundering patterns, 
            and provides hyper-personalized wealth management at scale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 text-white">
              Modernize Your Core <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "AI Underwriting", 
              desc: "Deploying machine learning models that analyze alternative data to assess credit risk with 40% higher accuracy than traditional scores.",
              icon: <UserCheck className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "AML/KYC Automation", 
              desc: "Real-time anti-money laundering (AML) detection using graph neural networks to identify complex shell-company structures.",
              icon: <ShieldCheck className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Hyper-Personalization", 
              desc: "NBO (Next Best Offer) engines that increase cross-sell conversion by predicting user life events through transaction data.",
              icon: <TrendingUp className="w-8 h-8 text-blue-400" /> 
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
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Secure by <br/>Algorithm</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We integrate AI directly into the banking core (Temenos, Mambu, FIS). 
              Our solutions focus on reducing operational overhead while maintaining 
              absolute compliance with Basel IV and regional banking regulations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4">
                  <RefreshCcw className="text-blue-400 w-6 h-6" />
                  <span className="font-bold text-sm tracking-widest uppercase">Real-time Clearing</span>
               </div>
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4">
                  <Scale className="text-blue-400 w-6 h-6" />
                  <span className="font-bold text-sm tracking-widest uppercase">Regulatory Sandbox</span>
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-blue-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] text-gray-500">TRANSACTION_REASONING_ENGINE</span>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500 uppercase mb-2">Fraud Probability Index</p>
                     <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold text-emerald-400">0.002%</span>
                        <span className="text-emerald-400 text-xs font-mono pb-1 italic">SAFE</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[10px] text-gray-500 uppercase mb-1">DTI Ratio</p>
                        <p className="text-xl font-bold">24.2%</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[10px] text-gray-500 uppercase mb-1">Liquidity</p>
                        <PieChart className="w-4 h-4 text-blue-400 mt-2" />
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-6 rounded-2xl bg-blue-500/5 border border-dashed border-blue-500/30">
                  <p className="text-[10px] text-gray-500">ENGINE_OUTPUT:</p>
                  <p className="text-[11px] text-blue-300 mt-1 italic leading-relaxed">
                    "Application ID #BF-441 verified. Credit limit auto-adjusted based on 12-month historical cash-flow analysis."
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-slate-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Banking <br/>Without Borders</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our fintech engineers at DLF Cyber City are ready to build 
              the future of banking infrastructure.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START CORE UPGRADE
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">Financial Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BankingIndustryPage;