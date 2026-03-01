// app/hirex/privacy-policy/page.tsx

'use client';

import React from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  ShieldCheck, Lock, Eye, FileText, 
  Server, Globe, Database, UserCheck,
  Scale, AlertCircle
} from 'lucide-react';

const POLICY_SECTIONS = [
  {
    title: "Data Collection",
    icon: Database,
    content: "We collect professional candidate data, including GitHub profiles, LinkedIn URLs, technical stack details, and assessment scores. This data enables our autonomous AI engine to analyze technical depth effectively.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "AI Processing Transparency",
    icon: Eye,
    content: "HireX utilizes AI algorithms to evaluate and grade candidates. We ensure unbiased AI decision-making. Candidates can review their verified AI scores and logic metrics at any time.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10"
  },
  {
    title: "Data Encryption",
    icon: Lock,
    content: "All personal and technical data is stored on TiDB Cloud and protected by industry-standard AES-256 encryption. We never sell your data to third-party marketing agencies.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10"
  },
  {
    title: "Employer Access",
    icon: UserCheck,
    content: "Only verified hiring partners (authorized by Career Lab Consulting) can access 360-degree candidate reports. Employers only view data relevant to the recruitment process.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10"
  }
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 text-white bg-[#020617]">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-6">
              <ShieldCheck className="w-4 h-4" /> Trusted Infrastructure
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Protocol</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              HireX (A product of Career Lab Consulting) prioritizes the privacy of candidate data and employer benchmarks. Our autonomous system is built on a security-first architecture.
            </p>
          </div>

          {/* Policy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {POLICY_SECTIONS.map((section, idx) => (
              <div key={idx} className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-blue-500/30 transition-colors group">
                <div className={`w-12 h-12 rounded-2xl ${section.bgColor} border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <section.icon className={`w-6 h-6 ${section.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Detailed Legal Content Section */}
          <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <div className="prose prose-invert max-w-none space-y-10">
              
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-blue-400 w-6 h-6" />
                  <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  We collect two primary types of information on the HireX platform: 
                  <strong> (a) Personal Information:</strong> Name, contact details, qualifications, and address provided during recruitment assessments. 
                  <strong> (b) Autonomous Data:</strong> AI interview responses, code playbacks, logic scores, and analysis of public contributions.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Server className="text-emerald-400 w-6 h-6" />
                  <h2 className="text-2xl font-bold text-white">2. How We Store Data</h2>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  All information is securely stored on <strong>TiDB Cloud (distributed SQL)</strong> infrastructure. We employ automated backups and real-time monitoring to mitigate risks of data loss or unauthorized access.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="text-purple-400 w-6 h-6" />
                  <h2 className="text-2xl font-bold text-white">3. Cookies and Tracking</h2>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  We use cookies exclusively for user session management and anti-cheat monitoring (such as tab-switching detection). We do not utilize aggressive tracking or ad-retargeting pixels.
                </p>
              </section>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mt-12 flex items-start gap-4">
                <AlertCircle className="text-blue-400 w-6 h-6 shrink-0 mt-1" />
                <div className="text-sm text-blue-100/80 leading-relaxed">
                  <p className="font-bold mb-1">Important Legal Note:</p>
                  By using HireX, you agree to the processing of candidate data via the Google Gemini API for skill assessment purposes. All AI processing is strictly governed by enterprise-grade safety protocols.
                </div>
              </div>

            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm">
              Any privacy concerns? Contact our data protection officer: 
              <a href="mailto:info@careerlabconsulting.com" className="text-blue-400 ml-2 hover:underline">info@careerlabconsulting.com</a>
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}