import Link from "next/link";
import {
  ShieldCheck,
  Brain,
  AlertTriangle,
  FileCheck,
  Scale,
  ArrowRight,
} from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";

export const metadata = {
  title: "InternX – AI Quality & Safety Engineer Internship | Career Lab",
  description:
    "Join the InternX AI Quality & Safety Engineer Internship. Learn responsible AI, model evaluation, risk mitigation, compliance, and AI governance with real-world projects.",
};

export default function InternXAIQualitySafetyEngineerPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_60%)]" />

        <div className="relative max-w-[1200px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-black uppercase tracking-widest text-emerald-400">
            InternX Program
          </span>

          <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl">
            AI Quality & Safety Engineer Internship
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-3xl">
            Learn how modern organizations evaluate, secure, and govern AI systems.
            Work on real-world AI safety, quality assurance, bias detection, and
            regulatory compliance frameworks.
          </p>

          {/* Highlights */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Responsible AI",
              "Model Evaluation",
              "AI Risk & Compliance",
              "Governance Frameworks",
            ].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/b2c/apply"
              className="bg-emerald-600 hover:bg-emerald-500 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-emerald-600/30"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/b2c/program-finder"
              className="border border-white/20 hover:border-emerald-500/50 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest"
            >
              Find My Program
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <Stat label="Weeks" value="14+" />
          <Stat label="Case Studies" value="6+" />
          <Stat label="Compliance Areas" value="AI Act, ISO, SOC" />
          <Stat label="Career Support" value="100%" />
        </div>
      </section>

      {/* WHY AI SAFETY */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            Why AI Quality & Safety Engineering?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={ShieldCheck}
              title="Critical AI Role"
              desc="AI safety engineers ensure systems are reliable, ethical, and legally compliant."
            />
            <Feature
              icon={Scale}
              title="Regulatory Demand"
              desc="Governments worldwide now mandate AI risk assessment and governance."
            />
            <Feature
              icon={AlertTriangle}
              title="Risk Prevention"
              desc="Prevent bias, hallucinations, security risks, and unsafe AI behavior."
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
              "AI quality assurance & testing methodologies",
              "Model evaluation & benchmarking",
              "Bias, fairness & explainability",
              "Prompt & output risk analysis",
              "AI security & adversarial threats",
              "Responsible AI frameworks",
              "AI governance & documentation",
              "Regulatory compliance (AI Act, ISO)",
              "Monitoring & incident response",
              "Production AI audits",
            ].map((item) => (
              <div
                key={item}
                className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-emerald-500/5 hover:border-emerald-500/30 transition"
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
              title="AI Risk Projects"
              desc="Evaluate real AI systems for quality, bias, and safety risks."
            />
            <Feature
              icon={FileCheck}
              title="Audit & Compliance"
              desc="Create documentation aligned with global AI standards."
            />
            <Feature
              icon={ArrowRight}
              title="Career Readiness"
              desc="Portfolio, interview prep, and AI governance career guidance."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 via-transparent to-transparent" />

        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">
            Become an AI Quality & Safety Expert
          </h2>

          <p className="mt-6 text-slate-400">
            Build a future-proof career in responsible and trustworthy AI.
          </p>

          <div className="mt-14 flex justify-center gap-4">
            <Link
              href="/b2c/apply"
              className="bg-emerald-600 hover:bg-emerald-500 px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-600/40"
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
    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition">
      <Icon className="w-7 h-7 text-emerald-400 mb-5" />
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-emerald-400">{value}</div>
      <div className="mt-2 text-sm text-slate-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
