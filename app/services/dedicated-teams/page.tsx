"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Users2, 
  Workflow, 
  ShieldCheck, 
  Settings, 
  Plus, 
  ArrowRight,
  Handshake,
  LayoutGrid,
  Zap,
  Briefcase
} from 'lucide-react';

const DedicatedTeamsPage = () => {
  const teamModels = [
    {
      title: "Full-Stack Squads",
      desc: "Complete autonomous teams including Frontend, Backend, QA, and a Project Manager. Ready to ship features from day one.",
      icon: <LayoutGrid />,
      img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Specialized AI/DevOps Units",
      desc: "Deep-tech experts focus on specific complex domains like infrastructure automation or machine learning pipelines.",
      icon: <Zap />,
      img: "https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(59,130,246,0.1)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-xl">
              <Users2 size={14} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">Scalable Workforce</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Your Team, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 italic font-black text-shadow-sm">Our Talent.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Stop recruiting, start building. Hum aapko dedicated software engineers provide karte hain jo aapke culture aur workflows mein seamlessly integrate ho jate hain.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-blue-600/20"
            >
              Assemble My Team <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full"></div>
            <div className="relative p-8 bg-slate-900/50 border border-white/5 rounded-[3rem] backdrop-blur-3xl overflow-hidden">
               <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
                  <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center font-black">HQ</div>
                  <Plus size={16} className="text-slate-500" />
                  <div className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center font-black border border-white/10 italic text-blue-400 font-serif">A</div>
                  <span className="ml-auto text-[10px] font-mono text-blue-500 uppercase tracking-widest">Integration_Active</span>
               </div>
               
               <div className="space-y-4">
                  {[
                    { role: "Team Lead", status: "Active" },
                    { role: "SR. Engineer", status: "In Sprint" },
                    { role: "QA Expert", status: "Monitoring" }
                  ].map((member, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                       <span className="text-xs font-bold uppercase tracking-tight">{member.role}</span>
                       <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-black border border-emerald-500/20">{member.status}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-20 italic">The Onboarding Sprint</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { step: "01", label: "Talent Match", desc: "Selecting experts based on your tech stack and culture." },
              { step: "02", label: "Deep Sync", desc: "Aligning on tools (Slack, Jira) and sprint cycles." },
              { step: "03", label: "Launch", desc: "Team starts delivering value within 7-14 days." },
              { step: "04", label: "Scale", desc: "Easily add or remove resources as per project load." }
            ].map((item, i) => (
              <div key={i} className="relative space-y-4">
                <span className="text-5xl font-black text-white/5 italic absolute -top-4 -left-2">{item.step}</span>
                <h4 className="text-xl font-black italic uppercase relative z-10">{item.label}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamModels.map((model, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 hover:border-blue-500/30 transition-all duration-500">
              <img src={model.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl w-fit text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <div className="w-fit">{model.icon}</div>
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{model.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{model.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400">
                  <Handshake size={14} /> Long-term Commitment
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-blue-600/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: "Direct Control", icon: <Settings />, text: "You manage the team directly or through us." },
             { title: "IP Protection", icon: <ShieldCheck />, text: "Full ownership of every line of code written." },
             { title: "Zero Hiring Overhead", icon: <Briefcase />, text: "We handle payroll, benefits, and office space." }
           ].map((box, i) => (
             <div key={i} className="p-8 border border-white/5 rounded-3xl bg-slate-950/40">
                <div className="text-blue-500 mb-6">{box.icon}</div>
                <h5 className="font-black uppercase italic mb-2 tracking-tight">{box.title}</h5>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{box.text}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-blue-600 to-indigo-900 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12"><Workflow size={300} /></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              Your Extension <br /> Is <span className="text-blue-200">Waiting.</span>
            </h2>
            <p className="text-blue-100 text-lg mb-12 max-w-xl mx-auto font-light">Skip the 3-month hiring cycle. Get a high-performing dedicated team ready to ship code next week.</p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl"
            >
              Request Team Profile
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default DedicatedTeamsPage;