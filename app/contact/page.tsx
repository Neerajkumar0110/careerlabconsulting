// app/home/contact/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Mail, Phone, MapPin, Send,
  ShieldCheck, Cpu, ArrowRight,
  ExternalLink, MessageCircle,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_DEPLOYMENT_OPTIONS = JSON.stringify([
  'AI Transformation Strategy',
  'Custom SaaS Development',
  'Machine Learning Operations',
  'Career Consulting (Individual)',
]);
const DEFAULT_TRUST_BADGES = JSON.stringify([
  { icon: 'ShieldCheck', label: 'SOC2 Compliant' },
  { icon: 'Cpu',         label: 'Signal Encrypted' },
]);

interface TrustBadge { icon: string; label: string }

export default function ContactPage() {
  const { get } = usePageContent('home-contact');

  const [formData, setFormData] = useState({
    name: '', email: '',
    interest: 'AI Transformation Strategy',
    message: '',
  });

  // Hero
  const accentColor        = get('hero', 'accent_color',        '#3b82f6');
  const badgeText          = get('hero', 'badge_text',          'Available for Global Deployment');
  const heroPl             = get('hero', 'headline_plain',      'Direct');
  const heroAcc            = get('hero', 'headline_accent',     'Command.');
  const heroBody           = get('hero', 'body_text',           'Skip the inbox. Transmit your project requirements directly to our lead engineering node via encrypted signal.');

  // Contact Details
  const locationAddress    = get('contact_details', 'location_address',  'DLF Cyber City, 5th Floor, Cyber Green-2, Sec-25, Gurugram, HR - 122002');
  const phoneNumber        = get('contact_details', 'phone_number',      '+91 870023 6923');
  const emailAddress       = get('contact_details', 'email_address',     'info@careerlabconsulting.com');
  const responseTime       = get('contact_details', 'response_time',     'Average Response: 12m');
  const credentialsLabel   = get('contact_details', 'credentials_label', 'HQ_Credentials');

  // Form
  const formHeadline       = get('form', 'headline',              'Send A Signal');
  const nameLabel          = get('form', 'name_label',            'Operator Name');
  const namePlaceholder    = get('form', 'name_placeholder',      'John Doe');
  const emailLabel         = get('form', 'email_label',           'Email Address');
  const emailPlaceholder   = get('form', 'email_placeholder',     'john@firm.com');
  const deploymentLabel    = get('form', 'deployment_label',      'Deployment Area');
  const messageLabel       = get('form', 'message_label',         'Mission Brief');
  const messagePlaceholder = get('form', 'message_placeholder',   'Describe the neural requirements...');
  const submitBtnLabel     = get('form', 'submit_btn_label',      'Open Secure WhatsApp Channel');
  const whatsappNumber     = get('form', 'whatsapp_number',       '918700236923');
  const deploymentOptions  = safeParse<string[]>(get('form', 'deployment_options_json', DEFAULT_DEPLOYMENT_OPTIONS), []);
  const trustBadges        = safeParse<TrustBadge[]>(get('form', 'trust_badges_json', DEFAULT_TRUST_BADGES), []);

  // Map
  const mapImageUrl        = get('map', 'image_url',              'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  const mapBtnLabel        = get('map', 'btn_label',              'Navigate to Node');
  const mapLink            = get('map', 'map_link',               'https://maps.google.com');
  const mapAltText         = get('map', 'alt_text',               'Gurugram Hub');

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Project Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Interest:* ${formData.interest}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  const BADGE_ICON_MAP: Record<string, React.ElementType> = { ShieldCheck, Cpu };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-12 md:pt-48 md:pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10"
          style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}26 0%, transparent 50%)` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 backdrop-blur-md"
            style={{ background: `${accentColor}0d`, borderColor: `${accentColor}1a` }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: accentColor }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accentColor }} />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: `${accentColor}cc` }}>{badgeText}</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-8 italic leading-[0.8]">
            {heroPl} <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to bottom, #fff, #475569)' }}>{heroAcc}</span>
          </h1>
          <p className="max-w-xl mx-auto text-slate-400 text-sm md:text-lg font-light leading-relaxed">{heroBody}</p>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <section className="pb-32 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Contact Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="p-10 rounded-[3rem] border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden group"
                style={{ background: 'linear-gradient(to bottom right, rgba(15,23,42,0.5), #000)' }}>
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <Cpu size={120} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-12" style={{ color: accentColor }}>
                  {credentialsLabel}
                </h3>
                <div className="space-y-10 relative z-10">
                  <div className="flex gap-6">
                    <MapPin style={{ color: accentColor }} size={24} className="shrink-0" />
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Location</h4>
                      <p className="text-base md:text-lg text-slate-200 font-bold leading-tight whitespace-pre-line">{locationAddress.replace(/,\s*/g, ',\n')}</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <Phone style={{ color: accentColor }} size={24} className="shrink-0" />
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Voice / Signal</h4>
                      <p className="text-xl md:text-2xl text-white font-black tracking-tighter">{phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <Mail style={{ color: accentColor }} size={24} className="shrink-0" />
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">General Inquiry</h4>
                      <p className="text-base text-slate-200 font-bold">{emailAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-[2rem] border flex items-center justify-between"
                style={{ background: `${accentColor}08`, borderColor: `${accentColor}1a` }}>
                <div className="flex items-center gap-3">
                  <MessageCircle size={18} style={{ color: accentColor }} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{responseTime}</span>
                </div>
                <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full w-3/4" style={{ background: accentColor }} />
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="p-8 md:p-12 rounded-[3.5rem] border border-white/10 backdrop-blur-2xl shadow-inner bg-white/[0.01]">
                <form onSubmit={handleWhatsAppRedirect} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">{nameLabel}</label>
                      <input required type="text" value={formData.name} placeholder={namePlaceholder}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none text-sm font-medium transition-all"
                        style={{ color: '#fff' }}
                        onFocus={e => (e.target.style.borderColor = `${accentColor}80`)}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.05)')} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">{emailLabel}</label>
                      <input required type="email" value={formData.email} placeholder={emailPlaceholder}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 outline-none text-sm font-medium transition-all"
                        style={{ color: '#fff' }}
                        onFocus={e => (e.target.style.borderColor = `${accentColor}80`)}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.05)')} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">{deploymentLabel}</label>
                    <select value={formData.interest}
                      onChange={e => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full bg-[#050a18] border border-white/5 rounded-2xl px-6 py-4 outline-none text-sm font-medium text-slate-300 appearance-none cursor-pointer transition-all"
                      onFocus={e => (e.target.style.borderColor = `${accentColor}80`)}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.05)')}>
                      {deploymentOptions.map((opt, i) => <option key={i}>{opt}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">{messageLabel}</label>
                    <textarea required rows={5} value={formData.message} placeholder={messagePlaceholder}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-6 outline-none text-sm resize-none font-medium transition-all"
                      style={{ color: '#fff' }}
                      onFocus={e => (e.target.style.borderColor = `${accentColor}80`)}
                      onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.05)')} />
                  </div>
                  <button type="submit"
                    className="w-full group text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 shadow-lg"
                    style={{ background: accentColor, boxShadow: `0 10px 30px ${accentColor}33` }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)'; }}>
                    {submitBtnLabel} <Send size={16} />
                  </button>
                  <div className="flex items-center justify-center gap-6 pt-4 opacity-30">
                    {trustBadges.map((badge, i) => {
                      const Icon = BADGE_ICON_MAP[badge.icon] ?? ShieldCheck;
                      return (
                        <div key={i} className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                          <Icon size={14} /> {badge.label}
                        </div>
                      );
                    })}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP ──────────────────────────────────────────────────────────── */}
      <section className="pb-32 px-6">
        <div className="max-w-6xl mx-auto group">
          <div className="relative rounded-[3.5rem] overflow-hidden h-96 border border-white/5 shadow-2xl">
            <img src={mapImageUrl} alt={mapAltText}
              className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button onClick={() => window.open(mapLink, '_blank')}
                className="bg-white text-black px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all shadow-2xl">
                {mapBtnLabel} <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}