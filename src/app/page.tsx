import Hero from "@/components/sections/Hero";
import FeaturedListings from "@/components/sections/FeaturedListings";
import PressVideoSection from "@/components/sections/PressVideoSection";
import FounderSpotlight from "@/components/sections/FounderSpotlight";
import Stats from "@/components/sections/Stats";
import CompanyOverview from "@/components/sections/CompanyOverview";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-black text-white">
      <Hero />
      <FeaturedListings />
      <PressVideoSection />
      <FounderSpotlight />
      <Stats />
      <CompanyOverview />
    </main>
  );
}
