"use client";

const driveToImage = (url: string): string => {
  if (!url || !url.includes('drive.google.com')) return url;
  const id = url.match(/[-\w]{25,}/);
  return id ? `https://lh3.googleusercontent.com/d/${id[0]}` : url;
};
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from "next/image";

interface Article {
  title: string;
  category: string;
  readTime: string;
  img: string;
}

const TrustAndArticles = () => {
  const myWhatsAppNumber = "918700236923";

  const awards = [
    {
      img: 'https://quintagroup.com/blog/blog-images/clutch-badge.png/@@images/ddd091dd-4684-4302-ba86-b2931f9078f5.png',
      text: 'Top AI Development Firm 2019',
      rating: 4.6,
      reviews: 12786
    },
    {
      img: 'https://www.catalyst2.com/wp-content/uploads/2018/01/Deloitte-fast-50-UK-technology-company.png',
      text: 'Deloitte Technology Fast 50 Winner',
      rating: 4.8,
      reviews: 9654
    },
    {
      img: 'https://www.redeagle.tech/img/logo/partner/microsoftpartner-multiline-light.webp?v=F59uTJJDUIM0Wom_OXRUn4OTWKA4fQc8XEp7IYNfPns',
      text: 'Most Reviewed AI Partner',
      rating: 4.7,
      reviews: 32210
    },
  ];

  const articles: Article[] = [
    {
      title: 'Autonomous AI Agents: The Shift from SaaS to Agent-as-Service',
      category: 'AI Strategy',
      readTime: '6 min',
      img: 'https://drive.google.com/file/d/1UzsxRuxsG3AgZqjfjnn9PoVM12Qw6KLw/view?usp=drive_link'
    },
    {
      title: 'Optimizing RAG Pipelines for Enterprise-Grade Accuracy',
      category: 'Technical',
      readTime: '8 min',
      img: 'https://drive.google.com/file/d/1uRWRa8SdFPA4bonNPQ9gXG_-OpMaQbJ5/view?usp=drive_link'
    },
    {
      title: 'Next-Gen SEO: Ranking in the Age of AI Search (SGE)',
      category: 'Marketing',
      readTime: '5 min',
      img: 'https://drive.google.com/file/d/1GP27PWh6eqHSmrMoX3idRMNnTIUA7TS2/view?usp=drive_link'
    },
    {
      title: 'Building Scalable Multi-Agent Workflows for Modern Enterprises',
      category: 'AI Architecture',
      readTime: '7 min',
      img: 'https://drive.google.com/file/d/1XXvAAX3XbPNCRnnKvSEusDidRYeWtolu/view?usp=drive_link'
    },
    {
      title: 'Fine-Tuning LLMs for Domain-Specific Business Intelligence',
      category: 'Technical',
      readTime: '9 min',
      img: 'https://drive.google.com/file/d/1pMwuHW0_CaCe6qGylp4iqE71JmTiisFR/view?usp=drive_link'
    },
    {
      title: 'AI-Powered Sales Automation: From Lead Scoring to Deal Closure',
      category: 'AI Strategy',
      readTime: '6 min',
      img: 'https://drive.google.com/file/d/1U0VpQcEs1xb8rtpS0rycu05Nz3DiCU7U/view?usp=drive_link'
    },
    {
      title: 'Designing Secure AI Systems for Enterprise Compliance',
      category: 'Security',
      readTime: '8 min',
      img: 'https://drive.google.com/file/d/1wpC4dsYKlIma4T5O1-ul4fPuWjUANqQ-/view?usp=drive_link'
    },
    {
      title: 'Conversational AI in HR: Automating Recruitment & Onboarding',
      category: 'HR Tech',
      readTime: '5 min',
      img: 'https://drive.google.com/file/d/1vJntxhW8j1PDt6P4dmcOs1k2Hhigtb3h/view?usp=drive_link'
    },
    {
      title: 'Data-to-Decision: Real-Time AI Analytics for Leadership Teams',
      category: 'Analytics',
      readTime: '7 min',
      img: 'https://drive.google.com/file/d/1LsxB6PWDSspolT_-04WZ2JqFxpMbqJJS/view?usp=drive_link'
    },
    {
      title: 'From Chatbots to Agentic AI: The Evolution of Intelligent Systems',
      category: 'AI Trends',
      readTime: '6 min',
      img: 'https://drive.google.com/file/d/1OZKnPSd0yCTomILXX-8R6xtkNUmQ_WDp/view?usp=drive_link'
    }
  ];

  // ── Carousel state ───────────────────────────────────────────
  const trackRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  // Card width + gap used for snapped scrolling
  const CARD_WIDTH_PX = 380; // approx card width
  const GAP_PX = 32;         // gap-8 = 32px
  const STEP = CARD_WIDTH_PX + GAP_PX;

  const scrollBy = useCallback((direction: 'left' | 'right') => {
    if (!trackRef.current) return;

    const el = trackRef.current;

    const firstCard = el.querySelector('article') as HTMLElement | null;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;

    const styles = window.getComputedStyle(el);
    const gap = parseInt(styles.columnGap || styles.gap || '0', 10);

    const step = cardWidth + gap;
    const delta = direction === 'right' ? step : -step;

    const maxScroll = el.scrollWidth - el.clientWidth;
    let next = el.scrollLeft + delta;

    // 🔁 Infinite Loop Logic
    if (next > maxScroll) {
      next = 0; // jump to start
    } else if (next < 0) {
      next = maxScroll; // jump to end
    }

    el.scrollTo({
      left: next,
      behavior: 'smooth',
    });
  }, []);

  // Auto-scroll every 4 s
  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    autoScrollRef.current = setInterval(() => {
      if (!isPausedRef.current) scrollBy('right');
    }, 4000);
  }, [scrollBy]);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [startAutoScroll]);

  // Pause on hover / touch
  const handleMouseEnter = () => { isPausedRef.current = true; };
  const handleMouseLeave = () => { isPausedRef.current = false; };

  // Manual nav — also briefly pauses then resumes
  const handleNav = (dir: 'left' | 'right') => {
    isPausedRef.current = true;
    scrollBy(dir);
    setTimeout(() => { isPausedRef.current = false; }, 2000);
  };

  // ── Article click ────────────────────────────────────────────
  const handleArticleClick = (title: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in learning more about: ${title}`);
    window.open(`https://wa.me/${myWhatsAppNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="bg-[#020617] py-16 md:py-24 px-4 sm:px-10 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── Trusted Excellence heading ─────────────────────── */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">Trusted Excellence</h2>
          <div className="h-1 w-20 bg-red-600 mx-auto" aria-hidden="true"></div>
        </div>

        {/* ── Awards grid ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {awards.map((award, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center p-10 bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-gray-200 hover:border-yellow-400 transition-all hover:shadow-2xl hover:-translate-y-3 duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

              <div className="relative mb-8 transform group-hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 bg-yellow-200 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                <img
                  src={award.img}
                  alt={award.text}
                  className="relative h-20 w-40 object-contain drop-shadow-lg"
                  loading="lazy"
                />
              </div>

              <div className="relative z-10 mb-8">
                <h3 className="text-gray-900 text-center font-black text-xs md:text-sm tracking-wider uppercase bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 px-6 py-3 rounded-full shadow-lg border-2 border-yellow-400 whitespace-nowrap">
                  {award.text}
                </h3>
              </div>

              <div className="relative z-10 flex flex-col items-center space-y-2">
                <div className="flex items-center gap-2.5 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200">
                  <Image
                    src={driveToImage("https://drive.google.com/file/d/14Svcgdcte3889QtGJaJv6sq8kTregl3z/view?usp=drive_link")}
                    alt="Google"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                  <span className="text-xl md:text-2xl font-bold text-gray-900">
                    {award.rating.toFixed(1)}
                  </span>
                </div>

                <div className="flex items-center gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, index) => {
                    const fillPercentage = Math.min(Math.max(award.rating - index, 0), 1);
                    return (
                      <div key={index} className="relative w-6 h-6">
                        <svg viewBox="0 0 24 24" className="absolute w-6 h-6 text-gray-300" fill="currentColor">
                          <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.87 1.401-8.168L.132 9.211l8.2-1.193z" />
                        </svg>
                        <svg viewBox="0 0 24 24" className="absolute w-6 h-6 text-yellow-400" style={{ clipPath: `inset(0 ${100 - fillPercentage * 100}% 0 0)` }} fill="currentColor">
                          <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.87 1.401-8.168L.132 9.211l8.2-1.193z" />
                        </svg>
                      </div>
                    );
                  })}
                </div>

                <p className="text-sm text-gray-600 font-medium">
                  {award.reviews.toLocaleString()}+ reviews
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Articles header + nav buttons ─────────────────── */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase">Knowledge Base</span>
            <h2 className="text-4xl md:text-6xl font-black mt-2">Latest Insights.</h2>
          </div>

          {/* Right side: Explore All + nav arrows */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="text-xs font-bold py-3 px-6 border border-gray-800 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest">
              Explore All
            </button>

            {/* Prev */}
            <button
              onClick={() => handleNav('left')}
              aria-label="Previous articles"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 group"
            >
              <svg className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next */}
            <button
              onClick={() => handleNav('right')}
              aria-label="Next articles"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 group"
            >
              <svg className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Carousel track ─────────────────────────────────── */}
        {/* Fade edges */}
        <div className="relative">
          {/* <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none bg-gradient-to-r from-[#020617] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 pointer-events-none bg-gradient-to-l from-[#020617] to-transparent" /> */}

          <div
            ref={trackRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseEnter}
            onTouchEnd={handleMouseLeave}
            className="flex gap-8 overflow-x-auto pb-4 scroll-smooth"
            style={{
              scrollbarWidth: 'none',        /* Firefox */
              msOverflowStyle: 'none',       /* IE/Edge */
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Hide webkit scrollbar via inline style — Tailwind can't target ::-webkit-scrollbar */}
            <style>{`
              .articles-track::-webkit-scrollbar { display: none; }
            `}</style>

            {articles.map((art, i) => (
              <article
                key={i}
                onClick={() => handleArticleClick(art.title)}
                className="group cursor-pointer flex-shrink-0 w-[90vw] sm:w-[340px] md:w-[360px] lg:w-[380px] bg-slate-900/10 border border-gray-900 rounded-[2rem] overflow-hidden hover:border-red-600/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)]"
              >
                <div className="h-56 relative overflow-hidden">
                  <Image
                    src={driveToImage(art.img)}
                    alt={art.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    sizes="(max-width: 640px) 80vw, 380px"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                    {art.category}
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex justify-between text-gray-500 text-[10px] font-bold uppercase tracking-tighter mb-4">
                    <span>Career Lab Consulting</span>
                    <span>{art.readTime} Read</span>
                  </div>
                  <h3 className="text-lg font-bold leading-tight group-hover:text-red-500 transition-colors mb-4 line-clamp-2">
                    {art.title}
                  </h3>
                  <div className="flex items-center text-red-600 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Read More
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustAndArticles;