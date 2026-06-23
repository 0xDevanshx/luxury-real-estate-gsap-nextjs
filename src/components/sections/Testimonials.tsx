"use client";

import { useState } from "react";
import { Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "They didn't just find us a property. They found us a lifestyle.",
    author: "Michael Anderson",
    title: "International Art Collector"
  },
  {
    id: 2,
    quote: "Every detail felt intentional, from the first viewing to the final signature.",
    author: "Sophia Bennett",
    title: "Tech Entrepreneur"
  },
  {
    id: 3,
    quote: "The level of professionalism exceeded every expectation we had.",
    author: "David Walker",
    title: "Venture Capitalist"
  },
  {
    id: 4,
    quote: "We explored dozens of properties, but only one truly felt like home.",
    author: "Emma Richardson",
    title: "Architect"
  },
  {
    id: 5,
    quote: "Their market knowledge gave us confidence throughout the entire process.",
    author: "James Foster",
    title: "Investment Banker"
  },
  {
    id: 6,
    quote: "What impressed us most was their attention to detail.",
    author: "Olivia Carter",
    title: "Creative Director"
  },
  {
    id: 7,
    quote: "The experience was seamless, sophisticated, and completely stress-free.",
    author: "Ethan Brooks",
    title: "CEO"
  },
  {
    id: 8,
    quote: "They transformed a complex purchase into an enjoyable journey.",
    author: "Charlotte Hayes",
    title: "Philanthropist"
  },
  {
    id: 9,
    quote: "Every recommendation reflected a deep understanding of our vision.",
    author: "William Parker",
    title: "Surgeon"
  },
  {
    id: 10,
    quote: "Luxury is about trust, and they earned ours from day one.",
    author: "Amelia Scott",
    title: "Author"
  },
  {
    id: 11,
    quote: "We never felt pressured. We always felt guided.",
    author: "Benjamin Reed",
    title: "Executive Producer"
  },
  {
    id: 12,
    quote: "The quality of service matched the quality of the properties.",
    author: "Victoria Hayes",
    title: "Fashion Designer"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <section className="relative w-full bg-[#111111] text-white py-32 md:py-48 z-10 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center">

        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-widest text-white/50 mb-4">Client Perspectives</h2>
        </div>

        {/* The Slider Section */}
        <div className="w-[100vw] relative">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            slidesPerView="auto"
            centeredSlides={true}
            spaceBetween={40}
            speed={800}
            grabCursor={true}
            onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
            onSliderMove={() => setHasInteracted(true)}
            loop={true}
            className="w-full !overflow-visible"
          >
            {TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="!w-[85vw] md:!w-[60vw] max-w-[800px]">
                {({ isActive }) => (
                  <div
                    className={`flex flex-col items-center text-center px-4 md:px-12 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isActive ? "opacity-100 scale-100" : "opacity-20 scale-90 blur-[2px]"
                      }`}
                  >
                    <Quote size={40} className="text-white/20 mb-10" strokeWidth={1} />

                    {/* Fixed Height Quote Container to prevent vertical layout shifts */}
                    <div className="h-[200px] md:h-[180px] lg:h-[160px] flex items-center justify-center w-full">
                      <blockquote className="text-2xl md:text-4xl lg:text-5xl font-light leading-snug tracking-tight text-white/90">
                        &quot;{testimonial.quote}&quot;
                      </blockquote>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Fixed Author Container (Does not slide, only cross-fades) */}
        <div className="relative w-full h-[120px] mt-16 flex items-center justify-center">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div
              key={`author-${testimonial.id}`}
              className={`absolute flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeIndex === idx
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"
                }`}
            >
              <div className="w-8 h-[1px] bg-white/30 mb-6" />
              <cite className="text-lg font-medium not-italic text-white">
                {testimonial.author}
              </cite>
              <span className="text-sm text-white/50 tracking-widest uppercase mt-2">
                {testimonial.title}
              </span>
            </div>
          ))}
        </div>

        {/* Discoverability Hint */}
        <div
          className={`mt-12 transition-all duration-1000 ease-in-out ${hasInteracted ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
            }`}
        >
          <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-white/40 flex items-center gap-4">
            <span className="w-8 h-[1px] bg-white/20" />
            Drag to explore stories
            <span className="w-8 h-[1px] bg-white/20" />
          </p>
        </div>

      </div>
    </section>
  );
}
