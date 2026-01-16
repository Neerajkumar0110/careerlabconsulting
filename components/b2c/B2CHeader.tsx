'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Search, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

const programs = [
  { name: 'InternX-AI', href: '/b2c/internx-ai', desc: 'Autonomous Agent Deployment' },
  { name: 'InternX-Cyber Security', href: '/b2c/internx-cyber-security', desc: 'Neural Security Protocols' },
  { name: 'InternX-Blockchain', href: '/b2c/internx-blockchain', desc: 'Decentralized Intelligence' },
  { name: 'InternX-Cloud AI & DevOps', href: '/b2c/internx-cloud-ai-and-devops', desc: 'Scalable Neural Networks' },
  { name: 'InternX-Web3', href: '/b2c/internx-web3', desc: 'Semantic Web & AI' },
];

const navLinks = [
  { name: 'Masterclass', href: '/b2c/masterclass' },
  { name: 'Alumni', href: '/b2c/alumni' },
  { name: 'Research', href: '/b2c/research' },
  { name: 'Advisory Council', href: '/b2c/advisory-council' },
];

export default function B2CHeader() {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setSearchResult(`Our InternX ${searchQuery} program focus on industry-grade practical deployment. Applications for the next cohort are now open.`);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-12">
            <Link href="/b2c" className="relative w-[150px] h-[40px]">
              <Image 
                src="/logo.png" 
                alt="Career Lab Logo" 
                fill 
                className="object-contain"
                priority 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              <div className="relative group h-20 flex items-center" 
                   onMouseEnter={() => setIsProgramsOpen(true)} 
                   onMouseLeave={() => setIsProgramsOpen(false)}>
                <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
                  Programs <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isProgramsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isProgramsOpen && (
                  <div className="absolute top-full left-0 w-[320px] bg-[#0f172a] border border-white/10 shadow-2xl rounded-2xl py-6 animate-in fade-in slide-in-from-top-2">
                    <div className="px-6 mb-4 text-[10px] font-black text-blue-500 uppercase tracking-widest">InternX Ecosystem</div>
                    {programs.map((item) => (
                      <Link key={item.name} href={item.href} className="flex flex-col px-6 py-3 hover:bg-white/5 group transition-colors">
                        <span className="text-sm font-bold text-slate-200 group-hover:text-blue-400">{item.name}</span>
                        <span className="text-[10px] text-slate-500">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="px-4 py-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-slate-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden md:block bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95">
              <Link href="/b2c/login">Sign In</Link>
            </button>
            
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-white bg-white/5 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-[#0a0a0a] animate-in slide-in-from-right duration-500 overflow-y-auto">
          <div className="p-6 flex flex-col min-h-screen">
            <div className="flex justify-between items-center mb-12">
              <div className="relative w-[120px] h-[30px]">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-full">
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              <div className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em]">InternX Programs</div>
              <div className="grid gap-4">
                {programs.map(p => (
                  <Link key={p.name} href={p.href} onClick={() => setIsMobileMenuOpen(false)} className="group flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div>
                      <div className="text-lg font-bold text-white">{p.name}</div>
                      <div className="text-xs text-slate-500">{p.desc}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
              
              <div className="h-[1px] bg-white/10 my-4"></div>
              
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-2xl font-bold text-white hover:text-blue-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-12 flex flex-col gap-4">
              <Link href="/b2c/login"><button className="w-full py-4 rounded-2xl bg-white/5 text-white font-bold uppercase tracking-widest text-xs">Login</button></Link>
            </div>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl p-6 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <button onClick={() => setIsSearchOpen(false)} className="absolute top-10 right-10 text-slate-400 hover:text-white transition-colors">
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <input 
                autoFocus 
                className="w-full bg-transparent border-b-2 border-white/10 py-6 text-xl md:text-2xl text-white outline-none focus:border-blue-500 font-light transition-all"
                placeholder="Ask about internships..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-500 hover:scale-110 transition-transform">
                <Sparkles className={`w-8 h-8 ${isSearching ? 'animate-pulse' : ''}`} />
              </button>
            </form>
            {searchResult && (
              <div className="mt-12 p-8 rounded-3xl bg-blue-600/10 border border-blue-500/20 animate-in slide-in-from-bottom-4">
                <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">AI Guidance</p>
                <p className="text-slate-200 text-base md:text-lg leading-relaxed italic">"{searchResult}"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}