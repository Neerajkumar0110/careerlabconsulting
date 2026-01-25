import Link from "next/link";
import Image from "next/image";
import {
  Megaphone,
  Brain,
  BarChart3,
  Target,
  Users,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";

export const metadata = {
  title: "InternX – AI Marketing Specialist Internship | Career Lab",
  description:
    "Join the InternX AI Marketing Specialist Internship. Learn AI-powered growth marketing, performance analytics, automation, and go-to-market execution with real-world projects.",
};

export default function InternXAIMarketingSpecialistPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.18),transparent_60%)]" />

        <div className="relative max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-xs font-black uppercase tracking-widest text-pink-400">
              InternX Program
            </span>

            <h1 className="text-2xl md:text-4xl font-black leading-tight">
              AI Marketing Specialist Internship
            </h1>

            <p className="mt-6 text-sm text-slate-400 max-w-xl">
              Learn how to use AI to drive growth, optimize campaigns, and scale
              digital products. Master data-driven marketing, automation, and
              modern go-to-market strategies.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/b2c/apply"
                className="bg-pink-600 hover:bg-pink-500 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-pink-600/30"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/b2c/program-finder"
                className="border border-white/20 hover:border-pink-500/50 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                Find My Program
              </Link>
            </div>
          </div>

          <div className="relative hidden md:flex justify-end">
            <img
              src="https://img.freepik.com/free-photo/businessman-working-futuristic-office_23-2151003702.jpg"
              alt="AI Marketing Specialist Illustration"
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <Stat label="Weeks" value="12+" />
          <Stat label="Campaigns" value="10+" />
          <Stat label="AI Tools" value="15+" />
          <Stat label="Career Support" value="100%" />
        </div>
      </section>

      {/* WHY AI MARKETING */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            Why AI Marketing?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={Brain}
              title="AI-First Growth"
              desc="AI transforms how brands acquire, retain, and engage customers."
            />
            <Feature
              icon={Target}
              title="Precision Targeting"
              desc="Use data and AI to reach the right audience at the right time."
            />
            <Feature
              icon={Users}
              title="Customer-Centric Strategy"
              desc="Design personalized, high-impact customer journeys."
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
              "AI-driven digital marketing strategies",
              "Performance & growth analytics",
              "Marketing automation & workflows",
              "SEO, paid ads & campaign optimization",
              "Customer segmentation & personalization",
              "A/B testing & experimentation",
              "AI tools for content & creatives",
              "Go-to-market planning",
              "Brand & product positioning",
              "Marketing dashboards & reporting",
            ].map((item) => (
              <div
                key={item}
                className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-pink-500/5 hover:border-pink-500/30 transition"
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
              icon={Megaphone}
              title="Real Campaigns"
              desc="Work on live AI-powered marketing campaigns and funnels."
            />
            <Feature
              icon={BarChart3}
              title="Growth Metrics"
              desc="Measure ROI, CAC, LTV, and performance metrics."
            />
            <Feature
              icon={ArrowRight}
              title="Career Readiness"
              desc="Portfolio projects, interview prep, and placement guidance."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/20 via-transparent to-transparent" />

        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">
            Become an AI-Powered Marketing Leader
          </h2>

          <p className="mt-6 text-slate-400">
            Build future-ready marketing skills powered by AI and data.
          </p>

          <div className="mt-14 flex justify-center gap-4">
            <Link
              href="/b2c/apply"
              className="bg-pink-600 hover:bg-pink-500 px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-pink-600/40"
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
      <span className="text-pink-400">{icon}</span>
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
    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-pink-500/30 hover:bg-pink-500/5 transition">
      <Icon className="w-7 h-7 text-pink-400 mb-5" />
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-pink-400">{value}</div>
      <div className="mt-2 text-sm text-slate-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
