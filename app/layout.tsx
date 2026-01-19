import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Career Lab Consulting | B2B & B2C Career Solutions",
    template: "%s | Career Lab Consulting",
  },
  description: "Career Lab Consulting offers expert B2B and B2C solutions, bridging the gap between talent and industry through professional career coaching and business consulting.",
  keywords: ["Career Consulting", "B2B Solutions", "B2C Career Growth", "Job Placement", "Business Consulting"],
  openGraph: {
    title: "Career Lab Consulting",
    description: "Expert B2B and B2C Career & Business Solutions.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
