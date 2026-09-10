import { useState, useMemo } from "react";

import Style from "./Style";
import Layout from "./Layout/Layout";
import ExpandButton from "./ExpandButton";
import TestimonialFilter from "./TestimonialFilter";

/**
 * Read-only rendering of a testimonials block, shared by the front end
 * (view.js) and the editor's CPT-source preview.
 */
/**
 * Truncated review text with its Expand/Less toggle.
 *
 * Declared at module scope on purpose. It used to be defined inside the
 * items.map() below, which gave it a fresh function identity on every render of
 * TestimonialsView -- React then treated it as a different component type,
 * unmounted it and remounted a fresh one, throwing away `expanded`. Any parent
 * re-render (slider autoplay, marquee, popup, active-item changes) silently
 * collapsed text the visitor had just expanded.
 */
const ViewReviewText = ({
  attributes,
  elements,
  expandBtn,
  textLength,
  reviewText,
}) => {
  const [expanded, setExpanded] = useState(false);

  const contentLength = (reviewText || "").length;
  const showText = expanded
    ? reviewText
    : (reviewText || "").slice(0, textLength);
  const text = expandBtn ? showText : reviewText;

  return (
    elements?.reviewText &&
    reviewText && (
      <>
        <p className="reviewText" dangerouslySetInnerHTML={{ __html: text }} />

        {expandBtn && contentLength > textLength && (
          <ExpandButton
            attributes={attributes}
            reviewText={reviewText}
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
          />
        )}
      </>
    )
  );
};

const TestimonialsView = ({
  attributes,
  clientId,
  isBackend = false,
  previewDevice = "Desktop",
}) => {
  const cId = clientId ?? attributes.cId;
  // textLength needs a default here: without one, slice(0, undefined) returns
  // the whole string and `contentLength > undefined` is false, so the text
  // never truncates and the toggle never appears.
  const {
    items: allItems = [],
    elements = {},
    textLength = 120,
    showFilter = false,
    showSearch = false,
    filterAllLabel = "",
    searchPlaceholder = "",
  } = attributes;
  const { expandBtn } = elements || {};

  const [activeCat, setActiveCat] = useState("");
  const [search, setSearch] = useState("");

  // Every category present among these testimonials, in the order they first
  // appear, deduplicated by slug. Derived from the items rather than fetched:
  // the block already holds everything it displays, and a category with nothing
  // in it would be a tab that filters to an empty grid.
  const categories = useMemo(() => {
    const seen = new Map();

    allItems.forEach((item) => {
      (item?.categories || []).forEach((cat) => {
        if (cat?.slug && !seen.has(cat.slug)) {
          seen.set(cat.slug, { slug: cat.slug, name: cat.name || cat.slug });
        }
      });
    });

    return Array.from(seen.values());
  }, [allItems]);

  const items = useMemo(() => {
    if (!showFilter && !showSearch) {
      return allItems;
    }

    const needle = search.trim().toLowerCase();

    return allItems.filter((item) => {
      if (showFilter && activeCat) {
        const inCat = (item?.categories || []).some(
          (cat) => cat?.slug === activeCat
        );

        if (!inCat) {
          return false;
        }
      }

      if (showSearch && needle) {
        // Name, role, company and the review itself -- someone searching
        // "acme" means the company as readily as the review body.
        const haystack = [
          item?.name,
          item?.deg,
          item?.company,
          item?.reviewText,
        ]
          .filter(Boolean)
          .join(" ")
          // Review text is stored as HTML; tags must not be searchable or
          // "div" would match everything.
          .replace(/<[^>]*>/g, " ")
          .toLowerCase();

        if (!haystack.includes(needle)) {
          return false;
        }
      }

      return true;
    });
  }, [allItems, activeCat, search, showFilter, showSearch]);

  const itemsEls = items.map((item) => {
    const { name, deg, reviewText } = item;

    return {
      img: <></>,
      name: elements?.name && name && (
        <h3 className="name" dangerouslySetInnerHTML={{ __html: name }} />
      ),
      deg: elements?.deg && deg && (
        <h5 className="deg" dangerouslySetInnerHTML={{ __html: deg }} />
      ),
      reviewText: (
        <ViewReviewText
          attributes={attributes}
          elements={elements}
          expandBtn={expandBtn}
          textLength={textLength}
          reviewText={reviewText}
        />
      ),
    };
  });

  return (
    <>
      <Style attributes={attributes} clientId={cId} />

      <div className="btbTestimonialsDir">
        <TestimonialFilter
          categories={categories}
          active={activeCat}
          search={search}
          onCategory={setActiveCat}
          onSearch={setSearch}
          showFilter={showFilter}
          showSearch={showSearch}
          allLabel={filterAllLabel}
          searchPlaceholder={searchPlaceholder}
          resultCount={items.length}
          inputId={`btb-filter-search-${cId || "x"}`}
        />

        {/* Layout reads `attributes.items` and indexes `itemsEls` by the same
            position, so the filtered list has to reach it through the
            attributes as well -- passing only itemsEls would draw the filtered
            text into the unfiltered cards. */}
        <Layout
          attributes={{ ...attributes, items }}
          itemsEls={itemsEls}
          isBackend={isBackend}
          previewDevice={previewDevice}
        />
      </div>
    </>
  );
};

export default TestimonialsView;
