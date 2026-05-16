"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { ShieldCheck, Lock, Eye, CreditCard, Scale, Globe } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const PrivacyPolicy = () => {
  const { get } = usePageContent('home-privacy');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentFrom      = get('hero', 'accent_from',    '#3b82f6');
  const accentTo        = get('hero', 'accent_to',      '#6366f1');
  const badgeText       = get('hero', 'badge_text',     'Legal Compliance');
  const headlinePlain   = get('hero', 'headline_plain', 'Privacy');
  const headlineAccent  = get('hero', 'headline_accent','Policy.');
  const lastUpdated     = get('hero', 'last_updated',   'October 24, 2023');

  // ── Overview ─────────────────────────────────────────────────────────────
  const overviewBody    = get('overview', 'body_text',  'Hamari priority aapki privacy hai. Yeh policy batati hai ki hum aapka data kaise collect, use aur protect karte hain jab aap hamari services use karte hain. Hamara goal transparent rehna hai taaki aap bina kisi fikar ke hamare platforms par grow kar sakein.');

  // ── Payment ───────────────────────────────────────────────────────────────
  const paymentTitle    = get('payment', 'section_title',      'Payment Processing & Razorpay');
  const paymentIntro    = get('payment', 'intro_text',         'Hum payment processing ke liye Razorpay ka use karte hain. Hum aapke card details apne servers par store nahi karte.');
  const paymentBullet1  = get('payment', 'bullet_encryption',  'Transaction ke waqt aapka data Razorpay ke secure PCI-DSS compliant environment mein process hota hai.');
  const paymentBullet2  = get('payment', 'bullet_sharing',     'Hum sirf wahi info share karte hain jo payment confirm karne ke liye zaruri hoti hai (e.g., amount, billing details).');
  const paymentBullet3  = get('payment', 'bullet_security',    'Razorpay industry-standard encryption protocols use karta hai taaki aapka financial data 100% safe rahe.');

  // ── Data Collection ───────────────────────────────────────────────────────
  const dataTitle       = get('data_collection', 'section_title',     'Data Hum Kya Collect Karte Hain?');
  const dataPersonalTitle = get('data_collection', 'card1_title',     'Personal Info');
  const dataPersonalBody  = get('data_collection', 'card1_body',      'Name, Email, Phone number, aur Billing address jo aap humein provide karte hain.');
  const dataUsageTitle    = get('data_collection', 'card2_title',     'Usage Data');
  const dataUsageBody     = get('data_collection', 'card2_body',      'IP address, browser type, aur page visit duration taaki hum UX behtar kar sakein.');

  // ── Security ─────────────────────────────────────────────────────────────
  const securityTitle   = get('security', 'section_title', 'Security Standards');
  const securityBody    = get('security', 'body_text',     'Hum SSL encryption aur regular security audits ka use karte hain. Halanki koi bhi internet transmission 100% secure nahi hota, lekin hum best industry practices follow karte hain aapke data ko safeguard karne ke liye.');

  // ── Cookies / Contact ─────────────────────────────────────────────────────
  const cookiesBody     = get('cookies', 'body_text',      'Hum small cookies use karte hain aapke experience ko personalize karne ke liye. Aap inhe browser settings se disable kar sakte hain.');
  const contactEmail    = get('contact', 'email_address',  'privacy@yourdomain.com');
  const contactBtnLabel = get('contact', 'btn_label',      'Email Compliance');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <Navbar />

      <section className="pt-32 pb-16 px-6 border-b border-white/5 bg-slate-900/20">
        <div className="max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 backdrop-blur-xl"
            style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}
          >
            <ShieldCheck size={14} style={{ color: accentFrom }} />
            <span
              className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: accentFrom }}
            >
              {badgeText}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-4">
            {headlinePlain}{' '}
            <span className="text-slate-500">{headlineAccent}</span>
          </h1>
          <p className="text-slate-400 font-light italic text-sm">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Overview */}
          <article className="space-y-6">
            <div className="flex items-center gap-3" style={{ color: accentFrom }}>
              <Eye size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic">Overview</h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">{overviewBody}</p>
          </article>

          {/* Payment */}
          <article
            className="p-8 rounded-[2rem] space-y-6"
            style={{ background: `${accentFrom}0d`, border: `1px solid ${accentFrom}33` }}
          >
            <div className="flex items-center gap-3" style={{ color: accentFrom }}>
              <CreditCard size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">{paymentTitle}</h2>
            </div>
            <div className="space-y-4 text-slate-400 leading-relaxed font-light">
              <p>{paymentIntro}</p>
              <ul className="list-disc pl-6 space-y-3" style={{ '--marker-color': accentFrom } as React.CSSProperties}>
                <li className="marker:text-blue-500"><strong>Encryption:</strong> {paymentBullet1}</li>
                <li className="marker:text-blue-500"><strong>Data Sharing:</strong> {paymentBullet2}</li>
                <li className="marker:text-blue-500"><strong>Security:</strong> {paymentBullet3}</li>
              </ul>
            </div>
          </article>

          {/* Data Collection */}
          <article className="space-y-6">
            <div className="flex items-center gap-3" style={{ color: accentFrom }}>
              <Lock size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic">{dataTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="text-white font-bold text-sm mb-2 uppercase italic tracking-wider">{dataPersonalTitle}</h4>
                <p className="text-xs text-slate-500">{dataPersonalBody}</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="text-white font-bold text-sm mb-2 uppercase italic tracking-wider">{dataUsageTitle}</h4>
                <p className="text-xs text-slate-500">{dataUsageBody}</p>
              </div>
            </div>
          </article>

          {/* Security */}
          <article className="space-y-6">
            <div className="flex items-center gap-3" style={{ color: accentFrom }}>
              <Scale size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic">{securityTitle}</h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">{securityBody}</p>
          </article>

          {/* Cookies & Contact */}
          <article className="pt-10 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-2 text-white font-black italic uppercase">
                  <Globe size={16} />
                  <span>Cookies</span>
                </div>
                <p className="text-sm text-slate-500 font-light">{cookiesBody}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-white font-black italic uppercase tracking-tighter text-2xl">Questions?</h3>
                <p className="text-slate-400 text-sm mb-4">Contact our compliance team:</p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-block bg-white text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                  style={{ '--hover-bg': accentFrom } as React.CSSProperties}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = accentFrom; (e.currentTarget as HTMLAnchorElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#fff'; (e.currentTarget as HTMLAnchorElement).style.color = '#000'; }}
                >
                  {contactBtnLabel}
                </a>
              </div>
            </div>
          </article>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;