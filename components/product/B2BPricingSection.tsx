'use client';

import React, { useState } from 'react';
import {
  Check,
  Zap,
  Crown,
  Building2,
  Rocket,
  MonitorPlay,
  MessageCircle,
  RocketIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ScheduleMeetingModal from './ScheduleMeetingModal';

type BillingType = 'Monthly' | 'Annually';
type PricingCategory = 'Single Product' | 'Combo (Any 5)' | 'All-in-One';
type Currency = 'INR' | 'USD';

interface PricingTier {
  name: string;
  monthlyPrice?: number;
  annualPrice?: number;
  priceLabel?: string;
  description: string;
  features: string[];
  icon: any;
  isEnterprise?: boolean;
}

const PRICING: Record<PricingCategory, PricingTier[]> = {
  'Single Product': [
    {
      name: 'Starter',
      monthlyPrice: 10000,
      annualPrice: 100000,
      description: 'Perfect for small teams starting their AI journey.',
      icon: Rocket,
      features: [
        '1 Core Module',
        'Plug & Play Deployment',
        'Email Support',
        'Basic Analytics',
        'Single User Access'
      ]
    },
    {
      name: 'Growth',
      monthlyPrice: 25000,
      annualPrice: 200000,
      description: 'Scaling tools for growing businesses.',
      icon: Zap,
      features: [
        'Full Module Access',
        'Priority Support',
        'Advanced Analytics',
        '5 User Access',
        'Autonomous AI Execution'
      ]
    },
    {
      name: 'Pro',
      monthlyPrice: 50000,
      annualPrice: 500000,
      description: 'Leverage the power of full modular control.',
      icon: Crown,
      features: [
        'All Features Included',
        '24/7 Dedicated Support',
        'Custom Reporting',
        'Unlimited Users',
        'AI Optimization Engine'
      ]
    },
    {
      name: 'Enterprise',
      priceLabel: 'Custom',
      description: 'Custom infrastructure for large enterprises.',
      icon: Building2,
      features: [
        'Dedicated Infrastructure',
        'SLA Guarantee',
        'Custom Workflows',
        'On-Premise Deployment',
        'Enterprise AI Training'
      ],
      isEnterprise: true
    }
  ],

  'Combo (Any 5)': [
    {
      name: 'Starter',
      monthlyPrice: 100000,
      annualPrice: 1000000,
      description: 'Combine any 5 AI products.',
      icon: Rocket,
      features: [
        'Any 5 Products',
        'Unified Dashboard',
        'Cross-Product Automation',
        'Shared Data Layer'
      ]
    },
    {
      name: 'Growth',
      monthlyPrice: 250000,
      annualPrice: 2500000,
      description: 'High-perform integrated AI stack.',
      icon: Zap,
      features: [
        'Any 5 Products',
        'Advanced Automation',
        'AI Insights Layer',
        'Priority Support'
      ]
    },
    {
      name: 'Pro',
      monthlyPrice: 500000,
      annualPrice: 5000000,
      description: 'Deep enterprise synergy.',
      icon: Crown,
      features: [
        'Any 5 Products',
        'Custom Integrations',
        'Dedicated AI Ops',
        'Advanced Security'
      ]
    },
    {
      name: 'Enterprise',
      priceLabel: 'Custom',
      description: 'Maximum scale, zero compromise.',
      icon: Building2,
      features: [
        'Unlimited Users',
        'Custom Development',
        'Data Sovereignty',
        'VIP Support'
      ],
      isEnterprise: true
    }
  ],

  'All-in-One': [
    {
      name: 'Starter',
      monthlyPrice: 100000,
      annualPrice: 1000000,
      description: 'Use complete 9-product ecosystem.',
      icon: Rocket,
      features: [
        'All 9 AI Products',
        'Enterprise Security',
        'Centralized AI Brain',
        'Unified Intelligence Layer'
      ]
    },
    {
      name: 'Growth',
      monthlyPrice: 250000,
      annualPrice: 2500000,
      description: 'Access full AI enterprise automation.',
      icon: Zap,
      features: [
        'All 9 AI Products',
        'Advanced Predictive Models',
        'Dedicated Support',
        'Scalable Infra'
      ]
    },
    {
      name: 'Pro',
      monthlyPrice: 500000,
      annualPrice: 5000000,
      description: 'Autonomous enterprise dominance.',
      icon: Crown,
      features: [
        'All 9 AI Products',
        'Custom AI Model Training',
        'Unlimited API Access',
        'White-label Option'
      ]
    },
    {
      name: 'Enterprise',
      priceLabel: 'Custom',
      description: 'Government-grade AI infrastructure.',
      icon: Building2,
      features: [
        'On-Premise Option',
        'Gov-Grade Security',
        'Bespoke AI Solutions',
        'Lifetime Updates'
      ],
      isEnterprise: true
    }
  ]
};

const CONVERSION_RATE = 0.012;

export default function B2BPricingSection() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<PricingCategory>('Single Product');
  const [billing, setBilling] = useState<BillingType>('Monthly');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ category: string; tier: string } | null>(null);

  const categories: PricingCategory[] = ['Single Product', 'Combo (Any 5)', 'All-in-One'];

  const formatPrice = (price?: number) => {
    if (!price) return '';
    if (currency === 'USD') {
      const usdPrice = price * CONVERSION_RATE;
      return `$${usdPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <section className="min-h-screen bg-[#020617] text-white py-12 lg:py-20 pt-6 lg:pt-5 flex flex-col items-center justify-center selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        
        {/* Header */}
        <div className="text-center mb-6 lg:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
          >
            Flexible <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Pricing</span>
          </motion.h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-lg">
            Scale your business infrastructure with modular AI solutions.
          </p>
        </div>

        {/* Unified Control Hub - Reduced Clutter */}
        <div className="flex flex-col items-center gap-6 mb-14">
          {/* Main Category Tabs */}
          <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-4 py-2 text-xs md:text-sm font-semibold rounded-xl transition-all duration-200 ${
                  activeCategory === cat ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div layoutId="cat-bg" className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-lg shadow-blue-600/20" />
                )}
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Toggles (Billing & Currency) */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* Billing */}
            <div className="flex items-center gap-3 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/5">
              <span className={`text-[10px] uppercase tracking-wider font-bold ${billing === 'Monthly' ? 'text-blue-400' : 'text-slate-500'}`}>Monthly</span>
              <button 
                onClick={() => setBilling(billing === 'Monthly' ? 'Annually' : 'Monthly')}
                className="w-10 h-5 bg-slate-700 rounded-full relative p-1 transition-colors"
              >
                <motion.div 
                  animate={{ x: billing === 'Monthly' ? 0 : 20 }}
                  className="w-3 h-3 bg-white rounded-full shadow-sm"
                />
              </button>
              <span className={`text-[10px] uppercase tracking-wider font-bold ${billing === 'Annually' ? 'text-blue-400' : 'text-slate-500'}`}>Annually</span>
            </div>

            {/* Currency */}
            <div className="flex bg-white/[0.03] p-1 rounded-full border border-white/5">
              {['INR', 'USD'].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr as Currency)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-full transition-colors ${
                    currency === curr ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {PRICING[activeCategory].map((tier, idx) => {
              const isRecommended = tier.name === 'Growth';
              const Icon = tier.icon;

              return (
                <motion.div
                  key={tier.name + activeCategory}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col ${
                    isRecommended 
                      ? 'bg-blue-600/10 border-blue-500/50 shadow-2xl shadow-blue-500/10 scale-105 z-10 hover:scale-106' 
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04] hover:scale-102'
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-400 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-8">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                      isRecommended ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-white/5 text-blue-400'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed min-h-[32px]">{tier.description}</p>
                  </div>
                  
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black tracking-tight">
                        {tier.isEnterprise ? "Custom" : formatPrice(billing === 'Monthly' ? tier.monthlyPrice : tier.annualPrice)}
                      </span>
                      {!tier.isEnterprise && (
                        <span className="text-slate-500 text-sm">
                          /{billing === 'Monthly' ? 'mo' : 'yr'}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                        <div className="mt-1 bg-blue-500/20 rounded-full p-0.5">
                          <Check className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3 mt-auto">
                    <button 
                      onClick={() => !tier.isEnterprise && router.push('/checkout')}
                      className={`w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                        isRecommended 
                          ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20' 
                          : 'bg-white text-black hover:bg-slate-200'
                      }`}
                    >
                      {tier.isEnterprise ? <MessageCircle size={16}/> : <RocketIcon size={16}/>}
                      {tier.isEnterprise ? 'Contact Sales' : 'Get Started'}
                    </button>
                    {tier.name !== 'Enterprise' ? (
                      <button 
                        onClick={() => {
                          setSelectedPlan({ category: activeCategory, tier: tier.name });
                          setIsMeetingModalOpen(true);
                        }}
                        className="w-full py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-slate-300 transition-all flex items-center justify-center gap-2"
                      >
                        <MonitorPlay size={14} /> Start 14 Days Trial
                      </button>
                    ) : (<div className='h-5'/>)}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center border-t border-white/5 pt-8">
          <p className="text-slate-500 text-sm flex items-center justify-center gap-2 flex-wrap">
            Need a tailor-made enterprise solution? 
            <span className="text-blue-400 font-bold hover:underline cursor-pointer transition-all">+91 870023 6923</span>
          </p>
        </div>
      </div>

      <ScheduleMeetingModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        planInfo={selectedPlan}
      />
    </section>
  );
}