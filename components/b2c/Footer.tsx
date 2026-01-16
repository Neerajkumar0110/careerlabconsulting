'use client';

import React from 'react';
import { Github, Twitter, Linkedin, Mail, ArrowUpRight, Home, Layout, CreditCard, HelpCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = "919810984968";

  return (
    <>
      <footer className="bg-[#020617] pt-20 pb-24 md:pb-10 border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-blue-600/5 blur-[120px] -z-10" />

        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            
            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="w-32 h-20 relative mb-4">
                <img 
                  src="/logo.png" 
                  alt="Career Lab Consulting" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                />
              </div>
              
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed font-medium mb-8">
                Advancing human potential through neural-integrated learning. Join our elite cohort of engineers shipping the future.
              </p>

              <div className="relative w-full max-w-md group">
                <input 
                  type="email" 
                  placeholder="uplink@email.com" 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                />
                <button className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 pt-4">
              <div className="space-y-6">
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Protocols</h4>
                <ul className="space-y-4 text-slate-500 text-sm font-bold">
                  <li className="hover:text-blue-400 cursor-pointer transition-colors flex items-center gap-1 group">
                    Neural LMS <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                  </li>
                  <li className="hover:text-blue-400 cursor-pointer transition-colors">Career Outcomes</li>
                  <li className="hover:text-blue-400 cursor-pointer transition-colors">Mentorship</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Infrastructure</h4>
                <ul className="space-y-4 text-slate-500 text-sm font-bold">
                  <li className="hover:text-blue-400 cursor-pointer transition-colors">Documentation</li>
                  <li className="hover:text-blue-400 cursor-pointer transition-colors">API Access</li>
                  <li className="hover:text-blue-400 cursor-pointer transition-colors">System Status</li>
                </ul>
              </div>

              <div className="space-y-6 col-span-2 md:col-span-1">
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Connect</h4>
                <div className="flex gap-4">
                  {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                    <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/30 cursor-pointer transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">© {currentYear} Career Lab Consulting</span>
              <div className="h-1 w-1 rounded-full bg-slate-800 hidden md:block" />
              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
              <div className="relative">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping absolute" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full relative" />
              </div>
              <span className="text-[10px] text-emerald-500/80 font-black uppercase tracking-widest">Core Systems: Operational</span>
            </div>
          </div>
        </div>
      </footer>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md h-16 bg-[#0a0f1d]/90 backdrop-blur-xl border border-white/10 rounded-3xl z-[100] md:hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-around px-2">
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-blue-400 transition-colors">
          <Home className="w-5 h-5" />
          <span className="text-[8px] font-bold uppercase">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-blue-400 transition-colors">
          <Layout className="w-5 h-5" />
          <span className="text-[8px] font-bold uppercase">LMS</span>
        </button>

        <a 
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative -top-7 w-16 h-16 bg-[#25D366] rounded-full border-[6px] border-[#020617] flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300"
          title="Chat on WhatsApp"
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-8 h-8 text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.123.544 4.197 1.583 6.012L0 24l6.117-1.605a11.745 11.745 0 005.925 1.603h.005c6.635 0 12.028-5.391 12.032-12.027a11.812 11.812 0 00-3.476-8.513z"/>
          </svg>
        </a>

        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-blue-400 transition-colors">
          <CreditCard className="w-5 h-5" />
          <span className="text-[8px] font-bold uppercase">Plans</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500 hover:text-blue-400 transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="text-[8px] font-bold uppercase">Support</span>
        </button>
      </nav>
    </>
  );
}