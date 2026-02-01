'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Check, Zap, Crown, Building2, 
  Calendar, Loader2, ShieldCheck, Rocket, ArrowRight, 
  Phone, Mail, MessageCircle, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';
import ScheduleMeetingModal from './ScheduleMeetingModal'; 

const CONTACT_INFO = {
  whatsapp: "918700236923",
  email: "info@careerlabconsulting.com"
};

type PricingCategory = 'Single Product' | 'Combo' | 'All-in-One';

interface PricingTier {
  name: string;
  price: string;
  rawPrice?: number;
  features: string[];
  icon: any;
  isEnterprise?: boolean;
  description: string;
}

interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

const CATEGORIES: Record<PricingCategory, PricingTier[]> = {
  'Single Product': [
    { name: 'Starter', price: '₹25,000', rawPrice: 2500000, icon: Rocket, description: 'Perfect for small teams starting their journey.', features: ['1 Core Module', 'Email Support', 'Basic Analytics', 'Single User Access'] },
    { name: 'Growth', price: '₹50,000', rawPrice: 5000000, icon: Zap, description: 'Scaling tools for growing businesses.', features: ['3 Core Modules', 'Priority Support', 'Advanced Analytics', '5 User Access'] },
    { name: 'Advanced', price: '₹1,00,000', rawPrice: 10000000, icon: Crown, description: 'The power of full modular control.', features: ['All Core Modules', '24/7 Support', 'Custom Reporting', 'Unlimited Users'] },
    { name: 'Enterprise', price: 'Custom', isEnterprise: true, icon: Building2, description: 'Custom infrastructure for big players.', features: ['Dedicated Infra', 'SLA Guarantee', 'Custom Workflows', 'On-Premise Option'] },
  ],
  'Combo': [
    { name: 'Starter', price: '₹50,000', rawPrice: 5000000, icon: Rocket, description: 'Bundled essentials for startups.', features: ['2 Product Suite', 'Shared Data Lake', 'Basic Automations', 'Standard Security'] },
    { name: 'Growth', price: '₹1,00,000', rawPrice: 10000000, icon: Zap, description: 'Full synergy across your business.', features: ['4 Product Suite', 'Unified Dashboard', 'Advance Automations', 'Audit Logs'] },
    { name: 'Advanced', price: '₹2,00,000', rawPrice: 20000000, icon: Crown, description: 'Intelligence-driven enterprise suite.', features: ['Complete Product Suite', 'AI Insights', 'Custom Integrations', 'White-labeling'] },
    { name: 'Enterprise', price: 'Custom', isEnterprise: true, icon: Building2, description: 'Maximum scale, zero compromise.', features: ['Unlimited Users', 'Data Sovereignty', 'Custom Development', 'VIP Support'] },
  ],
  'All-in-One': [
    { name: 'Starter', price: '₹10,00,000', rawPrice: 100000000, icon: Rocket, description: 'Total ecosystem access for regions.', features: ['Full Ecosystem Access', 'Enterprise Security', 'Regional Hosting', 'Training Portal'] },
    { name: 'Growth', price: '₹15,00,000', rawPrice: 150000000, icon: Zap, description: 'The ultimate scaling powerhouse.', features: ['Scaling Infrastructure', 'Global CDN', 'AI Operations Pack', '24/7 Dedicated Ops'] },
    { name: 'Advanced', price: '₹25,00,000', rawPrice: 250000000, icon: Crown, description: 'The pinnacle of B2B SaaS tech.', features: ['Unlimited Scaling', 'Custom LLM Training', 'Full Source Audit', 'Infinite API calls'] },
    { name: 'Enterprise', price: 'Custom', isEnterprise: true, icon: Building2, description: 'Bespoke government-grade tech.', features: ['Gov-Grade Security', 'On-Premise Option', 'Bespoke AI Solutions', 'Lifetime Updates'] },
  ]
};

export default function B2BPricingSection() {
  const [activeTab, setActiveTab] = useState<PricingCategory>('Single Product');
  
  // Modals State
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  
  // Selection State
  const [selectedPlanForBooking, setSelectedPlanForBooking] = useState<{category: string, tier: string} | null>(null);
  const [pendingPaymentTier, setPendingPaymentTier] = useState<PricingTier | null>(null);
  
  // Form & Loading State
  const [loading, setLoading] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({ name: '', email: '', phone: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- Handlers ---

  const openBooking = (tierName: string) => {
    setSelectedPlanForBooking({ category: activeTab, tier: tierName });
    setIsMeetingModalOpen(true);
  };

  const openWhatsApp = () => {
    const message = `Hi, I am interested in the Enterprise Plan (${activeTab}). Can we talk?`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const initiateCheckout = (tier: PricingTier) => {
    setPendingPaymentTier(tier);
    setIsLeadFormOpen(true);
  };

  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pendingPaymentTier || !pendingPaymentTier.rawPrice) return;
    
    if (!(window as any).Razorpay) {
      alert("Payment gateway is loading. Please try again in 3 seconds.");
      return;
    }

    setLoading(true);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
      amount: pendingPaymentTier.rawPrice,
      currency: "INR",
      name: "CareerLab B2B",
      description: `${pendingPaymentTier.name} Plan`,
      image: "",
      
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.phone
      },
      
      handler: async (response: any) => {
        setIsLeadFormOpen(false);
        setPendingPaymentTier(null);

        try {
          await fetch('/api/payment-success', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paymentId: response.razorpay_payment_id,
              userDetails: userDetails,
              planDetails: {
                name: pendingPaymentTier.name,
                category: activeTab,
                price: pendingPaymentTier.price
              }
            })
          });

          window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=Payment_Success_Plan_${pendingPaymentTier.name}_ID_${response.razorpay_payment_id}`, '_blank');
          
        } catch (error) {
          console.error("Email sending failed", error);
        } finally {
          setLoading(false);
          alert("Payment Successful! Confirmation email sent.");
        }
      },
      
      modal: {
        ondismiss: () => {
          setLoading(false);
        }
      },
      theme: { color: "#2563eb" },
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        alert(`Payment Failed: ${response.error.description}`);
        setLoading(false);
      });
      rzp.open();
    } catch (error) {
      console.error("Payment initialization failed", error);
      setLoading(false);
    }
  };

  return (
    <section className="relative py-24 bg-[#020617] text-white overflow-hidden" id="pricing">
      {/* Background - Static Divs ab use honge */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          {/* Static Title (No motion) */}
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
              Flexible <span className="text-blue-500">Pricing</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-10">
              Scale your business infrastructure with our modular SaaS solutions. No hidden fees.
            </p>
          </div>
          
          <div className="inline-flex p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl mb-12">
            {(Object.keys(CATEGORIES) as PricingCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                  activeTab === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MAJOR FIX: Changed motion.div to standard div. 
          Removed AnimatePresence from Grid.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES[activeTab].map((tier, idx) => (
              <div 
                key={`${activeTab}-${tier.name}`}
                className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col hover:-translate-y-2 ${
                  tier.name === 'Growth' 
                    ? 'bg-blue-600/5 border-blue-500/50 scale-100 lg:scale-105 shadow-[0_20px_50px_rgba(37,99,235,0.15)] z-20' 
                    : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:shadow-xl'
                }`}
              >
                {tier.name === 'Growth' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-xl">
                    Recommended
                  </div>
                )}

                <div className="mb-6 flex justify-between items-start">
                  <div className={`p-3 rounded-2xl ${tier.name === 'Growth' ? 'bg-blue-500 text-white' : 'bg-white/5 text-blue-400'}`}>
                    <tier.icon size={28} />
                  </div>
                </div>

                <h3 className="text-2xl font-black uppercase mb-1">{tier.name}</h3>
                <p className="text-slate-500 text-xs mb-6 line-clamp-2 h-8">{tier.description}</p>
                
                <div className="mb-8">
                  <div className="text-4xl font-bold text-white tracking-tight">{tier.price}</div>
                  {!tier.isEnterprise && <div className="text-slate-500 text-xs mt-1 uppercase tracking-widest">Single License</div>}
                </div>
                
                <div className="space-y-4 mb-10 flex-1">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-start gap-3 text-sm text-slate-300">
                      <div className="mt-1 bg-blue-500/20 p-0.5 rounded-full">
                        <Check className="w-3 h-3 text-blue-500" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>

                {tier.isEnterprise ? (
                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={openWhatsApp}
                            className="w-full py-3 rounded-2xl font-black uppercase tracking-wider text-[11px] bg-white text-black hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                        >
                            <MessageCircle className="w-4 h-4" /> Contact Sales
                        </button>
                        
                        <button 
                            onClick={() => openBooking(tier.name)}
                            className="w-full py-3 rounded-2xl font-black uppercase tracking-wider text-[11px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-slate-300"
                        >
                            <Calendar className="w-4 h-4" /> Book Calendar
                        </button>
                    </div>
                ) : (
                    <button 
                      onClick={() => initiateCheckout(tier)}
                      className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-[11px] transition-all flex items-center justify-center gap-3 active:scale-[0.95] ${
                        tier.name === 'Growth' 
                          ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                          : 'bg-white text-black hover:bg-slate-200'
                      }`}
                    >
                        <ShieldCheck className="w-4 h-4" /> Get Started <ArrowRight className="w-3 h-3" />
                    </button>
                )}
              </div>
            ))}
        </div>

        <div className="mt-20 p-8 rounded-[3rem] bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Phone className="text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Prefer to talk directly?</h4>
              <p className="text-slate-400 text-sm">Call us at <span className="text-white font-semibold">+91 870023 6923</span> or book a consultation.</p>
            </div>
          </div>
          <button 
            onClick={() => openBooking('Custom Architecture')}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all text-sm flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Book Consultation
          </button>
        </div>
      </div>

      <ScheduleMeetingModal 
        isOpen={isMeetingModalOpen} 
        onClose={() => setIsMeetingModalOpen(false)} 
        planInfo={selectedPlanForBooking}
      />

      {/* CHECKOUT MODAL */}
      {mounted && createPortal(
      <AnimatePresence>
        {isLeadFormOpen && pendingPaymentTier && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsLeadFormOpen(false)}
            />
            
            {/* Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0f172a] border border-white/10 w-full max-w-md p-8 rounded-3xl relative overflow-hidden shadow-2xl z-10"
            >
              <button 
                onClick={() => setIsLeadFormOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors z-50"
              >
                <X size={20} className="text-slate-400" />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Checkout Details</h3>
                <p className="text-slate-400 text-sm">
                  Complete your details to purchase the <span className="text-blue-400 font-semibold">{pendingPaymentTier.name}</span> plan.
                </p>
              </div>

              <form onSubmit={handleLeadFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={userDetails.name}
                    onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                    placeholder="john@company.com"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5 ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={userDetails.phone}
                    onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                    placeholder="+91 98765 43210"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-600"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin w-5 h-5" />
                    ) : (
                      <>
                        Pay {pendingPaymentTier.price} <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] text-slate-500 mt-3">
                    Secure payment powered by Razorpay.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>, document.body)}
    </section>
  );
}