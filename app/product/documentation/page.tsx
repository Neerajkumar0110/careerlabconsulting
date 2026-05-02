'use client';

import React, { useState } from 'react';
import { 
  Book, 
  Code, 
  Terminal, 
  FileText,
  ArrowRight,
  ChevronRight,
  Search,
  Play,
  Zap,
  Shield,
  Cpu,
  Globe,
  Settings,
  Key,
  Boxes,
  GitBranch,
  Webhook,
  Database,
  Home
} from 'lucide-react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import CTAModal from '@/components/product/CTAModel';
import Link from 'next/link';

const docCategories = [
  {
    title: "Getting Started",
    icon: Play,
    gradient: "from-blue-400 to-cyan-600",
    items: [
      { title: "Quick Start Guide", desc: "Get up and running in 5 minutes", time: "5 min" },
      { title: "Installation", desc: "Step-by-step installation instructions", time: "10 min" },
      { title: "Authentication", desc: "API keys and authentication methods", time: "8 min" },
      { title: "First API Call", desc: "Make your first successful API request", time: "5 min" }
    ]
  },
  {
    title: "Core Concepts",
    icon: Cpu,
    gradient: "from-purple-400 to-pink-600",
    items: [
      { title: "AI Agents Architecture", desc: "Understanding autonomous agents", time: "15 min" },
      { title: "Data Models", desc: "Core data structures and schemas", time: "12 min" },
      { title: "Workflow Orchestration", desc: "How AI agents coordinate tasks", time: "20 min" },
      { title: "Event System", desc: "Real-time events and webhooks", time: "10 min" }
    ]
  },
  {
    title: "Product APIs",
    icon: Code,
    gradient: "from-green-400 to-emerald-600",
    items: [
      { title: "Manee API", desc: "Omnichannel communication endpoints", time: "25 min" },
      { title: "CRM-X API", desc: "Marketing and growth automation", time: "30 min" },
      { title: "TwinX API", desc: "Executive AI and reporting", time: "20 min" },
      { title: "ErpX API", desc: "Finance and ERP operations", time: "35 min" },
      { title: "HrX API", desc: "Recruitment and HR management", time: "25 min" },
      { title: "SuppX API", desc: "Support automation", time: "20 min" },
      { title: "LegalOS API", desc: "Legal intelligence", time: "30 min" },
      { title: "LMS-X API", desc: "Learning management", time: "28 min" },
      { title: "EduX API", desc: "Institutional management", time: "40 min" }
    ]
  },
  {
    title: "Integration Guides",
    icon: Webhook,
    gradient: "from-yellow-400 to-orange-500",
    items: [
      { title: "Webhooks Setup", desc: "Configure real-time notifications", time: "15 min" },
      { title: "Third-Party Integrations", desc: "Connect with external services", time: "20 min" },
      { title: "Custom Workflows", desc: "Build custom automation flows", time: "30 min" },
      { title: "Data Synchronization", desc: "Keep data in sync across systems", time: "25 min" }
    ]
  },
  {
    title: "Security & Compliance",
    icon: Shield,
    gradient: "from-red-400 to-rose-600",
    items: [
      { title: "Security Best Practices", desc: "Protect your implementation", time: "18 min" },
      { title: "Data Privacy", desc: "GDPR and data protection", time: "22 min" },
      { title: "Compliance Standards", desc: "Industry compliance requirements", time: "25 min" },
      { title: "Audit Logs", desc: "Track and monitor all activities", time: "12 min" }
    ]
  },
  {
    title: "Advanced Topics",
    icon: Boxes,
    gradient: "from-indigo-400 to-purple-600",
    items: [
      { title: "Custom AI Models", desc: "Train and deploy custom models", time: "45 min" },
      { title: "Performance Optimization", desc: "Scale and optimize your deployment", time: "35 min" },
      { title: "Multi-tenancy", desc: "Manage multiple organizations", time: "30 min" },
      { title: "Advanced Analytics", desc: "Deep dive into metrics and insights", time: "40 min" }
    ]
  }
];

const Breadcrumb = () => (
  <nav className="relative z-20 flex items-center justify-center pt-30 sm:pt-32 px-4 pointer-events-auto">
    <ol className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
      <li className="flex items-center">
        <Link href="/" className="text-slate-400 hover:text-indigo-400 transition-colors">
          <Home size={14} />
        </Link>
      </li>
      <li className="flex items-center text-slate-700">
        <ChevronRight size={12} />
      </li>
      <li className="flex items-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white-400/80 cursor-default">
          Documentation
        </span>
      </li>
    </ol>
  </nav>
);

const openWhatsApp = (category: string, item: string) => {
  const phone = "918700236923";

  const message = `Hi, I'm exploring your developer documentation and would like more information about *${item}* under the _*${category}*_ section. Could you please guide me further?`;

  const encoded = encodeURIComponent(message);

  const url = `https://wa.me/${phone}?text=${encoded}`;

  window.open(url, "_blank");
};

const quickLinks = [
  { label: "Product APIs", icon: Code, id: "product-apis" },
  { label: "Integration Guides", icon: Webhook, id: "integration-guides" },
  { label: "Security & Compliance", icon: Shield, id: "security" },
  { label: "Advanced Topics", icon: Boxes, id: "advanced" }
];

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
        <Navbar/>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-blue-900/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <Breadcrumb/>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 ">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
              <Book className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Developer Documentation</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r italic font-extrabold from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Documentation
              </span>
              <br />
              <span className="text-white">& Developer Guides</span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-gray-400 px-4">
              Everything you need to integrate, build, and deploy our autonomous AI solutions. 
              Comprehensive guides, API references, and code examples.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8 sm:mt-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-6 sm:pt-8">
            {quickLinks.map((link, idx) => {
              const Icon = link.icon;

              return (
                <button
                  key={idx}
                  onClick={() => scrollToSection(link.id)}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-blue-500 transition-colors text-sm sm:text-base"
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
          {docCategories.map((category, catIdx) => {
            const Icon = category.icon;
            return (
              <div
                key={catIdx}
                id={[
                  "getting-started",
                  "core-concepts",
                  "product-apis",
                  "integration-guides",
                  "security",
                  "advanced"
                ][catIdx]}
                className="space-y-6 sm:space-y-8 scroll-mt-32"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${category.gradient} p-0.5`}>
                    <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl italic font-extrabold text-white">
                    {category.title}
                  </h2>
                </div>

                {/* Category Items */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {category.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      onClick={() => openWhatsApp(category.title, item.title)}
                      className="group relative cursor-pointer bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>
                      
                      <div className="relative">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex-1">
                            {item.title}
                          </h3>
                          <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                        </div>
                        
                        <p className="text-sm sm:text-base text-gray-400 mb-4 leading-relaxed">
                          {item.desc}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                          <FileText className="w-4 h-4" />
                          <span>{item.time} read</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Code Example Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-t border-blue-900/20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Quick Start Example
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Get started with a simple API call in minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="bg-slate-800/50 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-xs sm:text-sm font-mono text-gray-400">API Request Example</span>
              </div>
              <button className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Copy
              </button>
            </div>
            <div className="p-4 sm:p-6 lg:p-8 overflow-x-auto">
              <pre className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
{`curl -X POST https://api.yourplatform.ai/v1/agents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_type": "support",
    "config": {
      "channels": ["email", "chat", "phone"],
      "language": "en",
      "response_time": "instant"
    }
  }'`}
              </pre>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-8 grid sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { lang: "Python", code: "pip install ai-platform-sdk" },
              { lang: "Node.js", code: "npm install @ai-platform/sdk" },
              { lang: "Ruby", code: "gem install ai_platform" }
            ].map((sdk, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 sm:p-6">
                <div className="text-sm sm:text-base font-semibold text-white mb-2">{sdk.lang} SDK</div>
                <code className="text-xs sm:text-sm text-blue-400 font-mono">{sdk.code}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl p-8 sm:p-12 lg:p-16 border border-blue-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
            
            <div className="relative space-y-6 sm:space-y-8">
              <Settings className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-blue-400" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Need Help?
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                Our developer support team is available 24/7 to help you integrate and optimize
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors text-sm sm:text-base"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTAModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="Doubt"
        productTagline="General"
      />
      <Footer/>
    </div>
  );
}