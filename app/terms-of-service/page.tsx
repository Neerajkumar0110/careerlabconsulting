"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  FileText, 
  Gavel, 
  AlertCircle, 
  CreditCard, 
  Scale, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

const TermsOfService = () => {
  const lastUpdated = "January 24, 2026";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "Hamari services access karke aap confirm karte hain ki aap in terms ko follow karenge. Agar aap in rules se agree nahi karte, toh aap hamari services use nahi kar sakte.",
      icon: <FileText className="text-blue-500" size={18} />
    },
    {
      title: "2. Payment & Razorpay",
      content: "Saari payments Razorpay gateway ke through process hoti hain. Transactions ke waqt aapko Razorpay ki apni terms and conditions ko bhi follow karna hoga. Hum payment failures ya gateway-level issues ke liye responsible nahi hain.",
      icon: <CreditCard className="text-emerald-500" size={18} />
    },
    {
      title: "3. Service Limitations",
      content: "Hamari maintenance aur upgrade services 'as-is' basis par milti hain. Hum 100% bug-free software ki guarantee nahi dete, lekin best industry practices follow karte hain.",
      icon: <AlertCircle className="text-amber-500" size={18} />
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30">
      <Navbar />

      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-white/5 mb-6">
            <Gavel size={14} className="text-slate-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">User Agreement</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-4">
            Terms of <span className="text-blue-500">Service.</span>
          </h1>
          <p className="text-slate-400 font-light italic text-sm">Effective Date: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className="space-y-12">
            {sections.map((section, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/5 rounded-xl">{section.icon}</div>
                  <h2 className="text-xl font-black uppercase italic tracking-tight">{section.title}</h2>
                </div>
                <p className="text-slate-400 leading-relaxed font-light">{section.content}</p>
              </div>
            ))}

            <article className="prose prose-invert max-w-none space-y-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase italic flex items-center gap-3">
                  <ShieldAlert className="text-red-500" /> 4. Liability & Indemnity
                </h3>
                <p className="text-slate-400 font-light leading-relaxed">
                  Kisi bhi condition mein hum (ya hamare developers) aapke data loss, revenue loss, ya system downtime ke liye liable nahi honge jo kisi third-party tool ya unforeseen circumstances ki wajah se ho.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase italic flex items-center gap-3">
                  <Scale className="text-blue-500" /> 5. Termination
                </h3>
                <p className="text-slate-400 font-light leading-relaxed">
                  Hum bina notice ke un accounts ki services terminate kar sakte hain jo hamari terms ko breach karte hain ya suspicious financial activity (via Razorpay) show karte hain.
                </p>
              </div>
            </article>

            <div className="mt-16 p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
               <h4 className="text-emerald-400 font-black uppercase italic mb-4 flex items-center gap-2">
                 <CreditCard size={20} /> Transaction Policy
               </h4>
               <p className="text-sm text-slate-400 leading-relaxed font-light">
                 Saari billed amount non-refundable hain unless explicitly mentioned in our Refund Policy. Payment dispute ke case mein, Razorpay ke investigation protocols final honge. Hum recommendation dete hain ki payment karte waqt aap ek stable internet connection use karein.
               </p>
            </div>
          </div>

          <div className="mt-24 text-center border-t border-white/5 pt-12">
            <p className="text-slate-500 text-sm mb-6 font-light">In terms se judi koi bhi clarify chahiye?</p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="group flex items-center gap-3 mx-auto text-blue-400 font-black uppercase italic tracking-widest text-xs hover:text-white transition-all"
            >
              Contact Legal Team <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TermsOfService;