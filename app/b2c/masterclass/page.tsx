'use client';

import React, { useState } from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { Play, MessageCircle, ArrowRight, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Masterclass() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const whatsappNumber = "+919810984968";
  
  // Genuine Learner Avatars from Unsplash
  const avatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-blue-600/30 overflow-x-hidden">
      <B2CHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* LEFT: TEXT */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] italic mb-8">
                MASTER THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">FRONTIER</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 font-medium">
                Step into the world of Advanced AI & Web3. Get hands-on experience with architects who build the future.
              </p>
              <Link 
                href={`https://wa.me/${whatsappNumber}`}
                className="inline-flex items-center gap-3 px-10 py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
              >
                Enroll via WhatsApp <ArrowRight size={20} />
              </Link>
            </div>

            {/* RIGHT: GENUINE HERO IMAGE (FIXES EMPTY SPACE) */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full animate-pulse" />
              <div className="relative aspect-square md:aspect-video lg:aspect-square overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop" 
                  alt="Modern Technology"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-w-768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MASTERCLASS PREVIEW CARD --- */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#050505] border border-white/5 rounded-[3rem] p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* VIDEO THUMBNAIL (CLICK TO OPEN VIDEO) */}
              <div 
                className="relative aspect-video rounded-[2.5rem] overflow-hidden cursor-pointer group"
                onClick={() => setIsVideoOpen(true)}
              >
                <Image 
                  src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop" 
                  alt="Masterclass Preview"
                  fill
                  className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-125 transition-all shadow-2xl shadow-blue-600/50">
                    <Play className="fill-current text-white ml-1" size={32} />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 p-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Preview Clip</p>
                  <p className="text-sm font-bold uppercase tracking-tight">Neural Core Architecture v2.0</p>
                </div>
              </div>

              {/* CONTENT SIDE */}
              <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-black uppercase italic leading-[0.9]">Build Autonomous <br/>Agent Swarms</h2>
                <div className="space-y-4">
                  {['Custom LLM Orchestration', 'Memory Management for Agents', 'Deployment on Kubernetes'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={20} className="text-blue-500 shrink-0" />
                      <span className="text-sm font-black uppercase tracking-widest text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>

                {/* GENUINE ACTIVE LEARNERS IMAGES */}
                <div className="pt-6 flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex -space-x-4">
                    {avatars.map((url, i) => (
                      <div key={i} className="relative w-12 h-12 rounded-full border-4 border-[#050505] overflow-hidden bg-slate-800">
                        <Image src={url} alt="Learner Avatar" fill className="object-cover" />
                      </div>
                    ))}
                    <div className="relative w-12 h-12 rounded-full border-4 border-[#050505] bg-blue-600 flex items-center justify-center text-[12px] font-black">
                      +120
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-tight">
                      Active Learners <br/> This Week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VIDEO POPUP MODAL --- */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setIsVideoOpen(false)} />
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              className="absolute top-6 right-6 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              onClick={() => setIsVideoOpen(false)}
            >
              <X size={24} />
            </button>
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="InternX Masterclass Video" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}