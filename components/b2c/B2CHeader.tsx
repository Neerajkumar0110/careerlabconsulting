'use client';

import React, { useState } from 'react';
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
      { name: 'InternX-AI Developer', href: '/b2c/internx-ai-engineer' },
      { name: 'InternX-Data Engineer', href: '/b2c/internx-data-engineer' },
      { name: 'InternX-AI Quality & Safety Engineer', href: '/b2c/internx-ai-quality-safety-engineer' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    programs: [{ name: 'InternX-Cloud & AI Engineer', href: '/b2c/internx-cloud-ai-engineer' }],
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    icon: Shield,
    programs: [{ name: 'InternX-Cyber Security Expert', href: '/b2c/internx-cyber-security-expert' }],
  },
  {
    id: 'blockchain',
    title: 'Blockchain & Web3',
    icon: Blocks,
    programs: [{ name: 'InternX-Blockchain Developer', href: '/b2c/internx-blockchain-developer' }],
  },
  {
    id: 'product',
    title: 'Product & Growth',
    icon: TrendingUp,
    programs: [
      { name: 'InternX-AI Product Manager', href: '/b2c/internx-ai-product-manager' },
      { name: 'InternX-AI Marketing Specialist', href: '/b2c/internx-ai-marketing-specialist' },
    ],
  },
  {
    id: 'industry',
    title: 'Industry-Specific AI',
    icon: Building2,
    programs: [
      { name: 'InternX-FinTech AI Specialist', href: '/b2c/internx-fintech-ai-specialist' },
      { name: 'InternX-HealthTech AI Specialist', href: '/b2c/internx-healthtech-ai-specialist' },
    ],
  },
  {
    id: 'robotics',
    title: 'Robotics, IoT & Automation',
    icon: Bot,
    programs: [
      { name: 'InternX-Robotics Engineer', href: '/b2c/internx-robotics-engineer' },
      { name: 'InternX-AI & IoT Engineer', href: '/b2c/internx-ai-iot-engineer' },
      { name: 'InternX-Drone & Automation Engineer', href: '/b2c/internx-drone-automation-engineer' },
    ],
  },
  {
    id: 'future',
    title: 'Advanced Future Tech',
    icon: Rocket,
    programs: [
      { name: 'InternX-Humanoid Robotics Engineer', href: '/b2c/internx-humanoid-robotics-engineer' },
      { name: 'InternX-Smart Mobility Engineer', href: '/b2c/internx-smart-mobility-engineer' },
      { name: 'InternX-XR & AI Developer', href: '/b2c/internx-xr-ai-developer' },
    ],
  },
];

const navLinks = [
  { name: 'Masterclass', href: '/b2c/masterclass' },
  { name: 'Alumni', href: '/b2c/alumni' },
  { name: 'Research', href: '/b2c/research' },
  { name: 'Advisory Council', href: '/b2c/advisory-council' },
  { name: 'Freelancer', href: '#' },
  { name: 'Job Portal', href: '#' },
];

export default function B2CHeader() {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(megaMenuCategories[0]);
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
      setSearchResult(
        `Our InternX ${searchQuery} program focuses on industry-grade practical deployment. Applications for the next cohort are now open.`
      );
      setIsSearching(false);
    }, 800);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/b2c" className="relative w-[150px] h-[40px]">
              <Image src="/logo.png" alt="Career Lab Logo" fill className="object-contain" priority />
            </Link>

            <nav className="hidden lg:flex items-center gap-2">
              <div
                className="relative h-20 flex items-center"
                onMouseEnter={() => setIsProgramsOpen(true)}
                onMouseLeave={() => setIsProgramsOpen(false)}
              >
                <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white">
                  Internship
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${isProgramsOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isProgramsOpen && (
  <>
    {/* BACKDROP */}
    <div className="fixed inset-0 top-20 bg-black/60 z-[90]" />

    {/* MEGA MENU */}
    <div className="fixed left-0 right-0 top-20 z-[95] flex justify-center px-6">
      <div className="w-full max-w-[1200px] bg-[#0b0f1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* HEADER */}
        <div className="px-8 py-5 border-b border-white/10">
          <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest">
            InternX Product Portfolio
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Choose your career path in AI & future-tech
          </p>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-[260px_1fr] min-h-[420px]">
          
          {/* LEFT – CATEGORIES */}
          <div className="border-r border-white/10 p-4 space-y-1 bg-[#0a0d16]">
            {megaMenuCategories.map((cat) => {
              const Icon = cat.icon;
              const active = activeCategory.id === cat.id;

              return (
                <button
                  key={cat.id}
                  onMouseEnter={() => setActiveCategory(cat)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition
                    ${
                      active
                        ? 'bg-blue-600/20 text-white'
                        : 'text-slate-400 hover:bg-white/5'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {cat.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-6">
            <h4 className="text-xs uppercase tracking-widest text-blue-400 font-black mb-4">
              {activeCategory.title} Programs
            </h4>

            <div className="grid grid-cols-2 gap-4">
              {activeCategory.programs.map((p) => (
                <Link
                  key={p.name}
                  href={p.href}
                  className="group p-4 rounded-xl border border-white/10 hover:border-blue-500/40 hover:bg-blue-500/10 transition"
                >
                  <p className="text-sm font-semibold text-white group-hover:text-blue-400">
                    {p.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Industry-grade internship
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 py-4 border-t border-white/10 flex justify-between items-center bg-[#0a0d16]">
          <p className="text-sm text-slate-400">
            Not sure which program fits you?
          </p>
          <Link
            href="/b2c/program-finder"
            className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            Take Career Quiz <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </>
)}
              </div>

              {navLinks.map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white"
                >
                  {l.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 text-slate-400 hover:text-white">
              <Search className="w-5 h-5" />
            </button>

            <Link
              href="/b2c/login"
              className="hidden md:block bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest"
            >
              Sign In
            </Link>

            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-white/5 rounded-lg">
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-[#0a0a0a] overflow-y-auto">
          <div className="p-6 min-h-screen flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <Image src="/logo.png" alt="Logo" width={120} height={30} />
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="space-y-3">
              {megaMenuCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <details key={cat.id} className="border border-white/10 rounded-xl">
                    <summary className="flex justify-between items-center px-4 py-4 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold text-white">{cat.title}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </summary>
                    <div className="px-4 pb-4 space-y-2">
                      {cat.programs.map((p) => (
                        <Link
                          key={p.name}
                          href={p.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-sm text-slate-300 hover:text-blue-400"
                        >
                          {p.name}
                        </Link>
                      ))}
                    </div>
                  </details>
                );
              })}

              <div className="border-t border-white/10 my-4" />

              {navLinks.map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-bold text-white py-2"
                >
                  {l.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6">
          <button onClick={() => setIsSearchOpen(false)} className="absolute top-8 right-8">
            <X className="w-8 h-8 text-white" />
          </button>

          <div className="w-full max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask about internships..."
                className="w-full bg-transparent border-b-2 border-white/10 py-6 text-2xl text-white outline-none focus:border-blue-500"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2">
                <Sparkles className={`w-8 h-8 text-blue-500 ${isSearching ? 'animate-pulse' : ''}`} />
              </button>
            </form>

            {searchResult && (
              <div className="mt-10 p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20">
                <p className="text-slate-200 italic">"{searchResult}"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}