# PROGRESS.md — Ralph Loop Checklist

Each iteration of the Ralph loop picks the next unchecked item, implements it fully,
verifies scroll reversal via Browser Subagent, runs build + lint, and checks it off
with a one-line note. One item per iteration — do not start the next.

---

- [x] Root providers: Lenis + ScrollTrigger + gsap.context pattern — lenis initialized, smooth scroll verified, build clean
- [x] Global interactive layer: custom cursor, scroll progress bar, floating back-to-top, magnetic button system — implemented and verified with browser subagent, build clean
- [x] Sticky header (transparent → blurred solid) — implemented with GSAP scroll scrub tween, verified via browser subagent, build clean
- [x] Hero: video crossfade slideshow + kinetic typography + SplitType headline — Verified responsive kinetic font scale, crossfades, and staggered text reveal via Browser Subagent
- [x] Hero: 3D video panel (React Three Fiber VideoTexture + cursor tilt) — Verified visually, tilt interaction works and typography renders flawlessly on top
- [x] Featured listings: horizontal scroll-jacked carousel (pinned, scrub) — Completed with GSAP pin, Unsplash images added to next.config.ts, build clean
- [ ] Press strip + CSS 3D video thumbnail + lightbox player
- [ ] Founder spotlight: pinned section + portrait parallax + SplitType line bio
- [ ] Stats: scroll-scrubbed counters (SplitType chars, reverse on scroll-up)
- [ ] Company overview: SVG DrawSVG separator + scroll-progress color shift
- [ ] CTA tile band: grid tiles + magnetic primary CTA
- [ ] Before/after drag-to-compare slider (clip-path, keyboard accessible)
- [ ] Testimonials: Swiper autoplay + pause on hover + Quote icon
- [ ] Press/media grid: stagger reveal + hover overlay + ExternalLink icon
- [ ] Social-proof marquee: infinite CSS scroll, dual direction, pause on hover
- [ ] Digital magazine showcase: stacked covers + float animation + lightbox
- [ ] App showcase: CSS 3D phone tilt + real App Store / Google Play badges
- [ ] Philanthropy section: background video + lightbox + SplitType reveal
- [ ] Newsletter signup: React Hook Form + Zod + inline validation + success state
- [ ] Office locations: parallax background photo cards + contact links
- [ ] Footer: sitemap columns + social SVG icons + Lenis scrollTo top
- [ ] Prefers-reduced-motion audit pass
- [ ] Mobile responsive pass (ScrollTrigger.matchMedia, touch carousel fallback)
- [ ] Keyboard + focus audit (modals, carousels, drag slider)
- [ ] Lighthouse audit gate: CLS < 0.1, LCP < 2.5 s, Accessibility ≥ 90