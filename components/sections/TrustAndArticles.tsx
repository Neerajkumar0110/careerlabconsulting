'use client';

import React from 'react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface Award   { img: string; badgeText: string; score: string; reviewCount: string; }
interface Article { title: string; category: string; readTime: string; img: string; }

const DEFAULT_AWARDS: Award[] = [
  { img: 'https://quintagroup.com/blog/blog-images/clutch-badge.png/@@images/ddd091dd-4684-4302-ba86-b2931f9078f5.png', badgeText: 'Top AI Development Firm 2019',    score: '4.6', reviewCount: '12,786+ reviews' },
  { img: 'https://www.finops.org/wp-content/uploads/2023/12/finops-deloitte-438high.png',                               badgeText: 'Deloitte Technology Fast 50 Winner', score: '4.8', reviewCount: '9,654+ reviews'  },
  { img: 'https://static.wikia.nocookie.net/windows/images/3/33/Microsoft-logo.png',                                    badgeText: 'Most Reviewed AI Partner',          score: '4.7', reviewCount: '32,210+ reviews' },
];

const DEFAULT_ARTICLES: Article[] = [
  { title: 'Autonomous AI Agents: The Shift from SaaS to Agent-as-Service', category: 'AI Strategy', readTime: '6 min', img: 'https://img.freepik.com/free-photo/robot-working-as-cashier-instead-humans_23-2150911987.jpg'        },
  { title: 'Optimizing RAG Pipelines for Enterprise-Grade Accuracy',          category: 'Technical',   readTime: '8 min', img: 'https://img.freepik.com/free-photo/businessman-working-futuristic-office_23-2151003750.jpg'         },
  { title: 'Next-Gen SEO: Ranking in the Age of AI Search (SGE)',             category: 'Marketing',   readTime: '5 min', img: 'https://img.freepik.com/free-photo/face-recognition-personal-identification-collage_23-2150165610.jpg' },
];

// ── Inline SVG Icons ──────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
    </g>
  </svg>
);

const StarIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" style={{ color: '#facc15' }} viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TrustAndArticles = () => {
  const { get } = usePageContent('home');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const accentColor      = get('trust_articles', 'accent_color',       '#dc2626');
  const trustHeadline    = get('trust_articles', 'trust_headline',     'Trusted Excellence');
  const articlesHeadline = get('trust_articles', 'articles_headline',  'Latest Insights.');
  const articlesLabel    = get('trust_articles', 'articles_label',     'Knowledge Base');
  const articlesCtaLabel = get('trust_articles', 'articles_cta_label', 'Explore All');
  const whatsappNumber   = get('trust_articles', 'whatsapp_number',    '918700236923');
  const awardsRaw        = get('trust_articles', 'awards_json',        JSON.stringify(DEFAULT_AWARDS));
  const articlesRaw      = get('trust_articles', 'articles_json',      JSON.stringify(DEFAULT_ARTICLES));

  const awards   = safeParse<Award[]>(awardsRaw,     DEFAULT_AWARDS);
  const articles = safeParse<Article[]>(articlesRaw, DEFAULT_ARTICLES);

  const handleArticleClick = (title: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in learning more about: ${title}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="bg-[#020617] py-12 md:py-24 px-4 sm:px-6 lg:px-10 text-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">

        {/* ── Trust Headline ─────────────────────────────────────────────── */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-6xl font-black mb-4 tracking-tight uppercase">{trustHeadline}</h2>
          <div className="h-1 w-16 md:h-1.5 md:w-24 mx-auto rounded-full" style={{ background: accentColor }} aria-hidden="true" />
        </div>

        {/* ── Award Cards ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-32">
          {awards.map((award, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-6 md:p-8 bg-white rounded-[2rem] md:rounded-[2.5rem] transition-all hover:-translate-y-2 duration-300 shadow-2xl min-h-[280px] md:min-h-[300px] justify-between"
            >
              <div className="h-20 md:h-24 w-full flex items-center justify-center mb-4">
                <img src={award.img} alt={award.badgeText} className="max-h-full max-w-[70%] object-contain" loading="lazy" />
              </div>

              <div className="w-full text-center py-2.5 px-3 rounded-full mb-6" style={{ background: '#FFEB3B' }}>
                <p className="font-extrabold text-[10px] sm:text-xs tracking-wider uppercase line-clamp-1 text-black">
                  {award.badgeText}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 md:gap-3 bg-white border border-gray-100 shadow-md rounded-full px-4 py-1.5 mb-3">
                  <div className="w-5 h-5 md:w-6 md:h-6"><GoogleIcon /></div>
                  <span className="text-black font-bold text-lg md:text-xl">{award.score}</span>
                </div>
                <div className="flex gap-0.5 md:gap-1 mb-2">
                  {[...Array(5)].map((_, idx) => <StarIcon key={idx} />)}
                </div>
                <span className="text-gray-400 font-medium text-[10px] md:text-xs">{award.reviewCount}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Articles Header ────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase" style={{ color: accentColor }}>
              {articlesLabel}
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">{articlesHeadline}</h2>
          </div>
          <button className="w-full md:w-auto text-[10px] md:text-xs font-bold py-3.5 px-8 border border-gray-700 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest">
            {articlesCtaLabel}
          </button>
        </div>

        {/* ── Article Cards ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((art, i) => (
            <article
              key={i}
              onClick={() => handleArticleClick(art.title)}
              className="group cursor-pointer bg-slate-900/40 border border-gray-800 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden transition-all duration-500"
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${accentColor}80`;
                e.currentTarget.style.boxShadow = `0 0 40px ${accentColor}1a`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#1f2937';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img
                  src={art.img}
                  alt={art.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/10">
                  {art.category}
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex justify-between text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-3 md:mb-4">
                  <span>Career Lab</span>
                  <span>{art.readTime}</span>
                </div>
                <h3
                  className="text-lg md:text-xl font-bold leading-tight mb-4 md:mb-6 line-clamp-2 transition-colors"
                  style={{ color: '#fff' }}
                  onMouseEnter={e => (e.currentTarget.style.color = accentColor)}
                  onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
                >
                  {art.title}
                </h3>
                <div
                  className="flex items-center text-[10px] font-black uppercase tracking-widest md:opacity-0 md:-translate-x-2 md:group-hover:translate-x-0 md:group-hover:opacity-100 transition-all duration-300"
                  style={{ color: accentColor }}
                >
                  Read Article →
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustAndArticles;