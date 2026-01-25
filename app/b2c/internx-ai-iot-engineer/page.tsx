import Link from "next/link";
import Image from "next/image";
import {
  Wifi,
  Cpu,
  Brain,
  Cloud,
  Activity,
  Settings,
  ArrowRight,
} from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";

export const metadata = {
  title: "InternX – AI & IoT Engineer Internship | Career Lab",
  description:
    "Join the InternX AI & IoT Engineer Internship. Learn smart device engineering, AI-powered IoT analytics, edge computing, and cloud-connected intelligent systems with real-world projects.",
};

export default function InternXAIoTEngineerPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_60%)]" />

        <div className="relative max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-xs font-black uppercase tracking-widest text-green-400">
              InternX Program
            </span>

            <h1 className="text-2xl md:text-4xl font-black leading-tight">
              AI & IoT Engineer Internship
            </h1>

            <p className="mt-6 text-sm text-slate-400 max-w-xl">
              Design intelligent, connected systems powered by AI.
              Work on smart devices, sensors, edge intelligence, and cloud-based
              IoT platforms used in smart homes, cities, and industries.
            </p>

            {/* CHIPS */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Chip icon={<Wifi className="w-4 h-4" />} label="IoT Systems" />
              <Chip icon={<Brain className="w-4 h-4" />} label="AI at the Edge" />
              <Chip icon={<Cloud className="w-4 h-4" />} label="Cloud IoT Platforms" />
              <Chip icon={<Activity className="w-4 h-4" />} label="Real-Time Analytics" />
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/b2c/apply"
                className="bg-green-600 hover:bg-green-500 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-green-600/30"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/b2c/program-finder"
                className="border border-white/20 hover:border-green-500/50 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                Find My Program
              </Link>
            </div>
          </div>

          <div className="relative hidden md:flex justify-end">
            <img
              src="https://img.freepik.com/free-photo/teens-doing-experiments-robotics-laboratory-boy-protective-glasses-touching-robot_1268-23410.jpg"
              alt="AI & IoT Engineer Illustration"
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <Stat label="Weeks" value="14+" />
          <Stat label="Smart Projects" value="9+" />
          <Stat label="IoT Protocols" value="6+" />
          <Stat label="Career Support" value="100%" />
        </div>
      </section>

      {/* WHY AI + IOT */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            Why AI + IoT?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={Wifi}
              title="Connected Intelligence"
              desc="IoT devices generate massive data that AI turns into real-time insights."
            />
            <Feature
              icon={Cpu}
              title="Edge Computing"
              desc="Run AI models directly on devices for low-latency decisions."
            />
            <Feature
              icon={Settings}
              title="Smart Automation"
              desc="Automate environments using intelligent IoT systems."
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
              "IoT architectures & protocols (MQTT, HTTP)",
              "Sensor data collection & processing",
              "Edge AI & TinyML concepts",
              "Cloud IoT platforms (AWS, Azure, GCP)",
              "Real-time data streaming",
              "Device management & security",
              "AI-driven anomaly detection",
              "Smart automation workflows",
              "IoT dashboards & visualization",
              "Deployment of AI + IoT systems",
            ].map((item) => (
              <div
                key={item}
                className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-green-500/5 hover:border-green-500/30 transition"
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
              title="AI + IoT Projects"
              desc="Hands-on work with connected devices and AI-driven insights."
            />
            <Feature
              icon={Cloud}
              title="Cloud Integration"
              desc="Connect devices to scalable cloud platforms."
            />
            <Feature
              icon={ArrowRight}
              title="Career Readiness"
              desc="Portfolio projects, interview prep, and IoT career guidance."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 via-transparent to-transparent" />

        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">
            Build Intelligent Connected Systems
          </h2>

          <p className="mt-6 text-slate-400">
            Launch a future-ready career at the intersection of AI and IoT.
          </p>

          <div className="mt-14 flex justify-center gap-4">
            <Link
              href="/b2c/apply"
              className="bg-green-600 hover:bg-green-500 px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-600/40"
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
      <span className="text-green-400">{icon}</span>
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
    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-green-500/30 hover:bg-green-500/5 transition">
      <Icon className="w-7 h-7 text-green-400 mb-5" />
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-green-400">{value}</div>
      <div className="mt-2 text-sm text-slate-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
