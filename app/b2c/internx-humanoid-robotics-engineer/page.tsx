import Link from "next/link";
import Image from "next/image";
import {
  Bot,
  Brain,
  Cpu,
  Activity,
  Users,
  Settings,
  ArrowRight,
} from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";

export const metadata = {
  title: "InternX – Humanoid Robotics Engineer Internship | Career Lab",
  description:
    "Join the InternX Humanoid Robotics Engineer Internship. Learn humanoid robot design, AI cognition, motion control, perception systems, and real-world humanoid robotics deployment.",
};

export default function InternXHumanoidRoboticsEngineerPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.18),transparent_60%)]" />

        <div className="relative max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-xs font-black uppercase tracking-widest text-rose-400">
              InternX Program
            </span>

            <h1 className="text-2xl md:text-4xl font-black leading-tight">
              Humanoid Robotics Engineer Internship
            </h1>

            <p className="mt-6 text-sm text-slate-400 max-w-xl">
              Build next-generation humanoid robots that think, move, and interact
              like humans. Work on AI cognition, motion planning, perception, and
              human-robot interaction used in advanced research and industry labs.
            </p>

            {/* CHIPS */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Chip icon={<Bot className="w-4 h-4" />} label="Humanoid Robots" />
              <Chip icon={<Brain className="w-4 h-4" />} label="AI Cognition" />
              <Chip icon={<Activity className="w-4 h-4" />} label="Motion & Balance" />
              <Chip icon={<Users className="w-4 h-4" />} label="Human-Robot Interaction" />
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/b2c/apply"
                className="bg-red-600 hover:bg-rose-500 px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-rose-600/30"
              >
                Apply Now <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/b2c/program-finder"
                className="border border-white/20 hover:border-rose-500/50 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest"
              >
                Find My Program
              </Link>
            </div>
          </div>

          <div className="relative hidden md:flex justify-end">
            <img
              src="https://img.freepik.com/free-photo/group-young-people-vr-glasses-doing-experiments-robotics-laboratory-robot-table_1268-24391.jpg"
              alt="Humanoid Robotics Engineer Illustration"
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          <Stat label="Weeks" value="18+" />
          <Stat label="Humanoid Projects" value="6+" />
          <Stat label="AI Systems" value="10+" />
          <Stat label="Career Support" value="100%" />
        </div>
      </section>

      {/* WHY HUMANOID ROBOTICS */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">
            Why Humanoid Robotics?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={Users}
              title="Human-Like Interaction"
              desc="Humanoid robots are designed to work alongside humans safely and naturally."
            />
            <Feature
              icon={Brain}
              title="AI Intelligence"
              desc="Advanced AI enables reasoning, perception, and adaptive behavior."
            />
            <Feature
              icon={Settings}
              title="Complex Engineering"
              desc="One of the most challenging and rewarding fields in robotics."
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
              "Humanoid robot anatomy & kinematics",
              "Balance, locomotion & gait control",
              "AI perception & sensor fusion",
              "Motion planning & control systems",
              "Human-robot interaction (HRI)",
              "Speech & vision integration",
              "ROS for humanoid robotics",
              "Simulation & testing environments",
              "Safety & ethics in humanoid AI",
              "Deployment of humanoid systems",
            ].map((item) => (
              <div
                key={item}
                className="p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-rose-500/5 hover:border-rose-500/30 transition"
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
              title="Humanoid Projects"
              desc="Work on advanced humanoid robots and simulations."
            />
            <Feature
              icon={Cpu}
              title="AI Integration"
              desc="Integrate cognition, perception, and control systems."
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
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/20 via-transparent to-transparent" />

        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">
            Build Robots That Walk & Think Like Humans
          </h2>

          <p className="mt-6 text-slate-400">
            Enter the frontier of humanoid robotics and artificial intelligence.
          </p>

          <div className="mt-14 flex justify-center gap-4">
            <Link
              href="/b2c/apply"
              className="bg-rose-600 hover:bg-rose-500 px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-600/40"
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
      <span className="text-rose-400">{icon}</span>
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
    <div className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-rose-500/30 hover:bg-rose-500/5 transition">
      <Icon className="w-7 h-7 text-rose-400 mb-5" />
      <h3 className="font-bold text-lg mb-3">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-black text-rose-400">{value}</div>
      <div className="mt-2 text-sm text-slate-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
