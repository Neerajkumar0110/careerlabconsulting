'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Github, Twitter, Linkedin, Mail, ArrowUpRight, 
  Home, Box, Briefcase, Phone, X 
} from 'lucide-react';

const footerLinks = {
  Solutions: [
    { name: 'AI Agents', href: '#' },
    { name: 'Neural Training', href: '#' },
    { name: 'Custom LLMs', href: '#' },
    { name: 'Security Protocol', href: '#' },
    { name: 'CEO Portal (TwinX)', href: '#' },
  ],
  "Business Hub": [
    { name: 'AI Employers (Jobs)', href: '#' },
    { name: 'Freelancer Platform', href: '#' },
    { name: 'Project Development', href: '#' },
    { name: 'Individual Projects', href: '#' },
  ],
  Resources: [
    { name: 'About Us', href: '#' },
    { name: 'Case Studies', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Contact Tech', href: '#' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'AI Legal - SaaS', href: '#' },
  ],
};

const productList = [
  "AI Voice", "AI CRM", "AI HRMS", "AI ERP", "AI LMS", 
  "AI TwinX", "AI School Management", "AI University Management", 
  "AI Legal", "AI Admin"
];

export default function Footer() {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const whatsappNumber = "919810984968";

  return (
    <>
      <footer className="bg-[#020617] border-t border-white/5 pt-24 pb-32 md:pb-16 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          {/* Main Grid: Updated for desktop alignment */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">
            
            {/* Branding Column - Occupies 2 columns on desktop */}
            <div className="lg:col-span-2">
              <Link href="/" className="mb-8 block">
                <Image 
                  src="/logo.png" 
                  alt="Career Lab Consulting" 
                  width={180} 
                  height={50} 
                  priority
                />
              </Link>
              <p className="text-slate-500 text-sm max-w-sm mb-8 leading-relaxed">
                Pioneering autonomous intelligence for global enterprises. We architect, train, and deploy the next generation of digital workforces.
              </p>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns: 4 columns for 4 categories */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="lg:col-span-1">
                <h4 className="text-white font-bold mb-8 text-xs uppercase tracking-[0.2em]">{title}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-slate-500 hover:text-white transition-colors flex items-center group text-sm">
                        {link.name}
                        <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-slate-500 text-sm font-medium">
              © 2026 <span className="text-white font-bold">Career Lab Consulting</span> Group.
            </p>
            
            <div className="flex items-center gap-2 bg-emerald-500/5 px-4 py-2 rounded-full border border-emerald-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></div>
              <span className="text-emerald-500/80 text-[10px] font-mono font-bold tracking-widest uppercase">Node Online</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- MOBILE PRODUCT POPUP --- */}
      {isProductOpen && (
        <div className="md:hidden fixed inset-0 z-[110] flex items-end justify-center px-4 pb-24 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-sm bg-[#0a0f1d]/95 border border-white/10 rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#0a0f1d] z-20 pb-2">
              <h3 className="text-white font-bold text-lg tracking-tight">Products</h3>
              <button onClick={() => setIsProductOpen(false)} className="p-2 bg-white/5 rounded-full text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-1">
              {productList.map((item) => (
                <button 
                  key={item} 
                  onClick={() => setIsProductOpen(false)}
                  className="text-left text-slate-400 hover:text-blue-400 text-base font-medium py-3 border-b border-white/5 last:border-0 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MOBILE NAVIGATION --- */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 z-[100] bg-[#0a0f1d]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] px-6 py-3 shadow-2xl shadow-black">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col items-center gap-1 text-blue-500">
            <Home className="w-5 h-5" />
            <span className="text-[9px] font-black uppercase tracking-tighter">Home</span>
          </Link>
          
          <button 
            onClick={() => setIsProductOpen(true)}
            className={`flex flex-col items-center gap-1 transition-colors ${isProductOpen ? 'text-blue-400' : 'text-slate-500'}`}
          >
            <Box className="w-5 h-5" />
            <span className="text-[9px] font-black uppercase tracking-tighter">Products</span>
          </button>
          
          <Link href={`https://wa.me/${whatsappNumber}`} className="relative -translate-y-6">
            <div className="absolute -inset-3 bg-[#25D366]/20 blur-xl rounded-full animate-pulse"></div>
            <div className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_8px_30px_rgb(37,211,102,0.4)] relative z-10 border-[6px] border-[#0a0f1d]">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
          </Link>

          <Link href="#" className="flex flex-col items-center gap-1 text-slate-500">
            <Briefcase className="w-5 h-5" />
            <span className="text-[9px] font-black uppercase tracking-tighter">Work</span>
          </Link>
          <Link href="#" className="flex flex-col items-center gap-1 text-slate-500">
            <Phone className="w-5 h-5" />
            <span className="text-[9px] font-black uppercase tracking-tighter">Contact</span>
          </Link>
        </div>
      </nav>
    </>
  );
}