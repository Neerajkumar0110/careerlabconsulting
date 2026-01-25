import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  History, 
  Target, 
  Cpu, 
  Globe2, 
  Users2, 
  ShieldCheck, 
  Network,
  ArrowRight,
  Flame,
  Award,
  Zap
} from 'lucide-react';

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(99,102,241,0.08)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 backdrop-blur-xl">
              <Flame className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200">The Intelligence Renaissance</span>
            </div>

            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-12">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-indigo-400 to-blue-600 italic">
                The Future
              </span>
            </h1>

            <p className="max-w-3xl text-slate-400 text-lg md:text-2xl leading-relaxed mb-12 font-light">
              We aren't just an AI agency. We are a **Neural Laboratory** dedicated to closing the gap between human intent and machine execution. Based in the heart of Gurugram's tech corridor, we architect the systems that define the next decade.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-none">
              Intelligence <br/><span className="text-indigo-500">Unchained.</span>
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                Founded in 2024, our mission was simple: eliminate the friction of legacy software. We believe that AI should not be a "plugin," but the **fundamental core** of every modern enterprise.
              </p>
              <p>
                From our Research Hub in **DLF Cyber City**, we've transitioned from small-scale LLM experiments to deploying autonomous agents for Fortune 500s and solo-founders alike.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <p className="text-4xl font-black text-white">500M+</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Tokens Processed Daily</p>
              </div>
              <div>
                <p className="text-4xl font-black text-white">24/7</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Autonomous Monitoring</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-indigo-500/10 blur-[120px] rounded-full"></div>
            
            <div className="relative border border-white/10 bg-slate-950/50 p-8 rounded-[3rem] backdrop-blur-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400"><Target size={24}/></div>
                <h4 className="text-xl font-bold uppercase italic">The North Star</h4>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed italic mb-8">
                "To empower the human species by offloading cognitive drudgery to perfectly aligned autonomous systems."
              </p>
              <div className="flex items-center gap-2 text-[10px] font-bold text-indigo-300 uppercase tracking-widest">
                <ShieldCheck size={14} className="text-indigo-500" /> Ethics & Alignment Verified
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h3 className="text-2xl font-black uppercase tracking-[0.4em] text-slate-500 italic">Our Core Parameters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: "Radical Transparency", 
                desc: "We open the 'black box'. Our clients understand every weight and every bias in the models we build.",
                icon: <Cpu className="w-10 h-10 text-indigo-500" />
              },
              { 
                title: "Performance First", 
                desc: "If it's not sub-100ms latency, it's not production-ready. We optimize for high-velocity real-world use.",
                icon: <Zap className="w-10 h-10 text-indigo-500" />
              },
              { 
                title: "Ethical Autonomy", 
                desc: "We build systems that respect human agency, data sovereignty, and universal safety standards.",
                icon: <Network className="w-10 h-10 text-indigo-500" />
              }
            ].map((value, i) => (
              <div key={i} className="group">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-500">{value.icon}</div>
                <h4 className="text-2xl font-bold mb-4 italic uppercase">{value.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">Global <br/>Nodes.</h2>
            <p className="max-w-md text-slate-500 text-sm italic">Our distributed team of researchers, engineers, and designers operate across three major time zones to ensure perpetual development cycles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { city: "Gurugram", role: "HQ & Neural Research", coords: "28.4595° N" },
               { city: "New York", role: "Product & Strategy", coords: "40.7128° N" },
               { city: "Bangalore", role: "Core Systems Engineering", coords: "12.9716° N" }
             ].map((node, i) => (
               <div key={i} className="p-8 border border-white/5 bg-slate-900/20 rounded-3xl hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center gap-2 mb-4 text-indigo-500">
                    <Globe2 size={16} />
                    <span className="text-[10px] font-mono tracking-widest">{node.coords}</span>
                  </div>
                  <h4 className="text-2xl font-black uppercase mb-1">{node.city}</h4>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{node.role}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around items-center gap-12">
           <div className="flex items-center gap-2 font-black text-xl"><Award className="text-indigo-500"/> AI_FORBES_30</div>
           <div className="flex items-center gap-2 font-black text-xl"><History className="text-indigo-500"/> TECH_CRUNCH_INIT</div>
           <div className="flex items-center gap-2 font-black text-xl"><Users2 className="text-indigo-500"/> GITHUB_FOUNDERS</div>
           <div className="flex items-center gap-2 font-black text-xl"><ShieldCheck className="text-indigo-500"/> ISO_CERT_9001</div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-8xl font-black italic tracking-tighter uppercase leading-tight mb-12">Join The <br/><span className="text-indigo-500">Movement.</span></h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            Whether you're looking for a partner or a career in the neural frontier, we're ready to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-white text-black px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 italic uppercase">
              Work With Us <ArrowRight size={20}/>
            </button>
            <button className="bg-white/5 border border-white/10 px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/10 transition-all italic uppercase">
              View Careers
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;