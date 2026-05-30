'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import GlobalNetwork from '@/components/b2c/GlobalNetwork';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Terminal, Database, Activity, Cpu, Bot, Rocket,
  Shield, Lock, CheckCircle2, XCircle, ChevronRight,
  Globe, Briefcase, GraduationCap, Layers, Search,
  Users, Coins, Zap, Code2,
  Layout, Server, BrainCircuit, Network, Trophy,
  FileCheck, Medal, Timer, Play, ChevronDown, Plus,
  TrendingUp, Wallet, AlertTriangle, Check, X,
  Target, BarChart3, Fingerprint, Laptop, UserCheck, ArrowRight,
  RefreshCw, MapPin, ExternalLink, Github,
  Mail, Calendar, Clock, User, MessageSquare,
  Star
} from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ─── Brand Icons ──────────────────────────────────────────────────────────────

const BrandIcons: Record<string, React.FC> = {
  Python: () => (
    <svg viewBox="0 0 256 256" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M126.916 0C66.14 0 54.815 27.283 54.815 27.283V56.78H109.9V47.518H145.42V78.705H37.513C37.513 78.705 0 78.077 0 134.417C0 190.757 33.129 187.319 33.129 187.319H62.96V156.463C62.96 156.463 61.464 120.375 99.492 120.375H154.545C154.545 120.375 192.176 118.814 192.176 80.363C192.176 41.912 187.265 0 126.916 0ZM96.53 20.485C102.13 20.485 106.666 25.02 106.666 30.62C106.666 36.22 102.13 40.755 96.53 40.755C90.93 40.755 86.395 36.22 86.395 30.62C86.395 25.02 90.93 20.485 96.53 20.485Z" fill="#3776AB"/>
      <path d="M129.084 256C189.86 256 201.185 228.717 201.185 228.717V199.22H146.1V208.482H110.58V177.295H218.487C218.487 177.295 256 177.923 256 121.583C256 65.243 222.871 68.681 222.871 68.681H193.04V99.537C193.04 99.537 194.536 135.625 156.508 135.625H101.455C101.455 135.625 63.824 137.186 63.824 175.637C63.824 214.088 68.735 256 129.084 256ZM159.47 235.515C153.87 235.515 149.334 230.98 149.334 225.38C149.334 219.78 153.87 215.245 159.47 215.245C165.07 215.245 169.605 219.78 169.605 225.38C169.605 230.98 165.07 235.515 159.47 235.515Z" fill="#FFD43B"/>
    </svg>
  ),
  OpenAI: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.0462 6.0462 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1195 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.453l-.142.0805L8.704 5.4596a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l3.8556-2.2086 3.8556 2.2086v4.4172l-3.8556 2.2086-3.8556-2.2086z"/>
    </svg>
  ),
  LangChain: () => <div className="w-12 h-12 flex items-center justify-center"><span className="text-3xl">🦜</span></div>,
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
    <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
      <path d="M4 12H13.5V4L20 12H10.5V20L4 12Z" fill="#FF4F00"/>
    </svg>
  ),
  PyTorch: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
      <path d="M12.9 22.8C12.9 22.8 11.4 22.8 10.3 21.6C9.2 20.4 9.2 18.7 9.8 17.5L12.5 12.2L11 9.3L7.7 15.8C7.1 17 6.8 18.3 7 19.6C7.2 21 8 22.2 9.2 23.1C10.4 24 11.9 24.4 13.4 24.3C14.9 24.1 16.2 23.5 17.2 22.5L16 21.3C15.2 22.2 14.1 22.7 12.9 22.8Z" fill="#EE4C2C"/>
    </svg>
  ),
  FastAPI: () => (
    <svg viewBox="0 0 24 24" className="w-12 h-12" fill="none">
      <path d="M12 0C5.38 0 0 5.38 0 12C0 18.62 5.38 24 12 24C18.62 24 24 18.62 24 12C24 5.38 18.62 0 12 0ZM11.16 19.5L10.04 12.82H6.96L12.84 4.5L13.96 11.18H17.04L11.16 19.5Z" fill="#009688"/>
    </svg>
  ),
};

// ─── Icon resolver for persona / domain / outcome icons ───────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  GraduationCap, Laptop, UserCheck, RefreshCw,
  Coins, Users, Globe, Activity, Shield, Network, Play,
  Fingerprint, Target, BarChart3, Trophy, Timer, Zap, Medal,
};

function resolveIcon(name: string, className = 'w-6 h-6'): React.ReactNode {
  const Icon = ICON_MAP[name] ?? GraduationCap;
  return <Icon className={className} />;
}

// ─── Defaults (fallback if DB is empty) ──────────────────────────────────────

const DEFAULT_HERO_STATS  = JSON.stringify([{ val: '15,000+', label: 'Learners Trained' }, { val: '11.80 LPA', label: 'Avg CTC (India)' }, { val: '88%', label: 'Job Conversion Rate' }, { val: '260+', label: 'Hiring Startups' }]);
const DEFAULT_PERSONAS    = JSON.stringify([{ title: 'Students & Freshers', desc: 'No prior coding required.', icon: 'GraduationCap' }, { title: 'Tech Professionals', desc: 'Transition into GenAI & MLOps.', icon: 'Laptop' }, { title: 'Non-Tech Professionals', desc: 'Learn AI tools and automation.', icon: 'UserCheck' }, { title: 'Career Re-starters', desc: 'Weekend-only model.', icon: 'RefreshCw' }]);
const DEFAULT_PROJECTS    = JSON.stringify([]);
const DEFAULT_TESTIMONIALS = JSON.stringify([]);
const DEFAULT_GAMIFICATION = JSON.stringify([{ id: 'quizzes', label: 'Weekly Quizzes', icon: 'Timer', title: 'Structured Knowledge Checks', desc: 'Every weekend session ends with a rapid-fire quiz.', stat: '24+ Quizzes', color: 'text-blue-400' }]);
const DEFAULT_DOMAINS     = JSON.stringify([]);
const DEFAULT_TOOLS       = JSON.stringify([]);
const DEFAULT_FAQS        = JSON.stringify([]);
const DEFAULT_PARTNERS    = JSON.stringify([]);
const DEFAULT_OUTCOMES    = JSON.stringify([]);
const DEFAULT_CAREER_INDIA  = JSON.stringify([{ year: 'Year 1', role: 'Jr. AI Engineer', ctc: '₹4L - ₹7L', h: '25%', color: 'from-slate-600 to-slate-500' }]);
const DEFAULT_CAREER_GLOBAL = JSON.stringify([{ year: 'Year 1', role: 'Remote AI Dev', ctc: '$5K - $8K', h: '25%', color: 'from-slate-600 to-slate-500' }]);
const DEFAULT_COMP_FEATURES = JSON.stringify([]);
const DEFAULT_COMP_ROLES    = JSON.stringify([]);
const DEFAULT_COMP_TOOLS    = JSON.stringify([]);
const DEFAULT_COMP_PROJECTS = JSON.stringify([]);
const DEFAULT_COMP_USPS     = JSON.stringify([]);
const DEFAULT_COMP_CTC_IN   = JSON.stringify([]);
const DEFAULT_COMP_CTC_GL   = JSON.stringify([]);
const DEFAULT_COMP_HEADERS  = JSON.stringify(['Key Feature', 'InternX-AI', 'Internshala', 'Forage']);
const DEFAULT_COMP_ROWS     = JSON.stringify([]);
const DEFAULT_FOUNDATION_FEATURES = JSON.stringify(['Weekend Live Classes', 'Real Industry Projects', 'ResumeNFT Proof', 'Weekday Practice Sessions', 'Python & SQL Mastery', 'Internship Certificate']);
const DEFAULT_ELITE_FEATURES = JSON.stringify(['Everything in Foundation', 'Advanced MLOps & GenAI', 'Enterprise-Grade Projects', 'Unlimited Interview Calls']);

// ─── Component ────────────────────────────────────────────────────────────────

export default function InternXAIPage() {
  const router = useRouter();

  // ── CMS hook ────────────────────────────────────────────────────────────
  const { get } = usePageContent('internx-ai');

  // ── Local UI state ───────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('foundation');
  const [activeGamificationId, setActiveGamificationId] = useState('quizzes');
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [comparisonCategory, setComparisonCategory] = useState<'features' | 'tools' | 'roles' | 'projects' | 'ctc' | 'usps' | 'fees'>('features');
  const [earningsRegion, setEarningsRegion] = useState<'india' | 'global'>('india');
  const [isInternational, setIsInternational] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkLocation = async () => {
      try {
        const res  = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data?.country_code && data.country_code !== 'IN') setIsInternational(true);
      } catch { /* silently ignore */ }
    };
    checkLocation();
  }, []);

  // ── CMS: Hero ────────────────────────────────────────────────────────────
  const accentColor   = get('hero', 'accent_color',       '#3b82f6');
  const accentColor2  = get('hero', 'accent_color_2',     '#a855f7');
  const badgeText     = get('hero', 'badge_text',         'Foundation → Elite Pathway');
  const headline1     = get('hero', 'headline_1',         'InternX-AI');
  const headline2     = get('hero', 'headline_2',         'Certified');
  const heroBody      = get('hero', 'body_text',          'A 6-month, weekend-only AI program to build real projects, earn ResumeNFT™ proof, and become eligible for Elite AI roles.');
  const heroSubtext   = get('hero', 'subtext',            'PROJECTS → PROOF → INTERVIEWS → ELITE ELIGIBILITY');
  const brochureBtnLabel     = get('hero', 'btn_brochure_label',   'Download Brochure');
  const brochureUrl          = get('hero', 'brochure_url',         'https://drive.google.com/file/d/1NliWMlZnlgO_taABHlEKYQ93__sXtuvs/view?usp=sharing');
  const scholarshipBtnLabel  = get('hero', 'btn_scholarship_label','Check Scholarship Test');
  const heroStatsRaw  = get('hero', 'stats_json',         DEFAULT_HERO_STATS);
  const heroStats     = safeParse<{ val: string; label: string }[]>(heroStatsRaw, []);

  // ── CMS: Community ───────────────────────────────────────────────────────
  const communityHeadline  = get('community', 'headline',    'Global Learner');
  const communityAccent    = get('community', 'accent_word', 'Community');
  const communityBody      = get('community', 'body_text',   'Join thousands of aspiring AI Engineers from 30+ countries building the future together.');

  // ── CMS: Manifesto ───────────────────────────────────────────────────────
  const manifestoQuote  = get('manifesto', 'quote',      '"Real AI Careers. Built with Projects. Verified with Proof. Hired with Confidence."');
  const manifestoNeg1   = get('manifesto', 'negative_1', 'No course fatigue');
  const manifestoNeg2   = get('manifesto', 'negative_2', 'No fake resumes');
  const manifestoPos1   = get('manifesto', 'positive_1', 'Only proof-driven careers');

  // ── CMS: Personas ────────────────────────────────────────────────────────
  const personasHeadline = get('personas', 'headline',    'Who is InternX-AI For?');
  const personasSubtext  = get('personas', 'subtext',     'Designed for serious career builders across all backgrounds.');
  const personasRaw      = get('personas', 'items_json',  DEFAULT_PERSONAS);
  const personasData     = safeParse<{ title: string; desc: string; icon: string; color: string; }[]>(personasRaw, []);

  // ── CMS: Projects ────────────────────────────────────────────────────────
  const projectsHeadline = get('projects', 'headline',    'Built by InternX Students');
  const projectsSubtext  = get('projects', 'subtext',     'These aren\'t "todo apps". These are full-stack AI solutions solving real industry problems.');
  const projectsRaw      = get('projects', 'items_json',  DEFAULT_PROJECTS);
  const projectsGithubLink = get('projects', 'github_link', 'https://wa.me/918700236923');
  const studentProjects  = safeParse<{ title: string; desc: string; tech: string[]; author: string; role: string; image: string }[]>(projectsRaw, []);

  // ── CMS: Pricing ─────────────────────────────────────────────────────────
  const pricingHeadline  = get('pricing', 'headline',                  'Program Fees');
  const pricingSubtext   = get('pricing', 'subtext',                   'Merit-based scholarships available based on test performance.');
  const foundationName   = get('pricing', 'foundation_name',           'Foundation');
  const foundationTagline = get('pricing', 'foundation_tagline',       '6 Months • Beginner Friendly');
  const foundationPriceINR = get('pricing', 'foundation_price_inr',    '₹1,20,000');
  const foundationPriceUSD = get('pricing', 'foundation_price_usd',    '$1,999');
  const foundationEMI      = get('pricing', 'foundation_emi',          'EMI starts at ₹3,933/month (India Only)');
  const foundationSchMax   = get('pricing', 'foundation_scholarship_max', '₹50,000');
  const foundationSchAvg   = get('pricing', 'foundation_scholarship_avg', '₹15k - ₹20k');
  const foundationFeatRaw  = get('pricing', 'foundation_features_json', DEFAULT_FOUNDATION_FEATURES);
  const foundationFeatures = safeParse<string[]>(foundationFeatRaw, []);

  const eliteName       = get('pricing', 'elite_name',                'Elite');
  const eliteTagline    = get('pricing', 'elite_tagline',             '12 Months • Full Career Path');
  const elitePriceINR   = get('pricing', 'elite_price_inr',          '₹2,00,000');
  const elitePriceUSD   = get('pricing', 'elite_price_usd',          '$3,499');
  const eliteEMI        = get('pricing', 'elite_emi',                'EMI starts at ₹6,555/month (India Only)');
  const eliteSchMax     = get('pricing', 'elite_scholarship_max',    '₹1,00,000');
  const eliteSchAvg     = get('pricing', 'elite_scholarship_avg',    '₹30k - ₹40k');
  const eliteFeatRaw    = get('pricing', 'elite_features_json',      DEFAULT_ELITE_FEATURES);
  const eliteFeatures   = safeParse<string[]>(eliteFeatRaw, []);

  const foundationAmountINR = parseInt(get('pricing', 'foundation_amount_inr', '12000000'), 10);
  const foundationAmountUSD = parseInt(get('pricing', 'foundation_amount_usd', '199900'), 10);
  const eliteAmountINR      = parseInt(get('pricing', 'elite_amount_inr', '20000000'), 10);
  const eliteAmountUSD      = parseInt(get('pricing', 'elite_amount_usd', '349900'), 10);

  // ── CMS: Earnings ────────────────────────────────────────────────────────
  const earningsHeadline   = get('earnings', 'headline',    'Earnings Projection');
  const earningsSubtext    = get('earnings', 'subtext',     'Typical career progression for AI Engineers with real project experience.');
  const earningsDisclaimer = get('earnings', 'disclaimer',  'Salaries depend on skills, performance, interviews, and market conditions.');
  const indiaDataRaw       = get('earnings', 'india_data_json',  DEFAULT_CAREER_INDIA);
  const globalDataRaw      = get('earnings', 'global_data_json', DEFAULT_CAREER_GLOBAL);
  const careerGrowthData   = {
    india:  safeParse<{ year: string; role: string; ctc: string; h: string; color: string }[]>(indiaDataRaw, []),
    global: safeParse<{ year: string; role: string; ctc: string; h: string; color: string }[]>(globalDataRaw, []),
  };

  // ── CMS: Comparison ──────────────────────────────────────────────────────
  const compHeadline    = get('comparison', 'headline',           'Foundation vs Elite');
  const compSubtext     = get('comparison', 'subtext',            'The detailed breakdown of what you unlock at each level.');
  const compFeaturesRaw = get('comparison', 'features_json',      DEFAULT_COMP_FEATURES);
  const compRolesRaw    = get('comparison', 'roles_json',         DEFAULT_COMP_ROLES);
  const compToolsRaw    = get('comparison', 'tools_json',         DEFAULT_COMP_TOOLS);
  const compProjectsRaw = get('comparison', 'projects_json',      DEFAULT_COMP_PROJECTS);
  const compUspsRaw     = get('comparison', 'usps_json',          DEFAULT_COMP_USPS);
  const compCtcIndiaRaw = get('comparison', 'ctc_india_json',     DEFAULT_COMP_CTC_IN);
  const compCtcGlobalRaw= get('comparison', 'ctc_global_json',    DEFAULT_COMP_CTC_GL);

  const splitComparisons = {
    features: safeParse<{ feature: string; foundation: string; elite: string }[]>(compFeaturesRaw, []),
    roles:    safeParse<{ foundation: string; elite: string }[]>(compRolesRaw, []),
    tools:    safeParse<{ tool: string; foundation: string; elite: string }[]>(compToolsRaw, []),
    projects: safeParse<{ aspect: string; aspectType?: string; foundation: string; elite: string }[]>(compProjectsRaw, []),
    usps:     safeParse<{ usp: string; foundation: string; elite: string }[]>(compUspsRaw, []),
    ctc: {
      india:  safeParse<{ year: string; foundation: string; elite: string }[]>(compCtcIndiaRaw, []),
      global: safeParse<{ year: string; foundation: string; elite: string }[]>(compCtcGlobalRaw, []),
    },
  };

  // ── CMS: Gamification ────────────────────────────────────────────────────
  const gamHeadline  = get('gamification', 'headline', 'Gamified LMS Experience');
  const gamSubtext   = get('gamification', 'subtext',  'Structured assessment. Not gimmicky. Earn your proof step by step.');
  const gamRaw       = get('gamification', 'items_json', DEFAULT_GAMIFICATION);
  const gamificationData = safeParse<{ id: string; label: string; icon: string; title: string; desc: string; stat: string; color: string; video:string }[]>(gamRaw, []);
  const activeGamification = gamificationData.find(g => g.id === activeGamificationId) ?? gamificationData[0];

  // ── CMS: Domains ─────────────────────────────────────────────────────────
  const domainsHeadline = get('domains', 'headline',    'Real Industry Domains');
  const domainsSubtext  = get('domains', 'subtext',     'Projects are pre-defined and guided for Foundation. Custom tracks available for Elite.');
  const domainsRaw      = get('domains', 'items_json',  DEFAULT_DOMAINS);
  const industryDomains = safeParse<{ title: string; desc: string; icon: string; color: string; }[]>(domainsRaw, []);

  // ── CMS: Tools ───────────────────────────────────────────────────────────
  const toolsHeadline = get('tools', 'headline',    'Tools & Tech Stack');
  const toolsSubtext  = get('tools', 'subtext',     "Learners don't need 100 tools. They need the right ones used by real companies.");
  const toolsRaw      = get('tools', 'items_json',  DEFAULT_TOOLS);
  const tools         = safeParse<{ name: string; icon: string; desc: string }[]>(toolsRaw, []);

  // ── CMS: Testimonials ────────────────────────────────────────────────────
  const testimonialsHeadline = get('testimonials', 'headline', 'Success Stories');
  const testimonialsSubtext  = get('testimonials', 'subtext',  "Don't just take our word for it.");
  const testimonialsRaw      = get('testimonials', 'items_json', DEFAULT_TESTIMONIALS);
  const testimonials         = safeParse<{ name: string; role: string; quote: string; avatar: string; rating: number }[]>(testimonialsRaw, []);

  // ── CMS: Competitor ──────────────────────────────────────────────────────
  const competitorHeadline   = get('competitor', 'headline',    'Competitor Comparison');
  const competitorDisclaimer = get('competitor', 'disclaimer',  'Comparison data based on publicly available features as of 2026.');
  const competitorHeadersRaw = get('competitor', 'headers_json', DEFAULT_COMP_HEADERS);
  const competitorRowsRaw    = get('competitor', 'rows_json',    DEFAULT_COMP_ROWS);
  const competitorHeaders    = safeParse<string[]>(competitorHeadersRaw, []);
  const competitorRows       = safeParse<{ feature: string; values: string[] }[]>(competitorRowsRaw, []);

  // ── CMS: Outcomes ────────────────────────────────────────────────────────
  const outcomesHeadline = get('outcomes', 'headline',    'Strategic Outcomes');
  const outcomesSubtext  = get('outcomes', 'subtext',     'Why leading companies trust InternX-AI graduates.');
  const outcomesRaw      = get('outcomes', 'items_json',  DEFAULT_OUTCOMES);
  const strategicOutcomes = safeParse<{ title: string; desc: string; icon: string; color: string; }[]>(outcomesRaw, []);

  // ── CMS: FAQs ────────────────────────────────────────────────────────────
  const faqsHeadline = get('faqs', 'headline',    'Frequently Asked Questions');
  const faqsRaw      = get('faqs', 'items_json',  DEFAULT_FAQS);
  const faqs         = safeParse<{ q: string; a: string }[]>(faqsRaw, []);

  // ── CMS: Ecosystem ───────────────────────────────────────────────────────
  const ecosystemHeadline = get('ecosystem', 'headline',  'The CLC Ecosystem');
  const ecosystemSubtext  = get('ecosystem', 'subtext',   'InternX-AI operates inside the full Career Lab Consulting ecosystem.');
  const ecosystemVideo    = get('ecosystem', 'video_url', 'https://www.pexels.com/download/video/7252806/');

  // ── CMS: Partners ────────────────────────────────────────────────────────
  const partnersLabel = get('partners', 'label',      'Hiring Partners & Alumni Work At');
  const partnersRaw   = get('partners', 'items_json', DEFAULT_PARTNERS);
  const hiringPartners = safeParse<{ name: string; logo: string }[]>(partnersRaw, []);

  // ── CMS: Final CTA ───────────────────────────────────────────────────────
  const ctaHeadline1   = get('cta', 'headline_1',   'Start where you belong.');
  const ctaHeadline2   = get('cta', 'headline_2',   'Advance when you\'re ready.');
  const ctaAccentWord  = get('cta', 'accent_word',  'Advance');
  const ctaBtnFound    = get('cta', 'btn_foundation','Start with Foundation');
  const ctaBtnElite    = get('cta', 'btn_elite',     'Start with Elite');
  const ctaFootnote    = get('cta', 'footnote',      'Elite is earned, not enrolled.');

  // ── Actions ──────────────────────────────────────────────────────────────
  const handleRegister = (planName: 'Foundation' | 'Elite') => {
    const isFoundation = planName === 'Foundation';
    const priceDisplay = isInternational
      ? (isFoundation ? foundationPriceUSD : elitePriceUSD)
      : (isFoundation ? foundationPriceINR : elitePriceINR);

    const params = new URLSearchParams({
      planId:       planName.toLowerCase(),
      planName,
      priceDisplay,
      rawAmountINR: (isFoundation ? foundationAmountINR : eliteAmountINR).toString(),
      rawAmountUSD: (isFoundation ? foundationAmountUSD : eliteAmountUSD).toString(),
      intl:         isInternational ? 'true' : 'false',
    });
    router.push(`/checkout/b2c?${params.toString()}`);
  };

  const handleBookDemo   = () => router.push('/book-demo');
  const handleScholarship = (planName: 'Foundation' | 'Elite') => router.push(`/scholarship-test?plan=${planName}`);

  // ── Competitor cell renderer ─────────────────────────────────────────────
  const renderCompetitorValue = (val: string) => {
    const v = val.toLowerCase();
    if (v === 'yes' || v === 'weekly') return <Check className="w-5 h-5 text-green-500 mx-auto" strokeWidth={3} />;
    if (v === 'no')  return <X className="w-5 h-5 text-red-500 mx-auto opacity-70" />;
    if (['limited','simulated','partial','optional','manual','conditional'].includes(v)) {
      return (
        <div className="flex flex-col items-center gap-1">
          <AlertTriangle className="w-4 h-4 text-yellow-500" />
          <span className="text-[10px] text-yellow-500 font-bold uppercase">{val}</span>
        </div>
      );
    }
    return <span className="text-xs font-bold text-slate-300">{val}</span>;
  };

  // ── Fees rows (derived from pricing CMS) ─────────────────────────────────
  const feesRows = [
    { item: 'Program Fee (India)',      foundation: foundationPriceINR, elite: elitePriceINR, type: 'fee' },
    { item: 'Program Fee (Global)',     foundation: foundationPriceUSD, elite: elitePriceUSD, type: 'fee' },
    { item: 'Scholarship (Test-based)', foundation: 'Available',        elite: 'Available',   type: 'scholarship' },
    { item: 'EMI (India Only)',         foundation: foundationEMI,      elite: eliteEMI,       type: 'fee' },
  ];

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#020617] min-h-screen flex flex-col font-sans text-slate-100 overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
      <B2CHeader />

      <main className="flex-grow">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-10 px-6 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] rounded-full blur-[120px] -z-10"
            style={{ background: `${accentColor}1a` }}
          />
          <article className="max-w-7xl mx-auto text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-in fade-in slide-in-from-bottom-4"
              style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: accentColor }}>{badgeText}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight text-white">
              {headline1}<br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColor2})` }}
              >
                {headline2}
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-slate-300 text-lg leading-relaxed mb-10 px-2">
              {heroBody}
              <span className="block mt-4 text-xs md:text-sm text-slate-500 font-medium tracking-wide">
                {heroSubtext}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => window.open(brochureUrl, '_blank')}
                className="w-full sm:w-auto px-8 py-4 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 duration-200"
                style={{ background: accentColor, boxShadow: `0 8px 24px ${accentColor}30` }}
              >
                <Rocket className="w-5 h-5" /> {brochureBtnLabel}
              </button>
              <Link
                href={`/scholarship-test?plan=${activeTab === 'elite' ? 'Elite' : 'Foundation'}`}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 duration-200"
              >
                <FileCheck className="w-5 h-5" /> {scholarshipBtnLabel}
              </Link>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-80">
              {heroStats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-xl md:text-2xl font-black text-white">{stat.val}</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* ── GLOBAL COMMUNITY ────────────────────────────────────────── */}
        <section className="py-12 px-6 bg-[#03081a]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
              <div className="text-left">
                <h2 className="text-2xl md:text-3xl font-black uppercase text-white mb-2">
                  {communityHeadline}{' '}
                  <span style={{ color: accentColor }}>{communityAccent}</span>
                </h2>
                <p className="text-slate-400 text-sm md:text-base max-w-lg">{communityBody}</p>
              </div>
              <div className="flex -space-x-4">
                {[1,2,3,4].map((_,i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#03081a] bg-slate-800 overflow-hidden relative">
                    <Image src={`https://randomuser.me/api/portraits/thumb/men/${i+20}.jpg`} alt="Student" fill sizes="40px" className="object-cover" />
                  </div>
                ))}
                <div
                  className="w-10 h-10 rounded-full border-2 border-[#03081a] flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: accentColor }}
                >
                  +2k
                </div>
              </div>
            </div>
            <GlobalNetwork />
          </div>
        </section>

        {/* ── MANIFESTO ────────────────────────────────────────────────── */}
        <section className="py-12 px-6">
          <div
            className="max-w-5xl mx-auto p-8 md:p-12 text-center rounded-3xl backdrop-blur-sm border-y border-white/10"
            style={{ background: `linear-gradient(to right, ${accentColor}1a, ${accentColor2}1a)` }}
          >
            <h2 className="text-2xl md:text-4xl font-black italic text-white mb-6">{manifestoQuote}</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <span className="flex items-center gap-2 text-slate-300 font-bold"><XCircle className="text-red-500 w-5 h-5"/> {manifestoNeg1}</span>
              <span className="flex items-center gap-2 text-slate-300 font-bold"><XCircle className="text-red-500 w-5 h-5"/> {manifestoNeg2}</span>
              <span className="flex items-center gap-2 text-white font-bold"><CheckCircle2 className="text-green-500 w-5 h-5"/> {manifestoPos1}</span>
            </div>
          </div>
        </section>

        {/* ── PERSONAS ─────────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black uppercase text-white mb-4">{personasHeadline}</h2>
              <p className="text-slate-400">{personasSubtext}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personasData.map((p, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-blue-500/50 transition-all hover:-translate-y-1">
                  <div className="bg-slate-900 p-3 rounded-lg w-fit mb-4">
                    {resolveIcon(p.icon, `w-6 h-6 ${p.color || 'text-blue-400'}`)}
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STUDENT PROJECTS ─────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-[#050b24] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex justify-center p-3 rounded-full mb-6 border" style={{ background: `${accentColor2}1a`, borderColor: `${accentColor2}33` }}>
                <Code2 className="w-8 h-8" style={{ color: accentColor2 }} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4">{projectsHeadline}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">{projectsSubtext}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {studentProjects.map((project, idx) => (
                <div key={idx} className="group bg-[#0b0f1f] border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20 flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1f] to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-300">{t}</span>
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
              <Link
                href={projectsGithubLink}
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-bold transition-all hover:scale-105 group hover:border-purple-500/30 shadow-lg shadow-black/20"
              >
                <Github className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" />
                <span>View GitHub Portfolio Gallery</span>
                <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────────────────────── */}
        <section id="pricing" className="py-24 px-6 bg-[#03081a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black uppercase text-white">{pricingHeadline}</h2>
              <p className="text-slate-400">{pricingSubtext}</p>
            </div>

            <div className="flex justify-center mb-12 overflow-x-auto pb-4">
              <div className="flex space-x-4 min-w-max px-2">
                <button
                  onClick={() => setActiveTab('foundation')}
                  className="px-6 py-2 rounded-full font-bold transition-all"
                  style={activeTab === 'foundation' ? { background: accentColor, color: '#fff', boxShadow: `0 4px 20px ${accentColor}40` } : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {foundationName} (Months 1-6)
                </button>
                <button
                  onClick={() => setActiveTab('elite')}
                  className="px-6 py-2 rounded-full font-bold transition-all"
                  style={activeTab === 'elite' ? { background: accentColor2, color: '#fff', boxShadow: `0 4px 20px ${accentColor2}40` } : { background: 'rgba(255,255,255,0.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {eliteName} (Months 7-12)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

              {/* Foundation Card */}
              <div className={`bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition-all group relative flex flex-col ${activeTab !== 'foundation' ? 'opacity-50 blur-[1px]' : ''}`}>
                <h3 className="text-2xl font-bold mb-2 text-white">{foundationName}</h3>
                <p className="text-slate-400 text-sm mb-6">{foundationTagline}</p>
                <div className="flex items-end gap-2 mb-2">
                  <div className="text-4xl font-black text-white">{isInternational ? foundationPriceUSD : foundationPriceINR}</div>
                </div>
                <div className="mb-6">
                  <button onClick={() => handleScholarship('Foundation')} className="inline-flex items-center gap-2 text-green-400 text-xs font-bold px-4 py-2 rounded-full hover:bg-green-500/20 transition-colors" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                    <Zap className="w-3 h-3" /> Scholarship Available (Max {foundationSchMax})
                  </button>
                  <p className="text-[10px] text-slate-500 mt-2 ml-1">Avg Scholarship: {foundationSchAvg}</p>
                </div>
                {!isInternational && (
                  <div className="mb-6 p-3 rounded-lg text-xs font-bold text-blue-400 text-center" style={{ background: `${accentColor}1a` }}>
                    {foundationEMI}
                  </div>
                )}
                <ul className="space-y-3 mb-8 flex-grow">
                  {foundationFeatures.map((feat, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" /> {feat}
                    </li>
                  ))}
                </ul>
                <div className="space-y-3 mt-auto">
                  <button onClick={() => handleRegister('Foundation')} className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10">Register Now</button>
                  <button onClick={handleBookDemo} className="w-full py-4 bg-transparent border border-white/20 text-white font-bold rounded-xl hover:bg-white/5 transition-colors">Book your Demo</button>
                </div>
              </div>

              {/* Elite Card */}
              <div className={`bg-[#0b0f1f] rounded-3xl p-8 relative overflow-hidden group flex flex-col ${activeTab !== 'elite' ? 'opacity-50 blur-[1px]' : ''}`} style={{ border: `1px solid ${accentColor2}4d` }}>
                <div className="absolute top-0 right-0 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase" style={{ background: accentColor2 }}>Career Accelerator</div>
                <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentColor2}, ${accentColor})` }}>{eliteName}</h3>
                <p className="text-slate-400 text-sm mb-6">{eliteTagline}</p>
                <div className="flex items-end gap-2 mb-2">
                  <div className="text-4xl font-black text-white">{isInternational ? elitePriceUSD : elitePriceINR}</div>
                </div>
                <div className="mb-6">
                  <button onClick={() => handleScholarship('Elite')} className="inline-flex items-center gap-2 text-purple-400 text-xs font-bold px-4 py-2 rounded-full animate-pulse hover:animate-none transition-colors" style={{ background: `${accentColor2}1a`, border: `1px solid ${accentColor2}33` }}>
                    <Zap className="w-3 h-3" /> Scholarship Available (Max {eliteSchMax})
                  </button>
                  <p className="text-[10px] text-slate-500 mt-2 ml-1">Avg Scholarship: {eliteSchAvg}</p>
                </div>
                {!isInternational && (
                  <div className="mb-6 p-3 rounded-lg text-xs font-bold text-purple-400 text-center" style={{ background: `${accentColor2}1a` }}>
                    {eliteEMI}
                  </div>
                )}
                <div className="mb-6 p-3 rounded-lg text-xs font-bold text-purple-400 text-center" style={{ background: `${accentColor2}1a` }}>
                  Includes {foundationName} + Advanced Layer
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {eliteFeatures.map((feat, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: accentColor2 }} /> {i === 0 ? <strong>{feat}</strong> : feat}
                    </li>
                  ))}
                </ul>
                <div className="space-y-3 mt-auto">
                  <button onClick={() => handleRegister('Elite')} className="w-full py-4 text-white font-bold rounded-xl transition-colors" style={{ background: accentColor2, boxShadow: `0 4px 20px ${accentColor2}33` }}>Register Now</button>
                  <button onClick={handleBookDemo} className="w-full py-4 bg-transparent text-white font-bold rounded-xl hover:bg-purple-900/20 transition-colors" style={{ border: `1px solid ${accentColor2}4d` }}>Book your Demo</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EARNINGS PROJECTION ──────────────────────────────────────── */}
        <section className="py-24 px-6 bg-slate-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">{earningsHeadline}</h2>
              <div className="flex justify-center gap-4 mt-6">
                <button onClick={() => setEarningsRegion('india')} className="px-4 py-1 rounded-full text-sm font-bold transition-all" style={earningsRegion === 'india' ? { background: accentColor, color: '#fff' } : { background: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}>India (INR)</button>
                <button onClick={() => setEarningsRegion('global')} className="px-4 py-1 rounded-full text-sm font-bold transition-all" style={earningsRegion === 'global' ? { background: '#16a34a', color: '#fff' } : { background: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}>Global (USD)</button>
              </div>
              <p className="text-slate-400 mt-4">{earningsSubtext}</p>
            </div>

            <div className="bg-[#020617] p-8 md:p-12 rounded-3xl border border-white/10 relative shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <TrendingUp className="w-32 h-32 text-blue-500" />
              </div>

              {/* Mobile bar chart */}
              <div className="flex flex-col gap-8 md:hidden relative z-10 pt-4">
                {careerGrowthData[earningsRegion].map((item, idx) => (
                  <div key={idx} className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{item.year}</span>
                      <span className="text-xs font-bold text-white">{item.role}</span>
                    </div>
                    <div className="relative h-10 w-full bg-white/5 rounded-r-full flex items-center">
                      <div className={`h-full rounded-r-full bg-gradient-to-r ${item.color} shadow-lg relative flex items-center`} style={{ width: item.h }}>
                        <div className="absolute right-4 text-white text-xs font-bold whitespace-nowrap flex items-center gap-1 drop-shadow-md">
                          <Wallet className="w-3 h-3" /> {item.ctc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop bar chart */}
              <div className="hidden md:flex flex-row items-end justify-center gap-8 h-96 relative z-10 pt-10">
                {careerGrowthData[earningsRegion].map((item, idx) => (
                  <div key={idx} className="w-1/4 h-full flex flex-col justify-end group">
                    <div className="relative flex-grow flex items-end justify-center mb-4">
                      <div className={`w-24 rounded-t-lg bg-gradient-to-t ${item.color} shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-110 relative`} style={{ height: item.h }}>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-blue-950 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg flex items-center gap-1">
                          <Wallet className="w-3 h-3" /> {item.ctc}
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
                <p className="text-[10px] text-slate-600 italic">{earningsDisclaimer}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOUNDATION vs ELITE COMPARISON ──────────────────────────── */}
        <section className="py-24 px-6 bg-[#020617] border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">{compHeadline}</h2>
              <p className="text-slate-400">{compSubtext}</p>
            </div>

            <div className="flex justify-center mb-8 gap-2 flex-wrap">
              {(['features','roles','ctc','tools','projects','usps','fees'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setComparisonCategory(tab)}
                  className="px-5 py-2.5 rounded-full text-sm font-bold border transition-all uppercase tracking-wide"
                  style={comparisonCategory === tab
                    ? { background: '#fff', color: '#000', border: '1px solid #fff', boxShadow: '0 0 15px rgba(255,255,255,0.3)' }
                    : { background: 'transparent', color: '#64748b', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-[#0b0f1f] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="grid grid-cols-3 bg-white/5 border-b border-white/10 text-xs md:text-sm font-black uppercase tracking-widest text-slate-500">
                <div className="p-4 md:p-6">Category</div>
                <div className="p-4 md:p-6 flex items-center gap-2" style={{ color: accentColor, background: `${accentColor}0d`, borderLeft: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: accentColor }}></span> Foundation
                </div>
                <div className="p-4 md:p-6 flex items-center gap-2" style={{ color: accentColor2, background: `${accentColor2}0d` }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor2 }}></span> Elite
                </div>
              </div>

              {comparisonCategory === 'features' && splitComparisons.features.map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                  <div className="p-4 md:p-6 text-sm font-bold text-white">{row.feature}</div>
                  <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5" style={{ background: `${accentColor}08` }}>{row.foundation}</div>
                  <div className="p-4 md:p-6 text-sm text-white font-semibold flex items-center gap-2" style={{ background: `${accentColor2}08` }}>
                    <CheckCircle2 className="w-4 h-4" style={{ color: accentColor2 }} /> {row.elite}
                  </div>
                </div>
              ))}
              {comparisonCategory === 'roles' && splitComparisons.roles.map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                  <div className="p-4 md:p-6 text-sm font-bold text-slate-400 flex items-center">Job Role {idx + 1}</div>
                  <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5" style={{ background: `${accentColor}08` }}>{row.foundation}</div>
                  <div className="p-4 md:p-6 text-sm font-bold" style={{ background: `${accentColor2}08`, color: accentColor2 }}>{row.elite}</div>
                </div>
              ))}
              {comparisonCategory === 'ctc' && (
                <div>
                  <div className="p-4 border-b border-white/10 flex justify-center gap-4 bg-white/5">
                    <button onClick={() => setEarningsRegion('india')} className="text-xs font-bold px-3 py-1 rounded" style={earningsRegion === 'india' ? { background: accentColor, color: '#fff' } : { background: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}>INDIA (INR)</button>
                    <button onClick={() => setEarningsRegion('global')} className="text-xs font-bold px-3 py-1 rounded" style={earningsRegion === 'global' ? { background: '#16a34a', color: '#fff' } : { background: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}>GLOBAL (USD)</button>
                  </div>
                  {splitComparisons.ctc[earningsRegion].map((row, idx) => (
                    <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                      <div className="p-4 md:p-6 text-sm font-bold text-white">{row.year}</div>
                      <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 font-mono" style={{ background: `${accentColor}08` }}>{row.foundation}</div>
                      <div className="p-4 md:p-6 text-sm text-green-400 font-bold font-mono" style={{ background: `${accentColor2}08` }}>{row.elite}</div>
                    </div>
                  ))}
                </div>
              )}
              {comparisonCategory === 'tools' && splitComparisons.tools.map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                  <div className="p-4 md:p-6 text-sm font-bold text-white">{row.tool}</div>
                  <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 flex items-center gap-2" style={{ background: `${accentColor}08` }}>
                    {row.foundation === 'No' ? <XCircle className="w-4 h-4 text-red-500/50" /> : <CheckCircle2 className="w-4 h-4 text-blue-500/50" />}
                    {row.foundation}
                  </div>
                  <div className="p-4 md:p-6 text-sm text-white font-semibold flex items-center gap-2" style={{ background: `${accentColor2}08` }}>
                    <CheckCircle2 className="w-4 h-4" style={{ color: accentColor2 }} /> {row.elite}
                  </div>
                </div>
              ))}
              {comparisonCategory === 'projects' && splitComparisons.projects.map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                  <div className="p-4 md:p-6 text-sm font-bold text-white">{row.aspect}</div>
                  <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 flex items-center gap-2" style={{ background: `${accentColor}08` }}>
                    {row.aspectType === 'bad' && <XCircle className="w-4 h-4 text-red-500" />}
                    {row.aspectType === 'warn' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                    {row.foundation}
                  </div>
                  <div className="p-4 md:p-6 text-sm text-white font-semibold flex items-center gap-2" style={{ background: `${accentColor2}08` }}>
                    <CheckCircle2 className="w-4 h-4" style={{ color: accentColor2 }} /> {row.elite}
                  </div>
                </div>
              ))}
              {comparisonCategory === 'usps' && splitComparisons.usps.map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                  <div className="p-4 md:p-6 text-sm font-bold text-white">{row.usp}</div>
                  <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5" style={{ background: `${accentColor}08` }}>{row.foundation}</div>
                  <div className="p-4 md:p-6 text-sm text-white font-semibold" style={{ background: `${accentColor2}08` }}>{row.elite}</div>
                </div>
              ))}
              {comparisonCategory === 'fees' && feesRows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-3 border-b border-white/5 hover:bg-white/5 transition-colors">
                  <div className="p-4 md:p-6 text-sm font-bold text-white">{row.item}</div>
                  <div className="p-4 md:p-6 text-sm text-slate-300 border-x border-white/5 font-mono" style={{ background: `${accentColor}08` }}>
                    {row.type === 'scholarship'
                      ? <button onClick={() => handleScholarship('Foundation')} className="text-blue-400 underline decoration-dashed underline-offset-4 hover:text-blue-300 font-bold cursor-pointer">{row.foundation}</button>
                      : row.foundation}
                  </div>
                  <div className="p-4 md:p-6 text-sm text-white font-bold font-mono" style={{ background: `${accentColor2}08` }}>
                    {row.type === 'scholarship'
                      ? <button onClick={() => handleScholarship('Elite')} className="text-purple-400 underline decoration-dashed underline-offset-4 hover:text-purple-300 font-bold cursor-pointer">{row.elite}</button>
                      : row.elite}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GAMIFICATION ─────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-[#050b24]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex justify-center p-3 rounded-full mb-6 border" style={{ background: 'rgba(234,179,8,0.1)', borderColor: 'rgba(234,179,8,0.2)' }}>
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4">{gamHeadline}</h2>
              <p className="text-slate-400">{gamSubtext}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-full lg:w-1/3 flex flex-col gap-3">
                {gamificationData.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveGamificationId(item.id)}
                    className="text-left p-5 rounded-xl border transition-all duration-300 flex items-center gap-4"
                    style={activeGamificationId === item.id
                      ? { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }
                      : { background: 'transparent', border: '1px solid transparent' }}
                  >
                    <div className={`${item.color} p-2 bg-white/5 rounded-lg shrink-0`}>
                      {resolveIcon(item.icon, 'w-5 h-5')}
                    </div>
                    <span className={`block font-bold text-sm ${activeGamificationId === item.id ? 'text-white' : 'text-slate-400'}`}>{item.label}</span>
                    {activeGamificationId === item.id && <ChevronRight className="ml-auto w-4 h-4 text-white/50" />}
                  </button>
                ))}
              </div>

              {activeGamification && (
                <div className="w-full lg:w-2/3">
                  <div className="bg-[#0f172a] border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl relative">
                    <div className="bg-[#1e293b] px-4 py-3 flex items-center gap-2 border-b border-slate-700">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="inline-block bg-[#020617] px-4 py-1 rounded text-[10px] text-slate-400 font-mono">
                          lms.internx.ai/assessments/{activeGamification.id}
                        </div>
                      </div>
                    </div>
                    <div className="relative aspect-video bg-black">
                      <video 
                           key={activeGamification.video} 
                           className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                           src={activeGamification.video}
                           autoPlay 
                           loop 
                           muted 
                           playsInline 
                         />
                      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-8 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 w-fit bg-white/5 border border-white/10">
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
              )}
            </div>
          </div>
        </section>

        {/* ── INDUSTRY DOMAINS ─────────────────────────────────────────── */}
        <section className="py-20 bg-white/5 border-y border-white/5 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-black uppercase mb-8 text-white">{domainsHeadline}</h2>
            <p className="text-slate-400 mb-12 max-w-2xl mx-auto">{domainsSubtext}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industryDomains.map((item, i) => (
                <div key={i} className="p-6 border border-white/10 rounded-xl hover:bg-white/5 transition-colors group cursor-default">
                  <div className="transform group-hover:scale-110 transition-transform duration-300 mb-2">
                    {resolveIcon(item.icon, `w-8 h-8 mx-auto ${item.color || 'text-blue-400'}`)}
                  </div>
                  <h4 className="font-bold text-white text-sm md:text-base">{item.title}</h4>
                  <p className="text-[10px] md:text-xs text-slate-400 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TOOLS ────────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black uppercase text-white mb-4">{toolsHeadline}</h2>
              <p className="text-slate-400">{toolsSubtext}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {tools.map((t, i) => {
                const IconComp = BrandIcons[t.icon];
                return (
                  <div key={i} className="bg-slate-900 border border-white/10 p-6 rounded-2xl flex flex-col items-center hover:border-blue-500/50 transition-colors">
                    <div className="mb-4">{IconComp ? <IconComp /> : <Code2 className="w-12 h-12 text-blue-400" />}</div>
                    <h4 className="font-bold text-white mb-1">{t.name}</h4>
                    <p className="text-xs text-slate-500 text-center">{t.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-[#03081a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-4">{testimonialsHeadline}</h2>
              <p className="text-slate-400">{testimonialsSubtext}</p>
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
                      <p className="text-xs" style={{ color: accentColor }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPETITOR COMPARISON ────────────────────────────────────── */}
        <section className="py-24 px-6 bg-[#03081a]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16 text-white">{competitorHeadline}</h2>
            <div className="overflow-x-auto rounded-3xl border border-white/10 shadow-2xl">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-[#0b0f1f]">
                    {competitorHeaders.map((h, i) => (
                      <th key={i} className={`p-4 text-xs font-black uppercase tracking-widest text-center ${i === 0 ? 'text-left sticky left-0 bg-[#0b0f1f] z-10 border-r border-white/10 text-slate-500' : ''}`}
                        style={i === 1 ? { background: `${accentColor}1a`, color: accentColor, borderLeft: `1px solid ${accentColor}33`, borderRight: `1px solid ${accentColor}33` } : i !== 0 ? { color: '#64748b' } : {}}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {competitorRows.map((row, i) => (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-bold text-sm text-white sticky left-0 bg-[#020617] z-10 border-r border-white/10 shadow-[2px_0_10px_rgba(0,0,0,0.5)]">{row.feature}</td>
                      {row.values.map((val, idx) => (
                        <td key={idx} className="p-4 text-center" style={idx === 0 ? { background: `${accentColor}08`, borderLeft: `1px solid ${accentColor}1a`, borderRight: `1px solid ${accentColor}1a` } : {}}>
                          {renderCompetitorValue(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-slate-500 mt-6 text-xs italic">{competitorDisclaimer}</p>
          </div>
        </section>

        {/* ── STRATEGIC OUTCOMES ───────────────────────────────────────── */}
        <section className="py-24 px-6 bg-slate-900/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-4">{outcomesHeadline}</h2>
              <p className="text-slate-400">{outcomesSubtext}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {strategicOutcomes.map((item, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="mb-4 bg-slate-950 p-3 rounded-lg w-fit">
                    {resolveIcon(item.icon, `w-8 h-8 ${item.color || 'text-blue-400'}`)}
                  </div>
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQS ─────────────────────────────────────────────────────── */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black uppercase mb-12 text-center text-white">{faqsHeadline}</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white/5 border rounded-xl overflow-hidden transition-all duration-300" style={activeFaqIndex === i ? { borderColor: `${accentColor}80`, background: 'rgba(255,255,255,0.1)' } : { borderColor: 'rgba(255,255,255,0.1)' }}>
                  <button
                    onClick={() => setActiveFaqIndex(activeFaqIndex === i ? null : i)}
                    className="w-full flex justify-between items-center p-6 text-left"
                    aria-expanded={activeFaqIndex === i}
                  >
                    <h4 className="font-bold text-white pr-4 text-sm md:text-base">{faq.q}</h4>
                    {activeFaqIndex === i
                      ? <ChevronDown className="w-5 h-5 shrink-0" style={{ color: accentColor }} />
                      : <Plus className="w-5 h-5 text-slate-500 shrink-0" />}
                  </button>
                  <div className={`px-6 text-sm text-slate-300 overflow-hidden transition-all duration-300 ease-in-out ${activeFaqIndex === i ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLC ECOSYSTEM ────────────────────────────────────────────── */}
        <section className="py-20 bg-[#03081a] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">{ecosystemHeadline}</h2>
              <p className="text-slate-400">{ecosystemSubtext}</p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <video src={ecosystemVideo} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* ── HIRING PARTNERS ──────────────────────────────────────────── */}
        <section className="py-12 border-t border-white/5 opacity-80">
          <div className="max-w-7xl mx-auto px-6 overflow-hidden">
            <p className="text-center text-xs uppercase tracking-widest mb-8 text-slate-500">{partnersLabel}</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
              {hiringPartners.map((p, i) => (
                <div key={i} className="relative h-12 w-32 md:h-14 md:w-40 bg-white p-2 rounded-lg opacity-80 hover:opacity-100 transition-opacity">
                  <Image src={p.logo} alt={p.name} fill className="object-contain p-2 grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
        <section className="py-24 px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 text-white leading-tight">
            {ctaHeadline1}<br/>
            <span style={{ color: accentColor }}>{ctaAccentWord}</span>
            {ctaHeadline2.replace(ctaAccentWord, '')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { setActiveTab('foundation'); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-8 py-4 text-white font-bold rounded-xl transition-all"
              style={{ background: accentColor, boxShadow: `0 4px 24px ${accentColor}50` }}
            >
              {ctaBtnFound}
            </button>
            <button
              onClick={() => { setActiveTab('elite'); document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="px-8 py-4 text-white font-bold rounded-xl transition-all"
              style={{ background: accentColor2, boxShadow: `0 4px 24px ${accentColor2}50` }}
            >
              {ctaBtnElite}
            </button>
          </div>
          <p className="mt-6 text-slate-500 text-sm">{ctaFootnote}</p>
        </section>

      </main>
      <Footer />
    </div>
  );
}