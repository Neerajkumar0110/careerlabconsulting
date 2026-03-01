'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, Home, Search, User, Briefcase, 
  Activity, Zap, Globe, Cpu, Layers, LayoutGrid, 
  Users, CreditCard, Network 
} from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from '@/components/hirex/logo';

const ECOSYSTEM_NODES = [
  { name: 'AI Talent Node', icon: Cpu, desc: 'Verification Engine' },
  { name: 'Global Network', icon: Globe, desc: 'Cross-border Sync' },
  { name: 'Neural Ledger', icon: Layers, desc: 'Immutable Records' },
  { name: 'Quantum Match', icon: Zap, desc: 'Instant Fit Analysis' },
  { name: 'Secure Vault', icon: ShieldCheck, desc: 'Data Protection' },
  { name: 'Skill Matrix', icon: Activity, desc: 'Dynamic Profiling' },
];

const FOOTER_LINKS = {
  Infrastructure: [
    { name: 'AI Skill Tests', href: '/hirex/ai-skill-tests' },
    { name: '360° Reports', href: '/hirex/360-reports' },
    { name: 'Employer Grades', href: '/hirex/employer-grades' },
    { name: 'Job Inventory', href: '/hirex/job-inventory' },
  ],
  Organization: [
    { name: 'About CLC', href: '/hirex/about' },
    { name: 'Contact CLC', href: '/hirex/contact' },
    { name: 'Privacy Policy', href: '/hirex/privacy-policy' },
    { name: 'Terms of Service', href: '/hirex/terms-of-service' },
  ],
  Intelligence: [
    { name: 'Documentation', href: '/hirex/documentation' },
    { name: 'Career Prep', href: '/hirex/career-prep' },
    { name: 'Hiring Insights', href: '/hirex/hiring-insights' },
    { name: 'Support', href: '/hirex/support' },
  ],
  Ecosystem: [
    { name: 'Neural Ledger', href: '/hirex/neural-ledger' },
    { name: 'Talent Nodes', href: '/hirex/talent-nodes' },
    { name: 'Global Sync', href: '/hirex/global-sync' },
    { name: 'Verification API', href: '/hirex/verification-api' },
  ],
  Solutions: [
    { name: 'Enterprise', href: '/hirex/enterprise' },
    { name: 'Startups', href: '/hirex/startups' },
    { name: 'Academic', href: '/hirex/academic' },
    { name: 'Government', href: '/hirex/government' },
  ],
  Legal: [
    { name: 'Data Security', href: '/hirex/data-security' },
    { name: 'GDPR Compliance', href: '/hirex/gdpr-compliance' },
    { name: 'Audit Logs', href: '/hirex/audit-logs' },
    { name: 'Ethics Policy', href: '/hirex/ethics-policy' },
  ],
};

const HIREX_PAGES = [
  { name: 'Global', icon: CreditCard, href: '/hirex/global' },
  { name: 'Candidate', icon: User, href: '/hirex/candidate' },
  { name: 'Employer', icon: Briefcase, href: '/hirex/employer' },
  { name: 'Alumni Network', icon: Network, href: '/hirex/alumni-network' },
  { name: 'Talent Pool', icon: Users, href: '/hirex/talent-pool' },
  { name: 'System Status', icon: Activity, href: '/hirex/system-status' },
  { name: 'Verification', icon: ShieldCheck, href: '/hirex/verification' },
  { name: 'Search Engine', icon: Search, href: '/hirex/search-engine' },
];

const SOCIAL_ICONS = [
  { name: 'Facebook', src: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png', color: 'hover:border-[#1877F2]/50' },
  { name: 'X', src: 'https://cdn-icons-png.flaticon.com/512/5969/5969020.png', color: 'hover:border-white/50' },
  { name: 'Instagram', src: 'https://cdn-icons-png.flaticon.com/512/3955/3955024.png', color: 'hover:border-[#E4405F]/50' },
  { name: 'LinkedIn', src: 'https://cdn-icons-png.flaticon.com/512/145/145807.png', color: 'hover:border-[#0A66C2]/50' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="relative bg-[#020617] border-t border-white/5 pt-20 pb-24 md:pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <Logo />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">HireX System Active</span>
                </div>
                <p className="text-slate-400 text-[10px] font-medium leading-relaxed max-w-xs uppercase tracking-tighter">
                  The world&apos;s first autonomous verification ecosystem. <br />
                  <span className="text-white font-black italic">MANEE PRO 2.5 NATIVE SYNC</span>
                </p>
              </div>

              <div className="flex gap-3">
                {SOCIAL_ICONS.map((social) => (
                  <Link key={social.name} href="#" className={`w-10 h-10 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center transition-all ${social.color} hover:-translate-y-1`}>
                    <Image src={social.src} alt={social.name} width={20} height={20} className="opacity-60 hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              {ECOSYSTEM_NODES.map((node) => (
                <div key={node.name} className="group p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-crosshair">
                  <node.icon className="w-5 h-5 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="text-[10px] font-black text-white uppercase tracking-wider">{node.name}</h5>
                  <p className="text-[8px] text-slate-500 uppercase mt-1 tracking-widest">{node.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 py-12 border-t border-white/5">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="lg:col-span-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500/70 mb-6">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-[11px] font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-all hover:pl-1">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-widest text-slate-500">
              <span>© 2015 - {currentYear} CLC HIREX</span>
              <div className="flex items-center gap-2 text-blue-500/80">
                <ShieldCheck size={12} />
                <span>Security Protocol: AES-X</span>
              </div>
            </div>
            
            <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-4 md:mb-0">
              AI Dev by <span className="text-white hover:text-blue-400 cursor-pointer transition-colors underline underline-offset-4 decoration-blue-500">Career Lab Consulting</span>
            </div>
          </div>
        </div>
      </footer>

      <nav className="md:hidden fixed bottom-6 left-6 right-6 z-[100] h-18 bg-[#020617]/90 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] flex items-center justify-around px-4">
        {[
          { Icon: Home, label: 'Home', href: '/' },
          { Icon: Briefcase, label: 'Jobs', href: '#reports' },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1.5 text-slate-400 active:text-blue-500 group">
            <item.Icon size={18} className="group-active:scale-125 transition-transform" />
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          </Link>
        ))}
        
        <Link 
          href="https://wa.me/918368436412" 
          target="_blank"
          rel="noopener noreferrer" 
          className="relative -translate-y-8 w-16 h-16"
        >
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
          <div className="relative w-full h-full bg-[#020617] rounded-full p-0.5 border border-white/10">
            <div className="w-full h-full bg-white rounded-full p-2 flex items-center justify-center">
              <Image 
                src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png"
                alt="Support"
                width={45}
                height={45}
                className="object-contain"
              />
            </div>
          </div>
        </Link>

        {[
          { Icon: Search, label: 'Tests', href: '#test' },
          { Icon: User, label: 'Profile', href: '#' },
        ].map((item) => (
          <Link key={item.label} href={item.href} className="flex flex-col items-center gap-1.5 text-slate-400 active:text-blue-500">
            <item.Icon size={18} />
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}