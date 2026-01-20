'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Building2, Briefcase, Mail, Sparkles, ArrowRight } from 'lucide-react';

export default function HeroB2B() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', role: '', email: '' });

  const OWNER_PHONE = "918700236923";
  const avatars = ["1560250097-0b93528c311a", "1494790108377-be9c29b29330", "1507003211169-0a1dd7228f2d", "1599566150163-29194dcaad36"];

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
  }, [isModalOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Strategy Call Request*%0A*Name:* ${formData.name}%0A*Company:* ${formData.company}%0A*Role:* ${formData.role}%0A*Email:* ${formData.email}`;
    window.open(`https://wa.me/${OWNER_PHONE}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 overflow-hidden bg-[#020617]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl mx-auto text-center"
      >
        {/* Floating Badge */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        >
          <div className="flex -space-x-2">
            {avatars.map((id, i) => (
              <img key={i} src={`https://images.unsplash.com/photo-${id}?w=64&h=64&fit=crop`} className="w-6 h-6 rounded-full border-2 border-[#020617] object-cover" alt="user" />
            ))}
          </div>
          <div className="h-4 w-[1px] bg-white/20 mx-1" />
          <span className="text-blue-100 text-[11px] md:text-xs font-semibold tracking-wide flex items-center gap-2">
            <Sparkles size={14} className="text-blue-400" />
            TRUSTED BY 50+ INNOVATIVE TEAMS
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white mb-8 tracking-tight leading-[0.95] md:leading-[1]">
          Scale Productivity <br /> 
          <span className="relative">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent italic">
              Without Limits
            </span>
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-12 leading-relaxed">
          Deploy AI agents that handle your operations, sales, and support 24/7. 
          Stop managing tasks—start managing results.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <motion.button 
            onClick={() => window.open(`https://wa.me/${OWNER_PHONE}?text=Hello! I want to start my free trial.`, '_blank')}
            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(37,99,235,0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="group w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all"
          >
            Start Your Free AI Trial
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button 
            onClick={() => setIsModalOpen(true)}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-bold rounded-2xl backdrop-blur-md transition-all"
          >
            Book Strategy Call
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#0f172a] border border-blue-500/20 rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
                <X size={24} />
              </button>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Let&apos;s Build.</h2>
                <p className="text-slate-400">Enter your details and we&apos;ll reach out on WhatsApp.</p>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {[
                  { icon: User, name: 'name', placeholder: 'Full Name', type: 'text' },
                  { icon: Building2, name: 'company', placeholder: 'Company Name', type: 'text' },
                  { icon: Briefcase, name: 'role', placeholder: 'Designation', type: 'text' },
                  { icon: Mail, name: 'email', placeholder: 'Work Email', type: 'email' },
                ].map((field) => (
                  <div key={field.name} className="relative group">
                    <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                      required 
                      type={field.type}
                      placeholder={field.placeholder} 
                      className="w-full pl-12 pr-4 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-white outline-none focus:border-blue-500/50 transition-all focus:bg-white/[0.05]" 
                      onChange={(e) => setFormData({...formData, [field.name]: e.target.value})} 
                    />
                  </div>
                ))}
                
                <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl mt-4 shadow-lg shadow-blue-600/20 transition-all active:scale-95">
                  Confirm & Schedule via WhatsApp
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}