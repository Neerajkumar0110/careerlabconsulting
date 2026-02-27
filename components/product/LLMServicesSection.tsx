'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles, BrainCircuit, Layers, Settings2 } from 'lucide-react';
import { driveToImage } from '@/utils/driveToImage';

const services = [
  {
    title: "RAG Engineering",
    icon: <BrainCircuit className="w-8 h-8 text-blue-400" aria-hidden="true" />,
    description: "Expert Retrieval-Augmented Generation (RAG) implementation to connect LLMs with your private data for accurate, hallucination-free AI responses.",
    image: "https://drive.google.com/file/d/1iA65KLeR-ZwSY7TZfb-WQ-1dO89dr5fC/view?usp=drive_link",
    alt: "Diagram of RAG Engineering and AI data processing",
    accent: "blue",
    glowColor: "rgba(59,130,246,0.35)",
    borderColor: "rgba(59,130,246,0.5)",
  },
  {
    title: "AI Strategy Consulting",
    icon: <Sparkles className="w-8 h-8 text-purple-400" aria-hidden="true" />,
    description: "Enterprise AI roadmaps that identify high-ROI use cases, model selection strategy, and seamless integration workflows.",
    image: "https://drive.google.com/file/d/1U-o9i5yh7zXrETh0DSGvGFyIvspXt21T/view?usp=drive_link",
    alt: "Business professionals discussing AI strategy",
    accent: "purple",
    glowColor: "rgba(168,85,247,0.35)",
    borderColor: "rgba(168,85,247,0.5)",
  },
  {
    title: "LangChain Development",
    icon: <Layers className="w-8 h-8 text-cyan-400" aria-hidden="true" />,
    description: "Building complex AI agents and multi-step chains using LangChain and LlamaIndex for advanced cognitive automation.",
    image: "https://drive.google.com/file/d/1zrTahAoM4wPNrdrHS7Z6t9xSF4Tn2cBB/view?usp=drive_link",
    alt: "Software engineer coding LangChain applications",
    accent: "cyan",
    glowColor: "rgba(34,211,238,0.35)",
    borderColor: "rgba(34,211,238,0.5)",
  },
  {
    title: "LLMOps & Monitoring",
    icon: <Settings2 className="w-8 h-8 text-emerald-400" aria-hidden="true" />,
    description: "End-to-end lifecycle management, including fine-tuning, latency optimization, and continuous evaluation of production models.",
    image: "https://drive.google.com/file/d/1Eib6oDs_U4o4YSs1cQ_oZWG30zwt09lX/view?usp=drive_link",
    alt: "Monitoring dashboard for LLM performance",
    accent: "emerald",
    glowColor: "rgba(52,211,153,0.35)",
    borderColor: "rgba(52,211,153,0.5)",
  }
];

/* ── Floating orb ──────────────────────────────────────────── */
const Orb = ({ style }: { style?: React.CSSProperties }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      filter: 'blur(90px)',
      animation: 'float 12s ease-in-out infinite',
      ...style,
    }}
  />
);


/* ── SVG dot-grid background ─────────────────────────────── */
const DotGrid = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#94a3b8" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

/* ── Diagonal grid lines ─────────────────────────────────── */
const GridLines = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    <defs>
      <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#60a5fa" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

/* ── Animated circuit traces ─────────────────────────────── */
const CircuitTraces = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.08]"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
        <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="traceGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
        <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="traceGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
        <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
        <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Horizontal traces */}
    <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#traceGrad)" strokeWidth="1" className="trace-line" />
    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#traceGrad2)" strokeWidth="1" className="trace-line-2" />
    <line x1="0" y1="80%" x2="100%" y2="80%" stroke="url(#traceGrad3)" strokeWidth="1" className="trace-line-3" />

    {/* Vertical traces */}
    <line x1="15%" y1="0" x2="15%" y2="100%" stroke="url(#traceGrad)" strokeWidth="0.8" strokeDasharray="4,16" className="trace-vert" />
    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="url(#traceGrad2)" strokeWidth="0.8" strokeDasharray="4,16" className="trace-vert-2" />
    <line x1="85%" y1="0" x2="85%" y2="100%" stroke="url(#traceGrad3)" strokeWidth="0.8" strokeDasharray="4,16" className="trace-vert-3" />

    {/* Node dots */}
    {[
      { cx: "15%", cy: "20%", r: 4, fill: "#3b82f6" },
      { cx: "50%", cy: "50%", r: 5, fill: "#a855f7" },
      { cx: "85%", cy: "80%", r: 4, fill: "#22d3ee" },
      { cx: "50%", cy: "20%", r: 3, fill: "#3b82f6" },
      { cx: "15%", cy: "80%", r: 3, fill: "#22d3ee" },
      { cx: "85%", cy: "50%", r: 3, fill: "#a855f7" },
    ].map((n, i) => (
      <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={n.fill} opacity="0.6" />
    ))}
  </svg>
);

/* ── Glowing card ─────────────────────────────────────────── */
const ServiceCard = (
  { service, index }: { service: any; index: number }
) => {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };


  const accentMap = {
    blue: { ring: '#3b82f6', text: 'text-blue-400', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    purple: { ring: '#a855f7', text: 'text-purple-400', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    cyan: { ring: '#22d3ee', text: 'text-cyan-400', badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    emerald: { ring: '#34d399', text: 'text-emerald-400', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  } as const;

  type AccentKey = keyof typeof accentMap;

  const ac = accentMap[(service.accent as AccentKey) ?? 'blue'];


  return (
    <li className="group">
      <article
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative h-full rounded-[2.5rem] p-[1px] transition-all duration-500"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${service.glowColor} 0%, ${service.borderColor} 50%, ${service.glowColor} 100%)`
            : 'linear-gradient(135deg, rgba(51,65,85,0.4) 0%, rgba(30,41,59,0.4) 10%)',
        }}
      >
        {/* Cursor-follow inner glow */}
        {hovered && (
          <div
            className="absolute inset-0 rounded-[2.5rem] pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${service.glowColor}, transparent 60%)`,
              opacity: 0.5,
            }}
          />
        )}

        {/* Outer glow bloom */}
        <div
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none transition-all duration-500"
          style={{
            boxShadow: hovered
              ? `0 0 20px 5px ${service.glowColor}, 0 0 120px 20px ${service.glowColor.replace('0.35', '0.01')}`
              : 'none',
          }}
        />

        <div className="relative h-full bg-[#040c1a]/90 rounded-[calc(2.5rem-1px)] p-6 md:p-10 overflow-hidden">
          {/* Inner card noise texture */}
          <div
            className="absolute inset-0 rounded-[calc(2.5rem-1px)] pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '256px 256px',
            }}
          />

          {/* Corner accent triangle */}
          <div
            className="absolute top-0 right-0 w-32 h-32 pointer-events-none transition-opacity duration-500"
            style={{
              background: `linear-gradient(225deg, ${service.glowColor} 0%, transparent 60%)`,
              opacity: hovered ? 0.6 : 0.15,
              borderRadius: '0 calc(2.5rem - 1px) 0 0',
            }}
          />

          {/* Image */}
          <div className="relative w-full h-52 sm:h-64 md:h-72 mb-8 md:mb-10 overflow-hidden rounded-[1.5rem] bg-slate-950">
            <Image
              src={driveToImage(service.image)}
              alt={service.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              className="object-cover transition-all duration-700"
              style={{
                filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
                opacity: hovered ? 1 : 0.35,
              }}
              loading={index < 2 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040c1a] via-[#040c1a]/20 to-transparent" />

            {/* Scanline overlay on image */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
              }}
            />
          </div>

          {/* Icon + Title */}
          <div className="flex items-center gap-4 md:gap-5 mb-5 md:mb-6">
            <div
              className="p-3 md:p-4 rounded-2xl transition-all duration-500 flex-shrink-0"
              style={{
                background: hovered ? `${service.glowColor}` : 'rgba(15,23,42,0.8)',
                border: hovered ? `1px solid ${service.borderColor}` : '1px solid rgba(255,255,255,0.05)',
                boxShadow: hovered ? `0 0 20px ${service.glowColor}` : 'none',
              }}
            >
              {service.icon}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
              {service.title}
            </h3>
          </div>

          {/* Description */}
          <p
            className="text-base md:text-lg leading-relaxed mb-8 md:mb-10 transition-colors duration-300"
            style={{ color: hovered ? '#cbd5e1' : '#64748b' }}
          >
            {service.description}
          </p>

          {/* CTA */}
          <button
            aria-label={`Learn more about ${service.title}`}
            className={`flex items-center gap-3 font-black uppercase text-xs tracking-widest transition-all outline-none focus-visible:ring-2 rounded-lg group/btn ${ac.text}`}
          >
            Learn more
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-2"
            />
          </button>

          {/* Bottom-right corner decorative orb */}
          <div
            className="absolute -bottom-16 -right-16 w-40 h-40 rounded-full pointer-events-none transition-all duration-700"
            style={{
              background: service.glowColor,
              filter: 'blur(50px)',
              opacity: hovered ? 0.5 : 0.08,
            }}
          />
        </div>
      </article>
    </li>
  );
};

/* ── Main section ─────────────────────────────────────────── */
const LLMServices = () => {
  return (
    <>
      {/* Keyframes injected once */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          33%       { transform: translateY(-28px) scale(1.04); }
          66%       { transform: translateY(14px) scale(0.97); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
          50%       { transform: translateY(-40px) scale(1.06) rotate(5deg); }
        }
        @keyframes dash {
          to { stroke-dashoffset: -200; }
        }
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.04; }
          50%       { opacity: 0.10; }
        }
        .trace-line  { animation: dash 8s linear infinite; stroke-dasharray: 30 120; }
        .trace-line-2{ animation: dash 11s linear infinite reverse; stroke-dasharray: 20 100; }
        .trace-line-3{ animation: dash 9s linear infinite; stroke-dasharray: 25 110; }
        .trace-vert  { animation: dash 10s linear infinite; }
        .trace-vert-2{ animation: dash 13s linear infinite reverse; }
        .trace-vert-3{ animation: dash 11s linear infinite; }
      `}</style>

      <section
        className="py-20 md:py-28 px-4 md:px-12 bg-[#020617] relative overflow-hidden"
        aria-labelledby="services-title"
      >
        {/* ── Background layers ───────────────────────── */}
        <DotGrid />
        <GridLines />
        <CircuitTraces />

        {/* Large ambient orbs */}
        <Orb style={{ top: '-8%', left: '-5%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)', animationDuration: '15s' }} />
        <Orb style={{ bottom: '-10%', right: '-5%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', animationDuration: '18s', animationDelay: '-6s' }} />
        <Orb style={{ top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)', animationDuration: '22s', animationDelay: '-10s' }} />
        <Orb style={{ top: '20%', right: '10%', width: 280, height: 280, background: 'radial-gradient(circle, rgba(52,211,153,0.10) 0%, transparent 70%)', animationDuration: '13s', animationDelay: '-3s' }} />

        {/* Pulsing rings */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-blue-500/10 pointer-events-none"
          style={{ animation: 'pulse-ring 6s ease-in-out infinite' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-purple-500/10 pointer-events-none"
          style={{ animation: 'pulse-ring 8s ease-in-out infinite', animationDelay: '-3s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan-500/8 pointer-events-none"
          style={{ animation: 'pulse-ring 10s ease-in-out infinite', animationDelay: '-5s' }}
        />

        {/* Horizontal glow bar — center divider */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent pointer-events-none" />

        {/* ── Content ───────────────────────────────── */}
        <div className="max-w-7xl mx-auto relative z-10">
          <header className="mb-16 md:mb-20 text-center">
            <span className="text-blue-400 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">
              Enterprise Solutions
            </span>
            <h2
              id="services-title"
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-none"
            >
              Our LLM{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">
                Services.
              </span>
            </h2>
            <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
              Scaling intelligence with precision-engineered AI solutions built for{' '}
              <span className="text-white font-medium">accuracy and speed.</span>
            </p>
          </header>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10 list-none p-0">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default LLMServices;