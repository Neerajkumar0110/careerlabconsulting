"use client";

import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";

const ChatWidget = dynamic(() => import("@/components/ChatWidget"), { 
  ssr: false,
  loading: () => null 
});

const BackToTop = dynamic(() => import("@/components/BackToTop"), { 
  ssr: false 
});

export default function ClientWrapper() {
  return (
    <>
      <ChatWidget />
      <BackToTop />
      <SpeedInsights />
    </>
  );
}