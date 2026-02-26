// app/hirex/about/page.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number; text?: string }[] = [];
    const numStars = 300;
    const speed = 1.2;

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * window.innerWidth - window.innerWidth / 2,
          y: Math.random() * window.innerHeight - window.innerHeight / 2,
          z: Math.random() * window.innerWidth
        });
      }
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const cx = width / 2;
      const cy = height / 2;

      ctx.fillStyle = '#020617'; 
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }
        
        const x = (star.x / star.z) * cx + cx;
        const y = (star.y / star.z) * cy + cy;
        const size = (1 - star.z / width) * 2;
        const opacity = Math.max(0, 1 - star.z / width);

        if (x >= 0 && x < width && y >= 0 && y < height) {
          if (star.text) {
            const baseFontSize = 16; 
            const dynamicFontSize = Math.floor(size * baseFontSize);
            
            ctx.font = `900 ${dynamicFontSize}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
            ctx.globalAlpha = opacity;
            ctx.fillStyle = "#FFFFFF";
            ctx.fillText(star.text, x, y);
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1.0; 
          } else {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    setup();
    draw();
    window.addEventListener('resize', setup);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setup);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
    </div>
  );
};

const ACTIVE_CANDIDATE = {
  name: "Pooja Mehta",
  role: "Full Stack Developer",
  location: "Bangalore, India",
  avatar: "https://img.freepik.com/premium-photo/40-year-old-pakistani-woman-with-long-hair-showing-thumbs-up-white-background_862994-278392.jpg", 
  stats: { coding: "94%", logic: "8.5/10", systemDesign: "Expert" },
  id: "HX-IND-9921"
};

const HIREX_ADVANTAGES = [
  {
    title: "Autonomous AI Interviews",
    description: "Our AI doesn't just ask static questions. It dynamically adapts to candidate responses, diving deep into technical concepts just like a senior engineering manager would.",
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    color: "from-blue-500/20 to-transparent",
    borderColor: "group-hover:border-blue-500/50"
  },
  {
    title: "Real-World Simulations",
    description: "Goodbye LeetCode puzzles. We evaluate candidates based on real-world architecture, API design, and debugging scenarios relevant to your actual tech stack.",
    icon: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    color: "from-emerald-500/20 to-transparent",
    borderColor: "group-hover:border-emerald-500/50"
  },
  {
    title: "360° Insight Reports",
    description: "Get a comprehensive dashboard for every candidate. Review their code quality, logical reasoning scores, and cultural fit insights before you ever schedule a human round.",
    icon: (
      <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    ),
    color: "from-cyan-500/20 to-transparent",
    borderColor: "group-hover:border-cyan-500/50"
  }
];

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Define the Mission",
    description: "Tell us about the role, your exact tech stack, and the unique challenges your team faces. Our AI builds a custom evaluation matrix in seconds.",
    align: "right"
  },
  {
    step: "02",
    title: "Autonomous Sourcing & Screening",
    description: "HireX agents scan thousands of profiles, analyze GitHub repositories, and invite top matches to our simulation environment. No more reading CVs.",
    align: "left"
  },
  {
    step: "03",
    title: "Deep Technical Evaluation",
    description: "Candidates build, debug, and design systems in our live IDE while our AI interviewer probes their decision-making process in real-time.",
    align: "right"
  },
  {
    step: "04",
    title: "Review & Extend Offer",
    description: "You receive a curated shortlist of pre-verified experts with deep video insights and code playbacks. You just do the final culture fit and hire.",
    align: "left"
  }
];

const INTEGRATIONS = [
  { name: "GitHub", color: "#ffffff", path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
  { name: "Slack", color: "#E01E5A", path: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" },
  { name: "Greenhouse", color: "#00B268", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H8v-5h3v5zm0-7H8V6h3v3zm5 7h-3V6h3v10z" },
  { name: "Jira", color: "#2684FF", path: "M11.53 13.91l-5.36 5.36a1.53 1.53 0 01-2.16 0l-1.08-1.08a1.53 1.53 0 010-2.16l5.36-5.36c.6-.6 1.56-.6 2.16 0l1.08 1.08c.6.6.6 1.56 0 2.16zM21.08 4.36l-1.08-1.08a1.53 1.53 0 00-2.16 0l-5.36 5.36c-.6.6-.6 1.56 0 2.16l1.08 1.08c.6.6 1.56.6 2.16 0l5.36-5.36c.6-.6.6-1.56 0-2.16zM16.3 9.14L10.94 3.78a1.53 1.53 0 00-2.16 0L7.7 4.86c-.6.6-.6 1.56 0 2.16l5.36 5.36c.6.6 1.56.6 2.16 0l1.08-1.08c.6-.6.6-1.56 0-2.16z" },
  { name: "AWS", color: "#FF9900", path: "M14.07 15.65c-2.43 1.15-5.26 1.69-7.85 1.69-3.4 0-6.17-1.1-7.94-2.8l1.3-1.6c1.45 1.45 3.86 2.37 6.64 2.37 2.25 0 4.67-.46 6.78-1.42l1.07 1.76zm2.22-1.95c-.32.74-1.2 1.3-2.1 1.48l.42-2.1c.32-.2.72-.56.9-.94l.78 1.56zM8.33 11.58c-.62-.4-1.1-.96-1.1-1.74 0-1.1.92-1.85 2.5-1.85 1.12 0 1.94.3 2.5.68l-.58 1.34c-.45-.3-1.06-.52-1.76-.52-.8 0-1.13.25-1.13.62 0 .42.4.63 1.15.93l.36.14c1.28.52 1.97 1.25 1.97 2.34 0 1.46-1.15 2.16-2.8 2.16-1.3 0-2.28-.4-2.95-.8l.66-1.45c.5.34 1.33.72 2.24.72.82 0 1.25-.3 1.25-.7 0-.5-.38-.76-1.32-1.14l-.3-.13z" }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 text-white">
      
      <SpaceBackground />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * 5)); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}} />

      <Navbar />

      {/* HERO SECTION - UNTOUCHED */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
            
            <div className="max-w-2xl">
              <nav className="mb-6 flex items-center space-x-2 text-sm font-medium text-slate-400">
                <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
                <span>/</span>
                <span className="text-blue-300">About Us</span>
              </nav>

              <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white sm:text-7xl drop-shadow-lg">
                The Next Gen of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">AI Hiring</span>
              </h1>
              
              <p className="mt-6 text-md md:text-xl leading-7 text-blue-100/70 drop-shadow-md">
                Stop scanning resumes. Start seeing talent. HireX uses autonomous agents to verify 
                technical depth, GitHub impact, and logical reasoning for Indian tech talent.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a 
                  href="https://wa.me/918700236923?text=Hi%20HireX,%20I%20want%20to%20hire%20AI-verified%20candidates."
                  target="_blank"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Connect with Sales
                </a>
              </div>
            </div>

            <div className="relative h-[600px] flex items-center justify-center">
              <div className="relative z-20 w-full max-w-[420px] bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden group">
                <div className="absolute top-0 right-0 p-6">
                   <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20 uppercase tracking-widest">Live Profile</span>
                </div>

                <div className="flex items-center gap-5 mb-10">
                  <div className="relative">
                    <img 
                      src={ACTIVE_CANDIDATE.avatar} 
                      alt={ACTIVE_CANDIDATE.name} 
                      className="h-20 w-20 rounded-2xl object-cover ring-2 ring-blue-500/50 grayscale-[30%] group-hover:grayscale-0 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-500 border-4 border-slate-900 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight">{ACTIVE_CANDIDATE.name}</h3>
                    <p className="text-sm text-slate-400">{ACTIVE_CANDIDATE.role}</p>
                    <p className="text-[10px] text-blue-400 font-mono mt-1">{ACTIVE_CANDIDATE.id}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[11px] text-blue-200 mb-2 font-semibold">
                      <span>TECHNICAL PROFICIENCY</span>
                      <span>{ACTIVE_CANDIDATE.stats.coding}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 w-[94%] shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <p className="text-[10px] text-slate-400 mb-1 uppercase tracking-tighter">Logic Score</p>
                      <p className="text-xl font-bold text-white">{ACTIVE_CANDIDATE.stats.logic}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                      <p className="text-[10px] text-slate-400 mb-1 uppercase tracking-tighter">GitHub Impact</p>
                      <p className="text-xl font-bold text-emerald-400">High</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {['React.js', 'Next.js', 'Node.js', 'AWS'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6">
                    <div className="flex items-center justify-center gap-2 mb-4 select-none">
                      <svg 
                        className="w-4 h-4 text-blue-400 animate-pulse" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                      <span className="text-[10px] text-blue-200/60 uppercase font-mono tracking-[0.2em]">
                        AI Verification Pulse
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="absolute -top-4 -right-8 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full z-10"></div>
              <div className="absolute bottom-10 -left-12 z-30 p-4 bg-slate-900 border border-emerald-500/30 rounded-2xl shadow-2xl animate-bounce hidden md:block">
                 <div className="flex items-center gap-3">
                   <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                   <span className="text-xs text-white font-mono">360° Data Verified</span>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* END OF HERO SECTION */}

      {/* RE-DESIGNED SECTIONS BELOW */}

      {/* Features Section */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-md">
              Beyond Traditional Hiring
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-300 drop-shadow">
              Resumes are history. We built an autonomous engine that evaluates engineers the exact same way your senior tech leads would—minus the bias and scheduling delays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {HIREX_ADVANTAGES.map((feature, index) => (
              <div 
                key={index} 
                className={`group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 ${feature.borderColor} shadow-xl hover:shadow-2xl`}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
                
                <div className="relative z-10">
                  <div className="bg-slate-950/80 border border-white/10 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-5 md:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* Workflow Timeline Section */}
      <section className="relative py-16 md:py-24 z-10 border-t border-white/5 bg-transparent">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-md">
              How the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Autonomous Engine</span> Works
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-300 drop-shadow">
              From job post to final offer, watch how AI streamlines your entire hiring pipeline.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
            {/* The Vertical Line - Fixed on left for mobile, center for desktop */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 md:-translate-x-1/2"></div>
            
            <div className="space-y-12 md:space-y-0">
              {WORKFLOW_STEPS.map((step, index) => (
                <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
                  
                  {/* Timeline Number Node */}
                  <div className="absolute left-[-2rem] md:left-1/2 md:-translate-x-1/2 mt-1 md:mt-0 z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-950 border-2 border-blue-500/30 text-blue-400 font-mono font-bold text-sm md:text-lg shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] group-hover:text-white transition-all duration-300">
                    {step.step}
                  </div>

                  {/* Left aligned on Desktop */}
                  {step.align === 'left' ? (
                    <>
                      <div className="w-full md:w-[45%] md:text-right order-2 md:order-1 pt-2 md:pt-0 pb-8 md:pb-12">
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-blue-500/30 transition-colors duration-300 shadow-xl text-left md:text-right">
                          <h3 className="text-lg md:text-xl font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                      <div className="hidden md:block w-[45%] order-3"></div>
                    </>
                  ) : (
                  /* Right aligned on Desktop */
                    <>
                      <div className="hidden md:block w-[45%] order-1"></div>
                      <div className="w-full md:w-[45%] md:text-left order-2 md:order-3 pt-2 md:pt-0 pb-8 md:pb-12">
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group-hover:border-blue-500/30 transition-colors duration-300 shadow-xl text-left">
                          <h3 className="text-lg md:text-xl font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </>
                  )}

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-32 z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Visionary</span>
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto group">
            <div className="absolute inset-0 pointer-events-none"></div>

            <div className="relative flex flex-col md:flex-row items-center gap-12 lg:gap-20 backdrop-blur-2xl border bg-white/2 border-white/10 rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-[0_8px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 hover:border-blue-500/30">
              
              <div className="relative w-56 h-56 md:w-80 md:h-80 shrink-0 mx-auto md:mx-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-[2rem] blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative h-full w-full rounded-[2rem] p-1 bg-gradient-to-br from-white/20 via-white/5 to-transparent overflow-hidden z-10">
                  <img
                    src="/neeraj-kataria.png"
                    alt="Neeraj Kataria"
                    className="w-full h-full object-cover rounded-[1.8rem] bg-slate-800"
                  />
                </div>
              </div>

              <div className="relative flex-1 text-center md:text-left z-10">
                <div className="absolute -top-12 -left-6 md:-left-12 text-9xl text-white font-serif select-none pointer-events-none leading-none">
                  &ldquo;
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
                  Neeraj Kataria
                </h3>
                
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue border border-blue-500/20 text-blue text-xs font-mono uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  CEO & Founder
                </div>
                
                <blockquote className="space-y-6 text-slate-300 leading-relaxed text-base md:text-lg relative z-10 font-light">
                  <p>
                    "The tech recruitment industry has been relying on static resumes to judge dynamic problem-solving skills for too long. We built HireX to bridge this exact gap."
                  </p>
                </blockquote>
                
                <div className="mt-10 flex justify-center md:justify-start">
                  <a 
                    href="#" 
                    className="group/btn inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-blue border border-white/10 hover:bg-[#0077b5]/10 hover:border-[#0077b5]/50 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-slate-400 group-hover/btn:text-[#0077b5] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="text-sm font-semibold text-slate-300 group-hover/btn:text-white transition-colors">Connect on LinkedIn</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden py-10 md:py-16 border-t border-white/5">
        <div className="relative flex overflow-hidden group">
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none"></div>

          <div className="flex w-max animate-scroll">
            {[...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS].map((integration, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center gap-2 md:gap-3 w-[200px] md:w-[250px] mx-2 md:mx-4 py-3 md:py-4 px-4 md:px-6 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer shadow-lg"
              >
                <svg className="w-6 h-6 md:w-8 md:h-8" style={{ fill: integration.color }} viewBox="0 0 24 24">
                  <path d={integration.path} />
                </svg>
                <span className="text-slate-200 font-bold tracking-wider text-xs md:text-sm uppercase">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
        <div className="relative overflow-hidden p-8 sm:p-16 md:p-20 bg-gradient-to-br from-blue-900/20 to-slate-900/40 border border-white/10 rounded-3xl backdrop-blur-sm shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[600px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 md:mb-6 drop-shadow-lg">
              Ready to hire the <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">top 1%?</span>
            </h2>
            <p className="text-sm md:text-base text-blue-100/90 mb-8 md:mb-10 drop-shadow max-w-xl mx-auto">
              Join the forward-thinking enterprises that have already cut their time-to-hire by 60% with HireX.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 w-full sm:w-auto">
              <a 
                href="https://wa.me/918700236923"
                target="_blank"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-sm md:text-base font-bold rounded-xl hover:bg-blue-500 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:-translate-y-1 text-center"
              >
                Start Free Trial
              </a>
              <Link 
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md text-white text-sm md:text-base font-bold rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 text-center"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}