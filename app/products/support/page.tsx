import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import SuccessStories from '@/components/sections/SuccessStories';
import { LifeBuoy, BookOpen, MessageSquare, ShieldCheck, Zap, Headphones } from 'lucide-react';

const SupportKnowledgePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <LifeBuoy className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">AI Helpdesk & Wiki</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            SUPPORT & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600">
              KNOWLEDGE
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Transform your customer experience with autonomous resolution engines. 
            Deploy self-learning wikis and AI helpdesks that resolve 80% of inquiries 
            without human intervention.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20">
              Launch AI Helpdesk
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              See Resolution Demo
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Autonomous Helpdesk", 
              desc: "Neural-powered agents that resolve complex tickets by cross-referencing your entire product ecosystem.",
              icon: <MessageSquare className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Self-Learning Wiki", 
              desc: "A dynamic knowledge base that automatically updates itself as your product and documentation evolve.",
              icon: <BookOpen className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Real-time Translation", 
              desc: "Provide world-class support in 100+ languages with native-level fluency and context awareness.",
              icon: <Headphones className="w-8 h-8 text-blue-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-blue-900/5 border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl inline-block group-hover:bg-blue-600 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 group">
            <img 
              src="https://img.freepik.com/free-photo/man-working-eco-friendly-wind-power-project-with-wind-turbines_23-2148847767.jpg" 
              alt="Knowledge Navigation" 
              className="w-full h-auto opacity-70 group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
          </div>
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">Zero-Latency Resolution</h2>
            <div className="space-y-8">
              {[
                { t: "Instant Triage", d: "AI automatically categorizes and prioritizes tickets based on urgency and sentiment.", i: <Zap className="text-blue-400" /> },
                { t: "Verified Accuracy", d: "Every AI response is cross-checked against your internal security protocols.", i: <ShieldCheck className="text-blue-400" /> },
                { t: "Human-in-the-Loop", d: "Seamlessly transition complex cases to human experts with full AI-generated summaries.", i: <Headphones className="text-blue-400" /> }
              ].map((point, idx) => (
                <div key={idx} className="flex gap-5">
                  <div className="mt-1">{point.i}</div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{point.t}</h4>
                    <p className="text-gray-400">{point.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeatureGrid />
      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">SOLVE AT SCALE</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our support architects at DLF Cyber City are ready to deploy your autonomous helpdesk.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                CONTACT HUB
              </button>
              <div className="flex items-center gap-3 text-blue-400 font-mono text-sm tracking-widest">
                <Headphones className="w-4 h-4" />
                <span>+91 870023 6923</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SupportKnowledgePage;