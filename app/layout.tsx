import type { Metadata, Viewport } from "next"; 
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#000000", 
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "The Complete AI Solution Ecosystem - Career Lab Consulting",
    template: "%s - Career Lab Consulting",
  },
  description: "Career Lab Consulting offers expert B2B and B2C solutions, bridging the gap between talent and industry through professional career coaching and business consulting.",
  keywords: ["Career Consulting", "B2B Solutions", "B2C Career Growth", "Job Placement", "Business Consulting"],
  openGraph: {
    title: "Career Lab Consulting",
    description: "Expert B2B and B2C Career & Business Solutions.",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans min-h-screen bg-black text-white`}
      >
        {children}
        <SpeedInsights />

        <div 
  data-chat-widget 
  data-widget-id="69792b644a54c4c911655299" 
  data-location-id="i8XZhzGKuyPerdOqLznm"  > 
 </div> 
<script 
  src="https://widgets.leadconnectorhq.com/loader.js"  
  data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" 
 data-widget-id="69792b644a54c4c911655299"   > 
 </script>
      </body>
    </html>
  );
}