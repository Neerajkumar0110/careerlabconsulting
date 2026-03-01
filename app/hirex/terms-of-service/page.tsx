// app/hirex/terms-of-service/page.tsx

'use client';

import React from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  FileText, Scale, ShieldAlert, Zap, 
  UserCheck, AlertCircle, Info, Hammer,
  ClipboardCheck, HelpCircle
} from 'lucide-react';

const TERMS_SECTIONS = [
  {
    title: "Platform Usage",
    icon: Hammer,
    content: "HireX is an autonomous AI assessment platform. It may only be used for legitimate recruitment purposes. Any form of reverse-engineering, data scraping, or unauthorized access is strictly prohibited.",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Assessment Integrity",
    icon: ShieldAlert,
    content: "Candidates must adhere to strict anti-cheat protocols during assessments. Tab-switching, screen mirroring, or the use of external AI tools will result in immediate disqualification.",
    color: "text-red-400",
    bgColor: "bg-red-500/10"
  },
  {
    title: "Data Verification",
    icon: UserCheck,
    content: "All data provided to HireX (GitHub, LinkedIn, Portfolio) must be accurate. Detection of fake profiles or manipulated technical metrics will lead to a permanent account ban.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10"
  },
  {
    title: "AI Decision Making",
    icon: Zap,
    content: "HireX provides AI-driven insights and grading. While we prioritize high-fidelity accuracy, the final hiring decision remains a private matter between the employer and the candidate.",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10"
  }
];

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 text-white bg-[#020617]">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-6">
              <Scale className="w-4 h-4" /> Legal Framework
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Service</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              By accessing the HireX platform, you agree to comply with the following legal guidelines and operational protocols designed to ensure hiring transparency and technical integrity.
            </p>
          </div>

          {/* Core Terms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {TERMS_SECTIONS.map((section, idx) => (
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

          {/* Detailed Articles Section */}
          <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <div className="prose prose-invert max-w-none space-y-12">
              
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <ClipboardCheck className="text-blue-400 w-6 h-6" />
                  <h2 className="text-2xl font-bold text-white">1. Candidate Obligations</h2>
                </div>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>When registering on HireX, the candidate agrees to the following:</p>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Usage of true identity and verified professional credentials only.</li>
                    <li>Strict prohibition of external assistance (Google, AI Chatbots, or third-party help) during technical assessments.</li>
                    <li>Non-disclosure of assessment questions, logic patterns, or simulation scenarios in the public domain.</li>
                  </ul>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Info className="text-emerald-400 w-6 h-6" />
                  <h2 className="text-2xl font-bold text-white">2. Intellectual Property</h2>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  All assessments, technical simulations, UI/UX design elements, and underlying AI algorithms are the exclusive intellectual property of Career Lab Consulting. Unauthorized reproduction or commercial use of these assets will result in legal action.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="text-purple-400 w-6 h-6" />
                  <h2 className="text-2xl font-bold text-white">3. Termination of Access</h2>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  HireX reserves the right to terminate or suspend access to any user without prior notice if they are found in violation of these terms or if their actions compromise the integrity of the platform.
                </p>
              </section>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 mt-12 flex items-start gap-4">
                <HelpCircle className="text-blue-400 w-6 h-6 shrink-0 mt-1" />
                <div className="text-sm text-blue-100/80 leading-relaxed">
                  <p className="font-bold mb-1">Policy Updates:</p>
                  HireX may update these terms at any time to reflect changes in AI processing or legal requirements. Users are advised to review this page periodically for updates.
                </div>
              </div>

            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm">
              Have questions regarding our terms? Contact our legal department: 
              <a href="mailto:info@careerlabconsulting.com" className="text-blue-400 ml-2 hover:underline">info@careerlabconsulting.com</a>
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}