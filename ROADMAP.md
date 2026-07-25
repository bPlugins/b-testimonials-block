# B Testimonials — Full Solution Roadmap

একটি সিঙ্গেল ব্লক থেকে **সম্পূর্ণ testimonials সলিউশন** (~২০টি সাব-ব্লক) বানানোর পরিকল্পনা।
এক প্লাগিন, ভেতরে অনেক ব্লক (multi-block plugin) — ইউজার শুধু প্রয়োজনীয় ব্লকই ব্যবহার করবে।

---

## মূল সিদ্ধান্ত (Decisions)

- **Architecture:** একটাই প্লাগিন, `src/blocks/<name>/` কাঠামোয় অনেক ব্লক। `build/blocks/*` লুপ করে PHP সব রেজিস্টার করে।
- **Data model:** *দুটোই* সাপোর্ট — প্রতি ব্লকে `Manual` / `From Testimonials (CPT)` toggle। CPT আসবে Phase 2-এ।
- **Block naming:** সব ব্লক `bptmb/...` namespace, category = `bplugins`।
- **Shared code:** `bpl-tools` (sibling plugin) webpack alias দিয়ে import হয় — depth-independent। ব্লকের নিজস্ব shared component `src/shared/`-এ উঠবে (Phase 1 থেকে)।
- **Monetization:** Free (WP.org) core layouts; Pro = import/form/premium ব্লক।

---

## Phase 0 — ভিত্তি (✅ সম্পন্ন)

সিঙ্গেল-ব্লককে multi-block কাঠামোয় রূপান্তর + ভাঙা build টুলচেইন মেরামত।

- [x] `package.json` ঠিক করা: `immer` অবৈধ ভার্সন, `@wordpress/scripts` যোগ, পুরনো বিরোধপূর্ণ deps সরানো
- [x] `swiper` 9 → 11 (`exports` map ঠিক থাকা ভার্সন; React/modules API অভিন্ন)
- [x] ব্লক সরানো → `src/blocks/testimonials/`
- [x] `bpl-tools` webpack alias + imports depth-independent
- [x] PHP: `build/blocks/*` লুপে সব ব্লক রেজিস্টার + `bplugins` block category
- [x] Build সবুজ, verify সম্পন্ন (ব্লকের name/কনটেন্ট অক্ষত)

**বাকি cleanup (blocker নয়):** `package.json` i18n স্ক্রিপ্টে ভুল pot ফাইলনেম (`smart-modal.pot`)।

---

## Phase 1 — Core Layouts (Block 2–6) — ✅ সম্পন্ন

একই ডেটা/অ্যাট্রিবিউট শেয়ার করে, শুধু লেআউট আলাদা।
এই ধাপেই shared component (Themes, RatingIcon, Layout, Style, utils) `src/shared/`-এ উঠেছে।

- [x] `src/shared/` তৈরি + `@shared` alias; shared Edit / view / styles
- [x] shared CSS একটা common `.bTestimonials` class-এ rescope
- [x] Block 2: **Slider / Carousel** (`bptmb/testimonials-slider`)
- [x] Block 3: **Masonry** (`bptmb/testimonials-masonry`)
- [x] Block 4: **Single Testimonial / Quote** (`bptmb/testimonials-single`)
- [x] Block 5: **List** (`bptmb/testimonials-list`) — নতুন `list` layout
- [x] Block 6: **Marquee** (`bptmb/testimonials-marquee`) — নতুন `marquee` layout (auto-scroll, hover-pause, এডিটরে static)

## Phase 2 — CPT + Form ("ফুল সলিউশন"-এর শুরু) — ✅ সম্পন্ন

- [x] `testimonial` Custom Post Type ([includes/cpt.php](includes/cpt.php)): title=নাম, content=রিভিউ, featured image=ছবি, meta = rating / designation / company; classic editor + admin columns; REST-enabled
- [x] প্রতি ব্লকে `Manual` / `Testimonials (CPT)` data-source toggle + query (number / orderBy / order)
- [x] Frontend: `render.php` CPT থেকে items resolve করে (`bpbtb_prepare_block_items`)
- [x] Editor: CPT হলে REST (`/wp/v2/testimonial?_embed`) থেকে fetch করে read-only preview
- [x] **Phase 2b** — Block 7: **Testimonial Form** (`bptmb/testimonial-form`) → REST `bptmb/v1/submit` ([includes/form.php](includes/form.php)); nonce, sanitization, `pending` status (moderation), guarded image upload (image mime শুধু, ডিফল্ট off)

## Phase 3 — Media / উৎস — 🚧 চলমান

- [x] **Client Logos** (`bptmb/client-logos`) — trusted-by grid, grayscale hover, static render (JS লজিক নেই)
- [x] **Video Testimonials** (`bptmb/video-testimonials`) — click-to-play YouTube/Vimeo/MP4; YouTube poster fallback; keyboard-accessible
- [ ] **Case Study Card** — manual, self-contained (পরের ধাপে)
- [ ] **Google Reviews** (import) — external API + API key দরকার → **Pro / Phase 3b**
- [ ] **Twitter / X Testimonials** — external API দরকার → **Pro / Phase 3b**

## Phase 4 — Interaction + Trust — 🚧 চলমান

**Trust cluster (✅ সম্পন্ন):**
- [x] **Rating Summary** (`bptmb/rating-summary`) — aggregate fractional stars + count, static
- [x] **Testimonial Stats** (`bptmb/testimonial-stats`) — count-up counters (IntersectionObserver)
- [x] **Trust Badges** (`bptmb/trust-badges`) — icon + title + subtitle grid
- [x] **Before / After** (`bptmb/before-after`) — draggable image comparison (clip-path, touch + keyboard)

**Interaction wrappers (Phase 4b — testimonial collection মোড়ায়, `TestimonialsView` + Manual/CPT reuse করবে):**
- [ ] **Tabs**
- [ ] **Accordion**
- [ ] **Popup / Modal**
- [ ] **Featured Quote / Comparison**

## Phase 5 — SEO, Filtering & E-commerce Boosters — 📋 পরিকল্পনা
- [ ] **Schema.org Structured Data (JSON-LD)** — AggregateRating & Review schema generation for Google Rich Snippets
- [ ] **Dynamic Category Filter & Live Search** — Category tabs & keyword filter bar for Testimonials Grid/Slider
- [ ] **WooCommerce Product Reviews Sync** — Display Woo product reviews inside testimonials blocks dynamically
- [ ] **In-Testimonial CTA Buttons** — Call-to-action link buttons inside testimonial cards (e.g., "View Case Study", "Buy Now")
- [ ] **CSV / JSON Export & Import Tool** — WP Admin import/export manager for testimonials CPT

## Phase 6 — Social Proof Sync & Automation — 📋 পরিকল্পনা
- [ ] **Google Places / Maps API Importer** — Auto-sync Google Reviews with CRON & caching
- [ ] **Live Social Proof Toast (FOMO Popup)** — Floating real-time testimonial notifications on screen corners
- [ ] **Slack / Discord & Email Webhooks** — Real-time notification when a new testimonial is submitted
- [ ] **QR Code Testimonial Generator** — Generate QR code in Admin for instant mobile testimonial collection

## Phase 7 — AI & Advanced Media Features — 📋 পরিকল্পনা
- [ ] **In-Form Video & Voice Recorder** — Record video/audio directly from browser webcam/mic in submission form
- [ ] **AI Review Summarizer & Sentiment Analysis** — Auto-generate 1-sentence takeaways & auto-approve positive 5-star reviews
- [ ] **Floating Review Collector Widget** — Corner floating tab opening a testimonial reader & review submission modal
- [ ] **Analytics & Conversion Dashboard** — Track testimonial impressions, CTA clicks, and video play rates

## Phase 8 — Polish & WP.org Submission — 📋 পরিকল্পনা
- [ ] 20+ Gutenberg Block Patterns (Wall of Love, Hero Testimonials, E-commerce Social Proof)
- [ ] i18n pot build script fix & accessibility (a11y) audit for keyboard navigation
- [ ] Documentation, `readme.txt` update & WP.org submission

---

## Free vs Pro

| Free (WP.org) | Pro |
|---|---|
| Grid, Slider, Masonry, Single, List, Rating Summary | Video, Google/Twitter import, Form+CPT, Popup, Before/After, premium patterns |

---

## নতুন ব্লক যোগের রেসিপি (Phase 0-এর পর)

```
src/blocks/<new-block>/
├── block.json     # name: "bptmb/<new-block>", category: "bplugins"
├── index.js       # registerBlockType(metadata, { edit, icon })
├── edit.js
├── render.php
├── view.js        # (dynamic/interactive হলে)
├── editor.scss
└── style.scss
```

- shared কোড: `import ... from '@shared/...'` (Phase 1-এ alias যোগ হবে) বা `'bpl-tools/...'`
- `npm run build` → আউটপুট `build/blocks/<new-block>/`; PHP লুপ স্বয়ংক্রিয়ভাবে রেজিস্টার করে — আলাদা কোনো PHP লাগে না।
