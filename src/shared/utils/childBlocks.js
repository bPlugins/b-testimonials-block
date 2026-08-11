import { __ } from "@wordpress/i18n";

/**
 * Every child block the switcher can insert, with the icon key each one uses.
 *
 * Data only -- kept out of BlockSwitcherModal so that utils/icons can derive
 * per-block inserter icons from it without importing a React component.
 */
export const CHILD_BLOCKS_LIST = [
  // Original 12 Blocks
  {
    name: "bptmb/testimonials-slider",
    title: __("Testimonials Slider", "b-testimonials-block"),
    category: "layouts",
    icon: "slides",
    desc: __(
      "Interactive carousel slider with navigation dots.",
      "b-testimonials-block",
    ),
    badge: __("Slider", "b-testimonials-block"),
  },
  {
    name: "bptmb/testimonials-list",
    title: __("Testimonials List", "b-testimonials-block"),
    category: "layouts",
    icon: "editor-ul",
    desc: __(
      "Clean, vertical list representation of reviews.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/testimonials-masonry",
    title: __("Testimonials Masonry", "b-testimonials-block"),
    category: "layouts",
    icon: "dashboard",
    desc: __(
      "Staggered grid layout for variable height cards.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/testimonials-marquee",
    title: __("Testimonials Marquee", "b-testimonials-block"),
    category: "layouts",
    icon: "marquee-scroll",
    desc: __(
      "Smooth infinite ticker tape / scrolling reviews.",
      "b-testimonials-block",
    ),
    badge: __("New", "b-testimonials-block"),
  },
  {
    name: "bptmb/rating-summary",
    title: __("Rating Summary", "b-testimonials-block"),
    category: "social",
    icon: "star-filled",
    desc: __(
      "Overall score & star rating distribution summary.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/testimonial-stats",
    title: __("Testimonial Stats", "b-testimonials-block"),
    category: "social",
    icon: "chart-bar",
    desc: __(
      "Key statistics, satisfaction percentages & counters.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/trust-badges",
    title: __("Trust Badges", "b-testimonials-block"),
    category: "social",
    icon: "shield",
    desc: __("Security, guarantee, and award badges.", "b-testimonials-block"),
  },
  {
    name: "bptmb/client-logos",
    title: __("Client Logos", "b-testimonials-block"),
    category: "social",
    icon: "groups",
    desc: __(
      "Showcase brand and client logos in grid or carousel.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/video-testimonials",
    title: __("Video Testimonials", "b-testimonials-block"),
    category: "media",
    icon: "video-alt3",
    desc: __(
      "Video reviews with lightbox popup playback.",
      "b-testimonials-block",
    ),
    badge: __("Video", "b-testimonials-block"),
  },
  {
    name: "bptmb/before-after",
    title: __("Before & After", "b-testimonials-block"),
    category: "media",
    icon: "image-flip-horizontal",
    desc: __(
      "Comparison showcase for results & transformation.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/testimonial-form",
    title: __("Testimonial Form", "b-testimonials-block"),
    category: "interactive",
    icon: "feedback",
    desc: __(
      "Frontend form for collecting customer reviews.",
      "b-testimonials-block",
    ),
  },

  // 20 New Blocks
  {
    name: "bptmb/testimonials-grid-2",
    title: __("Centered Cards Grid", "b-testimonials-block"),
    category: "layouts",
    icon: "grid-centered",
    desc: __(
      "Sleek centered profile and testimonial card grid.",
      "b-testimonials-block",
    ),
    badge: __("Popular", "b-testimonials-block"),
  },
  {
    name: "bptmb/testimonials-grid-3",
    title: __("Gradient Border Grid", "b-testimonials-block"),
    category: "layouts",
    icon: "grid-gradient",
    desc: __(
      "Modern gradient border cards with star badges.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/testimonials-carousel-2",
    title: __("Coverflow Carousel", "b-testimonials-block"),
    category: "layouts",
    icon: "columns",
    desc: __(
      "Center-focused 3D coverflow carousel slider.",
      "b-testimonials-block",
    ),
    badge: __("3D", "b-testimonials-block"),
  },
  {
    name: "bptmb/testimonials-compact",
    title: __("Compact Reviews List", "b-testimonials-block"),
    category: "layouts",
    icon: "excerpt-view",
    desc: __(
      "Space-saving minimal customer testimonial list.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/testimonials-avatar-list",
    title: __("Avatar Reviews List", "b-testimonials-block"),
    category: "layouts",
    icon: "avatar-list",
    desc: __(
      "Prominent avatar & customer spotlight review rows.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/testimonials-quote-box",
    title: __("Quote Box Showcase", "b-testimonials-block"),
    category: "layouts",
    icon: "format-quote",
    desc: __(
      "Bold quote mark styling with accent backgrounds.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/testimonials-speech-bubble",
    title: __("Speech Bubble Cards", "b-testimonials-block"),
    category: "layouts",
    icon: "format-chat",
    desc: __("Chat bubble style testimonial cards.", "b-testimonials-block"),
    badge: __("Popular", "b-testimonials-block"),
  },
  {
    name: "bptmb/testimonials-timeline",
    title: __("Customer Journey Timeline", "b-testimonials-block"),
    category: "layouts",
    icon: "list-view",
    desc: __(
      "Vertical timeline of customer success stories.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/testimonials-card-stack",
    title: __("Stacked Review Cards", "b-testimonials-block"),
    category: "layouts",
    icon: "index-card",
    desc: __("Overlapping stacked review card deck.", "b-testimonials-block"),
  },
  {
    name: "bptmb/case-study-card",
    title: __("Customer Case Study", "b-testimonials-block"),
    category: "layouts",
    icon: "welcome-learn-more",
    desc: __(
      "Detailed case study card with metrics & quote.",
      "b-testimonials-block",
    ),
    badge: __("Popular", "b-testimonials-block"),
  },
  {
    name: "bptmb/google-review-badge",
    title: __("Google Reviews Badge", "b-testimonials-block"),
    category: "social",
    icon: "google",
    desc: __(
      "Official style Google Business score badge.",
      "b-testimonials-block",
    ),
    badge: __("Badge", "b-testimonials-block"),
  },
  {
    name: "bptmb/trustpilot-review-badge",
    title: __("Trustpilot Score Badge", "b-testimonials-block"),
    category: "social",
    icon: "trustpilot",
    desc: __(
      "Trustpilot style rating & review summary badge.",
      "b-testimonials-block",
    ),
    badge: __("Badge", "b-testimonials-block"),
  },
  {
    name: "bptmb/g2-review-badge",
    title: __("G2 Review Badge", "b-testimonials-block"),
    category: "social",
    icon: "awards",
    desc: __(
      "G2 / Capterra software review score badge.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/review-badge-widget",
    title: __("Floating Review Badge", "b-testimonials-block"),
    category: "social",
    icon: "sticky",
    desc: __(
      "Corner / floating trust review badge widget.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/star-rating-bars",
    title: __("Star Rating Progress Bars", "b-testimonials-block"),
    category: "social",
    icon: "progress-bars",
    desc: __(
      "5-star rating breakdown bars & percentage stats.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/social-proof-toast",
    title: __("Social Proof Toast", "b-testimonials-block"),
    category: "social",
    icon: "testimonial",
    desc: __(
      "Live social proof popup notification toast.",
      "b-testimonials-block",
    ),
    badge: __("New", "b-testimonials-block"),
  },
  {
    name: "bptmb/audio-testimonials",
    title: __("Audio Testimonials", "b-testimonials-block"),
    category: "media",
    icon: "controls-play",
    desc: __(
      "Voice note & audio review player with wave style.",
      "b-testimonials-block",
    ),
    badge: __("Audio", "b-testimonials-block"),
  },
  {
    name: "bptmb/user-feedback-poll",
    title: __("Feedback & NPS Poll", "b-testimonials-block"),
    category: "interactive",
    icon: "chart-pie",
    desc: __(
      "Quick Net Promoter Score (NPS) feedback poll.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/comparison-testimonial-table",
    title: __("Comparison Review Table", "b-testimonials-block"),
    category: "interactive",
    icon: "table-col-after",
    desc: __("Side-by-side customer comparison table.", "b-testimonials-block"),
  },
  {
    name: "bptmb/faq-testimonial-accordion",
    title: __("FAQ Review Accordion", "b-testimonials-block"),
    category: "interactive",
    icon: "arrow-down-alt2",
    desc: __(
      "Collapsible FAQ & customer feedback accordion.",
      "b-testimonials-block",
    ),
  },

  // 8 New Blocks (40 Total)
  {
    name: "bptmb/testimonials-hero",
    title: __("Hero Testimonial Spotlight", "b-testimonials-block"),
    category: "layouts",
    icon: "superhero",
    desc: __(
      "High-impact hero banner with quote & CTA.",
      "b-testimonials-block",
    ),
    badge: __("Hero", "b-testimonials-block"),
  },
  {
    name: "bptmb/testimonials-grid-minimal",
    title: __("Minimalist Reviews Grid", "b-testimonials-block"),
    category: "layouts",
    icon: "layout",
    desc: __(
      "Clean monochrome review cards with subtle hover elevation.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/testimonials-slider-3d",
    title: __("3D Flip Perspective Carousel", "b-testimonials-block"),
    category: "layouts",
    icon: "update",
    desc: __(
      "Interactive 3D perspective flip card carousel slider.",
      "b-testimonials-block",
    ),
    badge: __("3D", "b-testimonials-block"),
  },
  {
    name: "bptmb/testimonials-floating-bubble",
    title: __("Floating Avatar Bubbles", "b-testimonials-block"),
    category: "social",
    icon: "bubbles",
    desc: __(
      "Interactive floating customer avatar bubbles with popup tooltips.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/facebook-review-badge",
    title: __("Facebook Recommendation Badge", "b-testimonials-block"),
    category: "social",
    icon: "facebook",
    desc: __(
      "Official style Facebook page recommendation & rating summary badge.",
      "b-testimonials-block",
    ),
    badge: __("Badge", "b-testimonials-block"),
  },
  {
    name: "bptmb/capterra-review-badge",
    title: __("Capterra Score Badge", "b-testimonials-block"),
    category: "social",
    icon: "capterra",
    desc: __(
      "Software review rating summary badge styled like Capterra.",
      "b-testimonials-block",
    ),
    badge: __("Badge", "b-testimonials-block"),
  },
  {
    name: "bptmb/verified-buyer-badge",
    title: __("Verified Buyer Trust Seal", "b-testimonials-block"),
    category: "social",
    icon: "verified-seal",
    desc: __(
      "E-commerce verified purchase seal & satisfaction guarantee widget.",
      "b-testimonials-block",
    ),
  },
  {
    name: "bptmb/testimonials-popup-modal",
    title: __("Popup Modal Review Trigger", "b-testimonials-block"),
    category: "interactive",
    icon: "external",
    desc: __(
      "Clickable badge/button that opens a full review popup modal.",
      "b-testimonials-block",
    ),
    badge: __("New", "b-testimonials-block"),
  },
];
