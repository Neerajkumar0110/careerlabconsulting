'use client';

import React, { useState, useEffect } from 'react';
import {
  Check, Zap, Crown, Terminal, ShieldCheck, Sparkles,
  TrendingUp, Calendar, CreditCard, Globe, Gift,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePageContent } from '@/hooks/usePageContent';

// ── Types ─────────────────────────────────────────────────────────────────────
interface TierFeature { text: string }
interface EmiPartner  { name: string; logo: string }

interface TierCMS {
  id: string;
  name: string;
  duration: string;
  price_inr: string;
  price_usd: string;
  raw_amount_inr: number;
  raw_amount_usd: number;
  emi_text_in: string;
  emi_text_intl: string;
  scholarship_max: string;
  scholarship_avg: string;
  description: string;
  target_ctc_in: string;
  target_ctc_intl: string;
  features: string[];
  highlight: boolean;
  icon: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = { Terminal, Crown, Zap, Sparkles };
function resolveIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Terminal;
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_PARTNERS: EmiPartner[] = [
  { name: 'HDFC',          logo: 'https://cdn.worldvectorlogo.com/logos/hdfc-bank-logo.svg' },
  { name: 'ICICI',         logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/3840px-ICICI_Bank_Logo.svg.png' },
  { name: 'Bajaj Finance', logo: 'https://brandlogos.net/wp-content/uploads/2021/10/Bajaj-Finance-logo-.png' },
  { name: 'Propel',        logo: 'https://niuonline.edu.in/wp-content/uploads/2025/08/Propelld-Blue-Logo-3-2-1024x177.webp' },
  { name: 'ShopSe',        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBNp2z8bJCidU0Z4TCfjF4JARJkY4Gh1_5Qw&s' },
];

const DEFAULT_TIERS: TierCMS[] = [
  {
    id: 'plan-foundation',
    name: 'Foundation',
    duration: '6 Months',
    price_inr: '₹1,20,000',
    price_usd: '$1,499',
    raw_amount_inr: 12000000,
    raw_amount_usd: 149900,
    emi_text_in: 'EMI starts from: ₹3,933',
    emi_text_intl: 'Flexible installments available',
    scholarship_max: 'Max Scholarship: ₹50,000',
    scholarship_avg: 'Avg. Scholarship: ₹20k - ₹30k',
    description: 'Build your first AI career asset with ResumeNFT visibility.',
    target_ctc_in: 'Avg CTC: ₹6-12 LPA',
    target_ctc_intl: 'Avg Salary: $40k-$60k',
    features: [
      'Real Startup Agentic AI Projects',
      'ResumeNFT + GitHub Portfolio',
      'Python & Prompt Engineering Basics',
      '1 Verified Internship Certificate',
      'GPT & LangChain Starter Projects',
      'HireX Network Access',
    ],
    highlight: false,
    icon: 'Terminal',
  },
  {
    id: 'plan-elite',
    name: 'Elite',
    duration: '12 Months',
    price_inr: '₹2,00,000',
    price_usd: '$2,699',
    raw_amount_inr: 20000000,
    raw_amount_usd: 269900,
    emi_text_in: 'EMI starts from: ₹6,555',
    emi_text_intl: 'Flexible installments available',
    scholarship_max: 'Max Scholarship: ₹1,00,000',
    scholarship_avg: 'Avg. Scholarship: ₹40k - ₹70k',
    description: 'Top-tier program for international roles with legal job.',
    target_ctc_in: 'Avg CTC: ₹10-26 LPA',
    target_ctc_intl: 'Avg Salary: $80k-$120k',
    features: [
      '100% Legal (Signed Contract)',
      'Weekly 1-on-1 Expert Mentoring',
      '3+ Global Showcase Projects',
      '3 Premium Bonus Internships',
      'Advanced Agentic AI Workflows',
      'Germany/Remote Role Specialization',
    ],
    highlight: true,
    icon: 'Crown',
  },
];

const DEFAULT_TIERS_JSON    = JSON.stringify(DEFAULT_TIERS);
const DEFAULT_PARTNERS_JSON = JSON.stringify(DEFAULT_PARTNERS);

// ── Component ─────────────────────────────────────────────────────────────────
export default function PricingSection() {
  const router = useRouter();
  const [countryCode, setCountryCode]     = useState<string>('IN');
  const [isInternational, setIsInternational] = useState<boolean>(false);

  const { get } = usePageContent('pricing');

  // ── CMS values ────────────────────────────────────────────────────────────
  const badgeText      = get('header', 'badge_text',       'Enrollment Portal');
  const headline       = get('header', 'headline',         'Choose Your');
  const headlineAlt    = get('header', 'headline_alt',     'Evolution');
  const accentColor    = get('header', 'accent_color',     '#3b82f6');
  const securityLabel  = get('footer', 'security_label',   'InternX-AI Secure SSL | PCI-DSS Compliant Gateway');
  const checkoutPath   = get('settings', 'checkout_path',  '/checkout/b2c');
  const bookDemoPath   = get('settings', 'book_demo_path', '/book-demo');

  const tiersRaw    = get('tiers',    'items_json',    DEFAULT_TIERS_JSON);
  const tiers       = safeParse<TierCMS[]>(tiersRaw, DEFAULT_TIERS);

  const partnersRaw = get('partners', 'items_json',    DEFAULT_PARTNERS_JSON);
  const partners    = safeParse<EmiPartner[]>(partnersRaw, DEFAULT_PARTNERS);

  // ── Location detection ────────────────────────────────────────────────────
  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch('/api/location');
        if (!response.ok) throw new Error('Failed');
        const data = await response.json();
        const code = data?.country_code || 'IN';
        setCountryCode(code);
        setIsInternational(code !== 'IN');
      } catch {
        setCountryCode('IN');
        setIsInternational(false);
      }
    };
    checkLocation();
  }, []);

  const handleRegister = (tier: TierCMS) => {
    const params = new URLSearchParams({
      planId:        tier.id,
      planName:      tier.name,
      priceDisplay:  isInternational ? tier.price_usd : tier.price_inr,
      rawAmountINR:  tier.raw_amount_inr.toString(),
      rawAmountUSD:  tier.raw_amount_usd.toString(),
      intl:          isInternational ? 'true' : 'false',
    });
    router.push(`${checkoutPath}?${params.toString()}`);
  };

  const handleBookDemo = () => router.push(bookDemoPath);

  return (
    <section className="py-20 md:py-32 bg-[#020617] text-white font-sans relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <header className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}
          >
            <Sparkles className="w-3 h-3" style={{ color: accentColor }} />
            <span
              className="text-[10px] font-black uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              {badgeText}
            </span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            {headline}{' '}
            <span className="italic text-slate-500 font-serif lowercase">{headlineAlt}</span>
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
              <Globe className="w-3 h-3" />
              {isInternational
                ? `International Pricing (${countryCode})`
                : `India Pricing (${countryCode})`}
            </div>
          </div>
        </header>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-32">
          {tiers.map((tier) => {
            const TierIcon = resolveIcon(tier.icon);
            return (
              <article
                key={tier.id}
                className={`relative p-8 md:p-12 rounded-[3rem] border flex flex-col transition-all duration-500 ${
                  tier.highlight ? 'md:scale-105 z-20' : ''
                }`}
                style={{
                  background: tier.highlight ? '#0a1229' : 'rgba(255,255,255,0.02)',
                  borderColor: tier.highlight ? accentColor : 'rgba(255,255,255,0.1)',
                  boxShadow: tier.highlight ? `0 25px 50px -12px ${accentColor}33` : 'none',
                }}
              >
                {/* Scholarship badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-600 px-4 py-1.5 rounded-full border border-yellow-400 shadow-lg z-30 flex items-center gap-2">
                  <Gift className="w-3.5 h-3.5 text-white fill-white/20" />
                  <span className="text-[10px] font-black uppercase text-white tracking-tighter">
                    Scholarship Available
                  </span>
                </div>

                {/* Icon + name */}
                <div className="mb-8">
                  <TierIcon
                    className="w-14 h-14 mb-8"
                    style={{ color: tier.highlight ? accentColor : '#64748b' }}
                  />
                  <h3 className="text-4xl font-black uppercase mb-2">{tier.name}</h3>
                  <p
                    className="font-bold text-sm tracking-widest uppercase mb-6"
                    style={{ color: accentColor }}
                  >
                    {tier.duration} Program
                  </p>

                  {/* Price */}
                  <div className="flex flex-col gap-1">
                    <span className="text-6xl font-black tracking-tighter">
                      {isInternational ? tier.price_usd : tier.price_inr}
                    </span>
                    <div className="flex flex-col mt-2 mb-4">
                      <span className="text-yellow-500 text-sm font-black uppercase tracking-tight">
                        {tier.scholarship_max}
                      </span>
                      <span className="text-slate-500 text-[10px] font-bold uppercase italic">
                        {tier.scholarship_avg}
                      </span>
                    </div>

                    {/* CTC */}
                    <div
                      className="rounded-xl p-3 mt-1 flex items-center gap-2"
                      style={{
                        background: `${accentColor}1a`,
                        border: `1px solid ${accentColor}33`,
                      }}
                    >
                      <TrendingUp className="w-4 h-4" style={{ color: accentColor }} />
                      <span
                        className="text-sm font-bold uppercase"
                        style={{ color: accentColor }}
                      >
                        {isInternational ? tier.target_ctc_intl : tier.target_ctc_in}
                      </span>
                    </div>

                    {/* EMI */}
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mt-2">
                      <span className="text-green-400 text-sm font-bold flex items-center gap-2 italic mb-3">
                        <Zap className="w-4 h-4 fill-green-400" />
                        {isInternational ? tier.emi_text_intl : tier.emi_text_in}
                      </span>
                      {!isInternational && (
                        <div className="border-t border-green-500/10 pt-4">
                          <div className="grid grid-cols-5 gap-3 items-center opacity-80 hover:opacity-100 transition-all duration-500">
                            {partners.map((p) => (
                              <img
                                key={p.name}
                                src={p.logo}
                                alt={p.name}
                                className="h-5 w-auto object-contain mx-auto bg-white p-1 rounded-sm"
                                loading="lazy"
                              />
                            ))}
                          </div>
                          <p className="text-[7px] uppercase font-black tracking-[0.2em] text-center text-slate-600 mt-4 italic">
                            No-Cost EMI Approved Partners
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-12 flex-1 border-t border-white/5 pt-8">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check
                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                        style={{ color: accentColor }}
                      />
                      <span className="text-slate-300 text-sm font-medium leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4 mt-auto">
                  <button
                    onClick={() => handleRegister(tier)}
                    className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all text-white cursor-pointer relative z-30"
                    style={{
                      background: accentColor,
                      boxShadow: `0 10px 30px -10px ${accentColor}80`,
                    }}
                  >
                    <CreditCard className="w-4 h-4" /> Register Now
                  </button>
                  <button
                    onClick={handleBookDemo}
                    className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all bg-white/5 hover:bg-white/10 border border-white/20 text-white group cursor-pointer relative z-30"
                  >
                    <Calendar className="w-4 h-4 text-green-400 group-hover:scale-125 transition-transform" />
                    Book Your Demo
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Security badge */}
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 italic">
              {securityLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}