import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Default from "../Themes/Default";
import ThemeOne from "../Themes/ThemeOne";
import ThemeTwo from "../Themes/ThemeTwo";
import ThemeThree from "../Themes/ThemeThree";
import ThemeFour from "../Themes/ThemeFour";
import ThemeFive from "../Themes/ThemeFive";
import ThemeSix from "../Themes/ThemeSix";
import Slider from "./Slider";
import Marquee from "./Marquee";
import BeforeAfterSlider from "../BeforeAfterSlider";
import TestimonialForm from "../TestimonialForm";

import { clickable, editorClickable } from "../../../utils/a11y";
import { BRAND_COLOR } from "../../../utils/icons";
import BlockIcon from "../BlockIcon";
import VideoCard from "../VideoCard";
import AudioPlayer from "../AudioPlayer";
import { getIcon } from "../../../utils/blockIcons";
import { ARRANGEMENTS, resolveArrangement } from "../../../utils/layoutFeatures";

const SocialProofToast = ({ items = [], bt, bd, isBackend, activeIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isBackend || items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isBackend, items.length]);

  const activeItemIndex = isBackend
    ? activeIndex < items.length
      ? activeIndex
      : 0
    : currentIndex;
  const currentItem = items[activeItemIndex] || {};

  return (
    <div className="btb-toast-wrapper">
      <div className="btb-toast-card" key={activeItemIndex}>
        <div className="btb-toast-avatar">
          <img
            src={
              currentItem.img?.url ||
              "https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png"
            }
            alt={currentItem.name || ""}
          />
        </div>
        <div className="btb-toast-body">
          <p className="btb-toast-text">
            {currentItem.reviewText ||
              bt ||
              "Someone just left a 5-star review!"}
          </p>
          <span className="btb-toast-meta">
            {currentItem.name || "John Doe"} — {bd || "Just now"}
          </span>
        </div>
      </div>
    </div>
  );
};

const Layout = ({
  itemsEls = [],
  ToolbarButton,
  MediaUpload,
  MediaUploadCheck,
  attributes = {},
  setActiveIndex,
  activeIndex = 0,
  updateItem,
  isBackend = false,
  previewDevice = "Desktop",
  __,
  RichText,
  SandBox,
}) => {
  const {
    items = [],
    columnGap = "30px",
    rowGap = "40px",
    layout = "default",
    theme = "default",
    columns = { desktop: 3, tablet: 2, mobile: 1 },
  } = attributes || {};
  const {
    desktop = 3,
    tablet = 2,
    mobile = 1,
  } = columns && typeof columns === "object"
    ? columns
    : { desktop: 3, tablet: 2, mobile: 1 };

  // The column count to render at the "base" size.
  //
  // On the front end that is always the desktop value, with the media queries
  // taking over at narrower widths. In the editor it has to follow the device
  // buttons directly, because those only produce a real viewport when the
  // canvas is iframed -- and WordPress iframes it only when every registered
  // block is apiVersion 3. A single v2 block from any other active plugin
  // disables iframing for the whole editor, and then @media keeps measuring the
  // browser window, so the tablet and mobile rules never fire no matter which
  // device is selected. Resolving the count here works either way: when the
  // canvas *is* iframed the media queries agree with this value.
  const previewCols =
    isBackend && "Tablet" === previewDevice
      ? tablet
      : isBackend && "Mobile" === previewDevice
        ? mobile
        : desktop;

  const arrangement = resolveArrangement(attributes);

  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(0);
  const [cardStackIdx, setCardStackIdx] = useState(0);
  const [activeModalItem, setActiveModalItem] = useState(null);
  const itemProps = {
    attributes,
    setActiveIndex,
    activeIndex,
    updateItem,
    isBackend,
    __,
    RichText,
    MediaUpload,
    MediaUploadCheck,
    ToolbarButton,
  };

  // Dynamic badge attributes (from block.json / sidebar settings)
  const bt = attributes.badgeTitle || "";
  const bd = attributes.badgeDesc || "";
  const bs = attributes.badgeScore || "";
  const bc = attributes.badgeCount || "";

  // === Theme selector (shared by all testimonial-items layouts) ===
  const themeSelect = (item, index) => {
    const itemProp = {
      item: item || {},
      index,
      itemEls: itemsEls?.[index] || {},
      ...itemProps,
    };
    switch (theme) {
      case "theme_1":
        return <ThemeOne {...itemProp} />;
      case "theme_2":
        return <ThemeTwo {...itemProp} />;
      case "theme_3":
        return <ThemeThree {...itemProp} />;
      case "theme_4":
        return <ThemeFour {...itemProp} />;
      case "theme_5":
        return <ThemeFive {...itemProp} />;
      case "theme_6":
        return <ThemeSix {...itemProp} />;
      default:
        return <Default {...itemProp} />;
    }
  };

  // ================================================================
  //  CATEGORY D: Badge / Score Widgets (fully custom JSX, dynamic)
  // ================================================================

  // Helper to calculate dynamic rating stats from items array
  const computedStats = (() => {
    const total = Array.isArray(items) ? items.length : 0;
    if (total === 0) {
      return {
        total: 0,
        avg: "5.0",
        countText: "",
        counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };
    }
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;
    items.forEach((it) => {
      const rawVal = Number(it?.rating ?? 5);
      const r = Math.min(5, Math.max(1, isNaN(rawVal) ? 5 : rawVal));
      const rounded = Math.round(r);
      counts[rounded] = (counts[rounded] || 0) + 1;
      sum += r;
    });
    const avg = (sum / total).toFixed(1);
    return {
      total,
      avg,
      countText: `Based on ${total} reviews`,
      counts,
    };
  })();

  if (layout === "google-review-badge") {
    const score = bs || (computedStats.total > 0 ? computedStats.avg : "4.9");
    const count =
      bc ||
      (computedStats.total > 0
        ? `(${computedStats.total}+ Reviews)`
        : "(128+ Reviews)");
    return (
      <div className="btb-badge-card btb-google-badge">
        <div className="btb-badge-header">
          <svg
            className="btb-badge-brand-logo"
            viewBox="0 0 24 24"
            width="36"
            height="36">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <div className="btb-badge-info">
            <h4 className="btb-badge-title">{bt || "Google Reviews"}</h4>
            <div className="btb-badge-rating">
              <span className="score">{score}</span>
              <span className="stars">★★★★★</span>
              <span className="count">{count}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "capterra-review-badge") {
    const score = bs || (computedStats.total > 0 ? computedStats.avg : "4.8");
    const count =
      bc ||
      (computedStats.total > 0
        ? `(${computedStats.total} Reviews)`
        : "Verified Software Reviews");
    return (
      <div className="btb-badge-card btb-capterra-badge">
        <div className="btb-badge-header">
          <svg
            className="btb-badge-brand-logo"
            viewBox="0 0 24 24"
            width="36"
            height="36">
            <path fill="#FF9D28" d="M2 2h9v9H2z" />
            <path fill="#68C5ED" d="M13 2h9v9h-9z" />
            <path fill="#044D80" d="M2 13h9v9H2z" />
            <path fill="#E54747" d="M13 13h9v9h-9z" />
          </svg>
          <div className="btb-badge-info">
            <h4 className="btb-badge-title">{bt || "Capterra Rating"}</h4>
            <div className="btb-badge-rating">
              <span className="score">{score}</span>
              <span className="stars">★★★★★</span>
              <span className="count">{count}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "facebook-review-badge") {
    const score = bs || (computedStats.total > 0 ? computedStats.avg : "5.0");
    const count =
      bc ||
      (computedStats.total > 0
        ? `Recommended by ${computedStats.total} Customers`
        : "Recommended by 250+ Customers");
    return (
      <div className="btb-badge-card btb-facebook-badge">
        <div className="btb-badge-header">
          <svg
            className="btb-badge-brand-logo"
            viewBox="0 0 24 24"
            width="36"
            height="36">
            <path
              fill="#1877F2"
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
          </svg>
          <div className="btb-badge-info">
            <h4 className="btb-badge-title">{bt || "Facebook Reviews"}</h4>
            <div className="btb-badge-rating">
              <span className="score">{score}</span>
              <span className="stars">★★★★★</span>
              <span className="count">{count}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "trustpilot-review-badge") {
    const score =
      bs || (computedStats.total > 0 ? `${computedStats.avg} / 5` : "4.9 / 5");
    const count =
      bc ||
      (computedStats.total > 0
        ? `TrustScore | ${computedStats.total} Reviews`
        : "TrustScore | 500+ Reviews");
    return (
      <div className="btb-badge-card btb-trustpilot-badge">
        <div className="btb-badge-header">
          <svg
            className="btb-badge-brand-logo"
            viewBox="0 0 24 24"
            width="36"
            height="36">
            <path
              fill="#00B67A"
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
          </svg>
          <div className="btb-badge-info">
            <h4 className="btb-badge-title">{bt || "Trustpilot Score"}</h4>
            <div className="btb-badge-rating">
              <span className="score">{score}</span>
              <span className="stars">★★★★★</span>
              <span className="count">{count}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "g2-review-badge") {
    const score =
      bs || (computedStats.total > 0 ? `${computedStats.avg} / 5` : "4.8 / 5");
    const count = bc || "Leader Category 2026";
    return (
      <div className="btb-badge-card btb-g2-badge">
        <div className="btb-badge-header">
          <svg
            className="btb-badge-brand-logo"
            viewBox="0 0 24 24"
            width="36"
            height="36">
            <circle cx="12" cy="12" r="11" fill="#FF492C" />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fill="#fff"
              fontSize="12"
              fontWeight="bold">
              G2
            </text>
          </svg>
          <div className="btb-badge-info">
            <h4 className="btb-badge-title">{bt || "G2 High Performer"}</h4>
            <div className="btb-badge-rating">
              <span className="score">{score}</span>
              <span className="stars">★★★★★</span>
              <span className="count">{count}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "verified-buyer-badge") {
    return (
      <div className="btb-badge-card btb-verified-badge">
        <div className="btb-badge-header">
          <BlockIcon
            icon={getIcon(attributes, "badge")}
            size={36}
            className="btb-badge-brand-logo"
            renderFallback={(color) => (
              <svg
                className="btb-badge-brand-logo"
                viewBox="0 0 24 24"
                width="36"
                height="36">
                <path
                  fill={color}
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"
                />
              </svg>
            )}
          />
          <div className="btb-badge-info">
            <h4 className="btb-badge-title">{bt || "100% Verified Reviews"}</h4>
            <p className="btb-badge-desc">
              {bd || "All customer testimonials are authenticated & verified."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "review-badge-widget") {
    const score = bs || (computedStats.total > 0 ? computedStats.avg : "4.9");
    const count =
      bc ||
      (computedStats.total > 0
        ? `Based on ${computedStats.total} reviews`
        : "Based on 320+ reviews");
    return (
      <div className="btb-badge-card btb-review-widget">
        <div className="btb-badge-header">
          <BlockIcon
            icon={getIcon(attributes, "badge")}
            size={36}
            className="btb-badge-brand-logo"
            renderFallback={(color) => (
              <svg
                className="btb-badge-brand-logo"
                viewBox="0 0 24 24"
                width="36"
                height="36">
                <path
                  fill={color}
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            )}
          />
          <div className="btb-badge-info">
            <h4 className="btb-badge-title">{bt || "Customer Reviews"}</h4>
            <div className="btb-badge-rating">
              <span className="score">{score}</span>
              <span className="stars">★★★★★</span>
              <span className="count">{count}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (layout === "trust-badges") {
    // The star keeps its own amber default; the rest use the brand colour.
    const trustItems = [
      {
        slot: "trust0",
        label: bt || "Secure & Verified",
        color: BRAND_COLOR,
        d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
      },
      {
        slot: "trust1",
        label: bd || "Money-Back Guarantee",
        color: BRAND_COLOR,
        d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
      },
      {
        slot: "trust2",
        label: bs || "5-Star Support",
        color: "#FF9D28",
        d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
      },
      {
        slot: "trust3",
        label: bc || "Trusted by 10K+ Users",
        color: BRAND_COLOR,
        d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
      },
    ];

    // The Columns and Gap controls only reached this block's editor preview --
    // the front end grid was a fixed repeat(4, 1fr). Same custom properties the
    // video layout uses, so both honour the inspector.
    const gridVars = {
      "--cols-d": previewCols || 3,
      "--cols-t": tablet || 3,
      "--cols-m": mobile || 1,
      "--col-gap": columnGap || "16px",
      "--row-gap": rowGap || "16px",
    };

    // The block's editor is a repeater of badges -- icon image, title, subtitle
    // -- and none of it reached the page: this branch rendered four fixed
    // badges built out of the generic badge fields, so adding or editing a badge
    // moved the editor preview only. Where the repeater has content it now
    // drives the page, with the Icons panel supplying the artwork for any badge
    // whose image is empty.
    const badgeItems = Array.isArray(attributes.items) ? attributes.items : [];
    const hasRepeater = badgeItems.some(
      (it) => it && (it.img?.url || it.title || it.subtitle),
    );

    if (hasRepeater) {
      return (
        <div className="bTrustBadges">
          <div className="badges-grid" style={gridVars}>
            {badgeItems.map((item, index) => {
              const slot = trustItems[index];

              return (
                <div className="badge-item" key={index}>
                  {item?.img?.url ? (
                    <img
                      className="badge-icon"
                      src={item.img.url}
                      alt={item.img.alt || ""}
                    />
                  ) : (
                    <BlockIcon
                      icon={getIcon(attributes, slot?.slot || `trust${index}`)}
                      size={32}
                      defaultColor={slot?.color || BRAND_COLOR}
                      renderFallback={(color) => (
                        <svg viewBox="0 0 24 24" width="32" height="32">
                          <path fill={color} d={slot?.d || trustItems[0].d} />
                        </svg>
                      )}
                    />
                  )}
                  <div className="badge-text">
                    {item?.title && <h4 className="badge-title">{item.title}</h4>}
                    {item?.subtitle && (
                      <p className="badge-subtitle">{item.subtitle}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className="btb-trust-badges-grid" style={gridVars}>
        {trustItems.map((it) => (
          <div className="btb-trust-item" key={it.slot}>
            <BlockIcon
              icon={getIcon(attributes, it.slot)}
              size={32}
              defaultColor={it.color}
              renderFallback={(color) => (
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <path fill={color} d={it.d} />
                </svg>
              )}
            />
            <span>{it.label}</span>
          </div>
        ))}
      </div>
    );
  }

  // ================================================================
  //  CATEGORY E: Interactive / Data Widgets (fully custom JSX)
  // ================================================================

  if (layout === "testimonial-form") {
    return <TestimonialForm attributes={attributes} isBackend={isBackend} />;
  }

  if (layout === "user-feedback-poll") {
    const minVal =
      attributes.minScore !== undefined ? Number(attributes.minScore) : 0;
    const maxVal =
      attributes.maxScore !== undefined ? Number(attributes.maxScore) : 10;
    const lowLbl =
      attributes.lowLabel !== undefined ? attributes.lowLabel : "Not likely";
    const highLbl =
      attributes.highLabel !== undefined ? attributes.highLabel : "Very likely";

    const pollNumbers = [];
    for (let i = minVal; i <= maxVal; i++) {
      pollNumbers.push(i);
    }

    return (
      <div className="btb-poll-wrapper">
        <h4 className="btb-poll-title">
          {bt || "How likely are you to recommend us?"}
        </h4>
        <p className="btb-poll-desc">{bd || "Net Promoter Score Survey"}</p>
        <div className="btb-poll-scale">
          {lowLbl && <span className="btb-poll-label-low">{lowLbl}</span>}
          <div className="btb-poll-buttons">
            {pollNumbers.map((n) => (
              <button
                key={n}
                type="button"
                className="btb-poll-num-btn"
                data-mark={n}>
                {n}
              </button>
            ))}
          </div>
          {highLbl && <span className="btb-poll-label-high">{highLbl}</span>}
        </div>
        <div
          className="btb-poll-response-msg"
          style={{ display: "none" }}></div>
      </div>
    );
  }

  if (layout === "rating-summary") {
    // The Rating panel's own fields -- Rating, Out of, Show review count and
    // Count text -- reached the editor preview only: the score fell back to a
    // hard-coded 4.8 and the count line to "Based on 256 reviews", and there was
    // no way at all to turn the count off. Only Star color made it through,
    // through its palette alias.
    const {
      rating,
      outOf = 5,
      count,
      countText = "",
      showCount = true,
      stacked = false,
    } = attributes;

    // Which of the two wins is decided by the data source, not by whether any
    // testimonials happen to exist. `items` ships with three demo reviews, so
    // "calculate when there are items" meant the Rating panel could never win --
    // the block would have kept ignoring it. Choosing the testimonials source is
    // the request to be calculated; anything else means the panel's own figures.
    const useComputed = "cpt" === attributes.dataSource && computedStats.total > 0;

    const manualScore =
      undefined === rating || null === rating || "" === rating
        ? ""
        : `${rating}`;

    const displayScore =
      bs || (useComputed ? computedStats.avg : manualScore || "4.8");

    const manualCountText = countText
      ? countText.replace("{count}", Number(count || 0).toLocaleString())
      : "";

    const displayCountText =
      bc ||
      (useComputed
        ? `Based on ${computedStats.total} reviews`
        : manualCountText || "Based on 256 reviews");

    // Out of is not always 5, so the star row is drawn rather than a literal
    // run of five glyphs, with the filled overlay clipped to the score.
    const starCount = Math.max(1, Math.min(10, Number(outOf) || 5));
    const scoreNum = parseFloat(displayScore) || 0;
    const fillPct = Math.max(
      0,
      Math.min(100, (scoreNum / starCount) * 100),
    );
    const starRow = "★".repeat(starCount);

    const defaultPcts = { 5: 78, 4: 15, 3: 4, 2: 2, 1: 1 };

    // Same precedence as the score above, so the bars cannot disagree with it.
    const rows = [5, 4, 3, 2, 1].map((s) => {
      const starTotal = computedStats.counts[s];
      const pct = useComputed
        ? Math.round((starTotal / computedStats.total) * 100)
        : attributes[`star${s}Pct`] ?? defaultPcts[s];
      return { star: s, pct, count: starTotal };
    });

    return (
      <div className={`btb-rating-summary ${stacked ? "is-stacked" : ""}`}>
        <div className="btb-rs-left">
          <span className="btb-rs-big-number">{displayScore}</span>
          <div className="btb-rs-stars">
            <span className="btb-rs-stars-base">{starRow}</span>
            <span
              className="btb-rs-stars-fill"
              style={{ width: `${fillPct}%` }}>
              {starRow}
            </span>
          </div>
          {showCount && (
            <span className="btb-rs-count">{displayCountText}</span>
          )}
        </div>
        <div className="btb-rs-bars">
          {rows.map((r) => (
            <div key={r.star} className="btb-rs-bar-row">
              <span className="btb-rs-bar-label">{r.star} ★</span>
              <div className="btb-rs-bar-track">
                <div
                  className="btb-rs-bar-fill"
                  style={{ width: `${r.pct}%` }}></div>
              </div>
              <span className="btb-rs-bar-pct">{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (layout === "star-rating-bars") {
    const defaultCounts = { 5: 184, 4: 46, 3: 15, 2: 7, 1: 3 };

    const rows = [5, 4, 3, 2, 1].map((s) => {
      const overrideVal = attributes[`star${s}Count`];
      let count;
      if (overrideVal !== undefined && overrideVal !== "") {
        count = Number(overrideVal) || 0;
      } else if (computedStats.total > 0 && computedStats.counts[s] > 0) {
        count = computedStats.counts[s];
      } else {
        count = defaultCounts[s];
      }
      return { star: s, count };
    });

    const totalCountSum = rows.reduce(
      (sum, r) => sum + (Number(r.count) || 0),
      0,
    );

    const rowsWithPct = rows.map((r) => {
      const rawPct =
        totalCountSum > 0 ? Math.round((r.count / totalCountSum) * 100) : 0;
      const pct = isNaN(rawPct) ? 0 : rawPct;
      return { ...r, pct };
    });

    return (
      <div className="btb-star-rating-bars">
        <h4 className="btb-srb-title">{bt || "Rating Breakdown"}</h4>
        {rowsWithPct.map((r) => (
          <div key={r.star} className="btb-srb-row">
            <span className="btb-srb-label">
              {r.star} {r.star === 1 ? "Star" : "Stars"}
            </span>
            <div className="btb-srb-track">
              <div
                className="btb-srb-fill"
                style={{ width: `${r.pct}%` }}></div>
            </div>
            <span className="btb-srb-count">
              {r.count} ({r.pct}%)
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (layout === "testimonial-stats") {
    const gridVars = {
      "--cols-d": previewCols || 3,
      "--cols-t": tablet || 3,
      "--cols-m": mobile || 1,
      "--col-gap": columnGap || "16px",
      "--row-gap": rowGap || "16px",
      "--accent": attributes.accentColor,
    };

    // The block's editor is a repeater -- number, prefix, suffix, label per
    // stat -- and its view script animates `.stat-number[data-number]` inside
    // `.bTestimonialStats[data-animate="1"]`. Neither reached the page: this
    // branch used to render four fixed cards out of the generic badge fields,
    // so adding, removing or editing a stat changed only the editor, and Animate
    // count never ran. Rendering the repeater fixes all of it at once.
    const statItems = Array.isArray(attributes.items) ? attributes.items : [];
    const hasRepeater = statItems.some(
      (it) =>
        it &&
        (it.number !== undefined || it.label !== undefined || it.suffix || it.prefix),
    );

    if (hasRepeater) {
      return (
        <div
          className="bTestimonialStats"
          data-animate={attributes.animate ? "1" : "0"}>
          <div
            className={`stats-grid ${
              attributes.surfaceColor || attributes.borderColor
                ? "has-surface"
                : ""
            }`}
            style={gridVars}>
            {statItems.map((item, index) => {
              const raw = String(item?.number ?? "");
              const decimals = raw.includes(".")
                ? raw.split(".")[1].length
                : 0;

              return (
                <div className="stat-item" key={index}>
                  <div
                    className="stat-value"
                    style={{ color: attributes.accentColor }}>
                    <span className="stat-prefix">{item?.prefix}</span>
                    {/* The literal stays in the markup so the number is still
                        right with JavaScript off; the view script only takes
                        over to count up to it. */}
                    <span
                      className="stat-number"
                      data-number={item?.number}
                      data-decimals={decimals}>
                      {Number(item?.number || 0).toLocaleString()}
                    </span>
                    <span className="stat-suffix">{item?.suffix}</span>
                  </div>
                  <div className="stat-label">{item?.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Fallback for blocks saved before the repeater existed, which described
    // their stats through the generic badge fields.
    const fiveStarCount = computedStats.counts[5];
    const calcAvg = computedStats.total > 0 ? computedStats.avg : "4.9";
    const calc5Star = computedStats.total > 0 ? `${fiveStarCount}` : "500+";

    const legacyStats = [
      [
        bs || (computedStats.total > 0 ? `${computedStats.total}+` : "10K+"),
        bt || "Happy Customers",
      ],
      [bc || "98%", bd || "Satisfaction Rate"],
      [attributes.stat3Number || calcAvg, attributes.stat3Label || "Average Rating"],
      [
        attributes.stat4Number || calc5Star,
        attributes.stat4Label || "5-Star Reviews",
      ],
    ];

    return (
      <div className="btb-stats-grid" style={gridVars}>
        {legacyStats.map(([num, label], index) => (
          <div className="btb-stat-card" key={index}>
            <span className="btb-stat-number">{num}</span>
            <span className="btb-stat-label">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (layout === "social-proof-toast") {
    return (
      <SocialProofToast
        items={items}
        bt={bt}
        bd={bd}
        isBackend={isBackend}
        activeIndex={activeIndex}
      />
    );
  }

  if (layout === "comparison-testimonial-table") {
    const title = bt || attributes.badgeTitle || "Customer Comparison";
    const col1 = attributes.col1Header || "Customer";
    const col2 = attributes.col2Header || "Rating";
    const col3 = attributes.col3Header || "Review";

    return (
      <div className="btb-comparison-table">
        <h4 className="btb-ct-title">{title}</h4>
        <table className="btb-ct-table">
          <thead>
            <tr>
              <th>{col1}</th>
              <th>{col2}</th>
              <th>{col3}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td className="btb-ct-name">{item.name || ""}</td>
                <td className="btb-ct-rating">
                  {"★".repeat(item.rating || 5)}
                </td>
                {/* Routed through itemsEls so the excerpt length and the
                    Expand/Less button apply here too, and so the cell is
                    editable in place. */}
                <td className="btb-ct-text">{itemsEls?.[i]?.reviewText}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (layout === "faq-testimonial-accordion") {
    return (
      <div className="btb-faq-accordion">
        <h4 className="btb-faq-title">{bt || "Frequently Asked Questions"}</h4>
        {items.map((item, i) => (
          <details key={i} className="btb-faq-item">
            <summary className="btb-faq-question">
              {item.name || `Question ${i + 1}`}
            </summary>
            <div className="btb-faq-answer">
              {itemsEls?.[i]?.reviewText}
              <span className="btb-faq-author">— {item.deg || "Customer"}</span>
            </div>
          </details>
        ))}
      </div>
    );
  }

  // ================================================================
  //  CATEGORY C: Custom testimonial layouts (unique JSX + items)
  // ================================================================

  if (layout === "testimonials-avatar-list") {
    const activeIdx =
      isBackend && typeof activeIndex === "number"
        ? activeIndex
        : selectedAvatarIdx;
    const currentActiveIdx = activeIdx < items.length ? activeIdx : 0;
    const activeItem = items[currentActiveIdx] || items[0] || {};

    const handleAvatarClick = (idx) => {
      setSelectedAvatarIdx(idx);
      if (typeof setActiveIndex === "function") {
        setActiveIndex(idx);
      }
    };

    return (
      <div className="btb-avatar-list-wrapper">
        <div className="btb-avatar-row">
          {items.map((it, idx) => (
            <div
              key={idx}
              {...clickable(() => handleAvatarClick(idx), it.name || "")}
              className={`btb-avatar-thumb ${
                currentActiveIdx === idx ? "active" : ""
              }`}>
              <img
                src={
                  it.img?.url ||
                  "https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png"
                }
                alt={it.name || ""}
              />
              {/* Same hover-to-upload overlay the themed cards get. This
                  layout draws its own avatar markup, so it has to opt in. */}
              {itemsEls?.[idx]?.img}
            </div>
          ))}
        </div>
        <div className="btb-avatar-detail">
          {isBackend && RichText ? (
            <>
              <RichText
                tagName="p"
                className="btb-avatar-review"
                value={activeItem.reviewText || ""}
                onChange={(val) => updateItem("reviewText", val)}
                placeholder={__("Enter review text", "b-testimonials-block")}
                inlineToolbar
              />
              <RichText
                tagName="h4"
                className="btb-avatar-name"
                value={activeItem.name || ""}
                onChange={(val) => updateItem("name", val)}
                placeholder={__("Enter name", "b-testimonials-block")}
                inlineToolbar
              />
              <RichText
                tagName="span"
                className="btb-avatar-deg"
                value={activeItem.deg || ""}
                onChange={(val) => updateItem("deg", val)}
                placeholder={__("Enter designation", "b-testimonials-block")}
                inlineToolbar
              />
            </>
          ) : (
            <>
              <p className="btb-avatar-review">
                &quot;{activeItem.reviewText || ""}&quot;
              </p>
              <h4 className="btb-avatar-name">{activeItem.name || ""}</h4>
              <span className="btb-avatar-deg">{activeItem.deg || ""}</span>
            </>
          )}
        </div>
      </div>
    );
  }

  if (layout === "testimonials-timeline") {
    return (
      <div className="btb-timeline-layout">
        {items.map((item, index) => (
          <div key={index} className="btb-timeline-item">
            <div className="btb-timeline-dot"></div>
            <div className="btb-timeline-card">{themeSelect(item, index)}</div>
          </div>
        ))}
      </div>
    );
  }

  if (layout === "audio-testimonials") {
    return (
      <div
        className={`layoutSection btb-audio-layout ${theme} columns-${previewCols} columns-tablet-${tablet} columns-mobile-${mobile}`}>
        {items.map((item, index) => (
          <div key={index} className="btb-audio-card">
            {/* Was a static play glyph beside ten fixed bars -- no <audio>
                element existed, so the card only looked like a player. */}
            <AudioPlayer
              src={item?.audio?.url || ""}
              playIcon={getIcon(attributes, "play")}
              isBackend={isBackend}
            />
            {themeSelect(item, index)}
          </div>
        ))}
      </div>
    );
  }

  if (layout === "video-testimonials") {
    const videoGridVars = {
      "--cols-d": previewCols || 3,
      "--cols-t": tablet || 2,
      "--cols-m": mobile || 1,
      "--col-gap": columnGap || "30px",
      "--row-gap": rowGap || "30px",
      "--accent": attributes.accentColor || "#0575e6",
    };

    return (
      <div className="bVideoTestimonials">
        <div className="videos-grid" style={videoGridVars}>
          {items.map((item, index) => (
            <VideoCard
              key={index}
              item={item}
              playIcon={getIcon(attributes, "play")}
              accentColor={attributes.accentColor}
              SandBox={SandBox}
            />
          ))}
        </div>
      </div>
    );
  }

  if (layout === "before-after") {
    return <BeforeAfterSlider attributes={attributes} />;
  }

  if (layout === "case-study-card") {
    return (
      <div
        className={`btb-case-study-grid columns-${previewCols} columns-tablet-${tablet} columns-mobile-${mobile}`}>
        {items.map((item, index) => {
          const sections = item.sections || [
            {
              title: item.challengeTitle ?? item.challengeLabel ?? "Challenge",
              content:
                item.challenge ??
                "The customer needed a reliable solution to improve their workflow.",
            },
            {
              title: item.solutionTitle ?? item.solutionLabel ?? "Solution",
              content:
                item.solution ??
                item.reviewText ??
                "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout",
            },
            {
              title: item.resultTitle ?? item.resultLabel ?? "Result",
              content:
                item.result ??
                "95% improvement in efficiency and customer satisfaction.",
            },
          ];

          return (
            <div key={index} className="btb-case-study">
              <div className="btb-cs-header">
                {/* Wrapper is rendered on both sides so the editor and the
                    front end keep identical markup; it only carries the
                    positioning the upload overlay needs. */}
                <div className="btb-cs-avatar-wrap">
                  <img
                    src={
                      item.img?.url ||
                      "https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png"
                    }
                    alt={item.name}
                    className="btb-cs-avatar"
                  />
                  {itemsEls?.[index]?.img}
                </div>
                <div>
                  <h4 className="btb-cs-name">{item.name || "John Doe"}</h4>
                  <span className="btb-cs-deg">{item.deg || "Developer"}</span>
                </div>
              </div>
              <div className="btb-cs-body">
                {sections.map((sec, secIdx) => (
                  <div key={secIdx} className="btb-cs-section">
                    {sec.title && (
                      <span className="btb-cs-label">{sec.title}</span>
                    )}
                    {sec.content && <p>{sec.content}</p>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (layout === "client-logos") {
    const logoItems = items.length > 0 ? items : attributes.logos || [];

    // Same markup and custom properties as the block's own editor.
    //
    // This used to render a `.btb-client-logos` grid of its own with the gap
    // and the logo height written into the stylesheet as literals, so four of
    // the block's controls -- Column Gap, Row Gap, Logo height and Grayscale --
    // moved the editor preview and nothing else. Matching the editor markup is
    // what makes them reach the page, and it is the markup logos.scss styles.
    return (
      <div className="bClientLogos">
        <div
          className={`logos-grid ${attributes.grayscale ? "is-grayscale" : ""} ${
            attributes.trackColor || attributes.borderColor ? "has-surface" : ""
          }`}
          style={{
            "--cols-d": previewCols || 4,
            "--cols-t": tablet || 3,
            "--cols-m": mobile || 2,
            "--col-gap": columnGap || "30px",
            "--row-gap": rowGap || "30px",
            "--logo-h": `${attributes.logoHeight || 60}px`,
          }}>
          {logoItems.map((item, index) => {
            const imgEl = (
              <img
                src={
                  item.img?.url ||
                  "https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png"
                }
                alt={item.name || item.img?.alt || ""}
              />
            );
            return (
              <div key={index} className="logo-item">
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {imgEl}
                  </a>
                ) : (
                  imgEl
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ================================================================
  //  CATEGORY B: Testimonial layouts with custom CSS wrappers
  //  (use themeSelect but wrapped in unique layout classes)
  // ================================================================

  if (layout === "testimonials-hero") {
    const heroItem = items[0] || {};

    // The spotlight takes the first testimonial, so the grid only ever holds
    // the ones after it -- which is why Columns looks broken here. A hero block
    // ships with a single testimonial and renders no grid at all, so the control
    // has nothing to act on until a second card is added; and with more columns
    // than follower cards the few that exist were squeezed into a fraction of
    // the row with the remaining tracks left empty. Measured at 4 columns and
    // one follower: a 310px card in a 1280px row.
    //
    // Clamping to the number of cards actually in the grid keeps the control
    // honest at every count -- it can still reduce the columns, it just cannot
    // ask for more tracks than there are cards to fill them.
    const followers = items.slice(1);
    const gridCols = (value) => Math.max(1, Math.min(Number(value) || 1, followers.length));

    return (
      <div className="btb-hero-layout">
        <div className="btb-hero-card">{themeSelect(heroItem, 0)}</div>
        {followers.length > 0 && (
          <div
            className={`btb-hero-grid columns-${gridCols(previewCols)} columns-tablet-${gridCols(tablet)} columns-mobile-${gridCols(mobile)}`}>
            {followers.map((item, index) => themeSelect(item, index + 1))}
          </div>
        )}
      </div>
    );
  }

  if (layout === "testimonials-popup-modal") {
    return (
      <div className="btb-popup-modal-wrapper">
        <div
          className={`layoutSection btb-popup-modal-grid ${theme} columns-${previewCols} columns-tablet-${tablet} columns-mobile-${mobile} ${
            isBackend ? "is-editing" : ""
          }`}>
          {items.map((item, index) => (
            <div
              key={index}
              className="btb-popup-modal-card-trigger"
              {...clickable(() => setActiveModalItem(item), item?.name || "")}
              style={{ cursor: "pointer" }}>
              {themeSelect(item, index)}
            </div>
          ))}
        </div>

        {activeModalItem && (
          <div
            className="btb-modal-overlay"
            role="presentation"
            onClick={(e) =>
              e.target === e.currentTarget && setActiveModalItem(null)
            }
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999999,
              padding: "20px",
            }}>
            <div
              className="btb-modal-content-box"
              role="dialog"
              aria-modal="true"
              aria-label={activeModalItem?.name || "Testimonial"}
              style={{
                background: "#fff",
                borderRadius: "16px",
                maxWidth: "540px",
                width: "100%",
                padding: "28px",
                position: "relative",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                animation: "btbToastSlide 0.3s ease",
              }}>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#64748b",
                  lineHeight: 1,
                }}>
                ×
              </button>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  marginBottom: "18px",
                }}>
                <img
                  src={
                    activeModalItem.img?.url ||
                    "https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png"
                  }
                  alt={activeModalItem.name || ""}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#0f172a",
                    }}>
                    {activeModalItem.name || "John Doe"}
                  </h3>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>
                    {activeModalItem.deg || ""}
                  </span>
                  <div
                    style={{
                      color: "#f59e0b",
                      fontSize: "16px",
                      marginTop: "4px",
                    }}>
                    {"★".repeat(activeModalItem.rating || 5)}
                  </div>
                </div>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  color: "#334155",
                  lineHeight: "1.6",
                  fontStyle: "italic",
                }}>
                &quot;{activeModalItem.reviewText || ""}&quot;
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (layout === "testimonials-floating-bubble") {
    return (
      <div className="btb-floating-bubble-layout">
        {items.map((item, index) => (
          <div
            key={index}
            className="btb-bubble-item"
            style={{ animationDelay: `${index * 0.3}s` }}>
            <div className="btb-bubble-avatar">
              <img
                src={
                  item.img?.url ||
                  "https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png"
                }
                alt={item.name}
              />
              {itemsEls?.[index]?.img}
            </div>
            <div className="btb-bubble-content">
              {itemsEls?.[index]?.reviewText}
              <span className="btb-bubble-name">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (layout === "testimonials-card-stack") {
    const totalItems = items.length;
    const currentIdx =
      typeof setActiveIndex === "function" ? activeIndex || 0 : cardStackIdx;
    const activeIdx =
      totalItems > 0
        ? ((currentIdx % totalItems) + totalItems) % totalItems
        : 0;

    const updateStackActive = (newIdx) => {
      setCardStackIdx(newIdx);
      if (typeof setActiveIndex === "function") {
        setActiveIndex(newIdx);
      }
    };

    const nextCard = (e) => {
      if (e) e.preventDefault();
      if (totalItems > 1) {
        updateStackActive((activeIdx + 1) % totalItems);
      }
    };

    const prevCard = (e) => {
      if (e) e.preventDefault();
      if (totalItems > 1) {
        updateStackActive((activeIdx - 1 + totalItems) % totalItems);
      }
    };

    return (
      <div
        className={`btb-card-stack-wrapper ${isBackend ? "is-editing" : ""}`}>
        <div
          className="btb-card-stack-layout"
          data-active-index={activeIdx}
          data-total-items={totalItems}>
          {items.map((item, index) => {
            const pos =
              totalItems > 0
                ? (index - activeIdx + totalItems) % totalItems
                : 0;
            const isTop = pos === 0;

            // One state class, not two. This was `${isTop ? 'is-top' : ''}`
            // followed by a separate `is-behind-N` / `is-hidden` ternary, so the
            // top card came out as `is-top is-hidden`: both classes carry the
            // same specificity and `.is-hidden` is declared last, so it won with
            // `opacity: 0`. Every stack rendered its front card invisible, and a
            // stack of one -- which is the default -- showed nothing at all. The
            // front-end view script assigns these exclusively already, but it
            // returns early on a single card, so it never repaired that case.
            const stateClass = isTop
              ? "is-top"
              : pos <= 2
                ? `is-behind-${pos}`
                : "is-hidden";

            return (
              <div
                key={index}
                className={`btb-stacked-card ${stateClass}`}
                data-index={index}
                data-stack-pos={pos}
                style={{
                  zIndex: isTop ? 10 : 10 - pos,
                }}
                {...editorClickable(isBackend, () => updateStackActive(index))}>
                {themeSelect(item, index)}
              </div>
            );
          })}
        </div>

        {totalItems > 1 && (
          <div className="btb-stack-controls">
            <button
              type="button"
              className="btb-stack-btn btb-stack-prev"
              onClick={prevCard}
              aria-label="Previous card">
              ‹
            </button>
            <div className="btb-stack-dots">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`btb-stack-dot ${
                    idx === activeIdx ? "is-active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    updateStackActive(idx);
                  }}
                  aria-label={`Go to card ${idx + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className="btb-stack-btn btb-stack-next"
              onClick={nextCard}
              aria-label="Next card">
              ›
            </button>
          </div>
        )}
      </div>
    );
  }

  // ================================================================
  //  CATEGORY A: Standard layouts (existing switch logic, fixed)
  // ================================================================

  // The block keeps its own identity classes; the arrangement adds its own on
  // top. The one exception is a layout that only ever named an arrangement
  // (default/slider/masonry/list/marquee) -- once an explicit arrangement is
  // chosen, keeping the old class would let two arrangements style the same
  // element, e.g. marquee's overflow rules wrapping a Swiper.
  const identityClasses =
    ARRANGEMENTS.includes(layout) && arrangement !== layout
      ? []
      : [`${layout}-layout`, `btb-${layout}-layout`];

  const sectionClasses = [
    "layoutSection",
    ...identityClasses,
    // Deduped: for a block whose layout already names its arrangement, the two
    // produce the same class.
    ...(identityClasses.includes(`${arrangement}-layout`)
      ? []
      : [`${arrangement}-layout`]),
    theme,
    `columns-${previewCols}`,
    `columns-tablet-${tablet}`,
    `columns-mobile-${mobile}`,
    isBackend ? "is-editing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={sectionClasses}>
      {(() => {
        switch (arrangement) {
          case "masonry": {
            const masonryItems = items.map((item, index) =>
              themeSelect(item, index),
            );

            // In the editor the count comes from the device buttons: this
            // measures the window, so inside a non-iframed canvas it would
            // report the desktop width whichever device is selected.
            if (isBackend) {
              return (
                <Masonry
                  columnsCount={previewCols}
                  gutter={`${rowGap} ${columnGap}`}>
                  {masonryItems}
                </Masonry>
              );
            }

            // Breakpoints are min-width here, so they are the CSS max-widths in
            // _devices.scss plus one, keeping this in step with the stylesheets.
            return (
              <ResponsiveMasonry
                columnsCountBreakPoints={{
                  0: mobile,
                  641: tablet,
                  1025: desktop,
                }}>
                <Masonry columnsCount={desktop} gutter={`${rowGap} ${columnGap}`}>
                  {masonryItems}
                </Masonry>
              </ResponsiveMasonry>
            );
          }
          case "slider":
          case "slider-3d":
          case "coverflow":
            return (
              <Slider
                attributes={attributes}
                itemsEls={itemsEls}
                itemProps={itemProps}
                isBackend={isBackend}
                previewCols={previewCols}
                previewDevice={previewDevice}
                arrangement={arrangement}
              />
            );
          case "marquee":
            return (
              <Marquee
                items={items}
                themeSelect={themeSelect}
                columnGap={columnGap}
                marquee={attributes?.marquee}
                isBackend={isBackend}
                pauseInEditor={attributes?.pauseInEditor}
              />
            );
          // All other testimonial-items layouts: quote-box, speech-bubble, compact, list, etc.
          // The unique visual is produced by the CSS class on the wrapper div
          default:
            return items.map((item, index) => themeSelect(item, index));
        }
      })()}
    </div>
  );
};

export default Layout;
