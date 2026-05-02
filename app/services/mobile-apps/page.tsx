// app/services/ai-mobile/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Smartphone, Cpu, Zap, Layers, Mic,
  Eye, ArrowRight, WifiOff, Infinity,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  WifiOff, Eye, Mic, Layers, Cpu, Infinity, Zap, Smartphone,
};

interface FeatureItem { title: string; desc: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_FEATURES: FeatureItem[] = [
  { title: 'Edge AI / Offline Mode',  desc: 'Running quantized models directly on the chip (CoreML/TensorFlow Lite) for privacy and speed without internet.', icon: 'WifiOff'  },
  { title: 'Computer Vision',         desc: 'Real-time object detection, face analysis, and OCR integrated into the mobile camera feed.',                     icon: 'Eye'      },
  { title: 'Voice-First UX',          desc: 'Seamless natural language interfaces and real-time speech-to-text / text-to-speech processing.',                 icon: 'Mic'      },
  { title: 'Cross-Platform Native',   desc: 'High-performance apps built with Flutter or React Native, optimized for AI workloads.',                          icon: 'Layers'   },
  { title: 'NPU Optimization',        desc: 'Fine-tuning models to leverage the Neural Processing Units of modern mobile hardware.',                          icon: 'Cpu'      },
  { title: 'Continuous Learning',     desc: 'Federated learning protocols that allow apps to improve based on user behavior locally.',                        icon: 'Infinity' },
];

export default function AIMobilePage() {
  const { get } = usePageContent('services-ai-mobile');

  const badgeText   = get('hero', 'badge_text',      'Mobile Intelligence Hub');
  const heroPl      = get('hero', 'headline_plain',  'POCKET');
  const heroAcc     = get('hero', 'headline_accent', 'INTELLIGENCE');
  const heroBody    = get('hero', 'body_text',        "The next generation of mobile apps don't just respond; they anticipate. We build AI-native iOS and Android applications with on-device inference, computer vision, and voice-first logic.");
  const heroBtnLbl  = get('hero', 'btn_label',        'Build My Mobile App');
  const accentColor = get('hero', 'accent_color',     '#3b82f6');
  const accentSec   = get('hero', 'accent_secondary', '#6366f1');

  const featHeadline = get('features', 'headline',  'The Edge Advantage');
  const featSubhead  = get('features', 'subheading','High-speed, offline-capable AI at your fingertips.');
  const features     = safeParse<FeatureItem[]>(get('features', 'items_json', '[]'), DEFAULT_FEATURES);

  const ctaHeadline  = get('cta', 'headline',     'Mobile First AI Always');
  const ctaBody      = get('cta', 'body_text',    'Our mobile engineers at DLF Cyber City are ready to deploy your vision to the App Store and Play Store.');
  const ctaBtnLbl    = get('cta', 'btn_label',    'START MOBILE BUILD');
  const phoneNumber  = get('cta', 'phone_number', '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full -z-10"
          style={{ background: `${accentColor}1a`, filter: 'blur(120px)' }} />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
              style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
              <Smartphone className="w-4 h-4" style={{ color: accentColor }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              {heroPl} <br />
              <span className="italic" style={{
                backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentSec})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{heroAcc}</span>
            </h1>
            <p className="max-w-xl text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
            <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center gap-2"
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33` }}>
              {heroBtnLbl} <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Phone mockup */}
          <div className="relative flex justify-center">
            <div className="absolute -inset-10 rounded-full" style={{ background: `${accentColor}33`, filter: 'blur(100px)' }} />
            <div className="relative w-[280px] h-[580px] bg-black border-[8px] border-white/10 rounded-[3rem] shadow-2xl overflow-hidden">
              <div className="h-6 w-full flex justify-between px-6 pt-2">
                <div className="text-[10px] font-bold">9:41</div>
                <div className="flex gap-1">
                  <div className="w-3 h-2 bg-white/40 rounded-sm" />
                  <div className="w-4 h-2 bg-white rounded-sm" />
                </div>
              </div>
              <div className="p-6 pt-10">
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: accentColor }}>
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-black tracking-widest uppercase">Nexus AI</span>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] text-gray-500 uppercase mb-1">On-Device Model</p>
                    <p className="text-sm font-bold">CoreML Stable-Diffusion</p>
                    <div className="mt-2 h-1 bg-white/10 rounded-full">
                      <div className="h-full rounded-full animate-pulse w-3/4"
                        style={{ background: accentColor }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl border flex flex-col items-center"
                      style={{ background: `${accentColor}33`, borderColor: `${accentColor}4d` }}>
                      <Mic style={{ color: accentColor }} className="mb-2" />
                      <span className="text-[10px] font-bold">Voice Ops</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
                      <Eye className="text-gray-400 mb-2" />
                      <span className="text-[10px] font-bold">Vision</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold italic">{featHeadline}</h2>
            <p className="text-gray-500 mt-4 text-lg">{featSubhead}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Zap;
              return (
                <div key={i} className="p-10 rounded-[2.5rem] border border-white/5 transition-all group"
                  style={{ background: `${accentColor}08` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}50`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                    style={{ background: `${accentColor}1a` }}>
                    <Icon style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="py-20 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic">On-Device vs Cloud Inference</h2>
        </div>
        <div className="mt-20"><ExecutionFlow /></div>
      </div>

      <FeatureGrid />

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}1a, ${accentSec}1a)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: `${accentColor}b3` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: '#020617' }}>
                {ctaBtnLbl}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentColor }}>{phoneNumber}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}