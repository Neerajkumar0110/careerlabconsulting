"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ChatWidget() {
  const CHATBOT_URL = "https://manee-ai.vercel.app/embed"; 
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "MANEE_RESIZE") {
        if (containerRef.current) {
          if (event.data.status === "open") {
            setIsOpen(true);
            setShowBubble(false); 
            
            containerRef.current.style.width = "400px";
            containerRef.current.style.height = "600px";
            containerRef.current.style.borderRadius = "12px";
            containerRef.current.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)"; 
          } else {
            setIsOpen(false);
            
            containerRef.current.style.width = "70px"; 
            containerRef.current.style.height = "70px";
            containerRef.current.style.borderRadius = "50%";
            containerRef.current.style.boxShadow = "0 4px 15px rgba(209, 32, 46, 0.4)";
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: "2147483647 !important" as any }}>
      
      {showBubble && !isOpen && (
        <div 
          className="absolute bottom-24 right-0 bg-white text-gray-800 px-5 py-4 rounded-xl shadow-2xl border border-gray-100 w-72 animate-float"
          style={{ animation: "float 3s ease-in-out infinite" }}
        >
           <div className="flex items-start gap-3">
              <span className="text-2xl">👋</span>
              <div>
                <h3 className="font-bold text-[#d1202e] text-sm mb-1">Need Help?</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Come chat with me! I am <b>Manee</b>. 
                  If you have any confusion about our courses or services, just ask me! 🚀
                </p>
              </div>
           </div>
           
           <button 
             onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
             className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xs p-1"
           >
             ✕
           </button>

           <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 border-b border-r border-gray-100"></div>
        </div>
      )}

      <div
        ref={containerRef}
        style={{
          width: "70px",
          height: "70px",
          position: "relative", 
          transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: isOpen ? "transparent" : "#d1202e", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          cursor: "pointer"
        }}
      >
        <iframe
          src={CHATBOT_URL}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            pointerEvents: "auto"
          }}
          title="Manee AI Chatbot"
        />

        {!isOpen && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-[#d1202e]">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12h15m-15 0a2.25 2.25 0 00-2.25 2.25v2.75a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-2.75a2.25 2.25 0 00-2.25-2.25m-15 0V5.75A2.25 2.25 0 016.75 3.5h10.5a2.25 2.25 0 012.25 2.25V12M12 7.5v1.5" />
               </svg>
            </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>,
    document.body 
  );
}