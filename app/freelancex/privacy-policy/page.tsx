'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Lock, Eye, Database, 
  Server, FileText, Fingerprint, Network, 
  ChevronRight, Mail
} from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const POLICY_SECTIONS = [
  {
    id: "01",
    title: "Telemetry & Node Data Collection",
    icon: Database,
    color: "text-blue-400",
    content: (
      <>
        <p className="mb-4">To operate the FreelanceX autonomous network, we collect specific data points from registered nodes (users) and enterprise clients. This includes:</p>
        <ul className="list-disc pl-5 space-y-2 text-slate-400">
          <li><strong>Identity Vectors:</strong> Name, professional email, verified phone numbers, and cryptographic wallet addresses.</li>
          <li><strong>Technical Footprint:</strong> GitHub repositories, past sprint histories, tech stack proficiency, and AI assessment scores.</li>
          <li><strong>System Telemetry:</strong> IP addresses, browser types, and interaction logs within our secure application matrix.</li>
        </ul>
      </>
    )
  },
  {
    id: "02",
    title: "Data Utilization & Processing",
    icon: Network,
    color: "text-indigo-400",
    content: (
      <>
        <p className="mb-4">Your data is strictly processed to optimize the matching algorithm and secure the ecosystem. We utilize your data to:</p>
        <ul className="list-disc pl-5 space-y-2 text-slate-400">
          <li>Execute zero-latency matchmaking between elite talent and enterprise requirements.</li>
          <li>Process secure escrow payments and automate contract generation.</li>
          <li>Detect and neutralize fraudulent activity or unauthorized access attempts.</li>
        </ul>
        <p className="mt-4 text-emerald-400/80 text-sm italic border-l-2 border-emerald-500/50 pl-4 py-1 bg-emerald-500/5">Note: We do not sell, rent, or lease your biological or technical data to third-party brokers under any circumstances.</p>
      </>
    )
  },
  {
    id: "03",
    title: "Cryptographic Security Standards",
    icon: Lock,
    color: "text-emerald-400",
    content: (
      <>
        <p className="mb-4">The 0x99 Protocol enforces military-grade security. All data traversing our network is subjected to:</p>
        <ul className="list-disc pl-5 space-y-2 text-slate-400">
          <li><strong>End-to-End Encryption (E2EE):</strong> AES-256 encryption for data at rest and TLS 1.3 for data in transit.</li>
          <li><strong>Zero-Trust Architecture:</strong> Continuous authentication is required for every internal API request.</li>
          <li><strong>Decentralized Vaults:</strong> Sensitive financial and personal identifiers are stored in isolated, air-gapped server nodes.</li>
        </ul>
      </>
    )
  },
  {
    id: "04",
    title: "Node Access & Data Sovereignty",
    icon: Fingerprint,
    color: "text-purple-400",
    content: (
      <>
        <p className="mb-4">You maintain total sovereignty over your digital footprint. Under international data protection laws (including GDPR and CCPA), you have the right to:</p>
        <ul className="list-disc pl-5 space-y-2 text-slate-400">
          <li>Request a complete export of your neural and technical profile data.</li>
          <li>Demand the absolute erasure of your node from our ecosystem ("Right to be Forgotten").</li>
          <li>Restrict the processing of your data for specific matchmaking algorithms.</li>
        </ul>
      </>
    )
  },
  {
    id: "05",
    title: "Tracking & Cookie Protocols",
    icon: Eye,
    color: "text-amber-400",
    content: (
      <>
        <p className="mb-4">Our interface utilizes minimal cryptographic cookies to maintain session states and verify user integrity. These include:</p>
        <ul className="list-disc pl-5 space-y-2 text-slate-400">
          <li><strong>Authentication Tokens:</strong> Strictly necessary for maintaining your secure login state.</li>
          <li><strong>Security Analytics:</strong> Used to detect DDoS attacks and anomalous behavior.</li>
        </ul>
        <p className="mt-4">You may configure your local terminal (browser) to reject non-essential cookies, though this may degrade your connection to the FreelanceX matrix.</p>
      </>
    )
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 relative">
        {/* Ambient Background */}
        <div className="absolute top-0 right-0 w-full md:w-[600px] h-[300px] md:h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-0" />
        <div className="absolute top-1/2 left-0 w-full md:w-[600px] h-[300px] md:h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 md:space-y-20">
          
          {/* Header Section */}
          <div className="text-center space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <ShieldCheck size={14} className="text-emerald-400" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Legal Documentation</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white"
            >
              Data Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Protocol.</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-500"
            >
              <span>Effective Date: March 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span>Version: 2.1.0</span>
            </motion.div>
          </div>

          {/* Intro Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0a0f1d]/80 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl"
          >
            <p className="text-sm md:text-base leading-relaxed text-slate-300 font-medium">
              At <strong className="text-white">Career Lab Consulting (FreelanceX Ecosystem)</strong>, we engineer trust. Your privacy is not a feature; it is the foundational architecture of our protocol. This document outlines how we extract, encrypt, and manage the data flowing through our network. By initializing a connection to our servers, you acknowledge and consent to these directives.
            </p>
          </motion.div>

          {/* Sections List */}
          <div className="space-y-8 md:space-y-12">
            {POLICY_SECTIONS.map((section, idx) => (
              <motion.div 
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-6 md:pl-12 group"
              >
                {/* Left Line Indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-white/10 to-transparent group-hover:from-${section.color.split('-')[1]}-500 transition-all duration-500`} />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#0a0f1d] border border-white/10 flex items-center justify-center shadow-lg ${section.color}`}>
                    <section.icon size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Directive {section.id}</span>
                    <h2 className="text-xl md:text-2xl font-black text-white">{section.title}</h2>
                  </div>
                </div>

                <div className="text-sm md:text-base leading-relaxed font-medium bg-white/[0.01] p-6 rounded-2xl border border-white/[0.03]">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Controller Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-indigo-900/40 to-[#020617] border border-indigo-500/20 p-8 md:p-12 text-center shadow-2xl"
          >
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />
             <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto border border-indigo-500/20">
                  <Server className="text-indigo-400" size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white">Data Protection Node</h3>
                <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto">
                  For inquiries regarding data extraction, sovereignty, or to execute your "Right to be Forgotten", contact our compliance architecture team.
                </p>
                <div className="pt-4">
                  <a 
                    href="mailto:careerlabconsulting@gmail.com"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:bg-indigo-50 hover:text-indigo-900 transition-all shadow-xl"
                  >
                    <Mail size={16} /> Contact Legal Operations
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