"use client";

import React from 'react';

interface Article {
  title: string;
  category: string;
  readTime: string;
  img: string;
}

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
  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TrustAndArticles = () => {
  const myWhatsAppNumber = "918700236923";

  const awards = [
    { 
      img: 'https://quintagroup.com/blog/blog-images/clutch-badge.png/@@images/ddd091dd-4684-4302-ba86-b2931f9078f5.png', 
      badgeText: 'Top AI Development Firm 2019',
      score: '4.6',
      reviewCount: '12,786+ reviews'
    },
    { 
      img: 'https://www.finops.org/wp-content/uploads/2023/12/finops-deloitte-438high.png', 
      badgeText: 'Deloitte Technology Fast 50 Winner',
      score: '4.8',
      reviewCount: '9,654+ reviews'
    },
    { 
      img: 'https://static.wikia.nocookie.net/windows/images/3/33/Microsoft-logo.png', 
      badgeText: 'Most Reviewed AI Partner',
      score: '4.7',
      reviewCount: '32,210+ reviews'
    },
  ];

  const articles: Article[] = [
    { 
      title: 'Autonomous AI Agents: The Shift from SaaS to Agent-as-Service', 
      category: 'AI Strategy',
      readTime: '6 min',
      img: 'https://img.freepik.com/free-photo/robot-working-as-cashier-instead-humans_23-2150911987.jpg'
    },
    { 
      title: 'Optimizing RAG Pipelines for Enterprise-Grade Accuracy', 
      category: 'Technical',
      readTime: '8 min',
      img: 'https://img.freepik.com/free-photo/businessman-working-futuristic-office_23-2151003750.jpg'
    },
    { 
      title: 'Next-Gen SEO: Ranking in the Age of AI Search (SGE)', 
      category: 'Marketing',
      readTime: '5 min',
      img: 'https://img.freepik.com/free-photo/face-recognition-personal-identification-collage_23-2150165610.jpg'
    }
  ];

  const handleArticleClick = (title: string) => {
    const message = encodeURIComponent(`Hi, I'm interested in learning more about: ${title}`);
    window.open(`https://wa.me/${myWhatsAppNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="bg-[#020617] py-16 md:py-24 px-4 sm:px-10 text-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight uppercase">Trusted Excellence</h2>
          <div className="h-1.5 w-24 bg-red-600 mx-auto rounded-full" aria-hidden="true"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {awards.map((award, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center p-8 bg-white rounded-[2.5rem] transition-transform hover:-translate-y-2 duration-300 shadow-2xl min-h-[300px] justify-between"
            >
              <div className="h-24 w-full flex items-center justify-center mb-4">
                <img 
                  src={award.img} 
                  alt={award.badgeText} 
                  className="max-h-30 max-w-[80%] object-contain" 
                  loading="lazy"
                />
              </div>

              <div className="bg-[#FFEB3B] text-black w-full text-center py-3 px-4 rounded-full shadow-sm">
                 <p className="font-extrabold text-[11px] sm:text-xs tracking-widest uppercase truncate">
                    {award.badgeText}
                 </p>
              </div>

              <div className="flex flex-col items-center safjk">
                <div className="flex items-center gap-3 bg-white border border-gray-100 shadow-lg rounded-full px-5 py-2 mb-3">
                   <div className="w-6 h-6">
                      <GoogleIcon />
                   </div>
                   <span className="text-black font-bold text-xl">{award.score}</span>
                </div>

                <div className="flex gap-1 mb-2">
                   {[...Array(5)].map((_, idx) => (
                      <StarIcon key={idx} />
                   ))}
                </div>

                <span className="text-gray-500 font-medium text-xs">
                  {award.reviewCount}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-red-600 font-bold tracking-[0.3em] text-xs uppercase">Knowledge Base</span>
            <h2 className="text-4xl md:text-5xl font-black mt-3 tracking-tight">Latest Insights.</h2>
          </div>
          <button className="text-xs font-bold py-4 px-8 border border-gray-700 rounded-full hover:bg-white hover:text-black transition-all uppercase tracking-widest">
            Explore All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, i) => (
            <article 
              key={i} 
              onClick={() => handleArticleClick(art.title)}
              className="group cursor-pointer bg-slate-900/20 border border-gray-800 rounded-[2rem] overflow-hidden hover:border-red-600/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(220,38,38,0.15)]"
            >
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={art.img} 
                  alt={art.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                  loading="lazy"
                />
                <div className="absolute top-5 left-5 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                  {art.category}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <span>Career Lab</span>
                  <span>{art.readTime} Read</span>
                </div>
                <h3 className="text-xl font-bold leading-snug group-hover:text-red-500 transition-colors mb-6">
                  {art.title}
                </h3>
                <div className="flex items-center text-red-600 text-[10px] font-black uppercase tracking-widest opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
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