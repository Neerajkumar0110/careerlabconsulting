"use client";

import { useEffect, useState, useRef } from "react";

export default function ChatWidget() {
  const CHATBOT_URL = "https://manee-ai.vercel.app/embed"; 
  
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "MANEE_RESIZE") {
        if (iframeRef.current) {
          if (event.data.status === "open") {
            iframeRef.current.style.width = "400px";
            iframeRef.current.style.height = "600px";
            iframeRef.current.style.borderRadius = "12px";
          } else {
            iframeRef.current.style.width = "80px";
            iframeRef.current.style.height = "80px";
            iframeRef.current.style.borderRadius = "50%";
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={CHATBOT_URL}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "80px", 
        height: "80px",
        border: "none",
        zIndex: 9999,
        transition: "width 0.3s ease, height 0.3s ease, border-radius 0.3s ease",
        borderRadius: "50%",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
      }}
      title="Manee AI Chatbot"
    />
  );
}