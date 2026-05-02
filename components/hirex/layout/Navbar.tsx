// // hirex/Navbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, LayoutDashboard, LogOut, Menu, X, Zap, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../logo';

const API_BASE = process.env.NEXT_PUBLIC_HIREX_API_URL || 'https://clc-products-real-backend.vercel.app';

const NAV_LINKS = [
  { name: 'Jobs', href: '/hirex/jobs' },
  { name: 'Companies', href: '/hirex/companies' },
  { name: 'AI Tests', href: '/hirex/ai-skill-tests' },
  { name: 'Insights', href: '/hirex/hiring-insights' },
];

export default function HireXNavbar({ activePage }: { activePage?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/hirex/auth/me`, { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(d => setUser(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch(`${API_BASE}/api/hirex/auth/logout`, { method: 'POST', credentials: 'include' });
    setUser(null);
    window.location.href = '/hirex';
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`fixed left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
      scrolled ? 'top-0 px-0' : 'top-4 px-4 sm:px-6 lg:px-8'
    }`}>
      <nav className={`max-w-7xl mx-auto transition-all duration-500 ease-in-out ${
        scrolled
          ? 'max-w-full rounded-none bg-[#020617]/95 border-b border-white/8 shadow-xl shadow-black/40 backdrop-blur-2xl px-8'
          : 'bg-[#020617]/50 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl shadow-black/30 px-6'
      }`}>
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
             <Logo isSticky={scrolled} />
          

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activePage === link.name || (typeof window !== 'undefined' && window.location.pathname === link.href);
              return (
                <Link key={link.name} href={link.href}
                  className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all rounded-xl ${
                    isActive
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            {!loading && (
              user ? (
                <>
                  {user.role === 'RECRUITER' && (
                    <Link href="/hirex/jobs/new"
                      className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-400 hover:bg-blue-500 text-white font-black text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-blue-900/30"
                    >
                      <span>Post Job</span>
                    </Link>
                  )}

                  <div className="relative" ref={dropdownRef}>
                    <button onClick={() => setDropdownOpen(o => !o)}
                      className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center text-white text-xs font-black uppercase shadow-inner">
                        {user?.name?.charAt(0) || user?.email?.charAt(0)}
                      </div>
                      <span className="hidden sm:block text-[11px] font-bold text-slate-200 max-w-[100px] truncate">
                        {user?.name || user?.email}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.18 }}
                          className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#071428] border border-white/10 shadow-2xl overflow-hidden py-1 z-50"
                        >
                          <div className="px-4 py-3 border-b border-white/5">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Signed in as</p>
                            <p className="text-xs font-bold text-white truncate mt-0.5">{user.email}</p>
                            <p className="text-[10px] text-blue-400 font-semibold mt-0.5 capitalize">{user.role?.toLowerCase()}</p>
                          </div>
                          <Link
                            href={user.role === 'RECRUITER' ? '/hirex/dashboard/recruiter' : '/hirex/dashboard/candidate'}
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <LayoutDashboard className="w-4 h-4 text-blue-400" />Dashboard
                          </Link>
                          <div className="border-t border-white/5 mt-1" />
                          <button onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all"
                          >
                            <LogOut className="w-4 h-4" />Sign Out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/hirex/login"
                    className="hidden sm:block text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors px-3 py-2"
                  >Log in</Link>
                  <Link href="/hirex/signup"
                    className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-black text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-blue-900/30"
                  >Sign up</Link>
                </>
              )
            )}

            <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/8 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-1">
                {NAV_LINKS.map((link) => (
                  <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  >{link.name}</Link>
                ))}
                <div className="h-px bg-white/8 my-2" />
                {!user && (
                  <Link href="/hirex/login" className="px-4 py-3 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                    Log in
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}