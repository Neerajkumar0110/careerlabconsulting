"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const steps = [
  { 
    year: "2015", solutions: 45, 
    logos: [
      { name: "P&G", url: "https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg" },
      { name: "3M", url: "https://upload.wikimedia.org/wikipedia/commons/1/15/3M_wordmark.svg" }
    ], 
    tech: ["Web", "iOS"], height: "h-32", color: "from-blue-600/40" 
  },
  { 
    year: "2017", solutions: 80, 
    logos: [
      { name: "ESPN", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/1280px-ESPN_wordmark.svg.png" },
      { name: "Hershey", url: "https://brandlogos.net/wp-content/uploads/2022/11/hershey_company-logo_brandlogos.net_pcliv.png" }
    ], 
    tech: ["AWS", "Micro"], height: "h-44", color: "from-blue-500/40" 
  },
  { 
    year: "2019", solutions: 90, 
    logos: [
      { name: "SIEMENS", url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg" },
      { name: "BUDWEISER", url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Budweiser_Anheuser-Busch_logo.svg" }
    ], 
    tech: ["DevOps", "Web3"], height: "h-56", color: "from-indigo-500/40" 
  },
  { 
    year: "2021", solutions: 110, 
    logos: [
      { name: "TRACE RX", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5vUsGHUoQFVaDROLI3W545bwiGP1DY0__Ag&s" }, 
      { name: "OMAN", url: "https://upload.wikimedia.org/wikipedia/commons/3/30/National_emblem_Sultanate_of_Oman.png" }
    ], 
    tech: ["AR/VR", "Alexa"], height: "h-64", color: "from-purple-500/40" 
  },
  { 
    year: "2023", solutions: 135, 
    logos: [
      { name: "XINFIN", url: "https://static.news.bitcoin.com/wp-content/uploads/2017/08/uaaXrQLw-xinfin-logo.png" },
      { name: "SIGHT", url: "https://static.vecteezy.com/system/resources/previews/059/409/178/non_2x/woman-eye-logo-symbol-free-vector.jpg" }
    ], 
    tech: ["Meta", "NFT"], height: "h-72", color: "from-pink-500/40" 
  },
  { 
    year: "2025", solutions: 155, 
    logos: [
      { name: "RACKSPACE", url: "https://jupiterwebsitedesign.com/wp-content/uploads/2018/08/Rackspace-Logo-png.png" },
      { name: "NSG", url: "https://upload.wikimedia.org/wikipedia/commons/9/90/National_security_guard_logo.png" }
    ], 
    tech: ["Gen AI", "ML"], height: "h-80", color: "from-emerald-500/40" 
  },
  { 
    year: "2026", solutions: 175, 
    logos: [
      { name: "QUIC", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX0EonJQm2CUNqhvBBItn07Pwv9Uje0sNtWw&s" },
      { name: "REGAL", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Regal_Cinemas_logo_2018.svg/3840px-Regal_Cinemas_logo_2018.svg.png" }
    ], 
    tech: ["Quantum", "LLM"], height: "h-[380px]", color: "from-cyan-400/50" 
  },
];

const CompanyJourney = () => {
  const [counts, setCounts] = useState(steps.map(() => 0));
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateNumbers();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const animateNumbers = () => {
    const duration = 2000;
    const startTime = performance.now();
    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      setCounts(steps.map(step => Math.floor(easeProgress * step.solutions)));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 bg-[#01030a] overflow-hidden min-h-screen flex flex-col justify-center font-sans text-white"
      aria-label="Company Growth Journey"
    >
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div className="w-full h-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <header className="text-center mb-16 md:mb-28">
          <span className="text-cyan-400 font-mono text-xs tracking-[0.5em] uppercase mb-4 block animate-pulse">
            Digital Growth Evolution
          </span>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-none">
            LEVELING <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-700">UP</span>
          </h2>
          <div className="h-1.5 w-24 bg-cyan-500 mx-auto rounded-full shadow-[0_0_25px_#22d3ee]"></div>
        </header>

        <div 
          className="flex items-end justify-between gap-4 md:gap-10 h-[550px] md:h-[700px] overflow-x-auto pb-12 scrollbar-hide border-b border-white/10"
          style={{ scrollBehavior: 'smooth' }}
        >
          {steps.map((step, index) => (
            <figure 
              key={step.year} 
              className="flex-1 min-w-[140px] md:min-w-[180px] group relative flex flex-col items-center"
            >
              <div className="absolute -top-16 flex flex-wrap justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-30 pointer-events-none">
                {step.tech.map((t) => (
                  <span key={t} className="bg-cyan-600 px-2.5 py-1 rounded text-[10px] font-bold shadow-2xl border border-cyan-400/30">
                    {t}
                  </span>
                ))}
              </div>

              <div 
                className={`relative w-full ${step.height} transition-all duration-[1500ms] ease-out bg-gradient-to-t ${step.color} to-transparent border-t border-x border-white/5 rounded-t-3xl group-hover:border-cyan-400/40 flex flex-col items-center justify-start pt-8 overflow-hidden`}
                style={{ 
                   transform: isLoaded ? 'scaleY(1)' : 'scaleY(0)',
                   transformOrigin: 'bottom',
                   transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="text-center z-10">
                  <b className="text-4xl md:text-6xl font-black tracking-tighter block leading-none">
                    {counts[index]}+
                  </b>
                  <figcaption className="text-[10px] md:text-[12px] text-cyan-200/60 font-black uppercase tracking-[0.2em] mt-3">
                    Solutions
                  </figcaption>
                </div>
                
                <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400/30 animate-scanline" aria-hidden="true"></div>
              </div>

              <div className="mt-8 text-center w-full">
                <time className="text-2xl md:text-4xl font-black group-hover:text-cyan-400 transition-colors block mb-6 italic tracking-tight">
                  {step.year}
                </time>
                
                <div className="min-h-[120px] flex flex-col items-center justify-center gap-4">
                  {step.logos.map((logo) => (
                    <div 
                      key={logo.name} 
                      className="bg-white p-2 rounded-xl w-full max-w-[110px] md:max-w-[140px] h-12 md:h-14 flex items-center justify-center shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group-hover:scale-110"
                    >
                      <img 
                        src={logo.url} 
                        alt={`${logo.name} partner logo`}
                        loading="lazy"
                        className="max-h-full max-w-[85%] object-contain"
                        width={120}
                        height={40}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://logo.clearbit.com/${logo.name.toLowerCase().replace(/\s/g, '')}.com`;
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scanline { 
          0% { transform: translateY(-20px); opacity: 0; } 
          50% { opacity: 0.8; } 
          100% { transform: translateY(500px); opacity: 0; } 
        }
        .animate-scanline { animation: scanline 3s linear infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default CompanyJourney;