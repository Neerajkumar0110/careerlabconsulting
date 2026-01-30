"use client";

import React, { useState, useEffect, useRef } from 'react';

const steps = [
  { 
    year: "2015", solutions: 45, 
    logos: [
      { name: "P&G", url: "https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg" },
      { name: "3M", url: "https://upload.wikimedia.org/wikipedia/commons/1/15/3M_wordmark.svg" }
    ], 
    tech: ["Web", "iOS"], height: "h-32", color: "from-blue-600/30" 
  },
  { 
    year: "2017", solutions: 80, 
    logos: [
      { name: "ESPN", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/1280px-ESPN_wordmark.svg.png" },
      { name: "Hershey", url: "https://brandlogos.net/wp-content/uploads/2022/11/hershey_company-logo_brandlogos.net_pcliv.png" },
      { name: "CocaCola", url: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" }
    ], 
    tech: ["AWS", "Micro"], height: "h-44", color: "from-blue-500/30" 
  },
  { 
    year: "2019", solutions: 90, 
    logos: [
      { name: "SIEMENS", url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg" },
      { name: "BUDWEISER", url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Budweiser_Anheuser-Busch_logo.svg" },
      { name: "IBM", url: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
      { name: "Intel", url: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg" }
    ], 
    tech: ["DevOps", "Web3"], height: "h-56", color: "from-indigo-500/30" 
  },
  { 
    year: "2021", solutions: 110, 
    logos: [
      { name: "TRACE RX", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5vUsGHUoQFVaDROLI3W545bwiGP1DY0__Ag&s" }, 
      { name: "OMAN", url: "https://upload.wikimedia.org/wikipedia/commons/3/30/National_emblem_Sultanate_of_Oman.png" },
      { name: "Nike", url: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg" },
      { name: "Adidas", url: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" },
      { name: "Puma", url: "https://upload.wikimedia.org/wikipedia/commons/8/88/Puma-Logo.png" }
    ], 
    tech: ["AR/VR", "Alexa"], height: "h-64", color: "from-purple-500/30" 
  },
  { 
    year: "2023", solutions: 135, 
    logos: [
      { name: "XINFIN", url: "https://static.news.bitcoin.com/wp-content/uploads/2017/08/uaaXrQLw-xinfin-logo.png" },
      { name: "SIGHT", url: "https://static.vecteezy.com/system/resources/previews/059/409/178/non_2x/woman-eye-logo-symbol-free-vector.jpg" },
      { name: "Google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
      { name: "Microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
      { name: "Meta", url: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
      { name: "Netflix", url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" }
    ], 
    tech: ["Meta", "NFT"], height: "h-72", color: "from-pink-500/30" 
  },
  { 
    year: "2025", solutions: 155, 
    logos: [
      { name: "RACKSPACE", url: "https://jupiterwebsitedesign.com/wp-content/uploads/2018/08/Rackspace-Logo-png.png" },
      { name: "NSG", url: "https://upload.wikimedia.org/wikipedia/commons/9/90/National_security_guard_logo.png" },
      { name: "Amazon", url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
      { name: "Tesla", url: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
      { name: "SpaceX", url: "https://upload.wikimedia.org/wikipedia/commons/2/2e/SpaceX_logo_black.svg" },
      { name: "Apple", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
      { name: "Samsung", url: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" }
    ], 
    tech: ["Gen AI", "ML"], height: "h-80", color: "from-emerald-500/30" 
  },
  { 
    year: "2026", solutions: 175, 
    logos: [
      { name: "QUIC", url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX0EonJQm2CUNqhvBBItn07Pwv9Uje0sNtWw&s" },
      { name: "REGAL", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Regal_Cinemas_logo_2018.svg/3840px-Regal_Cinemas_logo_2018.svg.png" },
      { name: "OpenAI", url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
      { name: "Nvidia", url: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
      { name: "Oracle", url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
      { name: "Adobe", url: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Adobe_Corporate_logo.svg" },
      { name: "Slack", url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" }
    ], 
    tech: ["Quantum", "LLM"], height: "h-[380px]", color: "from-cyan-400/30" 
  },
];

const CompanyJourney = () => {
  const [counts, setCounts] = useState(steps.map(() => 0));
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);

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
    const duration = 2500;
    const startTime = performance.now();
    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4); 
      
      setCounts(steps.map(step => Math.floor(easeProgress * step.solutions)));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 bg-[#01030a] overflow-hidden min-h-screen flex flex-col justify-center font-sans text-white select-none"
    >
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="w-full h-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        <div className="absolute inset-0 bg-radial-at-t from-cyan-500/10 via-transparent to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <header className="text-center mb-12 md:mb-24">
          <span className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase mb-4 block animate-pulse">
            Institutional Growth Matrix
          </span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none italic">
            EVOLUTION <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">TIMELINE</span>
          </h2>
          <div className="h-1 w-20 md:w-32 bg-cyan-500 mx-auto rounded-full blur-[1px] shadow-[0_0_20px_#22d3ee]"></div>
        </header>

        <div 
          className="flex items-end justify-start md:justify-between gap-6 md:gap-8 h-[600px] md:h-[750px] overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory border-b border-white/5"
          style={{ scrollBehavior: 'smooth' }}
        >
          {steps.map((step, index) => (
            <figure 
              key={step.year} 
              className="flex-shrink-0 w-[180px] md:w-auto md:flex-1 group relative flex flex-col items-center snap-center"
            >
              <div className="absolute -top-12 flex flex-wrap justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-2 group-hover:translate-y-0 z-30">
                {step.tech.map((t) => (
                  <span key={t} className="bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold border border-white/20 text-cyan-300">
                    {t}
                  </span>
                ))}
              </div>

              <div 
                className={`relative w-full ${step.height} transition-all duration-[2000ms] cubic-bezier(0.34, 1.56, 0.64, 1) bg-gradient-to-t ${step.color} to-transparent border-t border-x border-white/10 rounded-t-2xl group-hover:border-cyan-400/50 flex flex-col items-center justify-start pt-6 overflow-hidden shadow-[inset_0_20px_50px_rgba(0,0,0,0.5)]`}
                style={{ 
                   transform: isLoaded ? 'scaleY(1)' : 'scaleY(0)',
                   transformOrigin: 'bottom',
                   transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="text-center z-10 transition-transform duration-500 group-hover:-translate-y-1">
                  <span className="text-3xl md:text-5xl font-black tracking-tighter block leading-none drop-shadow-lg">
                    {counts[index]}+
                  </span>
                  <figcaption className="text-[9px] text-cyan-100/40 font-bold uppercase tracking-[0.15em] mt-2">
                    Solutions
                  </figcaption>
                </div>
                
                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/40 animate-scanline pointer-events-none" aria-hidden="true"></div>
              </div>

              <div className="mt-6 text-center w-full bg-[#0a0c14]/50 backdrop-blur-sm p-4 rounded-b-2xl border-x border-b border-white/5 group-hover:bg-[#0a0c14] transition-colors duration-500">
                <time className="text-xl md:text-3xl font-black text-gray-400 group-hover:text-cyan-400 transition-colors block mb-4 italic tracking-tighter">
                  {step.year}
                </time>
                
                <div className="grid grid-cols-2 gap-1.5 md:gap-2 min-h-[120px] content-start">
                  {step.logos.map((logo, lIdx) => (
                    <div 
                      key={`${logo.name}-${lIdx}`} 
                      className={`bg-white/[0.03] group-hover:bg-white p-2 rounded-lg w-full h-8 md:h-10 flex items-center justify-center border border-white/5 transition-all duration-500 group-hover:border-cyan-500/20 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] ${step.logos.length % 2 !== 0 && lIdx === step.logos.length - 1 ? 'col-span-2 mx-auto max-w-[50%]' : ''}`}
                    >
                      <img 
                        src={logo.url} 
                        alt={logo.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain opacity-50 group-hover:opacity-100 transition-all duration-500 filter grayscale group-hover:grayscale-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://ui-avatars.com/api/?name=${logo.name}&background=1e293b&color=22d3ee&bold=true`;
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
          0% { transform: translateY(-100%); opacity: 0; } 
          50% { opacity: 1; } 
          100% { transform: translateY(500px); opacity: 0; } 
        }
        .animate-scanline { animation: scanline 4s linear infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @media (max-width: 768px) {
          .snap-x { 
            scroll-padding-left: 2rem; 
            scroll-padding-right: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default CompanyJourney;