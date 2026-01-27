"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';

const steps = [
  { year: "2015", solutions: 45, logos: ["P&G", "3M"], tech: ["Web", "iOS"], height: "h-32", color: "from-blue-600/40" },
  { year: "2017", solutions: 80, logos: ["ESPN", "Hershey"], tech: ["AWS", "Micro"], height: "h-44", color: "from-blue-500/40" },
  { year: "2019", solutions: 90, logos: ["Siemens", "Bud"], tech: ["DevOps", "Web3"], height: "h-56", color: "from-indigo-500/40" },
  { year: "2021", solutions: 110, logos: ["Trace RX", "Oman"], tech: ["AR/VR", "Alexa"], height: "h-64", color: "from-purple-500/40" },
  { year: "2023", solutions: 135, logos: ["XinFin", "Sight"], tech: ["Meta", "NFT"], height: "h-72", color: "from-pink-500/40" },
  { year: "2025", solutions: 155, logos: ["Rackspace", "NSG"], tech: ["Gen AI", "ML"], height: "h-80", color: "from-emerald-500/40" },
  { year: "2026", solutions: 175, logos: ["Quic", "Regal"], tech: ["Quantum", "LLM"], height: "h-[380px]", color: "from-cyan-400/50" },
];

const CompanyJourney = () => {
  const [counts, setCounts] = useState(steps.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateNumbers();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateNumbers = () => {
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quad function
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts(steps.map(step => Math.floor(easeProgress * step.solutions)));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 bg-[#01030a] overflow-hidden min-h-screen flex flex-col justify-center font-sans"
      aria-labelledby="journey-title"
    >
      {/* Background for SEO/UX - Low contrast grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div className="w-full h-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <header className="text-center mb-16 md:mb-24">
          <span className="text-cyan-500 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">
            Digital Growth Evolution
          </span>
          <h2 id="journey-title" className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6">
            LEVELING <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">UP</span>
          </h2>
          <p className="sr-only">Our company's journey from 2015 to 2026 showing solution growth and technology stacks.</p>
          <div className="h-1.5 w-20 bg-cyan-500 mx-auto rounded-full shadow-[0_0_20px_#22d3ee]"></div>
        </header>

        {/* Responsive Graph Wrapper */}
        <div 
          className="flex items-end justify-between gap-4 md:gap-8 h-[500px] md:h-[600px] overflow-x-auto pb-8 scrollbar-hide border-b border-white/10"
          role="img" 
          aria-label="Bar graph showing growth in digital solutions over the years"
        >
          {steps.map((step, index) => (
            <figure key={step.year} className="flex-1 min-w-[110px] md:min-w-[140px] group relative flex flex-col items-center">
              
              {/* Tech Stack Popups - Optimized for touch/hover */}
              <div className="absolute -top-16 flex flex-wrap justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-30">
                {step.tech.map((t) => (
                  <span key={t} className="bg-blue-600/90 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-lg">
                    {t}
                  </span>
                ))}
              </div>

              {/* Graphical Pillar */}
              <div 
                className={`relative w-full ${step.height} transition-all duration-1000 ease-out
                  bg-gradient-to-t ${step.color} to-transparent
                  border-t border-x border-white/5 rounded-t-2xl
                  group-hover:border-cyan-400/40 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]
                  flex flex-col items-center justify-start pt-6 md:pt-10 overflow-hidden
                `}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Real-time Counter */}
                <div className="text-center z-10 px-2">
                  <span className="text-white text-3xl md:text-5xl font-black tracking-tighter block leading-none">
                    {counts[index]}+
                  </span>
                  <figcaption className="text-[9px] md:text-[11px] text-cyan-200/70 font-bold uppercase tracking-widest mt-2">
                    Solutions
                  </figcaption>
                </div>

                {/* Animated Scanline */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/40 shadow-[0_0_15px_#22d3ee] animate-scanline"></div>
              </div>

              {/* Base Timeline Labels */}
              <div className="mt-6 text-center w-full">
                <time className="text-white text-xl md:text-2xl font-black group-hover:text-cyan-400 transition-colors block">
                  {step.year}
                </time>
                <div className="mt-2 min-h-[40px] flex flex-col items-center">
                  {step.logos.map((logo) => (
                    <span key={logo} className="text-[10px] text-gray-500 font-bold uppercase tracking-tight line-clamp-1">
                      {logo}
                    </span>
                  ))}
                </div>
              </div>

              {/* Desktop Indicator Dot */}
              <div className="absolute bottom-[-4px] w-2 h-2 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-[2px]"></div>
            </figure>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scanline {
          0% { transform: translateY(-10px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(500px); opacity: 0; }
        }
        .animate-scanline {
          animation: scanline 4s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Mobile Specific Optimization */
        @media (max-width: 768px) {
          .animate-scanline {
            animation-duration: 6s;
          }
        }
      `}</style>
    </section>
  );
};

export default CompanyJourney;