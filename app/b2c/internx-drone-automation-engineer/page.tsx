import Link from "next/link";
import Image from "next/image";
import {
  Plane,
  Cpu,
  Radar,
  Settings,
  Map,
  ArrowRight,
  Activity,
} from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";

export const metadata = {
  title: "InternX – Drone & Automation Engineer Internship | Career Lab",
  description:
    "Join the InternX Drone & Automation Engineer Internship. Learn autonomous drones, AI-powered navigation, automation systems, and real-world deployment with hands-on industry projects.",
};

export default function InternXDroneAutomationEngineerPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_60%)]" />

        <div className="relative max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-black uppercase tracking-widest text-purple-400">
              InternX Program
            </span>

            <h1 className="text-2xl md:text-4xl font-black leading-tight">
              Drone & Automation Engineer Internship
            </h1>

            <p className="mt-6 text-sm text-slate-400 max-w-xl">
              Build intelligent autonomous drone systems.
              Work on AI-powered navigation, automation workflows, aerial data
              collection, and smart control systems used in defense, logistics,
              agriculture, and smart cities.
            </p>

            {/* CHIPS */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Chip icon={<Plane className="w-4 h-4" />} label="Autonomous Drones" />
              <Chip icon={<Radar className="w-4 h-4" />} label="Navigation & Sensors" />
              <Chip icon={<Cpu className="w-4 h-4" />} label="AI Control Systems" />
              <Chip icon={<Settings className="w-4 h-4" />} label="Automation Pipelines" />
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/b2c/apply"
                className="bg-purple-600 hover:bg-purple-500 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-purple-600/30"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/b2c/program-finder"
                className="border border-white/20 hover:border-purple-500/50 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                Find My Program
              </Link>
            </div>
          </div>

          <div className="relative hidden md:flex justify-end">
            <img
              src="https://img.freepik.com/free-photo/drone-operator-piloting-flying-drone-sunset_23-2152007746.jpg"
              alt="Drone & Automation Engineer Illustration"
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <Stat label="Weeks" value="16+" />
          <Stat label="Drone Missions" value="10+" />
          <Stat label="AI Models" value="8+" />
          <Stat label="Career Support" value="100%" />
        </div>
      </section>

      {/* WHY DRONES & AUTOMATION */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            Why Drone & Automation Engineering?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={Map}
              title="Autonomous Navigation"
              desc="Drones rely on AI-driven perception and navigation systems."
            />
            <Feature
              icon={Activity}
              title="High-Impact Use Cases"
              desc="Used in surveillance, delivery, mapping, agriculture, and disaster response."
            />
            <Feature
              icon={Settings}
              title="Automation at Scale"
              desc="Automate fleets, missions, and workflows using intelligent systems."
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
              "Drone fundamentals & flight mechanics",
              "Sensors, GPS & IMU systems",
              "AI-based navigation & obstacle avoidance",
              "Autonomous mission planning",
              "Computer vision for aerial analysis",
              "Drone communication protocols",
              "Automation workflows & control logic",
              "Simulation & testing environments",
              "Safety, compliance & regulations",
              "Deployment of drone systems",
            ].map((item) => (
              <div
                key={item}
                className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-purple-500/5 hover:border-purple-500/30 transition"
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
              icon={Plane}
              title="Live Drone Projects"
              desc="Work on real-world drone missions and automation systems."
            />
            <Feature
              icon={Cpu}
              title="AI Integration"
              desc="Integrate AI models with autonomous control pipelines."
            />
            <Feature
              icon={ArrowRight}
              title="Career Readiness"
              desc="Portfolio projects, interview prep, and drone industry guidance."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-transparent" />

        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">
            Build Autonomous Systems That Fly
          </h2>

          <p className="mt-6 text-slate-400">
            Launch a high-impact career in drones, automation, and intelligent systems.
          </p>

          <div className="mt-14 flex justify-center gap-4">
            <Link
              href="/b2c/apply"
              className="bg-purple-600 hover:bg-purple-500 px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-600/40"
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
      <span className="text-purple-400">{icon}</span>
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
    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 transition">
      <Icon className="w-7 h-7 text-purple-400 mb-5" />
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-purple-400">{value}</div>
      <div className="mt-2 text-sm text-slate-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
