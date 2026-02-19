import HomeNavbar from "@/components/freelancex/layout/HomeNavbar";
import Hero from "@/components/freelancex/landing/Hero";
import Services from "@/components/freelancex/landing/Services";
import HowItWorks from "@/components/freelancex/landing/HowItWorks";
import WhyChooseUs from "@/components/freelancex/landing/WhyChooseUs";
import Pricing from "@/components/freelancex/landing/Pricing";
import Review from "@/components/freelancex/landing/Reviews";
import Footer from "@/components/freelancex/landing/Footer";

export default function HomePage() {
  return (
    <>
    <HomeNavbar />
      <Hero />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <Pricing />
      <Review />
      <Footer />
    </>
  );
}
