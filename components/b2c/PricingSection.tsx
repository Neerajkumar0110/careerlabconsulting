'use client';

import React, { useState, useEffect } from 'react';
import { 
  Check, Zap, Crown, Terminal, ShieldCheck, Sparkles, 
  Loader2, CreditCard, X, TrendingUp, Calendar, User, Mail, Phone, MessageSquare, ChevronRight, Clock, ArrowLeft, Globe 
} from 'lucide-react';
import Script from 'next/script';

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface Tier {
  id: string;
  name: string;
  duration: string;
  priceDisplay: string; 
  rawAmountINR: number; 
  rawAmountUSD: number; 
  emiAmount: number; 
  emiText: string;
  description: string;
  targetCTC: string;
  features: string[];
  highlight: boolean;
  icon: any; 
}

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const partners = [
  { name: "HDFC", logo: "https://cdn.worldvectorlogo.com/logos/hdfc-bank-logo.svg" },
  { name: "ICICI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/3840px-ICICI_Bank_Logo.svg.png" },
  { name: "Bajaj Finance", logo: "https://brandlogos.net/wp-content/uploads/2021/10/Bajaj-Finance-logo-.png" },
  { name: "Propel", logo: "https://niuonline.edu.in/wp-content/uploads/2025/08/Propelld-Blue-Logo-3-2-1024x177.webp" },
  { name: "ShopSe", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBNp2z8bJCidU0Z4TCfjF4JARJkY4Gh1_5Qw&s" }
];

export default function PricingSection() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'register' | 'demo' | null>(null);
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  
  const [countryCode, setCountryCode] = useState<string>('IN'); 
  const [currencySymbol, setCurrencySymbol] = useState<string>('₹');
  const [isInternational, setIsInternational] = useState<boolean>(false);

  const [registerStep, setRegisterStep] = useState<'selection' | 'form'>('selection');
  const [paymentType, setPaymentType] = useState<'full' | 'seat'>('seat'); 
  
  const [demoStep, setDemoStep] = useState<'calendar' | 'form'>('calendar');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const ownerPhone = "918700236923";

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data && data.country_code) {
          setCountryCode(data.country_code);
          if (data.country_code !== 'IN') {
            setCurrencySymbol('$');
            setIsInternational(true);
          }
        }
      } catch (error) {
        console.error("Failed to detect location, defaulting to INR", error);
      }
    };
    checkLocation();
  }, []);

  const tiers: Tier[] = [
    {
      id: "plan-foundation",
      name: "Foundation",
      duration: "6 Months",
      priceDisplay: isInternational ? "$1,999" : "₹1,49,999", 
      rawAmountINR: 14999900, 
      rawAmountUSD: 199900, 
      emiAmount: 520800, 
      emiText: isInternational ? "Flexible installments available" : "EMI starts from: 5208 INR",
      description: "Build your first AI career asset with ResumeNFT visibility.",
      targetCTC: isInternational ? "Avg Salary: $40k-$60k" : "Avg CTC: ₹10-12 LPA",
      features: [
        "Real Startup Agentic AI Projects",
        "ResumeNFT + GitHub Portfolio",
        "Python & Prompt Engineering Basics",
        "1 Verified Internship Certificate",
        "GPT & LangChain Starter Projects",
        "HireX Job Network Access"
      ],
      highlight: false,
      icon: Terminal
    },
    {
      id: "plan-elite",
      name: "Elite",
      duration: "12 Months",
      priceDisplay: isInternational ? "$3,499" : "₹2,49,999", 
      rawAmountINR: 24999900,
      rawAmountUSD: 349900,
      emiAmount: 520800, 
      emiText: isInternational ? "Flexible installments available" : "EMI starts from: 5208 INR",
      description: "Top-tier program for international roles with legal job.",
      targetCTC: isInternational ? "Avg Salary: $80k-$120k" : "Avg CTC: ₹30-50 LPA",
      features: [
        "100% Legal Job (Signed Contract)",
        "Weekly 1-on-1 Expert Mentoring",
        "3+ Global Showcase Projects",
        "3 Premium Bonus Internships",
        "Advanced Agentic AI Workflows",
        "Germany/Remote Role Specialization"
      ],
      highlight: true,
      icon: Crown
    }
  ];

  const resetModals = () => {
    setActiveModal(null);
    setSelectedTier(null);
    setRegisterStep('selection');
    setDemoStep('calendar');
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentSuccess = async (response: RazorpayResponse, tier: Tier, type: 'Full Payment' | 'Seat Registration') => {
    const seatPrice = isInternational ? "$150" : "₹10,000";
    const amountPaid = type === 'Seat Registration' ? seatPrice : tier.priceDisplay;
    
    let waMessage = `*New Enrollment Confirmation* %0A%0A`;
    waMessage += `*Plan:* ${tier.name}%0A`;
    waMessage += `*Type:* ${type}%0A`;
    waMessage += `*Amount Paid:* ${amountPaid} (${isInternational ? 'USD/Intl' : 'INR'})%0A`;
    waMessage += `*Payment ID:* ${response.razorpay_payment_id}%0A`;
    waMessage += `*Student Name:* ${formData.name}%0A`;
    waMessage += `*Email:* ${formData.email}%0A`;
    waMessage += `*Phone:* ${formData.phone}%0A`;
    waMessage += `*Country:* ${countryCode}%0A`;

    const whatsappUrl = `https://wa.me/${ownerPhone}?text=${waMessage}`;

    try {
       await fetch('/api/send-confirmation', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ 
           planName: tier.name, 
           amount: amountPaid, 
           paymentId: response.razorpay_payment_id, 
           type,
           user: formData 
         }),
       });
      
      window.open(whatsappUrl, '_blank');
      resetModals();
    } catch (err) { 
      console.error("Error logging payment:", err); 
      window.open(whatsappUrl, '_blank');
      resetModals();
    }
  };

  const initRazorpay = (amount: number, currency: string, description: string, type: 'Full Payment' | 'Seat Registration') => {
    if (!selectedTier) return;

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
      amount: amount, 
      currency: currency, 
      name: "InternX AI",
      description: description,
      handler: (res: RazorpayResponse) => handlePaymentSuccess(res, selectedTier, type),
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      theme: { color: type === 'Full Payment' ? "#3b82f6" : "#10b981" },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert("Razorpay SDK not loaded. Please check your internet connection.");
    }
  };

  const handlePaymentFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier) return;
    
    const currency = isInternational ? "USD" : "INR";
    
    let amountToCharge = 0;

    if (paymentType === 'full') {
       amountToCharge = isInternational ? selectedTier.rawAmountUSD : selectedTier.rawAmountINR;
    } else {
       amountToCharge = isInternational ? 15000 : 1000000;
    }

    initRazorpay(
      amountToCharge, 
      currency, 
      `${paymentType} - ${selectedTier.name}`, 
      paymentType === 'full' ? 'Full Payment' : 'Seat Registration'
    );
  };

  const handleBookDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingId('booking-demo');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      alert("Demo request sent successfully! We will contact you shortly.");
      resetModals();
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  const getNextDays = () => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i + 1); 
      dates.push(d);
    }
    return dates;
  };

  return (
    <section className="py-20 md:py-32 bg-[#020617] text-white font-sans relative">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Enrollment Portal</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Choose Your <span className="italic text-slate-500 font-serif lowercase">Evolution</span>
          </h2>
          <div className="mt-4 flex justify-center">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <Globe className="w-3 h-3" />
                {isInternational ? `International Pricing (${countryCode})` : `India Pricing (${countryCode})`}
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-32">
          {tiers.map((tier) => (
            <article key={tier.id} className={`relative p-8 md:p-12 rounded-[3rem] border flex flex-col transition-all duration-500 ${tier.highlight ? 'bg-[#0a1229] border-blue-500 shadow-2xl shadow-blue-500/20 md:scale-105 z-20' : 'bg-white/[0.02] border-white/10'}`}>
              <div className="mb-8">
                <tier.icon className={`w-14 h-14 mb-8 ${tier.highlight ? 'text-blue-400' : 'text-slate-500'}`} />
                <h3 className="text-4xl font-black uppercase mb-2">{tier.name}</h3>
                <p className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-6">{tier.duration} Program</p>
                
                <div className="flex flex-col gap-1">
                  <span className="text-6xl font-black tracking-tighter">{tier.priceDisplay}</span>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mt-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 text-sm font-bold uppercase">{tier.targetCTC}</span>
                  </div>
                  
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mt-2">
                    <span className="text-green-400 text-sm font-bold flex items-center gap-2 italic mb-3">
                      <Zap className="w-4 h-4 fill-green-400" /> {tier.emiText}
                    </span>
                    {!isInternational && (
                        <div className="border-t border-green-500/10 pt-4">
                            <div className="grid grid-cols-5 gap-3 items-center opacity-80 hover:opacity-100 transition-all duration-500">
                            {partners.map((p) => (
                                <img 
                                key={p.name} 
                                src={p.logo} 
                                alt={`${p.name} Financing Partner`} 
                                title={p.name} 
                                className="h-5 w-auto object-contain mx-auto bg-white p-1 rounded-sm" 
                                loading="lazy"
                                />
                            ))}
                            </div>
                            <p className="text-[7px] uppercase font-black tracking-[0.2em] text-center text-slate-600 mt-4 italic">No-Cost EMI Approved Partners</p>
                        </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-12 flex-1 border-t border-white/5 pt-8">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm font-medium leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                <button 
                  onClick={() => {
                    setSelectedTier(tier);
                    setActiveModal('register');
                    setRegisterStep('selection'); 
                  }} 
                  className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 cursor-pointer relative z-30"
                >
                  <CreditCard className="w-4 h-4" /> Register Now
                </button>
                
                <button 
                  onClick={() => {
                    setSelectedTier(tier);
                    setActiveModal('demo');
                  }} 
                  className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all bg-white/5 hover:bg-white/10 border border-white/20 text-white group cursor-pointer relative z-30"
                >
                  <Calendar className="w-4 h-4 text-green-400 group-hover:scale-125 transition-transform" /> Book Your Demo
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 border-t border-white/10 pt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">InternX Learning <span className="text-slate-500 italic font-serif">vs</span> Traditional Learning</h3>
            <p className="text-slate-400 text-sm italic font-medium tracking-wide uppercase">Closing the AI skills-to-hiring gap.</p>
          </div>
          <div className="overflow-x-auto rounded-[2.5rem] border border-white/10 bg-white/[0.01] backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-6 text-[10px] uppercase font-black text-slate-500">Feature Comparison</th>
                  <th className="p-6 text-[10px] uppercase font-black text-blue-400 tracking-widest underline decoration-2 underline-offset-8 text-center">InternX-AI Ecosystem</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-500 text-center">Traditional Bootcamps</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-slate-300">Proof of Work</td>
                  <td className="p-6 text-blue-400 italic text-center">ResumeNFT™ (Blockchain Verified)</td>
                  <td className="p-6 text-slate-500 text-center">Generic PDF Certificates</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-slate-300">Project Type</td>
                  <td className="p-6 text-blue-400 text-center">Agentic AI & Multi-Agent Workflows</td>
                  <td className="p-6 text-slate-600 text-center">Legacy Full-Stack / CRUD Apps</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-slate-300">Experience Source</td>
                  <td className="p-6 text-blue-400 text-center">Live Startup Micro-Internships</td>
                  <td className="p-6 text-slate-600 text-center">Dummy Capstone Projects</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-slate-300">Outcome Guarantee</td>
                  <td className="p-6 text-blue-400 text-center font-bold">Legal Job Guarantee (Elite Plan)</td>
                  <td className="p-6 text-slate-600 text-center">"Placement Assistance"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 italic">InternX-AI Secure SSL | PCI-DSS Compliant Gateway</span>
            </div>
            <p className="text-slate-600 text-[9px] uppercase tracking-widest max-w-lg text-center leading-loose">
              © 2026 Career Lab Consulting Pvt. Ltd.
            </p>
        </div>
      </div>

      {activeModal && selectedTier && (
        <div className="fixed inset-0 z-[9999] flex items-end justify-center px-4 pb-[3200px] bg-black/80 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-10 duration-200">
          
          {activeModal === 'register' && (
            <div className="bg-[#0f172a] border border-blue-500/20 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2 text-white">
                    <Crown className="w-5 h-5 text-blue-400" /> 
                    {registerStep === 'selection' ? `Join ${selectedTier.name}` : (paymentType === 'full' ? 'Complete Enrollment' : 'Seat Reservation')}
                </h3>
                <button onClick={resetModals} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                    <X className="w-5 h-5 text-slate-400" />
                </button>
                </div>

                <div className="p-8">
                {registerStep === 'selection' ? (
                    <div className="space-y-4">
                    <p className="text-slate-400 text-sm mb-6">Select how you would like to proceed with your enrollment.</p>
                    
                    <button 
                        onClick={() => {
                            setPaymentType('full');
                            setRegisterStep('form');
                        }}
                        className="w-full p-6 rounded-2xl bg-blue-600 hover:bg-blue-500 border border-blue-400/20 flex items-center justify-between group transition-all cursor-pointer"
                    >
                        <div className="text-left">
                        <div className="text-sm font-bold uppercase tracking-widest text-blue-100 mb-1">Full Payment</div>
                        <div className="text-2xl font-black text-white">{selectedTier.priceDisplay}</div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button 
                        onClick={() => {
                            setPaymentType('seat');
                            setRegisterStep('form');
                        }}
                        className="w-full p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-between group transition-all cursor-pointer"
                    >
                        <div className="text-left">
                        <div className="text-sm font-bold uppercase tracking-widest text-slate-300 mb-1">Seat Registration</div>
                        <div className="text-2xl font-black text-green-400">
                           {isInternational ? "$150" : "₹10,000"}
                        </div>
                        </div>
                        <ChevronRight className="w-6 h-6 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[10px] text-slate-500 text-center mt-4">Full payment secures instant access. Seat registration reserves your spot.</p>
                    </div>
                ) : (
                    <form onSubmit={handlePaymentFormSubmit} className="space-y-4">
                        <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                            <input 
                            type="text" name="name" required placeholder="Full Name" 
                            value={formData.name} onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                            <input 
                            type="email" name="email" required placeholder="Email Address" 
                            value={formData.email} onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div className="relative">
                            <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                            <input 
                            type="tel" name="phone" required placeholder="WhatsApp Number" 
                            value={formData.phone} onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        <div className="relative">
                            <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                            <input 
                            type="text" name="message" placeholder="Short Message (Optional)" 
                            value={formData.message} onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                        </div>

                        <button 
                            type="submit" 
                            className={`w-full mt-6 py-4 text-white font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-lg ${paymentType === 'full' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20' : 'bg-green-600 hover:bg-green-500 shadow-green-900/20'}`}
                        >
                            {paymentType === 'full' 
                               ? `Pay ${selectedTier.priceDisplay} Securely` 
                               : `Pay ${isInternational ? "$150" : "₹10,000"} to Reserve`
                            }
                        </button>
                        <button type="button" onClick={() => setRegisterStep('selection')} className="w-full py-2 text-xs text-slate-500 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1">
                           <ArrowLeft className="w-3 h-3" /> Back to Options
                        </button>
                    </form>
                )}
                </div>
            </div>
          )}

          {activeModal === 'demo' && (
            <div className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2 text-white">
                    <Calendar className="w-5 h-5 text-green-400" /> Book Free Demo
                </h3>
                <button onClick={resetModals} className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                    <X className="w-5 h-5 text-slate-400" />
                </button>
                </div>
                
                <div className="p-8">
                {demoStep === 'calendar' ? (
                    <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-bold uppercase text-slate-400 mb-3">1. Select Date</h4>
                        <div className="grid grid-cols-5 gap-2">
                        {getNextDays().map((date, idx) => {
                            const dateStr = date.toDateString();
                            const isSelected = selectedDate === dateStr;
                            return (
                            <button 
                                key={idx}
                                onClick={() => setSelectedDate(dateStr)}
                                className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${isSelected ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                            >
                                <div className="text-[10px] uppercase font-bold">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                                <div className="text-lg font-black">{date.getDate()}</div>
                            </button>
                            )
                        })}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase text-slate-400 mb-3">2. Select Time</h4>
                        <div className="grid grid-cols-3 gap-2">
                        {['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM'].map((time) => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                disabled={!selectedDate}
                                className={`py-2 rounded-lg border text-xs font-bold transition-all ${selectedTime === time ? 'bg-green-600 border-green-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed'}`}
                            >
                                {time}
                            </button>
                        ))}
                        </div>
                    </div>

                    <button 
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => setDemoStep('form')}
                        className="w-full py-4 mt-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                    >
                        Continue
                    </button>
                    </div>
                ) : (
                    <form onSubmit={handleBookDemoSubmit} className="space-y-4">
                    <div className="bg-blue-900/20 border border-blue-500/20 p-3 rounded-lg flex items-center gap-3 mb-6">
                        <Clock className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-blue-200">
                        {selectedDate} @ {selectedTime}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                        <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" name="name" required placeholder="Full Name" 
                            value={formData.name} onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        </div>
                        <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                            type="email" name="email" required placeholder="Email Address" 
                            value={formData.email} onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        </div>
                        <div className="relative">
                        <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                            type="tel" name="phone" required placeholder="WhatsApp Number" 
                            value={formData.phone} onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        </div>
                        <div className="relative">
                        <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" name="message" placeholder="Topics you want to discuss..." 
                            value={formData.message} onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loadingId === 'booking-demo'}
                        className="w-full mt-6 py-4 bg-white text-slate-900 hover:bg-slate-200 font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg flex justify-center items-center gap-2 cursor-pointer"
                    >
                        {loadingId === 'booking-demo' ? <Loader2 className="animate-spin w-4 h-4" /> : 'Confirm Booking'}
                    </button>
                    <button type="button" onClick={() => setDemoStep('calendar')} className="w-full py-2 text-xs text-slate-500 hover:text-white transition-colors cursor-pointer">
                        Back to Calendar
                    </button>
                    </form>
                )}
                </div>
            </div>
          )}

        </div>
      )}

    </section>
  );
}