import Link from "next/link";
import Image from "next/image";
import {
  Layers,
  Brain,
  BarChart3,
  Target,
  Users,
  ArrowRight,
} from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";

export const metadata = {
  title: "InternX – AI Product Manager Internship | Career Lab",
  description:
    "Join the InternX AI Product Manager Internship. Learn AI product strategy, user-centric design, data-driven decision making, and go-to-market execution with real-world projects.",
};

export default function InternXAIProductManagerPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_60%)]" />
        <div className="relative max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-black uppercase tracking-widest text-indigo-400">
              InternX Program
            </span>

            <h1 className="text-2xl md:text-4xl font-black leading-tight">
              AI Product Manager Internship
            </h1>

            <p className="mt-6 text-sm text-slate-400 max-w-xl">
              Learn how to build, launch, and scale AI-powered products.
              Bridge the gap between technology, business, and users through
              real-world AI product management experience.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/b2c/apply"
                className="bg-indigo-600 hover:bg-indigo-500 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-indigo-600/30"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/b2c/program-finder"
                className="border border-white/20 hover:border-indigo-500/50 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                Find My Program
              </Link>
            </div>
          </div>

          <div className="relative hidden md:flex justify-end">
            <img
              src="https://img.freepik.com/free-photo/businessman-using-futuristic-technology-with-digital-interface_23-2151964658.jpg"
              alt="AI Product Manager Illustration"
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <Stat label="Weeks" value="12+" />
          <Stat label="Case Studies" value="8+" />
          <Stat label="AI Tools" value="10+" />
          <Stat label="Career Support" value="100%" />
        </div>
      </section>

      {/* WHY AI PRODUCT MANAGEMENT */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            Why AI Product Management?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={Brain}
              title="AI-Driven Products"
              desc="Every modern product now integrates AI for personalization, automation, and insights."
            />
            <Feature
              icon={Target}
              title="Strategic Impact"
              desc="AI PMs define vision, prioritize features, and align teams to business outcomes."
            />
            <Feature
              icon={Users}
              title="Cross-Functional Leadership"
              desc="Work closely with engineers, designers, data scientists, and stakeholders."
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
              "AI product lifecycle & strategy",
              "User research & problem discovery",
              "PRDs & AI feature specifications",
              "Data metrics & KPI definition",
              "Experimentation & A/B testing",
              "AI model trade-offs & limitations",
              "Ethics & responsible AI decisions",
              "Go-to-market & product launches",
              "Stakeholder communication",
              "Product analytics & iteration",
            ].map((item) => (
              <div
                key={item}
                className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-indigo-500/5 hover:border-indigo-500/30 transition"
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
              icon={Layers}
              title="Real AI Products"
              desc="Work on real AI product case studies from ideation to launch."
            />
            <Feature
              icon={BarChart3}
              title="Data-Backed Decisions"
              desc="Use analytics to prioritize features and measure success."
            />
            <Feature
              icon={ArrowRight}
              title="Career Readiness"
              desc="Portfolio projects, PM interview prep, and career guidance."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-transparent to-transparent" />

        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">
            Lead the Future of AI Products
          </h2>

          <p className="mt-6 text-slate-400">
            Build the skills needed to manage and scale AI-powered products.
          </p>

          <div className="mt-14 flex justify-center gap-4">
            <Link
              href="/b2c/apply"
              className="bg-indigo-600 hover:bg-indigo-500 px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/40"
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
      <span className="text-indigo-400">{icon}</span>
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
    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition">
      <Icon className="w-7 h-7 text-indigo-400 mb-5" />
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-indigo-400">{value}</div>
      <div className="mt-2 text-sm text-slate-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
