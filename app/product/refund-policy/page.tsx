'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/product/Navbar';
import B2BFooter from '@/components/product/Footer';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0 }
};

const Breadcrumb = () => (
  <nav className="relative z-20 flex items-center justify-center pt-30 sm:pt-32 px-4 pointer-events-auto">
    <ol className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
      <li className="flex items-center">
        <Link href="/product/" className="text-slate-400 hover:text-indigo-400 transition-colors">
          <Home size={14} />
        </Link>
      </li>
      <li className="flex items-center text-slate-700">
        <ChevronRight size={12} />
      </li>
      <li className="flex items-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white-400/80 cursor-default">
          Refund-Policy
        </span>
      </li>
    </ol>
  </nav>
);


export default function RefundPolicyPage() {
  return (
    <div className="relative bg-[#020617] text-slate-300 min-h-screen overflow-hidden">

      {/* Aurora */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[140px] top-[-200px] left-[-200px] animate-pulse" />
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 blur-[140px] bottom-[-200px] right-[-200px] animate-pulse" />
      </div>

      <div className="absolute inset-0 -z-10 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

      <Navbar />
      <Breadcrumb/>
      <section className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 1 }}
          className="mb-24"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            Refund Policy
          </h1>

          <div className="mt-8 w-40 h-[3px] bg-gradient-to-r from-purple-500 via-cyan-500 to-transparent" />

          <p className="mt-6 text-sm sm:text-base uppercase tracking-[0.3em] text-slate-500">
            Effective Date — January 1, 2026
          </p>
        </motion.div>

        <div className="space-y-24">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
              className="group relative p-10 sm:p-14 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-500 shadow-[0_0_40px_rgba(6,182,212,0.15)]"
            >
              {index < 9 ? 
              <div className="absolute -top-7 right-10 text-[120px] font-extrabold text-white/5 group-hover:text-cyan-500/10 transition duration-500">
                {`0${index + 1}`}
              </div> : 
              <div className="absolute -top-7 right-10 text-[120px] font-extrabold text-white/5 group-hover:text-cyan-500/10 transition duration-500">
                {`${index + 1}`}
              </div>
              }
              

              <h2 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {section.title}
              </h2>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed tracking-wide">
                {section.content}
              </p>

              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-purple-500 via-cyan-500 to-transparent transition-all duration-700" />
            </motion.div>
          ))}
        </div>

      </section>

      <B2BFooter />
    </div>
  );
}

const sections = [
  { title: 'Subscription Refunds', content: 'Activated subscriptions are non-refundable unless exceptional failure conditions occur.' },
  { title: 'Enterprise Agreements', content: 'Enterprise bundle refunds follow signed contractual terms.' },
  { title: 'Trial Policy', content: 'Trials may be cancelled before billing begins.' },
  { title: 'Service Credits', content: 'Extended outages may qualify for discretionary service credits.' },
  { title: 'Dispute Handling', content: 'Unauthorized chargebacks may result in suspension.' },
  {
    title: 'Refund Eligibility Conditions',
    content: 'Refund requests are evaluated based on service activation status, usage level, and contractual obligations. Accounts with significant platform usage may not qualify for refunds.'
  },
  {
    title: 'Non-Refundable Services',
    content: 'Custom development work, onboarding fees, implementation services, and third-party integrations are strictly non-refundable once delivered or initiated.'
  },
  {
    title: 'Billing Errors',
    content: 'If you believe you were incorrectly charged, you must notify us within 7 days of the transaction. Verified billing errors will be corrected promptly.'
  },
  {
    title: 'Cancellation Policy',
    content: 'Subscriptions must be cancelled before the renewal date to avoid future billing. Cancellation does not retroactively refund prior charges.'
  },
  {
    title: 'Payment Method Reversals',
    content: 'Refunds, when approved, will be processed to the original payment method. Processing timelines may vary depending on banking institutions.'
  },
  {
    title: 'Policy Abuse Prevention',
    content: 'We reserve the right to deny refund requests in cases of repeated abuse, fraudulent behavior, or policy manipulation attempts.'
  },
  {
    title: 'Policy Modifications',
    content: 'We may revise this Refund Policy at any time. Continued use of our services after updates constitutes acceptance of the revised terms.'
  }

];