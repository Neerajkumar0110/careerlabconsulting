'use client';

import React from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import Image from 'next/image';
import { Globe, Briefcase, GraduationCap, MessageCircle, ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const alumniData = [
  {
    name: "Arjun Mehta",
    role: "AI Engineer",
    company: "Google",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    package: "42 LPA",
    domain: "Deep Learning"
  },
  {
    name: "Sarah Jenkins",
    role: "Blockchain Developer",
    company: "Coinbase",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    package: "$140k",
    domain: "Web3 Protocols"
  }
];

export default function Alumni() {
  const whatsappNumber = "+919810984968";

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600/30">
      <B2CHeader />

      <section className="pt-32 pb-16 md:pt-52 px-4 text-center">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-6">
          OUR <span className="text-blue-500">LEGACY</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">World-class talent, placed in world-class companies.</p>
      </section>

      {/* ALUMNI GRID */}
      <section className="py-20 px-4 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {alumniData.map((alumnus, i) => (
          <div key={i} className="group bg-[#050505] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/30 transition-all">
            <div className="relative aspect-[4/5]">
              <Image 
                src={alumnus.image} 
                alt={alumnus.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute top-4 right-4 bg-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                {alumnus.package}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-black uppercase italic">{alumnus.name}</h3>
              <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-4">{alumnus.role} @ {alumnus.company}</p>
              <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <span className="text-[10px] text-slate-500 uppercase font-bold">{alumnus.domain}</span>
                <ArrowUpRight size={16} className="text-slate-500 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA SECTION - FIXED ARROWRIGHT */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-8 relative z-10">Start Your Journey</h2>
          <Link 
            href={`https://wa.me/${whatsappNumber}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Apply Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* WHATSAPP FLOATING */}
      <Link 
        href={`https://wa.me/${whatsappNumber}`}
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <MessageCircle size={28} fill="white" />
      </Link>

      <Footer />
    </main>
  );
}