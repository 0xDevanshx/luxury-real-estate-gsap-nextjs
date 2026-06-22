# Ralph Task — Single Iteration Instruction

Read AGENTS.md, BUILD_SPEC.md, and PROGRESS.md in full before doing anything else.

Pick the next unchecked item in PROGRESS.md.

Implement it completely:
- Follow every rule in AGENTS.md without exception.
- Use the exact stack, animation approach, and component structure specified in BUILD_SPEC.md for this section.
- Add `will-change: transform` to every animated element.
- Wrap all GSAP calls in `gsap.context()` returned from `useEffect` cleanup.
- Use only placeholder content; flag every placeholder with `// TODO: replace with real brand content`.

Verify with the Browser Subagent:
- Load the live dev server.
- Scroll DOWN through the section; screenshot at three positions (entering, mid, leaving).
- Scroll BACK UP through the section; screenshot at the same three positions.
- Write one sentence confirming the animation reversed — or describe exactly what failed.
- Do not proceed if the animation does not reverse. Debug and fix first.

Run the build gate:
- `npm run lint` — must return zero errors.
- `npm run build` — must complete with zero errors.
- Fix all errors before continuing.

Update PROGRESS.md:
- Mark the completed item with `[x]` and append a one-line note, e.g.:
  `- [x] Stats counters — scrub-linked via proxy object, reverses cleanly, lint clean`

Commit:
- `git add -A && git commit -m "feat: [section name] — scroll reverse verified, build clean"`

Stop after this one item. Do not start the next unchecked item.