"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ChatWidget() {
  const CHATBOT_URL = "https://manee-ai.vercel.app/embed"; 
  const containerRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleMessage = (event: MessageEvent) => {

      if (event.data.type === "MANEE_RESIZE") {
        if (containerRef.current) {
          if (event.data.status === "open") {
            containerRef.current.style.width = "400px";
            containerRef.current.style.height = "600px";
            containerRef.current.style.borderRadius = "12px";
            containerRef.current.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)"; 
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

  if (!mounted) return null;

  return createPortal(
    <div
      ref={containerRef}
      style={{
        position: "sticky", 
        bottom: "20px",
        right: "20px",
        width: "80px", 
        height: "80px",
        zIndex: 2147483647, 
        transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "transparent",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
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
    </div>,
    document.body 
  );
}