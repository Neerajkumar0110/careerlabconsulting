import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ProductMatrix from '@/components/sections/ProductMatrix';
import MethodologySection from '@/components/sections/MethodologySection';
import FaqSection from '@/components/sections/FaqSection';

const BusinessSuitePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative w-full pt-24 pb-16 md:pt-32 md:pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 text-center lg:text-left">
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Elevate Enterprise <br /> Intelligence
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Architecting the next generation of digital workforces. Our Business Suite 
              integrates seamlessly with your existing workflow to drive autonomous growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.4)] rounded-xl font-semibold transition-all hover:-translate-y-1">
                Deploy Now
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-semibold transition-all">
                View Documentation
              </button>
            </div>
          </div>

          <div className="relative z-10 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#020617]">
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="AI Interface" 
                className="w-full h-auto object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Automation Rate", value: "94%" },
            { label: "Cost Reduction", value: "40%+" },
            { label: "Active Deployments", value: "1.2k" },
            { label: "Security Rating", value: "A+" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl md:text-4xl font-bold text-blue-400">{stat.value}</div>
              <div className="text-gray-500 text-sm uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <ProductMatrix />

      <MethodologySection />

      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Analysis"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Real-time Data Visualization</h2>
              <p className="text-gray-400 text-lg mb-6">
                Understand your business metrics like never before. Our suite provides 
                deep-dive analytics powered by Gemini models to predict market trends.
              </p>
              <ul className="space-y-4">
                {['Predictive Analytics', 'Neural Training Integration', '24/7 Monitoring'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-5 h-5 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-xs">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />

      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-full scale-150"></div>
        <div className="max-w-3xl mx-auto relative z-10 bg-white/5 border border-white/10 p-12 rounded-[2rem] backdrop-blur-xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to scale?</h2>
          <p className="text-gray-400 mb-10 text-lg">
            Join 500+ companies transforming their operations with Career Lab Consulting.
          </p>
          <button className="px-10 py-5 bg-white text-black hover:bg-gray-200 rounded-2xl font-bold transition-all transform hover:scale-105">
            Book a Demo Today
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BusinessSuitePage;