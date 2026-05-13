"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { RefreshCcw, AlertCircle, HelpCircle, CheckCircle2, Ban, Mail } from 'lucide-react';

const RefundPolicy = () => {
  const lastUpdated = "October 24, 2023";

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <Navbar />

      <section className="pt-32 pb-16 px-6 border-b border-white/5 bg-slate-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-xl">
            <RefreshCcw size={14} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Cancellation & Refunds</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-4">
            Refund <span className="text-slate-500">Policy.</span>
          </h1>
          <p className="text-slate-400 font-light italic text-sm">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <article className="space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <AlertCircle size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">Commitment to Satisfaction</h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">
              We strive to provide exceptional value through our services. If you feel that our services have not met the promised standards, we offer a transparent refund process. Please review the terms outlined below to understand your eligibility and the steps involved.
            </p>
          </article>

          <article className="p-8 rounded-[2rem] bg-blue-500/5 border border-blue-500/20 space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <CheckCircle2 size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">Refund Timeline & Process</h2>
            </div>
            <div className="space-y-4 text-slate-400 leading-relaxed font-light">
              <p>
                Once a refund is approved, the processing time depends on the financial institutions involved:
              </p>
              <ul className="list-disc pl-6 space-y-3 marker:text-blue-500">
                <li><strong>Review Period:</strong> All requests are reviewed by our compliance team within 24-48 business hours.</li>
                <li><strong>Original Method:</strong> Approved refunds are credited back only to the **original payment method** (Bank Account, Card, or UPI) used during the transaction.</li>
                <li><strong>Standard Timeline:</strong> As per Razorpay and banking protocols, it typically takes **5 to 7 working days** for the amount to reflect in your account.</li>
              </ul>
            </div>
          </article>

          <article className="space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <Ban size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">Eligibility Criteria</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="text-white font-bold text-sm mb-2 uppercase italic tracking-wider">Eligible Requests</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Duplicate transactions, accidental over-billing, or failure to deliver service due to verified technical errors on our end.</p>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="text-white font-bold text-sm mb-2 uppercase italic tracking-wider">Non-Eligible</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Refunds will not be issued for "change of mind" once digital content has been accessed or services have been partially consumed.</p>
              </div>
            </div>
          </article>

          <article className="space-y-6">
            <div className="flex items-center gap-3 text-blue-400">
              <HelpCircle size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">Cancellation Rights</h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">
              You may cancel your subscription or service at any time. Upon cancellation, you will not be charged for the subsequent billing cycle. Eligibility for a refund of previously paid amounts remains subject to the criteria mentioned above.
            </p>
          </article>

          <article className="pt-10 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-2 text-white font-black italic uppercase">
                  <Mail size={16} />
                  <span>Direct Assistance</span>
                </div>
                <p className="text-sm text-slate-500 font-light">
                  Have questions regarding a specific transaction? Our support team is available to assist you with any billing inquiries within 24 hours.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-white font-black italic uppercase tracking-tighter text-2xl">Initiate Refund</h3>
                <p className="text-slate-400 text-sm mb-4">Please include your Order ID in the email:</p>
                <button 
                  onClick={() => window.location.href = 'mailto:support@yourdomain.com'}
                  className="bg-white text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-white/5"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </article>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default RefundPolicy;