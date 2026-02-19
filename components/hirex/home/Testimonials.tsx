'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote, ShieldCheck, Globe, CheckCircle2, Building2, Users } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "Dr. Raheel Khan",
    role: "Senior Enterprise Partner",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80",
    text: "The point-to-point synchronization between GitHub activity and the HireX score is revolutionary. It eliminates hiring bias completely.",
    rating: 5
  },
  {
    name: "Neeraj Kumar",
    role: "Full Stack Lead",
    country: "India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&q=80",
    text: "Manee Pro 2.5 flash tests are incredibly accurate. As a developer, having my skills verified autonomously adds massive value to my profile.",
    rating: 5
  },
  {
    name: "Deepanshu Joshi",
    role: "AI Architecture Lead",
    country: "United States",
    flag: "🇺🇸",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
    text: "We've built a 360-degree reporting system that finally makes resumes obsolete. HireX is the future of the autonomous workforce.",
    rating: 5
  }
];

interface StatCardProps {
  icon: React.ElementType;
  score: string;
  label: string;
}

const StatCard = ({ icon: Icon, score, label }: StatCardProps) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
      <Icon size={20} className="text-blue-400" />
    </div>
    <div>
      <div className="flex items-center gap-2">
        <span className="text-xl md:text-2xl font-black text-white italic tracking-tighter">{score}</span>
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={8} className="text-blue-500 fill-blue-500" />
            ))}
        </div>
      </div>
      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
  </div>
);

export default function Testimonials() {
  const googleReviewLink = "https://www.google.com/search?q=career+lab+consulting#lrd=0x390ce5b02b6f908d:0x3f9da383c70066be,3,,,,";

  return (
    <section className="relative py-15 bg-[#020617] overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 backdrop-blur-xl"
          >
            <Globe size={12} className="animate-spin" style={{ animationDuration: '8s' }} />
            Verified Global Reputation
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase italic">
            Trusted by the <br /> <span className="text-blue-500">AI Empire.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div 
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="relative bg-white/[0.03] backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 group shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20 rotate-12 group-hover:rotate-0 transition-transform">
                    <Quote size={20} className="text-white fill-white" />
                </div>

                <div className="flex items-start gap-4 mb-8">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/10 bg-slate-800 shrink-0">
                    <Image 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        fill 
                        sizes="56px"
                        className="object-cover"
                    />
                    </div>
                    <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-tight italic">{testimonial.name}</h4>
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">{testimonial.role}</p>
                    <div className="flex items-center gap-1.5 text-slate-500">
                        <span className="text-sm">{testimonial.flag}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider">{testimonial.country}</span>
                    </div>
                    </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed font-medium italic mb-8">
                    "{testimonial.text}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-2 text-blue-500">
                  <ShieldCheck size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Verified Review</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-16 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-md shadow-2xl shadow-blue-500/5 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5 opacity-50" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            <div className="flex justify-center md:justify-start pb-6 md:pb-0 md:pr-6">
                <StatCard 
                    icon={Globe} 
                    score="4.9/5" 
                    label="Google Satisfaction" 
                />
            </div>

            <div className="flex justify-center md:justify-start py-6 md:py-0 md:px-6">
                <StatCard 
                    icon={Building2} 
                    score="4.8/5" 
                    label="Glassdoor Rating" 
                />
            </div>

            <div className="flex justify-center md:justify-start py-6 md:py-0 md:px-6">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                    <Users size={20} className="text-green-400" />
                    </div>
                    <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl md:text-2xl font-black text-white italic tracking-tighter">1.5K+</span>
                        <CheckCircle2 size={14} className="text-green-500" />
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Nodes</div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center md:justify-end pt-6 md:pt-0 md:pl-6">
                <a 
                    href={googleReviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full md:w-auto px-8 py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95 text-center flex items-center justify-center gap-2 group"
                >
                    View All Reviews
                    <Globe size={14} className="group-hover:animate-pulse" />
                </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}