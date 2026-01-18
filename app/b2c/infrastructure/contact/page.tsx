'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Globe, Send, 
  MessageSquare, Clock, ArrowRight, ShieldCheck 
} from 'lucide-react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    protocol: 'Data Analytics Protocol',
    message: ''
  });

  const OWNER_PHONE = "918700236923"; // 91 for India prefix

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Formatting message for WhatsApp
    const text = `*New Inquiry from CLC Website*%0A%0A` +
                 `*Name:* ${formData.name}%0A` +
                 `*Email:* ${formData.email}%0A` +
                 `*Interested In:* ${formData.protocol}%0A` +
                 `*Message:* ${formData.message}`;

    const whatsappUrl = `https://wa.me/${OWNER_PHONE}?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col selection:bg-blue-500/30">
      <B2CHeader />

      <main className="flex-grow pt-32 pb-20">
        {/* Header Section */}
        <section className="px-4 max-w-7xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <MessageSquare size={14} /> Contact Our Experts
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none mb-6">
            Let's Talk <span className="text-blue-500">Career.</span>
          </h1>
        </section>

        <section className="px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-[48px] p-8 md:p-14 shadow-3xl backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] -z-10" />
            
            <h3 className="text-3xl font-black mb-10 flex items-center gap-3 italic uppercase tracking-tighter">
              Send a <span className="text-blue-500 underline decoration-4 underline-offset-8">Message</span>
            </h3>
            
            <form className="space-y-8" onSubmit={handleWhatsAppSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group space-y-3">
                  <label className="text-xs font-black uppercase text-slate-500 ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all text-white placeholder:text-slate-600 shadow-inner"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="group space-y-3">
                  <label className="text-xs font-black uppercase text-slate-500 ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="name@company.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all text-white placeholder:text-slate-600 shadow-inner"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="group space-y-3">
                <label className="text-xs font-black uppercase text-slate-500 ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">Interested Protocol</label>
                <div className="relative">
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all text-white appearance-none cursor-pointer"
                    onChange={(e) => setFormData({...formData, protocol: e.target.value})}
                  >
                    <option className="bg-[#020617]">Data Analytics Protocol</option>
                    <option className="bg-[#020617]">Full Stack Engineering</option>
                    <option className="bg-[#020617]">Cyber Security Protocol</option>
                    <option className="bg-[#020617]">Digital Marketing</option>
                  </select>
                  <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-slate-500 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="group space-y-3">
                <label className="text-xs font-black uppercase text-slate-500 ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">Your Message</label>
                <textarea 
                  required
                  rows={4} 
                  placeholder="How can we help your career?" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 focus:bg-white/[0.07] transition-all text-white placeholder:text-slate-600 resize-none shadow-inner"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-2xl flex items-center justify-center gap-4 transition-all transform hover:scale-[1.02] active:scale-95 shadow-2xl shadow-blue-600/30 uppercase tracking-[0.2em] text-sm"
              >
                Send to WhatsApp <Send size={20} />
              </button>

              <div className="flex items-center justify-center gap-6 pt-4 grayscale opacity-50">
                 <ShieldCheck size={16} className="text-emerald-500" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Secure Submission Protocol</span>
              </div>
            </form>
          </motion.div>

          {/* Contact Details & Map */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all shrink-0">
                    <MapPin size={26} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Corporate Office</h4>
                    <p className="text-sm font-bold text-slate-200 leading-relaxed italic">
                      5th Floor, Cyber Green Part-1, DLF Building No -2, Sector 25, Gurugram, Haryana 122002
                    </p>
                  </div>
                </div>

                <div className="h-px bg-white/10 w-full" />

                <div className="space-y-6">
                  <a href={`tel:${OWNER_PHONE}`} className="flex items-center gap-5 text-slate-300 hover:text-blue-500 transition-all group">
                    <Phone size={22} className="text-blue-500" />
                    <span className="text-lg font-black tracking-tighter">08700236923</span>
                    <ArrowRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </a>
                  <a href="mailto:support@careerlabconsulting.com" className="flex items-center gap-5 text-slate-300 hover:text-blue-500 transition-all group">
                    <Mail size={22} className="text-blue-500" />
                    <span className="text-lg font-black tracking-tighter">support@careerlabconsulting.com</span>
                    <ArrowRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </a>
                </div>
              </div>

              <div className="rounded-[40px] overflow-hidden border border-white/10 h-[350px] shadow-3xl relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.223391312041!2d77.0867!3d28.4878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI5JzE2LjEiTiA3N8KwMDUnMTIuMSJF!5e0!3m2!1sen!2sin!4v1625560000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.7) contrast(1.2)' }} 
                  allowFullScreen 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-blue-500/5 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}