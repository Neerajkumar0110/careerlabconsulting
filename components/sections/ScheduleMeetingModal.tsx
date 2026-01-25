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
      script.src = "https://my.setmore.com/webapp/js/src/others/setmore_iframe.js";
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
    <div className="fixed inset-0 z-[10000] flex items-start sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4">
      
      <div className="relative w-full max-w-4xl bg-[#0a0f1e] border border-white/10 rounded-none sm:rounded-[2rem] shadow-2xl flex flex-col h-full sm:h-[90vh] mt-16 sm:mt-0 overflow-hidden">
        
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/5 bg-[#0d1326] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg hidden xs:block">
              <ShieldCheck className="text-blue-500 w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white text-base sm:text-xl font-black uppercase tracking-tight leading-none">
                B2B <span className="text-blue-500">Consultation</span>
              </h3>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mt-1">Select your appointment slot</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all border border-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 bg-white overflow-hidden relative">
          <iframe 
            src="https://careerlabconsulting.setmore.com" 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="yes"
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </div>

        <div className="p-4 bg-[#0a0f1e] border-t border-white/5 flex items-center justify-center sm:justify-between gap-3 shrink-0">
          <p className="hidden sm:block text-[10px] text-slate-500 uppercase font-black tracking-widest">
            CAREER LAB CONSULTING PVT LTD
          </p>
          <a 
            href="https://wa.me/918700236923"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg"
          >
            <MessageSquare className="w-4 h-4" /> 
            Direct Support
          </a>
        </div>
      </div>
    </div>
  );
}