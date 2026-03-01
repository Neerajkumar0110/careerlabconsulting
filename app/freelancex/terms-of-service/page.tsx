'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileSignature, Handshake, ShieldAlert, 
  Wallet, Code2, Gavel, Terminal, 
  ChevronRight, AlertTriangle, Scale,
  MapPin, Phone, Mail // Added missing icons for Contact Hub
} from 'lucide-react';
// FIXED: Removed Link icon from lucide-react to avoid conflict with next/link
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const TERMS_CLAUSES = [
  {
    id: "01",
    title: "The Handshake Protocol (Acceptance)",
    icon: Handshake,
    color: "text-blue-400",
    content: (
      <>
        <p className="mb-4">By initializing a connection to the FreelanceX matrix (creating an account, deploying a sprint, or accessing the ecosystem), you enter into a legally binding contract with Career Lab Consulting. This agreement supersedes all prior communications.</p>
        <p>If your biological or corporate entity does not agree with these strict directives, you must immediately terminate your session and disconnect from our servers.</p>
      </>
    )
  },
  {
    id: "02",
    title: "Node Eligibility & Identity Integrity",
    icon: FingerprintIcon,
    color: "text-indigo-400",
    content: (
      <>
        <p className="mb-4">Access to the ecosystem is a privilege, not a right. To operate as a Talent Node or Enterprise Client, you must:</p>
        <ul className="list-disc pl-5 space-y-2 text-slate-400">
          <li>Be of legal age (18+) in your jurisdiction of operation.</li>
          <li>Provide 100% cryptographically and factually accurate identity data.</li>
          <li>Pass our AI-autonomous vetting protocols without the use of third-party proxy manipulation.</li>
        </ul>
        <p className="mt-4 text-amber-400/80 text-sm italic border-l-2 border-amber-500/50 pl-4 py-1 bg-amber-500/5">Falsifying identity or skill metrics will result in immediate permanent expulsion from the network.</p>
      </>
    )
  },
  {
    id: "03",
    title: "The Escrow Matrix (Capital Processing)",
    icon: Wallet,
    color: "text-emerald-400",
    content: (
      <>
        <p className="mb-4">To eradicate financial fraud, all capital exchanges are governed by our centralized Escrow Matrix:</p>
        <ul className="list-disc pl-5 space-y-2 text-slate-400">
          <li><strong>Deployment Funding:</strong> Clients must deposit 100% of the milestone capital into the escrow vault before a sprint begins.</li>
          <li><strong>Capital Release:</strong> Funds are automatically disbursed to the Talent Node upon algorithmic or manual verification of the delivered codebase/assets.</li>
          <li><strong>Dispute Arbitration:</strong> In the event of a protocol breakdown, our internal tribunal will review the codebase and mandate a final, non-negotiable ruling.</li>
        </ul>
      </>
    )
  },
  {
    id: "04",
    title: "Intellectual Property Sovereignty",
    icon: Code2,
    color: "text-purple-400",
    content: (
      <>
        <p className="mb-4">FreelanceX enforces strict IP transfer protocols. Upon the successful release of escrow funds:</p>
        <p className="mb-4">All intellectual property rights, source code, designs, and architectural blueprints are immediately and irrevocably transferred from the Talent Node to the Enterprise Client. The Talent Node retains zero ownership or licensing rights unless explicitly codified in a separate NDA/Contract.</p>
      </>
    )
  },
  {
    id: "05",
    title: "Circumvention & Network Expulsion",
    icon: ShieldAlert,
    color: "text-red-400",
    content: (
      <>
        <p className="mb-4">The 0x99 Protocol strictly forbids "Platform Circumvention". Specifically:</p>
        <ul className="list-disc pl-5 space-y-2 text-slate-400">
          <li>Attempting to process payments outside the FreelanceX Escrow Matrix after connecting through our network.</li>
          <li>Sharing direct contact data (Skype, personal email) prior to initiating a verified contract.</li>
        </ul>
        <p className="mt-4 text-red-400/80 text-sm font-bold border-l-2 border-red-500/50 pl-4 py-1 bg-red-500/5">Violation triggers an automatic IP ban and potential legal action for lost platform revenue.</p>
      </>
    )
  },
  {
    id: "06",
    title: "Limitation of System Liability",
    icon: Scale,
    color: "text-slate-400",
    content: (
      <>
        <p className="mb-4">FreelanceX provides the matching matrix and escrow infrastructure "AS-IS". We do not warrant that the network will be 100% error-free or uninterrupted.</p>
        <p>In no event shall Career Lab Consulting or the FreelanceX operators be held liable for indirect, incidental, or consequential damages (including catastrophic data loss or server downtime) resulting from the use of delivered software.</p>
      </>
    )
  }
];

function FingerprintIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round">
      <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10"/>
      <path d="M5 12c0-3.87 3.13-7 7-7s7 3.13 7 7"/>
      <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4"/>
      <path d="M12 12c0-1.1-.9-2-2-2"/>
      <path d="M12 16v-2"/>
      <path d="M8 16v-2"/>
      <path d="M16 16v-2"/>
      <path d="M12 20v-2"/>
      <path d="M8 20v-2"/>
      <path d="M16 20v-2"/>
    </svg>
  );
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 relative">
        <div className="absolute top-0 left-0 w-full md:w-[600px] h-[300px] md:h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-0" />
        <div className="absolute bottom-1/4 right-0 w-full md:w-[600px] h-[300px] md:h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 md:space-y-20">
          
          {/* Header Section */}
          <div className="text-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <Gavel size={14} className="text-slate-400" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Rules of Engagement</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white"
            >
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">Agreement.</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500"
            >
              <span className="flex items-center gap-1"><Terminal size={12}/> V 3.4.1</span>
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>Last Compiled: March 2026</span>
            </motion.div>
          </div>

          {/* Intro Terminal Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0a0f1d] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl font-mono text-xs md:text-sm text-slate-400"
          >
             <div className="flex gap-2 mb-4 border-b border-white/10 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
             </div>
             <p className="text-emerald-400 mb-2">{'>'} system.loadLegalDirectives()</p>
             <p>Welcome to the FreelanceX Infrastructure.</p>
             <p className="mt-2">By authenticating your identity and utilizing this platform, you legally bind yourself to the following algorithmic and ethical directives. Read them carefully; ignorance is not a valid defense protocol.</p>
          </motion.div>

          {/* Legal Clauses List */}
          <div className="space-y-8 md:space-y-10">
            {TERMS_CLAUSES.map((clause, idx) => (
              <motion.div 
                key={clause.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/[0.02] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 hover:bg-white/[0.04] transition-all group"
              >
                <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center shadow-lg ${clause.color} group-hover:scale-110 transition-transform`}>
                    <clause.icon size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 tracking-widest uppercase block mb-1">Clause_0x{clause.id}</span>
                    <h2 className="text-lg md:text-2xl font-black text-white leading-tight">{clause.title}</h2>
                  </div>
                </div>

                <div className="text-sm md:text-base leading-relaxed font-medium text-slate-300">
                  {clause.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* --- CONTACT HUB (NEW ADDITION) --- */}
          <div className="pt-8">
            <h3 className="text-center text-2xl font-black text-white mb-8">Contact Hub</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-[#0a0f1d]/60 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center gap-4 hover:border-blue-500/30 transition-colors">
                <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Headquarters</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">DLF Cyber City, 5th Floor, Cyber Green-2, Sec-25, Gurugram, India</p>
                </div>
              </div>

              <div className="bg-[#0a0f1d]/60 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center gap-4 hover:border-emerald-500/30 transition-colors">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Direct Line</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">+91 870023 6923</p>
                </div>
              </div>

              <div className="bg-[#0a0f1d]/60 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center gap-4 hover:border-purple-500/30 transition-colors">
                <div className="w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2">Email Support</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">info@careerlabconsulting.com</p>
                </div>
              </div>

            </div>
          </div>

          {/* Acknowledgement CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-[#0a0f1d] to-[#020617] border border-white/10 p-8 md:p-16 text-center shadow-2xl"
          >
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />
             <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10 text-white">
                  <FileSignature size={28} />
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white">Initialize Contract</h3>
                <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
                  If you require clarification on any of the aforementioned directives, contact our legal architecture team before deploying any assets.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <Link 
                    href="/freelancex/signup"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 md:py-5 bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all shadow-xl"
                  >
                    I Accept, Enter Matrix <ChevronRight size={16} />
                  </Link>
                  <a 
                    href="mailto:info@careerlabconsulting.com"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 md:py-5 bg-white/5 border border-white/10 text-white font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all"
                  >
                    Contact Legal Node
                  </a>
                </div>
             </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}