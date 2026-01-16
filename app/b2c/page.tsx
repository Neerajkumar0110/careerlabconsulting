import B2CHeader from '@/components/b2c/B2CHeader';
import B2CHero from '@/components/b2c/B2CHero';
import LMSPreview from '@/components/b2c/LMSPreview'; 
import CourseGrid from '@/components/b2c/CourseGrid';
import CurriculumSection from '@/components/b2c/CurriculumSection';
import { ArrowRight, Brain, Shield, Database, LayoutPanelTop } from 'lucide-react';
import MentorshipSection from '@/components/b2c/MentorshipSection';
import AlumniSuccess from '@/components/b2c/AlumniSuccess';
import FAQSection from '@/components/b2c/FAQSection';
import PricingSection from '@/components/b2c/PricingSection';
import Footer from '@/components/b2c/Footer';

const domains = [
  { name: 'InternX-AI', icon: Brain, desc: 'Autonomous Agent Deployment & Neural Training.' },
  { name: 'InternX-Cyber Security', icon: Shield, desc: 'Advanced AI Security & Threat Intelligence.' },
  { name: 'InternX-Blockchain', icon: Database, desc: 'Decentralized Ledger & Smart Contract AI.' },
  { name: 'InternX-Cloud & DevOps', icon: LayoutPanelTop, desc: 'Scalable Infrastructure for Global AI.' },
];

export default function B2CPage() {
  return (
    <main className="min-h-screen bg-[#020617]">
      <B2CHeader />
      
      <div className="pt-20">
        <B2CHero />

        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">
              B2C Internship Domains
            </h2>
            <p className="text-slate-400">Select your specialization in the Career Lab Ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((item) => (
              <div key={item.name} className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group">
                <item.icon className="w-10 h-10 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-3">{item.name}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{item.desc}</p>
                <button className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  Join Program <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <LMSPreview />
        <CourseGrid />
        <CurriculumSection />
        <MentorshipSection />
        <AlumniSuccess />
        <FAQSection />
        <PricingSection />
        <Footer />
      </div>
    </main>
  );
}