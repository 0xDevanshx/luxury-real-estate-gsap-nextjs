"use client";

import Link from "next/link";
import { Building2, ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

export default function Footer() {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-black text-white pt-24 pb-12 px-6 border-t border-white/10 z-10 relative">
      <div className="max-w-screen-xl mx-auto">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="lg:w-1/3 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-6 group" data-magnetic>
              <Building2 className="w-8 h-8 group-hover:text-white/80 transition-colors" strokeWidth={1.5} />
              <span className="text-2xl font-medium tracking-[0.2em] uppercase">LuxeEstates</span>
            </Link>
            <p className="text-white/60 font-light leading-relaxed max-w-sm mb-8">
              Curating the world&apos;s most exceptional properties for those who demand the extraordinary. Redefining modern luxury living since 1998.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8">
            
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold tracking-widest uppercase text-white/40 mb-2">Portfolio</h4>
              <Link href="#" className="text-white/70 hover:text-white font-light transition-colors">Residential</Link>
              <Link href="#" className="text-white/70 hover:text-white font-light transition-colors">Commercial</Link>
              <Link href="#" className="text-white/70 hover:text-white font-light transition-colors">Off-Market</Link>
              <Link href="#" className="text-white/70 hover:text-white font-light transition-colors">Developments</Link>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold tracking-widest uppercase text-white/40 mb-2">Company</h4>
              <Link href="#" className="text-white/70 hover:text-white font-light transition-colors">About Us</Link>
              <Link href="#" className="text-white/70 hover:text-white font-light transition-colors">Advisors</Link>
              <Link href="#" className="text-white/70 hover:text-white font-light transition-colors">Journal</Link>
              <Link href="#" className="text-white/70 hover:text-white font-light transition-colors">Contact</Link>
            </div>

            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <h4 className="text-sm font-bold tracking-widest uppercase text-white/40 mb-2">Legal</h4>
              <Link href="#" className="text-white/70 hover:text-white font-light transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-white/70 hover:text-white font-light transition-colors">Terms of Service</Link>
              <Link href="#" className="text-white/70 hover:text-white font-light transition-colors">Cookie Policy</Link>
            </div>

          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 gap-6">
          <p className="text-white/40 text-sm font-light text-center md:text-left">
            &copy; {new Date().getFullYear()} Luxe Estates International. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-white/60 hover:text-white transition-colors"
            data-magnetic
          >
            <span>Top</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}
