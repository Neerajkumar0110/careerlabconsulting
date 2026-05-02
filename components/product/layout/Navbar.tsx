'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, X, Menu, ChevronDown, Zap,
  Package, Layers, Cpu, CheckCircle2, ChevronRight, ArrowRight, Monitor, Mic, Sparkles,
  MessageSquare, TrendingUp, BookOpen, GraduationCap, Bot, Scale, BarChart2, Users, HeadphonesIcon
} from 'lucide-react';

const singleProducts = [
  { name: 'Manee', subtitle: 'AI Communication Officer', desc: 'Omni-channel AI handling voice, mail & chat', href: '/products/manee', icon: MessageSquare, color: 'from-violet-500 to-purple-600' },
  { name: 'CRM-X', subtitle: 'Autonomous Growth Engine', desc: 'Marketing, sales & content automation', href: '/products/crm', icon: TrendingUp, color: 'from-blue-500 to-cyan-500' },
  { name: 'LMS-X', subtitle: 'Immersive Learning System', desc: 'AR/VR learning + AI mentor + code editor', href: '/products/lms', icon: BookOpen, color: 'from-emerald-500 to-teal-500' },
  { name: 'EduX', subtitle: 'AI Academic Infrastructure', desc: 'ERP + CRM + LMS for institutions', href: '/products/edux', icon: GraduationCap, color: 'from-amber-500 to-orange-500' },
  { name: 'TwinX', subtitle: 'AI Executive Assistant', desc: 'Role-based intelligent business assistant', href: '/products/twinx', icon: Bot, color: 'from-pink-500 to-rose-500' },
  { name: 'LegalOS', subtitle: 'Autonomous Legal System', desc: 'Contracts, compliance & documentation AI', href: '/products/legalos', icon: Scale, color: 'from-slate-400 to-slate-600' },
  { name: 'ErpX', subtitle: 'Autonomous Finance Suite', desc: 'AI-powered finance & accounting automation', href: '/products/erpx', icon: BarChart2, color: 'from-indigo-500 to-blue-600' },
  { name: 'HrX', subtitle: 'AI Hiring & Talent Engine', desc: 'AI interviews with virtual avatars', href: '/products/hrx', icon: Users, color: 'from-fuchsia-500 to-violet-500' },
  { name: 'SuppX', subtitle: 'AI Support Intelligence', desc: 'Omnichannel autonomous support system', href: '/products/suppx', icon: HeadphonesIcon, color: 'from-cyan-500 to-sky-500' },
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchResults, setSearchResults] = useState<any>({ products: [] });
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { setIsMounted(true); }, []);

  const avatars = useMemo(() => [
    { src: "https://img.freepik.com/free-photo/writing-dairy-note-coffee-shop-concept-as-memory-life-woman-coffee-shop-smiling-woman-making-notes-notepad_1153-8262.jpg", name: "Expert 1" },
    { src: "https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg", name: "Expert 2" },
    { src: "https://img.freepik.com/free-photo/woman-trendy-summer-sundress_158538-16608.jpg", name: "Expert 3" },
  ], []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      const results = singleProducts.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.subtitle.toLowerCase().includes(lowerQuery) ||
        p.desc.toLowerCase().includes(lowerQuery)
      );
      setSearchResults({ products: results.slice(0, 5) });
    } else {
      setSearchResults({ products: [] });
    }
  }, [searchQuery]);

  const handleMenuEnter = (menu: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => { setSearchQuery(event.results[0][0].transcript); setIsListening(false); };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } else {
      alert('Voice search is not supported in your browser.');
    }
  };

  const SingleProductDropdown = () => (
    <div
      className="fixed inset-x-0 top-[70px] z-[998] flex justify-center"
      onMouseEnter={() => handleMenuEnter('products')}
      onMouseLeave={handleMenuLeave}
    >
      <div className="fixed inset-0 top-[80px] bg-black/40 backdrop-blur-md" onClick={() => setActiveMenu(null)} />
      <div className="relative w-full max-w-6xl px-6 pt-4">
        <div className="bg-[#080c17] border border-white/10 rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] overflow-hidden">
          <div className="relative px-8 py-8 border-b border-white/[0.06] bg-[#060a13] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600 rounded-full blur-[100px]" />
            </div>
            <div className="relative z-10 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">Autonomous AI Products</h2>
                <p className="text-slate-400 text-sm mt-1 font-medium max-w-md">Deploy 9 specialized plug-and-play AI workforce modules designed to dominate specific business verticals.</p>
              </div>
              <Link href="/products" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] font-bold uppercase tracking-[2px] text-white hover:bg-white/[0.08] transition-all group">
                Explore Ecosystem <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-px bg-white/[0.04]">
            {singleProducts.map((product, i) => {
              const Icon = product.icon;
              return (
                <Link key={i} href={product.href} onClick={() => setActiveMenu(null)} className="group relative flex items-start gap-5 px-8 py-6 bg-[#080c17] hover:bg-[#0d1220] transition-all duration-300">
                  <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${product.color} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${product.color} p-[1px]`}>
                    <div className="w-full h-full rounded-xl bg-[#080c17] flex items-center justify-center group-hover:bg-transparent transition-colors">
                      <Icon className="w-5 h-5 text-white opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{product.name}</span>
                      <span className="text-[10px] text-blue-500/85 font-black uppercase tracking-widest group-hover:text-blue-400/80">{product.subtitle}</span>
                    </div>
                    <p className="text-[12px] text-slate-500 mt-2 leading-relaxed line-clamp-2">{product.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="px-8 py-5 bg-[#060a13] border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {avatars.map((avatar, i) => (
                  <div key={i} className="relative w-7 h-7 rounded-full border-2 border-[#060a13] overflow-hidden bg-slate-800 shadow-lg">
                    <img src={avatar.src} alt={avatar.name} className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-7 h-7 rounded-full border-2 border-[#060a13] bg-blue-600/20 backdrop-blur-sm flex items-center justify-center text-[8px] font-bold text-blue-400">+50</div>
              </div>
              <p className="text-[12px] text-slate-500 font-medium tracking-tight">Join 500+ enterprises using our AI modules.</p>
            </div>
            <Link href="/book-demo" className="text-[11px] font-bold uppercase tracking-[1.5px] text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2 group">
              Consult with an AI Expert <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const navItems = [
    { id: 'products', label: 'Single Product' },
    { id: 'combo', label: 'Combo (Any 5)', href: '/pricing/combo-starter' },
    { id: 'allinone', label: 'All-in-One', href: '/products/ai-empire' },
  ];

  return (
    <>
      {isMounted && (
        <>
          <nav className="fixed top-0 left-0 right-0 z-[1000] bg-[#020617]/95 backdrop-blur-xl border-b border-white/10 h-20">
            <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
              
              {/* Logo & Desktop Nav */}
              <div className="flex items-center gap-10 h-full">
                <Link href="/" className="flex-shrink-0" aria-label="Home">
                  <img src="/logo.png" alt="Career Lab Consulting Logo" className="object-contain h-7 w-auto" loading="eager" />
                </Link>

                <div className="hidden xl:flex items-center h-full">
                  <div className="w-px h-6 bg-white/10 mr-1" />
                  <div className="flex items-center gap-2 h-full">
                    {navItems.map((item) => (
                      <div
                        key={item.id}
                        className="relative h-full flex items-center"
                        onMouseEnter={() => item.id === 'products' && handleMenuEnter(item.id)}
                        onMouseLeave={() => item.id === 'products' && handleMenuLeave()}
                      >
                        {item.id === 'products' ? (
                          <>
                            <button className={`flex items-center gap-1.5 px-5 py-2 text-[11px] font-bold uppercase tracking-[1.5px] rounded-lg transition-all ${activeMenu === 'products' ? 'text-blue-400 bg-blue-600/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                              {item.label}
                              <ChevronDown className={`w-3 h-3 transition-transform ${activeMenu === 'products' ? 'rotate-180 text-blue-400' : ''}`} />
                            </button>
                            {activeMenu === 'products' && <SingleProductDropdown />}
                          </>
                        ) : (
                          <Link href={item.href!} className="px-5 py-2 text-[11px] font-bold uppercase tracking-[1.5px] text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                            {item.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-2 sm:gap-4">
                <button onClick={() => setIsSearchOpen(true)} className="hidden md:flex p-2 text-slate-400 hover:text-white transition-colors" aria-label="Search">
                  <Search className="w-5 h-5" />
                </button>

                {/* Updated Book Demo: Visible on mobile + desktop */}
                <Link 
                  href="/book-demo" 
                  className="relative group overflow-hidden bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-black text-[9px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] shadow-[0_8px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.45)] transition-all active:scale-95 whitespace-nowrap flex items-center justify-center"
                >
                  <span className="relative z-10">Book Demo</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="xl:hidden p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </nav>

          {/* ── Mobile Menu ── */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-[2000] bg-[#060a13] overflow-y-auto">
              <div className="p-6 min-h-screen flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} aria-label="Home">
                    <img src="/logo.png" alt="CLC Logo" className="h-7 w-auto" />
                  </Link>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/5 border border-white/10 rounded-lg" aria-label="Close menu">
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-blue-500 text-[9px] font-black uppercase tracking-[0.4em] mb-3 px-1">Single Product</p>
                    <div className="grid grid-cols-1 gap-1">
                      {singleProducts.map((p, i) => {
                        const Icon = p.icon;
                        return (
                          <Link key={i} href={p.href} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${p.color} p-[1px] flex-shrink-0`}>
                              <div className="w-full h-full rounded-lg bg-[#080c17] flex items-center justify-center transition-colors duration-200 group-hover:bg-transparent">
                                <Icon className="w-4 h-4 text-white opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
                              </div>
                            </div>
                            <div>
                              <p className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">{p.name}</p>
                              <p className="text-slate-500 text-[11px]">{p.subtitle}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    {navItems.filter((item) => item.id !== 'products').map((item) => (
                      <Link key={item.id} href={item.href!} onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl text-white font-bold text-sm hover:bg-white/5 transition-colors">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Search Overlay ── */}
          {isSearchOpen && (
            <div className="fixed inset-0 z-[2500] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6">
              <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Close search">
                <X className="w-6 h-6 text-white" />
              </button>
              <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    <h2 className="text-2xl font-black text-white">AI-Powered Search</h2>
                  </div>
                  <p className="text-slate-500 text-sm">Find any product or feature instantly</p>
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="relative">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-5 pl-14 pr-20 text-base text-white placeholder-slate-600 outline-none focus:border-blue-500/60 transition-colors" autoFocus />
                  <button type="button" onClick={handleVoiceSearch} disabled={isListening} className={`absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl transition-all cursor-pointer ${isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/40'}`} aria-label="Voice search">
                    <Mic className="w-4 h-4 text-blue-400" />
                  </button>
                </form>
                {searchQuery && (
                  <div className="mt-4 bg-[#080c17] border border-white/10 rounded-2xl overflow-hidden">
                    {searchResults.products.length === 0 ? (
                      <div className="text-center py-10">
                        <Search className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400 font-bold">No results for "{searchQuery}"</p>
                      </div>
                    ) : (
                      <div className="p-2">
                        {searchResults.products.map((item: any, idx: number) => {
                          const Icon = item.icon || Package;
                          return (
                            <Link key={idx} href={item.href} onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors group">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                                <Icon className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{item.name}</p>
                                <p className="text-[11px] text-slate-500">{item.subtitle}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 ml-auto transition-colors" />
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}