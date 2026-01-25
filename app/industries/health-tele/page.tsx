import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Stethoscope, 
  Video, 
  ClipboardList, 
  Brain, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  HeartPulse,
  Microscope
} from 'lucide-react';

const HealthTeleIndustryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-md">
            <Stethoscope className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Clinical AI & Remote Care Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            REMOTE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-500 italic">
              DIAGNOSTICS
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Bridging the gap between clinic and home. We build HIPAA-compliant 
            AI systems for remote patient monitoring, automated clinical documentation, 
            and real-time diagnostic assistance for the modern practitioner.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-cyan-600 hover:bg-cyan-700 rounded-2xl font-bold transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 text-white">
              Launch Health Solution <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "AI Scribe & EHR", 
              desc: "Automated medical transcription that extracts symptoms and prescriptions from doctor-patient audio to update EHRs instantly.",
              icon: <ClipboardList className="w-8 h-8 text-cyan-400" /> 
            },
            { 
              title: "Virtual Triage", 
              desc: "Intelligent patient intake bots that use medical-grade NLP to assess urgency and route patients to the correct specialty.",
              icon: <Brain className="w-8 h-8 text-cyan-400" /> 
            },
            { 
              title: "RPM Monitoring", 
              desc: "Remote Patient Monitoring (RPM) tools that analyze wearable data to alert doctors of cardiac or diabetic anomalies in real-time.",
              icon: <Activity className="w-8 h-8 text-cyan-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-cyan-900/5 border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="mb-6 p-4 bg-cyan-500/10 rounded-2xl inline-block group-hover:bg-cyan-600 transition-all">
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
            <div className="absolute -inset-10 bg-cyan-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 shadow-2xl overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-[10px] text-gray-500 uppercase">Live_Consultation_Feed</span>
                  </div>
                  <HeartPulse className="w-4 h-4 text-emerald-500 animate-pulse" />
               </div>

               <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                     <p className="text-[10px] text-gray-500 uppercase mb-2 italic">Real-time Sentiment & Health Indicators</p>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="text-xs font-bold">Vitals: <span className="text-emerald-400">Stable</span></div>
                        <div className="text-xs font-bold">Stress: <span className="text-yellow-400">Elevated</span></div>
                     </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500 uppercase mb-2">AI-Generated Summary</p>
                     <p className="text-[11px] leading-relaxed text-gray-300">
                        Patient reports persistent migraine (LHS) for 48h. Recommend blood pressure check and neurological screening.
                     </p>
                  </div>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Precision <br/>Care Architecture</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We understand that in healthcare, accuracy is not a metric—it's a requirement. 
              Our systems are built with medical-grade data encryption, 
              strict HIPAA compliance, and doctor-in-the-loop oversight.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
               <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <ShieldCheck className="text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">HIPAA/GDPR Secure</span>
               </div>
               <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                  <Microscope className="text-cyan-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">FDA-Aligned Models</span>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-cyan-900/40 to-emerald-950/40 border border-cyan-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Heal Faster <br/>With AI</h2>
            <p className="text-cyan-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our health-tech engineers at DLF Cyber City are ready to build 
              the future of patient care.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-cyan-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START MEDICAL BUILD
              </button>
              <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Clinical Engineering: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HealthTeleIndustryPage;