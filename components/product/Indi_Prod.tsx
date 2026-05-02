'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Bot, LineChart, GraduationCap, Building2, Contact2,
  Gavel, Wallet, Users, Headset, Cpu, Layers, Box,
  Zap, TrendingUp, Globe, ShieldCheck, CheckCircle2,
  BarChart2, BookOpen, Truck, FlaskConical, Search,
  Activity, Scan, Boxes, ArrowRight,
} from 'lucide-react';
import { driveToImage } from '@/utils/driveToImage';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

/* ─── Icon registry ────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ReactNode> = {
  Bot:           <Bot className="w-5 h-5" />,
  LineChart:     <LineChart className="w-5 h-5" />,
  Contact2:      <Contact2 className="w-5 h-5" />,
  Wallet:        <Wallet className="w-5 h-5" />,
  Users:         <Users className="w-5 h-5" />,
  Headset:       <Headset className="w-5 h-5" />,
  Gavel:         <Gavel className="w-5 h-5" />,
  BookOpen:      <BookOpen className="w-5 h-5" />,
  Building2:     <Building2 className="w-5 h-5" />,
  TrendingUp:    <TrendingUp className="w-5 h-5" />,
  Zap:           <Zap className="w-5 h-5" />,
  Globe:         <Globe className="w-5 h-5" />,
  BarChart2:     <BarChart2 className="w-5 h-5" />,
  FlaskConical:  <FlaskConical className="w-5 h-5" />,
  Search:        <Search className="w-5 h-5" />,
  ShieldCheck:   <ShieldCheck className="w-5 h-5" />,
  Truck:         <Truck className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  Layers:        <Layers className="w-5 h-5" />,
  Box:           <Box className="w-5 h-5" />,
  Cpu:           <Cpu className="w-6 h-6" />,
};

/* ─── Types ────────────────────────────────────────────────────────────────── */
type ProductItem = {
  title: string;
  desc: string;
  features: string[];
  icon: string;
  img: string;
  badge?: string;
  category: string;
  url?: string;
};

/* ─── Corner ornament ──────────────────────────────────────────────────────── */
const HUDCorner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const size = 16, borderW = 2, color = 'rgba(59,130,246,0.7)';
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: 0, left: 0,  borderTop: `${borderW}px solid ${color}`, borderLeft:  `${borderW}px solid ${color}` },
    tr: { top: 0, right: 0, borderTop: `${borderW}px solid ${color}`, borderRight: `${borderW}px solid ${color}` },
    bl: { bottom: 0, left: 0,  borderBottom: `${borderW}px solid ${color}`, borderLeft:  `${borderW}px solid ${color}` },
    br: { bottom: 0, right: 0, borderBottom: `${borderW}px solid ${color}`, borderRight: `${borderW}px solid ${color}` },
  };
  return <span style={{ ...styles[position], position: 'absolute', width: size, height: size, zIndex: 10 }} aria-hidden />;
};

const Scanlines = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 z-10"
    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)', mixBlendMode: 'multiply' }} />
);

/* ─── Default data ─────────────────────────────────────────────────────────── */
const DEFAULT_CORE_PRODUCTS = JSON.stringify([
  { title: "Manee", desc: "Omni-Channel AI Communication", category: "core", features: ["WhatsApp, Email & Voice", "Sentiment Detection", "24/7 Autonomous Response"], icon: "Bot", img: "https://drive.google.com/file/d/1W8b_vG_7vWphGs_vLNjVgSTYN8aMzF2D/view?usp=drive_link", url: "/product/manee" },
  { title: "CRM-X", desc: "Autonomous Growth & Marketing", category: "core", features: ["AI Lead Scoring", "Auto Content Generation", "Sales Funnel Automation"], icon: "LineChart", img: "https://drive.google.com/file/d/1_vjpH3yu4wlGpaZiem3wE8gM42NGOWhV/view?usp=drive_link", url: "/product/crmx" },
  { title: "TwinX", desc: "Intelligent Executive Assistant", category: "core", features: ["CEO-Level Business Reports", "Real-Time Analytics Dashboard", "Autonomous Decision Support"], icon: "Contact2", img: "https://drive.google.com/file/d/1Hm_GFLOMOBD4-D2WaZZ1k7hpkWzu2d3s/view?usp=drive_link", url: "/product/twinx" },
  { title: "ErpX", desc: "AI Finance & Ledger Command", category: "core", features: ["Automated Payroll Processing", "Revenue Forecasting AI", "Tax Compliance Engine"], icon: "Wallet", img: "https://drive.google.com/file/d/1FYwRTb0oV0KDstfkiBGq35ZWRZ9Pmlb8/view?usp=drive_link", url: "/product/erpx" },
  { title: "HrX", desc: "Autonomous Recruitment AI", category: "core", features: ["AI Avatar Interviews", "Skill-Based Screening Engine", "Candidate Ranking AI"], icon: "Users", img: "https://drive.google.com/file/d/1vw6mLxKISRITIVh15MUeZ6gcP4JGWdTx/view?usp=drive_link", url: "/product/hrx" },
  { title: "SuppX", desc: "24/7 Autonomous Support", category: "core", features: ["Global Voice + Chat Agents", "Auto Ticket Resolution", "Multi-Industry Coverage"], icon: "Headset", img: "https://drive.google.com/file/d/1JO4eFAFG1SOzVciDeEvEHUUdThjd7GxG/view?usp=drive_link", url: "/product/suppx" },
  { title: "LegalOS", desc: "Autonomous Legal Intelligence", category: "core", features: ["Agreement & Contract Drafting", "Compliance Risk Analysis", "Smart Contract Automation"], icon: "Gavel", img: "https://drive.google.com/file/d/1fU3CcuCSKadvZvuZ-6T8WmcijVUoXtYK/view?usp=drive_link", url: "/product/legalos" },
  { title: "LMS-X", desc: "3D AR/VR Immersive Learning", category: "core", features: ["AR/VR 3D Environments", "AI Mentor & Code Editor", "Skill Progress Analytics"], icon: "BookOpen", img: "https://drive.google.com/file/d/1KmjmomZotWKzEDk_j4nO0gdlgCpcK5F6/view?usp=drive_link", url: "/product/lmsx" },
  { title: "EduX", desc: "Institutional AI Ecosystem", category: "core", features: ["ERP + CRM + LMS Unified", "Admissions Automation", "Full Campus Operations AI"], icon: "Building2", img: "https://drive.google.com/file/d/1sryro0BpAvjsy8rFFxfs1IK77HMfVr1A/view?usp=drive_link", url: "/product/edux" },
]);

const DEFAULT_SINGLE_PRODUCTS = JSON.stringify([
  { title: "Sales Suite", desc: "AI Lead Conversion Engine", category: "single", features: ["Predictive Lead Scoring", "Pipeline Automation", "Auto Follow-up Sequences"], icon: "TrendingUp", img: "https://drive.google.com/file/d/1LJslWsnEFgb1Epoy30RidSIiTkl0ADnF/view?usp=sharing", url: "/products/sales" },
  { title: "Marketing Suite", desc: "Omnichannel Automation", category: "single", features: ["Cross-Channel Campaigns", "AI A/B Testing", "Attribution Analytics"], icon: "Zap", img: "https://drive.google.com/file/d/1MXEIwBmujn2t9M3_6TXgl6sq3wMhGfy7/view?usp=drive_link", url: "/products/marketing" },
  { title: "AI Website & Content", desc: "GenAI Site Builder", category: "single", features: ["AI Page Generation", "Dynamic Copy Writer", "SEO Auto-Optimiser"], icon: "Globe", img: "https://drive.google.com/file/d/19-8vwWL4FJ4JcGyVzNumiMBzMEZ15AKj/view?usp=drive_link", url: "/products/content" },
  { title: "Finance & Commerce", desc: "Automated Ledger", category: "single", features: ["Smart Invoice Automation", "Commerce Reconciliation", "Real-Time Cashflow AI"], icon: "BarChart2", img: "https://drive.google.com/file/d/13Lrsagwm0NyUWUA8ozGqLtL4nBi7QtmV/view?usp=drive_link", url: "/products/finance" },
  { title: "People Suite", desc: "Next-Gen HR & Talent", category: "single", features: ["Talent Acquisition AI", "Performance Management", "Culture & Engagement Tools"], icon: "Users", img: "https://drive.google.com/file/d/1Uddz1kTzjYs7KJllwHEhnUWDF8ObXEat/view?usp=drive_link", url: "/products/people" },
  { title: "Support & Knowledge", desc: "AI Helpdesk & Wiki", category: "single", features: ["Self-Learning Knowledge Base", "Intelligent Ticket Routing", "AI-Powered Helpdesk"], icon: "ShieldCheck", img: "https://drive.google.com/file/d/1B9eYUWyfUdWYIR0sW6Y7kqR7ie1DvI6X/view?usp=drive_link", url: "/products/support" },
  { title: "Automation Platform", desc: "Workflow Orchestration", category: "single", features: ["No-Code Workflow Builder", "AI Agent Orchestration", "Event-Driven Triggers"], icon: "FlaskConical", img: "https://drive.google.com/file/d/1pOVLTulhCkzpg92eOS3gjdHer9lgzkjF/view?usp=drive_link", url: "/products/automation" },
  { title: "Intelligence Suite", desc: "Advanced Analytics", category: "single", features: ["Predictive BI Dashboards", "Custom Data Models", "Executive Report Generation"], icon: "Search", img: "https://drive.google.com/file/d/1U9YHafbAliN895s8X6jmD_JBB06aq17p/view?usp=drive_link", url: "/products/intelligence" },
  { title: "Governance Suite", desc: "AI Safety & Compliance", category: "single", features: ["Policy Enforcement Engine", "Full Audit Trail Logging", "Regulatory Risk Scoring"], icon: "ShieldCheck", img: "https://drive.google.com/file/d/1SNUV5BEx-lF-hDJ2ZB--polMzrEbM0gw/view?usp=drive_link", url: "/products/governance" },
  { title: "Inventory & Supply Chain", desc: "Predictive Logistics", category: "single", features: ["AI Demand Forecasting", "Auto Reorder Engine", "Supplier Intelligence"], icon: "Truck", img: "https://drive.google.com/file/d/19h8AMGvVQNP90P0x2jQyFWmbd0snBwJj/view?usp=drive_link", url: "/products/logistics" },
  { title: "Education Suite", desc: "AI Learning Management", category: "single", features: ["Adaptive Learning Paths", "AI-Powered Grading", "Student Performance Analytics"], icon: "GraduationCap", img: "https://drive.google.com/file/d/1El5NXmKLqWdT5EuOmryE42Fv_Z2voP2Q/view?usp=drive_link", url: "/products/education" },
]);

const DEFAULT_COMBO_PRODUCTS = JSON.stringify([
  { title: "Business Suite", desc: "Sales + Marketing + Content", category: "combo", badge: "Flagship", features: ["Unified Growth Dashboard", "End-to-End Lead-to-Revenue", "AI Content & Campaign Engine"], icon: "Layers", img: "https://drive.google.com/file/d/1qIsrgjZyLyIqwy0oMzV_LqG7MYESuxAj/view?usp=drive_link", url: "/products/business-suite" },
  { title: "Operations Suite", desc: "People + Finance + Inventory", category: "combo", features: ["Unified Back-Office Command", "HR + Payroll + Logistics AI", "Real-Time Ops Intelligence"], icon: "Box", img: "https://drive.google.com/file/d/19h8AMGvVQNP90P0x2jQyFWmbd0snBwJj/view?usp=drive_link", url: "/products/operations-suite" },
  { title: "Growth Suite", desc: "Business + Finance + Support", category: "combo", features: ["Revenue + Cost Optimisation", "Customer Lifecycle Automation", "Finance-Backed Growth AI"], icon: "TrendingUp", img: "https://drive.google.com/file/d/1MXEIwBmujn2t9M3_6TXgl6sq3wMhGfy7/view?usp=drive_link", url: "/products/growth-suite" },
  { title: "Execution Suite", desc: "Automation + Support + Governance", category: "combo", features: ["Full Workflow Automation", "Always-On Support Intelligence", "Compliance-Grade Governance"], icon: "Zap", img: "https://drive.google.com/file/d/1SNUV5BEx-lF-hDJ2ZB--polMzrEbM0gw/view?usp=drive_link", url: "/products/execution-suite" },
  { title: "Education Enterprise", desc: "Education + People + Finance", category: "combo", features: ["Complete Institutional OS", "Student-to-Staff Lifecycle AI", "Campus Finance Automation"], icon: "GraduationCap", img: "https://drive.google.com/file/d/1El5NXmKLqWdT5EuOmryE42Fv_Z2voP2Q/view?usp=drive_link", url: "/products/education-enterprise" },
]);

const DEFAULT_CLCONE_PRODUCTS = JSON.stringify([
  { title: "CLC One", desc: "The Complete AI Ecosystem", category: "master", badge: "Complete", features: ["All 9 Core Products Unified", "All 11 Single Suites Included", "All 5 Combo Suites Active", "One Master Dashboard", "Full Enterprise Automation"], icon: "Cpu", img: "https://drive.google.com/file/d/1pOVLTulhCkzpg92eOS3gjdHer9lgzkjF/view?usp=drive_link", url: "/products/clc-one" },
]);

const categoryAccent: Record<string, string> = {
  core: '#3b82f6', single: '#6366f1', combo: '#06b6d4', master: '#a855f7',
};
const categoryLabel: Record<string, string> = {
  core: 'CORE', single: 'SINGLE', combo: 'COMBO', master: 'MASTER',
};

const B2BProductTabs = () => {
  const { get } = usePageContent('b2b-product-tabs');

  // Section header CMS
  const sectionBadge   = get('header', 'badge_text',    'Enterprise Growth Ecosystem');
  const headline       = get('header', 'headline',      'Enterprise Growth');
  const headlineAccent = get('header', 'headline_accent','Ecosystem');
  const subtext        = get('header', 'subtext',       'Explore our high-performance infrastructure designed for the modern era.');

  // Tab labels
  const tab1Label = get('tabs', 'tab_core_label',   'Core Products');
  const tab2Label = get('tabs', 'tab_single_label', 'Single Stack');
  const tab3Label = get('tabs', 'tab_combo_label',  'Combo Stack');
  const tab4Label = get('tabs', 'tab_clcone_label', 'CLC One');

  // Products from CMS
  const coreProductsRaw   = get('products', 'core_products_json',   DEFAULT_CORE_PRODUCTS);
  const singleProductsRaw = get('products', 'single_products_json', DEFAULT_SINGLE_PRODUCTS);
  const comboProductsRaw  = get('products', 'combo_products_json',  DEFAULT_COMBO_PRODUCTS);
  const clconeProductsRaw = get('products', 'clcone_products_json', DEFAULT_CLCONE_PRODUCTS);

  const productData: Record<string, ProductItem[]> = {
    core:   safeParse<ProductItem[]>(coreProductsRaw,   []),
    single: safeParse<ProductItem[]>(singleProductsRaw, []),
    combo:  safeParse<ProductItem[]>(comboProductsRaw,  []),
    clcone: safeParse<ProductItem[]>(clconeProductsRaw, []),
  };

  const tabs = [
    { id: 'core',   label: tab1Label, count: productData.core.length   },
    { id: 'single', label: tab2Label, count: productData.single.length },
    { id: 'combo',  label: tab3Label, count: productData.combo.length  },
    { id: 'clcone', label: tab4Label, count: productData.clcone.length },
  ];

  const defaultProduct = productData.core[0];
  const [activeTab, setActiveTab]         = useState('core');
  const [activeProduct, setActiveProduct] = useState<ProductItem>(defaultProduct);

  const getFiltered = (): ProductItem[] => productData[activeTab] ?? [];

  const signalBars = Array.from({ length: 24 }).map((_, i) => ({
    opacity: 0.2 + (i % 5) * 0.1,
    h1: 25 + (i % 7) * 8,
    h2: 40 + (i % 6) * 7,
    duration: 1.2 + (i % 4) * 0.4,
  }));

  const filtered  = getFiltered();
  const isCLCOne  = activeTab === 'clcone';
  const accent    = categoryAccent[activeProduct?.category ?? 'core'] ?? '#3b82f6';
  const catLabel  = categoryLabel[activeProduct?.category  ?? 'core'] ?? 'CORE';

  if (!activeProduct) return null;

  return (
    <section className="relative hidden lg:block py-16 sm:py-20 lg:py-28 bg-[#020617] text-white overflow-hidden" id="enterprise-matrix">
      {/* Background atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(ellipse at center, #2563eb 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05]"
          style={{ background: 'radial-gradient(ellipse at top right, #6366f1 0%, transparent 65%)', filter: 'blur(70px)' }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: 'radial-gradient(rgba(96,165,250,1) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-[0.28em] uppercase">
            <Cpu size={11} /> {sectionBadge}
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
            {headline}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">{headlineAccent}</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
            {subtext}
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
          {tabs.map((tab) => (
            <button key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                const next = productData[tab.id]?.[0] ?? defaultProduct;
                setActiveProduct(next);
              }}
              className={`group flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full text-[11px] sm:text-[14px] font-bold transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_24px_rgba(37,99,235,0.5)]'
                  : 'bg-gray-900/40 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

          {/* LEFT — product cards */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab}
                initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.35 }}
                className={`grid gap-3 ${isCLCOne ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {filtered.map((product, idx) => {
                  const isActive   = activeProduct.title === product.title;
                  const cardAccent = categoryAccent[product.category] ?? '#3b82f6';
                  return (
                    <motion.div key={`${activeTab}-${idx}`}
                      initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.025, duration: 0.3 }}
                      onMouseEnter={() => setActiveProduct(product)}
                      onClick={() => setActiveProduct(product)}
                      style={isActive ? { borderColor: `${cardAccent}55`, boxShadow: `0 0 24px ${cardAccent}18, inset 0 0 40px ${cardAccent}08` } : {}}
                      className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                        isCLCOne ? 'p-5 sm:p-7' : 'p-4 sm:p-5'
                      } ${isActive ? 'bg-[#0b1628]' : 'bg-gray-900/25 border-slate-800/40 hover:border-red-700/60 hover:bg-red-900/40'}`}>
                      {isActive && (
                        <motion.div layoutId="card-accent"
                          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                          style={{ background: `linear-gradient(180deg, ${cardAccent}, ${cardAccent}44)` }} />
                      )}
                      <div className={`flex gap-3 sm:gap-4 ${isCLCOne ? 'flex-col sm:flex-row items-start' : 'items-start'}`}>
                        <div style={isActive ? { background: `${cardAccent}22`, color: cardAccent, boxShadow: `0 0 14px ${cardAccent}44` } : {}}
                          className={`shrink-0 flex items-center justify-center rounded-xl transition-all duration-300 ${
                            isCLCOne ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-10 h-10'
                          } ${isActive ? 'scale-105' : 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/15 group-hover:text-blue-300'}`}>
                          {ICON_MAP[product.icon] ?? <Cpu className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <h3 className={`font-bold leading-snug transition-colors ${
                              isCLCOne ? 'text-lg sm:text-xl' : 'text-sm sm:text-[16px]'
                            } ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                              {product.title}
                            </h3>
                            {product.badge && (
                              <span className={`px-2 py-0.5 text-[8px] sm:text-[9px] font-black tracking-widest uppercase rounded-full border ${
                                product.badge === 'Complete'
                                  ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                                  : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                              }`}>{product.badge}</span>
                            )}
                          </div>
                          <p className="text-gray-500 text-xs sm:text-[13px] leading-snug mb-2.5">{product.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — HUD Preview */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="lg:sticky lg:top-28 space-y-0">
              <motion.div className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #060d1f 0%, #050b18 50%, #07101e 100%)', border: `1px solid rgba(37,99,235,0.25)`, boxShadow: `0 0 0 1px rgba(37,99,235,0.08), 0 25px 60px -15px rgba(0,0,0,0.7), 0 0 80px -20px ${accent}22` }}>
                <AnimatePresence mode="wait">
                  <motion.div key={accent}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                    aria-hidden className="pointer-events-none absolute inset-0 z-0"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}18 0%, transparent 60%)` }} />
                </AnimatePresence>

                {/* HUD top bar */}
                <div className="relative z-10 flex items-center justify-between px-4 sm:px-5 py-3 border-b border-blue-500/10"
                  style={{ background: 'linear-gradient(90deg, rgba(37,99,235,0.08) 0%, transparent 100%)' }}>
                  <div className="flex items-center gap-2.5">
                    <Scan size={13} className="text-blue-400" />
                    <span className="text-[9px] sm:text-[10px] font-black tracking-[0.3em] uppercase text-blue-400">System Preview</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500/60" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                    <span className="w-2 h-2 rounded-full bg-green-500/60 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
                  </div>
                </div>

                {/* 16:9 Image */}
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                  <HUDCorner position="tl" /><HUDCorner position="tr" /><HUDCorner position="bl" /><HUDCorner position="br" />
                  <AnimatePresence mode="popLayout">
                    <motion.div key={activeProduct.img}
                      initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }} className="absolute inset-0">
                      <Image src={driveToImage(activeProduct.img)} alt={`${activeProduct.title} preview`}
                        fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 42vw" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, #050b18 100%)' }} />
                      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${accent}10 0%, transparent 60%)` }} />
                    </motion.div>
                  </AnimatePresence>
                  <Scanlines />
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(5,11,24,0.8)', border: '1px solid rgba(74,222,128,0.3)', backdropFilter: 'blur(8px)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(74,222,128,0.9)' }} />
                    <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase text-green-400">LIVE</span>
                  </div>
                  <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full flex items-center justify-center"
                    style={{ background: `${accent}22`, border: `1px solid ${accent}44`, backdropFilter: 'blur(8px)' }}>
                    <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase text-center" style={{ color: accent }}>{catLabel}</span>
                  </div>
                </div>

                {/* Info section */}
                <div className="relative z-10 px-4 sm:px-6 pt-4 sm:pt-5 pb-5 sm:pb-6">
                  <AnimatePresence mode="wait">
                    <motion.div key={activeProduct.title}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div>
                          <h4 className="text-white text-base sm:text-xl font-bold leading-snug tracking-tight">{activeProduct.title}</h4>
                          <p className="text-xs sm:text-sm mt-0.5" style={{ color: `${accent}cc` }}>{activeProduct.desc}</p>
                        </div>
                        {activeProduct.badge && (
                          <span className={`shrink-0 mt-1 px-2.5 py-1 text-[8px] sm:text-[9px] font-black tracking-widest uppercase rounded-full border ${
                            activeProduct.badge === 'Complete'
                              ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                              : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                          }`}>{activeProduct.badge}</span>
                        )}
                      </div>
                      <div className="relative mb-4 h-px" style={{ background: `linear-gradient(90deg, ${accent}60, ${accent}10, transparent)` }}>
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
                        {activeProduct.features.map((feat, fi) => (
                          <div key={fi} className="flex items-center gap-2.5">
                            <div className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
                              style={{ background: `${accent}18`, border: `1px solid ${accent}35` }}>
                              <CheckCircle2 className="w-3 h-3" style={{ color: accent }} />
                            </div>
                            <span className="text-[10px] sm:text-xs text-gray-300 leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <a href={activeProduct.url ?? '#'}
                          className="inline-flex w-full items-center justify-center px-5 py-3 rounded-lg text-xs font-bold tracking-wider uppercase transition-all text-center"
                          style={{ background: `${accent}99`, color: '#fff', boxShadow: `0 0 18px ${accent}66` }}>
                          Explore More &nbsp;<ArrowRight size={14} />
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Signal bars */}
                  <div className="mt-4 flex items-center gap-2">
                    <Activity size={10} className="text-blue-500/40" />
                    <div className="flex-1 flex items-end gap-0.5 h-12">
                      {signalBars.map((bar, i) => (
                        <motion.div key={i} className="flex-1 rounded-sm"
                          style={{ background: `rgba(37,99,235,${bar.opacity})` }}
                          animate={{ height: [`${bar.h1}%`, `${bar.h2}%`] }}
                          transition={{ duration: bar.duration, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }} />
                      ))}
                    </div>
                    <span className="text-[8px] font-mono text-blue-400/40 tracking-widest">ACTIVE</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2BProductTabs;