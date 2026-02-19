import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/hirex/home/Hero';
import Features from '@/components/hirex/home/Features';
import EmployerGrades from '@/components/hirex/home/EmployerGrades';
import CandidatePreview from '@/components/hirex/home/CandidatePreview';
import AssessmentHub from '@/components/hirex/home/AssessmentHub';
import ResumeBuilder from '@/components/hirex/home/ResumeBuilder';
import Testimonials from '@/components/hirex/home/Testimonials';
import Footer from '@/components/hirex/home/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HireX | AI-Autonomous Job Portal & Career Reports',
  description: 'Advanced job portal with GitHub/LinkedIn integration, AI skill testing, and 360-degree candidate reporting.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <EmployerGrades />
      <CandidatePreview />
      <AssessmentHub />
      <ResumeBuilder />
      <Testimonials />
      <Footer />
    </main>
  );
}