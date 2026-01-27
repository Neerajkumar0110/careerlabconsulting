'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Layers, Box, Cpu, CheckCircle2, ArrowRight, Zap, TrendingUp, Search, Globe, Users, ShieldCheck, GraduationCap 
} from 'lucide-react';

const productData = {
  single: [
    { title: "Sales Suite", desc: "AI lead conversion", icon: <TrendingUp className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800" },
    { title: "Marketing Suite", desc: "Omnichannel automation", icon: <Zap className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800" },
    { title: "AI Website & Content", desc: "GenAI site builder", icon: <Globe className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800" },
    { title: "Finance & Commerce", desc: "Automated ledger", icon: <Box className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800" },
    { title: "People Suite", desc: "Next-gen HR & Talent", icon: <Users className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800" },
    { title: "Support & Knowledge", desc: "AI Helpdesk & Wiki", icon: <CheckCircle2 className="w-5 h-5" />, img: "https://images.pexels.com/photos/7983549/pexels-photo-7983549.jpeg" },
    { title: "Intelligence Suite", desc: "Advanced analytics", icon: <Search className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1551288049-bbda483387a5?q=80&w=800" },
    { title: "Governance Suite", desc: "AI safety & compliance", icon: <ShieldCheck className="w-5 h-5" />, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800" },
  ],
  combo: [
    { title: "Business Suite", desc: "Sales + Marketing + Content", icon: <Layers className="w-5 h-5 text-blue-400" />, img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800" },
    { title: "Operations Suite", desc: "People + Finance + Inventory", icon: <Box className="w-5 h-5 text-blue-400" />, img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800" },
    { title: "Education Enterprise", desc: "Education + People + Finance", icon: <GraduationCap className="w-5 h-5 text-blue-400" />, img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800" },
  ],
  clcone: [
    { title: "CLC One", desc: "The Complete AI Ecosystem: All suites combined into one powerful SaaS.", icon: <Cpu className="w-6 h-6 text-purple-400" />, img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800" },
  ]
};

const B2BProductTabs = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [hoveredImage, setHoveredImage] = useState(productData.single[0].img);

  const tabs = [
    { id: 'all', label: 'All Products' },
    { id: 'single', label: 'Single Stack' },
    { id: 'combo', label: 'Combo Stack' },
    { id: 'clcone', label: 'CLC One' }
  ];

  const getFilteredProducts = () => {
    if (activeTab === 'all') {
        return [...productData.single.slice(0, 4), ...productData.combo.slice(0, 2), ...productData.clcone];
    }
    return productData[activeTab as keyof typeof productData] || [];
  };

  return (
    <section className="py-24 bg-[#020617] text-white overflow-hidden" id="enterprise-matrix">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Enterprise Growth <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Ecosystem</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            Explore our high-performance infrastructure designed for the modern era. Seamlessly transition between specialized single-stack tools and fully integrated enterprise suites.
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeTab === tab.id 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                  : 'bg-gray-900/40 border-gray-800 text-gray-500 hover:border-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Product Grid */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {getFilteredProducts().map((product, idx) => (
                  <motion.div 
                    key={`${activeTab}-${idx}`}
                    onMouseEnter={() => setHoveredImage(product.img)}
                    className="group relative p-6 rounded-2xl bg-gray-900/30 border border-gray-800/50 hover:bg-blue-600/5 hover:border-blue-500/50 transition-all cursor-pointer overflow-hidden"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                        {product.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">
                            {product.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {product.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Dynamic Visual Display */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="sticky top-32">
              <motion.div 
                className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-gray-800 bg-gray-900 shadow-2xl"
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={hoveredImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={hoveredImage} 
                      alt="Solution Visualization"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent opacity-80" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-10 left-10 right-10 p-6 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Active Preview</span>
                  </div>
                  <h4 className="text-white text-xl font-semibold">Intelligence in Motion</h4>
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
};

export default B2BProductTabs;