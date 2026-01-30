'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronRight, Terminal, Cpu, Zap, MessageSquare } from 'lucide-react';

const faqs = [
  {
    question: "Do I need a high-end PC to access the LMS?",
    answer: "No. Our LMS is a cloud-integrated environment. All heavy neural training and code deployments happen on our proprietary servers. You only need a stable internet connection and a browser."
  },
  {
    question: "Is the 'Industry Navigator' a real person or AI?",
    answer: "You are paired with a real-world Senior Engineer (Navigator) from top tech firms. While we use AI to track your progress, your mock interviews and code reviews are conducted by humans."
  },
  {
    question: "What kind of projects will I deploy?",
    answer: "You will build and deploy production-grade autonomous agents, Web3 audit protocols, and real-time neural interfaces. These aren't 'to-do' apps; these are scalable systems."
  },
  {
    question: "How does the NFT certification work?",
    answer: "Upon successful completion and deployment of your final capstone, a soul-bound NFT certificate is minted on the blockchain, serving as a permanent, tamper-proof proof of your skills."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      <div className="absolute -left-24 top-1/2 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />
      <div className="absolute -right-24 bottom-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />

      <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 mb-6 backdrop-blur-sm">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em]">System Protocols</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">
            HAVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600 italic">QUESTIONS?</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Everything you need to know about the neural internship protocols and cloud deployment environment.
          </p>
        </div>

        <div className="grid gap-4">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className={`group transition-all duration-500 rounded-[2rem] border overflow-hidden ${
                openIndex === i 
                ? 'bg-white/[0.03] border-blue-500/40 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]' 
                : 'bg-[#0a0f1d]/50 border-white/5 hover:border-white/20'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 md:p-8 text-left"
              >
                <div className="flex items-center gap-4 md:gap-6">
                   <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                     openIndex === i ? 'bg-blue-600 text-white rotate-[360deg] shadow-lg shadow-blue-500/20' : 'bg-white/5 text-slate-500'
                   }`}>
                      {i === 0 ? <Terminal className="w-5 h-5" /> : i === 1 ? <Cpu className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                   </div>
                   <span className={`font-bold text-base md:text-xl tracking-tight transition-colors duration-300 ${openIndex === i ? 'text-white' : 'text-slate-400'}`}>
                    {faq.question}
                   </span>
                </div>
                <div className={`p-2 rounded-full transition-all duration-300 ${openIndex === i ? 'bg-blue-500/20 rotate-90' : 'bg-white/5'}`}>
                  <ChevronRight className={`w-5 h-5 ${openIndex === i ? 'text-blue-400' : 'text-slate-600'}`} />
                </div>
              </button>
              
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-5 md:px-8 pb-8 ml-0 md:ml-16">
                  <div className="h-px w-full bg-gradient-to-r from-blue-500/30 to-transparent mb-6" />
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-28 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <MessageSquare className="w-32 h-32 text-blue-500" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 italic">STILL IN THE DARK?</h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto text-sm md:text-base">
                    If your queries aren't listed in our protocols, connect with our neural support team for a direct uplink.
                </p>
                <button className="relative inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] active:scale-95">
                    Establish Connection
                    <Zap className="w-4 h-4 fill-white" />
                </button>
            </div>
        </div>

      </div>
    </section>
  );
}