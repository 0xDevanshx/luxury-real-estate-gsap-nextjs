"use client";

import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Luxe Estates redefined my expectations of what a brokerage can be. Their absolute discretion and unparalleled access to off-market masterpieces secured my family's legacy property.",
    author: "Elena Rostova",
    title: "International Art Collector"
  },
  {
    id: 2,
    quote: "The advisory experience was intensely private, localized, and flawlessly executed. They didn't just find a house; they curated a lifestyle that perfectly matches our vision.",
    author: "Marcus Chen",
    title: "Tech Entrepreneur"
  },
  {
    id: 3,
    quote: "When you operate at the highest tier of global real estate, you require a partner who anticipates needs before they arise. Luxe Estates is that partner.",
    author: "Sophia Sterling",
    title: "Venture Capitalist"
  }
];

export default function Testimonials() {
  return (
    <section className="relative w-full bg-[#111111] text-white py-32 md:py-48 z-10 border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-widest text-white/50 mb-4">Client Perspectives</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1000}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            className="w-full"
          >
            {TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="flex flex-col items-center text-center px-4 md:px-12 py-8 cursor-grab active:cursor-grabbing">
                  <Quote size={48} className="text-white/20 mb-12" strokeWidth={1} />
                  
                  <blockquote className="text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed md:leading-tight tracking-tight mb-16 text-white/90">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-[1px] bg-white/30 mb-6" />
                    <cite className="text-lg font-medium not-italic text-white">
                      {testimonial.author}
                    </cite>
                    <span className="text-sm text-white/50 tracking-widest uppercase mt-2">
                      {testimonial.title}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}
