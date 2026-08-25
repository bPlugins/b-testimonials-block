# Landing Page — Build Notes

Everything that is *about* the landing page but does not go *on* it. The copy
itself is in **LANDING-PAGE.md**; section numbers below refer to that file.

---

## OPEN QUESTIONS — settle these before building

**1. The trust bar has no logos to run (§2).**
The reference page runs five real customer logos under its trust line. This
plugin has none. Either reuse the bPlugins-wide logo strip, or drop the strip and
keep the line alone. Do not invent company logos — on a page selling a
social-proof plugin, fake social proof is the one thing that cannot be explained
away.

**2. The demo link fetches blank (§1 secondary CTA).**
`bblockswp.com/demo/testimonials-all-demos/` returned an empty page. Open it in a
browser. If it really is empty, the hero's secondary CTA points at nothing.

**3. The testimonials section has no testimonials (§9).**
WP.org shows **0 reviews** for this plugin. Either reuse the bPlugins-wide
testimonial set the way the Video Player Block page does, or drop the section
until real ones exist. Do not write placeholder quotes and attribute them to
named people.

**4. The install count moves (§2).**
"200+" was true on 2026-08-25. Re-read it off the plugin page at publish time,
and raise it there before raising it here.

---

## LINK STATUS — checked 2026-08-25

| Link | Status |
|---|---|
| https://wordpress.org/plugins/b-testimonials-block/ | **live** — "B Testimonials Block", 200+ active installs, v1.0.3 |
| https://bblockswp.com/demo/testimonials-all-demos/ | **verify** — fetched blank, see open question 2 |
| https://bplugins.com/products/b-testimonials-block/ | **404** — this is the page being built; publishing it fixes the link |
| https://bplugins.com/docs/b-testimonials-block/ | **404** — not written yet; do not link until it exists |

---

## HOW THE COPY MIRRORS THE REFERENCE

Patterns lifted from https://bplugins.com/products/video-player-block/ so the two
pages read as one family.

**Hero intro.** Sentence one: "[verb] … easily in the Gutenberg editor with a
customizable and responsive **[product]** for WordPress." Sentence two: "Beyond
[the basic thing], it offers [what sets it apart], making it the [superlative]
for [audience]." Reference runs 46 words; ours runs 45.

**Why Choose intro.** An aspirational sentence, then "Traditional [X] often lack
the … needed for modern, [adjective] websites." Reference 27 words, ours 28.

**Feature bodies.** Two sentences, 30–35 words in the reference, 38–42 in ours.

**Overview heading.** "Smarter Video Player That Looks Great and Just Works" →
"Smarter Testimonials That Look Great and Just Work", swapping the product noun.

**Overview cards.** Short noun-phrase title, then one verb-led sentence ending in
a "for …" benefit clause. All 12 of ours verify as verb-led with a benefit
clause, 13–19 words each; the reference runs 12–18.

**Two deliberate departures.**
1. The reference sells a Pro tier, so its CTAs read *Buy Now* and *Get it Now*,
   and six of its eleven cards carry a "(Pro)" tag. This plugin has no paywalled
   feature, so every CTA is a download and no card is tagged.
2. Twelve overview cards rather than eleven, so a 3-column grid fills four even
   rows.

**Not mirrored.** The reference's FAQ is loaded by JavaScript and fetches empty,
so its wording could not be copied. Ours is written from `readme.txt`.

---

## SCOPE NOTE — what is on the page that is not a customer review

The plugin ships four blocks that are social proof but not testimonials:
`client-logos`, `trust-badges`, `before-after`, `user-feedback-poll`. All four
exist in `src/blocks/` and work, so selling them is honest — but they are not
what someone searching for a testimonials plugin came for.

They were spread across two overview cards and a mention in §5. They are now
gathered into **one** card — "Beyond the Written Review" — and the freed slot
went to **Excerpt & Read More**, a genuinely testimonial-specific feature that
the grid had been missing. §5 no longer mentions client logo walls, so that
section stays about rating and trust badges as its heading promises.

The result: 11 of 12 cards are about customer reviews, and the four outliers are
still sold, in one honest place.

---

## SOURCE VERIFICATION — 2026-08-25

Checked against the plugin source and the live WP.org listing.

**Verified true**
- **40 blocks.** 40 directories in `src/blocks/`, 40 in `build/blocks/`, 40
  `block.json` files, and 40 entries across the dashboard's 9 demo groups — all
  four counts agree. `CHILD_BLOCKS_LIST` holds 39 by design: the parent
  `bptmb/b-testimonials` is not a child of itself.
- **All 40 blocks render.** Each was mounted from its own `block.json` defaults
  through the plugin's built `view.js` in a headless browser: 40/40 mounted,
  produced DOM, and had non-zero height. Nothing claimed on the page is a block
  that does not exist or does not draw.
- **Every screenshot filename in the copy resolves** to a real file.
- **The download link is correct.** `wordpress.org/plugins/b-testimonials-block/`
  is this plugin.
- **Free positioning is accurate.** No paywalled feature exists in the source.

**Corrected during the check**
- Trust bar said "1,000+ active users"; WP.org reports 200+ active installs — 5×
  over. Now reads "Trusted by 200+ WordPress sites".
- Product and Docs URLs are 404 and are now marked, not linked.
- Badge filenames were written in a `-trustpilot.png` shorthand that did not
  resolve; they now carry full names.

---

## IMAGE ASSETS

The feature-section images in `.screenshots/landing-features/` were rendered from
the plugin's own built `view.js` in a headless browser at 2× — real block output,
not mockups. The layout collage is composed from ten real layout screenshots.

The badge scores shown (4.9 · 2,847 Reviews and so on) are sample data
demonstrating what the block can display, the same as any product screenshot with
demo content in it. Keep them visibly as block output, and never repeat those
numbers as a claim about this plugin in the page's own copy.

---

## UNRELATED BUGS FOUND WHILE CHECKING

Nothing to do with the landing page — logged here so they are not lost.

**1. The admin dashboard loads another plugin's branding.**
`src/admin/utils/data.js:194` sets `const slug = "b-testimonial"`. That is a
different, unrelated plugin on WP.org — "B Testimonial – Build Trust with
Rotating Customer Stories", 100+ installs, v1.2.4. Lines 264–265 build the
dashboard's logo and banner URLs from it, so the dashboard shows that plugin's
artwork. This plugin's slug is `b-testimonials-block`.

**2. Nine layout blocks log React "unique key" warnings** when they render their
list: `b-testimonials`, `testimonials-grid-2`, `testimonials-grid-3`,
`testimonials-grid-minimal`, `testimonials-list`, `testimonials-compact`,
`testimonials-masonry`, `testimonials-quote-box`, `testimonials-speech-bubble`.
Nothing breaks, and production React suppresses the warning, but without stable
keys React can reuse the wrong DOM node when a list is reordered or filtered.

---

## APPENDIX A — FULL SCREENSHOT INVENTORY

Every file in `.screenshots/`, grouped. The landing page uses five of these
(§10 of the copy file); the rest are for the docs site and the WP.org listing.

Items marked **GIF** have an animated version — use the `.gif` where motion helps
and the `.png` as its poster.

### A.1 — Testimonial Layouts (tabbed gallery)

| # | Label | File |
|---|---|---|
| 1 | Default Cards | `b-testimonials.png` |
| 2 | Testimonials Hero | `testimonials-hero.png` |
| 3 | Centered Cards Grid | `testimonials-grid-2.png` |
| 4 | Gradient Border Grid | `testimonials-grid-3.png` |
| 5 | Minimal Grid | `testimonials-grid-minimal.png` |
| 6 | Testimonials Masonry | `testimonials-masonry.png` |
| 7 | Testimonials List | `testimonials-list.png` |
| 8 | Compact Reviews List | `testimonials-compact.png` |
| 9 | Avatar List | `testimonials-avatar-list.png` |
| 10 | Quote Box | `testimonials-quote-box.png` |
| 11 | Speech Bubble | `testimonials-speech-bubble.png` |
| 12 | Customer Timeline | `testimonials-timeline.png` |
| 13 | Case Study Card | `case-study-card.png` |
| 14 | Popup Modal | `testimonials-popup-modal.png` |
| 15 | Testimonials Slider — **GIF** | `testimonials-slider.gif` / `.png` |
| 16 | 3D Slider — **GIF** | `testimonials-slider-3d.gif` / `.png` |
| 17 | Coverflow Carousel — **GIF** | `testimonials-carousel-2.gif` / `.png` |
| 18 | Card Stack — **GIF** | `testimonials-card-stack.gif` / `.png` |
| 19 | Marquee Ticker — **GIF** | `testimonials-marquee.gif` / `.png` |
| 20 | Floating Avatar Bubble — **GIF** | `testimonials-floating-bubble.gif` / `.png` |

### A.2 — Rating & Trust Badges

| # | Label | File |
|---|---|---|
| 21 | Google Reviews Badge | `google-review-badge.png` |
| 22 | Trustpilot Badge | `trustpilot-review-badge.png` |
| 23 | G2 Badge | `g2-review-badge.png` |
| 24 | Facebook Recommendations Badge | `facebook-review-badge.png` |
| 25 | Capterra Badge | `capterra-review-badge.png` |
| 26 | Verified Buyer Seal | `verified-buyer-badge.png` |
| 27 | Generic Review Badge Widget | `review-badge-widget.png` |
| 28 | Trust Badges | `trust-badges.png` |
| 29 | Client Logos | `client-logos.png` |

### A.3 — Video, Audio & Rich Media

| # | Label | File |
|---|---|---|
| 30 | Video Testimonials | `video-testimonials.png` |
| 31 | Audio Testimonials — **GIF** | `audio-testimonials.gif` / `.png` |
| 32 | Before & After | `before-after.png` |

### A.4 — Stats, Scores & Interactive

| # | Label | File |
|---|---|---|
| 33 | Rating Summary | `rating-summary.png` |
| 34 | Star Rating Bars | `star-rating-bars.png` |
| 35 | Testimonial Stats | `testimonial-stats.png` |
| 36 | Comparison Table | `comparison-testimonial-table.png` |
| 37 | FAQ Review Accordion | `faq-testimonial-accordion.png` |
| 38 | User Feedback Poll | `user-feedback-poll.png` |
| 39 | Social Proof Toast — **GIF** | `social-proof-toast.gif` / `.png` |

### A.5 — Collection & Admin

| # | Label | File |
|---|---|---|
| 40 | Testimonial Form | `testimonial-form.png` |
| 41 | Submissions Dashboard | `submissions-dashboard.png` |
| 42 | NPS Poll Results (admin) | `feedback-nps-poll-admin.png` |

### A.6 — Editor Controls & Settings Panels

| # | Label | File |
|---|---|---|
| 43 | Content & Layout (general) | `controls-general-content-layout.png` |
| 44 | Grid — General 1 | `controls-grid-general-1.png` |
| 45 | Grid — General 2 | `controls-grid-general-2.png` |
| 46 | Grid — Layout (columns & gaps) | `controls-grid-layout.png` |
| 47 | Grid — Elements toggles | `controls-grid-elements.png` |
| 48 | Grid — Card style | `controls-grid-card.png` |
| 49 | Grid — Style 1 | `controls-grid-style-1.png` |
| 50 | Grid — Style 2 | `controls-grid-style-2.png` |
| 51 | Grid — Name typography & colour | `controls-grid-name-typography.png` |
| 52 | Style — Colours & card | `controls-style-colors-card.png` |
| 53 | Style — Width & typography | `controls-style-width-typography.png` |
| 54 | Badge — Width & alignment | `controls-badge-width-alignment.png` |
| 55 | Badge — Logo sizing | `controls-badge-logo.png` |
| 56 | Video — Videos panel | `controls-video-videos.png` |
| 57 | Video — Width & height | `controls-video-width-alignment.png` |

> Cropped variants of the control panels are in `.screenshots/tight/`
> (`grid-card`, `grid-elements`, `grid-layout`, `grid-name`, `badge-logo`,
> `badge-width`, `video-videos`, `video-width`) — better for narrow columns.

### A.7 — How To Use (step-by-step strip)

| # | Step | File |
|---|---|---|
| 58 | Activate the plugin | `howto-0-plugin-active.png` |
| 59 | Pages → Add New | `howto-1-pages-screen.png` |
| 60 | Search "Testimonials" in the inserter | `howto-1-inserter-search.png` |
| 61 | Pick a layout from the placeholder | `howto-2-layout-picker.png` |
| 62 | First layout inserted | `howto-2-first-layout.png` |
| 63 | Browse every layout in the switcher | `howto-3-switcher-modal.png` |
| 64 | Switching replaces the content | `howto-3b-switching-resets-content.png` |
| 65 | Edit your reviews, then Publish | `howto-4-editing.png` |

> Annotated versions of all 8 how-to shots (with callout arrows/numbers) are in
> `.screenshots/marked/` — use those for the tutorial strip.

---

