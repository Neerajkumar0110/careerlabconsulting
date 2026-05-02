// app/hirex/support/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import {
  HelpCircle, MessageSquare, ShieldCheck, Zap,
  Search, Mail, Phone, MapPin, ChevronRight,
  Send, Loader2, CheckCircle2, Plus, Minus,
  Activity, Server, Users, Terminal,
  ArrowRight, Building2
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Types ─────────────────────────────────────────────────────────────────────
interface SupportCard  { title: string; body: string; action: string; icon: string; color: string }
interface FaqCategory  { category: string; questions: { q: string; a: string }[] }
interface ContactNode  { title: string; value: string; subtext: string; icon: string; href: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = {
  Terminal, Users, Building2, Phone, Mail, MapPin, Zap, Server,
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_SUPPORT_CARDS = JSON.stringify([
  { title: 'Technical API Support', body: 'Integration help, webhook configuration, and ATS syncing issues.',            action: 'Read Docs',     icon: 'Terminal',  color: 'blue'    },
  { title: 'Candidate Help',        body: 'Assessment resets, proctoring issues, or skill report clarifications.',        action: 'View Guide',    icon: 'Users',     color: 'emerald' },
  { title: 'Enterprise Sales',      body: 'Upgrade plans, custom AI models, and volume-based hiring.',                    action: 'Contact Sales', icon: 'Building2', color: 'purple'  },
], null, 2);

const DEFAULT_CONTACT_NODES = JSON.stringify([
  { title: 'Direct Comm-Link', value: '+91 870023 6923',           subtext: 'Available Mon-Fri, 9AM-6PM IST',                          icon: 'Phone', href: 'tel:+918700236923'  },
  { title: 'Global Inbox',     value: 'info@careerlabconsulting.com', subtext: 'Average response time: < 2 hours',                     icon: 'Mail',  href: 'mailto:info@careerlabconsulting.com' },
  { title: 'HQ Coordinates',  value: 'Gurugram, India',            subtext: 'DLF Cyber City, 5th Floor, Cyber Green-2, Sec-25',       icon: 'MapPin',href: 'https://www.google.com/maps/search/?api=1&query=DLF+Cyber+City+Gurugram' },
], null, 2);

const DEFAULT_FAQ = JSON.stringify([
  {
    category: 'AI Assessments',
    questions: [
      { q: 'How does the AI determine my skill score?', a: 'Our engine analyzes logic consistency, time complexity of code, and architectural decisions using state-of-the-art LLMs.' },
      { q: 'Can I retake a failed assessment?',          a: 'Standard policy allows a retake after 30 days. This cool-down period ensures candidates have time to upskill before re-attempting.' },
      { q: 'Is the assessment recorded?',                a: 'Yes, enterprise-grade proctoring captures screen, audio, and code-editor activity to ensure 100% integrity for hiring managers.' },
    ],
  },
  {
    category: 'Enterprise Integrations',
    questions: [
      { q: 'Does HireX sync with our existing ATS?',  a: 'Yes. Enterprise partners can use our custom API webhooks to push 360-reports directly into Workday, Greenhouse, or Lever.' },
      { q: 'How do we customize the grading rubric?', a: 'Account admins can access the Benchmarks dashboard to adjust the specific weights for logic, system design, and communication for each open role.' },
    ],
  },
], null, 2);

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [formData, setFormData]         = useState({ name: '', email: '', subject: 'technical', message: '' });
  const [openFaq, setOpenFaq]           = useState<string | null>(null);

  const { get } = usePageContent('hirex-support');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const accentFrom      = get('hero', 'accent_from',    '#3b82f6');
  const accentTo        = get('hero', 'accent_to',      '#22d3ee');
  const heroBadge       = get('hero', 'badge_text',     '24/7 Global Support');
  const heroTitle       = get('hero', 'headline_plain', 'How can we');
  const heroTitleAccent = get('hero', 'headline_accent','help you?');
  const heroBody        = get('hero', 'body_text',      'Find technical documentation, manage your enterprise account, or initialize a direct transmission to our support engineering team.');
  const searchPlaceholder = get('hero', 'search_placeholder', 'Search for articles, guides, or API endpoints...');

  const supportCards  = safeParse<SupportCard[]>(get('support_cards', 'items_json', DEFAULT_SUPPORT_CARDS), []);

  const apiUptime     = get('status', 'api_uptime',  '99.99%');
  const apiLatency    = get('status', 'api_latency', '42ms');
  const statusTitle   = get('status', 'headline',    'All Systems Operational');
  const statusBody    = get('status', 'body_text',   'HireX AI Evaluator and TiDB clusters are running optimally.');

  const contactNodes  = safeParse<ContactNode[]>(get('contact', 'nodes_json', DEFAULT_CONTACT_NODES), []);
  const faqItems      = safeParse<FaqCategory[]>(get('faq',     'items_json', DEFAULT_FAQ), []);

  const formTitle     = get('form', 'headline',      'Direct Transmission');
  const formSubtitle  = get('form', 'subheading',    'Average human response time: < 2 hours');
  const formBtn       = get('form', 'btn_label',     'Initialize Ticket');
  const formSuccessTitle = get('form', 'success_title', 'Message Received');
  const formSuccessBody  = get('form', 'success_body',  'Our support engineers have received your transmission and are reviewing the logs.');
  const waNumber      = get('form', 'whatsapp_number', '918700236923');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(res => setTimeout(res, 1500));
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: 'technical', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{ background: `${accentFrom}1a`, filter: 'blur(150px)', transform: 'translate(33%, -33%)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{ background: `${accentTo}1a`, filter: 'blur(120px)', transform: 'translate(-33%, 33%)' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33`, color: accentFrom }}>
            <HelpCircle className="w-4 h-4" /> {heroBadge}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            {heroTitle}{' '}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
              {heroTitleAccent}
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">{heroBody}</p>
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute -inset-1 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"
              style={{ background: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }} />
            <div className="relative flex items-center bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl">
              <Search className="w-6 h-6 text-slate-400 ml-4" />
              <input type="text" placeholder={searchPlaceholder}
                className="w-full bg-transparent border-none px-4 py-3 text-white focus:outline-none placeholder:text-slate-500" />
              <button className="text-white font-bold px-6 py-3 rounded-xl transition-all hidden sm:block"
                style={{ background: accentFrom }}>
                Search
              </button>
            </div>
          </div>
        </section>

        {/* ── SUPPORT CARDS ─────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportCards.map((card, i) => {
              const Icon = ICON_MAP[card.icon] ?? Terminal;
              return (
                <div key={i} className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 hover:bg-slate-900/60 transition-colors group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border"
                    style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
                    <Icon className="w-7 h-7" style={{ color: accentFrom }} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{card.body}</p>
                  <div className="flex items-center text-sm font-bold gap-2 group-hover:translate-x-1 transition-transform"
                    style={{ color: accentFrom }}>
                    {card.action} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SYSTEM STATUS ─────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24 max-w-7xl mx-auto">
          <div className="border rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            style={{ background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.2)' }}>
            <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
              <div className="relative flex h-12 w-12 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20" />
                <span className="relative inline-flex rounded-full h-12 w-12 bg-emerald-500/20 border border-emerald-500/50 items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{statusTitle}</h3>
                <p className="text-sm text-slate-400">{statusBody}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 w-full md:w-auto relative z-10">
              <div className="bg-black/30 border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3">
                <Server className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">API Uptime</p>
                  <p className="text-sm font-mono font-bold text-emerald-400">{apiUptime}</p>
                </div>
              </div>
              <div className="bg-black/30 border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3">
                <Zap className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Avg Latency</p>
                  <p className="text-sm font-mono font-bold text-emerald-400">{apiLatency}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT + FAQ + FORM ──────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-10">

              {/* Contact nodes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {contactNodes.map((node, i) => {
                  const Icon = ICON_MAP[node.icon] ?? Phone;
                  return (
                    <div key={i} className="bg-slate-900/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:border-blue-500/30 transition-colors">
                      <Icon className="w-6 h-6 mb-4" style={{ color: accentFrom }} />
                      <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-2">{node.title}</h4>
                      <a href={node.href} className="text-base font-bold text-white hover:text-blue-400 transition-colors block break-all">{node.value}</a>
                      <p className="text-xs text-slate-500 mt-1">{node.subtext}</p>
                    </div>
                  );
                })}
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-3xl font-bold mb-4">Knowledge Base</h2>
                <p className="text-slate-400 mb-8">Browse our most frequently asked questions before submitting a ticket.</p>
                <div className="space-y-6">
                  {faqItems.map((cat, i) => (
                    <div key={i} className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-2">{cat.category}</p>
                      {cat.questions.map((item, qi) => (
                        <div key={qi} className="bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden transition-all">
                          <button onClick={() => setOpenFaq(openFaq === item.q ? null : item.q)}
                            className="w-full p-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors">
                            <span className="text-sm md:text-base font-bold text-slate-200">{item.q}</span>
                            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors"
                              style={openFaq === item.q ? { background: `${accentFrom}33`, color: accentFrom } : { background: 'rgba(255,255,255,0.05)', color: '#64748b' }}>
                              {openFaq === item.q ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </div>
                          </button>
                          {openFaq === item.q && (
                            <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                              {item.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 sticky top-32 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                  style={{ background: `${accentFrom}1a`, filter: 'blur(40px)' }} />
                <h3 className="text-2xl font-bold mb-2 relative z-10">{formTitle}</h3>
                <p className="text-slate-400 text-sm mb-8 relative z-10">{formSubtitle}</p>

                {submitted ? (
                  <div className="py-20 text-center relative z-10">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30"
                      style={{ background: 'rgba(16,185,129,0.2)', boxShadow: '0 0 30px rgba(16,185,129,0.2)' }}>
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{formSuccessTitle}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed px-6">{formSuccessBody}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    {[
                      { label: 'Full Name',   key: 'name',    type: 'text',  placeholder: 'John Doe'              },
                      { label: 'Work Email',  key: 'email',   type: 'email', placeholder: 'john@enterprise.com'   },
                    ].map(field => (
                      <div key={field.key}>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2 block">{field.label}</label>
                        <input required type={field.type} placeholder={field.placeholder}
                          className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                          value={(formData as any)[field.key]}
                          onChange={e => setFormData({ ...formData, [field.key]: e.target.value })} />
                      </div>
                    ))}
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Support Category</label>
                      <select className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                        value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}>
                        <option value="technical" className="bg-slate-900">Technical Issue</option>
                        <option value="enterprise" className="bg-slate-900">Enterprise Sales</option>
                        <option value="billing"   className="bg-slate-900">Billing Inquiry</option>
                        <option value="other"     className="bg-slate-900">Other Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-2 block">Message Detail</label>
                      <textarea required rows={4} placeholder="Describe your bottleneck..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all resize-none placeholder:text-slate-600"
                        value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                    </div>
                    <button disabled={isSubmitting}
                      className="w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                      style={{ background: accentFrom, boxShadow: `0 0 20px ${accentFrom}4d` }}>
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> {formBtn}</>}
                    </button>
                    <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-4">Secure End-to-End Encryption</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}