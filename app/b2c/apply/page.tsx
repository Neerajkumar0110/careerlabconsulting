import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";
import ApplyClient from "@/app/b2c/apply/ApplyClient";

export const metadata = {
  title: "Apply for InternX | Career Lab",
  description:
    "Apply for InternX internships and start your career in AI, data, cloud, and future technologies.",
};

export default function ApplyPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />
      <ApplyClient />
      <Footer />
    </main>
  );
}
