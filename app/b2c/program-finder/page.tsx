import Link from "next/link";
import {
  Brain,
  Cloud,
  Shield,
  Bot,
  TrendingUp,
  Rocket,
  ArrowRight,
} from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";

export const metadata = {
  title: "Program Finder | Career Lab",
  description:
    "Find the InternX program that best matches your career goals, background, and interests.",
};

const programs = [
  {
    title: "AI & Data",
    icon: Brain,
    desc: "AI Engineer, Data Engineer, AI Safety & Quality roles",
    href: "/b2c/internx-ai-engineer",
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    desc: "Cloud, DevOps & AI infrastructure programs",
    href: "/b2c/internx-cloud-ai-engineer",
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    desc: "Security engineering & cyber defense",
    href: "/b2c/internx-cyber-security-expert",
  },
  {
    title: "Product & Growth",
    icon: TrendingUp,
    desc: "AI Product & Marketing roles",
    href: "/b2c/internx-ai-product-manager",
  },
  {
    title: "Robotics & IoT",
    icon: Bot,
    desc: "Robotics, IoT & automation engineering",
    href: "/b2c/internx-robotics-engineer",
  },
  {
    title: "Advanced Future Tech",
    icon: Rocket,
    desc: "Humanoid robotics, XR & smart mobility",
    href: "/b2c/internx-humanoid-robotics-engineer",
  },
];

export default function ProgramFinderPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="pt-36 pb-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black">
            Find the Right InternX Program
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            Explore career paths and choose the program aligned with your goals,
            background, and future aspirations.
          </p>
        </div>
      </section>

      <section className="py-28">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-3 gap-8">
          {programs.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.title}
                href={p.href}
                className="group p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition"
              >
                <Icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400 mb-6">{p.desc}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-blue-400">
                  Explore Program <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
