// components/freelancex/Navbar.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/freelancex/logo/logo';

const NAV_LINKS = [
  { name: 'Features',  href: '/freelancex/features'      },
  { name: 'Clients',   href: '/freelancex/ai-employers'  },
  { name: 'AI Test',   href: '/freelancex/ai-test'       },
  { name: 'Reports',   href: '/freelancex/reports'       },
];

const API_BASE = process.env.NEXT_PUBLIC_FREELANCEX_API_URL || 'https://clc-products-real-backend.vercel.app';

interface FreelancexUser {
  id:         string;
  email:      string;
  role:       'FREELANCER' | 'CLIENT';
  isVerified: boolean;
  freelancerProfile?: { fullName: string } | null;
  clientProfile?:     { companyName: string | null } | null;
}

/* ── Animation helpers ─────────────────────── */
const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
  exit:   { opacity: 0, height: 0,       transition: { duration: 0.25 } },
};

const dropdownVariants = {
  hidden:  { opacity: 0, y: -8, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const } },
  exit:    { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.15 } },
};

export default function FreelancexNavbar() {
  const router = useRouter();
  const [isOpen,    setIsOpen]    = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [user,      setUser]      = useState<FreelancexUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ── Scroll listener ─────────────────────── */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Auth check ──────────────────────────── */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/freelancex/auth/me`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  /* ── Close dropdown on outside click ─────── */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ── Logout ──────────────────────────────── */
  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/freelancex/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch {}
    setUser(null);
    setDropdownOpen(false);
    router.push('/freelancex');
  };

  /* ── Derived display values ──────────────── */
  const displayName =
    user?.freelancerProfile?.fullName ||
    user?.clientProfile?.companyName ||
    user?.email ||
    '';

  const avatarLetter = (displayName.charAt(0) || user?.email?.charAt(0) || '?').toUpperCase();

  const dashboardHref =
    user?.role === 'CLIENT'
      ? '/freelancex/dashboard/client'
      : '/freelancex/dashboard/freelancer';

  /* ── Link & button color classes ─────────── */
  const linkClass = scrolled
    ? 'text-slate-600 hover:text-blue-600'
    : 'text-slate-400 hover:text-white';

  return (
    <header
      className={`fixed left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
        scrolled ? 'top-0 px-0' : 'top-4 px-4 sm:px-6 lg:px-8'
      }`}
    >
      <nav
        className={`max-w-7xl mx-auto transition-all duration-500 ease-in-out ${
          scrolled
            ? 'max-w-full rounded-none bg-white border-b border-slate-200 shadow-md px-8'
            : 'bg-[#020617]/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl px-6'
        }`}
        aria-label="Main Navigation"
      >
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div>
            <Logo isSticky={scrolled} />
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${linkClass}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side: auth controls */}
          <div className="flex items-center gap-4">
            {!userLoading && (
              user ? (
                /* ── Authenticated: avatar + dropdown ── */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 border transition-all ${
                      scrolled
                        ? 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {/* Avatar circle */}
                    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-black uppercase select-none">
                      {avatarLetter}
                    </div>
                    <span className={`hidden sm:block text-[11px] font-black max-w-[120px] truncate ${scrolled ? 'text-slate-700' : 'text-slate-200'}`}>
                      {displayName}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''} ${scrolled ? 'text-slate-500' : 'text-slate-400'}`}
                    />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden" animate="visible" exit="exit"
                        className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0d1117] border border-white/10 shadow-2xl overflow-hidden py-1 z-50"
                      >
                        {/* Role badge */}
                        <div className="px-4 py-3 border-b border-white/5">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Signed in as</p>
                          <p className="text-xs font-bold text-white truncate mt-0.5">{user.email}</p>
                          <span className={`inline-flex mt-1.5 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                            user.role === 'CLIENT'
                              ? 'text-blue-400 bg-blue-500/10 border-blue-500/20'
                              : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
                          }`}>
                            {user.role === 'CLIENT' ? 'Client' : 'Freelancer'}
                          </span>
                        </div>

                        <Link
                          href={dashboardHref}
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                          Dashboard
                        </Link>

                        {user.role === 'CLIENT' && (
                          <Link
                            href="/freelancex/client/gigs"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                          >
                            <Briefcase className="w-4 h-4 text-slate-400" />
                            My Gigs
                          </Link>
                        )}

                        <div className="border-t border-white/5 mt-1" />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* ── Unauthenticated: login + signup ── */
                <>
                  <Link
                    href="/freelancex/login"
                    className={`hidden sm:block text-[11px] font-black uppercase tracking-widest transition-colors ${linkClass}`}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/freelancex/signup"
                    className={`px-5 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 flex items-center justify-center ${
                      scrolled
                        ? 'bg-[#0f172a] text-white hover:bg-blue-700'
                        : 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500'
                    }`}
                  >
                    Sign up
                  </Link>
                </>
              )
            )}

            {/* Hamburger */}
            <button
              className={`md:hidden p-1 transition-colors ${scrolled ? 'text-[#0f172a]' : 'text-white'}`}
              onClick={() => setIsOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ─────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden" animate="visible" exit="exit"
              className={`md:hidden border-t overflow-hidden ${
                scrolled ? 'border-slate-100 bg-white' : 'border-white/10'
              }`}
            >
              <div className="flex flex-col p-6 gap-5 text-center">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-xs font-black uppercase tracking-[0.3em] ${
                      scrolled ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className={`h-px w-full ${scrolled ? 'bg-slate-100' : 'bg-white/10'}`} />

                {user ? (
                  <>
                    <Link
                      href={dashboardHref}
                      onClick={() => setIsOpen(false)}
                      className={`text-xs font-black uppercase tracking-widest py-2 ${scrolled ? 'text-[#0f172a]' : 'text-white'}`}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="text-xs font-black uppercase tracking-widest py-2 text-red-400"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/freelancex/login"
                      onClick={() => setIsOpen(false)}
                      className={`text-xs font-black uppercase tracking-widest py-2 ${scrolled ? 'text-[#0f172a]' : 'text-white'}`}
                    >
                      Log In
                    </Link>
                    <Link
                      href="/freelancex/signup"
                      onClick={() => setIsOpen(false)}
                      className="text-xs font-black uppercase tracking-widest py-2 text-indigo-400"
                    >
                      Create Profile
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}