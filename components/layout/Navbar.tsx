'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, X, Menu, ChevronDown, Zap, Code, Globe, Shield, 
  Package, Layers, Cpu, CheckCircle2, ChevronRight, ArrowRight,
  HeartPulse, ShoppingCart, Landmark, Factory, 
  Car, Scale, GraduationCap, Monitor, Mic, Sparkles
} from 'lucide-react';

const industriesMenu = [
  {
    id: 'tech',
    title: 'Technology & SaaS',
    layer: 'Digital Innovation Layer',
    icon: Monitor,
    items: [
      { name: "Cloud Infrastructure", href: "/industries/tech-cloud" },
      { name: "SaaS Platforms", href: "/industries/tech-saas" },
      { name: "AI Research & Development", href: "/industries/tech-ai" },
      { name: "Cybersecurity Firms", href: "/industries/tech-security" },
      { name: "DevOps & Automation", href: "/industries/tech-devops" }
    ]
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Pharma',
    layer: 'Life Sciences Layer',
    icon: HeartPulse,
    items: [
      { name: "Telemedicine Systems", href: "/industries/health-tele" },
      { name: "Clinical Data Management", href: "/industries/health-data" },
      { name: "Pharmaceutical AI", href: "/industries/health-pharma" },
      { name: "Medical Device Software", href: "/industries/health-devices" },
      { name: "Health Insurance Tech", href: "/industries/health-insurance" }
    ]
  },
  {
    id: 'finance',
    title: 'Finance & Banking',
    layer: 'FinTech & Wealth Layer',
    icon: Landmark,
    items: [
      { name: "Investment Banking", href: "/industries/fin-banking" },
      { name: "FinTech Innovations", href: "/industries/fin-tech" },
      { name: "Asset & Wealth Management", href: "/industries/fin-wealth" },
      { name: "Risk & Compliance", href: "/industries/fin-risk" },
      { name: "Blockchain Solutions", href: "/industries/fin-blockchain" }
    ]
  },
  {
    id: 'retail',
    title: 'Retail & E-commerce',
    layer: 'Consumer Goods Layer',
    icon: ShoppingCart,
    items: [
      { name: "Direct-to-Consumer (D2C)", href: "/industries/retail-d2c" },
      { name: "Inventory Management", href: "/industries/retail-inventory" },
      { name: "Customer Loyalty AI", href: "/industries/retail-loyalty" },
      { name: "Supply Chain Logistics", href: "/industries/retail-supply" },
      { name: "Marketplace Platforms", href: "/industries/retail-market" }
    ]
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    layer: 'Industrial 4.0 Layer',
    icon: Factory,
    items: [
      { name: "Smart Factory Systems", href: "/industries/man-smart" },
      { name: "Predictive Maintenance", href: "/industries/man-maintenance" },
      { name: "Industrial Automation", href: "/industries/man-auto" },
      { name: "Quality Control Systems", href: "/industries/man-quality" }
    ]
  },
  {
    id: 'automotive',
    title: 'Automotive',
    layer: 'Mobility & Auto Layer',
    icon: Car,
    items: [
      { name: "Autonomous Vehicle AI", href: "/industries/auto-ai" },
      { name: "Connected Car Services", href: "/industries/auto-connected" },
      { name: "Fleet Management", href: "/industries/auto-fleet" },
      { name: "Electric Vehicle Tech", href: "/industries/auto-ev" }
    ]
  },
  {
    id: 'legal',
    title: 'Legal & Compliance',
    layer: 'Professional Services Layer',
    icon: Scale,
    items: [
      { name: "Legal Document AI", href: "/industries/legal-ai" },
      { name: "Compliance Monitoring", href: "/industries/legal-comp" },
      { name: "Contract Management", href: "/industries/legal-contract" },
      { name: "Intellectual Property Tech", href: "/industries/legal-ip" }
    ]
  },
  {
    id: 'education',
    title: 'Education',
    layer: 'EdTech & Learning Layer',
    icon: GraduationCap,
    items: [
      { name: "Adaptive Learning Systems", href: "/industries/edu-learning" },
      { name: "Institutional Management", href: "/industries/edu-inst" },
      { name: "Student Engagement AI", href: "/industries/edu-ai" },
      { name: "Digital Certification", href: "/industries/edu-cert" }
    ]
  }
];

const productMenu = [
  {
    id: 'single',
    title: 'Single Suite Products',
    icon: Package,
    subtitle: 'Point solutions for specific business needs',
    items: [
      { name: 'Sales Suite', desc: 'AI lead conversion', href: '/products/sales' },
      { name: 'Marketing Suite', desc: 'Omnichannel automation', href: '/products/marketing' },
      { name: 'AI Website & Content', desc: 'GenAI site builder', href: '/products/content' },
      { name: 'Finance & Commerce', desc: 'Automated ledger', href: '/products/finance' },
      { name: 'People Suite', desc: 'Next-gen HR & Talent', href: '/products/people' },
      { name: 'Support & Knowledge', desc: 'AI Helpdesk & Wiki', href: '/products/support' },
      { name: 'Automation Platform', desc: 'Workflow orchestration', href: '/products/automation' },
      { name: 'Intelligence Suite', desc: 'Advanced analytics', href: '/products/intelligence' },
      { name: 'Governance Suite', desc: 'AI safety & compliance', href: '/products/governance' },
      { name: 'Inventory & Supply Chain', desc: 'Predictive logistics', href: '/products/logistics' },
      { name: 'Education Suite', desc: 'AI Learning Management', href: '/products/education' },
    ]
  },
  {
    id: 'combo',
    title: 'Combo Suite Products',
    icon: Layers,
    subtitle: 'Integrated bundles for faster growth',
    items: [
      { name: 'Business Suite (Flagship)', desc: 'Sales + Marketing + Content', href: '/products/business-suite' },
      { name: 'Operations Suite', desc: 'People + Finance + Inventory', href: '/products/operations-suite' },
      { name: 'Growth Suite', desc: 'Business + Finance + Support', href: '/products/growth-suite' },
      { name: 'Execution Suite', desc: 'Automation + Support + Governance', href: '/products/execution-suite' },
      { name: 'Education Enterprise', desc: 'Education + People + Finance', href: '/products/education-enterprise' },
    ]
  },
  {
    id: 'master',
    title: 'Master Product',
    icon: Cpu,
    subtitle: 'The complete AI ecosystem',
    items: [
      { name: 'CLC One', desc: 'All-in-One AI SaaS: All suites combined', href: '/products/clc-one' },
    ]
  }
];

const servicesMenu = [
  {
    id: 'consulting',
    title: 'AI & Transformation',
    layer: 'Consult & Design Layer',
    icon: Globe,
    items: [
      { name: "AI & LLM strategy and roadmap", href: "/services/ai-strategy" },
      { name: "Digital transformation consulting", href: "/services/digital-transformation" },
      { name: "AI readiness assessments", href: "/services/ai-readiness" },
      { name: "Leadership workshops", href: "/services/workshops" },
      { name: "ROI modeling", href: "/services/roi-modeling" },
      { name: "Responsible AI & governance", href: "/services/responsible-ai" }
    ]
  },
  {
    id: 'engineering',
    title: 'Agentic Engineering',
    layer: 'Core AI Build Layer',
    icon: Zap,
    items: [
      { name: "Custom AI & GenAI solutions", href: "/services/custom-ai" },
      { name: "LLM & RAG systems", href: "/services/llm-rag" },
      { name: "Agentic AI frameworks", href: "/services/agentic-frameworks" },
      { name: "Workflow automation", href: "/services/automation" },
      { name: "System & API integration", href: "/services/integration" },
      { name: "Deployment and scaling", href: "/services/scaling" }
    ]
  },
  {
    id: 'development',
    title: 'Platform Development',
    layer: 'Software + AI Layer',
    icon: Code,
    items: [
      { name: "AI-powered web applications", href: "/services/web-apps" },
      { name: "AI-powered mobile apps", href: "/services/mobile-apps" },
      { name: "Cloud-native platforms", href: "/services/cloud-platforms" },
      { name: "IoT + AI systems", href: "/services/iot-ai" },
      { name: "Enterprise applications", href: "/services/enterprise-apps" }
    ]
  },
  {
    id: 'security',
    title: 'Security & Compliance',
    layer: 'Trust & Safety Layer',
    icon: Shield,
    items: [
      { name: "Functional & Performance testing", href: "/services/testing" },
      { name: "Security & penetration testing", href: "/services/security-audit" },
      { name: "AI model validation", href: "/services/model-validation" },
      { name: "RAG & LLM safety testing", href: "/services/safety-testing" },
      { name: "Compliance audits (SOC2/ISO)", href: "/services/compliance" }
    ]
  }
];

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [searchResults, setSearchResults] = useState<any>({
    products: [],
    services: [],
    industries: []
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    } else {
      setSearchResults({ products: [], services: [], industries: [] });
    }
  }, [searchQuery]);

  const performSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // Search in products
    const productResults: any[] = [];
    productMenu.forEach(category => {
      category.items.forEach(item => {
        if (item.name.toLowerCase().includes(lowerQuery) || 
            item.desc.toLowerCase().includes(lowerQuery) ||
            category.title.toLowerCase().includes(lowerQuery)) {
          productResults.push({ ...item, category: category.title });
        }
      });
    });

    // Search in services
    const serviceResults: any[] = [];
    servicesMenu.forEach(category => {
      category.items.forEach(item => {
        if (item.name.toLowerCase().includes(lowerQuery) ||
            category.title.toLowerCase().includes(lowerQuery)) {
          serviceResults.push({ ...item, category: category.title });
        }
      });
    });

    // Search in industries
    const industryResults: any[] = [];
    industriesMenu.forEach(category => {
      category.items.forEach(item => {
        if (item.name.toLowerCase().includes(lowerQuery) ||
            category.title.toLowerCase().includes(lowerQuery)) {
          industryResults.push({ ...item, category: category.title });
        }
      });
    });

    setSearchResults({
      products: productResults.slice(0, 5),
      services: serviceResults.slice(0, 5),
      industries: industryResults.slice(0, 5)
    });
  };

  const handleMenuEnter = (menu: string) => {
    setActiveMenu(menu);
    setActiveTab(0);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Voice search is not supported in your browser. Please use Chrome or Edge.');
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const MegaMenuContent = ({ items, menuType }: { items: any[], menuType: string }) => (
    <div 
      className="fixed left-0 right-0 top-20 flex justify-center px-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-300 z-[999]"
      onMouseEnter={() => setActiveMenu(menuType)}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="w-full max-w-[1200px] bg-[#0b0f1a] border border-white/10 rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden flex min-h-[550px]">
        <div className="w-[300px] bg-[#0a0d16] p-4 border-r border-white/10 flex-shrink-0">
          <div className="space-y-1">
            {items.map((cat, idx) => (
              <button 
                key={cat.id} 
                onMouseEnter={() => setActiveTab(idx)} 
                className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-200 ${activeTab === idx ? 'bg-blue-600/10 text-white border border-blue-500/20' : 'text-slate-400 hover:text-slate-200 border border-transparent'}`}
              >
                <div className="flex items-center gap-3">
                  <cat.icon className={`w-4 h-4 ${activeTab === idx ? 'text-blue-400' : ''}`} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-left">{cat.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition-all duration-300 ${activeTab === idx ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-10 bg-[#0b0f1a] flex flex-col">
          <div className="mb-8">
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] bg-blue-500/10 px-3 py-1.5 rounded-md border border-blue-500/20">
              {items[activeTab].layer || items[activeTab].subtitle}
            </span>
            <h2 className="text-2xl font-bold text-white mt-4">{items[activeTab].title}</h2>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-8 overflow-y-auto max-h-[320px] pr-4 custom-scrollbar">
            {items[activeTab].items.map((item: any, i: number) => (
              <Link key={i} href={item.href} className="flex items-start gap-4 group p-3 -ml-3 rounded-xl hover:bg-white/5 transition-all">
                {menuType === 'products' ? (
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{item.name}</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500/40 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                    <span className="text-sm text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all font-medium">{item.name}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t border-white/5">
            <Link href="/products/explore-full-combo-suite-products-capability" className="text-[10px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-2 group uppercase tracking-[2px]">
              Explore Full {items[activeTab].title} Capability <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isMounted && (
        <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-[#020617]/95 backdrop-blur-xl border-b border-white/10 h-20">
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-10 h-full">
            <Link href="/" className="flex-shrink-0">
              <img src="/logo.png" alt="CLC Logo" className="h-7 w-auto" />
            </Link>

            <div className="hidden xl:flex items-center gap-8 h-full">
              {['products', 'services', 'industries'].map((menu) => (
                <div key={menu} className="h-full flex items-center" 
                  onMouseEnter={() => handleMenuEnter(menu)} 
                  onMouseLeave={() => setActiveMenu(null)}>
                  <button className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[2px] transition-all hover:text-white ${activeMenu === menu ? 'text-blue-400' : 'text-slate-400'}`}>
                    {menu} <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMenu === menu ? 'rotate-180' : ''}`} />
                  </button>
                  {activeMenu === menu && (
                    <MegaMenuContent 
                      items={menu === 'products' ? productMenu : menu === 'services' ? servicesMenu : industriesMenu} 
                      menuType={menu} 
                    />
                  )}
                </div>
              ))}
              
              <Link href="/freelance" className="px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] text-slate-400 hover:text-white transition-all">
                Freelance
              </Link>
              <Link href="/job-portal" className="px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] text-slate-400 hover:text-white transition-all">
                Job Portal
              </Link>
              <Link href="/case-studies" className="px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] text-slate-400 hover:text-white transition-all">
                Case Studies
              </Link>
              <Link href="/insights" className="px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] text-slate-400 hover:text-white transition-all">
                Insights
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <Link href="/b2c" className="hidden sm:block relative group overflow-hidden bg-blue-600 text-white px-5 py-3 rounded-full font-black text-[10px] uppercase tracking-[2px] shadow-[0_10px_20px_rgba(37,99,235,0.3)] transition-all active:scale-95 whitespace-nowrap">
              <span className="relative z-10">Get Internship</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="xl:hidden p-2 bg-white/5 rounded-lg"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[2000] bg-[#0a0a0a] overflow-y-auto">
          <div className="p-6 min-h-screen flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img src="/logo.png" alt="Logo" className="h-7 w-auto" />
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Products', data: productMenu },
                { label: 'Services', data: servicesMenu },
                { label: 'Industries', data: industriesMenu }
              ].map((section) => (
                <div key={section.label} className="space-y-2">
                  <h4 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em] px-1 mb-2">{section.label}</h4>
                  {section.data.map((cat: any) => (
                    <details key={cat.id} className="group bg-white/5 rounded-xl overflow-hidden border border-white/5">
                      <summary className="flex items-center justify-between text-white font-bold text-sm list-none p-4 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <cat.icon className="w-4 h-4 text-blue-400" /> 
                          {cat.title}
                        </div>
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-open:rotate-180 text-slate-500" />
                      </summary>
                      <div className="px-4 pb-4 pl-11 space-y-2">
                        {cat.items.map((item: any) => (
                          <Link 
                            key={item.name} 
                            href={item.href} 
                            onClick={() => setIsMobileMenuOpen(false)} 
                            className="block text-slate-300 text-sm py-2"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              ))}

              <div className="border-t border-white/10 pt-4 mt-4 space-y-2">
                <Link 
                  href="/freelance" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white font-bold text-base py-3 hover:text-blue-400 transition-colors"
                >
                  Freelance
                </Link>
                <Link 
                  href="/job-portal" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white font-bold text-base py-3 hover:text-blue-400 transition-colors"
                >
                  Job Portal
                </Link>
                <Link 
                  href="/case-studies" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white font-bold text-base py-3 hover:text-blue-400 transition-colors"
                >
                  Case Studies
                </Link>
                <Link 
                  href="/insights" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white font-bold text-base py-3 hover:text-blue-400 transition-colors"
                >
                  Insights
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <Link 
                href="/b2c" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center bg-blue-600 py-4 rounded-xl text-white font-bold uppercase tracking-[2px] text-[11px]"
              >
                Apply for Internship
              </Link>
            </div>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 z-[2500] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6">
          <button 
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }} 
            className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-8 h-8 text-white" />
          </button>

          <div className="w-full max-w-3xl">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <h2 className="text-3xl font-black text-white">AI-Powered Search</h2>
              </div>
              <p className="text-slate-400 text-sm">Search using text or voice command</p>
            </div>

            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, services, industries..."
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl py-6 pl-16 pr-24 text-lg text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleVoiceSearch}
                  disabled={isListening}
                  className={`absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all cursor-pointer ${
                    isListening 
                      ? 'bg-red-500 animate-pulse cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-500 hover:scale-110'
                  }`}
                >
                  <Mic className="w-5 h-5 text-white" />
                </button>
              </div>

              {isListening && (
                <div className="absolute -bottom-16 left-0 right-0 text-center">
                  <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-6 py-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-red-400 font-bold text-sm">Listening...</span>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Products', icon: Package },
                { label: 'Services', icon: Zap },
                { label: 'Industries', icon: Monitor },
                { label: 'Case Studies', icon: Layers }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSearchQuery(item.label)}
                  className="flex items-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors group"
                >
                  <item.icon className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white">{item.label}</span>
                </button>
              ))}
            </div>

            {searchQuery && (
              <div className="mt-8 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                {searchResults.products.length === 0 && 
                 searchResults.services.length === 0 && 
                 searchResults.industries.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                      <Search className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                    <p className="text-slate-400">Try searching for "AI services" or "healthcare solutions"</p>
                  </div>
                ) : (
                  <>
                    {searchResults.products.length > 0 && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Products ({searchResults.products.length})
                        </h3>
                        <div className="space-y-2">
                          {searchResults.products.map((item: any, idx: number) => (
                            <Link
                              key={idx}
                              href={item.href}
                              onClick={() => setIsSearchOpen(false)}
                              className="block p-3 hover:bg-white/5 rounded-lg transition-colors group"
                            >
                              <p className="text-sm font-bold text-white group-hover:text-blue-400">{item.name}</p>
                              <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.services.length > 0 && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          Services ({searchResults.services.length})
                        </h3>
                        <div className="space-y-2">
                          {searchResults.services.map((item: any, idx: number) => (
                            <Link
                              key={idx}
                              href={item.href}
                              onClick={() => setIsSearchOpen(false)}
                              className="block p-3 hover:bg-white/5 rounded-lg transition-colors group"
                            >
                              <p className="text-sm font-bold text-white group-hover:text-blue-400">{item.name}</p>
                              <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.industries.length > 0 && (
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
                          <Monitor className="w-4 h-4" />
                          Industries ({searchResults.industries.length})
                        </h3>
                        <div className="space-y-2">
                          {searchResults.industries.map((item: any, idx: number) => (
                            <Link
                              key={idx}
                              href={item.href}
                              onClick={() => setIsSearchOpen(false)}
                              className="block p-3 hover:bg-white/5 rounded-lg transition-colors group"
                            >
                              <p className="text-sm font-bold text-white group-hover:text-blue-400">{item.name}</p>
                              <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                💡 Tip: Try saying "Show me AI services" or "Find healthcare solutions"
              </p>
            </div>

            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(59, 130, 246, 0.5);
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(59, 130, 246, 0.7);
              }
            `}</style>
          </div>
        </div>
      )}
        </>
      )}
    </>
  );
}