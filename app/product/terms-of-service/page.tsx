'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/product/Navbar';
import B2BFooter from '@/components/product/Footer';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

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
          Terms-Of-Service
        </span>
      </li>
    </ol>
  </nav>
);


export default function TermsOfServicePage() {
  return (
    <div className="relative bg-[#020617] text-slate-300 min-h-screen overflow-hidden">

      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[140px] top-[-200px] left-[-200px] animate-pulse" />
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 blur-[140px] bottom-[-200px] right-[-200px] animate-pulse" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

      <Navbar />

      <Breadcrumb/>

      <section className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 1 }}
          className="mb-24"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-purple-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent animate-[gradient_6s_linear_infinite]">
            Terms of Service
          </h1>

          <div className="mt-8 w-40 h-[3px] bg-gradient-to-r from-purple-500 via-cyan-500 to-transparent" />

          <p className="mt-6 text-sm sm:text-base uppercase tracking-[0.3em] text-slate-500">
            Effective Date — January 1, 2026
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-24">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
              className="group relative p-10 sm:p-14 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-500 shadow-[0_0_40px_rgba(124,58,237,0.15)]"
            >
              {/* Huge Floating Number */}
              { index > 8 ? 
              <div className="absolute -top-10 right-10 text-[120px] font-extrabold text-white/5 group-hover:text-purple-500/10 transition duration-500">
                {`${index + 1}`}
              </div>
              : 
              <div className="absolute -top-10 right-10 text-[120px] font-extrabold text-white/5 group-hover:text-purple-500/10 transition duration-500">
                {`0${index + 1}`}
              </div>
              }

              <h2 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {section.title}
              </h2>

              <p className="text-slate-400 text-base sm:text-lg leading-relaxed tracking-wide">
                {section.content}
              </p>

              {/* Animated bottom glow */}
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
  { title: 'Introduction', content: 'These Terms govern access to all Career Lab Consulting AI ecosystems, infrastructure, and SaaS platforms including Core Products, Suites, and CLC One.' },
  { title: 'Platform Scope', content: 'Our autonomous AI infrastructure powers enterprise communication, CRM automation, governance, education, finance, and HR systems globally.' },
  { title: 'User Obligations', content: 'Users must comply with applicable regulations, maintain account security, and avoid misuse or reverse engineering of AI systems.' },
  { title: 'Billing & Licensing', content: 'Subscription access requires active payment. Enterprise bundles follow contractual agreements.' },
  { title: 'Intellectual Property', content: 'All proprietary AI models, software architecture, and branding remain exclusive property of Career Lab Consulting.' },
  { title: 'Liability & Termination', content: 'We are not liable for indirect damages. Access may be suspended upon violation of terms.' },
  {
  title: 'Acceptable Use Policy',
  content: 'Users may not use the platform for unlawful activities, harmful automation, spam distribution, security exploitation, or AI misuse that violates ethical or regulatory standards.'
},
{
  title: 'Data Ownership',
  content: 'Customers retain ownership of their business data. We process such data solely for service delivery, platform optimization, and security purposes as outlined in our Privacy Policy.'
},
{
  title: 'AI Output Responsibility',
  content: 'While our AI systems are designed for accuracy and reliability, users are responsible for reviewing AI-generated outputs before relying on them for legal, financial, or operational decisions.'
},
{
  title: 'Service Availability',
  content: 'We strive to maintain high availability standards; however, scheduled maintenance, infrastructure upgrades, or unforeseen technical issues may cause temporary interruptions.'
},
{
  title: 'Third-Party Integrations',
  content: 'Platform functionality may depend on third-party services. We are not responsible for disruptions caused by external providers beyond our direct control.'
},
{
  title: 'Confidentiality',
  content: 'Both parties agree to protect confidential information exchanged during the course of service engagement and to prevent unauthorized disclosure.'
},
{
  title: 'Indemnification',
  content: 'Users agree to indemnify and hold harmless Career Lab Consulting against claims arising from misuse of the platform, regulatory violations, or unauthorized deployment of AI outputs.'
},
{
  title: 'Governing Law',
  content: 'These Terms shall be governed by and interpreted in accordance with applicable jurisdictional laws where Career Lab Consulting operates, without regard to conflict of law principles.'
},
{
  title: 'Dispute Resolution',
  content: 'Disputes shall first be attempted to be resolved through good-faith negotiation. If unresolved, matters may proceed to arbitration or competent courts as contractually agreed.'
},
{
  title: 'Amendments & Updates',
  content: 'We reserve the right to update these Terms periodically. Continued use of our services after modifications constitutes acceptance of the revised Terms.'
}
];