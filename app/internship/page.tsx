'use client';

import React from 'react';
import Image from 'next/image';
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
        <MediaPresence />
        <MasterClassSection />
        <LogoSection />
        <CurriculumSection />
        <MentorshipSection />
        <AlumniSuccess />
        <FAQSection />
        <PricingSection />
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
                      <GlobalNetwork />
                    </div>
        </section>
        <LiveTrafficSection />
        <Footer />
      </div>
    </main>
  );
}