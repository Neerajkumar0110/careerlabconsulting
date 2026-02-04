'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  Search,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Cpu,
  Cloud,
  Shield,
  Blocks,
  TrendingUp,
  Building2,
  Bot,
  Rocket,
} from 'lucide-react';

const megaMenuCategories = [
  {
    id: 'ai-data',
    title: 'AI & Data',
    icon: Cpu,
    programs: [
      { name: 'InternX-AI', href: '/internship/internx-ai' },
      { name: 'InternX-Data Engineer', href: '/internship/internx-data-engineer' },
      { name: 'InternX-AI Quality & Safety Engineer', href: '/internship/internx-ai-quality-safety-engineer' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    programs: [{ name: 'InternX-Cloud & AI Engineer', href: '/internship/internx-cloud-ai-engineer' }],
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    icon: Shield,
    programs: [{ name: 'InternX-Cyber Security Expert', href: '/internship/internx-cyber-security-expert' }],
  },
  {
    id: 'blockchain',
    title: 'Blockchain & Web3',
    icon: Blocks,
    programs: [{ name: 'InternX-Blockchain Developer', href: '/internship/internx-blockchain-developer' }],
  },
  {
    id: 'product',
    title: 'Product & Growth',
    icon: TrendingUp,
    programs: [
      { name: 'InternX-AI Product Manager', href: '/internship/internx-ai-product-manager' },
      { name: 'InternX-AI Marketing Specialist', href: '/internship/internx-ai-marketing-specialist' },
    ],
  },
  {
    id: 'industry',
    title: 'Industry-Specific AI',
    icon: Building2,
    programs: [
      { name: 'InternX-FinTech AI Specialist', href: '/internship/internx-fintech-ai-specialist' },
      { name: 'InternX-HealthTech AI Specialist', href: '/internship/internx-healthtech-ai-specialist' },
    ],
  },
  {
    id: 'robotics',
    title: 'Robotics & IoT',
    icon: Bot,
    programs: [
      { name: 'InternX-Robotics Engineer', href: '/internship/internx-robotics-engineer' },
      { name: 'InternX-AI & IoT Engineer', href: '/internship/internx-ai-iot-engineer' },
      { name: 'InternX-Drone & Automation Engineer', href: '/internship/internx-drone-automation-engineer' },
    ],
  },
  {
    id: 'future',
    title: 'Advanced Future Tech',
    icon: Rocket,
    programs: [
      { name: 'InternX-Humanoid Robotics Engineer', href: '/internship/internx-humanoid-robotics-engineer' },
      { name: 'InternX-Smart Mobility Engineer', href: '/internship/internx-smart-mobility-engineer' },
      { name: 'InternX-XR & AI Developer', href: '/internship/internx-xr-ai-developer' },
    ],
  },
];

const navLinks = [
  { name: 'Masterclass', href: '/internship/masterclass' },
  { name: 'Alumni', href: '/internship/alumni' },
  { name: 'Research', href: '/internship/research' },
  { name: 'Advisory Council', href: '/internship/advisory-council' },
  { name: 'Freelancer', href: '#' },
  { name: 'Job Portal', href: '#' },
];

export default function B2CHeader() {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(megaMenuCategories[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeCategory = useMemo(() =>
    megaMenuCategories.find(cat => cat.id === activeCategoryId) || megaMenuCategories[0],
    [activeCategoryId]
  );

  // Body scroll lock for PageSpeed and UX
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsProgramsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setSearchResult(`Our InternX ${searchQuery} program results: Applications are open for the 2026 cohort.`);
      setIsSearching(false);
    }, 600);
  }, [searchQuery]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10" role="banner">
        <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-10">
            {/* SEO Optimized Logo */}
            <Link href="/" className="relative block w-[150px] h-[40px]" aria-label="Career Lab Home">
              <Image 
                src="/logo.png" 
                alt="Career Lab Consulting" 
                fill
                sizes="150px"
                priority 
                fetchPriority="high" // Critical for 100% LCP Score
                className="object-contain"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary Navigation">
              <div
                ref={navRef}
                className="relative h-20 flex items-center"
                onMouseEnter={() => setIsProgramsOpen(true)}
                onMouseLeave={() => setIsProgramsOpen(false)}
              >
                <button 
                  className="flex items-center gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-slate-300 hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                  aria-expanded={isProgramsOpen}
                  aria-haspopup="true"
                  aria-controls="mega-menu-dropdown"
                >
                  Internship
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isProgramsOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProgramsOpen && (
                  <div 
                    id="mega-menu-dropdown"
                    className="fixed left-0 right-0 top-20 z-[95] animate-in fade-in slide-in-from-top-2 duration-300"
                  >
                    <div className="absolute inset-0 bg-black/60 h-[calc(100vh-80px)] backdrop-blur-sm" aria-hidden="true" onClick={() => setIsProgramsOpen(false)} />
                    
                    <div className="relative mx-auto w-full max-w-[1200px] bg-[#0b0f1a] border border-white/10 rounded-b-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                      <div className="grid grid-cols-[280px_1fr] min-h-[480px]">
                        
                        {/* Sidebar */}
                        <aside className="bg-[#0a0d16] p-5 border-r border-white/5" role="tablist" aria-label="Internship Domains" aria-orientation="vertical">
                          <p className="px-4 mb-4 text-[10px] font-black text-blue-500 uppercase tracking-widest">Domains</p>
                          {megaMenuCategories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategoryId === cat.id;
                            return (
                              <button
                                key={cat.id}
                                role="tab"
                                id={`tab-${cat.id}`}
                                aria-selected={isActive}
                                aria-controls={`panel-${cat.id}`}
                                onMouseEnter={() => setActiveCategoryId(cat.id)}
                                onClick={() => setActiveCategoryId(cat.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500 mb-1 ${
                                  isActive ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm font-bold">{cat.title}</span>
                              </button>
                            );
                          })}
                        </aside>

                        {/* Content Area */}
                        <div 
                          className="p-10 bg-[#0b0f1a]" 
                          role="tabpanel" 
                          id={`panel-${activeCategory.id}`}
                          aria-labelledby={`tab-${activeCategory.id}`}
                        >
                          <div className="flex justify-between items-end mb-8">
                            <div>
                              <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{activeCategory.title}</p>
                              <h3 className="text-white text-2xl font-black tracking-tighter">Professional Programs</h3>
                            </div>
                            <Link href="/internship/all-programs" className="group text-xs font-black text-white hover:text-blue-400 flex items-center gap-2 transition-colors">
                              VIEW ALL CATALOG <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                          <div className="grid grid-cols-2 gap-5">
                            {activeCategory.programs.map((p) => (
                              <Link 
                                key={p.name} 
                                href={p.href} 
                                className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-blue-500/50 hover:bg-blue-600/5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                              >
                                <span className="block text-base font-bold text-white group-hover:text-blue-400 transition-colors">{p.name}</span>
                                <div className="flex items-center gap-2 mt-3">
                                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Industry Recognized</span>
                                  <div className="h-1 w-1 rounded-full bg-blue-500" />
                                  <span className="text-[10px] font-black text-blue-400/80 uppercase tracking-widest">Certified</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.map((l) => (
                <Link 
                  key={l.name} 
                  href={l.href} 
                  className="px-4 py-2 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                >
                  {l.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button 
              onClick={() => setIsSearchOpen(true)} 
              className="p-2.5 text-slate-400 hover:text-white transition-colors active:scale-90"
              aria-label="Search Programs"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/internship/login"
              className="hidden md:inline-flex bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-[0_10px_30px_rgba(37,99,235,0.2)] transition-all active:scale-95"
            >
              Portal Login
            </Link>

            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden p-2.5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - 100% Performance optimized */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col" role="dialog" aria-modal="true">
          <div className="p-6 flex justify-between items-center border-b border-white/10">
             <div className="relative w-[120px] h-[32px]">
                <Image src="/logo.png" alt="Logo" fill sizes="120px" className="object-contain" />
             </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-white"><X className="w-8 h-8" /></button>
          </div>
          <nav className="flex-1 overflow-y-auto p-6 space-y-4">
            {megaMenuCategories.map((cat) => (
              <details key={cat.id} className="group border border-white/10 rounded-2xl">
                <summary className="flex justify-between items-center px-5 py-4 cursor-pointer list-none bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <cat.icon className="w-5 h-5 text-blue-500" />
                    <span className="font-black text-white uppercase text-[10px] tracking-widest">{cat.title}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="p-4 flex flex-col gap-2 bg-black/40">
                  {cat.programs.map((p) => (
                    <Link key={p.name} href={p.href} onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-slate-400 py-2.5 pl-8 block active:text-blue-500">{p.name}</Link>
                  ))}
                </div>
              </details>
            ))}
            <div className="pt-6 grid gap-4 border-t border-white/10 mt-6">
              {navLinks.map((l) => (
                <Link key={l.name} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-black text-white uppercase tracking-tighter active:text-blue-500">{l.name}</Link>
              ))}
               <Link href="/internship/login" onClick={() => setIsMobileMenuOpen(false)} className="mt-6 text-center bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest">Portal Login</Link>
            </div>
          </nav>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <button onClick={() => setIsSearchOpen(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors" aria-label="Close">
            <X className="w-10 h-10" />
          </button>

          <div className="w-full max-w-3xl text-center">
            <form onSubmit={handleSearch} className="relative mb-12">
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to master?"
                className="w-full bg-transparent border-b-2 border-white/10 py-8 text-2xl md:text-5xl text-white outline-none focus:border-blue-500 transition-colors placeholder:text-white/5 font-black tracking-tighter"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2">
                <Sparkles className={`w-10 h-10 ${isSearching ? 'text-blue-500 animate-pulse' : 'text-blue-500/20'}`} />
              </button>
            </form>

            {searchResult && (
              <div className="p-10 rounded-[32px] bg-blue-600/10 border border-blue-500/20 text-left animate-in slide-in-from-bottom-8">
                <p className="text-2xl text-blue-100 font-bold leading-tight">"{searchResult}"</p>
                <Link href="/internship/all-programs" onClick={() => setIsSearchOpen(false)} className="mt-8 inline-flex items-center gap-3 text-blue-400 font-black uppercase text-xs tracking-widest hover:text-white">
                  Browse Catalog <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}