'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Layers, Box, Cpu, CheckCircle2, Zap, TrendingUp, Search, Globe, Users, ShieldCheck,
  GraduationCap, type LucideIcon,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, LucideIcon> = {
  Layers, Box, Cpu, CheckCircle2, Zap, TrendingUp, Search, Globe, Users, ShieldCheck, GraduationCap,
};

interface Product { title: string; desc: string; icon: string; img: string; }
interface Tab     { id: string; label: string; }

const DEFAULT_TABS: Tab[] = [
  { id: 'all',    label: 'All Products' },
  { id: 'single', label: 'Single Stack' },
  { id: 'combo',  label: 'Combo Stack'  },
  { id: 'clcone', label: 'CLC One'      },
];

const DEFAULT_SINGLE: Product[] = [
  { title: 'Sales Suite',          desc: 'AI lead conversion',     icon: 'TrendingUp',  img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800' },
  { title: 'Marketing Suite',      desc: 'Omnichannel automation', icon: 'Zap',         img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800' },
  { title: 'AI Website & Content', desc: 'GenAI site builder',     icon: 'Globe',       img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800' },
  { title: 'Finance & Commerce',   desc: 'Automated ledger',       icon: 'Box',         img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800' },
  { title: 'People Suite',         desc: 'Next-gen HR & Talent',   icon: 'Users',       img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800' },
  { title: 'Support & Knowledge',  desc: 'AI Helpdesk & Wiki',     icon: 'CheckCircle2',img: 'https://images.pexels.com/photos/7983549/pexels-photo-7983549.jpeg' },
  { title: 'Intelligence Suite',   desc: 'Advanced analytics',     icon: 'Search',      img: 'https://images.unsplash.com/photo-1551288049-bbda483387a5?q=80&w=800' },
  { title: 'Governance Suite',     desc: 'AI safety & compliance', icon: 'ShieldCheck', img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800' },
];
const DEFAULT_COMBO: Product[] = [
  { title: 'Business Suite',       desc: 'Sales + Marketing + Content',   icon: 'Layers',       img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800' },
  { title: 'Operations Suite',     desc: 'People + Finance + Inventory',  icon: 'Box',          img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800' },
  { title: 'Education Enterprise', desc: 'Education + People + Finance',  icon: 'GraduationCap',img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800' },
];
const DEFAULT_CLCONE: Product[] = [
  { title: 'CLC One', desc: 'The Complete AI Ecosystem: All suites combined into one powerful SaaS.', icon: 'Cpu', img: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800' },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function B2BProductTabs() {
  const { get } = usePageContent('b2b-product-tabs2');

  const headline         = get('product_tabs', 'headline',            'Enterprise Growth');
  const headlineAccent   = get('product_tabs', 'headline_accent',     'Ecosystem');
  const subheading       = get('product_tabs', 'subheading',          'Explore our high-performance infrastructure designed for the modern era.');
  const previewBadge     = get('product_tabs', 'preview_badge_label', 'Active Preview');
  const previewCardTitle = get('product_tabs', 'preview_card_title',  'Intelligence in Motion');
  const accentFrom       = get('product_tabs', 'accent_from',         '#3b82f6');
  const accentTo         = get('product_tabs', 'accent_to',           '#6366f1');

  const tabsRaw   = get('product_tabs', 'tabs_json',            '');
  const singleRaw = get('product_tabs', 'single_products_json', '');
  const comboRaw  = get('product_tabs', 'combo_products_json',  '');
  const clconeRaw = get('product_tabs', 'clcone_products_json', '');

  const tabs          = safeParse<Tab[]>(tabsRaw, DEFAULT_TABS);
  const singleProducts = safeParse<Product[]>(singleRaw, DEFAULT_SINGLE);
  const comboProducts  = safeParse<Product[]>(comboRaw,  DEFAULT_COMBO);
  const clconeProducts = safeParse<Product[]>(clconeRaw, DEFAULT_CLCONE);

  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? 'all');
  const [hoveredImage, setHoveredImage] = useState(singleProducts[0]?.img ?? '');

  const allProducts = [...singleProducts, ...comboProducts, ...clconeProducts];

  const productMap: Record<string, Product[]> = {
    all: allProducts,
    single: singleProducts,
    combo: comboProducts,
    clcone: clconeProducts,
  };

  const filteredProducts = productMap[activeTab] ?? allProducts;

  return (
    <section className="py-24 bg-[#020617] text-white overflow-hidden" id="enterprise-matrix">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            {headline}{' '}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
              {headlineAccent}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            {subheading}
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 border"
              style={
                activeTab === tab.id
                  ? { backgroundColor: accentFrom, borderColor: accentFrom, color: '#fff', boxShadow: `0 0 20px ${accentFrom}66` }
                  : { backgroundColor: 'rgba(17,24,39,0.4)', borderColor: 'rgba(55,65,81,1)', color: '#6b7280' }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products + preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className={`grid gap-4 ${activeTab === 'all' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}
              >
                {filteredProducts.map((product, idx) => {
                  const Icon = ICON_MAP[product.icon] ?? Cpu;
                  return (
                    <motion.div
                      key={`${activeTab}-${idx}`}
                      onMouseEnter={() => setHoveredImage(product.img)}
                      className="group relative p-6 rounded-2xl bg-gray-900/30 border border-gray-800/50 hover:bg-blue-600/5 hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl text-blue-500 group-hover:scale-110 group-hover:text-white transition-all duration-300 shrink-0"
                          style={{ backgroundColor: `${accentFrom}1a` }}
                          onMouseEnter={e => (e.currentTarget.style.backgroundColor = accentFrom)}
                          onMouseLeave={e => (e.currentTarget.style.backgroundColor = `${accentFrom}1a`)}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors" style={{ color: undefined }}>
                            {product.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed">{product.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image preview — desktop only */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="sticky top-32">
              <motion.div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-gray-800 bg-gray-900 shadow-2xl">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={hoveredImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    {hoveredImage && (
                      <Image src={hoveredImage} alt="Solution Visualization" fill className="object-cover transition-transform duration-700 hover:scale-105" priority sizes="(max-width: 1024px) 100vw, 40vw" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent opacity-80" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-10 left-10 right-10 p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentFrom }}>{previewBadge}</span>
                  </div>
                  <h4 className="text-white text-xl font-semibold uppercase tracking-tight">{previewCardTitle}</h4>
                  <p className="text-gray-400 text-sm mt-2 leading-snug">
                    Visualizing how our {activeTab === 'clcone' ? 'Master Product' : 'modular stacks'} unify complex business workflows.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}