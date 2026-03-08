'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  BookOpen,
  ArrowRight,
  BarChart2,
  Bot,
  GraduationCap,
  HeadphonesIcon,
  Scale,
  TrendingUp,
  Users,
  Zap,
  Sparkles,
  Globe,
  Shield,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import ProductCardModal from '@/components/product/ProductCardModal'
import { useRouter } from "next/navigation";

const products = [
  {
    title: "Manee – Omni-Channel AI",
    slug: "manee",
    desc: "Your AI communication head. Handles calls, emails, chat, and social platforms autonomously 24/7.",
    icon: MessageSquare,
    gradient: "from-purple-400 to-pink-600",
    features: ["WhatsApp & Email Integration", "AI Voice Automation", "Sentiment Detection", "Multi-platform Support"]
  },
  {
    title: "CRM-X – Autonomous Growth",
    slug: "crmx",
    desc: "Automated marketing, lead scoring, content generation, and sales pipeline optimization without human supervision.",
    icon: TrendingUp,
    gradient: "from-yellow-400 to-orange-500",
    features: ["Marketing Automation", "Lead Scoring AI", "Content Generation", "Auto Funnels"]
  },
  {
    title: "LMS-X – Immersive Learning",
    slug: "lmsx",
    desc: "AR/VR 3D learning environment with AI mentor and in-house code editor for next-gen education.",
    icon: BookOpen,
    gradient: "from-cyan-400 to-blue-600",
    features: ["AR/VR 3D Environments", "AI Mentor System", "Code Editor", "Skill Analytics"]
  },
  {
    title: "EduX – Institutional AI Suite",
    slug: "edux",
    desc: "Complete AI-powered ERP, CRM, LMS, and communication tools for schools, colleges, and universities.",
    icon: GraduationCap,
    gradient: "from-blue-400 to-indigo-600",
    features: ["ERP + CRM + LMS", "Admission Automation", "Campus Operations", "Student Analytics"]
  },
  {
    title: "TwinX – Intelligent Executive AI",
    slug: "twinx",
    desc: "Role-aware AI assistant that generates business reports, analytics, and executive insights autonomously.",
    icon: Bot,
    gradient: "from-emerald-400 to-teal-600",
    features: ["CEO Business Reports", "Real-Time Dashboard", "Decision Support", "Predictive Analytics"]
  },
  {
    title: "LegalOS – Autonomous Legal Intelligence",
    slug: "legalos",
    desc: "Handles agreements, hiring documentation, compliance, and legal solutions without human oversight.",
    icon: Scale,
    gradient: "from-red-400 to-rose-600",
    features: ["Agreement Drafting", "Risk Analysis", "Smart Contracts", "Compliance Tracking"]
  },
  {
    title: "ErpX – AI Finance Command",
    slug: "erpx",
    desc: "End-to-end finance automation: budget planning, payroll, revenue forecasts, and tax management autonomously.",
    icon: BarChart2,
    gradient: "from-orange-400 to-yellow-500",
    features: ["Payroll Automation", "Revenue Forecast", "Tax Insights", "Budget Planning"]
  },
  {
    title: "HrX – AI Recruitment",
    slug: "hrx",
    desc: "Autonomous screening, virtual avatar interviews, skill assessment, and candidate ranking for faster hiring.",
    icon: Users,
    gradient: "from-indigo-400 to-purple-500",
    features: ["Avatar Interviews", "Screening Engine", "Ranking AI", "Skill Assessment"]
  },
  {
    title: "SuppX – Autonomous Support",
    slug: "suppx",
    desc: "24/7 AI support across e-commerce, healthcare, and ed-tech via calls, chats, and messages.",
    icon: HeadphonesIcon,
    gradient: "from-teal-400 to-cyan-500",
    features: ["24/7 Global Agents", "Voice + Chat", "Ticket Resolution", "Multi-language Support"]
  }
];

const stats = [
  { label: "AI Products", value: "9+", icon: Cpu },
  { label: "Industries Served", value: "15+", icon: Globe },
  { label: "Automation Rate", value: "95%", icon: Zap },
  { label: "Uptime Guarantee", value: "99.9%", icon: Shield }
];

export default function ExplorePage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'form' | 'calendar' | 'select'>('select')

  const product = {
    id: 'clc-one',
    name: 'CLC One',
    tagline: 'All-in-One AI SaaS: All suites combined',
    features: ['AI', 'Automation', 'Enterprise'],
    icon: ShieldCheck
  }
  return (
    <div className="min-h-screen bg-[#020617] text-white">
        <Navbar/>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-blue-900/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm my-5 mt-8 md:my-4">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Autonomous AI Ecosystem</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Explore Our<br />
              <span className="bg-gradient-to-r italic font-extrabold from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI-Powered {' '}
              </span>
              Solutions
              
              <span className="text-white"></span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-gray-400 px-4">
              Transform every department with autonomous AI agents. From communication to finance, 
              from education to legal - we've built the complete AI infrastructure for your business.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 sm:p-6 text-center hover:border-blue-500/50 transition-all duration-300">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 text-blue-400" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Our {' '}
              <span className="bg-gradient-to-r italic font-extrabold from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Products
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              Comprehensive AI solutions designed to automate and optimize every aspect of your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product, idx) => {
              const Icon = product.icon;
              return (
                <div
                  key={idx}
                  onClick={() => router.push(`/product/${product.slug}`)}
                  className="group relative cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`}></div>
                  
                  <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${product.gradient} p-0.5 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-blue-400 transition-colors">
                      {product.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 flex-grow">
                      {product.desc}
                    </p>

                    <div className="space-y-2 mb-4 sm:mb-6">
                      {product.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.gradient}`}></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-blue-400 group-hover:gap-4 transition-all text-sm sm:text-base">
                      <span className="font-medium">Learn More</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-t border-blue-900/20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Why Choose Our {' '} <br/>
              <span className="bg-gradient-to-r italic font-extrabold from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Suite?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Fully Autonomous",
                desc: "AI agents that work 24/7 without human intervention, handling complex tasks independently",
                icon: Zap
              },
              {
                title: "Enterprise Grade",
                desc: "Built for scale with 99.9% uptime, enterprise security, and seamless integrations",
                icon: Shield
              },
              {
                title: "Rapid Deployment",
                desc: "Get started in minutes with pre-configured AI agents and intuitive dashboards",
                icon: Cpu
              },
              {
                title: "Cross-Platform",
                desc: "Unified AI infrastructure that works across all channels and touchpoints",
                icon: Globe
              },
              {
                title: "Continuous Learning",
                desc: "AI models that improve over time, adapting to your business needs automatically",
                icon: Sparkles
              },
              {
                title: "Cost Efficient",
                desc: "Reduce operational costs by up to 70% while increasing productivity exponentially",
                icon: TrendingUp
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300"
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

{/* How It Works */}
<section className="relative py-16 sm:py-20 lg:py-24">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/5 to-transparent"></div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        How Our AI {' '}
        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent italic font-extrabold">
          Works
        </span>
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          step: "01",
          title: "Connect",
          desc: "Integrate your communication channels, CRM, ERP, and workflows in minutes."
        },
        {
          step: "02",
          title: "Train & Customize",
          desc: "AI adapts to your brand tone, workflows, and business rules automatically."
        },
        {
          step: "03",
          title: "Automate & Scale",
          desc: "Deploy autonomous agents that operate 24/7 without supervision."
        }
      ].map((item, idx) => (
        <div
          key={idx}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm hover:border-cyan-500/40 transition-all"
        >
          <div className="text-cyan-400 text-4xl font-extrabold mb-4">
            {item.step}
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">
            {item.title}
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Security Section */}
<section className="relative py-16 sm:py-20 lg:py-24 border-t border-blue-900/20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
          Enterprise-Grade {' '}
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent italic font-extrabold">
            Security
          </span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg mb-6">
          Built with advanced encryption, compliance frameworks, and multi-layer protection
          to safeguard your data at every level.
        </p>

        <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
          <li>• End-to-End Encryption</li>
          <li>• Role-Based Access Control</li>
          <li>• GDPR & SOC 2 Ready</li>
          <li>• Secure Cloud Infrastructure</li>
        </ul>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-10 backdrop-blur-sm">
        <div className="text-center">
          <ShieldCheck className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">
            99.9% Secure Operations
          </h3>
          <p className="text-gray-400">
            Zero-trust architecture combined with continuous monitoring.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Testimonials */}
<section className="relative py-16 sm:py-20 lg:py-24">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent"></div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12 sm:mb-16">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
        Trusted by {' '}
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent italic font-extrabold">
          Industry Leaders
        </span>
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          quote: "Our operations became 3x faster after deploying their AI ecosystem.",
          name: "CEO, FinTech Startup"
        },
        {
          quote: "Autonomous CRM-X increased our revenue pipeline significantly.",
          name: "Marketing Director"
        },
        {
          quote: "We reduced support costs by 65% using SuppX AI agents.",
          name: "E-Commerce Founder"
        }
      ].map((item, idx) => (
        <div
          key={idx}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm hover:border-blue-500/40 transition-all"
        >
          <p className="text-gray-300 text-sm sm:text-base mb-6">
            “{item.quote}”
          </p>
          <div className="text-blue-400 font-semibold text-sm sm:text-base">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl p-8 sm:p-12 lg:p-16 border border-blue-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
            
            <div className="relative space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                Join thousands of businesses already leveraging our AI ecosystem to drive growth and efficiency
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  onClick={() => {
                    
                    setModalOpen(true)
                    setModalMode('form')
                  }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors text-sm sm:text-base"
                  >
                  Start Free Trial
                  </button>

                  <button
                  onClick={() => {                    
                    setModalOpen(true)
                    setModalMode('calendar')
                  }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-colors border border-white/20 text-sm sm:text-base"
                  >
                  Schedule Demo
                  </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductCardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
        defaultMode={modalMode}
      />
      <Footer/>
    </div>
  );
}