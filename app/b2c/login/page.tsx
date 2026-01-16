'use client';

import React, { useState } from 'react';
import { Mail, ArrowLeft, ArrowRight, ShieldCheck, Zap, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function B2CLogin() {
  const [email, setEmail] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // Handle OTP Input focus
  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col md:flex-row overflow-hidden">
      
      {/* --- BACK TO HOME BUTTON --- */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Back to Homepage</span>
      </Link>

      {/* --- LEFT SIDE: VISUAL (HIDDEN ON MOBILE) --- */}
      <div className="hidden md:flex md:w-1/2 relative bg-[#050505] items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full -top-20 -left-20" />
        <div className="relative z-10 max-w-md">
          <div className="mb-8 p-4 bg-blue-600 w-fit rounded-3xl rotate-12 shadow-2xl shadow-blue-600/20">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-6xl font-black uppercase italic leading-[0.85] mb-6">
            SECURE <br /> <span className="text-blue-600">ACCESS</span>
          </h1>
          <p className="text-slate-400 font-medium text-lg">
            Join the most elite community of AI architects and Web3 pioneers.
          </p>
          
          <div className="mt-12 space-y-6">
            {['End-to-end encrypted', 'OTP-less security', 'Real-time sync'].map((feat, i) => (
              <div key={i} className="flex items-center gap-3">
                <Zap size={16} className="text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: LOGIN FORM --- */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 pt-32 md:pt-6">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
              {isOtpSent ? "Verify Identity" : "Portal Login"}
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              {isOtpSent ? `We've sent a code to ${email}` : "Enter your email to receive a secure access code."}
            </p>
          </div>

          {!isOtpSent ? (
            /* EMAIL INPUT STEP */
            <div className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="email" 
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#080808] border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-blue-600 transition-all font-bold text-sm"
                />
              </div>
              <button 
                onClick={() => setIsOtpSent(true)}
                disabled={!email}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/20"
              >
                Get Access Code <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            /* OTP INPUT STEP */
            <div className="space-y-8">
              <div className="flex justify-between gap-2">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    className="w-full h-14 md:h-16 bg-[#080808] border border-white/10 rounded-xl text-center font-black text-xl focus:border-blue-600 outline-none"
                  />
                ))}
              </div>
              <div className="space-y-4">
                <button className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-600 hover:text-white transition-all">
                  Verify & Enter
                </button>
                <button 
                  onClick={() => setIsOtpSent(false)}
                  className="w-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                >
                  Change Email Address
                </button>
              </div>
            </div>
          )}

          {/* Social Proof Footer */}
          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">Trusted by developers at</p>
            <div className="flex justify-center gap-6 opacity-30 grayscale contrast-125">
               <span className="font-bold">GOOGLE</span>
               <span className="font-bold">META</span>
               <span className="font-bold">AWS</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}