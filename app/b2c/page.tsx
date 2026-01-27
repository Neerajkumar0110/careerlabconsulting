'use client';

import React from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import B2CHero from '@/components/b2c/B2CHero';
import LMSPreview from '@/components/b2c/LMSPreview'; 
import CourseGrid from '@/components/b2c/CourseGrid';
import StatsSection from '@/components/b2c/StatsSection';
import CompanyJourney from '@/components/sections/CompanyJourney';
import AdvantagesSection from '@/components/b2c/AdvantagesSection';
import PillarsSection from '@/components/b2c/PillarsSection';
import GlobalNetwork from '@/components/b2c/GlobalNetwork';
import MediaPresence from '@/components/b2c/MediaPresence';
import MasterClassSection from '@/components/b2c/MasterClassSection';
import LogoSection from '@/components/b2c/LogoSection';
import CurriculumSection from '@/components/b2c/CurriculumSection';
import MentorshipSection from '@/components/b2c/MentorshipSection';
import AlumniSuccess from '@/components/b2c/AlumniSuccess';
import FAQSection from '@/components/b2c/FAQSection';
import PricingSection from '@/components/b2c/PricingSection';
import { Analytics } from '@vercel/analytics/next';
import LiveTrafficSection from '@/components/sections/LiveTrafficSection';
import Footer from '@/components/b2c/Footer';
import { ArrowRight, Brain, Shield, Database, LayoutPanelTop, Box } from 'lucide-react';

export default function B2CPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <B2CHeader />
      <Analytics />
      <div className="pt-20">
        <B2CHero />
        <CourseGrid />
        <LMSPreview />
        <StatsSection />
        <CompanyJourney />
        <AdvantagesSection />
        <PillarsSection />
        <GlobalNetwork />
        <MediaPresence />
        <MasterClassSection />
        <LogoSection />
        <CurriculumSection />
        <MentorshipSection />
        <AlumniSuccess />
        <FAQSection />
        <PricingSection />
        <LiveTrafficSection />
        <Footer />
      </div>
    </main>
  );
}