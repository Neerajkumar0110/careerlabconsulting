'use client';

import { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  Bot, LineChart, GraduationCap,
  Building2, Contact2, Gavel,
  Wallet, Users, Headset,
  ArrowRight, Cpu, CircleDot,
} from 'lucide-react';
import Image from 'next/image';
import ProductCardModal from './ProductCardModal';
import { usePageContent } from '@/hooks/usePageContent';

// ── helpers ───────────────────────────────────────────────────────────────────
const driveToImage = (url: string): string => {
  if (!url || !url.includes('drive.google.com')) return url;
  const match = url.match(/\/d\/([^/]+)/);
  const id = match ? match[1] : null;
  return id ? `https://lh3.googleusercontent.com/d/${id}=s1600` : url;
};

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Icon registry ─────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Bot, LineChart, GraduationCap, Building2, Contact2,
  Gavel, Wallet, Users, Headset,
};

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  accentColor: string;
  icon: string;
  img: string;
}

type Product = Omit<ProductItem, 'icon'> & {
  icon: React.ElementType;
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_PRODUCTS: ProductItem[] = [
  { id: 'manee',   name: 'MANEE',   tagline: 'Omnichannel AI Communication',  features: ['WhatsApp & Email', 'AI Voice Automation', 'Sentiment Detection'],       accentColor: '#2563eb', icon: 'Bot',           img: 'https://drive.google.com/file/d/1W8b_vG_7vWphGs_vLNjVgSTYN8aMzF2D/view' },
  { id: 'crmx',    name: 'CRM-X',   tagline: 'Growth Engine',                 features: ['Marketing Auto', 'Content Gen', 'Auto Funnels'],                        accentColor: '#2563eb', icon: 'LineChart',     img: 'https://drive.google.com/file/d/1_vjpH3yu4wlGpaZiem3wE8gM42NGOWhV/view' },
  { id: 'lmsx',    name: 'LMS-X',   tagline: 'Learning Intelligence',         features: ['AR/VR 3D Environments', 'AI Mentor', 'Skill Analytics'],               accentColor: '#2563eb', icon: 'GraduationCap', img: 'https://drive.google.com/file/d/1KmjmomZotWKzEDk_j4nO0gdlgCpcK5F6/view' },
  { id: 'edux',    name: 'EduX',    tagline: 'Institutional OS',              features: ['ERP + CRM + LMS', 'Admission Automation', 'Campus Ops'],               accentColor: '#2563eb', icon: 'Building2',     img: 'https://drive.google.com/file/d/1sryro0BpAvjsy8rFFxfs1IK77HMfVr1A/view' },
  { id: 'twinx',   name: 'TwinX',   tagline: 'Digital Executive Twin',        features: ['CEO Business Reports', 'Real-Time Dashboard', 'Decision Support'],     accentColor: '#2563eb', icon: 'Contact2',      img: 'https://drive.google.com/file/d/1Hm_GFLOMOBD4-D2WaZZ1k7hpkWzu2d3s/view' },
  { id: 'legalos', name: 'LegalOS', tagline: 'Autonomous Compliance',         features: ['Agreement Drafting', 'Risk Analysis', 'Smart Contracts'],              accentColor: '#2563eb', icon: 'Gavel',         img: 'https://drive.google.com/file/d/1fU3CcuCSKadvZvuZ-6T8WmcijVUoXtYK/view' },
  { id: 'erpx',    name: 'ERP-X',   tagline: 'Finance Command Center',        features: ['Payroll Automation', 'Revenue Forecast', 'Tax Insights'],              accentColor: '#2563eb', icon: 'Wallet',        img: 'https://drive.google.com/file/d/1FYwRTb0oV0KDstfkiBGq35ZWRZ9Pmlb8/view' },
  { id: 'hrx',     name: 'HR-X',    tagline: 'Recruitment Intelligence',      features: ['Avatar Interviews', 'Screening Engine', 'Ranking AI'],                 accentColor: '#2563eb', icon: 'Users',         img: 'https://drive.google.com/file/d/1vw6mLxKISRITIVh15MUeZ6gcP4JGWdTx/view' },
  { id: 'suppx',   name: 'SuppX',   tagline: 'Support Intelligence',          features: ['24/7 Global Agents', 'Voice + Chat', 'Ticket Resolution'],             accentColor: '#2563eb', icon: 'Headset',       img: 'https://drive.google.com/file/d/1JO4eFAFG1SOzVciDeEvEHUUdThjd7GxG/view' },
];

// ── ProductCard ───────────────────────────────────────────────────────────────
function ProductCard({
  product,
  index,
  onCardClick,
}: {
  product: ProductItem;
  index: number;
  onCardClick: (p: ProductItem) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useSpring(mouseX, { stiffness: 400, damping: 40 });
  const spotlightY = useSpring(mouseY, { stiffness: 400, damping: 40 });

  const Icon = ICON_MAP[product.icon] ?? Bot;

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
      onClick={() => onCardClick(product)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{
        boxShadow: isHovered
          ? `0 20px 60px -15px ${product.accentColor}AA, 0 0 0 1px ${product.accentColor}40`
          : '0 8px 30px -10px rgba(0,0,0,0.15)',
      }}
      className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-xl transition-all duration-500 cursor-pointer"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(400px circle at ${spotlightX}px ${spotlightY}px, ${product.accentColor}08, transparent 100%)` }}
      />

      {/* Image */}
      <div className="relative w-full h-[220px] flex-shrink-0 overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        >
          <Image
            src={driveToImage(product.img)}
            alt={`${product.name} – ${product.tagline}`}
            fill
            className="object-cover"
            priority={index < 3}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
          <div
            className="flex items-center justify-center w-12 h-12 rounded-xl backdrop-blur-md border border-white/20"
            style={{ backgroundColor: `${product.accentColor}80` }}
          >
            <Icon size={20} color="white" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-md border border-white/20 bg-black/20">
            <CircleDot size={8} className="animate-pulse text-white" />
            <span className="text-[9px] font-mono tracking-widest uppercase text-white">Live</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pt-4 flex-shrink-0">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.35em]" style={{ color: product.accentColor }}>
          {product.name}
        </p>
      </div>
      <div className="px-6 pt-1 pb-3 flex-shrink-0 min-h-[60px]">
        <h3 className="text-[24px] font-extrabold text-slate-900 leading-snug tracking-tight">
          {product.tagline}
        </h3>
      </div>
      <div className="px-6 flex-shrink-0 min-h-[52px]">
        <div className="flex flex-wrap gap-1.5">
          {product.features.map((f, i) => (
            <span key={i} className="text-[10px] font-mono py-1 px-2.5 rounded-full border border-slate-200 bg-slate-50 text-slate-600">
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="px-6 pt-4 pb-6 mt-auto">
        <div className="w-full h-[1px] mb-5 bg-slate-100" />
        <div
          className="flex items-center gap-2.5 text-[10px] font-black uppercase tracking-widest transition-colors duration-300"
          style={{ color: isHovered ? product.accentColor : '#475569' }}
        >
          <span>Explore Architecture</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ProductsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { get } = usePageContent('products-section');

  // CMS values
  const sectionBadge    = get('header', 'badge_text',      'Core Products');
  const headline1       = get('header', 'headline_1',      'THE');
  const headlineAccent  = get('header', 'headline_accent', 'AUTONOMOUS');
  const headline2       = get('header', 'headline_2',      'STACK');
  const accentColor     = get('header', 'accent_color',    '#2563eb');
  const productsRaw     = get('products', 'items_json',    JSON.stringify(DEFAULT_PRODUCTS));
  const products        = safeParse<ProductItem[]>(productsRaw, DEFAULT_PRODUCTS).map(p => ({
    ...p,
    accentColor: p.accentColor || accentColor,
  }));

  const handleCardClick = (product: ProductItem) => {
    setSelectedProduct({
    ...product,
    icon: ICON_MAP[product.icon] ?? Bot,
  });
    setModalOpen(true);
  };

  return (
    <section className="relative bg-[#020617] py-28 px-4 sm:px-10 lg:px-20 overflow-hidden">
      {/* Background effects */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: `radial-gradient(rgba(96,165,250,1) 1px, transparent 1px)`, backgroundSize: '36px 36px' }}
      />
      <div
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle at center, rgba(37,99,235,0.4) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-20">
          <div
            className="inline-flex items-center gap-3 px-4 py-1 rounded-full border mb-6"
            style={{ borderColor: `${accentColor}4d`, background: `${accentColor}1a`, color: accentColor }}
          >
            <Cpu size={14} />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase">{sectionBadge}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            {headline1}{' '}
            <span className="text-transparent italic bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #6366f1)` }}>
              {headlineAccent}
            </span>{' '}
            {headline2}
          </h1>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onCardClick={handleCardClick} />
          ))}
        </div>
      </div>

      <ProductCardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
      />
    </section>
  );
}