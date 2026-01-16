'use client';

import React, { useState, useEffect } from 'react';

export default function HeroB2B() {
  const [avatars, setAvatars] = useState<string[]>([]);

  useEffect(() => {
    const avatarPool = [
      "1560250097-0b93528c311a", "1494790108377-be9c29b29330", 
      "1573496359-136d94205579", "1519085360753-af0119f7cbe7", 
      "1507003211169-0a1dd7228f2d", "1500648767791-00dcc994a43e", 
      "1438761681033-6461ffad8d80"
    ];
    const shuffled = [...avatarPool].sort(() => 0.5 - Math.random());
    setAvatars(shuffled.slice(0, 3));
  }, []);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 md:px-10 overflow-hidden bg-[#030712]">
      {/* Background Decorators - Optimized for mobile performance */}
      <div className="absolute top-[-5%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 md:bg-blue-600/20 blur-[100px] md:blur-[180px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-5%] left-[-10%] w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-indigo-600/10 blur-[100px] md:blur-[150px] rounded-full"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Trusted By - Smaller on Mobile */}
        <div className="flex items-center gap-3 md:gap-4 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl mb-8 md:mb-12 shadow-2xl">
          <div className="flex -space-x-2 md:-space-x-3">
            {avatars.length > 0 ? avatars.map((id, i) => (
              <div key={i} className="relative w-7 h-7 md:w-9 md:h-9 rounded-full border-2 border-[#030712] overflow-hidden bg-slate-800">
                <img 
                  src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=100&h=100`}
                  alt="Partner"
                  className="w-full h-full object-cover"
                />
              </div>
            )) : (
              [1, 2, 3].map((_, i) => <div key={i} className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-slate-700 animate-pulse"></div>)
            )}
          </div>
          <p className="text-blue-100 text-[10px] md:text-[12px] font-medium">
            Trusted by <span className="text-blue-400 font-bold">50+ Fortune 500</span>
          </p>
        </div>

        {/* Hero Text - Responsive Font Sizes */}
        <div className="text-center mb-10 md:mb-16 space-y-6 md:space-y-8">
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[1.1] md:leading-[0.85] text-white px-2">
            Operate at the <br className="hidden md:block" />
            <span className="bg-gradient-to-b from-white via-blue-400 to-blue-700 bg-clip-text text-transparent">
              Speed of Thought
            </span>
          </h1>
          <p className="text-slate-400 text-base md:text-2xl max-w-3xl mx-auto leading-relaxed font-light px-4">
            Deploy <span className="text-white font-medium italic">Autonomous Neural Agents</span> that master your business logic in hours.
          </p>
        </div>

        {/* Action Buttons - Full width on mobile */}
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-16 md:mb-24 w-full sm:w-auto px-6 sm:px-0">
          <button className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-blue-600 text-white font-bold rounded-xl md:rounded-2xl hover:bg-blue-500 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)]">
            Initialize AI Workforce
          </button>
          <button className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-transparent border border-white/10 text-white font-bold rounded-xl md:rounded-2xl hover:bg-white/5 transition-all">
            Watch System Demo
          </button>
        </div>

        {/* Stats Dashboard - Responsive Grid */}
        <div className="relative w-full max-w-5xl mx-auto px-2">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[1.5rem] md:rounded-[2.5rem] blur opacity-15"></div>
          <div className="relative bg-[#0b0f1a]/90 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] backdrop-blur-3xl overflow-hidden">
            <div className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/40"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
                </div>
                <span className="text-slate-500 text-[9px] font-mono tracking-widest uppercase">Agent_Metrics</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="text-green-400 text-[8px] font-bold animate-pulse">LIVE SYNC</span>
              </div>
            </div>

            {/* Grid becomes 1 column on mobile, 3 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
              {[
                { title: 'Task Autonomy', val: '99.4%', color: 'text-blue-400' },
                { title: 'Process Velocity', val: '22ms', color: 'text-cyan-400' },
                { title: 'Cost Efficiency', val: '85%', color: 'text-indigo-400' }
              ].map((stat, i) => (
                <div key={i} className="p-6 md:p-12 hover:bg-white/[0.02] transition-colors group">
                  <p className="text-slate-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">{stat.title}</p>
                  <h3 className={`text-3xl md:text-5xl font-black ${stat.color} tracking-tighter`}>{stat.val}</h3>
                  <div className="mt-4 md:mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full bg-current ${stat.color} w-3/4 opacity-40 group-hover:opacity-100 transition-opacity`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}