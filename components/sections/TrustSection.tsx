'use client';

import React from 'react';
import { Shield, ArrowRight, TrendingUp, Zap, Users, type LucideIcon } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, LucideIcon> = { Zap, Users, Shield, TrendingUp, ArrowRight };

interface TrustFeature { icon: string; iconColor: string; title: string; desc: string; }
interface SecurityLog  { label: string; status: string; color: string; }

const DEFAULT_TRUST_FEATURES: TrustFeature[] = [
  { icon: 'Zap',   iconColor: 'text-yellow-400', title: 'Instant Setup',    desc: 'Start in 5 minutes'  },
  { icon: 'Users', iconColor: 'text-green-400',  title: 'Multi-User Scale', desc: 'Unlimited agents'    },
];

const DEFAULT_SECURITY_LOGS: SecurityLog[] = [
  { label: 'Data Encryption', status: 'Active',     color: 'text-blue-400'  },
  { label: 'IP Masking',      status: 'Enabled',    color: 'text-blue-400'  },
  { label: 'Threat Detection',status: 'No threats', color: 'text-green-400' },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function TrustSection() {
  const { get } = usePageContent('trust-section2');

  const badgeText      = get('trust', 'badge_text',       'Max Efficiency');
  const headlineLine1  = get('trust', 'headline_line1',   'Secure more.');
  const headlineLine2  = get('trust', 'headline_line2',   'Earn more.');
  const bodyText       = get('trust', 'body_text',        'Humara platform sirf data protect nahi karta, balki workflows ko optimize karke aapki operational cost 35% tak kam kar deta hai.');
  const bodyBoldPhrase = get('trust', 'body_bold_phrase', 'operational cost 35% tak kam');
  const ctaBtnLabel    = get('trust', 'cta_btn_label',    'Maximize Your Profit');
  const shieldLabel    = get('trust', 'shield_label',     'Auto-Shield v3.0');
  const roiLabel       = get('trust', 'roi_label',        'Estimated ROI');
  const roiValue       = get('trust', 'roi_value',        '+248%');
  const roiBarPct      = Math.min(100, Math.max(0, parseInt(get('trust', 'roi_bar_pct', '85'), 10) || 85));
  const accentColor    = get('trust', 'accent_color',     '#3b82f6');

  const trustFeaturesRaw = get('trust', 'trust_features', '');
  const securityLogsRaw  = get('trust', 'security_logs',  '');
  const trustFeatures    = safeParse<TrustFeature[]>(trustFeaturesRaw, DEFAULT_TRUST_FEATURES);
  const securityLogs     = safeParse<SecurityLog[]>(securityLogsRaw,   DEFAULT_SECURITY_LOGS);

  const renderBody = () => {
    if (!bodyBoldPhrase || !bodyText.includes(bodyBoldPhrase)) return <>{bodyText}</>;
    const [before, after] = bodyText.split(bodyBoldPhrase);
    return <>{before}<strong className="text-white font-semibold">{bodyBoldPhrase}</strong>{after}</>;
  };

  return (
    <section className="py-20 md:py-24 bg-[#020617] relative overflow-hidden font-sans" aria-labelledby="trust-heading">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] blur-[150px] rounded-full -mr-64 -mt-64 pointer-events-none will-change-transform"
        style={{ backgroundColor: `${accentColor}1a` }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] blur-[130px] rounded-full -ml-48 -mb-48 pointer-events-none will-change-transform"
        style={{ backgroundColor: `${accentColor}1a` }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — Text */}
          <div className="space-y-8 order-2 lg:order-1">
            <header>
              <span className="inline-block text-[11px] font-bold px-4 py-1.5 rounded-full border uppercase tracking-widest"
                style={{ backgroundColor: `${accentColor}1a`, color: accentColor, borderColor: `${accentColor}33` }}>
                {badgeText}
              </span>
              <h2 id="trust-heading" className="text-5xl md:text-7xl font-black text-white mt-6 leading-[1.1] tracking-tight">
                {headlineLine1} <br />
                <span style={{ color: accentColor }}>{headlineLine2}</span>
              </h2>
              <p className="text-slate-400 text-lg mt-6 max-w-lg leading-relaxed">{renderBody()}</p>
            </header>

            {/* Trust feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trustFeatures.map((item, i) => {
                const Icon = ICON_MAP[item.icon] ?? Zap;
                return (
                  <div key={i} className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex items-start gap-4 hover:bg-white/[0.05] transition-colors">
                    <div className="p-2 bg-white/5 rounded-lg" aria-hidden="true">
                      <Icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">{item.title}</h3>
                      <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <button
                aria-label={ctaBtnLabel}
                className="w-full sm:w-auto px-8 py-4 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group active:scale-95"
                style={{ backgroundColor: accentColor, boxShadow: `0 20px 40px ${accentColor}33` }}
              >
                {ctaBtnLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right — Widget */}
          <div className="relative order-1 lg:order-2">
            <div className="absolute -inset-10 blur-[80px] rounded-full animate-pulse pointer-events-none"
              style={{ backgroundColor: `${accentColor}1a` }} />

            <article className="relative bg-[#0b0f1a] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-3xl overflow-hidden">
              <div className="space-y-10">
                {/* Header */}
                <div className="flex justify-between items-center text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}33` }}>
                      <Shield className="w-6 h-6" style={{ color: accentColor }} />
                    </div>
                    <span className="font-bold tracking-tight text-lg">{shieldLabel}</span>
                  </div>
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-[ping_2s_linear_infinite]" />
                </div>

                {/* ROI card */}
                <div className="bg-gradient-to-br from-white/[0.08] to-transparent p-6 rounded-3xl border border-white/10">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-slate-400 text-[10px] font-medium uppercase tracking-[0.2em] mb-2">{roiLabel}</p>
                      <span className="text-white text-4xl font-black tracking-tight">{roiValue}</span>
                    </div>
                    <TrendingUp className="w-10 h-10 text-green-400 mb-1" aria-hidden="true" />
                  </div>
                  <div className="mt-6 h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-1000 ease-out"
                      style={{ width: `${roiBarPct}%` }}
                    />
                  </div>
                </div>

                {/* Security logs */}
                <div className="space-y-3">
                  {securityLogs.map((log, i) => (
                    <div key={i} className="flex justify-between items-center text-[11px] font-mono py-2 border-b border-white/5 last:border-0">
                      <span className="text-slate-500">{log.label}</span>
                      <span className={`${log.color} font-bold`}>{log.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>

        </div>
      </div>
    </section>
  );
}