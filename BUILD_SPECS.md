# BUILD_SPEC.md — Cinematic Scroll-Driven Luxury Real Estate Website

> Paste this file's "MASTER PROMPT" section into the Antigravity prompt box.
> The AGENTS.md at the project root governs all hard rules and stack choices.
> PROGRESS.md tracks per-section completion for the Ralph autonomous loop.

---

## MASTER PROMPT

Build a cinematic, scroll-driven single-page marketing site for a luxury real estate
brokerage in this Next.js 14 + TypeScript + Tailwind project. Follow AGENTS.md strictly
for all rules, stack choices, and browser verification protocol.

---

### GLOBAL SCROLL + ANIMATION SYSTEM

Set up Lenis smooth scroll synced with GSAP ScrollTrigger in a root client provider
(`app/providers/SmoothScrollProvider.tsx`):

```ts
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

Every scroll-bound animation must use `scrub: true` or `scrub: 1.5` — never
`once: true`. Animations play forward on scroll-down and reverse on scroll-up.

Add a `prefers-reduced-motion` global check via `ScrollTrigger.matchMedia`:
- Disable Lenis smoothing
- Replace all scrub tweens with static CSS `transition` fallbacks
- Zero layout shift

Also set up:
- A `gsap.context()` wrapper in every component's `useEffect` for cleanup
- `will-change: transform` on every animated element before first paint
- `IntersectionObserver` pausing all `<video>` elements not in the viewport

---

### GLOBAL INTERACTIVE LAYER (set up once, used everywhere)

**Custom cursor:** A single global `<CustomCursor>` component. Pointer-events: none.
Scales from 12px to 48px circle on hover over any `[data-cursor="pointer"]` element.
Smooth position via `motion/react` `useSpring`.

**Scroll progress bar:** A `<ProgressBar>` fixed to `top: 0`, width driven by
`ScrollTrigger.create({ onUpdate: self => setProgress(self.progress) })` on the
full document height.

**Floating "back to top" button:** Appears after 600px scroll depth. Uses
`lenis.scrollTo(0)` on click. Animated entrance with GSAP `fromTo` opacity + y.

**Magnetic CTA buttons:** Any button with `data-magnetic` gets pointer-tracking:
`mousemove` → `lerp`-damped `translate3d` (max ±12px) via `motion/react` `useSpring`
with `stiffness: 150, damping: 20`. Resets smoothly on `mouseleave`.

---

### SECTIONS (implement and verify one at a time in this exact order)

#### 1. Sticky Header
Transparent over the hero. On scroll past hero height: `backdrop-filter: blur(12px)` +
solid background fade via GSAP scrub tween on `background-color` alpha. Logo left,
nav links center (desktop), hamburger right (mobile). All nav links use lucide-react
icons for any decorative accents — no emoji.

#### 2. Hero — Video Crossfade + Kinetic Typography
- Background: looping crossfade slideshow of 3–4 `<video>` elements. Crossfade via
  GSAP `gsap.to(videoEl, { opacity: 0, duration: 1 })` on a timer, NOT CSS transitions.
- Manual dot controls (lucide-react `Circle` / `CircleDot`), play/pause toggle
  (`Play` / `Pause` icons), accessible `aria-label`.
- Headline: split with SplitType by **word**. Each word animates
  `opacity: 0 → 1, y: 60px → 0` staggered, scrub-linked (`scrub: 1.5`).
- Kinetic scale: headline `font-size` tweens from `clamp(10vw, 12vw, 160px)` down to
  `clamp(2rem, 3vw, 48px)` as user scrolls past, tied to ScrollTrigger progress on the
  hero section.
- Scroll-down indicator: lucide-react `ChevronDown` with a looping `y` bob animation
  (GSAP `yoyo: true, repeat: -1`) — paused when `prefers-reduced-motion`.
- Quick links row below subhead: 4 icon + label links using lucide-react icons.

**3D Video Panel (the cinematic wow moment):**
Implement in this section using React Three Fiber. Map one of the hero videos onto a
`THREE.VideoTexture` applied to a slightly curved geometry (use a large-radius
`CylinderGeometry` segment to simulate cinema-screen curve). Tilt `rotation.x` and
`rotation.y` based on normalized mouse position, lerp-damped (`alpha = 0.05` per
`useFrame`). Add `<ContactShadows>` beneath for grounding. Wrap in
`dynamic(() => import(...), { ssr: false })`.

#### 3. Featured Listings — Horizontal Scroll-Jacked Carousel
Pin the section with `ScrollTrigger.create({ pin: true, scrub: true })`. Translate a
horizontal track (`display: flex`) via `gsap.to(track, { x: -totalScrollWidth })` tied
to that pin. Cards show: property image, price, address, bed/bath/sqft using
lucide-react icons (`Bed`, `Bath`, `Maximize2`). On card hover: image zoom
(`scale: 1.05`), overlay slides up from bottom via Tailwind `group-hover:translate-y-0`.
All placeholder content clearly labeled.

#### 4. Press / Accolades Strip + Video Module
Horizontal strip of press logo placeholders (use `[PRESS LOGO]` boxes). Below or
inset: a video thumbnail with a 3D-tilted play button. The play button uses CSS 3D
(`transform-style: preserve-3d, perspective: 600px`) and tilts toward cursor on
`mousemove`. Clicking opens a lightbox video player (focus-trapped, Escape closes).

#### 5. Founder / Team Spotlight — Pinned Parallax
Pin the section. Portrait image parallaxes at `0.4x` scroll speed (moves slower than
the page). Bio text scrubs into view line-by-line using SplitType split by **line**,
`opacity: 0 → 1, x: -30px → 0` per line, staggered via GSAP scrub. Fully reverses
on scroll-up.

#### 6. Stats — Scroll-Scrubbed Counters
Four stats (e.g. `$X.XB`, `XXX`, `XX`, `XXXX` — all placeholder). Each counter
increments from `0` to its target value as the user scrolls through a pinned section.
Tied to `ScrollTrigger` progress via a GSAP `proxy` object and `snap: false`. SplitType
splits the digit chars for individual stagger. Reverses (counts back down) on scroll-up.

#### 7. Company Overview — SVG Draw-on Separator
Logo mark (SVG placeholder), two paragraphs of placeholder copy, parallax background
texture image (moves at `0.6x` scroll speed). A decorative SVG line/signature separator
between the logo and text: animate with GSAP `DrawSVGPlugin`,
`drawSVG: "0%" → "100%"`, scrub-linked. Fully reverses on scroll-up.

Scroll-progress color shift: as user enters this section, tween a CSS custom property
`--section-accent` on `:root` from the hero's accent color to this section's brand
color, via GSAP `gsap.to(document.documentElement, { '--section-accent': '#value' })`.

#### 8. CTA Tile Band
4–5 large tappable tiles in a grid. Each tile: lucide-react icon (large, centered),
label below. On hover: `translateY(-8px)` lift + subtle box-shadow increase via CSS
`transition`. Primary CTA tile gets `data-magnetic` for the global magnetic button
behavior.

#### 9. Before / After Drag-to-Compare Slider
Two images (before/after of a property renovation — placeholder images). A draggable
divider bar controls a `clip-path` on the "after" layer. Pointer-events based drag.
Keyboard accessible: focus the handle, use arrow keys to move ±5%. Include lucide-react
`ChevronLeft` + `ChevronRight` on the handle.

#### 10. Testimonials Carousel
Swiper.js carousel. `autoplay: { delay: 4000, pauseOnMouseEnter: true }`. Each slide:
a large lucide-react `Quote` icon, testimonial text (placeholder), client name
(placeholder), rating (lucide-react `Star` icons). Navigation arrows use lucide-react
`ArrowLeft` / `ArrowRight`.

#### 11. Press / Media Grid
Masonry or even grid of press article cards. Each card: publication name placeholder,
headline placeholder, thumbnail placeholder. On hover: overlay fades in with "Read
Article" text + lucide-react `ExternalLink` icon. Cards use GSAP stagger reveal on
scroll entry (`toggleActions: "play reverse play reverse"`).

#### 12. Social-Proof Marquee
Two rows of infinite auto-scrolling comparison bars (e.g. "Listed at $X.XM — Sold at
$X.XM — 14 days on market"). Pure CSS `@keyframes` `translate` on duplicated content.
Row 1 scrolls left, row 2 scrolls right for visual interest. `animation-play-state:
paused` on hover. Reduced-motion: `animation: none`, show static list instead.

#### 13. Digital Magazine Showcase
Stacked cover mockup (3 covers, slightly rotated via CSS `rotate`, z-indexed). A subtle
continuous float animation on the top cover: GSAP `yoyo: true, repeat: -1, y: ±10px,
duration: 3, ease: "sine.inOut"` — paused when `prefers-reduced-motion`. "Click to
Read" overlay on hover. Clicking opens a lightbox (focus-trapped, Escape to close).

#### 14. App Showcase — CSS 3D Phone Tilt
A phone mockup image (placeholder) inside a container with:
```css
perspective: 1000px;
transform-style: preserve-3d;
```
On `mousemove`: map cursor offset to `rotateX` (±15deg) and `rotateY` (±15deg) applied
via inline style. CSS `transition: transform 0.15s ease` for damping. `mouseleave`
resets to `rotateX(0deg) rotateY(0deg)`. Real App Store and Google Play badge images
(SVG assets, not emoji). Screen content inside the mockup is a placeholder screenshot.

#### 15. Philanthropy Section
Full-bleed background video (muted, looping, `playsinline`). Centered lucide-react
`Play` icon button (large circle, `aria-label="Watch impact video"`). Clicking opens a
lightbox video player (focus-trapped, Escape closes). Two paragraphs of placeholder
impact copy. Text uses SplitType line split + scroll-linked reveal.

#### 16. Newsletter Signup Form
React Hook Form + Zod schema:
```ts
z.object({
  email: z.string().email(),
  consent: z.literal(true, { errorMap: () => ({ message: "Required" }) })
})
```
Fields: email input, consent checkbox with placeholder legal copy, submit button (with
`data-magnetic`). Show inline validation errors. On success: swap form for a
lucide-react `CheckCircle` + success message. No real email endpoint — placeholder
`console.log` with `// TODO: wire up real API`.

#### 17. Office Locations
Stacked full-width cards, one per office (2–3 placeholder locations). Each card:
background photo parallaxing at `0.5x` scroll speed (slower than card text),
office name, address (`// TODO: real address`), phone link (`tel:`), and email link.
`MapPin`, `Phone`, `Mail` lucide-react icons. GSAP scrub drives `backgroundPositionY`
for the parallax — do not use `transform` on background images directly (use a
pseudo-element or nested div).

#### 18. Footer
Sitemap in 3–4 columns (placeholder nav links). Social platform icons: use purpose-built
SVG icon components (Twitter/X, Instagram, LinkedIn, YouTube) — not lucide-react (which
lacks some brand icons) and definitely not emoji. "Back to Top" text button calls
`lenis.scrollTo(0, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) })`.
Copyright line with placeholder brand name.

---

### VERIFICATION AFTER EACH SECTION

After each section, use the Browser Subagent to:
1. Load the live dev server page.
2. Scroll down through the section — screenshot at 3 scroll positions.
3. Scroll back up — screenshot at the same 3 positions.
4. Confirm in text that the animation reversed cleanly.
5. Report any section where reverse fails before proceeding.

---

### FINAL PASS CHECKLIST

After all 18 sections are complete:

- [ ] `prefers-reduced-motion` audit: test with OS setting enabled, confirm zero GSAP
  scrub animations fire, all videos static, marquees stopped.
- [ ] Mobile responsive pass: test at 375px, 768px, 1280px. Reduce parallax intensity
  to 0.2x on mobile via `ScrollTrigger.matchMedia`. Ensure horizontal carousel is
  touch-scrollable on mobile (add Swiper or native overflow scroll as fallback).
- [ ] Keyboard navigation audit: Tab through all interactive elements, confirm focus
  rings visible, all modals focus-trapped, Escape closes modals.
- [ ] Lighthouse desktop audit: CLS < 0.1, LCP < 2.5 s, Accessibility ≥ 90.
- [ ] `npm run build` — zero errors.
- [ ] `npm run lint` — zero errors.
- [ ] All placeholder content flagged with `// TODO: replace with real brand content`.