import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import FeatureGrid from '@/components/sections/FeatureGrid';

const ExecutionSuitePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(50%_50%_at_50%_50%,#1e3a8a_0%,transparent_100%)] opacity-20 -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
            High-Performance Delivery
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
            EXECUTION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-500">
              WITHOUT LIMITS
            </span>
          </h1>
          
          <p className="max-w-2xl text-gray-400 text-lg md:text-xl mb-12 leading-relaxed">
            Turn vision into reality with our autonomous execution engine. 
            Automate task deployment, quality assurance, and delivery cycles 
            with 99.9% accuracy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="px-12 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:scale-105">
              DEPLOY SUITE
            </button>
            <button className="px-12 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold backdrop-blur-xl transition-all">
              VIEW CASE STUDIES
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full"></div>
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#03081a]">
            <img 
              src="https://images.pexels.com/photos/3182762/pexels-photo-3182762.jpeg?auto=compress&cs=tinysrgb&w=1600" 
              alt="High Speed Execution" 
              className="w-full h-auto opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Rapid Prototyping", 
              desc: "Go from concept to MVP in days, not months, using our generative execution blocks.",
              img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            { 
              title: "Quality Guardrails", 
              desc: "Real-time AI monitoring ensures every output meets enterprise-grade standards.",
              img: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=400"
            },
            { 
              title: "Adaptive Scaling", 
              desc: "Automatically adjust resources based on project complexity and deadline pressure.",
              img: "https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=400"
            }
          ].map((card, i) => (
            <div key={i} className="group bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500">
              <div className="h-48 overflow-hidden">
                <img src={card.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={card.title} />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SuccessStories />

      <div className="border-t border-white/5">
        <FeatureGrid />
      </div>

      <Footer />
    </main>
  );
};

export default ExecutionSuitePage;