"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { ShieldCheck, Lock, Eye, CreditCard, Scale, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
  const lastUpdated = "October 24, 2023";

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <Navbar />

      <section className="pt-32 pb-16 px-6 border-b border-white/5 bg-slate-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-xl">
            <ShieldCheck size={14} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Legal Compliance</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-4">
            Privacy <span className="text-slate-500">Policy.</span>
          </h1>
          <p className="text-slate-400 font-light italic text-sm">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <article className="space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <Eye size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic">Overview</h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">
              Hamari priority aapki privacy hai. Yeh policy batati hai ki hum aapka data kaise collect, use aur protect karte hain jab aap hamari services use karte hain. Hamara goal transparent rehna hai taaki aap bina kisi fikar ke hamare platforms par grow kar sakein.
            </p>
          </article>

          <article className="p-8 rounded-[2rem] bg-blue-500/5 border border-blue-500/20 space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <CreditCard size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">Payment Processing & Razorpay</h2>
            </div>
            <div className="space-y-4 text-slate-400 leading-relaxed font-light">
              <p>
                Hum payment processing ke liye **Razorpay** ka use karte hain. Hum aapke card details apne servers par store nahi karte.
              </p>
              <ul className="list-disc pl-6 space-y-3 marker:text-blue-500">
                <li><strong>Encryption:</strong> Transaction ke waqt aapka data Razorpay ke secure PCI-DSS compliant environment mein process hota hai.</li>
                <li><strong>Data Sharing:</strong> Hum sirf wahi info share karte hain jo payment confirm karne ke liye zaruri hoti hai (e.g., amount, billing details).</li>
                <li><strong>Security:</strong> Razorpay industry-standard encryption protocols use karta hai taaki aapka financial data 100% safe rahe.</li>
              </ul>
            </div>
          </article>

          <article className="space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <Lock size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic">Data Hum Kya Collect Karte Hain?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="text-white font-bold text-sm mb-2 uppercase italic tracking-wider">Personal Info</h4>
                <p className="text-xs text-slate-500">Name, Email, Phone number, aur Billing address jo aap humein provide karte hain.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="text-white font-bold text-sm mb-2 uppercase italic tracking-wider">Usage Data</h4>
                <p className="text-xs text-slate-500">IP address, browser type, aur page visit duration taaki hum UX behtar kar sakein.</p>
              </div>
            </div>
          </article>

          <article className="space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <Scale size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic">Security Standards</h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">
              Hum SSL encryption aur regular security audits ka use karte hain. Halanki koi bhi internet transmission 100% secure nahi hota, lekin hum best industry practices follow karte hain aapke data ko safeguard karne ke liye.
            </p>
          </article>

          <article className="pt-10 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-2 text-white font-black italic uppercase">
                  <Globe size={16} />
                  <span>Cookies</span>
                </div>
                <p className="text-sm text-slate-500 font-light">
                  Hum small cookies use karte hain aapke experience ko personalize karne ke liye. Aap inhe browser settings se disable kar sakte hain.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-white font-black italic uppercase tracking-tighter text-2xl">Questions?</h3>
                <p className="text-slate-400 text-sm mb-4">Contact our compliance team:</p>
                <a 
                  href="mailto:privacy@yourdomain.com"
                  className="inline-block bg-white text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-400 transition-all"
                >
                  Email Compliance
                </a>
              </div>
            </div>
          </article>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;