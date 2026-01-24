import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  TrendingUp, 
  Coins, 
  BarChart3, 
  PieChart, 
  Calculator, 
  ArrowRight, 
  Zap, 
  Clock, 
  DollarSign 
} from 'lucide-react';

const ROIModelingPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md">
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Financial Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            ROI & ECONOMIC <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-600 italic">
              MODELING
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            AI is an investment, not an expense. We build data-driven economic models to 
            forecast your cost reduction, revenue lift, and payback periods with 
            mathematical precision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2">
              Calculate Potential ROI <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              Sample Case Study
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "OPEX Reduction", 
              desc: "Identify labor-intensive processes where autonomous agents can reduce operating costs by up to 60%.",
              icon: <Coins className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "Yield Optimization", 
              desc: "Model revenue growth through AI-enhanced lead scoring, pricing, and personalized commerce.",
              icon: <TrendingUp className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "TCO Analysis", 
              desc: "Complete Total Cost of Ownership breakdown including compute, talent, and maintenance overheads.",
              icon: <PieChart className="w-8 h-8 text-emerald-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-emerald-900/5 border border-white/5 hover:border-emerald-500/30 transition-all">
              <div className="mb-6 p-4 bg-emerald-500/10 rounded-2xl inline-block group-hover:bg-emerald-600 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative">
            <div className="absolute -inset-10 bg-emerald-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                   <span className="font-mono text-sm text-gray-400">ECONOMIC_SIMULATOR_V.2</span>
                </div>
                <BarChart3 className="text-emerald-500 w-6 h-6" />
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <p className="text-xs text-emerald-400 uppercase font-bold mb-2">Projected Savings</p>
                  <p className="text-3xl font-black italic">$2.4M<span className="text-sm font-normal text-gray-500">/yr</span></p>
                </div>
                <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                  <p className="text-xs text-blue-400 uppercase font-bold mb-2">Efficiency Gain</p>
                  <p className="text-3xl font-black italic">420%</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono uppercase text-gray-500">
                    <span>Payback Period</span>
                    <span className="text-emerald-400">4.2 Months</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex justify-around items-center pt-6 opacity-40">
                  <DollarSign className="w-8 h-8" />
                  <ArrowRight className="w-4 h-4" />
                  <Zap className="w-8 h-8" />
                  <ArrowRight className="w-4 h-4" />
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter leading-tight">Quantifiable <br/>Value Engineering</h2>
            <div className="space-y-8">
              {[
                { t: "Predictive P&L Impact", d: "Simulate how AI deployment ripples through your financial statements.", i: <BarChart3 className="text-emerald-400" /> },
                { t: "Scalability Economics", d: "Calculate marginal costs of scaling autonomous workforce vs human hiring.", i: <Zap className="text-emerald-400" /> },
                { t: "Risk-Adjusted Yield", d: "Conservative modeling that accounts for market volatility and tech drift.", i: <Clock className="text-emerald-400" /> }
              ].map((point, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="mt-1 p-3 rounded-xl bg-white/5 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                    {point.i}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{point.t}</h4>
                    <p className="text-gray-400 leading-relaxed">{point.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-emerald-900/40 to-indigo-950/40 border border-emerald-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">VALIDATE THE VALUE</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our economic architects in Gurugram are ready to build your custom 
              AI financial roadmap.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-emerald-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                GET THE MODEL
              </button>
              <div className="text-emerald-400 font-mono text-sm tracking-widest">+91 870023 6923</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ROIModelingPage;