"use client";

import { useEffect, useRef } from "react";

export default function ChatWidget() {
  const CHATBOT_URL = "https://manee-ai.vercel.app/embed"; 
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "MANEE_RESIZE") {
        if (containerRef.current) {
          if (event.data.status === "open") {
            containerRef.current.style.width = "400px";
            containerRef.current.style.height = "600px";
            containerRef.current.style.borderRadius = "12px";
            containerRef.current.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
          } else {
            containerRef.current.style.width = "80px";
            containerRef.current.style.height = "80px";
            containerRef.current.style.borderRadius = "50%";
            containerRef.current.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",  
        bottom: "20px",
        right: "20px",
        width: "80px",      
        height: "80px",     
        zIndex: 99999,      
        transition: "width 0.3s ease, height 0.3s ease, border-radius 0.3s ease, box-shadow 0.3s ease",
        borderRadius: "50%",
        overflow: "hidden",  
        backgroundColor: "transparent"
      }}
    >
      <iframe
        src={CHATBOT_URL}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Manee AI Chatbot"
      />
    </div>
  );
}