"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import {
  FileText, Gavel, AlertCircle, CreditCard,
  Scale, ArrowRight, ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';
import { usePageContent } from '@/hooks/usePageContent';

const TermsOfService = () => {
  const { get } = usePageContent('home-terms');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentFrom       = get('hero', 'accent_from',     '#3b82f6');
  const accentTo         = get('hero', 'accent_to',       '#6366f1');
  const badgeText        = get('hero', 'badge_text',      'User Agreement');
  const headlinePlain    = get('hero', 'headline_plain',  'Terms of');
  const headlineAccent   = get('hero', 'headline_accent', 'Service.');
  const lastUpdated      = get('hero', 'last_updated',    'January 24, 2026');

  // ── Section 1 ─────────────────────────────────────────────────────────────
  const s1Title          = get('acceptance', 'section_title', '1. Acceptance of Terms');
  const s1Body           = get('acceptance', 'body_text',     'Hamari services access karke aap confirm karte hain ki aap in terms ko follow karenge. Agar aap in rules se agree nahi karte, toh aap hamari services use nahi kar sakte.');

  // ── Section 2 ─────────────────────────────────────────────────────────────
  const s2Title          = get('payment', 'section_title', '2. Payment & Razorpay');
  const s2Body           = get('payment', 'body_text',     'Saari payments Razorpay gateway ke through process hoti hain. Transactions ke waqt aapko Razorpay ki apni terms and conditions ko bhi follow karna hoga. Hum payment failures ya gateway-level issues ke liye responsible nahi hain.');

  // ── Section 3 ─────────────────────────────────────────────────────────────
  const s3Title          = get('limitations', 'section_title', '3. Service Limitations');
  const s3Body           = get('limitations', 'body_text',     'Hamari maintenance aur upgrade services \'as-is\' basis par milti hain. Hum 100% bug-free software ki guarantee nahi dete, lekin best industry practices follow karte hain.');

  // ── Section 4 ─────────────────────────────────────────────────────────────
  const s4Title          = get('liability', 'section_title', '4. Liability & Indemnity');
  const s4Body           = get('liability', 'body_text',     'Kisi bhi condition mein hum (ya hamare developers) aapke data loss, revenue loss, ya system downtime ke liye liable nahi honge jo kisi third-party tool ya unforeseen circumstances ki wajah se ho.');

  // ── Section 5 ─────────────────────────────────────────────────────────────
  const s5Title          = get('termination', 'section_title', '5. Termination');
  const s5Body           = get('termination', 'body_text',     'Hum bina notice ke un accounts ki services terminate kar sakte hain jo hamari terms ko breach karte hain ya suspicious financial activity (via Razorpay) show karte hain.');

  // ── Transaction Policy ────────────────────────────────────────────────────
  const txTitle          = get('transaction', 'section_title', 'Transaction Policy');
  const txBody           = get('transaction', 'body_text',     'Saari billed amount non-refundable hain unless explicitly mentioned in our Refund Policy. Payment dispute ke case mein, Razorpay ke investigation protocols final honge. Hum recommendation dete hain ki payment karte waqt aap ek stable internet connection use karein.');

  // ── Footer CTA ────────────────────────────────────────────────────────────
  const footerNote       = get('footer_cta', 'note_text',     'In terms se judi koi bhi clarify chahiye?');
  const footerLinkLabel  = get('footer_cta', 'link_label',    'Contact Legal Team');
  const footerLinkHref   = get('footer_cta', 'link_href',     '/contact');

  const cardSections = [
    { title: s1Title, body: s1Body, icon: <FileText style={{ color: accentFrom }} size={18} /> },
    { title: s2Title, body: s2Body, icon: <CreditCard className="text-emerald-500" size={18} /> },
    { title: s3Title, body: s3Body, icon: <AlertCircle className="text-amber-500" size={18} /> },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6"
            style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}22` }}
          >
            <Gavel size={14} style={{ color: accentFrom }} />
            <span
              className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: accentFrom }}
            >
              {badgeText}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-4">
            {headlinePlain}{' '}
            <span style={{ color: accentFrom }}>{headlineAccent}</span>
          </h1>
          <p className="text-slate-400 font-light italic text-sm">Effective Date: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* Card sections */}
            {cardSections.map((s, i) => (
              <div
                key={i}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-xl">{s.icon}</div>
                  <h2 className="text-xl font-black uppercase italic tracking-tight">{s.title}</h2>
                </div>
                <p className="text-slate-400 leading-relaxed font-light">{s.body}</p>
              </div>
            ))}

            {/* Prose sections */}
            <article className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase italic flex items-center gap-3">
                  <ShieldAlert className="text-red-500" /> {s4Title}
                </h3>
                <p className="text-slate-400 font-light leading-relaxed">{s4Body}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase italic flex items-center gap-3">
                  <Scale style={{ color: accentFrom }} /> {s5Title}
                </h3>
                <p className="text-slate-400 font-light leading-relaxed">{s5Body}</p>
              </div>
            </article>

            {/* Transaction Policy */}
            <div
              className="mt-8 p-8 rounded-3xl"
              style={{ background: '#10b9810d', border: '1px solid #10b98133' }}
            >
              <h4 className="text-emerald-400 font-black uppercase italic mb-4 flex items-center gap-2">
                <CreditCard size={20} /> {txTitle}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed font-light">{txBody}</p>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-24 text-center border-t border-white/5 pt-12">
            <p className="text-slate-500 text-sm mb-6 font-light">{footerNote}</p>
            <Link
              href={footerLinkHref}
              className="group flex items-center gap-3 mx-auto font-black uppercase italic tracking-widest text-xs hover:text-white transition-all"
              style={{ color: accentFrom }}
            >
              {footerLinkLabel} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TermsOfService;