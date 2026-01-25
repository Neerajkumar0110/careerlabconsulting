import Link from "next/link";
import Image from "next/image";
import {
  Car,
  Cpu,
  Brain,
  MapPin,
  Activity,
  Settings,
  ArrowRight,
} from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";

export const metadata = {
  title: "InternX – Smart Mobility Engineer Internship | Career Lab",
  description:
    "Join the InternX Smart Mobility Engineer Internship. Learn AI-powered mobility systems, autonomous vehicles, intelligent transportation, and real-world smart city mobility solutions.",
};

export default function InternXSmartMobilityEngineerPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_60%)]" />

        <div className="relative max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-black uppercase tracking-widest text-blue-400">
              InternX Program
            </span>

            <h1 className="text-2xl md:text-4xl font-black leading-tight">
              Smart Mobility Engineer Internship
            </h1>

            <p className="mt-6 text-sm text-slate-400 max-w-xl">
              Design intelligent mobility systems of the future.
              Work on AI-powered autonomous vehicles, traffic intelligence,
              smart transportation networks, and connected mobility platforms
              used in smart cities worldwide.
            </p>

            {/* CHIPS */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Chip icon={<Car className="w-4 h-4" />} label="Autonomous Vehicles" />
              <Chip icon={<Brain className="w-4 h-4" />} label="AI Decision Systems" />
              <Chip icon={<MapPin className="w-4 h-4" />} label="Navigation & Mapping" />
              <Chip icon={<Activity className="w-4 h-4" />} label="Traffic Intelligence" />
            </div>

            {/* CTA */}
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

          {/* RIGHT IMAGE */}
          <div className="relative hidden md:flex justify-end">
            <img
              src="https://img.freepik.com/free-photo/futuristic-technology-concept_23-2151908113.jpg"
              alt="Smart Mobility Engineer Illustration"
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <Stat label="Weeks" value="16+" />
          <Stat label="Mobility Projects" value="8+" />
          <Stat label="AI Systems" value="10+" />
          <Stat label="Career Support" value="100%" />
        </div>
      </section>

      {/* WHY SMART MOBILITY */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            Why Smart Mobility Engineering?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={Car}
              title="Future Transportation"
              desc="Smart mobility is reshaping how people and goods move across cities."
            />
            <Feature
              icon={Brain}
              title="AI-Driven Decisions"
              desc="AI enables perception, prediction, and autonomous control."
            />
            <Feature
              icon={Settings}
              title="System-Level Engineering"
              desc="Integrate vehicles, infrastructure, and cloud intelligence."
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
              "Smart mobility architecture & systems",
              "Autonomous vehicle fundamentals",
              "Sensor fusion & perception systems",
              "AI-based navigation & path planning",
              "Traffic prediction & optimization",
              "Connected vehicle ecosystems",
              "V2X communication basics",
              "Simulation & testing environments",
              "Safety & regulatory considerations",
              "Deployment of smart mobility platforms",
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
              icon={Activity}
              title="Smart Mobility Projects"
              desc="Hands-on work with intelligent transport and vehicle systems."
            />
            <Feature
              icon={Cpu}
              title="AI Integration"
              desc="Combine perception, control, and cloud intelligence."
            />
            <Feature
              icon={ArrowRight}
              title="Career Readiness"
              desc="Portfolio projects, interview prep, and mobility career guidance."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-transparent" />

        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">
            Engineer the Future of Mobility
          </h2>

          <p className="mt-6 text-slate-400">
            Build intelligent systems that power autonomous and smart transportation.
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
      <span className="text-blue-400">{icon}</span>
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
