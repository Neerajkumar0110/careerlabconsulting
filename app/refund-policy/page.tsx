"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { RefreshCcw, AlertCircle, HelpCircle, CheckCircle2, Ban, Mail } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const RefundPolicy = () => {
  const { get } = usePageContent('home-refund');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentFrom         = get('hero', 'accent_from',     '#3b82f6');
  const accentTo           = get('hero', 'accent_to',       '#6366f1');
  const badgeText          = get('hero', 'badge_text',      'Cancellation & Refunds');
  const headlinePlain      = get('hero', 'headline_plain',  'Refund');
  const headlineAccent     = get('hero', 'headline_accent', 'Policy.');
  const lastUpdated        = get('hero', 'last_updated',    'October 24, 2023');

  // ── Commitment ────────────────────────────────────────────────────────────
  const commitTitle        = get('commitment', 'section_title', 'Commitment to Satisfaction');
  const commitBody         = get('commitment', 'body_text',     'We strive to provide exceptional value through our services. If you feel that our services have not met the promised standards, we offer a transparent refund process. Please review the terms outlined below to understand your eligibility and the steps involved.');

  // ── Refund Timeline ───────────────────────────────────────────────────────
  const timelineTitle      = get('timeline', 'section_title',  'Refund Timeline & Process');
  const timelineIntro      = get('timeline', 'intro_text',     'Once a refund is approved, the processing time depends on the financial institutions involved:');
  const timelineBullet1    = get('timeline', 'bullet_review',  'All requests are reviewed by our compliance team within 24-48 business hours.');
  const timelineBullet2    = get('timeline', 'bullet_method',  'Approved refunds are credited back only to the original payment method (Bank Account, Card, or UPI) used during the transaction.');
  const timelineBullet3    = get('timeline', 'bullet_days',    'As per Razorpay and banking protocols, it typically takes 5 to 7 working days for the amount to reflect in your account.');

  // ── Eligibility ───────────────────────────────────────────────────────────
  const eligTitle          = get('eligibility', 'section_title',  'Eligibility Criteria');
  const eligCard1Title     = get('eligibility', 'card1_title',    'Eligible Requests');
  const eligCard1Body      = get('eligibility', 'card1_body',     'Duplicate transactions, accidental over-billing, or failure to deliver service due to verified technical errors on our end.');
  const eligCard2Title     = get('eligibility', 'card2_title',    'Non-Eligible');
  const eligCard2Body      = get('eligibility', 'card2_body',     'Refunds will not be issued for "change of mind" once digital content has been accessed or services have been partially consumed.');

  // ── Cancellation ─────────────────────────────────────────────────────────
  const cancelTitle        = get('cancellation', 'section_title', 'Cancellation Rights');
  const cancelBody         = get('cancellation', 'body_text',     'You may cancel your subscription or service at any time. Upon cancellation, you will not be charged for the subsequent billing cycle. Eligibility for a refund of previously paid amounts remains subject to the criteria mentioned above.');

  // ── Contact ───────────────────────────────────────────────────────────────
  const contactNote        = get('contact', 'note_text',     'Have questions regarding a specific transaction? Our support team is available to assist you with any billing inquiries within 24 hours.');
  const contactCTA         = get('contact', 'cta_headline',  'Initiate Refund');
  const contactSubtext     = get('contact', 'subtext',       'Please include your Order ID in the email:');
  const contactEmail       = get('contact', 'email_address', 'support@yourdomain.com');
  const contactBtnLabel    = get('contact', 'btn_label',     'Contact Support');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 border-b border-white/5 bg-slate-900/20">
        <div className="max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 backdrop-blur-xl"
            style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}
          >
            <RefreshCcw size={14} style={{ color: accentFrom }} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accentFrom }}>
              {badgeText}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-4">
            {headlinePlain} <span className="text-slate-500">{headlineAccent}</span>
          </h1>
          <p className="text-slate-400 font-light italic text-sm">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Commitment */}
          <article className="space-y-6">
            <div className="flex items-center gap-3" style={{ color: accentFrom }}>
              <AlertCircle size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">{commitTitle}</h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">{commitBody}</p>
          </article>

          {/* Timeline */}
          <article
            className="p-8 rounded-[2rem] space-y-6"
            style={{ background: `${accentFrom}0d`, border: `1px solid ${accentFrom}33` }}
          >
            <div className="flex items-center gap-3" style={{ color: accentFrom }}>
              <CheckCircle2 size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">{timelineTitle}</h2>
            </div>
            <div className="space-y-4 text-slate-400 leading-relaxed font-light">
              <p>{timelineIntro}</p>
              <ul className="list-disc pl-6 space-y-3 marker:text-blue-500">
                <li><strong>Review Period:</strong> {timelineBullet1}</li>
                <li><strong>Original Method:</strong> {timelineBullet2}</li>
                <li><strong>Standard Timeline:</strong> {timelineBullet3}</li>
              </ul>
            </div>
          </article>

          {/* Eligibility */}
          <article className="space-y-6">
            <div className="flex items-center gap-3" style={{ color: accentFrom }}>
              <Ban size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">{eligTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="text-white font-bold text-sm mb-2 uppercase italic tracking-wider">{eligCard1Title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{eligCard1Body}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="text-white font-bold text-sm mb-2 uppercase italic tracking-wider">{eligCard2Title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{eligCard2Body}</p>
              </div>
            </div>
          </article>

          {/* Cancellation */}
          <article className="space-y-6">
            <div className="flex items-center gap-3" style={{ color: accentFrom }}>
              <HelpCircle size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">{cancelTitle}</h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">{cancelBody}</p>
          </article>

          {/* Contact */}
          <article className="pt-10 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-2 text-white font-black italic uppercase">
                  <Mail size={16} />
                  <span>Direct Assistance</span>
                </div>
                <p className="text-sm text-slate-500 font-light">{contactNote}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-white font-black italic uppercase tracking-tighter text-2xl">{contactCTA}</h3>
                <p className="text-slate-400 text-sm mb-4">{contactSubtext}</p>
                <button
                  onClick={() => window.location.href = `mailto:${contactEmail}`}
                  className="bg-white text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-white/5"
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#ef4444'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}
                >
                  {contactBtnLabel}
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

export default RefundPolicy;