=== Testimonials – Customer Reviews, Ratings, Badges & Video Testimonials ===
Contributors: bplugins, abuhayat, btechnologies, himur98
Donate link: https://www.buymeacoffee.com/abuhayat
Tags: testimonials, review, rating, block, Gutenberg block
Requires at least: 6.5
Tested up to: 7.0
Stable tag: 1.0.3
Requires PHP: 7.2
License: GPLv3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html

Boost website credibility and social proof with Testimonials, showcasing customer ratings, reviews, video testimonials, and badges.

== Description ==

**Create stunning customer review showcases, rating summary widgets, video testimonials, social proof toasts, and feedback forms with 40+ modern layouts directly in the WordPress Gutenberg block editor.**

[bplugins](https://bplugins.com/products/b-testimonials-block/) | [Documentation](https://bplugins.com/docs/b-testimonials-block/) | [Support](https://bplugins.com/support/) | [Demo](https://bplugins.com/products/b-testimonials-block/#demos)

Testimonials Block makes it easy to build high-converting testimonial sections without writing a single line of code. Choose from 40+ modern child block layouts including Grids, Sliders, Carousels, Continuous Marquees, Speech Bubbles, Timelines, Card Stacks, Floating Avatars, and Official Social Badges (Google, Trustpilot, G2, Facebook, Capterra).

You can manage your testimonials centrally using the built-in **Testimonials Custom Post Type (CPT)** or input review items manually right on the page canvas. Collect feedback directly from site visitors with the **Testimonial Form** block and manage customer submissions in your WordPress Admin Submissions dashboard.

=== Key Features – Free Version ===
- **40+ Modern Block Layouts & Widgets**: Choose from standard grids, responsive sliders, masonry columns, avatar lists, stacked cards, speech bubbles, customer timelines, case studies, quote boxes, and continuous marquee tickers.
- **Social Proof & Rating Badges**: Display official style review score badges for Google Business, Trustpilot, G2, Facebook Recommendations, Capterra, and Verified Buyer seals.
- **Video & Audio Testimonials**: Share video reviews with popup lightbox playback (YouTube, Vimeo, MP4) and audio voice note players with waveform styling.
- **Customer Submissions Dashboard**: Collect customer reviews via the Testimonial Form block and manage pending submissions (`Testimonials → Submissions`) to approve, reject, or delete feedback before publishing.
- **Testimonials Custom Post Type (CPT)**: Centrally manage testimonials under the `Testimonials` menu and reuse them dynamically across any block layout.
- **Interactive Feedback & NPS Polls**: Engage visitors with Net Promoter Score (NPS) polls, side-by-side comparison tables, and FAQ review accordions.
- **Responsive Device Controls**: Adjust columns, column gaps, and row gaps independently for Desktop, Tablet, and Mobile devices.
- **Card Design Customization**: Customize card background color, box shadow, padding, border style, width, color, and border-radius.
- **Image & Avatar Controls**: Adjust photo width, height, circular or rounded border styling, and upload custom avatar thumbnails.
- **Full Typography & Color Controls**: Comprehensive font family, size, line-height, font-weight, and color settings for reviewer name, designation, review text, and star rating icons.
- **Excerpt & Read More Control**: Set custom review text excerpt length limiters with expandable Read More / Show Less buttons.

=== How to Use Testimonials Block – Quick Start Guide ===

Getting started is quick and easy!

=== Step-by-Step Setup ===
1. Go to **Plugins → Add New** in your WordPress admin dashboard.
2. Search for **B Testimonials Block**.
3. Click **Install Now** and activate the plugin.
4. Open any page or post in the Block Editor (Gutenberg).
5. Click the **+** button or type `/b testimonials` to insert the main container block or any of the 40+ child blocks.
6. Use the Block Switcher modal popup or right sidebar settings to customize your layout, colors, and content source.
7. Click **Publish** to make your testimonials live!

== Installation ==

= From WordPress Admin: =
1. Navigate to **Plugins → Add New**.
2. Search for **B Testimonials Block**.
3. Click **Install Now** and then **Activate**.

= Manual Zip Upload: =
1. Download the `b-testimonials-block.zip` file.
2. In your WordPress admin, go to **Plugins → Add New → Upload Plugin**.
3. Choose the `.zip` file and click **Install Now**.
4. Activate the plugin through the Plugins menu.

== Frequently Asked Questions ==

= Is Testimonials free to use? =
Yes! Testimonials is a free Gutenberg block plugin packed with 40+ layouts, trust badges, CPT integration, and admin submission management.

= Does it work with any WordPress theme? =
Yes, Testimonials is fully responsive and compatible with all standard WordPress themes and block-based site editors.

= Can I collect testimonials from website visitors? =
Yes! You can insert the **Testimonial Form** block on any page. Submissions are saved as `pending` under **Testimonials → Submissions** for admin review and approval.

= Can I use Testimonials CPT across multiple pages? =
Yes. Create your testimonials once under **Testimonials → Add New**, then set the **Content Source** in any block settings to **Testimonials CPT** to automatically display them.

= Where can I get support? =
You can post your questions on the [WordPress.org support forum](https://wordpress.org/support/plugin/b-testimonials-block/) or visit [bPlugins Support](https://bplugins.com/support/).

== Changelog ==

= 1.0.3 – Major Feature Expansion & Security Hardening =
* **New:** Expanded from a single Testimonials block to **40+ modern child block layouts** — including Grids, Sliders, Carousels, Masonry, Marquee Tickers, Speech Bubbles, Timelines, Card Stacks, Floating Avatars, Hero Layouts, Quote Boxes, Popup Modals, Video & Audio Testimonials, and more.
* **New:** Added official-style **Social Proof & Rating Badge** blocks for Google, Trustpilot, G2, Facebook, Capterra, and Verified Buyer seals.
* **New:** Added **Client Logos** grid block to showcase trusted-by brand logos with grayscale hover effects.
* **New:** Added interactive **Before / After** image comparison slider block.
* **New:** Added **Testimonial Form** block for collecting customer reviews directly from the frontend.
* **New:** Added **Customer Submissions Dashboard** (`Testimonials → Submissions`) with approve, reject, and bulk action workflow.
* **New:** Added **Feedback & NPS Poll** admin dashboard for tracking Net Promoter Score responses.
* **New:** Added modern React-based **Demo & Help** admin page under Testimonials menu with first-activation redirect.
* **New:** Added **Block Switcher** — switch between any child block layout instantly from the sidebar without losing content.
* **New:** Added **Star Rating Bars**, **Rating Summary**, **Comparison Table**, **Case Study Card**, **FAQ Accordion**, **Social Proof Toast**, and **Testimonial Stats** blocks.
* **New:** Introduced **Testimonials Custom Post Type (CPT)** for centralized testimonial management with dynamic block sourcing.
* **Improvement:** Full responsive device controls — columns, column gap, and row gap adjustable independently for Desktop, Tablet, and Mobile.
* **Improvement:** Complete card design customization — background, box-shadow, padding, border, and border-radius.
* **Improvement:** Full typography and color controls for reviewer name, designation, review text, and rating icons.
* **Improvement:** Excerpt length control with expandable Read More / Show Less buttons.
* **Fix:** Hardened plugin security — added proper output escaping (`wp_kses_post`), input sanitization (`wp_unslash`, `sanitize_text_field`), and nonce verification across all admin pages and REST API endpoints.
* **Fix:** Resolved WordPress Plugin Check (PCP) compliance — fixed all errors and warnings for internationalization, variable prefixing, and escape output standards.
* **Fix:** Ensured 100% backward compatibility — existing legacy blocks and user data are seamlessly preserved after update.
* **Fix:** Corrected CSS selector scoping in dynamic styles to prevent leaking into parent containers.

= 1.0.0 =
* Initial public release with a single Testimonials block.