'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script'; 
import { GoogleGenerativeAI } from "@google/generative-ai";
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
  RefreshCw, Home, Video, Star, MapPin, ExternalLink, Github,
  Loader2, Mail, Calendar, Clock, User, MessageSquare
} from 'lucide-react';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string; 
  difficulty: 'easy' | 'medium' | 'hard';
}

interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

const fallbackQuestions: Question[] = [
  { id: 1, question: "Which programming language is known as the backbone of AI?", options: ["Java", "Python", "C++", "Swift"], answer: "Python", difficulty: "easy" },
  { id: 2, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language", "None"], answer: "Hyper Text Markup Language", difficulty: "easy" },
  { id: 3, question: "Which of these is a JavaScript library for building UIs?", options: ["React", "Laravel", "Django", "Flask"], answer: "React", difficulty: "easy" },
  { id: 4, question: "What is the full form of SQL?", options: ["Structured Query Language", "Simple Query Logic", "System Query Language", "None"], answer: "Structured Query Language", difficulty: "easy" },
  { id: 5, question: "Which company developed ChatGPT?", options: ["OpenAI", "Google", "Microsoft", "Meta"], answer: "OpenAI", difficulty: "easy" },
  { id: 6, question: "What is 2 + 2?", options: ["3", "4", "5", "22"], answer: "4", difficulty: "easy" },
  { id: 7, question: "Which symbol is used for single-line comments in Python?", options: ["//", "/*", "#", "--"], answer: "#", difficulty: "easy" },
  { id: 8, question: "What is the output of print(10 % 3)?", options: ["3", "1", "10", "0"], answer: "1", difficulty: "easy" },
  { id: 9, question: "Which data structure follows LIFO principle?", options: ["Queue", "Stack", "Array", "Tree"], answer: "Stack", difficulty: "medium" },
  { id: 10, question: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], answer: "O(log n)", difficulty: "medium" },
  { id: 11, question: "Which algorithm is commonly used for sorting?", options: ["Dijkstra", "Merge Sort", "Prim's", "BFS"], answer: "Merge Sort", difficulty: "medium" },
  { id: 12, question: "What does API stand for?", options: ["Application Programming Interface", "Applied Protocol Interaction", "Application Process Integration", "None"], answer: "Application Programming Interface", difficulty: "medium" },
  { id: 13, question: "Which of these is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], answer: "MongoDB", difficulty: "medium" },
  { id: 14, question: "What is overfitting in Machine Learning?", options: ["Model learns noise as concepts", "Model performs poorly on training data", "Model is too simple", "None"], answer: "Model learns noise as concepts", difficulty: "hard" },
  { id: 15, question: "Which activation function is typically used for binary classification?", options: ["Sigmoid", "ReLU", "Softmax", "Tanh"], answer: "Sigmoid", difficulty: "hard" },
  { id: 16, question: "What is the purpose of a constructor in OOP?", options: ["To initialize objects", "To delete objects", "To call methods", "None"], answer: "To initialize objects", difficulty: "easy" },
  { id: 17, question: "Which keyword defines a function in Python?", options: ["func", "def", "function", "define"], answer: "def", difficulty: "easy" },
  { id: 18, question: "What is a primary key in SQL?", options: ["Unique identifier for a record", "Duplicate key", "Foreign key", "None"], answer: "Unique identifier for a record", difficulty: "medium" },
  { id: 19, question: "Which protocol secures web traffic?", options: ["HTTP", "HTTPS", "FTP", "SMTP"], answer: "HTTPS", difficulty: "easy" },
  { id: 20, question: "Binary representation of 5 is?", options: ["101", "110", "100", "111"], answer: "101", difficulty: "medium" },
  { id: 21, question: "Which is NOT a loop structure in Python?", options: ["for", "while", "do-while", "None"], answer: "do-while", difficulty: "medium" },
  { id: 22, question: "The fundamental unit of a neural network is?", options: ["Neuron", "Pixel", "Voxel", "Kernel"], answer: "Neuron", difficulty: "medium" },
  { id: 23, question: "Library used for data manipulation in Python?", options: ["Pandas", "Numpy", "Matplotlib", "Seaborn"], answer: "Pandas", difficulty: "medium" },
  { id: 24, question: "Result of 3 ** 2 in Python?", options: ["6", "9", "5", "8"], answer: "9", difficulty: "easy" },
  { id: 25, question: "Who proposed the Turing Test?", options: ["Alan Turing", "Charles Babbage", "Elon Musk", "Bill Gates"], answer: "Alan Turing", difficulty: "hard" }
];

const studentProjects = [
  {
    title: "AI Legal Doc Analyzer",
    desc: "Automated contract review system reducing legal costs by 60%. Uses OCR + LLM to flag risky clauses.",
    tech: ["Python", "LangChain", "OpenAI", "React"],
    author: "Rohan M.",
    role: "Placed at LegalTech Startup",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Crypto Sentiment Bot",
    desc: "Real-time trading signal generator analyzing Twitter & News sentiment for Bitcoin/ETH.",
    tech: ["FastAPI", "NLTK", "Redis", "Next.js"],
    author: "Sarah K.",
    role: "Freelance AI Engineer",
    image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Smart Resume Screener",
    desc: "HR-Tech tool that ranks resumes based on job descriptions using semantic matching, not just keywords.",
    tech: ["PyTorch", "Bert", "PostgreSQL", "Tailwind"],
    author: "Amit V.",
    role: "Jr. ML Engineer",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600"
  }
];

const testimonials = [
  {
    name: "Vikram Singh",
    role: "AI Engineer at Turing",
    quote: "The 'Live Defense' was scary but necessary. It forced me to actually understand the code I was writing. No other course does this.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Data Scientist at Fractal",
    quote: "I came from a non-tech background. The Foundation months saved me. By Month 5, I deployed my first LLM app. Truly life-changing.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    rating: 5
  },
  {
    name: "Arjun Das",
    role: "Freelance GenAI Dev",
    quote: "ResumeNFT is real. I showed my verified project history to a US client, and they hired me without a technical interview.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    rating: 5
  }
];

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
    { year: "Year 3", role: "Jr. ML Engineer", ctc: "₹12L - ₹18L", h: "65%", color: "from-blue-700 to-blue-500" },
    { year: "Year 4", role: "Sr. ML Engineer", ctc: "₹17L - ₹24L", h: "80%", color: "from-blue-700 to-blue-500" },
    { year: "Year 5", role: "AI Architect", ctc: "₹25L - ₹50L+", h: "90%", color: "from-blue-500 to-cyan-400" },
  ],
  global: [
    { year: "Year 1", role: "Remote AI Dev", ctc: "$5K - $8K", h: "25%", color: "from-slate-600 to-slate-500" },
    { year: "Year 2", role: "AI Engineer / Backend", ctc: "$8K - $12K", h: "45%", color: "from-green-900 to-green-700" },
    { year: "Year 3", role: "Jr. AI Engineer", ctc: "$12K - $18K", h: "65%", color: "from-green-700 to-green-500" },
    { year: "Year 4", role: "Sr. AI Engineer", ctc: "$17K - $24K", h: "80%", color: "from-green-700 to-green-500" },
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
        { feature: "Performance based Job Offers", values: ["yes", "no", "no", "no", "yes", "no", "conditional", "no"] },
        { feature: "AI & Agentic Workflows", values: ["yes", "no", "no", "no", "limited", "no", "no", "no"] },
        { feature: "1:1 Mentorship", values: ["weekly", "no", "no", "no", "yes", "yes", "yes", "yes"] },
        { feature: "Entry Pricing (India)", values: ["1.49 LPA", "₹2K-₹5K", "₹5L+", "₹1-2K/mo", "₹6.5L+", "₹6L+", "₹2.5L+", "₹12L (ISA)"] },
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
        { item: "Scholarship (Test-based)", foundation: "Available", elite: "Available" },
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
    video: "https://www.pexels.com/download/video/7092056/" 
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
    video: "https://www.pexels.com/download/video/3129671/"
  }
];

const faqs = [
  { q: "Is there a job platform?", a: "No. We offer 'Performance-Based Hiring'. Elite graduates get unlimited interviews, but selection depends on your skills and the interview." },
  { q: "Is Foundation compulsory for Elite?", a: "Yes. Unless you can pass the direct entry test (reserved for experienced devs), Foundation is the mandatory eligibility layer." },
  { q: "Do I need prior coding experience?", a: "No. Foundation starts from zero (Variables, Loops) and builds you up to building AI apps." },
  { q: "What happens if I fail the Unified Test?", a: "You receive the Foundation certificate but cannot proceed to Elite. You can re-attempt after remediation." },
  { q: "How do the weekend classes work?", a: "Classes are live on Saturday & Sunday. Weekdays (Mon-Fri) are for optional practice sessions and mentor support." }
];

const hiringPartners = [
  { name: "Zapier", logo: "https://www.vectorlogo.zone/logos/zapier/zapier-ar21.svg" },
  { name: "Notion", logo: "https://cdn.worldvectorlogo.com/logos/notion-2.svg" },
  { name: "Turing", logo: "https://cdn.worldvectorlogo.com/logos/aldi-turing.svg" },
  { name: "Freshworks", logo: "https://cdn.worldvectorlogo.com/logos/freshbooks-2021-logo.svg" },
  { name: "Zoom", logo: "https://cdn.worldvectorlogo.com/logos/zoom-app.svg" },
  { name: "Kali", logo: "https://cdn.worldvectorlogo.com/logos/kali-1.svg" },
  { name: "HubSpot", logo: "https://www.vectorlogo.zone/logos/hubspot/hubspot-ar21.svg" },
  { name: "Monday.com", logo: "https://www.vectorlogo.zone/logos/monday/monday-ar21.svg" }
];

export default function InternXAIPage() {
  const [activeTab, setActiveTab] = useState('foundation');
  const [activeGamification, setActiveGamification] = useState(gamificationData[0]);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [comparisonCategory, setComparisonCategory] = useState<'features' | 'tools' | 'roles' | 'projects' | 'ctc' | 'usps' | 'fees'>('features');
  const [earningsRegion, setEarningsRegion] = useState<'india' | 'global'>('india');

  const [isScholarshipModalOpen, setIsScholarshipModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({ name: '', email: '', phone: '' });
  const [step, setStep] = useState<'details' | 'loading' | 'quiz' | 'result'>('details');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [score, setScore] = useState(0);
  const [generatedCode, setGeneratedCode] = useState('');
  const [planTypeForScholarship, setPlanTypeForScholarship] = useState<'Foundation' | 'Elite'>('Foundation');
  const [scholarshipData, setScholarshipData] = useState<{ plan: 'Foundation' | 'Elite', discount: number, code: string } | null>(null);

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoStep, setDemoStep] = useState<'calendar' | 'form'>('calendar');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [demoFormData, setDemoFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmittingDemo, setIsSubmittingDemo] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePayment = (planName: string, amount: number) => {
    if (typeof window === 'undefined' || !(window as any).Razorpay) {
      alert("Payment gateway failed to load. Please refresh.");
      return;
    }

    let finalAmount = amount;
    let description = `Enrollment for ${planName}`;

    if (scholarshipData && scholarshipData.plan === planName) {
        finalAmount = Math.round(amount * (1 - scholarshipData.discount / 100));
        description += ` | Scholarship Applied: ${scholarshipData.code} (${scholarshipData.discount}% Off)`;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
      amount: finalAmount * 100, 
      currency: "INR",
      name: "InternX AI",
      description: description,
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

  const getNextDays = () => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i + 1); 
      dates.push(d);
    }
    return dates;
  };

  const handleBookDemo = () => {
    setIsDemoModalOpen(true);
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingDemo(true);
    
    console.log("Sending email to info@careerlabconsulting.com", {
        subject: "New Demo Booking Request",
        body: `Name: ${demoFormData.name}\nEmail: ${demoFormData.email}\nPhone: ${demoFormData.phone}\nDate: ${selectedDate}\nTime: ${selectedTime}\nMessage: ${demoFormData.message}`
    });

    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    alert(`Demo confirmed for ${selectedDate} at ${selectedTime}. We will contact you shortly.`);
    setIsSubmittingDemo(false);
    setIsDemoModalOpen(false);
    setDemoStep('calendar');
    setSelectedDate(null);
    setSelectedTime(null);
    setDemoFormData({ name: '', email: '', phone: '', message: '' });
  };

  const openScholarshipModal = (plan: 'Foundation' | 'Elite') => {
    setPlanTypeForScholarship(plan);
    setIsScholarshipModalOpen(true);
    setStep('details');
    setAnswers({});
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  const generateQuiz = async () => {
    setStep('loading');
    try {
        if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
            throw new Error("API Key is missing");
        }

        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `Generate 25 multiple choice questions on General Aptitude, Basic Programming Logic, and AI awareness. 
        Structure: 10 Easy, 5 Medium, 10 Hard.
        Format: JSON Array of objects with keys: id (number), question (string), options (array of 4 strings), answer (string - exact match to one option), difficulty (string).`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const firstBracket = text.indexOf('[');
        const lastBracket = text.lastIndexOf(']');
        if (firstBracket !== -1 && lastBracket !== -1) {
            text = text.substring(firstBracket, lastBracket + 1);
        }

        const data: Question[] = JSON.parse(text);
        
        if (!Array.isArray(data) || data.length === 0) throw new Error("Invalid data format");

        setQuestions(data.slice(0, 25)); 
        setStep('quiz');
    } catch (error) {
        console.error("AI Generation Failed, using fallback", error);
        setQuestions(fallbackQuestions);
        setStep('quiz');
    }
  };

  const submitQuiz = () => {
     let calculatedScore = 0;
     questions.forEach(q => {
         if(answers[q.id] === q.answer) {
             calculatedScore += 4; 
         }
     });
     setScore(calculatedScore);
     setStep('result');
     
     const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
     const randomDigits = Math.floor(1000 + Math.random() * 9000);
     const formattedCode = `SCH${randomChars}/26-27/${randomDigits}`;
     setGeneratedCode(formattedCode);

     sendScholarshipEmail(userDetails.email, formattedCode, calculatedScore);
  };

  const sendScholarshipEmail = async (email: string, code: string, finalScore: number) => {
      console.log(`Sending Scholarship Email to ${email}`, {
          subject: "Your InternX-AI Scholarship Result",
          code: code,
          score: finalScore
      });
  };

  const calculateScholarshipPercent = () => {
      const maxScholarship = planTypeForScholarship === 'Foundation' ? 30 : 40;
      const percentage = (score / 100) * maxScholarship;
      return Math.min(Math.round(percentage), maxScholarship);
  };

  const handleClaimScholarship = () => {
      const discount = calculateScholarshipPercent();
      setScholarshipData({
          plan: planTypeForScholarship,
          discount: discount,
          code: generatedCode
      });
      setIsScholarshipModalOpen(false);
  };

  const getGrade = () => {
      if (score >= 90) return 'A+';
      if (score >= 75) return 'A';
      if (score >= 60) return 'B';
      if (score >= 40) return 'C';
      return 'D';
  };

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

      {mounted && isScholarshipModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#0b0f1f] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#020617]">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <GraduationCap className="text-blue-400" /> Scholarship Test
                    </h3>
                    <button onClick={() => setIsScholarshipModalOpen(false)} className="text-slate-400 hover:text-white"><X /></button>
                </div>

                <div className="p-8 overflow-y-auto custom-scrollbar flex-grow">
                    
                    {step === 'details' && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <h4 className="text-2xl font-bold text-white mb-2">Apply for {planTypeForScholarship} Scholarship</h4>
                                <p className="text-slate-400 text-sm">Enter your details to start the AI-generated assessment.</p>
                            </div>
                            <div className="space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                    value={userDetails.name}
                                    onChange={(e) => setUserDetails({...userDetails, name: e.target.value})}
                                />
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                    value={userDetails.email}
                                    onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                                />
                                <input 
                                    type="tel" 
                                    placeholder="Phone Number" 
                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                    value={userDetails.phone}
                                    onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                                />
                            </div>
                            <button 
                                onClick={generateQuiz}
                                disabled={!userDetails.name || !userDetails.email}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex justify-center items-center gap-2"
                            >
                                Start Assessment <ChevronRight />
                            </button>
                        </div>
                    )}

                    {step === 'loading' && (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                            <p className="text-white font-bold text-lg">AI is generating your unique test...</p>
                            <p className="text-slate-500 text-sm">Curating 25 questions based on difficulty levels.</p>
                        </div>
                    )}

                    {step === 'quiz' && questions.length > 0 && (
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center mb-6 text-sm text-slate-400">
                                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                                <span className={`uppercase font-bold text-xs px-2 py-1 rounded ${
                                    questions[currentQuestionIndex].difficulty === 'easy' ? 'bg-green-500/10 text-green-400' :
                                    questions[currentQuestionIndex].difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                                    'bg-red-500/10 text-red-400'
                                }`}>
                                    {questions[currentQuestionIndex].difficulty}
                                </span>
                            </div>

                            <h4 className="text-xl font-bold text-white mb-6 leading-relaxed">
                                {questions[currentQuestionIndex].question}
                            </h4>

                            <div className="space-y-3 mb-8">
                                {questions[currentQuestionIndex].options.map((opt, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setAnswers({...answers, [questions[currentQuestionIndex].id]: opt})}
                                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                                            answers[questions[currentQuestionIndex].id] === opt 
                                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                                        }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-auto flex justify-between">
                                <button 
                                    disabled={currentQuestionIndex === 0}
                                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                                    className="px-6 py-2 rounded-lg bg-white/5 text-slate-400 hover:text-white disabled:opacity-30"
                                >
                                    Previous
                                </button>
                                {currentQuestionIndex < questions.length - 1 ? (
                                    <button 
                                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                                        className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button 
                                        onClick={submitQuiz}
                                        className="px-8 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700"
                                    >
                                        Submit Test
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 'result' && (
                        <div className="text-center py-4">
                            <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-yellow-500/20 text-yellow-400 mb-6 border border-yellow-500/50">
                                <Trophy className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-black text-white mb-2">Congratulations, {userDetails.name}!</h2>
                            <p className="text-slate-400 mb-8">You have successfully completed the scholarship assessment.</p>

                            <div className="grid grid-cols-3 gap-4 mb-8">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <div className="text-sm text-slate-500 mb-1">Score</div>
                                    <div className="text-2xl font-black text-white">{score}/100</div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <div className="text-sm text-slate-500 mb-1">Grade</div>
                                    <div className="text-2xl font-black text-blue-400">{getGrade()}</div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-green-500/10 animate-pulse"></div>
                                    <div className="relative z-10">
                                        <div className="text-sm text-green-400 font-bold mb-1">Scholarship</div>
                                        <div className="text-2xl font-black text-white">{calculateScholarshipPercent()}%</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#020617] p-6 rounded-xl border border-dashed border-slate-700 mb-8">
                                <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Your Scholarship Code</p>
                                <div className="text-3xl font-mono font-bold text-blue-400 tracking-wider select-all">{generatedCode}</div>
                                <p className="text-xs text-slate-500 mt-2 flex items-center justify-center gap-1">
                                    <Mail className="w-3 h-3" /> Sent to {userDetails.email}
                                </p>
                            </div>

                            <button 
                                onClick={handleClaimScholarship}
                                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-slate-200 transition-all"
                            >
                                Claim & Close
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
      , document.body)}

      {mounted && isDemoModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#0b0f1f] border border-white/10 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#020617]">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Calendar className="text-green-400" /> Book Free Demo
                    </h3>
                    <button onClick={() => setIsDemoModalOpen(false)} className="text-slate-400 hover:text-white"><X /></button>
                </div>
                
                <div className="p-8 overflow-y-auto custom-scrollbar">
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
                                className={`p-2 rounded-lg border text-center transition-all ${isSelected ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
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
                        className="w-full py-4 mt-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest rounded-xl transition-all"
                    >
                        Continue
                    </button>
                    </div>
                ) : (
                    <form onSubmit={handleDemoSubmit} className="space-y-4">
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
                            type="text" required placeholder="Full Name" 
                            value={demoFormData.name} onChange={(e) => setDemoFormData({...demoFormData, name: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        </div>
                        <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                            type="email" required placeholder="Email Address" 
                            value={demoFormData.email} onChange={(e) => setDemoFormData({...demoFormData, email: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        </div>
                        <div className="relative">
                        <MessageSquare className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                        <input 
                            type="text" placeholder="Topics you want to discuss..." 
                            value={demoFormData.message} onChange={(e) => setDemoFormData({...demoFormData, message: e.target.value})}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmittingDemo}
                        className="w-full mt-6 py-4 bg-white text-slate-900 hover:bg-slate-200 font-bold uppercase tracking-widest rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
                    >
                        {isSubmittingDemo ? <Loader2 className="animate-spin w-4 h-4" /> : 'Confirm Booking'}
                    </button>
                    <button type="button" onClick={() => setDemoStep('calendar')} className="w-full py-2 text-xs text-slate-500 hover:text-white transition-colors">
                        Back to Calendar
                    </button>
                    </form>
                )}
                </div>
            </div>
        </div>
      , document.body)}

      <main className="flex-grow">
        
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
                <Rocket className="w-5 h-5" /> Download Brochure
              </Link>
              <Link href="#eligibility" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 duration-200">
                <FileCheck className="w-5 h-5" /> Check Elite Eligibility
              </Link>
            </div>
            
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

        <section className="py-12 px-6 bg-[#03081a]">
           <div className="max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
               <div className="text-left">
                  <h2 className="text-2xl md:text-3xl font-black uppercase text-white mb-2">
                    Global Learner <span className="text-blue-500">Community</span>
                  </h2>
                  <p className="text-slate-400 text-sm md:text-base max-w-lg">
                    Join thousands of aspiring AI Engineers from 30+ countries building the future together.
                  </p>
               </div>
               <div className="flex -space-x-4">
                  {[1,2,3,4].map((_,i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#03081a] bg-slate-800 overflow-hidden relative">
                       <Image 
                         src={`https://randomuser.me/api/portraits/thumb/men/${i+20}.jpg`} 
                         alt="Student" 
                         fill
                         sizes="40px"
                         className="object-cover"
                       />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-[#03081a] bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    +2k
                  </div>
               </div>
             </div>

             <div className="relative w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                 <Image 
                   src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                   alt="World Map of InternX Students"
                   fill
                   className="object-cover opacity-80 hover:scale-105 transition-transform duration-[20s]"
                   priority
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#03081a] to-transparent opacity-90"></div>
                 
                 <div className="absolute top-1/3 left-1/4 animate-pulse">
                    <MapPin className="text-blue-500 w-6 h-6 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                 </div>
                 <div className="absolute top-1/2 left-1/2 animate-pulse delay-700">
                    <MapPin className="text-purple-500 w-6 h-6 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                 </div>
                 <div className="absolute bottom-1/3 right-1/4 animate-pulse delay-1000">
                    <MapPin className="text-green-500 w-6 h-6 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                 </div>
                 
                 <div className="absolute bottom-6 left-6 md:left-10 z-10">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-lg">
                       <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          <span className="text-xs font-bold text-white">Live: 1,240 Students Coding Now</span>
                       </div>
                    </div>
                 </div>
             </div>
           </div>
        </section>

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

        <section className="py-24 px-6 bg-[#050b24] border-t border-white/5">
           <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                 <div className="inline-flex justify-center p-3 bg-purple-500/10 rounded-full mb-6 border border-purple-500/20">
                    <Code2 className="w-8 h-8 text-purple-400" />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4">Built by InternX Students</h2>
                 <p className="text-slate-400 max-w-2xl mx-auto">
                   These aren't "todo apps". These are full-stack AI solutions solving real industry problems.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {studentProjects.map((project, idx) => (
                   <div key={idx} className="group bg-[#0b0f1f] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20 flex flex-col">
                      <div className="relative h-48 w-full overflow-hidden">
                         <Image 
                           src={project.image} 
                           alt={project.title}
                           fill
                           sizes="(max-width: 768px) 100vw, 33vw"
                           className="object-cover group-hover:scale-110 transition-transform duration-500"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1f] to-transparent opacity-80"></div>
                         <div className="absolute bottom-4 left-4">
                           <h3 className="text-xl font-bold text-white">{project.title}</h3>
                         </div>
                      </div>
                      
                      <div className="p-6 flex-grow flex flex-col">
                         <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.desc}</p>
                         
                         <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map((t, i) => (
                              <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300">
                                {t}
                              </span>
                            ))}
                         </div>
                         
                         <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                            <div>
                               <p className="text-sm font-bold text-white">{project.author}</p>
                               <p className="text-xs text-green-400 font-bold">{project.role}</p>
                            </div>
                            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                               <Github className="w-5 h-5 text-white" />
                            </button>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
              
              <div className="mt-12 text-center">
                 <Link href="#" className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors border-b border-blue-400/30 pb-1">
                    View GitHub Portfolio Gallery <ExternalLink className="w-4 h-4" />
                 </Link>
              </div>
           </div>
        </section>

        <section id="pricing" className="py-24 px-6 bg-[#03081a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black uppercase text-white">Program Fees</h2>
              <p className="text-slate-400">Merit-based scholarships available based on test performance.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition-all group relative flex flex-col">
                <h3 className="text-2xl font-bold mb-2 text-white">Foundation</h3>
                <p className="text-slate-400 text-sm mb-6">6 Months • Beginner Friendly</p>
                
                <div className="flex items-end gap-2 mb-2">
                  {scholarshipData?.plan === 'Foundation' ? (
                      <div className="flex flex-col">
                          <span className="text-sm text-slate-500 line-through decoration-red-500">₹1,49,999</span>
                          <div className="flex items-end gap-2">
                             <div className="text-4xl font-black text-green-400">₹{(149999 * (1 - scholarshipData.discount/100)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                             <div className="text-xs font-bold text-green-500 mb-1 animate-pulse">({scholarshipData.discount}% OFF Applied)</div>
                          </div>
                      </div>
                  ) : (
                      <div className="text-4xl font-black text-white">₹1,49,999</div>
                  )}
                </div>

                <div className="mb-6">
                    <button 
                        onClick={() => openScholarshipModal('Foundation')}
                        className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold px-4 py-2 rounded-full hover:bg-green-500/20 transition-colors"
                    >
                        <Zap className="w-3 h-3" /> Get Scholarship (Max 30%)
                    </button>
                </div>

                <div className="mb-6 p-3 bg-blue-500/10 rounded-lg text-xs font-bold text-blue-400 text-center">
                    EMI starts at ₹5,208/month (India Only)
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Weekend Live Classes</li>
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> Real Industry Projects</li>
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> ResumeNFT Proof</li>
                </ul>
                
                <div className="space-y-3 mt-auto">
                    <button 
                      onClick={() => handlePayment('Foundation', 149999)}
                      className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10"
                    >
                      Register Now
                    </button>
                    <button 
                      onClick={handleBookDemo}
                      className="w-full py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors"
                    >
                      Book your Demo
                    </button>
                </div>
              </div>

              <div className="bg-[#0b0f1f] border border-purple-500/30 rounded-3xl p-8 relative overflow-hidden group flex flex-col">
                <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">Career Accelerator</div>
                <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Elite</h3>
                <p className="text-slate-400 text-sm mb-6">12 Months • Full Career Path</p>
                
                <div className="flex items-end gap-2 mb-2">
                  {scholarshipData?.plan === 'Elite' ? (
                      <div className="flex flex-col">
                          <span className="text-sm text-slate-500 line-through decoration-red-500">₹2,49,999</span>
                          <div className="flex items-end gap-2">
                             <div className="text-4xl font-black text-green-400">₹{(249999 * (1 - scholarshipData.discount/100)).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
                             <div className="text-xs font-bold text-green-500 mb-1 animate-pulse">({scholarshipData.discount}% OFF Applied)</div>
                          </div>
                      </div>
                  ) : (
                      <div className="text-4xl font-black text-white">₹2,49,999</div>
                  )}
                </div>

                <div className="mb-6">
                    <button 
                        onClick={() => openScholarshipModal('Elite')}
                        className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold px-4 py-2 rounded-full animate-pulse hover:animate-none hover:bg-purple-500/20 transition-colors"
                    >
                        <Zap className="w-3 h-3" /> Get Scholarship (Max 40%)
                    </button>
                </div>

                <div className="mb-6 p-3 bg-purple-500/10 rounded-lg text-xs font-bold text-purple-400 text-center">
                    Includes Foundation + Advanced Layer
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> <strong>Everything in Foundation</strong></li>
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Advanced MLOps & GenAI</li>
                  <li className="flex gap-2 text-sm text-slate-300"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" /> Enterprise-Grade Projects</li>
                </ul>
                
                <div className="space-y-3 mt-auto">
                    <button 
                      onClick={() => handlePayment('Elite', 249999)}
                      className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20"
                    >
                      Register Now
                    </button>
                    <button 
                      onClick={handleBookDemo}
                      className="w-full py-4 bg-transparent border border-purple-500/30 text-white font-bold rounded-xl hover:bg-purple-900/20 transition-colors"
                    >
                      Book your Demo
                    </button>
                </div>
              </div>

            </div>
          </div>
        </section>

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
                      Disclaimer: Salaries depend on skills, performance, interviews, and market conditions.
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

                    {comparisonCategory === 'features' && splitComparisons.features.map((row, idx) => (
                          <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                             <div className="p-4 md:p-6 text-sm font-bold text-white">{row.feature}</div>
                             <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 bg-blue-900/5">{row.foundation}</div>
                             <div className="p-4 md:p-6 text-sm text-white font-semibold bg-purple-900/5 flex items-center gap-2">
                                 <CheckCircle2 className="w-4 h-4 text-purple-500" /> {row.elite}
                             </div>
                          </div>
                    ))}
                    
                     {comparisonCategory === 'roles' && splitComparisons.roles.map((row, idx) => (
                          <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                             <div className="p-4 md:p-6 text-sm font-bold text-slate-400 flex items-center">Job Role {idx + 1}</div>
                             <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 bg-blue-900/5">{row.foundation}</div>
                             <div className="p-4 md:p-6 text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold bg-purple-900/5">{row.elite}</div>
                          </div>
                     ))}
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
                     {comparisonCategory === 'usps' && splitComparisons.usps.map((row, idx) => (
                          <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                             <div className="p-4 md:p-6 text-sm font-bold text-white">{row.usp}</div>
                             <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 bg-blue-900/5">{row.foundation}</div>
                             <div className="p-4 md:p-6 text-sm text-white font-semibold bg-purple-900/5">{row.elite}</div>
                          </div>
                     ))}
                     {comparisonCategory === 'fees' && splitComparisons.fees.map((row, idx) => (
                          <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                             <div className="p-4 md:p-6 text-sm font-bold text-white">{row.item}</div>
                             <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 bg-blue-900/5 font-mono">
                                {row.item === "Scholarship (Test-based)" ? (
                                    <button 
                                        onClick={() => openScholarshipModal('Foundation')}
                                        className="text-blue-400 underline decoration-dashed underline-offset-4 hover:text-blue-300 font-bold cursor-pointer"
                                    >
                                        {row.foundation}
                                    </button>
                                ) : (
                                    row.foundation
                                )}
                             </div>
                             <div className="p-4 md:p-6 text-sm text-white font-bold bg-purple-900/5 font-mono">
                                {row.item === "Scholarship (Test-based)" ? (
                                    <button 
                                        onClick={() => openScholarshipModal('Elite')}
                                        className="text-purple-400 underline decoration-dashed underline-offset-4 hover:text-purple-300 font-bold cursor-pointer"
                                    >
                                        {row.elite}
                                    </button>
                                ) : (
                                    row.elite
                                )}
                             </div>
                          </div>
                     ))}
                </div>
            </div>
        </section>

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
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

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

        <section className="py-24 px-6 bg-[#03081a]">
           <div className="max-w-6xl mx-auto">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4">Success Stories</h2>
                <p className="text-slate-400">Don't just take our word for it.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl relative">
                     <div className="flex gap-1 mb-4">
                        {[...Array(t.rating)].map((_, r) => (
                           <Star key={r} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                     </div>
                     <p className="text-slate-300 italic mb-8 relative z-10 text-sm leading-relaxed">"{t.quote}"</p>
                     
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden relative border border-white/20">
                           <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                        </div>
                        <div>
                           <h4 className="font-bold text-white text-sm">{t.name}</h4>
                           <p className="text-xs text-blue-400">{t.role}</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
           </div>
        </section>

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
            
            <div className="flex justify-center">
                <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <video 
                        src="https://www.pexels.com/download/video/7252806/" 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

          </div>
        </section>

        <section className="py-12 border-t border-white/5 opacity-80">
          <div className="max-w-7xl mx-auto px-6 overflow-hidden">
              <p className="text-center text-xs uppercase tracking-widest mb-8 text-slate-500">Hiring Partners & Alumni Work At</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
                {hiringPartners.map((p, i) => (
                  <div key={i} className="relative h-12 w-32 md:h-14 md:w-40 bg-white p-2 rounded-lg opacity-80 hover:opacity-100 transition-opacity">
                      <Image 
                        src={p.logo} 
                        alt={p.name} 
                        fill
                        className="object-contain p-2 grayscale hover:grayscale-0 transition-all duration-300"
                      />
                  </div>
                ))}
              </div>
          </div>
        </section>

        <section className="py-24 px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 text-white leading-tight">Start where you belong.<br/><span className="text-blue-500">Advance</span> when you&apos;re ready.</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/50"
            >
              Start with Foundation
            </button>
            <button 
              onClick={handleBookDemo}
              className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-bold rounded-xl transition-all"
            >
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