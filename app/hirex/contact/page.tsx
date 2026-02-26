// app/hirex/contact/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: 'enterprise',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, msg: '' });

    try {
      const response = await fetch('/hirex/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', msg: 'Secure transmission sent. Our agents will contact you shortly.' });
        setFormData({ name: '', email: '', company: '', interest: 'enterprise', message: '' });
      } else {
        setSubmitStatus({ type: 'error', msg: 'Transmission failed. Please try again or use direct comm-links.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', msg: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus({ type: null, msg: '' }), 5000);
    }
  };

  const CONTACT_NODES = [
    {
      title: "Direct Comm-Link",
      value: "+91 870023 6923",
      subtext: "Available Mon-Fri, 9AM-6PM IST",
      icon: Phone,
      action: "https://wa.me/918700236923",
      actionText: "Open WhatsApp"
    },
    {
      title: "Global Inbox",
      value: "info@careerlabconsulting.com",
      subtext: "Average response time: < 2 hours",
      icon: Mail,
      action: "mailto:info@careerlabconsulting.com",
      actionText: "Send Email"
    },
    {
      title: "HQ Coordinates",
      value: "Gurugram, India",
      subtext: "DLF Cyber City, 5th Floor, Cyber Green-2, Sec-25",
      icon: MapPin,
      action: "https://maps.app.goo.gl/L75gvLCgiUQqysk99",
      actionText: "View on Map"
    }
  ];

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 text-white bg-[#020617]">
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <section className="relative pt-32 pb-24 z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <nav className="mb-6 flex items-center space-x-2 text-sm font-medium text-slate-400">
              <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-blue-300">Contact</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
              Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Connection</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              Ready to upgrade your talent acquisition? Reach out to our team to deploy autonomous AI interviews, schedule a demo, or request custom integrations for your enterprise.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            <div className="lg:col-span-5 space-y-6">
              {CONTACT_NODES.map((node, index) => (
                <div key={index} className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:bg-slate-900/60 hover:border-blue-500/30">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                      <node.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{node.title}</h3>
                      <p className="text-xl font-bold text-white mb-1">{node.value}</p>
                      <p className="text-sm text-slate-500 mb-4">{node.subtext}</p>
                      <a href={node.action} target={node.action.startsWith('http') ? "_blank" : "_self"} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-cyan-300 transition-colors">
                        {node.actionText}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900/40 border border-emerald-500/20 rounded-3xl p-6 flex items-center gap-4">
                <div className="relative flex h-4 w-4 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">HireX Support Agents Online</h4>
                  <p className="text-xs text-emerald-400/80 mt-1 font-mono uppercase tracking-wider">All systems operational</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 right-0 p-8 hidden md:block">
                  <Globe className="w-24 h-24 text-blue-500/5" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-8">Send a Secure Transmission</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Work Email</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company</label>
                      <input 
                        type="text" 
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                        placeholder="Acme Corp"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="interest" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Primary Interest</label>
                      <select 
                        id="interest"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                      >
                        <option value="enterprise" className="bg-slate-900 text-white">Enterprise Hiring Solution</option>
                        <option value="startup" className="bg-slate-900 text-white">Startup Talent Engine</option>
                        <option value="partnership" className="bg-slate-900 text-white">Partner Program</option>
                        <option value="support" className="bg-slate-900 text-white">Technical Support</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Transmission Payload</label>
                    <textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                      placeholder="Tell us about your hiring bottlenecks..."
                    ></textarea>
                  </div>

                  {submitStatus.type && (
                    <div className={`p-4 rounded-xl text-sm ${submitStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                      {submitStatus.msg}
                    </div>
                  )}

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          <span>Transmit Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
          <div className="w-full h-64 md:h-100 rounded-3xl overflow-hidden border border-white/10 relative mt-12 md:mt-24">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.662988882718!2d77.0623762!3d28.4896943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5b02b6f908d%3A0x3f9da383c70066be!2sCareer%20Lab%20Consulting%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1772108517896!5m2!1sen!2sin" 
                  className="w-full h-full border-0 absolute inset-0" 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}