export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string; // SVG path data
  accentColor: string;
  glowColor: string;
}

export const products: Product[] = [
  {
    id: "manee",
    name: "MANEE",
    tagline: "Omnichannel AI Communication Officer",
    description: "A unified AI layer across every communication channel — autonomous, always on.",
    features: [
      "Handles WhatsApp, Email, Calls & Web",
      "AI Voice Automation",
      "Smart Lead Qualification",
      "Sentiment Detection",
      "24/7 Autonomous Conversations",
    ],
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    accentColor: "rgba(59,130,246,1)",
    glowColor: "rgba(59,130,246,0.15)",
  },
  {
    id: "crmx",
    name: "CRM-X",
    tagline: "Autonomous Growth Engine",
    description: "AI-native CRM that doesn't just track growth — it engineers it.",
    features: [
      "AI Marketing Automation",
      "Content Generation Engine",
      "Auto Funnel Optimization",
      "Lead Scoring & Nurturing",
      "Website Builder Integration",
    ],
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    accentColor: "rgba(99,102,241,1)",
    glowColor: "rgba(99,102,241,0.15)",
  },
  {
    id: "lmsx",
    name: "LMS-X",
    tagline: "Immersive Learning Intelligence",
    description: "Learning infrastructure that adapts, evolves, and certifies at enterprise scale.",
    features: [
      "AR/VR 3D Learning Environment",
      "In-house Code Editor",
      "Personalized AI Mentor",
      "Adaptive Learning Paths",
      "Skill Analytics & Certification",
    ],
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    accentColor: "rgba(79,148,255,1)",
    glowColor: "rgba(79,148,255,0.15)",
  },
  {
    id: "edux",
    name: "EDUX",
    tagline: "Complete AI Infrastructure for Institutions",
    description: "The operating system for modern educational institutions — from admission to alumni.",
    features: [
      "ERP + CRM + LMS",
      "Admission Automation",
      "AI Voice Communication",
      "Student Analytics",
      "Campus Operations Automation",
    ],
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    accentColor: "rgba(129,140,248,1)",
    glowColor: "rgba(129,140,248,0.15)",
  },
  {
    id: "twinx",
    name: "TWINX",
    tagline: "Intelligent AI Executive Assistant",
    description: "Your digital twin — context-aware, decision-ready, always briefed.",
    features: [
      "Role-Based AI Intelligence",
      "CEO Business Reports",
      "Real-Time Dashboard Insights",
      "Predictive Decision Support",
      "Context-Aware Assistance",
    ],
    icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
    accentColor: "rgba(59,130,246,1)",
    glowColor: "rgba(59,130,246,0.15)",
  },
  {
    id: "legalos",
    name: "LEGALOS",
    tagline: "Autonomous Legal Intelligence",
    description: "Legal compliance and documentation — automated, monitored, bulletproof.",
    features: [
      "Agreement Drafting",
      "Compliance Monitoring",
      "Hiring Documentation",
      "Risk Analysis",
      "Smart Contract Automation",
    ],
    icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
    accentColor: "rgba(99,102,241,1)",
    glowColor: "rgba(99,102,241,0.15)",
  },
  {
    id: "erpx",
    name: "ERPX",
    tagline: "Autonomous Finance Command Center",
    description: "Finance operations on autopilot — from payroll to forecasting, handled by AI.",
    features: [
      "Budget Planning",
      "Expense & Payroll Automation",
      "Revenue Forecasting",
      "Tax & GST Insights",
      "Financial Reporting AI",
    ],
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
    accentColor: "rgba(79,148,255,1)",
    glowColor: "rgba(79,148,255,0.15)",
  },
  {
    id: "hrx",
    name: "HRX",
    tagline: "AI Recruitment & Interview System",
    description: "Hire 10x faster. Let AI screen, interview, and rank — with zero bias.",
    features: [
      "AI Candidate Screening",
      "Virtual Avatar Interviews",
      "Behavioral Analysis",
      "Skill Evaluation Engine",
      "Smart Candidate Ranking",
    ],
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    accentColor: "rgba(129,140,248,1)",
    glowColor: "rgba(129,140,248,0.15)",
  },
  {
    id: "suppx",
    name: "SUPPX",
    tagline: "Autonomous Support Intelligence",
    description: "Global-scale customer support that never sleeps, never scales costs.",
    features: [
      "Multi-Industry Support",
      "Voice + Chat + Email",
      "Automated Ticket Resolution",
      "24/7 AI Agents",
      "Scalable Global Support",
    ],
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    accentColor: "rgba(59,130,246,1)",
    glowColor: "rgba(59,130,246,0.15)",
  },
];