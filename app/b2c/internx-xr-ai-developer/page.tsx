import Link from "next/link";
import {
  Brain,
  Database,
  Cloud,
  ShieldCheck,
  Bot,
  Rocket,
  ArrowRight,
} from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";

export const metadata = {
  title: "Find Your Program | InternX – Career Lab",
  description:
    "Discover the perfect InternX program based on your interests, skills, and career goals.",
};

const programs = [
  {
    title: "AI & Data Engineering",
    icon: Database,
    desc: "Build intelligent systems, scalable data pipelines, and AI-powered analytics.",
    href: "/b2c/internx-data-engineer",
  },
  {
    title: "AI Product & Marketing",
    icon: Brain,
    desc: "Work at the intersection of AI, business, users, and growth strategy.",
    href: "/b2c/internx-ai-marketing-specialist",
  },
  {
    title: "Cloud & AI Engineering",
    icon: Cloud,
    desc: "Design cloud-native, scalable, and AI-ready infrastructure systems.",
    href: "/b2c/internx-cloud-ai-engineer",
  },
  {
    title: "Cyber Security Expert",
    icon: ShieldCheck,
    desc: "Protect applications, networks, and data using modern cybersecurity practices.",
    href: "/b2c/internx-cyber-security-expert",
  },
  {
    title: "Robotics, IoT & Automation",
    icon: Bot,
    desc: "Build intelligent robots, IoT systems, and AI-driven automation solutions.",
    href: "/b2c/internx-robotics-engineer",
  },
  {
    title: "Advanced Future Tech",
    icon: Rocket,
    desc: "Explore XR, humanoid robotics, smart mobility, and next-generation technologies.",
    href: "/b2c/internx-xr-ai-developer",
  },
];

export default function ProgramFinderPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="pt-36 pb-24 border-b border-white/10">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <span className="inline-block mb-4 text-xs font-black uppercase tracking-widest text-blue-400">
            InternX Program Finder
          </span>

          <h1 className="text-4xl md:text-5xl font-black">
            Find the Right InternX Program for You
          </h1>

          <p className="mt-6 text-lg text-slate-400">
            Not sure where to start? Explore InternX programs designed to match
            your interests, skills, and long-term career goals.
          </p>
        </div>
      </section>

      {/* PROGRAM OPTIONS */}
      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl font-black mb-14 text-center">
            Choose Your Career Path
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.title}
                  href={p.href}
                  className="group p-8 rounded-2xl border border-white/10 bg-white/5
                  hover:border-blue-500/30 hover:bg-blue-500/5
                  transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-blue-400 mb-5 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                    {p.desc}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-400">
                    Explore Program <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* GUIDANCE CTA */}
      <section className="py-24 border-t border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black">
            Still Confused?
          </h2>

          <p className="mt-6 text-slate-400">
            Talk to our advisors and get personalized guidance for your career.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              href="/b2c/contact"
              className="bg-blue-600 hover:bg-blue-500 px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/30"
            >
              Talk to Advisor
            </Link>
            <Link
              href="/b2c/apply"
              className="border border-white/20 px-12 py-4 rounded-xl font-bold text-xs uppercase tracking-widest"
            >
              Apply Directly
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
