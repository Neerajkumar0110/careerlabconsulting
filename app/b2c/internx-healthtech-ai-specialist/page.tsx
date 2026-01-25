import Link from "next/link";
import Image from "next/image";
import {
  HeartPulse,
  Brain,
  BarChart3,
  ShieldCheck,
  Stethoscope,
  ArrowRight,
  Activity,
} from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";

export const metadata = {
  title: "InternX – HealthTech AI Specialist Internship | Career Lab",
  description:
    "Join the InternX HealthTech AI Specialist Internship. Learn AI-powered healthcare analytics, medical data processing, predictive diagnostics, and intelligent health systems with real-world projects.",
};

export default function InternXHealthTechAISpecialistPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_60%)]" />

        <div className="relative max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-xs font-black uppercase tracking-widest text-red-400">
              InternX Program
            </span>

            <h1 className="text-2xl md:text-4xl font-black leading-tight">
              HealthTech AI Specialist Internship
            </h1>

            <p className="mt-6 text-sm text-slate-400 max-w-xl">
              Build intelligent healthcare solutions using AI. Work on real-world
              use cases like medical data analysis, predictive diagnostics,
              patient monitoring, and AI-assisted clinical decision systems.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/b2c/apply"
                className="bg-red-600 hover:bg-red-500 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-red-600/30"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/b2c/program-finder"
                className="border border-white/20 hover:border-red-500/50 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                Find My Program
              </Link>
            </div>
          </div>

          <div className="relative hidden md:flex justify-end">
            <img
              src="https://img.freepik.com/free-photo/scientific-specialist-research-lab-wearing-vr-goggles-using-high-tech-equipment-wired-sensors-medical-study-healthcare-practitioner-using-virtual-reality-technology-visualize-datasets_482257-67903.jpg"
              alt="HealthTech AI Specialist Illustration"
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <Stat label="Weeks" value="14+" />
          <Stat label="Healthcare Use Cases" value="7+" />
          <Stat label="AI Models" value="10+" />
          <Stat label="Career Support" value="100%" />
        </div>
      </section>

      {/* WHY HEALTHTECH AI */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            Why HealthTech + AI?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={Stethoscope}
              title="Healthcare Innovation"
              desc="AI is transforming diagnostics, treatment planning, and patient care."
            />
            <Feature
              icon={ShieldCheck}
              title="Safety & Compliance"
              desc="Build systems aligned with medical regulations and data privacy standards."
            />
            <Feature
              icon={HeartPulse}
              title="Human Impact"
              desc="Create AI solutions that directly improve patient outcomes and lives."
            />
          </div>
        </div>
      </section>

      {/* WHAT YOU WILL LEARN */}
      <section className="py-28 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            What You Will Learn
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Medical data analysis & preprocessing",
              "Predictive diagnostics & risk scoring",
              "AI models for healthcare applications",
              "Patient monitoring & analytics",
              "Clinical decision support systems",
              "Explainable AI in healthcare",
              "Healthcare data security & compliance",
              "Medical imaging basics (intro)",
              "Healthcare dashboards & KPIs",
              "Deployment of AI healthcare systems",
            ].map((item) => (
              <div
                key={item}
                className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-red-500/5 hover:border-red-500/30 transition"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERNSHIP EXPERIENCE */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            Internship Experience
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={Brain}
              title="Health AI Projects"
              desc="Work on real healthcare datasets and AI-driven medical use cases."
            />
            <Feature
              icon={BarChart3}
              title="Clinical Insights"
              desc="Extract insights from complex medical and patient data."
            />
            <Feature
              icon={ArrowRight}
              title="Career Readiness"
              desc="Portfolio projects, interview prep, and HealthTech career guidance."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 via-transparent to-transparent" />

        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">
            Build AI Solutions That Save Lives
          </h2>

          <p className="mt-6 text-slate-400">
            Launch a meaningful career at the intersection of AI and healthcare.
          </p>

          <div className="mt-14 flex justify-center gap-4">
            <Link
              href="/b2c/apply"
              className="bg-red-600 hover:bg-red-500 px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-600/40"
            >
              Apply Now
            </Link>
            <Link
              href="/b2c/contact"
              className="border border-white/20 px-14 py-5 rounded-xl font-bold text-xs uppercase tracking-widest"
            >
              Talk to Advisor
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ---------- COMPONENTS ---------- */

function Chip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300">
      <span className="text-red-400">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-red-500/30 hover:bg-red-500/5 transition">
      <Icon className="w-7 h-7 text-red-400 mb-5" />
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-red-400">{value}</div>
      <div className="mt-2 text-sm text-slate-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
