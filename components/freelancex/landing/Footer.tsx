'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Home, Search, User, Briefcase, Globe, Zap, ArrowUpRight, MessageCircle, MessageSquare } from 'lucide-react';
import Logo from "@/components/freelancex/logo/logo";

const FOOTER_LINKS = {
  Platform: [
    { name: 'Community', href: '#test' },
    { name: 'Referral Program', href: '#reports' },
    { name: 'Events', href: '#employers' },
    { name: 'Leaderboard', href: '#' },
  ],
  Ecosystem: [
    { name: 'HireX Talent', href: '#' },
    { name: 'CLC Consulting', href: '#' },
    { name: 'Manee AI Lab', href: '#' },
    { name: 'X-Secure Protocol', href: '#' },
  ],
  Company: [
    { name: 'About Us', href: '#' },
    { name: 'Partner Program', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
  Resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Career Prep', href: '#' },
    { name: 'Hiring Insights', href: '#' },
    { name: 'Support Center', href: '#' },
  ],
};

const SOCIAL_ICONS = [
  { name: 'Facebook', src: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png', brandColor: 'hover:bg-[#1877F2]' },
  { name: 'X', src: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png', brandColor: 'hover:bg-black' },
  { name: 'Instagram', src: 'https://cdn-icons-png.flaticon.com/512/3955/3955024.png', brandColor: 'hover:bg-[#E4405F]' },
  { name: 'YouTube', src: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png', brandColor: 'hover:bg-[#FF0000]' },
  { name: 'LinkedIn', src: 'https://cdn-icons-png.flaticon.com/512/145/145807.png', brandColor: 'hover:bg-[#0A66C2]' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-[#020617] border-t border-white/5 pt-20 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 mb-16">
            
            <div className="col-span-2 lg:col-span-4 space-y-6">
              <Logo />
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                Global talent marketplace powered by autonomous verification nodes.
              </p>
              
              <div className="flex gap-3">
                {SOCIAL_ICONS.map((social) => (
                  <Link 
                    key={social.name} 
                    href="#" 
                    className={`w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-300 group ${social.brandColor}`}
                  >
                    <Image 
                      src={social.src} 
                      alt={social.name} 
                      width={20} 
                      height={20} 
                      className="transition-all group-hover:brightness-0 group-hover:invert" 
                    />
                  </Link>
                ))}
              </div>
            </div>

            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="col-span-1 lg:col-span-2">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-6">{title}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center group">
                        {link.name}
                        {title === 'Ecosystem' && <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-all" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-12 p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                   </span>
                   <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Protocol Active</span>
                </div>
             </div>
             <div className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">
                Manee AI Native Sync Enabled
             </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 text-[11px] font-medium text-slate-500 uppercase tracking-widest">
              <span>© {currentYear} CLC HireX</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-blue-500" /> Protocol: X-Secure</span>
            </div>
            <div className="text-[11px] text-slate-500 uppercase tracking-widest">
              AI Dev by <span className="text-white font-bold">Career Lab Consulting</span>
            </div>
          </div>
        </div>
      </footer>

      <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50 h-16 bg-[#020617]/80 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-between px-2 shadow-2xl">
        <div className="flex flex-1 justify-around">
          <Link href="/" className="flex flex-col items-center gap-1 text-slate-400">
            <Home size={20} />
            <span className="text-[9px] font-bold uppercase tracking-tighter">Home</span>
          </Link>
          <Link href="#reports" className="flex flex-col items-center gap-1 text-slate-400">
            <Briefcase size={20} />
            <span className="text-[9px] font-bold uppercase tracking-tighter">Jobs</span>
          </Link>
        </div>

        <div className="relative -mt-12 group">
          <Link 
            href="https://wa.me/918700827753?text=Hi" 
            target="_blank"
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] border-4 border-[#020617] transition-transform active:scale-90"
          >
            <Image 
                src="https://cdn-icons-png.flaticon.com/512/5968/5968841.png" 
                alt="Support" 
                width={32} 
                height={32} 
                className=""
            />
          </Link>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-[#020617] rounded-full" />
        </div>

        <div className="flex flex-1 justify-around">
          <Link href="#test" className="flex flex-col items-center gap-1 text-slate-400">
            <Search size={20} />
            <span className="text-[9px] font-bold uppercase tracking-tighter">Tests</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-1 text-slate-400">
            <User size={20} />
            <span className="text-[9px] font-bold uppercase tracking-tighter">Profile</span>
          </Link>
        </div>
      </nav>
    </>
  );
}