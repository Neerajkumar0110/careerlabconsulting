import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  User, 
  ArrowRight, 
  Search,
  Filter,
  Sparkles
} from 'lucide-react';

const InsightsPage = () => {
  const posts = [
    {
      id: 1,
      category: "Technical",
      title: "The Rise of Agentic Swarms in Supply Chain Management",
      excerpt: "How multi-agent systems are outperforming traditional linear AI in complex logistics routing.",
      author: "Technical Lead",
      date: "Jan 12, 2026",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      featured: true
    },
    {
      id: 2,
      category: "Strategy",
      title: "Private LLMs: The New Standard for Data Sovereignty",
      excerpt: "Why enterprises are moving away from public APIs toward locally hosted, fine-tuned weights.",
      author: "AI Strategist",
      date: "Jan 08, 2026",
      image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      featured: false
    },
    {
      id: 3,
      category: "Future",
      title: "Predictive Maintenance 2.0: Beyond Sensors",
      excerpt: "Integrating visual transformers with IoT data to predict failure 48 hours earlier than before.",
      author: "Ops Director",
      date: "Jan 03, 2026",
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      featured: false
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(37,99,235,0.07)_0%,_transparent_60%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="text-blue-500 w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400/80">Neural Perspectives</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-0">
              Intel & <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-500 to-indigo-600">Insights.</span>
            </h1>
          </div>
          
          <div className="w-full md:w-auto flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 px-4 py-2 border-r border-white/10">
              <Search size={16} className="text-slate-500" />
              <input type="text" placeholder="Search intel..." className="bg-transparent outline-none text-sm font-medium w-40" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest text-slate-400">
              <Filter size={14} /> Sort By
            </button>
          </div>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-8 group cursor-pointer relative overflow-hidden rounded-[3rem] border border-white/5 bg-slate-900/40 aspect-[16/10] md:aspect-auto">
            <img 
              src={posts[0].image} 
              alt={posts[0].title}
              className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
              <span className="px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/30 text-[10px] font-black uppercase tracking-widest text-blue-300 mb-6 inline-block">
                {posts[0].category}
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 group-hover:text-blue-400 transition-colors leading-none">
                {posts[0].title}
              </h2>
              <p className="max-w-xl text-slate-400 text-lg font-light mb-8 group-hover:text-slate-200 transition-colors">
                {posts[0].excerpt}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                   <User size={14} className="text-blue-500" /> {posts[0].author}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                   <Calendar size={14} className="text-blue-500" /> {posts[0].date}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            {posts.slice(1).map((post) => (
              <div key={post.id} className="flex-1 group cursor-pointer p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-all flex flex-col justify-between overflow-hidden relative">
                <div className="relative z-10">
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 inline-block">{post.category}</span>
                  <h3 className="text-xl font-black uppercase italic tracking-tight leading-tight group-hover:text-blue-400 transition-colors">{post.title}</h3>
                </div>
                <div className="mt-8 flex items-center justify-between relative z-10">
                  <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{post.date}</div>
                  <div className="p-3 bg-white/5 rounded-full group-hover:bg-blue-600 transition-all">
                    <ArrowRight size={16} />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/20 transition-all"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Recent <span className="text-blue-500">Log.</span></h2>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">View Archive +</button>
          </div>

          <div className="space-y-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-12 cursor-pointer">
                <div className="flex gap-8 items-center">
                  <span className="text-xs font-mono text-slate-700">0{i}</span>
                  <div>
                    <h4 className="text-xl font-bold group-hover:text-blue-500 transition-colors">Implementing Multimodal RAG with Vector Architectures</h4>
                    <p className="text-slate-500 text-sm mt-1">Deep dive into embedding videos and images for better context retrieval.</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">7 Min Read</span>
                  <ArrowRight size={20} className="text-slate-800 group-hover:text-white transition-all group-hover:translate-x-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[120px]"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">Stay Ahead of <br/>The <span className="text-blue-500 underline underline-offset-8 decoration-white/10">Curve.</span></h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">Join 2,000+ engineers receiving our weekly brief on the state of production AI.</p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Your Signal (Email)" className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500/50 transition-all text-sm font-medium" />
              <button className="bg-white text-black px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default InsightsPage;