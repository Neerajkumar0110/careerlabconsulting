'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote, ShieldCheck, Globe, CheckCircle2, Building2, Users, ArrowRight } from 'lucide-react';

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
  },
  {
    name: "Sarah Chen",
    role: "Cloud Operations Head",
    country: "Singapore",
    flag: "🇸🇬",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
    text: "The integration speed is unmatched. We saw a 40% increase in candidate quality within the first month of using HireX.",
    rating: 5
  },
  {
    name: "Marcus Thorne",
    role: "VP of Engineering",
    country: "United Kingdom",
    flag: "🇬🇧",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
    text: "Finally, a platform that understands technical depth. The AI-driven verification is a game changer for our scaling needs.",
    rating: 5
  }
];

const SCROLL_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

interface StatCardProps {
  icon: React.ElementType;
  score: string;
  label: string;
  subLabel: string;
  color: string;
}

const StatCard = ({ icon: Icon, score, label, subLabel, color }: StatCardProps) => (
  <div className="flex items-center gap-5 p-2">
    <div className={`w-14 h-14 rounded-2xl bg-${color}-500/10 flex items-center justify-center border border-${color}-500/20 shadow-inner`}>
      <Icon size={24} className={`text-${color}-400`} />
    </div>
    <div>
      <div className="flex items-center gap-2">
        <span className="text-2xl md:text-3xl font-black text-white italic tracking-tighter">{score}</span>
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="text-blue-500 fill-blue-500" />
            ))}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] font-black text-white uppercase tracking-wider">{label}</span>
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">{subLabel}</span>
      </div>
    </div>
  </div>
);

export default function Testimonials() {
  const googleReviewLink = "https://www.google.com/search?q=career+lab+consulting";

  return (
    <section className="relative py-24 bg-[#020617] overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 text-center mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-xl"
        >
          <Globe size={12} className="animate-spin" style={{ animationDuration: '8s' }} />
          Verified Global Reputation
        </motion.div>
        <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase italic">
          Trusted by the <br /> <span className="text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">AI Empire.</span>
        </h2>
      </div>

      <div className="relative w-full mb-10 py-10 overflow-visible">
          <motion.div 
              className="flex gap-8 px-4"
              animate={{ x: [0, -2140] }} 
              transition={{ 
                  duration: 40, 
                  repeat: Infinity, 
                  ease: "linear" 
              }}
          >
              {SCROLL_TESTIMONIALS.map((testimonial, idx) => (
                  <div 
                      key={idx}
                      className="w-[400px] shrink-0 relative bg-white/[0.03] backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 group shadow-2xl flex flex-col"
                  >
                      <div className="absolute -top-5 -right-4 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/20 rotate-12 group-hover:rotate-0 transition-transform z-30">
                          <Quote size={20} className="text-white fill-white" />
                      </div>

                      <div className="flex items-start gap-4 mb-8">
                          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white/10 bg-slate-800 shrink-0">
                              <Image src={testimonial.image} alt={testimonial.name} fill sizes="56px" className="object-cover" />
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
                  </div>
              ))}
          </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-4 md:p-2 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
            <div className="flex-1 flex justify-center border-b md:border-b-0 md:border-r border-white/5 w-full py-4">
                <StatCard 
                    icon={Globe} 
                    score="4.9/5" 
                    label="Google Reviews" 
                    subLabel="Customer Satisfaction"
                    color="blue"
                />
            </div>

            <div className="flex-1 flex justify-center border-b md:border-b-0 md:border-r border-white/5 w-full py-4">
                <StatCard 
                    icon={Building2} 
                    score="4.8/5" 
                    label="Glassdoor" 
                    subLabel="Corporate Rating"
                    color="indigo"
                />
            </div>

            <div className="flex-1 flex justify-center border-b md:border-b-0 md:border-r border-white/5 w-full py-4">
                <div className="flex items-center gap-5 p-2">
                    <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-inner">
                        <Users size={24} className="text-green-400" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl md:text-3xl font-black text-white italic tracking-tighter">1.5K+</span>
                            <CheckCircle2 size={16} className="text-green-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-black text-white uppercase tracking-wider">Verified Nodes</span>
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">Global Network</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex justify-center w-full py-6 px-8">
                <a 
                    href={googleReviewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full overflow-hidden rounded-2xl bg-white px-8 py-4 text-center transition-all hover:bg-blue-600"
                >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-black group-hover:text-white transition-colors">
                            Explore All Reviews
                        </span>
                        <ArrowRight size={16} className="text-black group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}