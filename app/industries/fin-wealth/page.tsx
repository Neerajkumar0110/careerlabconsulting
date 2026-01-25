import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Gem, 
  TrendingUp, 
  Crown, 
  Briefcase, 
  Search, 
  ShieldCheck, 
  ArrowRight,
  BarChart3,
  LineChart
} from 'lucide-react';

const WealthManagementPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md">
            <Crown className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Wealth & Asset Management Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            GENERATIVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-700 italic">
              PROSPERITY
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Elevating the standard of private wealth. We build AI-first platforms 
            that deliver institutional-grade market intelligence and hyper-personalized 
            investment strategies to the world's most discerning investors.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-emerald-700 hover:bg-emerald-600 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-900/40 flex items-center justify-center gap-2 text-white">
              Scale Your AUM <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Hyper-Personalized Portfolios", 
              desc: "Moving beyond generic risk profiles—AI that constructs portfolios based on real-time life goals, tax situations, and ethical values.",
              icon: <Briefcase className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "Generative Research Agents", 
              desc: "Custom LLMs that scan thousands of 10-Ks, earnings calls, and alternative data to find the signal in the noise.",
              icon: <Search className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "Predictive Tax Harvest", 
              desc: "Autonomous monitoring of portfolio losses and gains to execute tax-loss harvesting with surgical precision.",
              icon: <Gem className="w-8 h-8 text-emerald-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-emerald-950/5 border border-white/5 hover:border-emerald-500/30 transition-all">
              <div className="mb-6 p-4 bg-emerald-500/10 rounded-2xl inline-block group-hover:bg-emerald-600 transition-all">
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
          
          <div className="relative">
            <div className="absolute -inset-10 bg-emerald-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#010a05] border border-emerald-500/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] text-gray-500 uppercase">WEALTH_GEN_ADVISOR_v8</span>
                  </div>
                  <div className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[8px] font-bold">PREMIUM_ACCESS</div>
               </div>

               <div className="space-y-8">
                  <div className="flex justify-between items-end">
                     <div>
                        <p className="text-[10px] text-gray-500 uppercase">Alpha Projection</p>
                        <p className="text-3xl font-bold text-emerald-400">+18.4%</p>
                     </div>
                     <LineChart className="text-emerald-500/40 w-16 h-16" />
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500 uppercase mb-3 text-center">Portfolio Optimization Status</p>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 w-[92%]"></div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="mt-10 p-4 rounded-xl bg-emerald-500/5 border border-dashed border-emerald-500/20">
                  <p className="text-[10px] text-emerald-500/70 uppercase">AI REASONING:</p>
                  <p className="text-[11px] text-gray-300 mt-2 italic leading-relaxed">
                    "Detected shifts in semi-conductor supply chain. Recommending a 4.2% reallocation from Tech to Energy Infrastructure for HNW-Client-A421."
                  </p>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Elite <br/>Intelligence</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We empower advisors to spend less time on spreadsheets and more time 
              with clients. Our AI solutions act as a 24/7 quant team, performing 
              complex scenario analysis and generating bespoke investment narratives 
              in seconds.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all cursor-default">
                  <ShieldCheck className="text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-widest">Family Office Ready</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all cursor-default">
                  <BarChart3 className="text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-widest">Monte Carlo AI</span>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-emerald-950/40 to-black border border-emerald-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Preserve <br/>The Legacy</h2>
            <p className="text-emerald-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our wealth-tech strategists at DLF Cyber City are ready to build 
              the next generation of bespoke asset management tools.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-emerald-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START WEALTH BUILD
              </button>
              <div className="text-emerald-400 font-mono text-sm tracking-widest uppercase">Wealth Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default WealthManagementPage;