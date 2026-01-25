import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Trophy, 
  Users, 
  Heart, 
  Zap, 
  Gift, 
  PieChart, 
  ArrowRight,
  Target,
  Sparkles
} from 'lucide-react';

const RetailLoyaltyPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 backdrop-blur-md">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Retention & LTV Maximization Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            INFINITE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-yellow-700 italic">
              RETENTION
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Turn one-time shoppers into lifelong brand advocates. We build AI loyalty 
            ecosystems that predict churn before it happens and deliver hyper-individualized 
            rewards that resonate on an emotional level.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-amber-600 hover:bg-amber-700 rounded-2xl font-bold transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 text-white">
              Revolutionize Loyalty <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Churn Prediction", 
              desc: "Machine learning models that identify 'at-risk' customers by analyzing subtle shifts in frequency, sentiment, and engagement patterns.",
              icon: <Target className="w-8 h-8 text-amber-400" /> 
            },
            { 
              title: "Behavioral Incentives", 
              desc: "Dynamic reward engines that skip generic points in favor of rewards tailored to a user's specific lifestyle and buying habits.",
              icon: <Gift className="w-8 h-8 text-amber-400" /> 
            },
            { 
              title: "Sentiment Orchestration", 
              desc: "Using NLP to monitor social and support interactions, automatically triggering 'surprise & delight' campaigns for top-tier fans.",
              icon: <Heart className="w-8 h-8 text-amber-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-amber-950/5 border border-white/5 hover:border-amber-500/30 transition-all">
              <div className="mb-6 p-4 bg-amber-500/10 rounded-2xl inline-block group-hover:bg-amber-600 transition-all">
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
            <div className="absolute -inset-10 bg-amber-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#0a0701] border border-amber-500/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">LTV_Propensity_Model</span>
                  </div>
                  <div className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Processing...</div>
               </div>

               <div className="space-y-8">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[9px] text-gray-500 uppercase mb-4">Customer Segment: "Platinum-Active"</p>
                     <div className="flex items-end justify-between">
                        <div>
                           <p className="text-[10px] text-gray-400">Predicted CLV</p>
                           <p className="text-2xl font-bold text-amber-400">$12,450</p>
                        </div>
                        <PieChart className="w-8 h-8 text-amber-500/40" />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-center">
                        <p className="text-[8px] text-gray-500 uppercase">Retention Score</p>
                        <p className="text-xl font-bold">98.2%</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <p className="text-[8px] text-gray-500 uppercase">Referral Index</p>
                        <p className="text-xl font-bold text-emerald-400">High</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-amber-500/10 rounded-xl border border-dashed border-amber-500/30">
                  <p className="text-[10px] text-amber-200 italic">
                    AGENT_LOG: "Triggering personalized early-access invite for upcoming product drop. Probability of conversion: 94.1%"
                  </p>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Emotional <br/>Intelligence</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We move beyond the "Points-for-Purchase" model. Our AI architectures 
              analyze the psychological drivers behind loyalty, enabling brands to 
              deliver the right incentive at the exact micro-moment it’s most needed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-amber-500/30 transition-all">
                  <Users className="text-amber-400 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Cohort Analysis AI</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-amber-500/30 transition-all">
                  <Zap className="text-amber-400 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Real-time Attribution</span>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-amber-950/40 to-black border border-amber-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Own The <br/>Customer Link</h2>
            <p className="text-amber-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our retention engineers at DLF Cyber City are ready to build the 
              most sophisticated loyalty infrastructure on the market.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-amber-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START LOYALTY BUILD
              </button>
              <div className="text-amber-400 font-mono text-sm tracking-widest uppercase">Retention Lab: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default RetailLoyaltyPage;