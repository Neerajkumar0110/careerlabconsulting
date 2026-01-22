'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { CheckCircle, Globe, Zap, Shield, BarChart, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function WebsiteSuitePage() {
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

  const handleAiTest = async () => {
    if (!prompt) return;
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      setAiResponse(response.text());
    } catch (error) {
      setAiResponse("Error: Make sure your API key is valid and you have internet access.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />

      <main>
        <section className="relative pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
              All-in-One Website <br /> Management Suite
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Build, deploy, and scale your digital presence with AI-driven testing and 
              integrated ecosystem analytics.
            </p>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto bg-white/[0.03] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold">AI Testing Lab</h2>
            </div>
            
            <p className="text-gray-400 mb-6">
              Test our website suite's AI intelligence. Ask it to "Generate a SEO strategy for a coffee shop" or "Write a landing page headline."
            </p>

            <div className="space-y-4">
              <textarea 
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                rows={3}
                placeholder="Enter your testing prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <button 
                onClick={handleAiTest}
                disabled={isLoading || !prompt}
                className="w-full md:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
                Run AI Test
              </button>

              {aiResponse && (
                <div className="mt-6 p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-xl animate-in fade-in slide-in-from-bottom-2">
                  <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-2">AI Response:</h4>
                  <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Globe className="w-6 h-6 text-indigo-400" />}
              title="Global Deployment"
              description="Lightning-fast hosting across 50+ edge locations worldwide."
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6 text-indigo-400" />}
              title="AI Optimization"
              description="Powered by Gemini to automatically optimize your content for SEO."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-indigo-400" />}
              title="Enterprise Security"
              description="DDoS protection and automated daily backups come standard."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}