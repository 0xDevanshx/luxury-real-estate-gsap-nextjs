import StickyHeader from "@/components/global/StickyHeader";
import Footer from "@/components/sections/Footer";

export default function PropertiesPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white flex flex-col">
      <StickyHeader />
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">Exclusive Properties</h1>
        <p className="text-white/60 max-w-2xl text-lg mb-12">
          Explore our curated portfolio of off-market masterpieces and luxury estates.
        </p>
        <div className="w-24 h-[1px] bg-white/20 mb-12" />
        <p className="text-sm tracking-widest uppercase text-white/40">Full catalog coming soon</p>
      </div>
      <Footer />
    </main>
  );
}
