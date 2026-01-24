import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  Smartphone, 
  Cpu, 
  Zap, 
  Layers, 
  Mic, 
  Eye, 
  ArrowRight,
  WifiOff,
  Infinity
} from 'lucide-react';

const AIMobileAppsPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
              <Smartphone className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Mobile Intelligence Hub</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              POCKET <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 italic">
                INTELLIGENCE
              </span>
            </h1>
            
            <p className="max-w-xl text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
              The next generation of mobile apps don't just respond; they anticipate. 
              We build AI-native iOS and Android applications with on-device 
              inference, computer vision, and voice-first logic.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
                Build My Mobile App <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute -inset-10 bg-blue-600/20 blur-[100px] rounded-full"></div>
            <div className="relative w-[280px] h-[580px] bg-black border-[8px] border-white/10 rounded-[3rem] shadow-2xl overflow-hidden">
                <div className="h-6 w-full flex justify-between px-6 pt-2">
                   <div className="text-[10px] font-bold">9:41</div>
                   <div className="flex gap-1">
                      <div className="w-3 h-2 bg-white/40 rounded-sm"></div>
                      <div className="w-4 h-2 bg-white rounded-sm"></div>
                   </div>
                </div>

                <div className="p-6 pt-10">
                   <div className="flex items-center gap-2 mb-8">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                         <Zap className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-black tracking-widest uppercase">Nexus AI</span>
                   </div>

                   <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                         <p className="text-[10px] text-gray-500 uppercase mb-1">On-Device Model</p>
                         <p className="text-sm font-bold">CoreML Stable-Diffusion</p>
                         <div className="mt-2 h-1 bg-white/10 rounded-full">
                            <div className="h-full bg-blue-500 w-3/4 animate-pulse"></div>
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                         <div className="p-4 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex flex-col items-center">
                            <Mic className="text-blue-400 mb-2" />
                            <span className="text-[10px] font-bold">Voice Ops</span>
                         </div>
                         <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
                            <Eye className="text-gray-400 mb-2" />
                            <span className="text-[10px] font-bold">Vision</span>
                         </div>
                      </div>
                   </div>
                </div>
                
                <div className="absolute bottom-6 left-0 w-full flex justify-around opacity-40">
                   <div className="w-1 h-1 rounded-full bg-white"></div>
                   <div className="w-1 h-1 rounded-full bg-white"></div>
                   <div className="w-1 h-1 rounded-full bg-white"></div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold italic">The Edge Advantage</h2>
            <p className="text-gray-500 mt-4 text-lg">High-speed, offline-capable AI at your fingertips.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Edge AI / Offline Mode", desc: "Running quantized models directly on the chip (CoreML/TensorFlow Lite) for privacy and speed without internet.", icon: <WifiOff className="text-blue-400" /> },
              { title: "Computer Vision", desc: "Real-time object detection, face analysis, and OCR integrated into the mobile camera feed.", icon: <Eye className="text-blue-400" /> },
              { title: "Voice-First UX", desc: "Seamless natural language interfaces and real-time speech-to-text / text-to-speech processing.", icon: <Mic className="text-blue-400" /> },
              { title: "Cross-Platform Native", desc: "High-performance apps built with Flutter or React Native, optimized for AI workloads.", icon: <Layers className="text-blue-400" /> },
              { title: "NPU Optimization", desc: "Fine-tuning models to leverage the Neural Processing Units of modern mobile hardware.", icon: <Cpu className="text-blue-400" /> },
              { title: "Continuous Learning", desc: "Federated learning protocols that allow apps to improve based on user behavior locally.", icon: <Infinity className="text-blue-400" /> }
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-blue-900/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl inline-block group-hover:bg-blue-600 transition-all">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-20 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic">On-Device vs Cloud Inference</h2>
        </div>
        
        <div className="mt-20">
          <ExecutionFlow />
        </div>
      </div>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Mobile First <br/>AI Always</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our mobile engineers at DLF Cyber City are ready to deploy your 
              vision to the App Store and Play Store.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START MOBILE BUILD
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">+91 870023 6923</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AIMobileAppsPage;