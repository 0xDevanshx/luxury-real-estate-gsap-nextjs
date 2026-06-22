import Hero from "@/components/sections/Hero";
import FeaturedListings from "@/components/sections/FeaturedListings";
import PressVideoSection from "@/components/sections/PressVideoSection";
import FounderSpotlight from "@/components/sections/FounderSpotlight";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-black text-white">
      <Hero />
      <FeaturedListings />
      <PressVideoSection />
      <FounderSpotlight />
    </main>
  );
}
