'use client';

import React, { useState } from 'react';
import { Play, Star, Users, ArrowRight, Download, X } from 'lucide-react';

const allInternships = {
  "AI & Data": [
    { title: "InternX-AI Developer", id: "ai-dev", videoId: "whqLvigQWoE", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000" },
    { title: "InternX-Data Engineer", id: "data-eng", videoId: "kriafQfqGZE", image: "https://media.istockphoto.com/id/2159731054/photo/governmental-hacker-examines-info-on-a-big-screen-in-agency-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=VuDS2ogcwfAAu74RVbcY7gAwUaKHoSMLwX41EQR2-yE=" },
    { title: "InternX-AI Quality & Safety Engineer", id: "ai-safety", videoId: "vViMFjvVT9E", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000" },
  ],
  "Cloud & Infra": [
    { title: "InternX-Cloud & AI Engineer", id: "cloud-ai", videoId: "kriafQfqGZE", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000" },
  ],
  "Cybersecurity": [
    { title: "InternX-Cyber Security Expert", id: "cyber-exp", videoId: "vViMFjvVT9E", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000" },
  ],
  "Web3 & Blockchain": [
    { title: "InternX-Blockchain Developer", id: "eth-dev", videoId: "qOVAbKKSH10", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000" },
  ],
  "Product & Growth": [
    { title: "InternX-AI Product Manager", id: "ai-pm", videoId: "4XO3g7Rfamk", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000" },
    { title: "InternX-AI Marketing Specialist", id: "ai-mkt", videoId: "whqLvigQWoE", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000" },
  ],
  "Industry-Specific AI": [
    { title: "InternX-FinTech AI Specialist", id: "fintech-ai", videoId: "qOVAbKKSH10", image: "https://media.istockphoto.com/id/2185214215/photo/businessman-using-ai-technology-with-business-operations-automation-systems-to-help-make.webp?a=1&b=1&s=612x612&w=0&k=20&c=1pAq5ww9tjjKySiiuPSZk71N8fDsN_GvwkKmZ3ssAA8=" },
    { title: "InternX-HealthTech AI Specialist", id: "health-ai", videoId: "vViMFjvVT9E", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000" },
  ],
  "Robotics & IoT": [
    { title: "InternX-Robotics Engineer", id: "robot-eng", videoId: "kriafQfqGZE", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000" },
    { title: "InternX-AI & IoT Engineer", id: "iot-eng", videoId: "whqLvigQWoE", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000" },
    { title: "InternX-Drone & Automation Engineer", id: "drone-eng", videoId: "4XO3g7Rfamk", image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1000" },
  ],
  "Future Tech": [
    { title: "InternX-Humanoid Robotics Engineer", id: "humanoid", videoId: "vViMFjvVT9E", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000" },
    { title: "InternX-Smart Mobility Engineer", id: "mobility", videoId: "kriafQfqGZE", image: "https://media.istockphoto.com/id/1637506537/photo/multiracial-tachnicial-engineer-training-with-robot-arm.webp?a=1&b=1&s=612x612&w=0&k=20&c=XXV_xLuijifwyHFnxTBfWORRKNBCMLtcdtBmATZsRww=" },
    { title: "InternX-XR & AI Developer", id: "xr-ai", videoId: "4XO3g7Rfamk", image: "https://media.istockphoto.com/id/1449176968/photo/freelancer-program-developer-working-on-new-app-software-typing-in-front-of-pc-checking-coding.webp?a=1&b=1&s=612x612&w=0&k=20&c=CICIx5gemDE1u3Xh3O4qOVjggZe2nPksn303opWupZs=" },
  ]
};

type CategoryName = keyof typeof allInternships;

export default function CourseGrid() {
  const [activeTab, setActiveTab] = useState<CategoryName>("AI & Data");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const tabs = Object.keys(allInternships) as CategoryName[];

  return (
    <section className="py-16 md:py-24 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase leading-tight">
            Explore All <span className="text-blue-500 italic block sm:inline">InternX Programs</span>
          </h2>
          
          <div className="flex overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center gap-2 mt-8">
            {tabs.map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  activeTab === tab 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                  : 'border-white/10 text-slate-400 hover:border-white/30 hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]">
          {allInternships[activeTab].map((course, idx) => (
            <div 
              key={`${course.id}-${idx}`} 
              className="group bg-[#0a1229] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
            >
              <div 
                className="relative h-56 sm:h-64 w-full overflow-hidden cursor-pointer"
                onClick={() => setSelectedVideo(course.videoId)}
              >
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1229] to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600/90 rounded-full flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 transition-all duration-500 shadow-2xl">
                    <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                  </div>
                </div>

                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                    {activeTab}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-black text-white mb-4 leading-tight min-h-[3rem] line-clamp-2 italic uppercase">
                  {course.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">4-10 MONTHS</span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-3 h-3 fill-current" /> 4.9/5
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase">
                    <Users className="w-3 h-3" /> Industry-Grade Internship
                  </div>
                  <div className="text-slate-500 text-[9px] font-medium border-t border-white/5 pt-3 italic">
                    Next Cohort: Jan 2026 Enrollment Open
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 py-3 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-slate-300 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                    <Download className="w-3 h-3" /> Brochure
                  </button>
                  <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl text-[10px] font-black uppercase text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                    View Details <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-md" onClick={() => setSelectedVideo(null)} />
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-0 sm:rounded-3xl overflow-hidden border-y sm:border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}