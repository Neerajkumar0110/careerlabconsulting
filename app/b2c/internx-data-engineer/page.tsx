import Link from "next/link";
import {
  ArrowRight,
  Database,
  BarChart3,
  Cloud,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";

export const metadata = {
  title: "InternX – Data Engineer Internship | Career Lab",
  description:
    "Join the InternX Data Engineer Internship. Learn industry-grade data pipelines, big data, cloud analytics, and real-world deployment with Career Lab.",
};

export default function InternXDataEngineerPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_60%)]" />

        <div className="relative max-w-[1200px] mx-auto px-6">
          <span className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold uppercase tracking-widest text-blue-400">
            InternX Program
          </span>

          <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-3xl">
            Data Engineer Internship
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-2xl">
            Learn how modern companies design scalable data pipelines, process
            massive datasets, and deploy analytics-ready systems in production.
          </p>

          {/* Program Highlights */}
          <div className="mt-8 flex flex-wrap gap-3">
            {["Industry Projects", "Cloud & Big Data", "Mentor-Led", "Job-Ready"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/b2c/apply"
              className="bg-blue-600 hover:bg-blue-500 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-600/30"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/b2c/program-finder"
              className="border border-white/20 hover:border-blue-500/50 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest"
            >
              Find My Program
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <Stat label="Weeks" value="16+" />
          <Stat label="Hands-on Projects" value="5+" />
          <Stat label="Tools Covered" value="15+" />
          <Stat label="Career Support" value="100%" />
        </div>
      </section>

      {/* WHY DATA ENGINEER */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            Why Become a Data Engineer?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={Database}
              title="High-Demand Role"
              desc="Every AI, analytics, and product team depends on reliable data pipelines."
            />
            <Feature
              icon={BarChart3}
              title="Business-Critical Impact"
              desc="Your systems directly power dashboards, decisions, and predictions."
            />
            <Feature
              icon={Cloud}
              title="Future-Proof Career"
              desc="Cloud data engineering is one of the fastest-growing tech roles."
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
              "Data modeling & database design",
              "ETL / ELT pipelines",
              "Big Data & Spark fundamentals",
              "Advanced SQL & performance tuning",
              "Data warehouses & data lakes",
              "Cloud data platforms (AWS / GCP / Azure)",
              "Real-time data streaming",
              "Security, governance & compliance",
              "Monitoring & optimization",
              "Production deployment workflows",
            ].map((item) => (
              <div
                key={item}
                className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-blue-500/5 hover:border-blue-500/30 transition"
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
              icon={Briefcase}
              title="Real Industry Projects"
              desc="Work on live datasets, real pipelines, and production scenarios."
            />
            <Feature
              icon={ShieldCheck}
              title="Expert Mentorship"
              desc="Weekly guidance from senior data engineers & architects."
            />
            <Feature
              icon={ArrowRight}
              title="Career Acceleration"
              desc="Resume, portfolio, mock interviews & hiring guidance."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-transparent" />

        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">
            Ready to Become a Data Engineer?
          </h2>

          <p className="mt-6 text-slate-400">
            Limited seats available for the next InternX cohort.
          </p>

          <div className="mt-14 flex justify-center gap-4">
            <Link
              href="/b2c/apply"
              className="bg-blue-600 hover:bg-blue-500 px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/40"
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
    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition">
      <Icon className="w-7 h-7 text-blue-400 mb-5" />
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-blue-400">{value}</div>
      <div className="mt-2 text-sm text-slate-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
