'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Service {
  title: string;
  description: string;
  category: string;
  keywords: string[];
}

interface DropdownItem {
  name: string;
  href: string;
}

export default function Navbar({ portal = 'B2B' }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Partial<Service>[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const productItems: DropdownItem[] = [
    { name: 'AI Voice', href: '/products/ai-voice' }, { name: 'AI CRM', href: '/products/ai-crm' },
    { name: 'AI HRMS', href: '/products/ai-hrms' }, { name: 'AI ERP', href: '/products/ai-erp' },
    { name: 'AI LMS', href: '/products/ai-lms' }, { name: 'AI TwinX', href: '/products/ai-twinx' }
  ];

  const serviceItems: DropdownItem[] = [
    { name: 'Generative AI Development', href: '/services/generative-ai-development' }, { name: 'AI Agent Development', href: '/services/ai-agent-development' },
    { name: 'Data Engineering', href: '#' }, { name: 'Cybersecurity', href: '#' }
  ];

  const industryItems: DropdownItem[] = [
    { name: 'Finance', href: '#' }, { name: 'Healthcare', href: '#' },
    { name: 'Manufacturing', href: '#' }, { name: 'Retail', href: '#' }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
          handleSearch(transcript);
          setIsListening(false);
        };
        recognitionRef.current.onerror = () => setIsListening(false);
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setSearchOpen(false);
      if (!(event.target as HTMLElement).closest('.nav-item')) setActiveDropdown(null);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) { console.error(e); }
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    const query_lower = query.toLowerCase();
    
    const allServices: Service[] = [
      { title: 'AI Voice', description: 'Intelligent Voice Automation & Communication Platform', category: 'B2B SaaS', keywords: ['voice', 'call'] },
      { title: 'AI LMS', description: '360° Reports & AI Tutors Deployment', category: 'B2B SaaS', keywords: ['lms', 'learning'] },
      { title: 'AI CRM', description: 'Voice Verser & Real-Quality Avatars', category: 'B2B SaaS', keywords: ['crm', 'sales'] },
      { title: 'AI HRMS', description: 'Autonomous Payroll & Hiring Agents', category: 'B2B SaaS', keywords: ['hrms', 'hr'] },
      { title: 'InternX-AI', description: 'Master Machine Learning & Deep Learning', category: 'B2C Internship', keywords: ['intern', 'ai'] }
    ];

    const matched = allServices.filter(s => 
      s.title.toLowerCase().includes(query_lower) || 
      s.keywords.some(k => k.includes(query_lower))
    ).slice(0, 5);

    setTimeout(() => {
      setSearchResults(matched);
      setIsLoading(false);
    }, 300); 
  };

  return (
    <>
      <nav className="flex justify-between items-center px-4 md:px-10 border-b border-slate-800 sticky top-0 bg-[#020617]/95 backdrop-blur-xl z-[90] h-20">
        <div className="flex items-center gap-8 h-full">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={180} height={40} className="h-10 w-auto" priority />
          </Link>
          
          <div className="hidden xl:flex gap-6 text-sm font-medium text-slate-400 h-full">
            {[
              { title: 'Products', items: productItems },
              { title: 'Services', items: serviceItems },
              { title: 'Industries', items: industryItems }
            ].map((menu) => (
              <div key={menu.title} className="nav-item relative flex items-center h-full" onMouseEnter={() => setActiveDropdown(menu.title)}>
                <button className={`flex items-center gap-1 hover:text-blue-400 transition py-5 ${activeDropdown === menu.title ? 'text-blue-400' : ''}`}>
                  {menu.title} <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {activeDropdown === menu.title && (
                  <div className="absolute top-full left-0 w-64 bg-[#0f172a] border border-slate-800 rounded-xl shadow-2xl py-3 z-[100] animate-in fade-in slide-in-from-top-2">
                    {menu.items.map((item, idx) => (
                      <Link key={idx} href={item.href} className="block px-5 py-2.5 hover:text-blue-400 hover:bg-slate-800/50 transition text-sm">{item.name}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/case-studies" className="hover:text-blue-400 transition flex items-center">Case Studies</Link>
            <Link href="/insights" className="hover:text-blue-400 transition flex items-center">Insights</Link>
            <Link href="/work" className="hover:text-blue-400 transition flex items-center">Work</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setSearchOpen(true)} className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-blue-500 transition-all">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <Link href={portal === 'B2B' ? '/b2c' : '/b2b'}>
          <button className="hidden sm:block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg">{portal === 'B2B' ? 'Get Internship' : 'Enterprise'}</button>
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden p-2 text-slate-400">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-20 bg-[#020617] z-[95] p-6 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {[{ title: 'Products', items: productItems }, { title: 'Services', items: serviceItems }, { title: 'Industries', items: industryItems }].map((menu) => (
              <div key={menu.title} className="border-b border-white/5 py-2">
                <button onClick={() => setMobileDropdown(mobileDropdown === menu.title ? null : menu.title)} className="w-full flex justify-between items-center text-slate-200 text-lg py-2">
                  {menu.title}
                  <svg className={`w-4 h-4 transition-transform ${mobileDropdown === menu.title ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {mobileDropdown === menu.title && (
                  <div className="pl-4 flex flex-col gap-3 mt-2 mb-4 animate-in slide-in-from-top-1">
                    {menu.items.map((item, idx) => <Link key={idx} href={item.href} className="text-slate-500 text-base">{item.name}</Link>)}
                  </div>
                )}
              </div>
            ))}
            <Link href="/case-studies" className="text-slate-200 text-lg py-4 border-b border-white/5">Case Studies</Link>
            <Link href="/insights" className="text-slate-200 text-lg py-4 border-b border-white/5">Insights</Link>
            <Link href="/work" className="text-slate-200 text-lg py-4 border-b border-white/5">Work</Link>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-start justify-center pt-20 px-4">
          <div ref={searchRef} className="w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3 p-4 border-b border-white/5">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => {setSearchQuery(e.target.value); handleSearch(e.target.value);}}
                placeholder="Search AI services, internships..."
                className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-600"
              />
              <button onClick={toggleVoiceSearch} className={`p-2 rounded-lg transition-all ${isListening ? 'bg-red-500 animate-pulse text-white' : 'bg-slate-800 text-slate-400'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {isLoading ? (
                <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-3">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  AI is searching...
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((result, idx) => (
                  <div key={idx} className="p-4 hover:bg-white/5 rounded-xl transition-all cursor-pointer group mb-1 flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-600 group-hover:text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-semibold group-hover:text-blue-400">{result.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full">{result.category}</span>
                      </div>
                      <p className="text-slate-400 text-sm">{result.description}</p>
                    </div>
                  </div>
                ))
              ) : searchQuery && (
                <div className="p-12 text-center text-slate-600">No results found for "{searchQuery}"</div>
              )}
              {!searchQuery && (
                <div className="p-6">
                  <p className="text-slate-500 text-xs mb-3 uppercase tracking-wider">Suggested</p>
                  <div className="flex flex-wrap gap-2">
                    {['Voice AI', 'Internships', 'CRM', 'Cyber'].map(t => <button key={t} onClick={() => {setSearchQuery(t); handleSearch(t);}} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-full text-xs hover:bg-blue-600 transition">{t}</button>)}
                  </div>
                </div>
              )}
            </div>
            <div className="p-3 border-t border-white/5 text-[10px] text-slate-600 text-center uppercase tracking-widest">Press ESC to exit</div>
          </div>
        </div>
      )}
    </>
  );
}