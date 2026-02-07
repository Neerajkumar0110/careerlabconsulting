'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, ShieldCheck, Globe, Code, 
  Hash, MessageSquare, Zap, Target, Award 
} from 'lucide-react';
import Image from 'next/image';

const OWNER_PHONE = "918700236923";

export default function StudentProfile() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const handleBack = () => router.back();

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I'm viewing profile ID: ${id}. I'd like to know more about this candidate.`);
    window.open(`https://wa.me/${OWNER_PHONE}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 lg:p-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <button 
        onClick={handleBack}
        className="mb-12 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold uppercase tracking-widest text-xs">Back to Dashboard</span>
      </button>

      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="relative w-64 h-64 mb-8">
              <div className="absolute inset-0 bg-blue-600/20 blur-2xl rounded-full animate-pulse" />
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl">
                <Image 
                  src={`https://i.pravatar.cc/400?u=${id}`} 
                  alt="Student Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-blue-600 p-4 rounded-2xl border-8 border-[#020617]">
                <Zap size={24} className="fill-white text-white" />
              </div>
            </div>

            <div className="text-center lg:text-left w-full">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <h1 className="text-4xl font-black tracking-tighter uppercase">Candidate</h1>
                <ShieldCheck className="text-blue-500" size={32} />
              </div>
              <p className="text-blue-400 font-bold tracking-[0.3em] uppercase text-sm mb-6">ID: {id}</p>
              
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {['Verified', 'Elite-Tier', 'Active Node'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Uptime", val: "99.9%", icon: Globe, color: "text-blue-400" },
                { label: "Stability", val: "94.2%", icon: Target, color: "text-emerald-400" },
                { label: "Rank", val: "#15", icon: Award, color: "text-purple-400" },
                { label: "Batch", val: "24-25", icon: Hash, color: "text-orange-400" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] text-center backdrop-blur-sm">
                  <stat.icon size={24} className={`${stat.color} mx-auto mb-3`} />
                  <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">{stat.label}</p>
                  <p className="text-xl font-black">{stat.val}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[3rem] backdrop-blur-md">
              <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                <Code className="text-blue-500" /> Technical Capabilities
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase mb-4 tracking-widest">Specialization</p>
                  <p className="text-lg font-bold text-white leading-relaxed">
                    Advanced LLM Orchestration & Agentic Systems. Expert in deploying high-concurrency neural architectures.
                  </p>
                </div>
                <div className="space-y-4">
                   {['Neural Ops', 'Vector DBs', 'RAG Pipelines'].map(skill => (
                     <div key={skill} className="w-full h-12 bg-white/5 rounded-xl border border-white/5 flex items-center px-4 justify-between">
                       <span className="text-xs font-bold uppercase tracking-wider">{skill}</span>
                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                     </div>
                   ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleWhatsApp}
              className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.3)] group"
            >
              <MessageSquare size={24} /> 
              Initiate Direct Communication
              <Zap size={20} className="group-hover:animate-bounce" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}