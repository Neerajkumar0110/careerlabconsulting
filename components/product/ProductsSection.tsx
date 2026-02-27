"use client";
import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { 
  Bot, LineChart, GraduationCap, 
  Building2, Contact2, Gavel, 
  Wallet, Users, Headset,
  ArrowRight, Cpu, CircleDot
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const driveToImage = (url: string): string => {
  if (!url || !url.includes('drive.google.com')) return url;
  const match = url.match(/\/d\/([^/]+)/);
  const id = match ? match[1] : null;
  return id ? `https://lh3.googleusercontent.com/d/${id}=s1600` : url;
};

const BLUE_PRIMARY = "#2563eb"; 

const products = [
  {
    id: "manee",
    name: "MANEE",
    tagline: "Omnichannel AI Communication",
    features: ["WhatsApp & Email", "AI Voice Automation", "Sentiment Detection"],
    accentColor: BLUE_PRIMARY,
    icon: Bot,
    scale: 100,
    img: "https://drive.google.com/file/d/1W8b_vG_7vWphGs_vLNjVgSTYN8aMzF2D/view?usp=drive_link",
    span: "lg:col-span-1", 
    clm: "object-cover"
  },
  {
    id: "crmx",
    name: "CRM-X",
    tagline: "Growth Engine",
    features: ["Marketing Auto", "Content Gen", "Auto Funnels"],
    accentColor: BLUE_PRIMARY,
    icon: LineChart,
    img: "https://drive.google.com/file/d/1_vjpH3yu4wlGpaZiem3wE8gM42NGOWhV/view?usp=drive_link",
    scale: 100,
    span: "lg:col-span-1",
    clm: "object-cover"
  },
  {
    id: "lmsx",
    name: "LMS-X",
    tagline: "Learning Intelligence",
    features: ["AR/VR 3D Environments", "AI Mentor", "Skill Analytics"],
    accentColor: BLUE_PRIMARY,
    icon: GraduationCap,
    scale: 100,
    img: "https://drive.google.com/file/d/1KmjmomZotWKzEDk_j4nO0gdlgCpcK5F6/view?usp=drive_link",
    span: "lg:col-span-1",
    clm: "object-cover"
  },
  {
    id: "edux",
    name: "EduX",
    tagline: "Institutional OS",
    features: ["ERP + CRM + LMS", "Admission Automation", "Campus Ops"],
    accentColor: BLUE_PRIMARY,
    icon: Building2,
    scale: 100,
    img: "https://drive.google.com/file/d/1sryro0BpAvjsy8rFFxfs1IK77HMfVr1A/view?usp=drive_link",
    span: "lg:col-span-1",
    clm: "object-cover"
  },
  {
    id: "twinx",
    name: "TwinX",
    tagline: "Digital Executive Twin",
    features: ["CEO Business Reports", "Real-Time Dashboard", "Decision Support"],
    accentColor: BLUE_PRIMARY,
    icon: Contact2,
    scale: 100,
    img: "https://drive.google.com/file/d/1Hm_GFLOMOBD4-D2WaZZ1k7hpkWzu2d3s/view?usp=drive_link",
    span: "lg:col-span-1",
    clm: "object-cover"
  },
  {
    id: "legalos",
    name: "LegalOS",
    tagline: "Autonomous Compliance",
    features: ["Agreement Drafting", "Risk Analysis", "Smart Contracts"],
    accentColor: BLUE_PRIMARY,
    icon: Gavel,
    scale: 100,
    img: "https://drive.google.com/file/d/1fU3CcuCSKadvZvuZ-6T8WmcijVUoXtYK/view?usp=drive_link",
    span: "lg:col-span-1",
    clm: "object-cover"
  },
  {
    id: "erpx",
    name: "ERP-X",
    tagline: "Finance Command Center",
    features: ["Payroll Automation", "Revenue Forecast", "Tax Insights"],
    accentColor: BLUE_PRIMARY,
    icon: Wallet,
    scale: 100,
    img: "https://drive.google.com/file/d/1FYwRTb0oV0KDstfkiBGq35ZWRZ9Pmlb8/view?usp=drive_link",
    span: "lg:col-span-1",
    clm: "object-cover"
  },
  {
    id: "hrx",
    name: "HR-X",
    tagline: "Recruitment Intelligence",
    features: ["Avatar Interviews", "Screening Engine", "Ranking AI"],
    accentColor: BLUE_PRIMARY,
    icon: Users,
    scale: 100,
    img: "https://drive.google.com/file/d/1vw6mLxKISRITIVh15MUeZ6gcP4JGWdTx/view?usp=drive_link",
    span: "lg:col-span-1",
    clm: "object-cover"
  },
  {
    id: "suppx",
    name: "SuppX",
    tagline: "Support Intelligence",
    features: ["24/7 Global Agents", "Voice + Chat", "Ticket Resolution"],
    accentColor: BLUE_PRIMARY,
    icon: Headset,
    scale: 100,
    img: "https://drive.google.com/file/d/1JO4eFAFG1SOzVciDeEvEHUUdThjd7GxG/view?usp=drive_link",
    span: "lg:col-span-1",
    clm: "object-cover"
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const spotlightX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const spotlightY = useSpring(mouseY, { stiffness: 400, damping: 40 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{
        boxShadow: isHovered 
          ? `0 20px 60px -15px ${product.accentColor}AA, 0 0 0 1px ${product.accentColor}40`
          : `0 8px 30px -10px rgba(0,0,0,0.15)`,
      }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl transition-all duration-500 ${product.span}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(400px circle at ${spotlightX}px ${spotlightY}px, ${product.accentColor}08, transparent 100%)` }}
      />

      <div className="relative w-full h-[220px] flex-shrink-0 overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700" style={{ transform: isHovered ? `scale(1.05)` : `scale(1)` }}>
          <Image 
            src={driveToImage(product.img)} 
            alt={`${product.name} - ${product.tagline}`} 
            fill
            className="object-cover"
            priority={index < 3} 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl backdrop-blur-md border border-white/20" style={{ backgroundColor: `${product.accentColor}80` }}>
            <product.icon size={20} color="white" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 bg-black/20">
            <CircleDot size={8} className="animate-pulse text-white" />
            <span className="text-[9px] font-mono tracking-widest uppercase text-white">Live</span>
          </div>
        </div>
      </div>

      <div className="px-6 pt-4 flex-shrink-0">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.35em]" style={{ color: product.accentColor }}>{product.name}</p>
      </div>

      <div className="px-6 pt-1 pb-3 flex-shrink-0 min-h-[60px]">
        <h3 className="text-[24px] font-extrabold text-slate-900 leading-snug tracking-tight">
          {product.tagline}
        </h3>
      </div>

      <div className="px-6 flex-shrink-0 min-h-[52px]">
        <div className="flex flex-wrap gap-1.5">
          {product.features.map((f, i) => (
            <span key={i} className="text-[10px] font-mono py-1 px-2.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600">{f}</span>
          ))}
        </div>
      </div>

      <div className="px-6 pt-4 pb-6 mt-auto">
        <div className="w-full h-[1px] mb-5 bg-slate-100" />
        <div className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest transition-colors duration-300" style={{ color: isHovered ? product.accentColor : "#475569" }}>
          <span>Explore Architecture</span>
          <ArrowRight size={14} />
        </div>
      </div>

      <Link href={`/product/${product.id}`} className="absolute inset-0 z-30" aria-label={`View details for ${product.name}`} />
    </motion.div>
  );
}

export default function ProductsSection() {
  return (
    <section className="relative bg-[#020617] py-28 px-4 sm:px-10 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(rgba(96,165,250,1) 1px, transparent 1px)`, backgroundSize: '36px 36px' }} />
      
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle at center, rgba(37,99,235,0.4) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-6">
            <Cpu size={14} />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase">Core Products</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            THE <span className="text-transparent italic bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">AUTONOMOUS</span> STACK
          </h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}