import React from 'react';

const TrustAndArticles = () => {
  const awards = [
    { img: 'https://vstorm.co/app/uploads/2023/11/top_clutch.co_artificial_intelligence_company_2023_award.png', text: 'Top Artificial Intelligence company recognized by Clutch' },
    { img: 'https://vstorm.co/app/uploads/2024/12/deloitte-logo-square.png', text: 'Awarded in ranking of 50 fastest growing technology companies in Central Europe' },
    { img: 'https://vstorm.co/app/uploads/2024/01/top_the_manifest_artificial_intelligence_company_toronto_2023_award.png', text: 'Top Artificial Intelligence company recognized by the Manifest' },
  ];

  const articles = [
    { title: 'Off-the-shelf AI platform or Custom AI Agent solution?', img: 'https://img.freepik.com/free-photo/robot-working-as-cashier-instead-humans_23-2150911987.jpg' },
    { title: 'Choosing the right LLM model for the job', img: 'https://img.freepik.com/free-photo/face-recognition-personal-identification-collage_23-2150165610.jpg' },
    { title: 'What is Retrieval-Augmented Generation (RAG) for LLMs', img: 'https://img.freepik.com/free-photo/person-using-futuristic-virtual-reality-headset-video-games_23-2151133199.jpg' },
    { title: 'CLC: Leader in LLMs solutions recognized by Deloitte...', img: 'https://img.freepik.com/free-photo/career-progression-promotion-achievement-success-concept_53876-120915.jpg' },
  ];

  return (
    <section className="bg-transparent py-20 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto mb-28">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-14 text-center text-[#ffffff] tracking-tight">
          Awards & Recognitions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {awards.map((award, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-10 w-full h-72 flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                <img 
                  src={award.img} 
                  alt="Award Logo" 
                  className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <p className="text-sm md:text-base text-white-500 text-center font-medium leading-relaxed max-w-[280px]">
                {award.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#ffffff] tracking-tight">
            Our latest articles
          </h2>
          <button className="hidden md:block text-sm font-bold text-white-400 hover:text-red-500 uppercase tracking-widest transition-colors">
            View all blog →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((art, i) => (
            <div key={i} className="group cursor-pointer flex flex-col h-full">
              <div className="relative rounded-2xl overflow-hidden mb-5 h-52 bg-gray-100">
                <img 
                  src={art.img} 
                  alt={art.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <h3 className="font-bold text-lg mb-3 leading-snug text-[#ffffff] group-hover:text-blue-700 transition-colors line-clamp-2">
                {art.title}
              </h3>
              
              <div className="mt-auto pt-2">
                <p className="text-red-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read article <span className="text-lg">›</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
            <button className="text-sm font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest">
                View all blog →
            </button>
        </div>
      </div>
    </section>
  );
};

export default TrustAndArticles;