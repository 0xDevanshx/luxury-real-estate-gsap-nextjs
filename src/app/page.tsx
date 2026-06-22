import Hero from "@/components/sections/Hero";
import FeaturedListings from "@/components/sections/FeaturedListings";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-black text-white">
      <Hero />
      <FeaturedListings />
    </main>
  );
}
