'use client';

import { useState } from "react";

export default function ApplyClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "Data Engineer",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappMessage = `
New InternX Application 🚀

👤 Name: ${form.name}
📧 Email: ${form.email}
📱 Phone: ${form.phone}
🎯 Program: ${form.program}

📝 Motivation:
${form.message}
    `.trim();

    const whatsappURL = `https://wa.me/918700236923?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <>
      {/* HERO */}
      <section className="pt-36 pb-24 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />

        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black">
            Apply for InternX
          </h1>
          <p className="mt-6 text-lg text-slate-400">
            Take the first step towards a future-ready tech career.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="py-28">
        <div className="max-w-[720px] mx-auto px-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 space-y-6 shadow-2xl"
          >
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            <Input
              label="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <Input
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />

            <div>
              <label className="block text-sm font-bold mb-2">
                Preferred Program
              </label>
              <select
                name="program"
                value={form.program}
                onChange={handleChange}
                className="w-full bg-[#0a0a0a] border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
              >
                <option>Data Engineer</option>
                <option>AI Engineer</option>
                <option>Cloud & AI Engineer</option>
                <option>Cyber Security Expert</option>
                <option>AI Product Manager</option>
                <option>Robotics & IoT Engineer</option>
                <option>XR & AI Developer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Why do you want to join InternX?
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-[#0a0a0a] border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
                placeholder="Briefly describe your motivation"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-600/40"
            >
              Submit via WhatsApp
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

/* INPUT */
function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: any) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold mb-2">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-[#0a0a0a] border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
      />
    </div>
  );
}
