'use client';

import React, { useState } from 'react';
import { Send, X, Loader2, CheckCircle2, Calendar, MessageSquare, Mail } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleMeetingModal({ isOpen, onClose }: ModalProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    query: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/schedule-meeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        const waMsg = `*New Enterprise Inquiry*%0A*Name:* ${formData.name}%0A*Query:* ${formData.query}`;
        window.open(`https://wa.me/918700236923?text=${waMsg}`, '_blank');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-[#0a0f1e] border border-white/10 w-full max-w-xl rounded-[2.5rem] p-8 md:p-12 relative shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-12">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h3 className="text-3xl font-black uppercase mb-4">Request Sent!</h3>
            <p className="text-slate-400 mb-8">Our strategy team will contact you within 24 hours to finalize the calendar invite.</p>
            <button onClick={onClose} className="px-8 py-3 bg-white text-black font-bold rounded-xl uppercase text-xs tracking-widest">Close Window</button>
          </div>
        ) : (
          <>
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                <Calendar className="w-3 h-3 text-blue-400" />
                <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Enterprise Portal</span>
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">Book B2B <br/><span className="text-slate-500 italic font-serif">Consultation</span></h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="FULL NAME" 
                required 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="email" 
                  placeholder="WORK EMAIL" 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input 
                  type="tel" 
                  placeholder="WHATSAPP NUMBER" 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>
              <textarea 
                placeholder="BRIEF YOUR REQUIREMENT (MODULES, USER COUNT, ETC.)" 
                rows={4} 
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all resize-none"
                onChange={(e) => setFormData({...formData, query: e.target.value})}
              ></textarea>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
              >
                {status === 'loading' ? <Loader2 className="animate-spin" /> : <Send className="w-4 h-4" />} 
                Confirm Meeting Request
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap gap-6 justify-center">
              <a href="mailto:info@careerlabconsulting.com" className="flex items-center gap-2 text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">
                <Mail className="w-4 h-4 text-blue-500" /> info@careerlabconsulting.com
              </a>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <MessageSquare className="w-4 h-4 text-green-500" /> +91 870023 6923
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}