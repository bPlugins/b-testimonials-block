import { useMemo, useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import {
  RichText,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { ToolbarButton, SandBox, Spinner } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { produce } from "immer";

// Settings Components
import { tabController } from "../../../../../bpl-tools/utils/functions";
import ExpandButton from "../Common/ExpandButton";
import BlockPlaceholder from "../Common/BlockPlaceholder";
import BlockSwitcher from "../Common/BlockSwitcher";
import { ALLOWED_CHILD_BLOCKS } from "../Common/BlockSwitcherModal";

// The layout stylesheet was previously imported only from each block's view.js,
// so none of it reached the editor: no `.layoutSection` grid, no `columns-N`
// tracks, and nothing at all for the masonry, marquee, slider or coverflow
// arrangements. That is why those three looked broken in the editor while being
// correct on the frontend. Imported before editor.scss so editor-only tweaks
// still win.
import "../../styles/frontend.scss";
import "../../styles/editor.scss";
import Settings from "./Settings/Settings";
import FrontShortCode from "./FrontShortCode";
import Style from "../Common/Style";
import Layout from "../Common/Layout/Layout";
import TestimonialsView from "../Common/TestimonialsView";
import { upload } from "../../utils/icons";
import { clickable } from "../../utils/a11y";
import usePreviewDevice from "../../utils/usePreviewDevice";
import useReviewSource, { withLiveReview } from "../../utils/useReviewSource";
import {
  getBadgePlatform,
  withEffectiveSource,
} from "../../utils/reviewSources";

// Preview results by request path, shared by every block in the editor. Only
// lives until the page reloads, so a testimonial edited in another tab shows
// up after a refresh.
const cptCache = new Map();

// Requests still on their way, by the same path. Switching Order to Ascending
// and straight back asks for the first result again before it has arrived;
// this hands back the request already running instead of sending a second.
const cptPending = new Map();

const loadCptItems = (path) => {
  if (!cptPending.has(path)) {
    cptPending.set(
      path,
      apiFetch({ path })
        .then((posts) => {
          const mapped = posts.map(mapCptPost);
          cptCache.set(path, mapped);

          return mapped;
        })
        .finally(() => cptPending.delete(path)),
    );
  }

  return cptPending.get(path);
};

const mapCptPost = (post) => ({
  img: { url: post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "" },
  name: post?.title?.rendered || "",
  deg: post?.meta?.bpbtb_designation || "",
  company: post?.meta?.bpbtb_company || "",
  reviewText: post?.content?.rendered || "",
  // Same rule as bpbtb_get_testimonial_items(): an empty or zero rating
  // shows as 5, so the editor and the page always agree.
  rating: Number(post?.meta?.bpbtb_rating) || 5,
  // Same { slug, name } shape bpbtb_get_testimonial_items() gives the page, so
  // the category filter bar has buttons to draw in the editor too. `_embed`
  // already brings each post's terms along.
  categories: (post?._embedded?.["wp:term"] || [])
    .flat()
    .filter((term) => "testimonial_category" === term?.taxonomy)
    .map((term) => ({ slug: term.slug, name: term.name })),
});
import useIframeAssetSync from "../../../../../bpl-tools/hooks/useIframeAssetSync.js";

const Edit = (props) => {
  const { attributes = {}, setAttributes, clientId, isSelected, name } = props;
  const {
    items: rawItems = [],
    elements: rawElements = {},
    textLength = 120,
    dataSource = "manual",
    query = {},
  } = attributes || {};

  const elements = {
    img: true,
    name: true,
    deg: true,
    reviewText: true,
    icon: true,
    ...(rawElements || {}),
  };

  useIframeAssetSync([
    "bptmb-b-testimonials-editor-style-css",
    "bptmb-b-testimonials-editor-script-js",
  ]);

  const DEFAULT_TESTIMONIAL = {
    img: {
      url: "https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png",
    },
    name: "John Doe",
    deg: "Developer",
    reviewText:
      "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout",
    rating: 5,
  };

  const items =
    Array.isArray(rawItems) && rawItems.length > 0
      ? rawItems
      : [DEFAULT_TESTIMONIAL];
  const isCpt = "cpt" === dataSource;

  // Check if current block is the Main Container Block (bptmb/b-testimonials)
  const isMainParentBlock = name === "bptmb/b-testimonials";
  const innerBlocks = useSelect(
    (select) =>
      clientId
        ? select("core/block-editor").getBlock(clientId)?.innerBlocks
        : [],
    [clientId],
  );

  // Only true on the "Testimonials Block" CPT screen (Testimonials -> Shortcode;
  // see includes/display-cpt.php), where this block is the whole post and a
  // shortcode can target it by post ID. Inserted into a regular page/post,
  // currentPostType is that page's own type.
  const currentPostType = useSelect(
    (select) => select("core/editor").getCurrentPostType(),
    [],
  );
  const currentPostId = useSelect(
    (select) => select("core/editor").getCurrentPostId(),
    [],
  );
  const isDisplayCpt = "testimonials-block" === currentPostType;

  useEffect(() => {
    clientId && setAttributes({ cId: clientId.substring(0, 10) });
  }, [clientId, setAttributes]); // Set & Update clientId to cId

  useEffect(() => tabController(), [isSelected]);

  const previewDevice = usePreviewDevice();

  /*
   * A review badge's live figures, for the canvas.
   *
   * The published page gets these from render.php, which resolves them on every
   * request. The editor has no render.php, so it reads the same server-side
   * cache over REST -- the point being that the number in the canvas is the
   * number the page will show, not a second guess at it.
   *
   * Merged into a copy of the attributes and deliberately never saved: these
   * blocks serialise their attributes into post content, so a stored score
   * would freeze one afternoon's rating into the page and sit there going
   * stale. See withLiveReview() for the full reasoning.
   */
  const sourceAttributes = useMemo(
    () => withEffectiveSource(attributes),
    [attributes],
  );
  const badgePlatform = getBadgePlatform(
    sourceAttributes.layout,
    sourceAttributes,
  );
  const liveReview = useReviewSource(
    badgePlatform,
    !!badgePlatform && "manual" !== (sourceAttributes.ratingSource || "live"),
  );
  const previewAttributes = useMemo(
    () => withLiveReview(sourceAttributes, liveReview.data),
    [sourceAttributes, liveReview.data],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch testimonials from the CPT for the editor preview when that source is active.
  const [cptItems, setCptItems] = useState([]);
  // The request path the cards on screen came from. Comparing it with the
  // path the current settings ask for is what says "updating", so there is
  // no render in between where a stale preview looks finished.
  const [cptShownPath, setCptShownPath] = useState(null);

  // Dragging the Number slider from 6 to 28 used to send 22 requests, and the
  // preview only settled once the last one came back. The slider still moves
  // at once; the request waits until it has been still for a moment.
  const wantedNumber = query?.number || 6;
  const [fetchNumber, setFetchNumber] = useState(wantedNumber);

  useEffect(() => {
    const timer = setTimeout(() => setFetchNumber(wantedNumber), 400);

    return () => clearTimeout(timer);
  }, [wantedNumber]);

  // The block stores the category's slug (what the server-side query and the
  // filter bar both match on), but the REST collection filters by term ID.
  // null while resolving, [] when the slug matches no category.
  const pinnedCategory = isCpt ? query?.category || "" : "";
  const pinnedTerms = useSelect(
    (select) =>
      pinnedCategory
        ? select("core").getEntityRecords("taxonomy", "testimonial_category", {
            slug: pinnedCategory,
            per_page: 1,
          })
        : undefined,
    [pinnedCategory],
  );
  const pinnedTermId = pinnedCategory
    ? Array.isArray(pinnedTerms)
      ? pinnedTerms[0]?.id || 0
      : null
    : undefined;

  // Only the two embeds mapCptPost reads. A bare `_embed` also pulled in the
  // author of every post, which the preview never shows. A category that no
  // longer exists gets its own path with nothing to fetch: the page shows
  // nothing for it, so the preview does too.
  const cptPathFor = (number) =>
    0 === pinnedTermId
      ? "missing-category"
      : addQueryArgs("/wp/v2/testimonial", {
          per_page: number,
          orderby: query?.orderBy || "date",
          order: query?.order || "desc",
          ...(pinnedTermId ? { testimonial_category: pinnedTermId } : {}),
          _embed: "wp:featuredmedia,wp:term",
        });

  // null while the category is still being looked up.
  const fetchPath = isCpt && null !== pinnedTermId ? cptPathFor(fetchNumber) : null;
  const wantedPath =
    isCpt && null !== pinnedTermId ? cptPathFor(wantedNumber) : null;

  useEffect(() => {
    if (!fetchPath) {
      return;
    }

    if ("missing-category" === fetchPath) {
      setCptItems([]);
      setCptShownPath(fetchPath);
      return;
    }

    // Going back to a setting already seen is instant.
    if (cptCache.has(fetchPath)) {
      setCptItems(cptCache.get(fetchPath));
      setCptShownPath(fetchPath);
      return;
    }

    let active = true;
    loadCptItems(fetchPath)
      .then((mapped) => {
        if (active) {
          setCptItems(mapped);
        }
      })
      .catch(() => {
        if (active) {
          setCptItems([]);
        }
      })
      .finally(() => {
        if (active) {
          setCptShownPath(fetchPath);
        }
      });

    return () => {
      active = false;
    };
  }, [fetchPath]);

  // True from the moment a setting changes, including the short wait before
  // a Number change is sent, until the cards for exactly these settings are
  // on screen.
  const cptUpdating = isCpt && (!wantedPath || cptShownPath !== wantedPath);

  const blockProps = useBlockProps({
    className:
      "bTestimonials" + (isMainParentBlock ? " bTestimonialsMainBlock" : ""),
  });

  // Main Parent Block Rendering Logic
  if (isMainParentBlock) {
    const isClassicExplicit =
      attributes.useClassicEditor === true || attributes.isLegacyBlock === true;
    const isClassicExplicitOff = attributes.useClassicEditor === false;

    const isFreshDefaultItem =
      Array.isArray(attributes?.items) &&
      attributes.items.length === 1 &&
      attributes.items[0]?.name === "John Doe" &&
      attributes.items[0]?.deg === "Developer" &&
      attributes.items[0]?.reviewText ===
        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout";

    const isFreshNewBlock =
      isFreshDefaultItem &&
      (attributes.theme === "default" || !attributes.theme) &&
      (attributes.layout === "default" || !attributes.layout) &&
      (attributes.dataSource === "manual" || !attributes.dataSource);

    // If NOT explicitly classic mode:
    if (!isClassicExplicit) {
      // 1. If child blocks are present, render child blocks container
      if (innerBlocks && innerBlocks.length > 0) {
        // Once a child block is chosen this block is a pass-through: render.php
        // echoes `$content` and returns, so nothing of the parent reaches the
        // page. Its full Settings used to be shown here anyway, and the whole
        // Style tab -- Margin, Width, Card, colours, typography -- could not
        // take effect in either place: `<Style>` scopes every rule to
        // `#btbTestimonialsDir-<clientId>`, an id this wrapper never carried,
        // and the front end has no parent wrapper at all. The child block owns
        // all of it, so only the switcher, which retargets the child, is shown.
        return (
          <div {...blockProps}>
            {isDisplayCpt && (
              <FrontShortCode shortCode={`[testimonials_block id=${currentPostId}]`} />
            )}
            <InspectorControls>
              <BlockSwitcher
                clientId={clientId}
                currentBlockName={name}
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </InspectorControls>
            <InnerBlocks
              templateLock={false}
              allowedBlocks={ALLOWED_CHILD_BLOCKS}
            />
          </div>
        );
      }

      // 2. If no child blocks: show BlockPlaceholder if explicitly turned off classic OR if it is a fresh new block
      if (isClassicExplicitOff || isFreshNewBlock) {
        return (
          <div {...blockProps}>
            {/* No FrontShortCode here, deliberately: nothing has been chosen
                yet, so `[testimonials_block id=…]` would not render anything
                either -- showing it at this point just invites someone to
                copy a shortcode that does nothing yet. It appears once a
                layout is picked (branch 1 above, and the classic-render
                branch below), which is also the earliest point the block
                itself renders anything on the front end. */}
            {/* Same reasoning as the branch above, at the other end of the
                block's life: nothing has been chosen yet, so this block renders
                nothing on the page and every panel but the switcher is a
                control over a layout that does not exist. Content Source, Add
                or Remove Cards, Elements, Excerpt & Expand, Layout and the
                whole Style tab were all offered here, and none of them could
                change what a visitor sees until a layout is picked. The
                switcher is what the placeholder is for, so it is all that
                shows; the rest appears with the layout it belongs to. */}
            <InspectorControls>
              <BlockSwitcher
                clientId={clientId}
                currentBlockName={name}
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </InspectorControls>
            <BlockPlaceholder
              clientId={clientId}
              currentBlockName={name}
              setAttributes={setAttributes}
            />
            <InnerBlocks
              templateLock={false}
              allowedBlocks={ALLOWED_CHILD_BLOCKS}
              renderAppender={() => false}
            />
          </div>
        );
      }
    }
    // Otherwise (isClassicExplicit is true OR existing saved block without classic off), fall through to Classic Single Block rendering below
  }

  // Writes to a named card. The in-canvas editors (upload button, RichText)
  // each belong to a specific card, so they bind their own index rather than
  // whatever card happens to be active when the change lands -- a media modal
  // in particular returns long after the click that opened it.
  const updateItemAt = (index, type, val, childType = false) => {
    const newItems = produce(items, (draft) => {
      if (!draft || !draft[index]) return;
      if (childType) {
        if (!draft[index][type]) draft[index][type] = {};
        draft[index][type][childType] = val;
      } else {
        draft[index][type] = val;
      }
    });
    setAttributes({ items: newItems });
  };

  // Sidebar controls edit the active card, so they keep the index-free form.
  const updateItem = (type, val, childType = false) =>
    updateItemAt(activeIndex, type, val, childType);

  const itemsEls = items.map((item, itemIndex) => {
    if (!item) return { img: null, name: null, deg: null, reviewText: null };
    const { name = "", deg = "", img = {}, reviewText = "" } = item;
    const setField = (type, val, childType = false) =>
      updateItemAt(itemIndex, type, val, childType);

    return {
      img: (
        <div className="upload">
          <MediaUploadCheck>
            <MediaUpload
              allowedTypes={["image"]}
              value={img}
              onSelect={({ id, url, alt, title }) =>
                setField("img", { id, url, alt, title })
              }
              render={({ open }) => (
                <ToolbarButton
                  label={__("Add or replace image", "b-testimonials-block")}
                  showTooltip
                  icon={upload}
                  onClick={open}
                />
              )}
            />
          </MediaUploadCheck>
        </div>
      ),

      name: elements?.name && (
        <RichText
          tagName="h3"
          className="name"
          value={name || ""}
          onChange={(val) => setField("name", val)}
          placeholder={__("Enter your name", "b-testimonials-block")}
          inlineToolbar
        />
      ),

      deg: elements?.deg && (
        <RichText
          tagName="h5"
          className="deg"
          value={deg || ""}
          onChange={(val) => setField("deg", val)}
          placeholder={__("Enter your designation", "b-testimonials-block")}
          inlineToolbar
        />
      ),

      reviewText: (
        <ReviewText
          attributes={attributes}
          elements={elements}
          textLength={textLength}
          reviewText={reviewText || ""}
          updateItem={setField}
        />
      ),
    };
  });

  return (
    <>
      <Settings
        attributes={sourceAttributes}
        setAttributes={setAttributes}
        updateItem={updateItem}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        clientId={clientId}
        currentBlockName={name}
        badgePlatform={badgePlatform}
        liveReview={liveReview}
        cptStatus={
          isCpt ? { updating: cptUpdating, count: cptItems.length } : null
        }
      />

      <div {...blockProps} id={`btbTestimonialsDir-${clientId}`}>
        {/* isMainParentBlock too, not just isDisplayCpt: this same shared
            Edit.js is also every child layout's own edit function (grid-2,
            slider, ...), and a child reaches this exact return whenever it
            is not bptmb/b-testimonials itself. Without the extra check, a
            child picked inside the wrapper on the Testimonials Block CPT
            screen showed a second copy of the bar -- the wrapper's branch 1
            above already shows the one that matters. */}
        {isDisplayCpt && isMainParentBlock && (
          <FrontShortCode shortCode={`[testimonials_block id=${currentPostId}]`} />
        )}

        {isCpt ? (
          cptItems.length ? (
            // The old cards stay in place while the new ones load, dimmed and
            // labelled, so a change is visibly in progress without the block
            // collapsing to a notice and jumping the page.
            <div
              className={
                "btbCptPreview" + (cptUpdating ? " btbCptPreview--updating" : "")
              }
              aria-busy={cptUpdating}>
              {cptUpdating && (
                <span className="btbCptPreviewBadge">
                  <Spinner />
                  {__("Updating preview", "b-testimonials-block")}
                </span>
              )}

              <TestimonialsView
                attributes={{ ...previewAttributes, items: cptItems }}
                clientId={clientId}
                isBackend={true}
                previewDevice={previewDevice}
              />
            </div>
          ) : (
            <p className="btbCptNotice">
              {cptUpdating ? (
                <>
                  <Spinner />
                  {__("Loading testimonials", "b-testimonials-block")}
                </>
              ) : __(
                    "No testimonials found. Add some under the Testimonials menu, or switch Content Source to Manual.",
                    "b-testimonials-block",
                  )}
            </p>
          )
        ) : (
          <>
            <Style attributes={sourceAttributes} clientId={clientId} />

            <div className="btbTestimonialsDir">
              <Layout
                itemsEls={itemsEls}
                ToolbarButton={ToolbarButton}
                MediaUpload={MediaUpload}
                MediaUploadCheck={MediaUploadCheck}
                isBackend={true}
                previewDevice={previewDevice}
                attributes={previewAttributes}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                updateItem={updateItem}
                __={__}
                RichText={RichText}
                SandBox={SandBox}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Edit;

const ReviewText = ({
  attributes,
  elements,
  textLength,
  reviewText,
  updateItem,
}) => {
  const [expanded, setExpanded] = useState(false);

  // These three lines must stay identical to ViewReviewText in
  // Common/TestimonialsView.js -- that is what the front end renders, and any
  // difference here shows up as an editor preview that does not match the
  // published post. Measure the raw string, exactly as the front end does.
  const text = reviewText || "";
  const isCollapsible = !!elements?.expandBtn && text.length > textLength;
  const collapsed = isCollapsible && !expanded;

  // While collapsed the excerpt is a plain paragraph rather than a RichText:
  // this RichText *is* the editable source, so slicing its value would save the
  // shortened text back over the author's content. Swapping the element keeps
  // the stored text intact while showing the real front end cut. Clicking the
  // excerpt expands it, so editing is one click away.
  if (!elements?.reviewText) {
    return null;
  }

  return (
    <>
      {collapsed ? (
        <p
          className="reviewText btbTextCollapsed"
          {...clickable(
            () => setExpanded(true),
            __("Expand the review text to edit it", "b-testimonials-block"),
          )}
          dangerouslySetInnerHTML={{ __html: text.slice(0, textLength) }}
        />
      ) : (
        <RichText
          tagName="p"
          className="reviewText"
          value={reviewText}
          onChange={(val) => updateItem("reviewText", val)}
          placeholder={__("Enter your review", "b-testimonials-block")}
          inlineToolbar
        />
      )}

      {isCollapsible && (
        <ExpandButton
          attributes={attributes}
          expanded={expanded}
          onChange={() => setExpanded(!expanded)}
        />
      )}
    </>
  );
};
