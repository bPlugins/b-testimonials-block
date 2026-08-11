import { useState } from "react";

import Style from "./Style";
import Layout from "./Layout/Layout";
import ExpandButton from "./ExpandButton";

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

const TestimonialsView = ({ attributes, clientId }) => {
  const cId = clientId ?? attributes.cId;
  // textLength needs a default here: without one, slice(0, undefined) returns
  // the whole string and `contentLength > undefined` is false, so the text
  // never truncates and the toggle never appears.
  const { items = [], elements = {}, textLength = 120 } = attributes;
  const { expandBtn } = elements || {};

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
        <Layout attributes={attributes} itemsEls={itemsEls} />
      </div>
    </>
  );
};

export default TestimonialsView;
