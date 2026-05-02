'use client';

import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, Globe, FileText, Mail, Home, ChevronRight } from 'lucide-react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import Link from 'next/link';

const sections = [
  {
    title: "Overview",
    icon: Eye,
    content: "Your privacy is our top priority. This policy explains how we collect, use, protect, and share your data when you use our services. Our goal is to be transparent so you can grow your business with confidence and peace of mind."
  },
  {
    title: "Payment Processing & Razorpay",
    icon: Lock,
    content: "We use Razorpay for secure payment processing. We never store your card details on our servers.",
    details: [
      "Encryption: All transactions are processed through Razorpay's secure PCI-DSS compliant environment with industry-standard encryption",
      "Data Sharing: We only share information necessary to confirm payments (e.g., amount, billing details)",
      "Security: Razorpay employs industry-standard encryption protocols to ensure your financial data remains 100% secure"
    ]
  },
  {
    title: "Data We Collect",
    icon: Database,
    subsections: [
      {
        title: "Personal Information",
        content: "Name, email address, phone number, and billing address that you provide to us during registration and usage"
      },
      {
        title: "Usage Data",
        content: "IP address, browser type, device information, and page visit duration to help us improve user experience and optimize our platform"
      },
      {
        title: "Business Data",
        content: "Information you input into our AI systems including communications, documents, and operational data necessary for service delivery"
      }
    ]
  },
  {
    title: "How We Use Your Data",
    icon: UserCheck,
    details: [
      "Provide and maintain our AI services and features",
      "Process transactions and send billing notifications",
      "Improve and optimize platform performance and user experience",
      "Communicate important updates, security alerts, and service changes",
      "Provide customer support and respond to your inquiries",
      "Detect, prevent, and address technical issues and fraudulent activity"
    ]
  },
  {
    title: "Security Standards",
    icon: Shield,
    content: "We implement robust security measures to protect your data:",
    details: [
      "SSL/TLS encryption for all data in transit",
      "AES-256 encryption for data at rest",
      "Regular security audits and penetration testing",
      "Multi-factor authentication options",
      "SOC 2 Type II compliance",
      "ISO 27001 certified data centers"
    ],
    note: "While no internet transmission is 100% secure, we follow industry best practices to safeguard your information."
  },
  {
    title: "Cookies & Tracking",
    icon: Globe,
    content: "We use cookies and similar technologies to enhance your experience:",
    details: [
      "Essential cookies: Required for basic site functionality",
      "Analytics cookies: Help us understand how you use our platform",
      "Preference cookies: Remember your settings and choices"
    ],
    note: "You can disable cookies through your browser settings, though this may limit some functionality."
  },
  {
    title: "Data Retention",
    icon: FileText,
    content: "We retain your data only as long as necessary:",
    details: [
      "Active accounts: Data retained for service delivery and legal compliance",
      "Closed accounts: Personal data deleted within 90 days unless required by law",
      "Backup systems: Data may persist in backups for up to 180 days",
      "Legal requirements: Some data retained longer to comply with regulations"
    ]
  },
  {
    title: "Your Rights",
    icon: UserCheck,
    content: "You have control over your data:",
    details: [
      "Access: Request a copy of your personal data",
      "Correction: Update or correct inaccurate information",
      "Deletion: Request deletion of your personal data",
      "Portability: Export your data in a common format",
      "Opt-out: Unsubscribe from marketing communications",
      "Restrict: Limit how we process your data"
    ]
  },
  {
    title: "Third-Party Services",
    icon: Globe,
    content: "We work with trusted third-party services:",
    details: [
      "Payment processing: Razorpay (PCI-DSS compliant)",
      "Cloud infrastructure: AWS/Google Cloud (ISO 27001 certified)",
      "Analytics: Privacy-focused analytics tools",
      "Communication: Email and messaging service providers"
    ],
    note: "These partners are bound by strict data protection agreements and cannot use your data for their own purposes."
  },
  {
  title: "Data Breach Notification",
  icon: Shield,
  content: "In the unlikely event of a data breach, we are committed to acting swiftly and transparently.",
  details: [
    "Immediate containment and investigation procedures",
    "Notification to affected users within 72 hours where legally required",
    "Coordination with regulatory authorities when applicable",
    "Clear guidance on recommended user actions"
  ],
  note: "We maintain an internal incident response framework to ensure rapid mitigation and transparency."
},
{
  title: "AI Data Processing & Model Training",
  icon: Database,
  content: "Our AI systems process data strictly for service delivery and optimization.",
  details: [
    "Customer data is not sold or shared for advertising purposes",
    "AI models may use anonymized and aggregated data for system improvements",
    "Strict access controls limit internal data exposure",
    "No automated decisions are made without user-configurable controls"
  ],
  note: "Where applicable, you may request exclusion from anonymized model training datasets."
},
{
  title: "Account Security Responsibilities",
  icon: Lock,
  content: "While we implement strong security safeguards, users also share responsibility in protecting account access.",
  details: [
    "Maintain strong, unique passwords",
    "Enable multi-factor authentication when available",
    "Avoid sharing login credentials",
    "Notify us immediately of suspicious account activity"
  ]
},
  {
    title: "International Data Transfers",
    icon: Globe,
    content: "Your data may be processed in different countries where we or our service providers operate. We ensure appropriate safeguards are in place through:",
    details: [
      "Standard contractual clauses approved by regulatory authorities",
      "Adequacy decisions for transfers to approved countries",
      "Data protection impact assessments for high-risk transfers"
    ]
  },
  {
    title: "Children's Privacy",
    icon: Shield,
    content: "Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately."
  },
  {
    title: "Changes to This Policy",
    icon: FileText,
    content: "We may update this privacy policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or prominent notice on our platform. Continued use after changes constitutes acceptance."
  }
];

const Breadcrumb = () => (
  <nav className="relative z-20 flex items-center justify-center pt-30 sm:pt-32 px-4 pointer-events-auto">
    <ol className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
      <li className="flex items-center">
        <Link href="/product/" className="text-slate-400 hover:text-indigo-400 transition-colors">
          <Home size={14} />
        </Link>
      </li>
      <li className="flex items-center text-slate-700">
        <ChevronRight size={12} />
      </li>
      <li className="flex items-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white-400/80 cursor-default">
          Privacy-Policy
        </span>
      </li>
    </ol>
  </nav>
);


export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
        <Navbar/>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-blue-900/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
        <Breadcrumb/>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-8">
          <div className="text-center space-y-6 sm:space-y-8 mt-0 md:pt-32">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">Legal Compliance</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r italic font-extrabold from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Privacy Policy
              </span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-400 px-4 mb-0 md:mb-24">
              Last Updated: January 24, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx} className="space-y-6">
                {/* Section Header */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-600 p-0.5 flex-shrink-0">
                    <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {section.title}
                    </h2>
                    
                    {section.content && (
                      <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                        {section.content}
                      </p>
                    )}
                  </div>
                </div>

                {/* Details List */}
                {section.details && (
                  <div className="ml-0 sm:ml-16 space-y-3">
                    {section.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-3 text-sm sm:text-base text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subsections */}
                {section.subsections && (
                  <div className="ml-0 sm:ml-16 space-y-6">
                    {section.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                          {sub.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                          {sub.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Note */}
                {section.note && (
                  <div className="ml-0 sm:ml-16 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-blue-300 leading-relaxed">
                      <strong>Note:</strong> {section.note}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 border-t border-blue-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 rounded-3xl p-8 sm:p-12 lg:p-16 border border-blue-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
            
            <div className="relative space-y-6 sm:space-y-8">
              <Mail className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-blue-400" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Questions About Privacy?
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                Contact our compliance team for any privacy-related inquiries
              </p>
              <div className="pt-4">
                <a 
                  href="mailto:info@careerlabconsulting.com"
                  className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-colors text-sm sm:text-base"
                >
                  Email Compliance Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}