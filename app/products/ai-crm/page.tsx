'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  ShieldCheck, 
  BarChart3, 
  MessageSquare, 
  ArrowRight,
  Database,
  Globe,
  Users,
  Briefcase
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

const b2bServices = [
  {
    title: "Talent Acquisition Service",
    desc: "Hum aapke liye best Software Testers aur Cloud Engineers source, filter aur vet karte hain. 0% hiring hassle.",
    icon: <Users className="text-blue-500" />
  },
  {
    title: "Custom Workforce Training",
    desc: "Aapka tech stack, hamari training. Hum aapke existing employees ko latest automation tools par upskill karte hain.",
    icon: <Target className="text-purple-500" />
  },
  {
    title: "Managed Interviewing",
    desc: "Hamare domain experts aapke liye technical rounds conduct karte hain, taaki aapka engineering time waste na ho.",
    icon: <Briefcase className="text-emerald-500" />
  }
];

export default function B2BServicePage() {
  const whatsappNumber = "918700236923";

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30">
      <Navbar portal="B2B" />

      {/* --- Hero Section --- */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-600/10 border border-blue-600/20"
          >
            <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em]">Strategic B2B Partnership</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-7xl font-black mb-8 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent leading-tight">
            Scaling Your Tech Team <br className="hidden md:block" /> Should Be Effortless.
          </h1>
          <p className="text-slate-400 text-lg md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed">
            CLC provides end-to-end <strong>Hiring & Training Services</strong>. Hum sirf 
            platform nahi dete, hum aapke liye talent produce aur manage karte hain.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a 
              href={`https://wa.me/${whatsappNumber}?text=Hi CLC Team, I'm interested in your B2B Hiring and Training services.`}
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20"
            >
              Partner With Us <ArrowRight size={20} />
            </a>
            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold transition-all backdrop-blur-md">
              Download Service Brochure
            </button>
          </div>
        </div>
      </section>

      {/* --- Services Grid --- */}
      <section className="py-24 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Managed Services</h2>
            <p className="text-slate-400">Tailored solutions for modern engineering teams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {b2bServices.map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[40px] bg-slate-900/40 border border-white/5 backdrop-blur-xl hover:border-blue-500/50 transition-colors group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Service Workflow / Value Prop --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight">
              More Than Just Software. <br /> We Are Your <span className="text-blue-500">Extended Team.</span>
            </h2>
            
            <div className="space-y-8">
              {[
                { icon: <ShieldCheck className="text-emerald-500" />, t: "Zero-Risk Hiring", d: "Aap sirf un candidates ke liye pay karte hain jo aapka technical criteria match karte hain." },
                { icon: <Globe className="text-sky-500" />, t: "Global Talent Pool", d: "Access over 10,000+ pre-vetted Software Testing and Cloud specialists." },
                { icon: <Zap className="text-yellow-500" />, t: "Immediate Onboarding", d: "Reduce your Time-to-Hire from 45 days to just 7 days with our ready-to-deploy talent." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">{item.t}</h4>
                    <p className="text-slate-400 leading-relaxed text-base">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Metric Card */}
          <div className="flex-1 w-full max-w-xl aspect-square bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-[60px] border border-white/10 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
             
             <motion.div 
               animate={{ 
                 scale: [1, 1.05, 1],
                 rotate: [0, 5, -5, 0] 
               }}
               transition={{ duration: 6, repeat: Infinity }}
               className="z-10 bg-slate-900/80 p-8 rounded-3xl border border-white/20 backdrop-blur-2xl shadow-2xl"
             >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-600 rounded-xl"><BarChart3 /></div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Efficiency Gain</p>
                    <p className="text-2xl font-black">+65% Faster Sourcing</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-64 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} className="h-full bg-blue-500" />
                  </div>
                  <div className="h-2 w-64 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '45%' }} className="h-full bg-purple-500" />
                  </div>
                </div>
             </motion.div>

             {/* Decorative Orbs */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 blur-[80px]" />
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/20 blur-[80px]" />
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[50px] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
           <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8">Let’s Build Your <br /> Dream Team.</h2>
              <p className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-90">
                Join 50+ enterprise partners who trust CLC for their critical hiring and upskilling needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href={`https://wa.me/${whatsappNumber}`}
                  className="bg-white text-blue-700 px-12 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform shadow-xl flex items-center gap-3"
                >
                  Talk to our Experts <MessageSquare size={18} />
                </a>
              </div>
           </div>
           
           {/* Abstract shapes */}
           <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
           <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        </div>
      </section>

      <Footer />
    </div>
  );
}