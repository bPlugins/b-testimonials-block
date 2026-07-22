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

## Phase 1 — Core Layouts (Block 2–6)

একই ডেটা/অ্যাট্রিবিউট শেয়ার করে, শুধু লেআউট আলাদা — তাই দ্রুত।
এই ধাপেই shared component (Themes, RatingIcon, Layout, Style, utils) `src/shared/`-এ উঠবে।

- [ ] `src/shared/` তৈরি + `@shared` alias
- [ ] Block 2: **Slider / Carousel**
- [ ] Block 3: **Masonry**
- [ ] Block 4: **Single Testimonial / Quote**
- [ ] Block 5: **List**
- [ ] Block 6: **Marquee (scrolling wall of love)**

## Phase 2 — CPT + Form ("ফুল সলিউশন"-এর শুরু)

- [ ] `testimonial` Custom Post Type (ratings, author, image, source meta)
- [ ] প্রতি ব্লকে `Manual` / `From CPT` data-source toggle
- [ ] Block 12: **Submission Form** (frontend → CPT, moderation)

## Phase 3 — Media / উৎস (Block 7–11) — বেশিরভাগ Pro

- [ ] Block 7: **Video Testimonials**
- [ ] Block 8: **Google Reviews** (import)
- [ ] Block 9: **Twitter / X Testimonials**
- [ ] Block 10: **Client Logos / Trusted-by**
- [ ] Block 11: **Case Study Card**

## Phase 4 — Interaction + Trust (Block 13–20)

- [ ] Block 13: **Tabs**
- [ ] Block 14: **Accordion**
- [ ] Block 15: **Popup / Modal**
- [ ] Block 16: **Rating Summary** (aggregate stars + count)
- [ ] Block 17: **Stats / Counter**
- [ ] Block 18: **Trust Badges**
- [ ] Block 19: **Before / After**
- [ ] Block 20: **Featured Quote / Comparison**

## Phase 5 — Polish

- [ ] Block Patterns / ready-made templates
- [ ] i18n (pot ফাইলনেম ঠিক করা), অ্যাক্সেসিবিলিটি অডিট
- [ ] ডকুমেন্টেশন, `readme.txt` আপডেট, WP.org সাবমিশন

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
