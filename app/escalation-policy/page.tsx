"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { TrendingUp, MessageSquare, ShieldAlert, Zap, Clock, Mail, ChevronRight } from 'lucide-react';

const EscalationPolicy = () => {
  const lastUpdated = "January 26, 2026";

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <Navbar />

      <section className="pt-32 pb-16 px-6 border-b border-white/5 bg-slate-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-xl">
            <TrendingUp size={14} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Priority Resolution</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-4">
            Escalation <span className="text-slate-500">Policy.</span>
          </h1>
          <p className="text-slate-400 font-light italic text-sm">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <article className="space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <MessageSquare size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">Our Commitment</h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">
              We aim for first-contact resolution. However, we understand that complex technical or billing issues may require specialized attention. This policy outlines the tiered process we use to escalate and resolve your concerns with maximum efficiency and transparency.
            </p>
          </article>

          <article className="space-y-8">
            <div className="flex items-center gap-3 text-blue-400">
              <Zap size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">Resolution Tiers</h2>
            </div>

            <div className="space-y-4">
              <div className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-blue-400 font-black text-sm uppercase italic tracking-widest">Level 01: Standard Support</h4>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Response: 24h</span>
                </div>
                <p className="text-sm text-slate-400 font-light">Initial contact via our ticketing system or support email. Most technical and general inquiries are resolved here.</p>
              </div>

              <div className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-blue-500/50 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-blue-400 font-black text-sm uppercase italic tracking-widest">Level 02: Management Review</h4>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Response: 48h</span>
                </div>
                <p className="text-sm text-slate-400 font-light">If Level 01 fails to provide a satisfactory solution, your case is moved to a Senior Support Specialist or Department Lead.</p>
              </div>

              <div className="group p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl shadow-lg shadow-blue-500/5">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-black text-sm uppercase italic tracking-widest">Level 03: Executive Escalation</h4>
                  <span className="text-[10px] bg-blue-500 text-white px-2 py-1 rounded">Priority: Critical</span>
                </div>
                <p className="text-sm text-slate-300 font-light italic">Final stage involving our Compliance Officer or Executive Management for disputes that remain unresolved after 7 business days.</p>
              </div>
            </div>
          </article>

          <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-blue-400">
                <Clock size={20} />
                <h2 className="text-lg font-black uppercase tracking-tight italic text-white">When to Escalate?</h2>
              </div>
              <ul className="space-y-3 text-sm text-slate-500 font-light">
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-blue-500" /> No response for over 48 business hours.</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-blue-500" /> Technical bug preventing service access.</li>
                <li className="flex items-center gap-2"><ChevronRight size={14} className="text-blue-500" /> Dispute regarding Refund Policy eligibility.</li>
              </ul>
            </div>

            <div className="p-8 rounded-[2rem] bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-3 text-red-400 mb-4">
                <ShieldAlert size={20} />
                <h2 className="text-lg font-black uppercase tracking-tight italic text-white">Emergency Cases</h2>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Data breaches, account compromises, or total platform outages are treated as **Critical (Level 3)** immediately. Skip standard tiers and use "EMERGENCY" in your email subject line.
              </p>
            </div>
          </article>

          <article className="pt-10 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-2 text-white font-black italic uppercase">
                  <Mail size={16} />
                  <span>Escalation Desk</span>
                </div>
                <p className="text-sm text-slate-500 font-light">
                  Please ensure you have an active Ticket ID before requesting an escalation to Level 02 or higher.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-white font-black italic uppercase tracking-tighter text-2xl">Raise a Ticket?</h3>
                <p className="text-slate-400 text-sm mb-4">Email our specialized resolution team:</p>
                <button 
                  onClick={() => window.location.href = 'mailto:resolutions@yourdomain.com'}
                  className="bg-white text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-400 transition-all shadow-xl shadow-blue-500/10"
                >
                  Contact Resolutions
                </button>
              </div>
            </div>
          </article>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EscalationPolicy;