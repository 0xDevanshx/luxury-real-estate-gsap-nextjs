"use client";

import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

import { FEATURED_LISTINGS as LISTINGS } from "@/data/mockData";

export default function FeaturedListings() {
  return (
    <div id="search" className="w-full">
      <section
        id="properties"
        className="relative w-full bg-[#0a0a0a] text-white py-24 md:py-32"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-none mb-4">
              Exclusive
              <br />
              Listings
            </h2>
            <p className="text-sm uppercase tracking-widest text-white/60 max-w-xs">
              Discover unparalleled luxury properties across the globe.
            </p>
          </div>
          <div className="text-white/50 text-xs uppercase tracking-widest flex items-center gap-2">
            <span>Scroll to explore</span>
            <ArrowRight size={16} />
          </div>
        </div>

        <div className="w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide pb-12 px-6 lg:px-12">
          <div className="flex gap-6 w-max">
            {LISTINGS.map((property, idx) => (
              <div
                key={property.id}
                className="group relative flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[500px] h-[50vh] md:h-[60vh] flex flex-col justify-end overflow-hidden cursor-pointer snap-center sm:snap-start bg-[#111] rounded-sm transition-all duration-250 ease-out hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              >
                <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#111]">
                  <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 500px"
                    className="object-cover transition-all duration-250 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.08] hover:will-change-transform"
                    priority={idx < 2}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                <div className="relative z-10 p-6 lg:p-8 flex flex-col justify-end h-full">
                  <div className="flex items-center gap-2 text-white/80 mb-2 text-[10px] md:text-xs uppercase tracking-widest font-semibold">
                    <MapPin size={12} />
                    <span>{property.location}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif mb-4 tracking-tight line-clamp-2 drop-shadow-md">
                    {property.title}
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/20 pt-4">
                    <div>
                      <p className="text-[10px] md:text-xs text-white/60 mb-1 uppercase tracking-widest">
                        Price
                      </p>
                      <p className="text-lg md:text-xl font-light tracking-wide">
                        {property.price}
                      </p>
                    </div>
                    <div className="flex gap-4 text-xs md:text-sm text-white/70 text-right font-light">
                      <div>
                        <span className="block text-white font-medium text-sm">
                          {property.beds}
                        </span>{" "}
                        Beds
                      </div>
                      <div>
                        <span className="block text-white font-medium text-sm">
                          {property.baths}
                        </span>{" "}
                        Baths
                      </div>
                      <div>
                        <span className="block text-white font-medium text-sm">
                          {property.sqft}
                        </span>{" "}
                        Sq.Ft
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
