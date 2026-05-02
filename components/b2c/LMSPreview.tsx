'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Cpu, Globe, Shield, Zap, Terminal, Send, Sparkles, Loader2, Crown, Timer, Wifi, Rocket
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useRouter } from 'next/navigation';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface StatItem  { label: string; value: string; icon: string; color: string; bg: string }
interface PlanItem  { id: string; name: string; price: string; rawAmount: number; icon: string; ctc: string }

// ── Icon maps ─────────────────────────────────────────────────────────────────
const STAT_ICON_MAP: Record<string, React.ElementType> = { Cpu, Globe, Shield };
const PLAN_ICON_MAP: Record<string, React.ElementType> = { Terminal, Crown };

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_STATS: StatItem[] = [
  { label: 'Neural Training', value: '85%',       icon: 'Cpu',    color: 'text-cyan-400',   bg: 'bg-cyan-500/10' },
  { label: 'Project Nodes',   value: '12 Active', icon: 'Globe',  color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Security Clearance', value: 'Lvl 4',  icon: 'Shield', color: 'text-amber-400',  bg: 'bg-amber-500/10' },
];
const DEFAULT_PLANS: PlanItem[] = [
  { id: 'plan-foundation', name: 'Foundation', price: '₹1,20,000', rawAmount: 120000, icon: 'Terminal', ctc: '6-12 LPA' },
  { id: 'plan-elite',      name: 'Elite',      price: '₹2,00,000', rawAmount: 200000, icon: 'Crown',    ctc: '10-26 LPA' },
];

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

export default function LMSPreview() {
  const router = useRouter();
  const { get } = usePageContent('lms-preview');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const badgeText        = get('hero', 'badge_text',       'Mission Control Ready');
  const headline1        = get('hero', 'headline_1',       'Manee');
  const headline2        = get('hero', 'headline_2',       'AI');
  const headline3        = get('hero', 'headline_3',       'Ecosystem');
  const bodyText         = get('hero', 'body_text',        'Deploy your career into orbit with Manee 2.5 Flash. Real-time code analysis and autonomous debugging in a zero-gravity environment.');
  const highlightText    = get('hero', 'highlight_text',   'Manee 2.5 Flash');
  const accentFrom       = get('hero', 'accent_from',      '#f97316');
  const accentTo         = get('hero', 'accent_to',        '#7c2d12');

  const welcomeMessage   = get('chat', 'welcome_message',  'Neural connection established. I am Manee 2.5 Flash. How can I assist your deployment today?');
  const inputPlaceholder = get('chat', 'input_placeholder','Initialize command...');
  const timerLabel       = get('chat', 'timer_label',      'Offer Ends In:');
  const pricingHeader    = get('chat', 'pricing_header',   'Trajectory Options');
  const avgPackageLabel  = get('chat', 'avg_package_label','Avg Package:');
  const launchBtnLabel   = get('chat', 'launch_btn_label', 'Launch');
  const satLinkText      = get('chat', 'sat_link_text',    'SAT-LINK: ACTIVE');
  const encryptionText   = get('chat', 'encryption_text',  'ENCRYPTION: MILITARY GRADE');
  const versionText      = get('chat', 'version_text',     'Manee v2.5');
  const errorMessage     = get('chat', 'error_message',    'Error: Connection to Neural Node lost. Check API Key.');

  const statsRaw = get('hero', 'stats_json', JSON.stringify(DEFAULT_STATS));
  const plansRaw = get('chat', 'plans_json', JSON.stringify(DEFAULT_PLANS));

  const stats = safeParse<StatItem[]>(statsRaw, DEFAULT_STATS);
  const plans = safeParse<PlanItem[]>(plansRaw, DEFAULT_PLANS);

  // ── State ──────────────────────────────────────────────────────────────────
  const [userInput, setUserInput] = useState('');
  const [hasShowedPricing, setHasShowedPricing] = useState(false);
  const [timeLeft, setTimeLeft] = useState('23:59:59');
  const [messages, setMessages] = useState(() => [
    { role: 'assistant', content: welcomeMessage },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep welcome message in sync with CMS
  useEffect(() => {
    setMessages([{ role: 'assistant', content: welcomeMessage }]);
  }, [welcomeMessage]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      setTimeLeft(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, hasShowedPricing, isTyping]);

  const handleRegister = (plan: PlanItem) => {
    const discount = plan.rawAmount * 0.10;
    const finalAmount = plan.rawAmount - discount;
    const params = new URLSearchParams({
      planId: plan.id,
      planName: plan.name,
      priceDisplay: plan.price,
      rawAmountINR: finalAmount.toString(),
      originalAmountINR: plan.rawAmount.toString(),
      isEarlyBird: 'true',
      intl: 'false',
    });
    router.push(`/checkout/b2c?${params.toString()}`);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsTyping(true);
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      setMessages([...newMessages, { role: 'assistant', content: response.text() }]);
      if (!hasShowedPricing) setTimeout(() => setHasShowedPricing(true), 1000);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: errorMessage }]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderBodyText = () => {
    if (!highlightText || !bodyText.includes(highlightText)) return <>{bodyText}</>;
    const parts = bodyText.split(highlightText);
    return (
      <>{parts[0]}<span className="text-white font-bold">{highlightText}</span>{parts[1]}</>
    );
  };

  return (
    <section className="py-12 md:py-32 bg-[#000000] border-t border-white/5 relative overflow-hidden min-h-[900px] flex items-center group">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02010a] via-[#050508] to-[#02010a] z-0" />
      <div className="absolute inset-0 z-0 animate-[pan_60s_linear_infinite]">
        <div className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px), radial-gradient(rgba(255,255,255,0.5) 0.5px, transparent 0.5px)',
            backgroundSize: '30px 30px, 70px 70px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        />
      </div>

      {/* Sun glow */}
      <div className="absolute -top-[150px] left-1/2 -translate-x-1/2 z-0 pointer-events-none scale-110">
        <div className="w-[280px] h-[280px] bg-white rounded-full blur-[40px] absolute top-10 left-1/2 -translate-x-1/2 z-20 animate-pulse" />
        <div className="w-[500px] h-[500px] rounded-full blur-[80px] absolute -top-[80px] left-1/2 -translate-x-1/2 opacity-80 z-10 mix-blend-screen animate-[spin_20s_linear_infinite]"
          style={{ background: `linear-gradient(to right, ${accentFrom}, #eab308)` }} />
        <div className="w-[900px] h-[600px] bg-orange-700 rounded-full blur-[120px] absolute -top-[200px] left-1/2 -translate-x-1/2 opacity-50 z-0 mix-blend-screen animate-pulse"
          style={{ animationDuration: '4s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">

          {/* LEFT */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
              style={{ boxShadow: `0 0 15px ${accentFrom}4d` }}>
              <Rocket className="w-3 h-3 fill-current animate-bounce" style={{ color: accentFrom }} />
              <span className="text-orange-100 text-[10px] font-black uppercase tracking-[0.2em]">{badgeText}</span>
            </div>

            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[0.9] uppercase drop-shadow-2xl">
              {headline1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">{headline2}</span>
              <br />
              <span className="text-transparent bg-clip-text animate-pulse"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, #fbbf24, ${accentFrom})`, animationDuration: '3s' }}>
                {headline3}
              </span>
            </h2>

            <p className="text-slate-300 text-sm md:text-xl mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light mix-blend-plus-lighter">
              {renderBodyText()}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {stats.map((stat) => {
                const Icon = STAT_ICON_MAP[stat.icon] ?? Cpu;
                return (
                  <div key={stat.label}
                    className={`group p-4 rounded-2xl border border-white/10 transition-all duration-500 flex items-center lg:block gap-4 backdrop-blur-xl ${stat.bg} hover:border-orange-500/50`}
                    style={{ background: 'rgba(0,0,0,0.4)' }}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center lg:mb-4 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(0,0,0,0.5)] ${stat.bg}`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div className="text-left">
                      <div className="text-xl md:text-2xl font-black text-white tracking-tight">{stat.value}</div>
                      <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Chat */}
          <div className="relative group order-1 lg:order-2">
            <div className="absolute -inset-1 rounded-[2.6rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"
              style={{ background: `linear-gradient(to right, ${accentFrom}, #7c3aed)` }} />

            <div className="relative border border-white/10 rounded-2xl md:rounded-[2.5rem] p-2 md:p-4 shadow-2xl backdrop-blur-2xl overflow-hidden h-[600px] flex flex-col ring-1 ring-white/5"
              style={{ background: 'rgba(5,5,5,0.8)' }}>

              {/* Window chrome */}
              <div className="flex items-center justify-between mb-3 px-4 py-3 border-b border-white/5">
                <div className="flex gap-2">
                  {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: c, animationDelay: `${i * 75}ms` }} />
                  ))}
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5 shadow-inner">
                  <Wifi className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-slate-300 font-mono tracking-wide">{satLinkText}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden px-2 relative">
                <div className="flex flex-col h-full relative z-10">
                  {/* Timer */}
                  <div className="bg-blue-900/40 border border-blue-500/30 p-3 mb-2 rounded-xl flex items-center justify-between shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <Timer className="w-3.5 h-3.5 text-blue-300" />
                      <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wide">{timerLabel}</span>
                    </div>
                    <span className="text-[11px] font-mono text-white bg-black/50 border border-blue-500/50 px-2 py-0.5 rounded">{timeLeft}</span>
                  </div>

                  {/* Messages */}
                  <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 p-2" style={{ scrollbarWidth: 'none' }}>
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-medium leading-relaxed shadow-lg ${
                          msg.role === 'user'
                            ? 'text-white rounded-br-none'
                            : 'bg-[#1a1b26]/90 border border-white/10 text-slate-300 rounded-bl-none'
                        }`} style={msg.role === 'user' ? { background: '#2563eb' } : {}}>
                          {msg.content}
                        </div>
                      </div>
                    ))}

                    {hasShowedPricing && (
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 px-1">
                          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                          <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wide">{pricingHeader}</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2.5">
                          {plans.map((plan) => {
                            const PlanIcon = PLAN_ICON_MAP[plan.icon] ?? Terminal;
                            return (
                              <div key={plan.id} className="bg-white/5 border border-white/10 p-3.5 rounded-xl flex items-center justify-between hover:border-orange-500/40 transition-all">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center text-blue-400">
                                    <PlanIcon className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{plan.name}</div>
                                    <div className="text-lg font-bold text-white leading-tight">{plan.price}</div>
                                    <div className="text-[9px] text-emerald-400 font-bold uppercase">{avgPackageLabel} {plan.ctc}</div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleRegister(plan)}
                                  className="px-4 py-2 bg-white text-black rounded-lg text-[10px] font-bold uppercase tracking-wide hover:bg-orange-400 hover:text-white transition-all"
                                >
                                  {launchBtnLabel}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-[#1a1b26]/80 border border-white/10 p-3 rounded-2xl rounded-bl-none">
                          <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <form onSubmit={handleSendMessage} className="relative mb-1">
                    <input
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={inputPlaceholder}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50 transition-all font-mono"
                    />
                    <button type="submit" className="absolute right-2 top-2 p-1.5 rounded-lg transition-colors"
                      style={{ background: accentFrom }}>
                      <Send className="w-3.5 h-3.5 text-white" />
                    </button>
                  </form>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-2 mt-2 flex items-center justify-between border-t border-white/5 bg-black/20">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">{encryptionText}</span>
                </div>
                <div className="text-[9px] font-mono text-slate-600 uppercase">{versionText}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pan {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50px); }
        }
      `}</style>
    </section>
  );
}