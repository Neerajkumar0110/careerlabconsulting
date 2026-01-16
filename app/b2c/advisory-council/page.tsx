'use client';

import React from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import Image from 'next/image';
import { ShieldCheck, Linkedin, Globe, Award, MessageCircle, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

const councilMembers = [
  {
    name: "Dr. Marcus Chen",
    position: "Ex-Google DeepMind",
    expertise: "Neural Architectures",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    location: "San Francisco, USA"
  },
  {
    name: "Ayesha Rahman",
    position: "Senior Security Lead, Microsoft",
    expertise: "Cyber Resilience",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    location: "London, UK"
  },
  {
    name: "Vikram Malhotra",
    position: "Web3 Strategist, Polygon",
    expertise: "Tokenomics & Scale",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    location: "Dubai, UAE"
  },
  {
    name: "Elena Rodriguez",
    position: "CTO, TechFrontier",
    expertise: "Autonomous Systems",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    location: "Berlin, Germany"
  }
];

export default function AdvisoryCouncil() {
  const whatsappNumber = "+919810984968";

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600/30 overflow-x-hidden">
      <B2CHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-4 overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-8 animate-fade-in">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Governance & Excellence</span>
          </div>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] italic mb-8">
            ADVISORY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">COUNCIL</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium">
            A global collective of visionaries, engineers, and strategists ensuring InternX remains at the absolute cutting edge of the tech frontier.
          </p>
        </div>
      </section>

      {/* --- COUNCIL GRID --- */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {councilMembers.map((member, i) => (
            <div key={i} className="group relative">
              {/* Card Container */}
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/5 bg-[#050505] transition-all duration-500 group-hover:border-blue-500/50 group-hover:-translate-y-2">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill
                  className="object-cover opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
                
                {/* Bottom Overlay Info */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-black uppercase italic tracking-tight">{member.name}</h3>
                    <Link href="#" className="p-1.5 bg-blue-600 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Linkedin size={14} fill="currentColor" />
                    </Link>
                  </div>
                  <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">{member.position}</p>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="flex flex-col">
                      <span className="text-[8px] text-slate-500 uppercase font-black">Expertise</span>
                      <span className="text-[10px] text-slate-200 font-bold uppercase">{member.expertise}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Tag */}
              <div className="mt-4 flex items-center justify-center gap-2 text-slate-600 group-hover:text-blue-400 transition-colors">
                <Globe size={12} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{member.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Star />, title: "Excellence", desc: "Setting the gold standard for industrial tech training." },
            { icon: <Award />, title: "Integrity", desc: "Unwavering commitment to genuine skill development." },
            { icon: <Globe />, title: "Vision", desc: "Anticipating the needs of the 2030 tech landscape." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="p-4 bg-white/5 rounded-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-500">
                {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
              </div>
              <h4 className="text-2xl font-black uppercase italic mb-3">{item.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto bg-white text-black rounded-[3rem] p-12 md:p-20 text-center shadow-[0_30px_100px_rgba(59,130,246,0.2)]">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-8 leading-none">Collaborate with the <br/> Council</h2>
          <p className="text-slate-600 text-lg mb-10 max-w-xl mx-auto font-medium">Are you an industry leader looking to shape the next generation of tech talent?</p>
          <Link 
            href={`https://wa.me/${whatsappNumber}`}
            className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95"
          >
            Connect on WhatsApp <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}