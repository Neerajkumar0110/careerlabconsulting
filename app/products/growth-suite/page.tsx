import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import SuccessStories from '@/components/sections/SuccessStories';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';

const GrowthSuitePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white">
      <Navbar />

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 border border-blue-500/30 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wide">
            Scale Your Revenue Faster
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter">
            GROWTH <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">SUITE</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-xl leading-relaxed mb-10">
            Advanced AI-driven marketing and sales automation tools designed to 
            hyper-scale your business outreach and conversion rates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-2xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              Start Free Trial
            </button>
            <button className="px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1600" 
              alt="Growth Analytics" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      <div className="bg-white/[0.01] py-20">
        <FeatureGrid />
      </div>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">AI-Powered Lead Generation</h2>
            <p className="text-gray-400 text-lg mb-8 italic">
              "Traditional sales are dead. Autonomous growth is the future."
            </p>
            <div className="space-y-6">
              {[
                { t: "Predictive Lead Scoring", d: "Identify high-value prospects before they even visit your site." },
                { t: "Automated Outreach", d: "Hyper-personalized email and LinkedIn sequences that feel human." },
                { t: "Growth Dashboard", d: "Real-time tracking of every dollar spent and every lead earned." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold">0{i+1}</div>
                  <div>
                    <h4 className="font-semibold text-xl mb-1">{item.t}</h4>
                    <p className="text-gray-500">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <img src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600" className="rounded-2xl mt-8" alt="Team" />
             <img src="https://images.pexels.com/photos/5900226/pexels-photo-5900226.jpeg?auto=compress&cs=tinysrgb&w=600" className="rounded-2xl" alt="Growth Graph" />
          </div>
        </div>
      </section>

      <ExecutionFlow />

      <SuccessStories />

      <section className="py-32 px-6 bg-gradient-to-r from-blue-900/40 to-emerald-900/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 italic text-white/90">
            Stop guessing. <br /> Start growing.
          </h2>
          <button className="bg-white text-black px-12 py-5 rounded-full font-black text-xl hover:bg-gray-200 transition-all shadow-xl">
            GET THE SUITE
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default GrowthSuitePage;