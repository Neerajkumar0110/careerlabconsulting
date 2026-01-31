'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script'; 
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { 
  Terminal, Database, Activity, Cpu, Bot, Rocket, 
  Shield, Lock, CheckCircle2, XCircle, ChevronRight, 
  Globe, Briefcase, GraduationCap, Layers, Search, 
  Users, Coins, Zap, Code2, 
  Layout, Server, BrainCircuit, Network, Trophy, 
  FileCheck, Medal, Timer, Play, ChevronDown, Plus,
  TrendingUp, Wallet, AlertTriangle, Check, X,
  Target, BarChart3, Fingerprint, Laptop, UserCheck, 
  RefreshCw, Home
} from 'lucide-react';

// --- DATA CONSTANTS ---

const personasData = [
  {
    title: "Students & Freshers",
    desc: "No prior coding required. Structured entry into AI with portfolio readiness.",
    icon: <GraduationCap className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Tech Professionals",
    desc: "Transition into GenAI & MLOps. Work on real agentic systems.",
    icon: <Laptop className="w-6 h-6 text-purple-400" />
  },
  {
    title: "Non-Tech Professionals",
    desc: "Learn AI tools, automation & workflows. No heavy math/theory overload.",
    icon: <UserCheck className="w-6 h-6 text-green-400" />
  },
  {
    title: "Career Re-starters",
    desc: "Weekend-only model. Practical, skill-first approach to return to work.",
    icon: <RefreshCw className="w-6 h-6 text-orange-400" />
  }
];

const careerGrowthData = {
  india: [
    { year: "Year 1", role: "Jr. AI Engineer", ctc: "₹4L - ₹7L", h: "25%", color: "from-slate-600 to-slate-500" },
    { year: "Year 2", role: "AI Engineer / Backend", ctc: "₹7L - ₹12L", h: "45%", color: "from-blue-900 to-blue-700" },
    { year: "Year 3", role: "Sr. ML Engineer", ctc: "₹12L - ₹18L", h: "65%", color: "from-blue-700 to-blue-500" },
    { year: "Year 5", role: "AI Architect", ctc: "₹25L - ₹50L+", h: "90%", color: "from-blue-500 to-cyan-400" },
  ],
  global: [
    { year: "Year 1", role: "Remote AI Dev", ctc: "$5K - $8K", h: "25%", color: "from-slate-600 to-slate-500" },
    { year: "Year 2", role: "AI Engineer", ctc: "$8K - $12K", h: "45%", color: "from-green-900 to-green-700" },
    { year: "Year 3", role: "Sr. AI Engineer", ctc: "$15K - $40K", h: "65%", color: "from-green-700 to-green-500" },
    { year: "Year 5", role: "Global AI Lead", ctc: "$60K - $100K+", h: "90%", color: "from-green-500 to-emerald-400" },
  ]
};

const BrandIcons = {
  Python: () => (
    <svg viewBox="0 0 256 256" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M126.916 0C66.14 0 54.815 27.283 54.815 27.283V56.78H109.9V47.518H145.42V78.705H37.513C37.513 78.705 0 78.077 0 134.417C0 190.757 33.129 187.319 33.129 187.319H62.96V156.463C62.96 156.463 61.464 120.375 99.492 120.375H154.545C154.545 120.375 192.176 118.814 192.176 80.363C192.176 41.912 187.265 0 126.916 0ZM96.53 20.485C102.13 20.485 106.666 25.02 106.666 30.62C106.666 36.22 102.13 40.755 96.53 40.755C90.93 40.755 86.395 36.22 86.395 30.62C86.395 25.02 90.93 20.485 96.53 20.485Z" fill="#3776AB"/>
      <path d="M129.084 256C189.86 256 201.185 228.717 201.185 228.717V199.22H146.1V208.482H110.58V177.295H218.487C218.487 177.295 256 177.923 256 121.583C256 65.243 222.871 68.681 222.871 68.681H193.04V99.537C193.04 99.537 194.536 135.625 156.508 135.625H101.455C101.455 135.625 63.824 137.186 63.824 175.637C63.824 214.088 68.735 256 129.084 256ZM159.47 235.515C153.87 235.515 149.334 230.98 149.334 225.38C149.334 219.78 153.87 215.245 159.47 215.245C165.07 215.245 169.605 219.78 169.605 225.38C169.605 230.98 165.07 235.515 159.47 235.515Z" fill="#FFD43B"/>
    </svg>
  ),
  OpenAI: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.0462 6.0462 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1195 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.453l-.142.0805L8.704 5.4596a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l3.8556-2.2086 3.8556 2.2086v4.4172l-3.8556 2.2086-3.8556-2.2086z"/>
    </svg>
  ),
  LangChain: () => (
    <div className="w-12 h-12 flex items-center justify-center">
        <span className="text-3xl">🦜</span>
    </div>
  ),
  GitHub: () => (
    <svg viewBox="0 0 98 96" className="w-12 h-12" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#ffffff"/>
    </svg>
  ),
  SQL: () => (
    <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
       <span className="font-black text-blue-600 text-xl">SQL</span>
    </div>
  ),
  Zapier: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12H13.5V4L20 12H10.5V20L4 12Z" fill="#FF4F00"/>
    </svg>
  ),
  PyTorch: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M12.9 22.8C12.9 22.8 11.4 22.8 10.3 21.6C9.2 20.4 9.2 18.7 9.8 17.5L12.5 12.2L11 9.3L7.7 15.8C7.1 17 6.8 18.3 7 19.6C7.2 21 8 22.2 9.2 23.1C10.4 24 11.9 24.4 13.4 24.3C14.9 24.1 16.2 23.5 17.2 22.5L16 21.3C15.2 22.2 14.1 22.7 12.9 22.8ZM16.3 17.6L14.4 13.9L12.9 16.8L15.6 20.3C16.1 20.1 16.5 19.8 16.9 19.4C17.3 19 17.5 18.5 17.7 18L16.3 17.6ZM8.1 7.2L5.4 12.5C4.8 13.7 4.8 15.3 5.9 16.5C7 17.7 8.5 17.7 8.5 17.7L9.7 18.9C9.7 18.9 9.2 18.8 8.6 18.6C8 18.4 7.4 18 6.9 17.5C5.8 16.4 5.3 14.8 5.5 13.3C5.7 11.7 6.6 10.4 7.9 9.5L8.1 7.2ZM12.7 1.2C12.7 1.2 14.2 1.2 15.3 2.4C16.4 3.6 16.4 5.3 15.8 6.5L13.1 11.8L14.6 14.7L17.9 8.2C18.5 7 18.8 5.7 18.6 4.4C18.4 3 17.6 1.8 16.4 0.9C15.2 0 13.7 -0.4 12.2 -0.3C10.7 -0.1 9.4 0.5 8.4 1.5L9.6 2.7C10.4 1.8 11.5 1.3 12.7 1.2ZM9.3 6.4L11.2 10.1L12.7 7.2L10 3.7C9.5 3.9 9.1 4.2 8.7 4.6C8.3 5 8.1 5.5 7.9 6L9.3 6.4ZM17.5 16.8L20.2 11.5C20.8 10.3 20.8 8.7 19.7 7.5C18.6 6.3 17.1 6.3 17.1 6.3L15.9 5.1C15.9 5.1 16.4 5.2 17 5.4C17.6 5.6 18.2 6 18.7 6.5C19.8 7.6 20.3 9.2 20.1 10.7C19.9 12.3 19 13.6 17.7 14.5L17.5 16.8Z" fill="#EE4C2C"/>
    </svg>
  ),
  FastAPI: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.38 0 0 5.38 0 12C0 18.62 5.38 24 12 24C18.62 24 24 18.62 24 12C24 5.38 18.62 0 12 0ZM11.16 19.5L10.04 12.82H6.96L12.84 4.5L13.96 11.18H17.04L11.16 19.5Z" fill="#009688"/>
    </svg>
  )
};

const industryDomains = [
  { 
    title: "FinTech", 
    desc: "Lead Scoring & Fraud", 
    icon: <Coins className="w-8 h-8 mx-auto text-yellow-400 mb-2" /> 
  },
  { 
    title: "EdTech", 
    desc: "AI Tutors & Content", 
    icon: <GraduationCap className="w-8 h-8 mx-auto text-blue-400 mb-2" /> 
  },
  { 
    title: "HRTech", 
    desc: "Resume Screening", 
    icon: <Users className="w-8 h-8 mx-auto text-pink-400 mb-2" /> 
  },
  { 
    title: "D2C/Retail", 
    desc: "Customer Automation", 
    icon: <Globe className="w-8 h-8 mx-auto text-green-400 mb-2" /> 
  },
  { 
    title: "HealthTech", 
    desc: "Diagnosis & Prediction", 
    icon: <Activity className="w-8 h-8 mx-auto text-red-400 mb-2" /> 
  },
  { 
    title: "CyberSec", 
    desc: "Threat Detection AI", 
    icon: <Shield className="w-8 h-8 mx-auto text-indigo-400 mb-2" /> 
  },
  { 
    title: "Supply Chain", 
    desc: "Route Optimization", 
    icon: <Network className="w-8 h-8 mx-auto text-orange-400 mb-2" /> 
  },
  { 
    title: "Media & Ent.", 
    desc: "RecSys & GenAI", 
    icon: <Play className="w-8 h-8 mx-auto text-purple-400 mb-2" /> 
  }
];

const foundationSyllabus = [
  {
    month: "Month 1",
    title: "Programming & AI Foundations",
    topics: ["Python Fundamentals & Modular Coding", "Data Structures (Lists, Dicts, Tuples)", "Debugging & Clean Coding Standards", "Git & GitHub Basics"],
    project: "Python Utility & Data Automation Tool",
    icon: <Terminal className="w-6 h-6 text-blue-400" />
  },
  {
    month: "Month 2",
    title: "Data Handling & SQL",
    topics: ["Data Lifecycle in AI Projects", "SQL (Joins, Subqueries, CRUD)", "Python + SQL Integration", "Data Cleaning Pipelines"],
    project: "Analytics-Ready Dataset Pipeline",
    icon: <Database className="w-6 h-6 text-purple-400" />
  },
  {
    month: "Month 3",
    title: "Applied Math & Statistics",
    topics: ["Mean, Median, Variance, Distributions", "Feature Scaling & Normalization", "Bias-Variance Intuition", "Data Leakage Prevention"],
    project: "Insight Generation & Analysis Tool",
    icon: <Activity className="w-6 h-6 text-emerald-400" />
  },
  {
    month: "Month 4",
    title: "Machine Learning Foundations",
    topics: ["Supervised Learning (Regression/Classification)", "Unsupervised Learning Basics", "Model Evaluation Metrics", "Overfitting & Validation Logic"],
    project: "Predictive ML System (Lead Scoring)",
    icon: <Cpu className="w-6 h-6 text-orange-400" />
  },
  {
    month: "Month 5",
    title: "NLP & LLMs (GenAI)",
    topics: ["Tokenization & Vector Basics", "Prompt Engineering (Practical)", "GPT APIs & LLM Workflows", "Intro to RAG (Conceptual)"],
    project: "Chatbot & Content Automation Tool",
    icon: <Bot className="w-6 h-6 text-pink-400" />
  },
  {
    month: "Month 6",
    title: "AI Applications & Deployment",
    topics: ["High-Level AI System Architecture", "APIs using Flask/FastAPI", "Connecting ML/LLMs to Apps", "GitHub Documentation"],
    project: "End-to-End Deployed AI Micro-service",
    icon: <Rocket className="w-6 h-6 text-cyan-400" />
  }
];

const eliteSyllabus = [
  {
    month: "Month 7",
    title: "Advanced ML Engineering",
    topics: ["End-to-end ML Pipeline Design", "Feature Engineering & Validation", "Experiment Tracking", "Model Packaging"],
    project: "Production-Style ML Pipeline (FinTech/D2C)",
    icon: <Layout className="w-6 h-6 text-indigo-400" />
  },
  {
    month: "Month 8",
    title: "MLOps & AI Systems",
    topics: ["CI/CD for ML Workflows", "Model Monitoring & Drift Detection", "Retraining Strategies", "Docker & Containerization"],
    project: "Monitored ML System with Alerts",
    icon: <Server className="w-6 h-6 text-indigo-400" />
  },
  {
    month: "Month 9",
    title: "Deep Learning Engineering",
    topics: ["Neural Network Foundations", "PyTorch Training Loops", "CNN Architectures", "Transfer Learning"],
    project: "Deep Learning Model Deployment (Vision/Text)",
    icon: <BrainCircuit className="w-6 h-6 text-indigo-400" />
  },
  {
    month: "Month 10",
    title: "GenAI Systems & RAG",
    topics: ["Embeddings & Vector Databases", "Retrieval Augmented Generation (RAG)", "Prompt Engineering as a System"],
    project: "Enterprise-Grade RAG Application",
    icon: <Bot className="w-6 h-6 text-indigo-400" />
  },
  {
    month: "Month 11",
    title: "Agentic AI & Multi-Agent Systems",
    topics: ["Agent Architectures (ReAct, Planning)", "LangChain & LangGraph", "Multi-Agent Coordination", "Tool-Using Agents"],
    project: "Multi-Agent AI Workflow Automation",
    icon: <Network className="w-6 h-6 text-indigo-400" />
  },
  {
    month: "Month 12",
    title: "LLMOps & Scaling",
    topics: ["LLM Evaluation & Monitoring", "Cost Optimization & Scaling", "Security & Access Control", "Final Defense"],
    project: "Enterprise AI System Delivery",
    icon: <Globe className="w-6 h-6 text-indigo-400" />
  }
];

const competitorData = {
    headers: ["Key Feature", "InternX-AI", "Internshala", "Forage", "LinkedIn Learning", "Springboard", "Career Foundry", "Scaler", "Microverse"],
    rows: [
        { feature: "Real Startup Projects", values: ["yes", "no", "no", "no", "limited", "simulated", "partial", "yes"] },
        { feature: "GitHub Portfolio", values: ["yes", "no", "no", "no", "optional", "manual", "yes", "yes"] },
        { feature: "ResumeNFT Proof Credentials", values: ["yes", "no", "no", "no", "no", "no", "no", "no"] },
        { feature: "Global Startup Exposure", values: ["yes", "no", "no", "limited", "no", "limited", "no", "yes"] },
        { feature: "Legal Job Guarantee (Elite)", values: ["yes", "no", "no", "no", "yes", "no", "conditional", "no"] },
        { feature: "AI & Agentic Workflows", values: ["yes", "no", "no", "no", "limited", "no", "no", "no"] },
        { feature: "1:1 Mentorship", values: ["weekly", "no", "no", "no", "yes", "yes", "yes", "yes"] },
        { feature: "Entry Pricing (India)", values: ["₹50K-₹1L", "₹2K-₹5K", "₹5L+", "₹1-2K/mo", "₹6.5L+", "₹6L+", "₹2.5L+", "₹12L (ISA)"] },
    ]
};

const splitComparisons = {
    roles: [
        { foundation: "Junior AI Developer", elite: "AI / ML Engineer" },
        { foundation: "AI Intern", elite: "GenAI Engineer" },
        { foundation: "Prompt Engineer (Entry)", elite: "Agentic AI Engineer" },
        { foundation: "AI Support Engineer", elite: "AI Systems Engineer" },
        { foundation: "Automation Assistant", elite: "AI Architect (Growth path)" },
    ],
    ctc: {
        india: [
            { year: "Year 1", foundation: "₹4–6 LPA", elite: "₹9–12 LPA" },
            { year: "Year 2", foundation: "₹6–9 LPA", elite: "₹12–15 LPA" },
            { year: "Year 3", foundation: "₹9–12 LPA", elite: "₹15–20 LPA" },
            { year: "Year 4", foundation: "₹12–15 LPA", elite: "₹20–30 LPA" },
            { year: "Year 5", foundation: "₹15–20+ LPA", elite: "₹30–50+ LPA" },
        ],
        global: [
            { year: "Year 1", foundation: "$5K–8K", elite: "$10K–15K" },
            { year: "Year 2", foundation: "$8K–12K", elite: "$16K–25K" },
            { year: "Year 3", foundation: "$12K–15K", elite: "$25K–40K" },
            { year: "Year 4", foundation: "$15K–20K", elite: "$40K–60K" },
            { year: "Year 5", foundation: "$20K–30K+", elite: "$60K–100K+" },
        ]
    },
    tools: [
        { tool: "Python", foundation: "Yes", elite: "Advanced" },
        { tool: "SQL", foundation: "Yes", elite: "Advanced" },
        { tool: "ML Libraries", foundation: "Basics", elite: "Production-grade" },
        { tool: "PyTorch", foundation: "Intro only", elite: "Deep usage" },
        { tool: "GPT / LLM APIs", foundation: "Usage", elite: "Engineering" },
        { tool: "LangChain / LangGraph", foundation: "No", elite: "Yes" },
        { tool: "Vector Databases", foundation: "No", elite: "Yes" },
        { tool: "MLOps", foundation: "No", elite: "Yes" },
        { tool: "LLM Ops", foundation: "No", elite: "Yes" },
    ],
    projects: [
        { aspect: "Project Type", foundation: "Guided", elite: "Guided + Custom" },
        { aspect: "Industry Problems", foundation: "Yes", elite: "Advanced" },
        { aspect: "Difficulty Level", foundation: "Entry", elite: "Enterprise-grade" },
        { aspect: "GitHub Depth", foundation: "Basic", elite: "Full system repos" },
        { aspect: "Live Defense", aspectType: "bad", foundation: "Limited", elite: "Mandatory" },
        { aspect: "Anti-Cheat Controls", aspectType: "warn", foundation: "Medium", elite: "Very Strong" },
    ],
    features: [
        { feature: "Live Learning", foundation: "Yes (Weekend syllabus)", elite: "Yes" },
        { feature: "Weekday Practice Sessions", foundation: "Complimentary", elite: "Included" },
        { feature: "Real Industry Projects", foundation: "Guided", elite: "Guided + Custom" },
        { feature: "Custom Project Selection", foundation: "No", elite: "Yes" },
        { feature: "AI Lab Access", foundation: "No", elite: "Yes" },
        { feature: "Personal AI Assistant", foundation: "No", elite: "Yes" },
        { feature: "ResumeNFT", foundation: "Foundation tier", elite: "Advanced tier" },
        { feature: "Interview Opportunities", foundation: "Multiple", elite: "Unlimited till selection" },
        { feature: "Global Hiring Exposure", foundation: "Limited", elite: "Strong" },
    ],
    usps: [
        { usp: "Beginner Friendly", foundation: "Very High", elite: "Moderate" },
        { usp: "Engineering Depth", foundation: "Basic", elite: "Advanced" },
        { usp: "Proof-Based Hiring", foundation: "Yes", elite: "Strong" },
        { usp: "Real Industry Exposure", foundation: "Guided", elite: "Custom" },
        { usp: "Career Acceleration", foundation: "Entry", elite: "Fast-track" },
        { usp: "Elite Branding", foundation: "No", elite: "Yes" }
    ],
    fees: [
        { item: "Program Fee (India)", foundation: "₹1,49,999", elite: "₹2,49,999" },
        { item: "Program Fee (Global)", foundation: "~$2,000", elite: "~$3,000" },
        { item: "Scholarship (Test-based)", foundation: "Up to 30%", elite: "Up to 40%" },
        { item: "EMI (India Only)", foundation: "Available", elite: "Available" }
    ]
};

const ecosystem = [
  { title: "Products", desc: "AI SaaS Platforms (Sales, Marketing)", icon: <Layers /> },
  { title: "Services", desc: "Enterprise AI & GenAI Solutions", icon: <Briefcase /> },
  { title: "Job Portal", desc: "HireX AI-Focused Hiring Platform", icon: <Search /> },
  { title: "Freelancing", desc: "AI & Tech Project Marketplace", icon: <Globe /> },
  { title: "EdTech", desc: "Foundation → Elite Programs", icon: <GraduationCap /> },
];

const tools = [
  { name: "Python", icon: <BrandIcons.Python />, desc: "Core language for AI." },
  { name: "OpenAI API", icon: <BrandIcons.OpenAI />, desc: "Build GenAI apps." },
  { name: "LangChain", icon: <BrandIcons.LangChain />, desc: "Chain AI reasoning." },
  { name: "GitHub", icon: <BrandIcons.GitHub />, desc: "Portfolio proof." },
  { name: "SQL", icon: <BrandIcons.SQL />, desc: "Data handling." },
  { name: "Zapier/Make", icon: <BrandIcons.Zapier />, desc: "No-code automation." },
  { name: "PyTorch", icon: <BrandIcons.PyTorch />, desc: "Deep Learning." },
  { name: "FastAPI", icon: <BrandIcons.FastAPI />, desc: "Deploy AI APIs." }
];

const gamificationData = [
  {
    id: "quizzes",
    label: "Weekly Quizzes",
    icon: <Timer className="w-5 h-5" />,
    title: "Structured Knowledge Checks",
    desc: "Every weekend session ends with a rapid-fire quiz to cement your Python and AI concepts immediately.",
    stat: "24+ Quizzes",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    video: "https://www.pexels.com/download/video/4487958/" 
  },
  {
    id: "tests",
    label: "Surprise Tests",
    icon: <Zap className="w-5 h-5" />,
    title: "Real-World Readiness",
    desc: "Random pop-quizzes simulating urgent client requirements or bug fixes. Keeps you interview-ready at all times.",
    stat: "Randomized",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    video: "https://www.pexels.com/download/video/6985525/"
  },
  {
    id: "leaderboards",
    label: "Leaderboards",
    icon: <Trophy className="w-5 h-5" />,
    title: "Competitive Ranking",
    desc: "Top performers get featured visibility with our hiring partners. Compete on code quality, not just speed.",
    stat: "Global Rank",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    video: "https://www.pexels.com/download/video/8136082/"
  },
  {
    id: "rewards",
    label: "ResumeNFT",
    icon: <Medal className="w-5 h-5" />,
    title: "Verifiable On-Chain Proof",
    desc: "Unlock permanent proof of your skills. Every module cleared mints a new block on your ResumeNFT.",
    stat: "Blockchain Verified",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    video: "https://www.pexels.com/download/video/7014805/"
  }
];

const faqs = [
  { q: "Is there a job guarantee?", a: "No. We offer 'Performance-Based Hiring'. Elite graduates get unlimited interviews, but selection depends on your skills and the interview." },
  { q: "Is Foundation compulsory for Elite?", a: "Yes. Unless you can pass the direct entry test (reserved for experienced devs), Foundation is the mandatory eligibility layer." },
  { q: "Do I need prior coding experience?", a: "No. Foundation starts from zero (Variables, Loops) and builds you up to building AI apps." },
  { q: "What happens if I fail the Unified Test?", a: "You receive the Foundation certificate but cannot proceed to Elite. You can re-attempt after remediation." },
  { q: "How do the weekend classes work?", a: "Classes are live on Saturday & Sunday. Weekdays (Mon-Fri) are for optional practice sessions and mentor support." }
];

const hiringPartners = ["Zapier", "Notion", "Turing", "Freshworks", "Loom", "OutSystems", "HubSpot", "Monday.com"];


// --- COMPONENT ---

export default function InternXAIPage() {
  const [activeTab, setActiveTab] = useState('foundation');
  const [activeGamification, setActiveGamification] = useState(gamificationData[0]);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [comparisonCategory, setComparisonCategory] = useState<'features' | 'tools' | 'roles' | 'projects' | 'ctc' | 'usps' | 'fees'>('features');
  const [earningsRegion, setEarningsRegion] = useState<'india' | 'global'>('india');

  const handlePayment = (planName: string, amount: number) => {
    if (typeof window === 'undefined' || !(window as any).Razorpay) {
      alert("Payment gateway failed to load. Please refresh.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
      amount: amount * 100, 
      currency: "INR",
      name: "InternX AI",
      description: `Enrollment for ${planName}`,
      image: "https://careerlabconsulting.com/logo.png",
      handler: function (response: any) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "",
        email: "",
        contact: ""
      },
      theme: {
        color: "#2563EB"
      }
    };

    const rzp1 = new (window as any).Razorpay(options);
    rzp1.open();
  };

  // Helper to render check/cross/text for competitor table
  const renderCompetitorValue = (val: string) => {
      const v = val.toLowerCase();
      if (v === 'yes' || v === 'weekly') return <Check className="w-5 h-5 text-green-500 mx-auto" strokeWidth={3} />;
      if (v === 'no') return <X className="w-5 h-5 text-red-500 mx-auto opacity-70" />;
      if (v === 'limited' || v === 'simulated' || v === 'partial' || v === 'optional' || v === 'manual' || v === 'conditional') {
          return (
            <div className="flex flex-col items-center gap-1">
                 <AlertTriangle className="w-4 h-4 text-yellow-500" />
                 <span className="text-[10px] text-yellow-500 font-bold uppercase">{val}</span>
            </div>
          );
      }
      return <span className="text-xs font-bold text-slate-300">{val}</span>;
  };

  return (
    <div className="bg-[#020617] min-h-screen flex flex-col font-sans text-slate-100 overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
      <B2CHeader />
      
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <main className="flex-grow">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-10 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
          
          <article className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-in fade-in slide-in-from-bottom-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-blue-400">Foundation → Elite Pathway</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight text-white">
              InternX-AI<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Foundation
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-slate-300 text-lg leading-relaxed mb-10 px-2">
              A 6-month, weekend-only AI program to build <strong>real projects</strong>, 
              earn <strong>ResumeNFT™ proof</strong>, and become eligible for Elite AI roles.
              <span className="block mt-4 text-xs md:text-sm text-slate-500 font-medium tracking-wide">
                PROJECTS → PROOF → INTERVIEWS → ELITE ELIGIBILITY
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="#pricing" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 hover:scale-105 active:scale-95 duration-200">
                <Rocket className="w-5 h-5" /> Download Syllabus
              </Link>
              <Link href="#eligibility" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 duration-200">
                <FileCheck className="w-5 h-5" /> Check Elite Eligibility
              </Link>
            </div>

            {/* UPDATED STATS FROM PDF PAGE 16 */}
            <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-80">
              {[
                { val: "15,000+", label: "Learners Trained" },
                { val: "11.80 LPA", label: "Avg CTC (India)" },
                { val: "88%", label: "Job Conversion Rate" },
                { val: "260+", label: "Hiring Startups" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-xl md:text-2xl font-black text-white">{stat.val}</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* --- POSITIONING STATEMENT (VISUAL BLOCK) --- */}
        <section className="py-12 px-6">
            <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-y border-white/10 p-8 md:p-12 text-center rounded-3xl backdrop-blur-sm">
                <h2 className="text-2xl md:text-4xl font-black italic text-white mb-6">
                    "Real AI Careers. Built with Projects. Verified with Proof. Hired with Confidence."
                </h2>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    <span className="flex items-center gap-2 text-slate-300 font-bold"><XCircle className="text-red-500 w-5 h-5"/> No course fatigue</span>
                    <span className="flex items-center gap-2 text-slate-300 font-bold"><XCircle className="text-red-500 w-5 h-5"/> No fake resumes</span>
                    <span className="flex items-center gap-2 text-white font-bold"><CheckCircle2 className="text-green-500 w-5 h-5"/> Only proof-driven careers</span>
                </div>
            </div>
        </section>

         {/* --- WHO IS THIS FOR (PERSONAS) --- */}
        <section className="py-20 px-6">
             <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-black uppercase text-white mb-4">Who is InternX-AI For?</h2>
                     <p className="text-slate-400">Designed for serious career builders across all backgrounds.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {personasData.map((p, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-blue-500/50 transition-all hover:-translate-y-1">
                            <div className="bg-slate-900 p-3 rounded-lg w-fit mb-4">{p.icon}</div>
                            <h3 className="font-bold text-white text-lg mb-2">{p.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                        </div>
                    ))}
                </div>
             </div>
        </section>

        {/* --- PRICING --- */}
        <section id="pricing" className="py-24 px-6 bg-[#03081a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black uppercase text-white">Program Fees</h2>
              <p className="text-slate-400">Scholarships up to 30% available based on test performance.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition-all group relative">
                <h3 className="text-2xl font-bold mb-2 text-white">Foundation</h3>
                <p className="text-slate-400 text-sm mb-6">6 Months • Beginner Friendly</p>
                <div className="flex items-end gap-2 mb-1">
                  <div className="text-4xl font-black text-white">₹1,49,999</div>
                  <div className="text-xl font-bold text-slate-500 mb-1">/ ~$2,000</div>
                </div>
                <div className="mb-6 p-3 bg-blue-500/10 rounded-lg text-xs font-bold text-blue-400 text-center">
                    EMI starts at ₹5,208/month (India Only)
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Weekend Live Classes</li>
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Real Industry Projects</li>
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> ResumeNFT Proof</li>
                </ul>
                <button 
                  onClick={() => handlePayment('Foundation', 149999)}
                  className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10"
                >
                  Apply for Foundation
                </button>
              </div>

              <div className="bg-[#0b0f1f] border border-purple-500/30 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">Career Accelerator</div>
                <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Elite</h3>
                <p className="text-slate-400 text-sm mb-6">12 Months • Full Career Path</p>
                <div className="flex items-end gap-2 mb-1">
                  <div className="text-4xl font-black text-white">₹2,49,999</div>
                  <div className="text-xl font-bold text-slate-500 mb-1">/ ~$3,000</div>
                </div>
                <div className="mb-6 p-3 bg-purple-500/10 rounded-lg text-xs font-bold text-purple-400 text-center">
                    Includes Foundation + Advanced Layer
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> <strong>Everything in Foundation</strong></li>
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Advanced MLOps & GenAI</li>
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Enterprise-Grade Projects</li>
                </ul>
                <button 
                  onClick={() => handlePayment('Elite', 249999)}
                  className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20"
                >
                  Check Elite Eligibility
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- PROBLEM STATEMENT --- */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl mb-8">
                <h3 className="text-red-400 font-black uppercase tracking-widest text-sm mb-4">The Problem</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-slate-300 text-sm md:text-base"><XCircle className="w-5 h-5 text-red-500 shrink-0" /> Most learners jump straight into advanced AI and fail.</li>
                  <li className="flex gap-3 text-slate-300 text-sm md:text-base"><XCircle className="w-5 h-5 text-red-500 shrink-0" /> Certificates without proof don&apos;t help in hiring.</li>
                  <li className="flex gap-3 text-slate-300 text-sm md:text-base"><XCircle className="w-5 h-5 text-red-500 shrink-0" /> Recruiters care about what you&apos;ve built, not what you&apos;ve watched.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">The Foundation Philosophy</h2>
                <p className="text-slate-400 mb-6 text-sm md:text-base">Foundation is not the destination. It is the qualification layer for Elite. We start from zero, build fundamentals correctly, and create verifiable proof.</p>
                <div className="p-4 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-lg">
                  <p className="text-blue-400 font-bold text-sm md:text-base">&quot;Foundation is the eligibility layer. Elite is the acceleration layer.&quot;</p>
                </div>
              </div>
            </div>
            
            {/* UPDATED LEARNING JOURNEY (Timeline Style as per PDF p. 16) */}
            <div className="relative border border-white/10 rounded-3xl p-6 md:p-8 bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
              <h3 className="text-white font-bold mb-6 text-center border-b border-white/10 pb-4">Career Roadmap</h3>
              <div className="space-y-0">
                {[
                  { title: "Learner", desc: "Start with zero coding knowledge" },
                  { title: "Builder", desc: "Ship real industry projects" },
                  { title: "Portfolio Pro", desc: "Publish to GitHub & ResumeNFT" },
                  { title: "Interview Ready", desc: "Crack technical rounds" },
                  { title: "Elite Eligible", desc: "Unlock Advanced AI Careers" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white group-hover:scale-110 transition-transform shrink-0 z-10 border-4 border-slate-900">
                            {i + 1}
                        </div>
                        {i !== 4 && <div className="w-0.5 h-12 bg-white/10 group-hover:bg-blue-500/50 transition-colors"></div>}
                    </div>
                    <div className="pb-8">
                        <h4 className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">{item.title}</h4>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- SYLLABUS --- */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-12 overflow-x-auto pb-4 no-scrollbar">
              <div className="flex space-x-4 min-w-max px-2">
                <button 
                  onClick={() => setActiveTab('foundation')}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'foundation' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-white/5 text-slate-400 border border-white/10'}`}
                >
                  Foundation (Months 1-6)
                </button>
                <button 
                  onClick={() => setActiveTab('elite')}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'elite' ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40' : 'bg-white/5 text-slate-400 border border-white/10'}`}
                >
                  Elite (Months 7-12)
                </button>
              </div>
            </div>

            {activeTab === 'foundation' ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                  <div>
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-white">Foundation Syllabus</h2>
                    <p className="text-blue-400 font-bold uppercase tracking-widest mt-2 text-sm">Weekend-Only • Assessed • Certified</p>
                  </div>
                  <div className="flex flex-col gap-2">
                      <span className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-xs font-bold border border-green-500/20 text-center">
                        Beginner Friendly • No Coding Required
                      </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {foundationSyllabus.map((mod, i) => (
                    <div key={i} className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all group flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-blue-900/20 p-3 rounded-lg text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">{mod.icon}</div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{mod.month}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">{mod.title}</h3>
                      <ul className="space-y-2 mb-6 flex-grow">
                        {mod.topics.map((t, idx) => (
                          <li key={idx} className="flex gap-2 text-xs text-slate-400">
                            <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 shrink-0" /> {t}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-white/5 bg-white/5 -mx-6 -mb-6 p-4 mt-auto">
                        <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Industry Project</p>
                        <p className="text-xs font-bold text-blue-300">{mod.project}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                  <div>
                    <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Elite Syllabus</h2>
                    <p className="text-purple-400 font-bold uppercase tracking-widest mt-2 text-sm">Advanced AI Engineering • System Design</p>
                  </div>
                  <div>
                      <span className="bg-purple-500/10 text-purple-400 px-4 py-2 rounded-full text-xs font-bold border border-purple-500/20">
                        Selection Based Only • Global Readiness
                      </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eliteSyllabus.map((mod, i) => (
                    <div key={i} className="bg-[#0b0f1f] border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/60 transition-all group flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="bg-purple-900/20 p-3 rounded-lg text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">{mod.icon}</div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{mod.month}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">{mod.title}</h3>
                      <ul className="space-y-2 mb-6 flex-grow">
                        {mod.topics.map((t, idx) => (
                          <li key={idx} className="flex gap-2 text-xs text-slate-400">
                            <div className="w-1 h-1 bg-purple-500 rounded-full mt-1.5 shrink-0" /> {t}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t border-white/5 bg-purple-900/10 -mx-6 -mb-6 p-4 mt-auto">
                        <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Enterprise Project</p>
                        <p className="text-xs font-bold text-purple-300">{mod.project}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* --- ELIGIBILITY --- */}
        <section id="eligibility" className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#020617] to-indigo-950/20">
          <div className="max-w-5xl mx-auto border border-blue-500/30 bg-[#03081a] rounded-3xl p-8 md:p-12 relative z-10 shadow-2xl shadow-blue-900/20">
            <div className="absolute top-0 right-0 p-4">
               <Lock className="w-12 h-12 text-white/5" />
            </div>
            
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
                The Qualification <span className="text-blue-500">Gate</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
                Serious learners only. You must pass the <strong>Unified Qualification Test</strong>. 
                This ensures outsourcing and copy-pasting shortcuts do not work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-colors">
                <Code2 className="w-10 h-10 mx-auto text-blue-400 mb-4" />
                <h4 className="font-bold text-white mb-2">Build from Scratch</h4>
                <p className="text-xs text-slate-400">4-6 hour live practical build. You build a real AI app.</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-colors">
                <Shield className="w-10 h-10 mx-auto text-purple-400 mb-4" />
                <h4 className="font-bold text-white mb-2">Anti-Cheat Design</h4>
                <p className="text-xs text-slate-400">Randomized datasets. Group cheating is mathematically impossible.</p>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-green-500/50 transition-colors">
                <Users className="w-10 h-10 mx-auto text-green-400 mb-4" />
                <h4 className="font-bold text-white mb-2">Live Viva Defense</h4>
                <p className="text-xs text-slate-400">Explain your code logic live. Even if the code works.</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-block bg-white/10 px-6 py-3 rounded-xl border border-white/10">
                <p className="font-bold text-white text-sm md:text-base">Outcome: <span className="text-green-400">Pass = Elite Eligible</span> | <span className="text-red-400">Fail = Foundation Cert Only</span></p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-slate-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Earnings Projection</h2>
              <div className="flex justify-center gap-4 mt-6">
                  <button onClick={() => setEarningsRegion('india')} className={`px-4 py-1 rounded-full text-sm font-bold ${earningsRegion === 'india' ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-400'}`}>India (INR)</button>
                  <button onClick={() => setEarningsRegion('global')} className={`px-4 py-1 rounded-full text-sm font-bold ${earningsRegion === 'global' ? 'bg-green-600 text-white' : 'bg-white/10 text-slate-400'}`}>Global (USD)</button>
              </div>
              <p className="text-slate-400 mt-4">Typical career progression for AI Engineers with real project experience.</p>
            </div>
            
            <div className="bg-[#020617] p-8 md:p-12 rounded-3xl border border-white/10 relative shadow-2xl overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <TrendingUp className="w-32 h-32 text-blue-500" />
               </div>

               <div className="flex flex-col gap-8 md:hidden relative z-10 pt-4">
                  {careerGrowthData[earningsRegion].map((item, idx) => (
                    <div key={idx} className="w-full">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{item.year}</span>
                           <span className="text-xs font-bold text-white">{item.role}</span>
                        </div>
                        <div className="relative h-10 w-full bg-white/5 rounded-r-full flex items-center">
                           <div 
                              className={`h-full rounded-r-full bg-gradient-to-r ${item.color} shadow-lg relative flex items-center animate-in slide-in-from-left duration-1000`}
                              style={{ width: item.h }}
                           >
                              <div className="absolute right-4 text-white text-xs font-bold whitespace-nowrap flex items-center gap-1 drop-shadow-md">
                                 <Wallet className="w-3 h-3" /> {item.ctc}
                              </div>
                           </div>
                        </div>
                    </div>
                  ))}
               </div>

               <div className="hidden md:flex flex-row items-end justify-center gap-8 h-96 relative z-10 pt-10">
                  {careerGrowthData[earningsRegion].map((item, idx) => (
                      <div key={idx} className="w-1/4 h-full flex flex-col justify-end group">
                          <div className="relative flex-grow flex items-end justify-center mb-4">
                             <div 
                                className={`w-24 rounded-t-lg bg-gradient-to-t ${item.color} shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110 relative`}
                                style={{ height: item.h }}
                             >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-blue-950 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg flex items-center gap-1 opacity-100 transition-all">
                                   <Wallet className="w-3 h-3" />
                                   {item.ctc}
                                </div>
                             </div>
                          </div>
                          <div className="text-center border-t border-white/10 pt-4">
                             <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">{item.year}</div>
                             <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{item.role}</div>
                          </div>
                      </div>
                  ))}
               </div>
               <div className="mt-8 pt-6 border-t border-white/5 text-center">
                   <p className="text-[10px] text-slate-600 italic">
                      Disclaimer: Salaries depend on skills, performance, interviews, and market conditions. No guarantees are made.
                      <br/>
                      "AI won't take your job. Someone trained in Agentic AI will. Be that someone."
                   </p>
               </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-[#020617] border-t border-white/10">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">Foundation vs Elite</h2>
                    <p className="text-slate-400">The detailed breakdown of what you unlock at each level.</p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-8 gap-2 flex-wrap">
                   {['features', 'roles', 'ctc', 'tools', 'projects', 'usps', 'fees'].map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setComparisonCategory(tab as any)}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all uppercase tracking-wide ${
                            comparisonCategory === tab 
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                            : 'bg-transparent text-slate-500 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                      >
                          {tab}
                      </button>
                   ))}
                </div>

                <div className="bg-[#0b0f1f] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="grid grid-cols-3 bg-white/5 border-b border-white/10 text-xs md:text-sm font-black uppercase tracking-widest text-slate-500">
                        <div className="p-4 md:p-6">Category</div>
                        <div className="p-4 md:p-6 text-blue-400 bg-blue-900/10 border-x border-white/5 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Foundation
                        </div>
                        <div className="p-4 md:p-6 text-purple-400 bg-purple-900/10 flex items-center gap-2">
                             <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span> Elite
                        </div>
                    </div>

                    {/* FEATURES CONTENT */}
                    {comparisonCategory === 'features' && splitComparisons.features.map((row, idx) => (
                         <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                            <div className="p-4 md:p-6 text-sm font-bold text-white">{row.feature}</div>
                            <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 bg-blue-900/5">{row.foundation}</div>
                            <div className="p-4 md:p-6 text-sm text-white font-semibold bg-purple-900/5 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-purple-500" /> {row.elite}
                            </div>
                         </div>
                    ))}

                    {/* ROLES CONTENT */}
                    {comparisonCategory === 'roles' && splitComparisons.roles.map((row, idx) => (
                         <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                            <div className="p-4 md:p-6 text-sm font-bold text-slate-400 flex items-center">Job Role {idx + 1}</div>
                            <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 bg-blue-900/5">{row.foundation}</div>
                            <div className="p-4 md:p-6 text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold bg-purple-900/5">{row.elite}</div>
                         </div>
                    ))}

                    {/* CTC CONTENT */}
                    {comparisonCategory === 'ctc' && (
                        <div>
                             <div className="p-4 border-b border-white/10 flex justify-center gap-4 bg-white/5">
                                <button onClick={() => setEarningsRegion('india')} className={`text-xs font-bold px-3 py-1 rounded ${earningsRegion === 'india' ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-400'}`}>INDIA (INR)</button>
                                <button onClick={() => setEarningsRegion('global')} className={`text-xs font-bold px-3 py-1 rounded ${earningsRegion === 'global' ? 'bg-green-500 text-white' : 'bg-white/10 text-slate-400'}`}>GLOBAL (USD)</button>
                             </div>
                             {splitComparisons.ctc[earningsRegion].map((row, idx) => (
                                <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <div className="p-4 md:p-6 text-sm font-bold text-white">{row.year}</div>
                                    <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 bg-blue-900/5 font-mono">{row.foundation}</div>
                                    <div className="p-4 md:p-6 text-sm text-green-400 font-bold bg-purple-900/5 font-mono">{row.elite}</div>
                                </div>
                             ))}
                        </div>
                    )}

                    {/* TOOLS CONTENT */}
                    {comparisonCategory === 'tools' && splitComparisons.tools.map((row, idx) => (
                         <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                            <div className="p-4 md:p-6 text-sm font-bold text-white">{row.tool}</div>
                            <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 bg-blue-900/5 flex items-center gap-2">
                                {row.foundation === 'No' ? <XCircle className="w-4 h-4 text-red-500/50" /> : <CheckCircle2 className="w-4 h-4 text-blue-500/50" />}
                                {row.foundation}
                            </div>
                            <div className="p-4 md:p-6 text-sm text-white font-semibold bg-purple-900/5 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-purple-500" /> {row.elite}
                            </div>
                         </div>
                    ))}

                    {/* PROJECTS CONTENT */}
                    {comparisonCategory === 'projects' && splitComparisons.projects.map((row, idx) => (
                         <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                            <div className="p-4 md:p-6 text-sm font-bold text-white">{row.aspect}</div>
                            <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 bg-blue-900/5 flex items-center gap-2">
                                {row.aspectType === 'bad' && <XCircle className="w-4 h-4 text-red-500" />}
                                {row.aspectType === 'warn' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                                {row.foundation}
                            </div>
                            <div className="p-4 md:p-6 text-sm text-white font-semibold bg-purple-900/5 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-purple-500" /> {row.elite}
                            </div>
                         </div>
                    ))}

                    {/* USPS CONTENT (ADDED) */}
                    {comparisonCategory === 'usps' && splitComparisons.usps.map((row, idx) => (
                         <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                            <div className="p-4 md:p-6 text-sm font-bold text-white">{row.usp}</div>
                            <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 bg-blue-900/5">{row.foundation}</div>
                            <div className="p-4 md:p-6 text-sm text-white font-semibold bg-purple-900/5">{row.elite}</div>
                         </div>
                    ))}

                    {/* FEES CONTENT (ADDED) */}
                    {comparisonCategory === 'fees' && splitComparisons.fees.map((row, idx) => (
                         <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                            <div className="p-4 md:p-6 text-sm font-bold text-white">{row.item}</div>
                            <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 bg-blue-900/5 font-mono">{row.foundation}</div>
                            <div className="p-4 md:p-6 text-sm text-white font-bold bg-purple-900/5 font-mono">{row.elite}</div>
                         </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- GAMIFICATION --- */}
        <section className="py-24 px-6 bg-[#050b24]">
          <div className="max-w-6xl mx-auto">
             <div className="text-center mb-12">
                <div className="inline-flex justify-center p-3 bg-yellow-400/10 rounded-full mb-6 border border-yellow-400/20">
                   <Trophy className="w-8 h-8 text-yellow-400" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4">Gamified LMS Experience</h2>
                <p className="text-slate-400">Structured assessment. Not gimmicky. Earn your proof step by step.</p>
             </div>

             <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="w-full lg:w-1/3 flex flex-col gap-3">
                   {gamificationData.map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => setActiveGamification(item)}
                        className={`text-left p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 ${activeGamification.id === item.id ? 'bg-white/10 border-white/20 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                      >
                          <div className={`${item.color} p-2 bg-white/5 rounded-lg shrink-0`}>{item.icon}</div>
                          <div>
                             <span className={`block font-bold text-sm ${activeGamification.id === item.id ? 'text-white' : 'text-slate-400'}`}>{item.label}</span>
                          </div>
                          {activeGamification.id === item.id && <ChevronRight className="ml-auto w-4 h-4 text-white/50" />}
                      </button>
                   ))}
                </div>

                <div className="w-full lg:w-2/3">
                   <div className="bg-[#0f172a] border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl relative">
                      <div className="bg-[#1e293b] px-4 py-3 flex items-center gap-2 border-b border-slate-700">
                         <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                         </div>
                         <div className="flex-1 text-center">
                            <div className="inline-block bg-[#020617] px-4 py-1 rounded text-[10px] text-slate-400 font-mono truncate max-w-[200px] md:max-w-full">
                               lms.internx.ai/assessments/{activeGamification.id}
                            </div>
                         </div>
                      </div>

                      <div className="relative aspect-video bg-black group">
                         <video 
                           key={activeGamification.video} 
                           className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                           src={activeGamification.video}
                           autoPlay
                           loop
                           muted
                           playsInline 
                         />
                         
                         <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${activeGamification.bg} ${activeGamification.border} border mb-4 w-fit`}>
                               <span className={`w-2 h-2 rounded-full bg-current ${activeGamification.color}`}></span>
                               <span className={`text-xs font-bold uppercase tracking-wider ${activeGamification.color}`}>{activeGamification.stat}</span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{activeGamification.title}</h3>
                            <p className="text-slate-300 text-xs md:text-sm max-w-lg mb-4 hidden md:block">{activeGamification.desc}</p>
                            
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                               SYSTEM ACTIVE
                            </div>
                         </div>

                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                               <Play className="w-6 h-6 text-white fill-white ml-1" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* --- DOMAINS --- */}
        <section className="py-20 bg-white/5 border-y border-white/5 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-black uppercase mb-8 text-white">
              Real Industry Domains
            </h2>
            <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
              Projects are pre-defined and guided for Foundation. Custom tracks available for Elite.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industryDomains.map((item, i) => (
                <div 
                  key={i} 
                  className="p-6 border border-white/10 rounded-xl hover:bg-white/5 transition-colors group cursor-default"
                >
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-white text-sm md:text-base">
                    {item.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-slate-400 mt-1">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- TOOLS (TECH STACK) --- */}
        <section className="py-24 px-6">
             <div className="max-w-6xl mx-auto">
                 <div className="text-center mb-16">
                     <h2 className="text-3xl font-black uppercase text-white mb-4">Tools & Tech Stack</h2>
                     <p className="text-slate-400">Learners don't need 100 tools. They need the right ones used by real companies.</p>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     {tools.map((t, i) => (
                         <div key={i} className="bg-slate-900 border border-white/10 p-6 rounded-2xl flex flex-col items-center hover:border-blue-500/50 transition-colors">
                             <div className="mb-4">{t.icon}</div>
                             <h4 className="font-bold text-white mb-1">{t.name}</h4>
                             <p className="text-xs text-slate-500">{t.desc}</p>
                         </div>
                     ))}
                 </div>
             </div>
        </section>


        {/* --- COMPETITOR COMPARISON SECTION --- */}
        <section className="py-24 px-6 bg-[#03081a]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16 text-white">Competitor Comparison</h2>
            
            <div className="overflow-x-auto rounded-3xl border border-white/10 shadow-2xl">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-[#0b0f1f]">
                    {competitorData.headers.map((h, i) => (
                        <th key={i} className={`p-4 text-xs font-black uppercase tracking-widest text-slate-500 text-center ${i===0 ? 'text-left sticky left-0 bg-[#0b0f1f] z-10 border-r border-white/10' : ''} ${i===1 ? 'bg-blue-900/10 text-blue-400 border-x border-blue-500/20' : ''}`}>
                            {h}
                        </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {competitorData.rows.map((row, i) => (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-sm text-white sticky left-0 bg-[#020617] z-10 border-r border-white/10 shadow-[2px_0_10px_rgba(0,0,0,0.5)]">
                          {row.feature}
                      </td>
                      {row.values.map((val, idx) => (
                          <td key={idx} className={`p-4 text-center ${idx===0 ? 'bg-blue-900/5 border-x border-blue-500/10' : ''}`}>
                             {renderCompetitorValue(val)}
                          </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-slate-500 mt-6 text-xs italic">
                Comparison data based on publicly available features as of 2026.
            </p>
          </div>
        </section>

        {/* --- STRATEGIC OUTCOMES (ADDED FROM PDF Page 15) --- */}
        <section className="py-24 px-6 bg-slate-900/30">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">Strategic Outcomes</h2>
                    <p className="text-slate-400">Why leading companies trust InternX-AI graduates.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "Verified Issuance", desc: "Credentials issued by verified startups & CLC partners.", icon: <Shield className="w-8 h-8 text-blue-400" /> },
                        { title: "Verifiable Assets", desc: "ResumeNFT + GitHub Commit History. No fake PDFs.", icon: <Fingerprint className="w-8 h-8 text-purple-400" /> },
                        { title: "Proof-Based Hiring", desc: "Skip resume filtering. Employers see your code first.", icon: <Target className="w-8 h-8 text-green-400" /> },
                        { title: "Career Flywheel", desc: "InternX → ResumeNFT → HireX → Upskilling.", icon: <BarChart3 className="w-8 h-8 text-orange-400" /> }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="mb-4 bg-slate-950 p-3 rounded-lg w-fit">{item.icon}</div>
                            <h4 className="font-bold text-white mb-2">{item.title}</h4>
                            <p className="text-sm text-slate-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* --- FAQ & ECOSYSTEM --- */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black uppercase mb-12 text-center text-white">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`bg-white/5 border rounded-xl overflow-hidden transition-all duration-300 ${activeFaqIndex === i ? 'border-blue-500/50 bg-white/10' : 'border-white/10'}`}
                >
                  <button 
                    onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                    className="w-full flex justify-between items-center p-6 text-left"
                    aria-expanded={activeFaqIndex === i}
                  >
                    <h4 className="font-bold text-white pr-4 text-sm md:text-base">{faq.q}</h4>
                    {activeFaqIndex === i ? <ChevronDown className="w-5 h-5 text-blue-400 shrink-0" /> : <Plus className="w-5 h-5 text-slate-500 shrink-0" />}
                  </button>
                  
                  <div 
                    className={`px-6 text-sm text-slate-300 overflow-hidden transition-all duration-300 ease-in-out ${activeFaqIndex === i ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#03081a] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">The CLC Ecosystem</h2>
              <p className="text-slate-400">InternX-AI operates inside the full Career Lab Consulting ecosystem.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {ecosystem.map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors text-center group">
                  <div className="mx-auto w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 border-t border-white/5 opacity-50">
          <div className="max-w-7xl mx-auto px-6 overflow-hidden">
              <p className="text-center text-xs uppercase tracking-widest mb-8 text-slate-500">Hiring Partners & Alumni Work At</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale">
                {hiringPartners.map((p, i) => (
                  <span key={i} className="text-xl font-black text-slate-400">{p}</span>
                ))}
              </div>
          </div>
        </section>

        <section className="py-24 px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 text-white leading-tight">Start where you belong.<br/><span className="text-blue-500">Advance</span> when you&apos;re ready.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/50">
              Start with Foundation
            </button>
            <button className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-bold rounded-xl transition-all">
              Book Free Career Call
            </button>
          </div>
          <p className="mt-6 text-slate-500 text-sm">Elite is earned, not enrolled.</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}