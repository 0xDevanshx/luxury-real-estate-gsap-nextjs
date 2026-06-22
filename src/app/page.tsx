import Hero from "@/components/sections/Hero";
import FeaturedListings from "@/components/sections/FeaturedListings";
import PressVideoSection from "@/components/sections/PressVideoSection";
import FounderSpotlight from "@/components/sections/FounderSpotlight";
import Stats from "@/components/sections/Stats";
import CompanyOverview from "@/components/sections/CompanyOverview";
import CTATileBand from "@/components/sections/CTATileBand";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import Testimonials from "@/components/sections/Testimonials";
import PressMediaGrid from "@/components/sections/PressMediaGrid";
import SocialMarquee from "@/components/sections/SocialMarquee";
import MagazineShowcase from "@/components/sections/MagazineShowcase";
import AppShowcase from "@/components/sections/AppShowcase";
import Philanthropy from "@/components/sections/Philanthropy";
import NewsletterSignup from "@/components/sections/NewsletterSignup";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-black text-white">
      <Hero />
      <FeaturedListings />
      <PressVideoSection />
      <FounderSpotlight />
      <Stats />
      <CompanyOverview />
      <CTATileBand />
      <BeforeAfterSlider />
      <Testimonials />
      <PressMediaGrid />
      <SocialMarquee />
      <MagazineShowcase />
      <AppShowcase />
      <Philanthropy />
      <NewsletterSignup />
    </main>
  );
}
