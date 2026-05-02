'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign,
  ArrowRight,
  Building2,
  GraduationCap,
  ShoppingCart,
  Heart,
  Briefcase,
  CheckCircle2,
  BarChart3,
  Target,
  Zap,
  ChevronRight,
  Home
} from 'lucide-react';

import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import CTAModal from '@/components/product/CTAModel';
import Link from 'next/link';

const caseStudies = [
  {
    company: "TechCorp Global",
    industry: "Technology",
    icon: Building2,
    gradient: "from-blue-400 to-cyan-600",
    challenge: "Manual customer support overwhelmed team with 10,000+ monthly tickets, leading to 48-hour response times and declining satisfaction.",
    solution: "Implemented SuppX for 24/7 autonomous support and Manee for omnichannel communication across email, chat, and phone.",
    results: [
      { metric: "Response Time", value: "98%", desc: "Faster responses" },
      { metric: "Ticket Resolution", value: "85%", desc: "Automated resolution" },
      { metric: "Customer Satisfaction", value: "4.8/5", desc: "CSAT score" },
      { metric: "Cost Savings", value: "$2.4M", desc: "Annual savings" }
    ],
    testimonial: "The AI agents handle complex queries autonomously. Our support team now focuses on strategic initiatives while AI handles routine operations flawlessly.",
    author: "Sarah Chen, VP of Customer Success",
    tags: ["Support", "Communication", "Automation"]
  },
  {
    company: "EduTech University",
    industry: "Education",
    icon: GraduationCap,
    gradient: "from-purple-400 to-pink-600",
    challenge: "Managing 50,000+ students across multiple campuses with disconnected systems for admissions, academics, and operations.",
    solution: "Deployed EduX institutional suite integrating ERP, CRM, and LMS-X with AR/VR learning environments and AI mentorship.",
    results: [
      { metric: "Admin Efficiency", value: "75%", desc: "Time saved" },
      { metric: "Student Engagement", value: "3.2x", desc: "Increase" },
      { metric: "Enrollment Growth", value: "42%", desc: "Year over year" },
      { metric: "Operational Cost", value: "60%", desc: "Reduction" }
    ],
    testimonial: "EduX transformed our institution. From admission automation to immersive 3D learning, we're now a model for digital education excellence.",
    author: "Dr. Rajesh Kumar, Dean of Technology",
    tags: ["Education", "ERP", "Learning"]
  },
  {
    company: "RetailMax Commerce",
    industry: "E-Commerce",
    icon: ShoppingCart,
    gradient: "from-orange-400 to-red-600",
    challenge: "Struggled with inventory management, customer acquisition costs, and inefficient marketing across multiple channels.",
    solution: "Integrated CRM-X for autonomous marketing, ErpX for finance automation, and Manee for customer communication.",
    results: [
      { metric: "Revenue Growth", value: "156%", desc: "In 12 months" },
      { metric: "Marketing ROI", value: "4.2x", desc: "Improvement" },
      { metric: "Cart Abandonment", value: "68%", desc: "Reduction" },
      { metric: "Inventory Accuracy", value: "99.2%", desc: "Achieved" }
    ],
    testimonial: "CRM-X's autonomous campaigns generate personalized content and optimize funnels without human input. Our growth trajectory completely changed.",
    author: "Michael Rodriguez, CEO",
    tags: ["E-Commerce", "Marketing", "Growth"]
  },
  {
    company: "HealthFirst Medical",
    industry: "Healthcare",
    icon: Heart,
    gradient: "from-green-400 to-emerald-600",
    challenge: "Patient appointment scheduling chaos, compliance documentation burden, and 24/7 patient inquiry management.",
    solution: "Implemented SuppX for patient support, LegalOS for compliance documentation, and TwinX for executive reporting.",
    results: [
      { metric: "Appointment Efficiency", value: "91%", desc: "Automation rate" },
      { metric: "Patient Satisfaction", value: "4.9/5", desc: "Rating" },
      { metric: "Compliance Time", value: "80%", desc: "Faster" },
      { metric: "Staff Productivity", value: "3x", desc: "Increase" }
    ],
    testimonial: "AI handles patient scheduling, insurance verification, and compliance autonomously. Our medical staff focuses entirely on patient care now.",
    author: "Dr. Emily Watson, COO",
    tags: ["Healthcare", "Compliance", "Support"]
  },
  {
    company: "FinanceFlow Solutions",
    industry: "Financial Services",
    icon: Briefcase,
    gradient: "from-yellow-400 to-orange-500",
    challenge: "Manual payroll processing for 5,000+ employees, complex revenue forecasting, and time-consuming financial reporting.",
    solution: "Deployed ErpX for complete finance automation and TwinX for real-time executive dashboards and business intelligence.",
    results: [
      { metric: "Payroll Processing", value: "95%", desc: "Faster" },
      { metric: "Forecast Accuracy", value: "94%", desc: "Achieved" },
      { metric: "Reporting Time", value: "10 mins", desc: "From 3 days" },
      { metric: "Cost Reduction", value: "$1.8M", desc: "Annual" }
    ],
    testimonial: "ErpX eliminated manual finance work entirely. Real-time dashboards and AI-generated reports give us unprecedented visibility into our business.",
    author: "David Park, CFO",
    tags: ["Finance", "ERP", "Analytics"]
  },
  {
    company: "TalentHub Recruiting",
    industry: "Human Resources",
    icon: Users,
    gradient: "from-indigo-400 to-purple-600",
    challenge: "Manual candidate screening for 10,000+ monthly applications, scheduling conflicts, and inconsistent interview quality.",
    solution: "Implemented HrX with AI avatar interviews, autonomous screening, skill assessment, and candidate ranking algorithms.",
    results: [
      { metric: "Screening Time", value: "92%", desc: "Reduction" },
      { metric: "Hire Quality", value: "3.5x", desc: "Better retention" },
      { metric: "Time to Hire", value: "65%", desc: "Faster" },
      { metric: "Recruiter Productivity", value: "5x", desc: "Increase" }
    ],
    testimonial: "AI avatar interviews and autonomous screening transformed our hiring. We now process thousands of candidates while maintaining quality and reducing bias.",
    author: "Lisa Thompson, Head of Talent",
    tags: ["HR", "Recruitment", "AI Interviews"]
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
          Case-Studies
        </span>
      </li>
    </ol>
  </nav>
);


export default function CaseStudiesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#020617] text-white">
        <Navbar/>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-blue-900/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <Breadcrumb/>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 pt-16">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
              <Target className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Real Results, Real Impact</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r italic font-extrabold from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Success Stories
              </span>
              <br />
              <span className="text-white">From Our Clients</span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-gray-400 px-4 mb-0 md:mb-24">
              Discover how leading organizations transformed their operations with our autonomous AI solutions. 
              Real metrics, real transformations, real business impact.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          {caseStudies.map((study, idx) => {
            const Icon = study.icon;
            return (
              <div
                key={idx}
                className="relative group"
              >
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${study.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-3xl transition-opacity duration-700`}></div>
                
                <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500">
                  {/* Header */}
                  <div className="p-6 sm:p-8 lg:p-12 border-b border-slate-800">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="flex items-start gap-4 sm:gap-6">
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${study.gradient} p-0.5 flex-shrink-0`}>
                          <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center">
                            <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                          </div>
                        </div>
                        <div>
                          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                            {study.company}
                          </h2>
                          <p className="text-base sm:text-lg text-gray-400">{study.industry}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {study.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx}
                            className="px-3 py-1 text-xs sm:text-sm bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 lg:p-12 space-y-8 sm:space-y-12">
                    {/* Challenge & Solution */}
                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-red-400 mb-3 sm:mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          The Challenge
                        </h3>
                        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-3 sm:mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          The Solution
                        </h3>
                        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    {/* Results Grid */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-blue-400 mb-6 sm:mb-8 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Measurable Results
                      </h3>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {study.results.map((result, rIdx) => (
                          <div
                            key={rIdx}
                            className="relative bg-slate-800/50 rounded-2xl p-4 sm:p-6 text-center border border-slate-700 hover:border-blue-500/50 transition-all"
                          >
                            <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r text-white bg-clip-text text-transparent mb-2`}>
                              {result.value}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-400 mb-1">{result.desc}</div>
                            <div className="text-xs text-gray-500">{result.metric}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="relative bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-6 sm:p-8 border border-blue-500/20">
                      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-blue-400/20 text-4xl sm:text-6xl font-serif">"</div>
                      <div className="relative">
                        <p className="text-sm sm:text-base mt-5 p-4 lg:text-lg text-gray-300 italic mb-4 sm:mb-6 leading-relaxed">
                          {study.testimonial}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                            {study.author.trim().charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm sm:text-base font-semibold text-white">{study.author}</div>
                            <div className="text-xs sm:text-sm text-gray-400">{study.company}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Overview */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-t border-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Aggregate Impact
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Combined results across all our client implementations
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { label: "Average Cost Reduction", value: "68%", icon: DollarSign },
              { label: "Productivity Increase", value: "3.4x", icon: TrendingUp },
              { label: "Time Saved", value: "82%", icon: Clock },
              { label: "Client Satisfaction", value: "4.8/5", icon: CheckCircle2 }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx}
                  className="relative group bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-8 text-center hover:border-blue-500/50 transition-all"
                >
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl p-8 sm:p-12 lg:p-16 border border-blue-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
            
            <div className="relative space-y-6 sm:space-y-8">
              <Zap className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-blue-400" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                Join these industry leaders and transform your business with autonomous AI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button onClick={() => setModalOpen(true)} className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                  Get Started <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => {
                    const phone = "918700236923";
                    const message = `Hi, I was exploring your platform and would like to see more AI implementation case studies and real-world use cases. Could you please share more details?`;
                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                    window.open(url, "_blank");
                  }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-colors border border-white/20 text-sm sm:text-base"
                >
                  View More Cases
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productName="Get Started"
          productTagline="General"
        />
      <Footer/>
    </div>
  );
}