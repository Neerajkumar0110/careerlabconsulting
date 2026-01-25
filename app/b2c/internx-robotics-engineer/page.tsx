import Link from "next/link";
import Image from "next/image";
import {
  Bot,
  Cpu,
  Settings,
  Activity,
  Factory,
  ArrowRight,
  Radar,
} from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";

export const metadata = {
  title: "InternX – Robotics Engineer Internship | Career Lab",
  description:
    "Join the InternX Robotics Engineer Internship. Learn robotics systems, AI-powered automation, sensors, control systems, and real-world robotics deployment with industry projects.",
};

export default function InternXRoboticsEngineerPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_60%)]" />

        <div className="relative max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs font-black uppercase tracking-widest text-sky-400">
              InternX Program
            </span>

            <h1 className="text-2xl md:text-4xl font-black leading-tight">
              Robotics Engineer Internship
            </h1>

            <p className="mt-6 text-sm text-slate-400 max-w-xl">
              Design, build, and deploy intelligent robotic systems.
              Work on real-world robotics, automation, and AI-powered machines
              used in manufacturing, logistics, healthcare, and smart cities.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/b2c/apply"
                className="bg-sky-600 hover:bg-sky-500 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-sky-600/30"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/b2c/program-finder"
                className="border border-white/20 hover:border-sky-500/50 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                Find My Program
              </Link>
            </div>
          </div>

          <div className="relative hidden md:flex justify-end">
            <img
              src="https://img.freepik.com/free-photo/group-young-people-doing-experiments-robotics-laboratory-girls-protective-glasses_1268-24389.jpg"
              alt="Robotics Engineer Illustration"
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <Stat label="Weeks" value="16+" />
          <Stat label="Robotics Projects" value="8+" />
          <Stat label="Hardware Labs" value="6+" />
          <Stat label="Career Support" value="100%" />
        </div>
      </section>

      {/* WHY ROBOTICS */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            Why Robotics Engineering?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={Factory}
              title="Industry Automation"
              desc="Robotics drives automation in manufacturing, logistics, and smart factories."
            />
            <Feature
              icon={Activity}
              title="Intelligent Machines"
              desc="Build robots that perceive, decide, and act intelligently."
            />
            <Feature
              icon={Cpu}
              title="AI + Hardware"
              desc="Combine AI software with real hardware systems."
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
              "Robotics fundamentals & kinematics",
              "Sensors, actuators & embedded systems",
              "Control systems & motion planning",
              "Robot perception & computer vision",
              "AI for robotics & autonomy",
              "ROS (Robot Operating System) basics",
              "Industrial automation workflows",
              "Simulation & testing",
              "Safety & reliability in robotics",
              "Deployment of robotic systems",
            ].map((item) => (
              <div
                key={item}
                className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-sky-500/5 hover:border-sky-500/30 transition"
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
              icon={Bot}
              title="Robotics Projects"
              desc="Hands-on work with real robotic systems and simulations."
            />
            <Feature
              icon={Settings}
              title="System Integration"
              desc="Integrate hardware, software, and AI models."
            />
            <Feature
              icon={ArrowRight}
              title="Career Readiness"
              desc="Portfolio projects, interview prep, and robotics career guidance."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-600/20 via-transparent to-transparent" />

        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">
            Build the Robots of Tomorrow
          </h2>

          <p className="mt-6 text-slate-400">
            Launch your career in robotics, automation, and intelligent machines.
          </p>

          <div className="mt-14 flex justify-center gap-4">
            <Link
              href="/b2c/apply"
              className="bg-sky-600 hover:bg-sky-500 px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-600/40"
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
      <span className="text-sky-400">{icon}</span>
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
    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-sky-500/30 hover:bg-sky-500/5 transition">
      <Icon className="w-7 h-7 text-sky-400 mb-5" />
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-sky-400">{value}</div>
      <div className="mt-2 text-sm text-slate-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
