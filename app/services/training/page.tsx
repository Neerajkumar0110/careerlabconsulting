"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  GraduationCap,
  BookOpen,
  Users,
  Code2,
  Terminal,
  ArrowRight,
  Cpu,
  Globe,
  Award,
  BarChart,
} from 'lucide-react';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const COURSE_ICON_MAP: Record<string, React.ElementType> = { Code2, Cpu, Globe, BookOpen, Users };
const METHOD_ICON_MAP: Record<string, React.ElementType> = {
  'Live Workshops': Users,
  'Curriculum':     BookOpen,
  'Global Standards': Globe,
  'ROI Analysis':   BarChart,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface Course       { title: string; desc: string; icon: string; img: string }
interface Methodology  { label: string; val: string }
interface SkillBar     { label: string; progress: string; color: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_COURSES = JSON.stringify([
  { title: 'Web3 & Blockchain Mastery', desc: 'Engineering teams ko Solidity, Rust, aur decentralized architecture mein expert banana.', icon: 'Code2', img: 'https://images.pexels.com/photos/7988116/pexels-photo-7988116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { title: 'AI & ML Implementation',    desc: 'Enterprises ke liye custom AI workshops: LLMs se lekar computer vision workflows tak.',   icon: 'Cpu',   img: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
]);
const DEFAULT_METHODOLOGY = JSON.stringify([
  { label: 'Live Workshops',    val: '1-on-1'      },
  { label: 'Curriculum',        val: 'Custom'       },
  { label: 'Global Standards',  val: 'ISO-Ready'    },
  { label: 'ROI Analysis',      val: 'Measurable'   },
]);
const DEFAULT_SKILL_BARS = JSON.stringify([
  { label: 'Core Engineering',        progress: '100%', color: '#10b981' },
  { label: 'AI Integration',          progress: '85%',  color: '#6366f1' },
  { label: 'Blockchain Architecture', progress: '60%',  color: '#a855f7' },
]);

export default function TrainingPage() {
  const { get } = usePageContent('services-training');

  // ── Hero ────────────────────────────────────────────────────────────────
  const badgeText        = get('hero', 'badge_text',      'Corporate Upskilling');
  const headlinePlain    = get('hero', 'headline_plain',  'Future-Proof');
  const headlineAccent   = get('hero', 'headline_accent', 'Your Team.');
  const bodyText         = get('hero', 'body_text',       'Technology faster move kar rahi hai.');
  const btnLabel         = get('hero', 'btn_label',       'Book a Workshop');
  const btnHref          = get('hero', 'btn_href',        '/contact');
  const accentFrom       = get('hero', 'accent_from',     '#818cf8');
  const accentTo         = get('hero', 'accent_to',       '#a855f7');
  const accentBtn        = get('hero', 'accent_btn',      '#4f46e5');
  const skillBars        = safeParse<SkillBar[]>(get('hero', 'skill_bars_json', DEFAULT_SKILL_BARS), []);

  // ── Methodology ─────────────────────────────────────────────────────────
  const methodLabel      = get('methodology', 'section_label',    'Curriculum Methodology');
  const methodology      = safeParse<Methodology[]>(get('methodology', 'methodology_json', DEFAULT_METHODOLOGY), []);

  // ── Courses ─────────────────────────────────────────────────────────────
  const courses          = safeParse<Course[]>(get('courses', 'courses_json', DEFAULT_COURSES), []);
  const engineersTrained = get('courses', 'engineers_trained', '+500 Engineers Trained');

  // ── CTA ─────────────────────────────────────────────────────────────────
  const ctaLine1         = get('cta', 'headline_line1', 'Invest in');
  const ctaLine2         = get('cta', 'headline_line2', 'Your Talent.');
  const ctaBody          = get('cta', 'body_text',      'Technology change hogi, par ek skilled team hamesha valuable rahegi.');
  const ctaBtnLabel      = get('cta', 'btn_label',      'Custom Training Quote');
  const ctaBtnHref       = get('cta', 'btn_href',       '/contact');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-600/30 font-sans">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 50% 30%, ${accentFrom}1a 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-xl"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}
            >
              <GraduationCap size={14} style={{ color: accentFrom }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{badgeText}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {headlinePlain} <br />
              <span
                className="italic font-black"
                style={{
                  backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {headlineAccent}
              </span>
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-slate-400 text-lg font-light leading-relaxed mb-10">{bodyText}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => window.location.href = btnHref}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl text-white hover:scale-105"
                style={{ background: accentBtn, boxShadow: `0 20px 40px ${accentBtn}33` }}
              >
                {btnLabel} <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 blur-3xl rounded-full" style={{ background: `${accentFrom}1a` }} />
            <div className="relative p-8 bg-slate-950 border border-white/10 rounded-[3rem] overflow-hidden backdrop-blur-3xl">
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: accentFrom }}>Skill_Progression_v2.0</span>
                <Award size={18} style={{ color: accentTo }} />
              </div>
              <div className="space-y-6">
                {skillBars.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500">
                      <span>{skill.label}</span>
                      <span>{skill.progress}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: skill.progress, background: skill.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-20 italic">{methodLabel}</h2>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {methodology.map((item, i) => {
              const Icon = METHOD_ICON_MAP[item.label] ?? BookOpen;
              return (
                <div key={i} className="text-center group p-6 hover:bg-white/[0.02] rounded-3xl transition-all">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform" style={{ color: accentFrom }}>
                    <Icon size={24} />
                  </div>
                  <h4 className="text-lg font-black italic mb-1 uppercase">{item.val}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COURSES ───────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, i) => {
            const CourseIcon = COURSE_ICON_MAP[course.icon] ?? Code2;
            return (
              <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 transition-all"
                style={{ ['--hover-border' as string]: `${accentFrom}4d` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              >
                <img src={course.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" alt={course.title} />
                <div className="relative p-12 md:p-16 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent">
                  <div
                    className="mb-6 p-4 rounded-2xl w-fit transition-all group-hover:text-white"
                    style={{ background: `${accentFrom}1a`, color: accentFrom }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = accentBtn; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${accentFrom}1a`; }}
                  >
                    <CourseIcon size={30} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-4">{course.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-8">{course.desc}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(j => <div key={j} className="h-6 w-6 rounded-full border border-slate-900 bg-slate-700" />)}
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{engineersTrained}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div
          className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden shadow-2xl"
          style={{ background: accentBtn, boxShadow: `0 30px 60px ${accentBtn}33` }}
        >
          <div className="absolute top-0 right-0 p-12 opacity-10"><Terminal size={300} /></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              {ctaLine1} <br />
              <span style={{ color: `${accentFrom}cc` }}>{ctaLine2}</span>
            </h2>
            <p className="text-indigo-100 text-lg mb-12 max-w-xl mx-auto font-light">{ctaBody}</p>
            <button
              onClick={() => window.location.href = ctaBtnHref}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all"
            >
              {ctaBtnLabel}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}