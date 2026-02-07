'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Users, ArrowRight } from 'lucide-react';

export default function MasterClassSection() {
  return (
    <section className="py-20 px-4 bg-[#02040a]">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 shadow-2xl">
          
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-400/20 blur-[100px] rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row items-stretch">
            
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  Live Masterclass
                </motion.div>
                
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.9]">
                  EXPLORE FREE <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-white">
                    MASTER CLASSES
                  </span>
                </h2>
              </div>
              
              <p className="text-blue-50/80 text-lg md:text-xl max-w-md leading-relaxed font-medium">
                Unlock industry secrets with our expert-led sessions. Start your professional journey with CLC today, at zero cost.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Link href="/masterclass/live">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(249 115 22 / 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-[#ff9900] text-white font-black py-5 px-10 rounded-2xl text-sm uppercase tracking-wider flex items-center gap-3 transition-all"
                  >
                    Start For Free
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                  </motion.button>
                </Link>

                <div className="flex -space-x-3 items-center ml-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-600 bg-slate-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                    </div>
                  ))}
                  <p className="pl-5 text-blue-100 text-sm font-bold">12k+ Students Joined</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative p-8 md:p-12 flex items-center justify-center min-h-[400px]">
              <div className="relative w-full h-full">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative z-10 w-full h-full rounded-[32px] overflow-hidden border-8 border-white/5 shadow-2xl aspect-[4/3] md:aspect-auto"
                >
                  <img 
                    src="https://img.freepik.com/free-photo/medium-shot-smiley-woman-typing_23-2148924729.jpg" 
                    alt="Master Class Instructor"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent" />
                </motion.div>

                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="hidden lg:flex absolute top-10 -left-10 z-20 bg-white p-4 rounded-2xl shadow-xl items-center gap-4"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                    <PlayCircle size={28} />
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">Introduction to AI</p>
                    <p className="text-slate-500 text-xs">45:00 Mins • Live</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5 }}
                  className="hidden lg:flex absolute bottom-10 -right-6 z-20 bg-blue-900/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-xl items-center gap-4"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-300">
                    <Users size={28} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Active Learners</p>
                    <p className="text-blue-200 text-xs">842 watching now</p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}