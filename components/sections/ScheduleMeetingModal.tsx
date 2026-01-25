'use client';

import React, { useEffect } from 'react';
import { X, MessageSquare, ShieldCheck } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScheduleMeetingModal({ isOpen, onClose }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
      document.body.style.overflow = 'hidden';

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
      
      <div className="relative w-full max-w-4xl bg-[#0a0f1e] border border-white/10 rounded-none sm:rounded-[2rem] shadow-2xl flex flex-col h-full sm:h-[90vh] mt-16 sm:mt-0 overflow-hidden">
        
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5 bg-[#0d1326] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <ShieldCheck className="text-blue-500 w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white text-base sm:text-xl font-black uppercase tracking-tight">
                B2B Strategy <span className="text-blue-500">Session</span>
              </h3>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Secure your slot</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all border border-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          <div 
            className="calendly-inline-widget w-full" 
            data-url="https://calendly.com/mr-deepanshujoshi/30min?hide_event_type_details=1&hide_gdpr_banner=1" 
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
        </div>

        <div className="p-4 bg-[#0a0f1e] border-t border-white/5 flex items-center justify-center sm:justify-between gap-3 shrink-0">
          <p className="hidden sm:block text-[10px] text-slate-500 uppercase font-bold tracking-widest">
            Direct sync with Google Calendar
          </p>
          <a 
            href="https://wa.me/918700236923"
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg"
          >
            <MessageSquare className="w-4 h-4" /> 
            Talk to Owner
          </a>
        </div>
      </div>
    </div>
  );
}