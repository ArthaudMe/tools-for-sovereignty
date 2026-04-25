# TFS Year One - Design Brief

## What This Is

A commemorative, single-purpose website for the one-year anniversary of **Tools for Sovereignty** (TFS). It tells the story of navigating the "idea maze" as a startup, every pivot, dead end, and lesson learned over 12 months of searching for product-market fit.

**Not** a company website. **Not** a team page. An account of what we worked on, why we found it interesting, and what we learned from it.

**URL:** toolsforsovereignty.com
**Stack:** Astro (static site), deployed to Vercel

---

## Pages

### 1. Main page: "Navigating the Idea Maze"

A long-scroll editorial page. Chronological. Each section is a "turn" in the maze.

**Hero:**
- Title: "Navigating the Idea Maze"
- Overline: "Year One / April 2025 - April 2026"
- Short intro: "We've spent the last year navigating the idea maze. We built things that worked and things that didn't. We learned a lot. This is an account of what we worked on, why we found it interesting, and what we learned from it."
- Links to three "framework" readings: Chris Dixon's Idea Maze essay, Lenny's PMF article, PostHog's PMF Game

**Each chapter follows a consistent structure:**
1. **What we worked on** (the body paragraph)
2. **Why it was interesting** (blue-bordered callout)
3. **Why we moved on** (red-bordered callout, for dead ends)
4. **Artifacts** (links to repos, demos, screenshots, tweets)

**Timeline chapters:**

1. **The Startup Company** (Oct 2024) - On-chain company incorporation via TSC, Sark jurisdiction, Argentina, EU Inc, ZK neobank [DEAD END]
2. **What Did You Get Done This Week?** (Nov 2024) - Slack bot for async standups and team accountability [DEAD END]
3. **Selling Your Own Data** (Nov-Dec 2024) - Crypto-powered marketplace for users to sell personal data to model companies [DEAD END]
4. **The Worldcoin Bet** (Jan-Apr 2025) - AI mini-apps on World: Sage (250K users), Bestie companion app
5. _Incorporation divider_ (Apr 2025) - TFS becomes a company
6. **Sovereign Memory** (May-Sep 2025) - Private user memory, client-side RAG, Phala TEEs, the manifesto [DEAD END] (manifesto linked as artifact here)
7. **The Identity Play** (Sep-Dec 2025) - IAM provider, log in once, portable identity [DEAD END]
8. **Fast Iterations** (Jan-Feb 2026) - Context seeding, MCP aggregator, portable company context, Open Claw
9. **Context Drift** (Mar-Apr 2026) - Reconciliation tool, automating work, Slack agent [ACTIVE - current]

### 2. Manifesto page: "We're reclaiming the web"

Linked from the Sovereign Memory chapter as an artifact. Long-form editorial text with five sections:
1. "We're reclaiming the web" (the internet's history, platforms, AI opportunity)
2. "The missing layer in AI" (context problem)
3. "Our bet" (upstream personalization)
4. "Meet Mio" (the product)
5. "Why now" (agents, portability, timing)

---

## Aesthetic Direction

### Primary inspiration: [humanityslastmachine.com](https://www.humanityslastmachine.com/)
- Dark background (#090909), very low contrast borders
- Editorial/publication feel, not "startup landing page"
- Sophisticated typography: mix of serif headings (Cormorant Garamond) and geometric sans body (Geist)
- Generous whitespace, unhurried pacing
- Subtle grain texture overlay
- Feels like reading a long-form essay, not browsing a website

### Secondary inspiration: [commonknowled.ge](https://www.commonknowled.ge/)
- Portfolio/artifact approach, link out to things that were built
- Clean, minimal, project-card aesthetic

### Also referenced:
- Lenny's Newsletter layout for content structure
- PostHog's PMF Game for the "game board" / progression feel

### What to avoid:
- Startup cliches (hero CTAs, testimonial carousels, gradient blobs)
- Bright/saturated colors. The palette is muted and dark
- Feeling like a pitch deck. This is reflective, not promotional

---

## Design Tokens

```
Background:     #090909
Surface:        #111111
Border:         #1a1a1a
Muted text:     #555555
Body text:      #d4d4d4
Headings:       #f0f0f0
Accent (links): #8b9cf7 (soft periwinkle)
Dead end:       #c47070 (muted red)
Active path:    #6bc482 (muted green)

Font - headings: Cormorant Garamond 600
Font - body:     Geist Variable 350
Font - mono:     system monospace
Font size base:  17px
Line height:     1.75
Max prose width: 640px
```

---

## Content Tone

- Direct, founder voice. Not marketing copy.
- Short paragraphs. No filler.
- Honest about failures. "The economics didn't work." "Apps don't care about privacy."
- Lessons are specific, not generic motivational quotes.
- This is a record, not a pitch.

---

## Chapter Structure

Every chapter follows the same repeating pattern:

```
[DATE]
[TITLE]

[What we worked on - 1-2 paragraphs describing the idea/product]

  WHY IT WAS INTERESTING
  [What made this idea compelling at the time]

  WHY WE MOVED ON (only for dead ends)
  [What we learned that caused the pivot]

[ARTIFACT LINKS - repos, demos, screenshots, tweets]
```

---

## Interactions

- Chapters fade in on scroll (IntersectionObserver, translateY + opacity)
- Timeline node dots subtly highlight on hover
- Links use underline with low-opacity color that intensifies on hover
- Fixed nav with blur backdrop
- No animations for the sake of animations

---

## Artifact Types

Each chapter can include small link pills pointing to external artifacts:

| Type       | Label    | Examples                        |
|------------|----------|---------------------------------|
| github     | GH       | Repo links                      |
| demo       | DEMO     | Live demo URLs                  |
| screenshot | IMG      | Screenshots of products built   |
| tweet      | X        | Tweets documenting the journey  |
| link       | LINK     | Blog posts, articles, manifesto |

---

## File Structure (current)

```
src/
  layouts/Base.astro       - Shell: nav, footer, scroll observer
  pages/index.astro        - Main maze page
  pages/manifesto.astro    - Manifesto text
  components/Chapter.astro - Timeline chapter block
  components/Lesson.astro  - "Why it was interesting" / "Why we moved on" callout
  components/Artifact.astro - Link pill to external artifact
  styles/global.css        - All styles (no Tailwind, plain CSS)
public/
  favicon.svg
```
