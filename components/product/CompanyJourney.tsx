"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';

const steps = [
  {
    year: "2015", solutions: 45,
    label: "Foundation",
    desc: "First enterprise deployments across consumer goods giants.",
    logos: [
      { name: "P&G", url: "https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg" },
      { name: "3M", url: "https://upload.wikimedia.org/wikipedia/commons/1/15/3M_wordmark.svg" }
    ],
    tech: ["Web", "iOS"], color: "#3b82f6", glow: "rgba(59,130,246,0.5)"
  },
  {
    year: "2017", solutions: 80,
    label: "Expansion",
    desc: "Scaled into media and FMCG with cloud-native architecture.",
    logos: [
      { name: "ESPN", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/1280px-ESPN_wordmark.svg.png" },
      { name: "Hershey", url: "https://brandlogos.net/wp-content/uploads/2022/11/hershey_company-logo_brandlogos.net_pcliv.png" },
      { name: "CocaCola", url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" }
    ],
    tech: ["AWS", "Micro"], color: "#6366f1", glow: "rgba(99,102,241,0.5)"
  },
  {
    year: "2019", solutions: 90,
    label: "Enterprise Grade",
    desc: "Industrial & B2B deployments with DevOps & Web3 stacks.",
    logos: [
      { name: "SIEMENS", url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg" },
      { name: "BUDWEISER", url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Budweiser_Anheuser-Busch_logo.svg" },
      { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
      { name: "Intel", url: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg" }
    ],
    tech: ["DevOps", "Web3"], color: "#8b5cf6", glow: "rgba(139,92,246,0.5)"
  },
  {
    year: "2021", solutions: 110,
    label: "Immersive Era",
    desc: "Pioneered AR/VR integrations with global sportswear leaders.",
    logos: [
      { name: "TRACE RX", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5vUsGHUoQFVaDROLI3W545bwiGP1DY0__Ag&s" },
      { name: "OMAN", url: "https://upload.wikimedia.org/wikipedia/commons/3/30/National_emblem_Sultanate_of_Oman.png" },
      { name: "Nike", url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
      { name: "Adidas", url: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
      { name: "Puma", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Puma-logo-%28text%29.svg/1280px-Puma-logo-%28text%29.svg.png" }
    ],
    tech: ["AR/VR", "Alexa"], color: "#a855f7", glow: "rgba(168,85,247,0.5)"
  },
  {
    year: "2023", solutions: 135,
    label: "Web3 & Meta",
    desc: "Deep tech partnerships with the world's largest platforms.",
    logos: [
      { name: "XINFIN", url: "https://static.news.bitcoin.com/wp-content/uploads/2017/08/uaaXrQLw-xinfin-logo.png" },
      { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
      { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
      { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
      { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" }
    ],
    tech: ["Meta", "NFT"], color: "#ec4899", glow: "rgba(236,72,153,0.5)"
  },
  {
    year: "2025", solutions: 155,
    label: "AI-Native",
    desc: "Gen AI & ML-powered products at hyperscale across verticals.",
    logos: [
      { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
      { name: "Tesla", url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
      { name: "SpaceX", url: "https://upload.wikimedia.org/wikipedia/commons/2/2e/SpaceX_logo_black.svg" },
      { name: "Apple", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
      { name: "Samsung", url: "https://upload.wikimedia.org/wikipedia/commons/6/61/Samsung_old_logo_before_year_2015.svg"}
    ],
    tech: ["Gen AI", "ML"], color: "#10b981", glow: "rgba(16,185,129,0.5)"
  },
  {
    year: "2026", solutions: 175,
    label: "Quantum Leap",
    desc: "Entering the quantum & LLM frontier with next-gen partners.",
    logos: [
      { name: "OpenAI", url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
      { name: "Nvidia", url: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
      { name: "Oracle", url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
      { name: "Adobe", url: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg" },
      { name: "Slack", url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" }
    ],
    tech: ["Quantum", "LLM"], color: "#22d3ee", glow: "rgba(34,211,238,0.5)"
  },
];

// Animated counter
interface CounterProps {
  value: number | string;
  inView: boolean;
}

function Counter({ value, inView }: CounterProps) {
  const [display, setDisplay] = useState<number>(0);

  React.useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = typeof value === "number" ? value : parseInt(value);
    const duration = 1200;
    const step = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else {
        setDisplay(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return <>{display}</>;
}

interface MilestoneLogo {
  url: string;
  name: string;
}

interface MilestoneStep {
  year: string | number;
  label: string;
  solutions: number;
  tech: string[];
  desc: string;
  color: string;
  glow: string;
  logos: MilestoneLogo[];
}

interface MilestoneCardProps {
  step: MilestoneStep;
  index: number;
}
function MilestoneCard({ step, index }: MilestoneCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? 60 : -60, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="group relative"
    >
      {/* Card glow halo */}
      <div
        className="absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${step.color}22 0%, transparent 70%)`, boxShadow: `0 0 60px ${step.glow}` }}
      />

      <div
        className="relative rounded-[28px] overflow-hidden transition-all duration-500"
        style={{
          background: "linear-gradient(145deg, rgba(15,23,42,0.95) 0%, rgba(8,12,28,0.98) 100%)",
          border: `1px solid rgba(255,255,255,0.06)`,
          boxShadow: "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Top color accent bar */}
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }} />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

        <div className="p-7 md:p-8">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row items-start justify-between mb-4 sm:mb-5 gap-4">
            <div>
              {/* Year & Label */}
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-1">
                <span
                  className="font-black leading-none"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    // Reduced minimum size from 2.4rem to 1.8rem for mobile
                    fontSize: "clamp(1.8rem, 8vw, 3.5rem)",
                    background: `linear-gradient(135deg, ${step.color} 0%, rgba(255,255,255,0.6) 100%)`,
                    WebkitBackgroundClip: "text", 
                    WebkitTextFillColor: "transparent", 
                    backgroundClip: "text",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {step.year}
                </span>
                <span
                  className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full"
                  style={{ 
                    background: `${step.color}18`, 
                    color: step.color, 
                    border: `1px solid ${step.color}30`, 
                    fontFamily: "'DM Mono', monospace" 
                  }}
                >
                  {step.label}
                </span>
              </div>

              {/* Solutions counter */}
              <div className="flex items-baseline gap-1">
                <span className="text-lg sm:text-2xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                  <Counter value={step.solutions} inView={inView} />+
                </span>
                <span className="text-[9px] sm:text-xs uppercase tracking-widest text-slate-500 font-medium ml-1" style={{ fontFamily: "'DM Mono', monospace" }}>
                  Solutions Delivered
                </span>
              </div>
            </div>

            {/* Tech badges - Row on mobile, Column on desktop */}
            <div className="flex flex-wrap sm:flex-col gap-1.5 items-start sm:items-end">
              {step.tech.map((t: string) => (
                <span
                  key={t}
                  className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    background: `${step.color}12`,
                    color: `${step.color}cc`,
                    border: `1px solid ${step.color}25`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p 
            className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed" 
            style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.01em" }}
          >
            {step.desc}
          </p>
          {/* Divider */}
          <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${step.color}30, transparent)` }} />

          {/* Logo grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {step.logos.map((logo: { url: string; name: string }, lIdx: number) => (
              <motion.div
                key={lIdx}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + lIdx * 0.07, duration: 0.4, ease: "backOut" }}
                className="relative h-11 flex items-center justify-center p-2.5 rounded-xl cursor-pointer overflow-hidden group/logo"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  transition: "all 0.3s ease",
                }}
                whileHover={{ scale: 1.08, y: -2 }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 rounded-xl"
                  style={{ background: `radial-gradient(ellipse at center, ${step.color}15, transparent 70%)` }}
                />
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain relative z-10"
                  style={{
                    filter: "opacity(0.95)",
                    transition: "filter 0.4s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget as HTMLImageElement).style.filter =
                      `drop-shadow(0 0 8px #ffffff)`
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget as HTMLImageElement).style.filter =
                      "opacity(0.95)"
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const CompanyJourney = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 300, damping: 80 });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative py-28 text-white overflow-hidden"
      style={{ background: "linear-gradient(180deg, #020617 0%, #050d1f 50%, #020617 100%)" }}
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #22d3ee, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      {/* Fine dot grid */}
      <div className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Diagonal scan lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 12px)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6 px-5 py-2 rounded-full"
            style={{
              background: "rgba(99,102,241,0.08)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[10px] text-indigo-300 tracking-[0.3em] uppercase">Institutional Growth Matrix</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className=" font-black uppercase leading-[0.9] tracking-tighter mb-6"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
            }}
          >
            <span className="text-white ">EVOLUTION</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.9) 0%, rgba(34,211,238,0.7) 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}
            >
              TIMELINE
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-sm text-slate-500 max-w-sm mx-auto"
            style={{ letterSpacing: "0.07em" }}
          >
            A decade of partnerships, products, and pioneering technology across every industry.
          </motion.p>

          {/* Header bottom line */}
          <div className="mt-10 h-px max-w-xs mx-auto"
            style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(34,211,238,0.4), transparent)" }} />
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">

          {/* ── Animated SVG spine (Desktop) ── */}
          <svg
            className="absolute left-1/2 -translate-x-1/2 w-full pointer-events-none hidden md:block"
            style={{ height: `${steps.length * 370}px`, top: 0 }}
            viewBox={`0 0 400 ${steps.length * 370}`}
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Ghost path */}
            <path
              d={`M200 0 ${steps.map((_, i) => {
                const y = i * 370 + 185;
                if (i % 2 === 0) return `C 450 ${y - 120}, -50 ${y + 120}, 200 ${y + 185}`;
                return `C -50 ${y - 120}, 450 ${y + 120}, 200 ${y + 185}`;
              }).join(' ')}`}
              stroke="rgba(255,255,255,0.03)" strokeWidth="2" strokeDasharray="8 8"
            />
            {/* Animated progress path */}
            <motion.path
              d={`M200 0 ${steps.map((_, i) => {
                const y = i * 370 + 185;
                if (i % 2 === 0) return `C 450 ${y - 120}, -50 ${y + 120}, 200 ${y + 185}`;
                return `C -50 ${y - 120}, 450 ${y + 120}, 200 ${y + 185}`;
              }).join(' ')}`}
              stroke="url(#spine-grad)"
              strokeWidth="2"
              strokeDasharray="12 8"
              strokeLinecap="round"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="spine-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                {steps.map((s, i) => (
                  <stop key={i} offset={`${(i / (steps.length - 1)) * 100}%`} stopColor={s.color} />
                ))}
              </linearGradient>
            </defs>
          </svg>

          {/* ── Mobile vertical spine ── */}
          <div className="absolute left-5 top-0 bottom-0 w-px md:hidden"
            style={{ background: "linear-gradient(180deg, #3b82f6, #a855f7, #22d3ee)" }} />

          {/* ── Steps ── */}
          <div className="relative" style={{ paddingBottom: 40 }}>
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={step.year}
                  className={`relative flex items-center mb-8 md:mb-0 md:min-h-[370px] ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Card side */}
                  <div className={`w-full md:w-[44%] z-20 pl-14 md:pl-0 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                    <MilestoneCard step={step} index={index} />
                  </div>

                  {/* Center node */}
                  <div className="absolute left-5 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.6 }}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="relative cursor-pointer"
                    >
                      {/* Pulsing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        style={{ backgroundColor: step.color }}
                      />
                      {/* Node */}
                      <div
                        className="relative w-5 h-5 rounded-full border-2"
                        style={{
                          backgroundColor: step.color,
                          borderColor: "#020617",
                          boxShadow: `0 0 24px ${step.glow}, 0 0 8px ${step.color}`,
                        }}
                      />
                    </motion.div>

                    {/* Year label beside node (desktop) */}
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="hidden md:block mt-2 text-[10px] font-bold tracking-widest uppercase"
                      style={{ color: step.color, fontFamily: "'DM Mono', monospace" }}
                    >
                      {step.year}
                    </motion.span>
                  </div>

                  {/* Spacer side */}
                  <div className="hidden md:block md:w-[44%]" />
                </div>
              );
            })}
          </div>

          {/* End cap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3 pt-8"
          >
            <div className="w-px h-12 hidden md:block" style={{ background: "linear-gradient(180deg, rgba(34,211,238,0.5), transparent)" }} />
            <div
              className="flex items-center gap-3 px-6 py-3 rounded-full"
              style={{
                background: "rgba(34,211,238,0.07)",
                border: "1px solid rgba(34,211,238,0.25)",
                boxShadow: "0 0 32px rgba(34,211,238,0.1)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs text-cyan-400 tracking-[0.25em] uppercase font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>
                The Journey Continues
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyJourney;