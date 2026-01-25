import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  ShoppingBag, 
  Sparkles, 
  Search, 
  Package, 
  BarChart3, 
  Users, 
  ArrowRight,
  MousePointer2,
  Camera
} from 'lucide-react';

const RetailD2CPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-8 backdrop-blur-md">
            <ShoppingBag className="w-4 h-4 text-pink-400" />
            <span className="text-pink-400 text-xs font-bold uppercase tracking-widest">Digital Commerce & D2C Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            CONVERSION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 italic">
              ENGINEERING
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Stop guessing what your customers want. We build AI-native storefronts 
            that predict purchase intent, automate visual discovery, and 
            scale personalized shopping experiences for millions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-pink-600 hover:bg-pink-700 rounded-2xl font-bold transition-all shadow-xl shadow-pink-500/20 flex items-center justify-center gap-2 text-white">
              Optimize My Storefront <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Hyper-Personalization", 
              desc: "Dynamic pricing and product recommendation engines that adapt in real-time based on clickstream data and historical intent.",
              icon: <Sparkles className="w-8 h-8 text-pink-400" /> 
            },
            { 
              title: "AI Visual Discovery", 
              desc: "Building 'Shop the Look' features using computer vision that allows users to find products via image uploads or social screenshots.",
              icon: <Camera className="w-8 h-8 text-pink-400" /> 
            },
            { 
              title: "Demand Forecasting", 
              desc: "Predictive inventory models that analyze social trends and seasonality to prevent stockouts and reduce warehouse waste.",
              icon: <BarChart3 className="w-8 h-8 text-pink-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-pink-950/5 border border-white/5 hover:border-pink-500/30 transition-all">
              <div className="mb-6 p-4 bg-pink-500/10 rounded-2xl inline-block group-hover:bg-pink-600 transition-all">
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
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Predictive <br/>Shopping</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Modern D2C is about more than just a cart. We implement 
              **Agentic Commerce**—where AI agents don't just recommend products, 
              they manage loyalty, handle complex returns, and provide 
              concierge-level support through every touchpoint.
            </p>

            <div className="space-y-4 mt-8">
               <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <MousePointer2 className="text-pink-400 w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Abandonment Recovery AI</span>
               </div>
               <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <Users className="text-pink-400 w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">LTV Prediction Models</span>
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-pink-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#080205] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-pink-400" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Intent_Analyzer_v2</span>
                  </div>
                  <div className="text-[10px] text-pink-400 animate-pulse">LIVE_TRAFFIC</div>
               </div>

               <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/10">
                     <p className="text-[10px] text-gray-500 uppercase mb-2 italic text-center">Propensity to Purchase</p>
                     <div className="text-3xl font-black text-center text-pink-400">88.4%</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[9px] text-gray-500 uppercase">Avg Order Val</p>
                        <p className="text-lg font-bold">+$42.20</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[9px] text-gray-500 uppercase">A/B Status</p>
                        <p className="text-lg font-bold text-emerald-400">WINNING</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-white/5 rounded-xl text-[10px] text-gray-400">
                  <p className="mb-1 text-pink-300">AUTO_ACTION:</p>
                  <p>Applied "Welcome-Back" 15% discount code to Session_8812. Target: Cart size &gt; $100.</p>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-pink-900/40 to-purple-950/40 border border-pink-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Dominate The <br/>Marketplace</h2>
            <p className="text-pink-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our growth engineers at DLF Cyber City are ready to build the 
              storefront of the future.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-pink-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                UPGRADE MY COMMERCE
              </button>
              <div className="text-pink-400 font-mono text-sm tracking-widest uppercase">E-Commerce Lab: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default RetailD2CPage;