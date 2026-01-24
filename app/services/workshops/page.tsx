import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Users, 
  Presentation, 
  Terminal, 
  Lightbulb, 
  Calendar, 
  CheckCircle2, 
  ArrowRight,
  MonitorPlay,
  Award
} from 'lucide-react';

const AIWorkshopsPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#1e3a8a_0%,transparent_70%)] opacity-10 -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Presentation className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Knowledge Transfer Series</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            AI MASTERY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 italic">
              WORKSHOPS
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Bridging the gap between AI hype and enterprise reality. We provide high-impact, 
            hands-on workshops for executives and engineers to build, deploy, and 
            govern autonomous systems.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
              Book Corporate Session <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              View Curriculum
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Executive AI Strategy", 
                desc: "High-level sessions for C-Suite on ROI modeling, risk management, and market positioning.",
                icon: <Lightbulb className="w-8 h-8 text-blue-400" /> 
              },
              { 
                title: "Prompt Engineering Lab", 
                desc: "Technical deep-dives into LLM orchestration, chain-of-thought prompting, and agent design.",
                icon: <Terminal className="w-8 h-8 text-blue-400" /> 
              },
              { 
                title: "AI Governance & Ethics", 
                desc: "Frameworks for building unbiased, compliant, and secure autonomous infrastructure.",
                icon: <Award className="w-8 h-8 text-blue-400" /> 
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
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">Hands-on <br/>Execution</h2>
            <p className="text-gray-400 text-lg mb-10">
              Our workshops aren't just slide decks. Participants build real prototypes 
              using our proprietary **GenAI Site Builder** and internal automation tools.
            </p>
            
            <div className="space-y-4">
              {[
                { t: "Live Build Sessions", d: "Deploy an AI agent during the workshop." },
                { t: "Custom Use-Case Discovery", d: "We solve your specific business bottlenecks." },
                { t: "Post-Workshop Support", d: "30 days of architectural advisory included." }
              ].map((point, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="text-blue-500 shrink-0" />
                  <div>
                    <h4 className="font-bold">{point.t}</h4>
                    <p className="text-sm text-gray-500">{point.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-1 overflow-hidden group">
              <img 
                src="https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&cs=tinysrgb&w=1260" 
                alt="Corporate AI Training" 
                className="rounded-[2.9rem] opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div>
                   <MonitorPlay className="w-12 h-12 text-blue-400 mb-4" />
                   <div className="font-mono text-xs tracking-widest text-blue-400">ACTIVE_SESSION_PREVIEW</div>
                </div>
                <div className="bg-blue-600 px-4 py-2 rounded-full font-bold text-xs uppercase">
                  Live in Gurugram
                </div>
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
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">EMPOWER YOUR TEAM</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our master instructors at DLF Cyber City are ready to elevate 
              your organization's technical capability.
            </p>
            <div className="flex flex-col items-center gap-8">
              <div className="flex gap-4">
                <button className="bg-white text-blue-950 px-12 py-5 rounded-full font-black text-xl hover:scale-110 transition-all shadow-2xl">
                  REQUEST QUOTE
                </button>
                <div className="hidden md:flex flex-col items-start justify-center text-left">
                   <div className="flex items-center gap-2 text-blue-400 font-mono text-sm">
                      <Calendar className="w-4 h-4" /> Next Hub Opening: Feb 2026
                   </div>
                   <div className="text-gray-500 text-xs uppercase tracking-tighter font-bold">Limited Slots Remaining</div>
                </div>
              </div>
              <div className="text-blue-400 font-mono text-sm tracking-widest">+91 870023 6923</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AIWorkshopsPage;