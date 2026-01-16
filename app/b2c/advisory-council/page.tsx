'use client';

import React from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import Image from 'next/image';
import { ShieldCheck, Linkedin, Globe, Award, MessageCircle, ArrowRight, Star, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface CouncilMember {
  name: string;
  position: string;
  expertise: string;
  image: string;
  location: string;
}

const councilMembers: CouncilMember[] = [
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

  const Values = ({ icon: Icon, title, desc }: { icon: LucideIcon, title: string, desc: string }) => (
    <div className="flex flex-col items-center text-center group">
      <div className="p-4 bg-white/5 rounded-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all text-blue-500">
        <Icon size={32} />
      </div>
      <h4 className="text-2xl font-black uppercase italic mb-3">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{desc}</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <B2CHeader />

      <section className="relative pt-32 pb-20 md:pt-52 px-4 text-center">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 mb-8">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Governance</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">
            ADVISORY <span className="text-blue-600">COUNCIL</span>
          </h1>
        </div>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {councilMembers.map((member, i) => (
          <div key={i} className="group relative">
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/5 bg-[#050505] hover:border-blue-500 transition-all duration-500">
              <Image src={member.image} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                <h3 className="text-xl font-black uppercase italic">{member.name}</h3>
                <p className="text-blue-500 text-[10px] font-black mb-2">{member.position}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="py-24 bg-white/[0.02] border-y border-white/5 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <Values icon={Star} title="Excellence" desc="Setting the gold standard for industrial tech training." />
          <Values icon={Award} title="Integrity" desc="Unwavering commitment to genuine skill development." />
          <Values icon={Globe} title="Vision" desc="Anticipating the needs of the 2030 tech landscape." />
        </div>
      </section>

      <section className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-white text-black rounded-[3rem] p-12 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-8">Get In Touch</h2>
          <Link href={`https://wa.me/${whatsappNumber}`} className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-2xl font-black uppercase hover:bg-blue-600 transition-all">
            WhatsApp Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>  

      <Footer />
    </main>
  );
}