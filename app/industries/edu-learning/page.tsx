import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  BrainCircuit, 
  GraduationCap, 
  BookOpen, 
  LineChart, 
  Zap, 
  Target, 
  ArrowRight,
  Users,
  Mic2
} from 'lucide-react';

const EdTechAIPage = () => {
  const eduMetrics = [
    { label: "Retention Rate", value: "+42%", detail: "Adaptive Spaced Repetition" },
    { label: "Engagement", value: "3.5x", detail: "Gamified Learning Paths" },
    { label: "Completion Time", value: "-30%", detail: "Personalized Skill-Gap Focus" },
    { label: "Student ROI", value: "94%", detail: "Skill-to-Market Alignment" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md">
            <BrainCircuit className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-200 text-xs font-bold uppercase tracking-widest italic">Adaptive Learning & Pedagogy AI</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">
            NEURAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-cyan-400 to-blue-600 italic">
              ACADEMY
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Education is no longer one-size-fits-all. We build the **Learning Operating Systems** that adapt in real-time to a student's cognitive load, emotional state, and 
            knowledge gaps, delivering a truly personalized 1-on-1 tutoring experience at scale.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {eduMetrics.map((m, i) => (
              <div key={i} className="p-6 bg-emerald-950/10 border border-emerald-900/20 rounded-3xl text-left hover:border-cyan-500/30 transition-all">
                <p className="text-3xl font-black mb-1 text-white">{m.value}</p>
                <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">{m.label}</p>
                <p className="text-[9px] text-gray-500 italic mt-2">{m.detail}</p>
              </div>
            ))}
          </div>
          
          <button className="px-12 py-6 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-black transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-3 mx-auto text-white uppercase tracking-tighter">
            Build My Learning Stack <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Adaptive Knowledge Graphs", 
              desc: "Mapping subjects as a web of interconnected concepts. AI identifies exactly which 'primitive' a student is missing before advancing.",
              icon: <BookOpen className="w-8 h-8 text-cyan-400" /> 
            },
            { 
              title: "Predictive Interventions", 
              desc: "Identifying students at risk of dropping out weeks before it happens through behavioral pattern recognition and sentiment analysis.",
              icon: <LineChart className="w-8 h-8 text-cyan-400" /> 
            },
            { 
              title: "Generative Tutors", 
              desc: "LLM-based agents that act as Socratic mentors, guiding students to answers rather than providing them, available 24/7.",
              icon: <Mic2 className="w-8 h-8 text-cyan-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 hover:border-emerald-500/30 transition-all group">
              <div className="mb-6 p-4 bg-emerald-500/5 rounded-xl inline-block group-hover:bg-emerald-600 group-hover:text-black transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative">
            <div className="absolute -inset-10 bg-cyan-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#01080a] border border-cyan-500/20 rounded-[3rem] p-10 shadow-2xl font-mono overflow-hidden">
               <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Target className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-black">COGNITIVE_MAP_v4.2</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold">STATE: FLOW_MODE</div>
               </div>

               <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[10px] text-gray-500 uppercase mb-4 italic">Personalized Concept Mastery Tree</p>
                    
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                        <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Current IQ (Inquiry Quotient)</p>
                        <p className="text-xl font-black text-emerald-400">88.4</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Concept Retention</p>
                        <p className="text-xl font-black italic">HIGH</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-cyan-950/20 rounded-xl border border-dashed border-cyan-500/30 text-[9px] text-cyan-200">
                  <p className="font-bold uppercase mb-1 tracking-widest text-cyan-400">TUTOR_CORE_LOG:</p>
                  <p className="italic">"Student struggling with 'Recursive Functions'. Triggering visual bridge to 'Fractal Geometry'. Engagement resurging."</p>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight text-cyan-100">Quantum <br/>Retention</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We leverage the science of learning to engineer higher outcomes. By 
              using **Spaced-Repetition Algorithms** and **Cognitive Load 
              Modeling**, our AI ensures that every minute spent learning is 
              optimized for long-term neurological encoding.
            </p>

            <div className="space-y-4">
               {[
                 { icon: <Users className="text-emerald-500" />, text: "Collaborative Social Learning AI" },
                 { icon: <GraduationCap className="text-emerald-500" />, text: "Automated Curriculum Alignment (Global Standards)" },
                 { icon: <Zap className="text-emerald-500" />, text: "Real-time Skill Certification" }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/20 transition-all">
                    {item.icon}
                    <span className="text-xs font-bold uppercase tracking-widest">{item.text}</span>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-emerald-950/40 to-black border border-emerald-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Ignite The <br/>Potential</h2>
            <p className="text-emerald-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our learning scientists and AI architects at DLF Cyber City are 
              reimagining the future of human development.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-emerald-950 px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase">
                Initialize Campus AI
              </button>
              <div className="text-emerald-500 font-mono text-sm tracking-widest uppercase italic">Education Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EdTechAIPage;