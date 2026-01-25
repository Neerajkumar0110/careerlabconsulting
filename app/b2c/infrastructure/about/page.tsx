'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Rocket, Award, CheckCircle2, Zap, GraduationCap, Briefcase, Sparkles } from 'lucide-react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';

const stats = [
  { label: 'Students Trained', value: '1200+', icon: <Users className="text-blue-500" /> },
  { label: 'Hiring Partners', value: '250+', icon: <Briefcase className="text-indigo-500" /> },
  { label: 'Average Hike', value: '75%', icon: <Zap className="text-orange-500" /> },
  { label: 'Success Rate', value: '98%', icon: <CheckCircle2 className="text-emerald-500" /> },
];

const values = [
  {
    title: "Industry Aligned",
    desc: "Our curriculum is designed by working professionals from top tech firms.",
    icon: <Target className="w-6 h-6" />,
    color: "group-hover:text-blue-500"
  },
  {
    title: "Career First",
    desc: "We don't just teach coding; we build careers with dedicated placement cells.",
    icon: <Rocket className="w-6 h-6" />,
    color: "group-hover:text-indigo-500"
  },
  {
    title: "Mentorship",
    desc: "1:1 doubt clearing sessions with industry experts to keep you on track.",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "group-hover:text-emerald-500"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col selection:bg-blue-500/30 pt-20">
      <B2CHeader />

      <main className="flex-grow pt-24 pb-20 overflow-hidden">
        {/* Hero Section */}
        <section className="relative px-4 max-w-7xl mx-auto text-center mb-24">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-blue-600/20 blur-[120px] -z-10" />
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles size={14} /> Empowering Future Leaders
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-5xl md:text-8xl font-black tracking-tighter italic uppercase leading-[0.9] lg:leading-none"
          >
            We Build <span className="text-blue-500">Careers</span>, <br/> Not Just Skills.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Career Lab Consulting (CLC) is a premier career catalyst based in Gurugram, 
            bridging the gap between academic learning and industry expectations.
          </motion.p>
        </section>

        {/* Stats Section */}
        <section className="px-4 max-w-7xl mx-auto mb-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-[32px] text-center hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-all">
                  {stat.icon}
                </div>
                <h3 className="text-3xl md:text-5xl font-black mb-2 tracking-tight">{stat.value}</h3>
                <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Core Values Section with Real Image */}
        <section className="px-4 max-w-7xl mx-auto mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Image Side */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-blue-600/20 rounded-[44px] blur-2xl group-hover:bg-blue-600/30 transition-all" />
              <div className="relative rounded-[40px] overflow-hidden aspect-[4/5] bg-slate-900 border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                  alt="Career Lab Consulting Team"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                   <div className="flex items-center gap-3 mb-2">
                      <Award className="text-blue-500" size={20} />
                      <span className="text-xs font-black uppercase tracking-widest text-blue-500">Industry Leader</span>
                   </div>
                   <p className="text-white text-sm font-bold italic leading-relaxed">
                     "Our mission is to make quality industry education accessible to every aspiring professional."
                   </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Content Side */}
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-8 tracking-tighter leading-none">
                  Our <span className="text-blue-500">Core Values</span>
                </h2>
                <div className="space-y-6">
                  {values.map((v, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="group flex gap-6 p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all"
                    >
                      <div className={`shrink-0 w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 transition-all duration-300 ${v.color}`}>
                        {v.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-white mb-2 uppercase italic">{v.title}</h4>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed">{v.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="px-4 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 rounded-[48px] p-12 md:p-24 relative overflow-hidden text-center shadow-2xl">
             <div className="relative z-10">
                <h2 className="text-4xl md:text-7xl font-black mb-8 uppercase italic tracking-tighter leading-[0.9]">
                  Ready to start your <br className="hidden md:block"/> journey with CLC?
                </h2>
                <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
                   <button className="bg-white text-blue-700 font-black px-12 py-5 rounded-2xl hover:scale-105 transition-transform uppercase tracking-widest shadow-xl text-sm">
                      Explore Courses
                   </button>
                   <button className="bg-transparent border border-white/30 text-white font-black px-12 py-5 rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm">
                      Talk to Expert
                   </button>
                </div>
             </div>
             
             <GraduationCap className="absolute -bottom-10 -right-10 w-80 h-80 text-white/10 -rotate-12 pointer-events-none" />
             <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -ml-48 -mt-48 pointer-events-none" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}