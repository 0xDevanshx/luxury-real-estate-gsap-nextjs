import StickyHeader from "@/components/global/StickyHeader";
import Footer from "@/components/sections/Footer";

export default function SearchPage() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white flex flex-col">
      <StickyHeader />
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">Property Search</h1>
        <p className="text-white/60 max-w-2xl text-lg mb-12">
          Find your next global asset or luxury residence.
        </p>
        
        <div className="w-full max-w-xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative flex items-center bg-[#111] rounded-full border border-white/10 p-2">
            <input 
              type="text" 
              placeholder="Search by city, neighborhood, or lifestyle..." 
              className="bg-transparent text-white placeholder-white/30 px-6 py-3 outline-none w-full"
            />
            <button className="bg-white text-black px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-colors">
              Search
            </button>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}
