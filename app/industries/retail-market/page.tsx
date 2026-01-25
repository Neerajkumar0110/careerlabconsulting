import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  BarChart4, 
  Globe, 
  Search, 
  TrendingUp, 
  Zap, 
  Layers, 
  ArrowRight,
  Radar,
  Eye
} from 'lucide-react';

const RetailMarketIntelligencePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 backdrop-blur-md">
            <Radar className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Market Intelligence & Pricing Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            RETAIL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-400 to-cyan-500 italic">
              OMNISCIENCE
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            See the market before it moves. We build AI-driven intelligence layers 
            that monitor competitor pricing, track emerging micro-trends, and 
            automate assortment optimization at a global scale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 text-white">
              Claim Market Share <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Dynamic Pricing AI", 
              desc: "Algorithms that adjust prices in real-time based on competitor moves, stock levels, and consumer price elasticity.",
              icon: <Zap className="w-8 h-8 text-indigo-400" /> 
            },
            { 
              title: "Trend Forecasting", 
              desc: "Using NLP and vision models to scan social media and runways, predicting the next 'must-have' product 6 months early.",
              icon: <TrendingUp className="w-8 h-8 text-indigo-400" /> 
            },
            { 
              title: "Competitor Scraping", 
              desc: "Automated, proxy-protected data pipelines that monitor thousands of global storefronts for assortment changes.",
              icon: <Search className="w-8 h-8 text-indigo-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-indigo-950/5 border border-white/5 hover:border-indigo-500/30 transition-all">
              <div className="mb-6 p-4 bg-indigo-500/10 rounded-2xl inline-block group-hover:bg-indigo-600 transition-all">
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
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Signal <br/>Architecture</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We provide the "Ground Truth" for retail decisions. Our AI models 
              ingest unstructured market signals—from shipping manifests to 
              TikTok sentiment—to give your category managers an unfair 
              advantage in assortment planning.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-indigo-500/30 transition-all">
                  <Globe className="text-indigo-400 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Global Heatmaps</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-indigo-500/30 transition-all">
                  <Layers className="text-indigo-400 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Assortment Gap Analysis</span>
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-blue-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#020410] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Market_Watch_Core</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold">REAL_TIME</div>
               </div>

               <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500 uppercase mb-3">Price Elasticity Index</p>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-indigo-500 w-[78%]"></div>
                        </div>
                        <span className="text-xs font-bold text-indigo-400">0.78</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                        <p className="text-[8px] text-gray-500 uppercase mb-1">Market Sentiment</p>
                        <p className="text-xl font-bold text-emerald-400">BULLISH</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[8px] text-gray-500 uppercase mb-1">Trend Velocity</p>
                        <p className="text-xl font-bold">+12.4%</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-indigo-500/10 rounded-xl border border-dashed border-indigo-500/20 text-[10px] text-indigo-200">
                  <p>ALERT: Competitor B has dropped prices on "Category_X" by 15%. AI recommends price matching for VIP segments only to preserve margins.</p>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Outsmart The <br/>Competition</h2>
            <p className="text-indigo-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our market intelligence engineers at DLF Cyber City are building 
              the radar for the retail world.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-indigo-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START MARKET AUDIT
              </button>
              <div className="text-indigo-400 font-mono text-sm tracking-widest uppercase">Intelligence Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default RetailMarketIntelligencePage;