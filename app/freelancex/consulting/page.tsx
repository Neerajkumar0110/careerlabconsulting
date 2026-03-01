'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, BrainCircuit, Cloud, Activity, 
  ArrowRight, ShieldCheck, ChevronRight, X, 
  Loader2, Mail, Users, Briefcase, Target, 
  LineChart, Network, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const SERVICES = [
  {
    title: "AI & Machine Learning",
    desc: "Integrate predictive models, custom LLMs, and neural networks to automate your business operations.",
    icon: BrainCircuit,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    title: "Cloud Native Architecture",
    desc: "Design zero-downtime, globally distributed, and infinitely scalable systems on AWS and GCP.",
    icon: Cloud,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    title: "Digital Transformation",
    desc: "Modernize legacy codebases. Migrate monolithic structures to agile, microservice-based environments.",
    icon: Activity,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    title: "Elite Engineering Pods",
    desc: "Deploy an entire autonomous team of top 1% architects, developers, and PMs for rapid product shipping.",
    icon: Network,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20"
  }
];

const PROCESS_STEPS = [
  { num: "01", title: "Technical Audit", desc: "We map your existing infrastructure, identifying bottlenecks, security vulnerabilities, and scalability limits." },
  { num: "02", title: "Strategic Blueprint", desc: "Our architects design a comprehensive roadmap, selecting the optimal tech stack and deployment protocols." },
  { num: "03", title: "Autonomous Execution", desc: "We deploy elite talent to execute the blueprint with precision, ensuring zero disruption to your active operations." }
];

export default function ConsultingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', budget: 'Flexible', scope: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Reusing standard API routing pattern
      await fetch('/api/referral', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: "Enterprise Consulting" })
      }).catch(err => console.log("API Optional Error"));

      const ownerPhone = "918700236923";
      const msg = `*💎 Executive Consulting Inquiry*%0A%0A*Name:* ${formData.name}%0A*Company:* ${formData.company}%0A*Email:* ${formData.email}%0A*Est. Budget:* ${formData.budget}%0A%0A*Project Scope:* ${formData.scope}`;
      window.open(`https://wa.me/${ownerPhone}?text=${msg}`, '_blank');
      
      setIsModalOpen(false);
    } catch (err) {
      alert("Submission failed. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 relative">
        {/* Luxury Background Glows */}
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[400px] md:h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-0" />
        <div className="absolute top-1/4 left-0 w-full md:w-[600px] h-[400px] md:h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20 md:space-y-32">
          
          {/* --- HERO SECTION --- */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md"
              >
                <Building2 size={12} className="text-blue-400" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Enterprise Advisory</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-[1.1]"
              >
                Architect the <br className="hidden sm:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Digital Future.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Partner with top 1% fractional CTOs and principal engineers to solve your most complex scaling, AI, and infrastructure challenges.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
              >
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-4 md:py-5 bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-xl md:rounded-2xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-3"
                >
                  Book Discovery Call <ArrowRight size={16} />
                </button>
                <Link href="/freelancex/talent" className="px-8 py-4 md:py-5 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-xl md:rounded-2xl transition-all flex items-center justify-center">
                  Explore Talent
                </Link>
              </motion.div>
            </div>

            {/* Premium Imagery Right Side */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-transparent to-[#020617]/50 z-10" />
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Executive Tech Consulting" 
                className="w-full h-full object-cover grayscale opacity-60"
              />
              
              {/* Floating Stat Card */}
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 bg-[#0a0f1d]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl max-w-[250px]">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <LineChart className="text-emerald-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white">400%</h4>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Avg. ROI Delivered</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium">Through optimized architectures and AI automated pipelines.</p>
              </div>
            </motion.div>
          </div>

          {/* --- SERVICES BENTO GRID --- */}
          <div className="space-y-10 md:space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4 px-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">Core <span className="text-blue-400">Expertise.</span></h2>
              <p className="text-slate-500 font-medium text-sm md:text-lg">We don't just write code. We deliver enterprise-grade technological superiority.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((srv, idx) => (
                <div key={idx} className={`p-8 bg-[#0a0f1d]/60 backdrop-blur-xl border ${srv.border} rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 group`}>
                  <div className={`w-14 h-14 rounded-2xl ${srv.bg} flex items-center justify-center mb-6`}>
                    <srv.icon className={srv.color} size={28} />
                  </div>
                  <h3 className="text-xl font-black mb-3 leading-tight">{srv.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{srv.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- THE BLUEPRINT PROCESS --- */}
          <div className="bg-[#0a0f1d]/40 border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
             <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
                <Target size={400} />
             </div>
             
             <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black mb-12 md:mb-16">The Advisory <br className="hidden md:block"/><span className="text-indigo-400">Blueprint.</span></h2>
                
                <div className="grid md:grid-cols-3 gap-10 md:gap-8">
                  {PROCESS_STEPS.map((step, i) => (
                    <div key={i} className="relative">
                       {/* Connection Line for Desktop */}
                       {i !== PROCESS_STEPS.length - 1 && (
                         <div className="hidden md:block absolute top-8 left-20 right-[-20px] h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent" />
                       )}
                       <div className="text-5xl md:text-6xl font-black text-white/5 mb-6">{step.num}</div>
                       <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-blue-500" /> {step.title}
                       </h4>
                       <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>

          {/* --- CTA SECTION --- */}
          <div className="relative rounded-[2rem] md:rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-[#020617] border border-white/10 p-8 md:p-20 shadow-3xl text-center">
             <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center mix-blend-overlay opacity-10" />
             <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-6xl font-black text-white leading-tight tracking-tighter">Ready to scale your <br/> <span className="text-blue-400">Operations?</span></h2>
                <p className="text-blue-100/70 font-medium text-base md:text-lg">Skip the lengthy hiring process. Engage directly with a Principal Architect to blueprint your next major technical milestone today.</p>
                <div className="pt-6">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto py-5 px-10 bg-white hover:bg-blue-50 text-black font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 mx-auto text-xs"
                  >
                    Initiate Advisory Session <ChevronRight size={18} />
                  </button>
                </div>
             </div>
          </div>

          {/* Security Footer */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center py-6 border-t border-white/5 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">
             <ShieldCheck size={14} className="text-emerald-500" /> 
             <span>Strict NDA Protocol Enforced</span>
             <span className="hidden md:inline text-slate-700">|</span>
             <span>End-to-End Encrypted Advisory</span>
          </div>

        </div>
      </main>

      <Footer />

      {/* --- CONSULTATION BOOKING MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 sm:px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative bg-[#0a0f1d] border border-white/10 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] max-w-xl w-full shadow-3xl overflow-hidden z-10">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
               <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all"><X size={20} /></button>
               
               <div className="mb-8 text-center md:text-left">
                  <span className="text-[9px] font-black uppercase text-blue-400 tracking-[0.3em] mb-2 block">Executive Discovery</span>
                  <h3 className="text-2xl md:text-3xl font-black mb-2 tracking-tight leading-tight">Request Advisory</h3>
                  <p className="text-slate-400 text-xs italic">A Principal Partner will review your request within 4 hours.</p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input required type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input required type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input required type="text" placeholder="Company Name" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, company: e.target.value})} />
                    </div>
                    <div className="relative group">
                      <select required className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-500 transition-all text-slate-300 appearance-none" onChange={e => setFormData({...formData, budget: e.target.value})}>
                        <option value="Flexible" className="bg-[#020617]">Estimated Budget</option>
                        <option value="$10k - $50k" className="bg-[#020617]">$10k - $50k</option>
                        <option value="$50k - $150k" className="bg-[#020617]">$50k - $150k</option>
                        <option value="$150k+" className="bg-[#020617]">$150k+</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative group">
                     <textarea required rows={4} placeholder="Briefly describe your technical bottlenecks or goals..." className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600 resize-none" onChange={e => setFormData({...formData, scope: e.target.value})} />
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full py-4 md:py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] rounded-xl md:rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 mt-4 text-[10px] md:text-xs">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <>Submit Advisory Request <ChevronRight size={16} /></>}
                  </button>
                  <p className="text-[8px] md:text-[9px] text-center text-slate-500 uppercase tracking-widest mt-4">Protected by strict Non-Disclosure Agreements</p>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}