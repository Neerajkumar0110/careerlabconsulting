"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ChatWidget() {
  const CHATBOT_URL = "https://manee-ai.vercel.app/embed?mode=sales&discount=true"; 
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkUserStatus = () => {
      const lastVisit = localStorage.getItem("manee_last_visit");
      const hasPaid = localStorage.getItem("manee_has_paid");
      const isDismissed = sessionStorage.getItem("manee_chat_dismissed"); 

      if (hasPaid === "true") return; 

      const now = new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000;

      if (!lastVisit || (now - parseInt(lastVisit) < oneDay)) {
        if (!isDismissed) {
          setTimeout(() => {
            setIsOpen(true);
            postMessageToBot({ type: "TRIGGER_OFFER", code: "EARLYBIRD10" });
          }, 2000);
        } else {
            setShowBubble(true); 
        }
      }
      
      localStorage.setItem("manee_last_visit", now.toString());
    };

    checkUserStatus();
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "MANEE_RESIZE") {
        if (containerRef.current) {
          if (event.data.status === "open") {
            setIsOpen(true);
            setShowBubble(false);
          } else {
            setIsOpen(false);
            sessionStorage.setItem("manee_chat_dismissed", "true"); 
          }
        }
      }

      if (event.data.type === "PAYMENT_SUCCESS") {
          localStorage.setItem("manee_has_paid", "true");
          setIsOpen(false);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const postMessageToBot = (msg: any) => {
    const iframe = containerRef.current?.querySelector("iframe");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(msg, "*");
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div 
      style={{ 
        position: "fixed", 
        bottom: "24px", 
        right: "24px", 
        zIndex: 2147483647, 
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "12px",
        pointerEvents: "none"
      }}
    >
      
      {!isOpen && (
        <div 
          onClick={() => setIsOpen(true)}
          className="bg-white text-gray-800 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 w-72 cursor-pointer animate-bounce-gentle transition-all hover:scale-105 pointer-events-auto relative"
          style={{ marginBottom: "8px" }}
        >
           <div className="flex items-start gap-3">
              <div className="bg-red-50 p-2 rounded-full shrink-0">
                  <span className="text-lg">🔥</span>
              </div>
              <div>
                <h3 className="font-bold text-[#d1202e] text-sm mb-0.5">Early Bird Offer!</h3>
                <p className="text-xs text-gray-600 leading-snug">
                  Get <span className="font-bold text-green-600">10% OFF</span> instantly. Offer expires soon.
                </p>
              </div>
           </div>
           
           <button 
             onClick={(e) => { 
                 e.stopPropagation(); 
                 setShowBubble(false); 
                 sessionStorage.setItem("manee_chat_dismissed", "true");
             }}
             className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-[10px] text-gray-600 shadow-sm"
           >
             ✕
           </button>

           <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white transform rotate-45 border-b border-r border-gray-100"></div>
        </div>
      )}

      <div
        ref={containerRef}
        className="transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] bg-white pointer-events-auto"
        style={{
          width: isOpen ? "400px" : "60px",
          height: isOpen ? "600px" : "60px",
          maxWidth: isOpen ? "calc(100vw - 48px)" : "60px",
          maxHeight: isOpen ? "calc(100vh - 100px)" : "60px",
          
          borderRadius: isOpen ? "16px" : "50%",
          overflow: "hidden",
          boxShadow: isOpen ? "0 20px 50px rgba(0,0,0,0.3)" : "0 4px 15px rgba(209, 32, 46, 0.4)",
          position: "relative"
        }}
      >
        <iframe
          src={CHATBOT_URL}
          className="w-full h-full border-none bg-white"
          title="Manee AI Chatbot"
          allow="microphone; clipboard-write"
        />

        {!isOpen && (
             <div 
               onClick={() => setIsOpen(true)}
               className="absolute inset-0 flex items-center justify-center cursor-pointer bg-gradient-to-br from-[#d1202e] to-[#b0101e] hover:from-[#e0303e] hover:to-[#c0202e] transition-colors"
             >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H8.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 12H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 12H16.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
                <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#d1202e] rounded-full animate-pulse"></div>
             </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </div>,
    document.body 
  );
}