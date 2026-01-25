"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Code2, 
  Terminal, 
  ArrowRight, 
  Cpu, 
  Globe, 
  Award,
  BarChart
} from 'lucide-react';

const TrainingPage = () => {
  type Course = {
    title: string;
    desc: string;
    icon: React.ElementType;
    img: string;
  };

  const courses: Course[] = [
    {
      title: "Web3 & Blockchain Mastery",
      desc: "Engineering teams ko Solidity, Rust, aur decentralized architecture mein expert banana.",
      icon: Code2,
      img: "https://images.pexels.com/photos/7988116/pexels-photo-7988116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "AI & ML Implementation",
      desc: "Enterprises ke liye custom AI workshops: LLMs se lekar computer vision workflows tak.",
      icon: Cpu,
      img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(99,102,241,0.1)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 backdrop-blur-xl">
              <GraduationCap size={14} className="text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200">Corporate Upskilling</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Future-Proof <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 italic font-black">Your Team.</span>
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-slate-400 text-lg font-light leading-relaxed mb-10">
              Technology faster move kar rahi hai. Hum aapke workforce ko latest stacks (AI, Web3, Cloud) mein train karte hain taaki aapka business hamesha lead kare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-600/20"
              >
                Book a Workshop <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full"></div>
            <div className="relative p-8 bg-slate-950 border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-3xl">
               <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest">Skill_Progression_v2.0</span>
                  <Award size={18} className="text-indigo-500" />
               </div>
               <div className="space-y-6">
                  {[
                    { label: "Core Engineering", progress: "100%", color: "bg-emerald-500" },
                    { label: "AI Integration", progress: "85%", color: "bg-indigo-500" },
                    { label: "Blockchain Architecture", progress: "60%", color: "bg-purple-500" }
                  ].map((skill, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
                          <span>{skill.label}</span>
                          <span>{skill.progress}</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${skill.color} rounded-full`} style={{ width: skill.progress }}></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-20 italic">Curriculum Methodology</h2>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
               { label: "Live Workshops", icon: <Users />, val: "1-on-1" },
               { label: "Curriculum", icon: <BookOpen />, val: "Custom" },
               { label: "Global Standards", icon: <Globe />, val: "ISO-Ready" },
               { label: "ROI Analysis", icon: <BarChart />, val: "Measurable" }
             ].map((item, i) => (
               <div key={i} className="text-center group p-6 hover:bg-white/[0.02] rounded-3xl transition-all">
                  <div className="text-indigo-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="text-lg font-black italic mb-1 uppercase">{item.val}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 hover:border-indigo-500/30 transition-all">
              <img src={course.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative p-12 md:p-16 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent">
                <div className="mb-6 p-4 bg-indigo-500/10 rounded-2xl w-fit text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <course.icon size={30} />
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4">{course.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{course.desc}</p>
                <div className="flex items-center gap-3">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(j => <div key={j} className="h-6 w-6 rounded-full border border-slate-900 bg-slate-700"></div>)}
                   </div>
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">+500 Engineers Trained</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-indigo-600 text-center relative overflow-hidden shadow-2xl shadow-indigo-600/20">
          <div className="absolute top-0 right-0 p-12 opacity-10"><Terminal size={300} /></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">Invest in <br /> Your <span className="text-indigo-200">Talent.</span></h2>
            <p className="text-indigo-100 text-lg mb-12 max-w-xl mx-auto font-light">Technology change hogi, par ek skilled team hamesha valuable rahegi. Let's build your internal experts.</p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all"
            >
              Custom Training Quote
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TrainingPage;