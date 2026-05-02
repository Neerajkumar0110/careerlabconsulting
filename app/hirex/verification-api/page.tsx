// app/hirex/verification-api/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import {
  ShieldCheck, Terminal, Key, Code2,
  Zap, Database, CheckCircle2, Copy,
  Check, ArrowRight, Lock, Server,
  Activity, Fingerprint, Webhook, AlertTriangle,
  Gauge, Package, MessageSquare, Github
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface WebhookEvent   { key: string; title: string; desc: string; color: string; hoverColor: string; iconName: string }
interface RateStatItem   { value: string; label: string }
interface CoreFeature    { iconName: string; title: string; desc: string; color: string; bg: string }
interface SdkItem        { iconName: string; label: string; color: string; hoverBorder: string }

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Fingerprint, Lock, Activity, Webhook, AlertTriangle, Database,
  Key, Package, Terminal, ShieldCheck, Zap,
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_CODE_EXAMPLES = JSON.stringify({
  curl: `curl -X GET "https://api.hirex.careerlab/v1/verify/{neural_hash}" \\\n  -H "Authorization: Bearer sk_test_hirex_..." \\\n  -H "Content-Type: application/json"`,
  node: `import { HireX } from '@hirex/sdk';\n\nconst hirex = new HireX('sk_test_hirex_...');\n\nconst verification = await hirex.verifyCandidate({\n  neuralHash: '0x9f4ab21c...'\n});\n\nconsole.log(verification.status); // "VERIFIED"`,
  python: `import hirex\n\nhirex.api_key = "sk_test_hirex_..."\n\nverification = hirex.Candidate.verify(\n    neural_hash="0x9f4ab21c..."\n)\n\nprint(verification.scores.logic)`,
});

const DEFAULT_JSON_RESPONSE = `{
  "success": true,
  "data": {
    "candidate_id": "HX-IND-9921",
    "neural_hash": "0x9f4ab21cd3",
    "verification_status": "VERIFIED",
    "metrics": {
      "technical_score": 96,
      "logic_score": 92,
      "system_design": 88
    },
    "security": {
      "anti_cheat_flag": "CLEAN",
      "identity_match": true
    },
    "timestamp": "2026-03-01T14:00:00Z"
  }
}`;

const DEFAULT_CORE_FEATURES = JSON.stringify([
  { iconName: 'Fingerprint', title: 'Neural Hash Validation',   desc: 'Every candidate assessment generates a unique cryptographic hash to ensure the scores cannot be tampered with.',            color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { iconName: 'Lock',        title: 'Anti-Cheat Audit Trail',   desc: 'Retrieve real-time flags for tab-switching, secondary device usage, or logic inconsistencies directly via API.',              color: 'text-red-400',    bg: 'bg-red-500/10'    },
  { iconName: 'Activity',    title: 'High Throughput',          desc: 'Built on TiDB serverless architecture, ensuring sub-50ms response times even during high-volume enterprise hiring cycles.',    color: 'text-cyan-400',   bg: 'bg-cyan-500/10'   },
]);

const DEFAULT_WEBHOOK_EVENTS = JSON.stringify([
  { key: 'candidate.verified', title: 'candidate.verified',  desc: 'Fired immediately when the AI successfully validates a candidate\'s logic and system design skills above the threshold.', color: 'bg-emerald-500', hoverColor: 'hover:text-emerald-400', iconName: 'Webhook'       },
  { key: 'anti_cheat.flagged', title: 'anti_cheat.flagged',  desc: 'Triggered if proctoring detects anomaly (e.g., unauthorized window focus, multi-face detection, pasted code).',            color: 'bg-red-500',     hoverColor: 'hover:text-red-400',     iconName: 'AlertTriangle' },
  { key: 'report.generated',  title: 'report.generated',    desc: 'Dispatched when the full 360° PDF and JSON matrix report is compiled and ready for HR download.',                           color: 'bg-blue-500',    hoverColor: 'hover:text-blue-400',    iconName: 'Database'      },
]);

const DEFAULT_RATE_STATS = JSON.stringify([
  { value: '1000',    label: 'Req / Minute (Standard)' },
  { value: 'AES-256', label: 'Data Encryption'         },
]);

const DEFAULT_SDK_ITEMS = JSON.stringify([
  { iconName: 'Package',  label: 'NPM',  color: 'text-red-400',  hoverBorder: 'hover:border-blue-500/50'   },
  { iconName: 'Package',  label: 'PyPI', color: 'text-blue-400', hoverBorder: 'hover:border-yellow-500/50' },
  { iconName: 'Terminal', label: 'Go',   color: 'text-cyan-400', hoverBorder: 'hover:border-cyan-500/50'   },
]);

const PAGE_KEY = 'hirex-verification-api';

export default function VerificationAPIPage() {
  const [activeLang, setActiveLang] = useState<'curl' | 'node' | 'python'>('node');
  const [copied, setCopied]         = useState(false);
  const { get } = usePageContent(PAGE_KEY);

  // ── CMS Values ────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',          '#10b981');
  const accentTo         = get('hero', 'accent_to',             '#22d3ee');
  const badgeText        = get('hero', 'badge_text',            'Zero-Trust Verification');
  const headlinePlain    = get('hero', 'headline_plain',        'Cryptographic');
  const headlineAccent   = get('hero', 'headline_accent',       'Verification API');
  const bodyText         = get('hero', 'body_text',             "Programmatically verify candidate skills, AI assessment scores, and anti-cheat records. Integrate HireX's immutable ledger directly into your HR tech stack.");
  const primaryBtnLabel  = get('hero', 'primary_btn_label',     'Request Sandbox Access');
  const secondaryBtnLabel= get('hero', 'secondary_btn_label',   'Read Full Docs');
  const docsLink         = get('hero', 'docs_link',             '/hirex/documentation');
  const endpointUrl      = get('hero', 'endpoint_url',          'https://api.hirex.careerlab/v1/verify/');
  const waNumber         = get('hero', 'whatsapp_number',       '918700236923');

  const codeExamplesRaw  = get('code', 'examples_json',         DEFAULT_CODE_EXAMPLES);
  const jsonResponse     = get('code', 'json_response',         DEFAULT_JSON_RESPONSE);
  const responseStatus   = get('code', 'response_status',       '200 OK');

  const coreFeaturesRaw  = get('features', 'items_json',        DEFAULT_CORE_FEATURES);
  const featuresSectionTitle = get('features', 'section_title', 'Core API Features');

  const webhookTitle     = get('webhooks', 'section_title',     'Event-Driven Architecture');
  const webhookSubtitle  = get('webhooks', 'section_subtitle',  'Listen for autonomous AI actions in real-time. Automatically trigger downstream workflows in your ATS.');
  const webhookEventsRaw = get('webhooks', 'events_json',       DEFAULT_WEBHOOK_EVENTS);

  const secTitle         = get('security', 'section_title',     'Built for scale. Secured by default.');
  const secBody          = get('security', 'body_text',         'Our API is designed to handle enterprise loads. Authenticate securely via OAuth 2.0 Bearer tokens. All endpoints support idempotency to prevent duplicate operations during network failures.');
  const rateStatsRaw     = get('security', 'rate_stats_json',   DEFAULT_RATE_STATS);
  const rateLimitLink    = get('security', 'rate_limit_link_label', 'Request Rate Limit Increase');

  const devTitle         = get('developer', 'section_title',    'Developer Ecosystem');
  const devSubtitle      = get('developer', 'section_subtitle', 'Official SDKs to get you up and running in minutes, backed by our engineering community.');
  const sdkItemsRaw      = get('developer', 'sdk_items_json',   DEFAULT_SDK_ITEMS);
  const githubBtnLabel   = get('developer', 'github_btn_label', 'View on GitHub');
  const discordBtnLabel  = get('developer', 'discord_btn_label','Join Discord Community');

  const ctaHeadline      = get('cta', 'headline',              'Ready to automate your pipeline?');
  const ctaBody          = get('cta', 'body_text',             'Generate your API keys today and start verifying AI-assessed candidates directly in your existing ATS or custom HR platforms.');
  const ctaPrimaryLabel  = get('cta', 'primary_btn_label',     'Generate API Keys');
  const ctaSecondLabel   = get('cta', 'secondary_btn_label',   'Read Documentation');

  // Modals / footers
  const modalFooterNote  = get('modal', 'footer_note',         'Secured Transmission: +91 870023 6923');

  // ── Parsed ────────────────────────────────────────────────────────────────
  const codeExamples    = safeParse<Record<string, string>>(codeExamplesRaw, { curl: '', node: '', python: '' });
  const coreFeatures    = safeParse<CoreFeature[]>(coreFeaturesRaw, []);
  const webhookEvents   = safeParse<WebhookEvent[]>(webhookEventsRaw, []);
  const rateStats       = safeParse<RateStatItem[]>(rateStatsRaw, []);
  const sdkItems        = safeParse<SdkItem[]>(sdkItemsRaw, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeLang] ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppRedirect = (context: string) => {
    const text = encodeURIComponent(`Hi, I'm interested in ${context} regarding the HireX API.`);
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  const highlightJson = (json: string) =>
    json
      .replace(/"(.*?)":/g, '<span class="text-slate-400">"$1":</span>')
      .replace(/true|false/g, '<span class="text-blue-400">$&</span>')
      .replace(/\d+/g, '<span class="text-purple-400">$&</span>')
      .replace(/"VERIFIED"|"CLEAN"/g, '<span class="text-emerald-400">$&</span>');

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-emerald-500/30 font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" style={{ background: `${accentColor}1a` }} />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-600/5 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── HERO ───────────────────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono uppercase tracking-widest mb-6"
              style={{ background: `${accentColor}1a`, borderColor: `${accentColor}4d`, color: accentColor, boxShadow: `0 0 20px ${accentColor}33` }}>
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" /> {badgeText}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              {headlinePlain}{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentTo})` }}>
                {headlineAccent}
              </span>
            </h1>
            <p className="text-sm md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-8">{bodyText}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => handleWhatsAppRedirect('getting Sandbox API Access')}
                className="text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1"
                style={{ background: accentColor, boxShadow: `0 0 20px ${accentColor}4d` }}>
                {primaryBtnLabel} <Zap className="w-4 h-4" />
              </button>
              <Link href={docsLink}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-1">
                {secondaryBtnLabel} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ── CODE INTERFACE ─────────────────────────────────────────────── */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-32 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            {/* Left: Code Snippets */}
            <div className="bg-[#0b0f1f]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 px-4 md:px-6 py-3 md:py-4 bg-black/40">
                <div className="flex gap-2 md:gap-4 overflow-x-auto no-scrollbar">
                  {(['curl', 'node', 'python'] as const).map(lang => (
                    <button key={lang} onClick={() => setActiveLang(lang)}
                      className="text-[10px] md:text-xs font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors whitespace-nowrap"
                      style={activeLang === lang ? { borderColor: accentColor, color: '#fff' } : { borderColor: 'transparent', color: '#64748b' }}>
                      {lang === 'node' ? 'Node.js' : lang}
                    </button>
                  ))}
                </div>
                <button onClick={handleCopy} className="text-slate-400 transition-colors shrink-0 ml-4"
                  style={{ color: copied ? accentColor : undefined }}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-6 md:p-8 flex-grow bg-black/20">
                <div className="mb-4 flex items-center gap-3 text-[10px] md:text-xs font-mono bg-black/40 p-3 rounded-lg border border-white/5">
                  <span className="font-bold" style={{ color: accentColor }}>GET</span>
                  <span className="text-slate-300 overflow-x-auto no-scrollbar">{endpointUrl}<span className="text-purple-400">{'{'+'neural_hash'+'}'}</span></span>
                </div>
                <pre className="font-mono text-xs md:text-sm text-blue-200 overflow-x-auto custom-scrollbar leading-relaxed">
                  <code>{codeExamples[activeLang]}</code>
                </pre>
              </div>
            </div>

            {/* Right: JSON Response */}
            <div className="bg-[#0b0f1f]/90 backdrop-blur-2xl border rounded-[2rem] shadow-2xl flex flex-col overflow-hidden relative"
              style={{ borderColor: `${accentColor}33`, boxShadow: `0 0 50px ${accentColor}1a` }}>
              <div className="absolute top-0 right-0 w-full h-1" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentTo})` }} />
              <div className="flex items-center justify-between border-b border-white/10 px-4 md:px-6 py-3 md:py-4 bg-black/40">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
                  <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest font-bold" style={{ color: accentColor }}>Response: {responseStatus}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">application/json</span>
              </div>
              <div className="p-6 md:p-8 flex-grow overflow-y-auto custom-scrollbar">
                <pre className="font-mono text-[11px] md:text-sm text-emerald-100 leading-relaxed">
                  <code dangerouslySetInnerHTML={{ __html: highlightJson(jsonResponse) }} />
                </pre>
              </div>
            </div>
          </div>

          {/* ── CORE FEATURES ──────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 md:mb-32">
            {coreFeatures.map((feat, idx) => {
              const Icon = ICON_MAP[feat.iconName] ?? ShieldCheck;
              return (
                <div key={idx} className="bg-slate-900/40 border border-white/10 rounded-3xl p-8 hover:bg-slate-900/60 transition-colors">
                  <div className={`w-12 h-12 rounded-2xl ${feat.bg} border border-white/5 flex items-center justify-center mb-6`}>
                    <Icon className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>

          {/* ── WEBHOOKS ───────────────────────────────────────────────────── */}
          <section className="mb-20 md:mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{webhookTitle}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">{webhookSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {webhookEvents.map((ev, i) => {
                const Icon = ICON_MAP[ev.iconName] ?? Webhook;
                return (
                  <div key={i} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-1 h-full ${ev.color}`} />
                    <Icon className="w-8 h-8 mb-4" style={{ color: ev.color.replace('bg-', '').replace('-500', '') }} />
                    <h4 className="font-mono text-sm mb-2" style={{ color: '#a5f3fc' }}>{ev.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{ev.desc}</p>
                    <button onClick={() => handleWhatsAppRedirect(`the ${ev.title} webhook`)}
                      className={`text-[10px] uppercase font-bold text-slate-500 ${ev.hoverColor} transition-colors flex items-center gap-1`}>
                      View Payload <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── SECURITY / RATE LIMITS ─────────────────────────────────────── */}
          <section className="mb-20 md:mb-32">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <Gauge className="w-4 h-4" /> Infrastructure Limits
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{secTitle}</h2>
                <p className="text-slate-400 mb-8 leading-relaxed text-base">{secBody}</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {rateStats.map((stat, i) => (
                    <div key={i} className="bg-black/30 p-4 rounded-xl border border-white/5">
                      <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => handleWhatsAppRedirect('requesting a Rate Limit Increase for our enterprise')}
                  className="font-bold flex items-center gap-2 transition-colors hover:opacity-80"
                  style={{ color: accentColor }}>
                  {rateLimitLink} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="bg-[#0b0f1f] rounded-2xl border border-white/10 p-6 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                    <span className="text-xs font-mono text-slate-400">Rate Limit Headers</span>
                    <Lock className="w-4 h-4" style={{ color: accentColor }} />
                  </div>
                  <div className="space-y-3 font-mono text-xs md:text-sm">
                    <div className="flex justify-between"><span className="text-blue-400">X-RateLimit-Limit:</span><span className="text-slate-300">1000</span></div>
                    <div className="flex justify-between"><span className="text-blue-400">X-RateLimit-Remaining:</span><span style={{ color: accentColor }}>998</span></div>
                    <div className="flex justify-between"><span className="text-blue-400">X-RateLimit-Reset:</span><span className="text-purple-400">1710002400</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── DEVELOPER ECOSYSTEM ────────────────────────────────────────── */}
          <section className="mb-20 md:mb-32 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{devTitle}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10">{devSubtitle}</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-4xl mx-auto mb-12">
              {sdkItems.map((sdk, i) => {
                const Icon = ICON_MAP[sdk.iconName] ?? Package;
                return (
                  <button key={i} onClick={() => handleWhatsAppRedirect(`${sdk.label} SDK setup`)}
                    className={`px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 ${sdk.hoverBorder} transition-all flex flex-col items-center gap-2 w-32`}>
                    <Icon className={`w-8 h-8 ${sdk.color}`} />
                    <span className="text-xs font-bold text-slate-300">{sdk.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => handleWhatsAppRedirect('accessing the GitHub Repositories')}
                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center gap-2 font-bold text-sm">
                <Github className="w-4 h-4" /> {githubBtnLabel}
              </button>
              <button onClick={() => handleWhatsAppRedirect('joining the Developer Discord')}
                className="bg-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2]/30 px-6 py-3 rounded-xl transition-colors flex items-center gap-2 font-bold text-sm">
                <MessageSquare className="w-4 h-4" /> {discordBtnLabel}
              </button>
            </div>
          </section>

          {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
          <div className="border rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
            style={{ background: `linear-gradient(to right, ${accentColor}1a, #0b0f1f)`, borderColor: `${accentColor}4d` }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: `${accentColor}1a`, filter: 'blur(100px)' }} />
            <div className="relative z-10 max-w-xl">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4">{ctaHeadline}</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">{ctaBody}</p>
            </div>
            <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto">
              <button onClick={() => handleWhatsAppRedirect('generating Production API Keys')}
                className="w-full md:w-auto px-8 py-4 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 hover:-translate-y-1"
                style={{ background: accentColor, boxShadow: `0 0 20px ${accentColor}4d` }}>
                <Key className="w-5 h-5" /> {ctaPrimaryLabel}
              </button>
              <Link href={docsLink}
                className="w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 hover:-translate-y-1">
                {ctaSecondLabel} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(16,185,129,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(16,185,129,0.6); }
      `}</style>
    </main>
  );
}