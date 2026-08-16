import { useState, useRef, useEffect, useCallback } from "react";

const DEFAULT_IMG =
  "https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png";

const BeforeAfterSlider = ({ attributes = {} }) => {
  const {
    beforeImg = {},
    afterImg = {},
    beforeLabel = "Before",
    afterLabel = "After",
    startPosition = 50,
    accentColor = "#ffffff",
    orientation = "horizontal",
    interaction = "drag",
    aspectRatio = "auto",
    mediaRadius = "8px",
    dividerWidth = 3,
    gripSize = 38,
    showLabels = true,
    labelPosition = "bottom",
    labelFontSize = 13,
    items = [],
    badgeTitle = "",
  } = attributes;

  const isVertical = "vertical" === orientation;
  const isHover = "hover" === interaction;

  const beforeUrl = beforeImg?.url || items?.[0]?.img?.url || DEFAULT_IMG;
  const afterUrl = afterImg?.url || items?.[1]?.img?.url || DEFAULT_IMG;

  const [pos, setPos] = useState(startPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Without this the inspector's Start Position range moved nothing: the state
  // was seeded once at mount and the editor never remounts the block, so the
  // divider stayed wherever it already was.
  useEffect(() => {
    setPos(startPosition);
  }, [startPosition]);

  const updatePos = useCallback(
    (clientX, clientY) => {
      if (!containerRef.current) {
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const span = isVertical ? rect.height : rect.width;
      if (!span) {
        return;
      }
      const offset = isVertical ? clientY - rect.top : clientX - rect.left;
      setPos(Math.max(0, Math.min(100, (offset / span) * 100)));
    },
    [isVertical]
  );

  // Drag is tracked with pointer capture on the container rather than listeners
  // on `window`. In the editor the block lives inside the canvas iframe, and
  // Gutenberg only re-dispatches `mousemove`/`dragover` up to the parent frame --
  // a `mouseup` in the canvas never reached a parent-window listener, so the
  // divider stayed glued to the pointer after the button was released. Capture
  // keeps every move and the release on this element, in this document, so the
  // coordinates also stay in the same space as `getBoundingClientRect()`.
  const isMouse = (e) => "mouse" === e.pointerType;

  const onPointerDown = (e) => {
    // Hover mode reveals on move, so a mouse press must not start a drag. Touch
    // and pen have no hover, so they still drag.
    if (isHover && isMouse(e)) {
      return;
    }
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    updatePos(e.clientX, e.clientY);
  };

  const onPointerMove = (e) => {
    if (isDragging || (isHover && isMouse(e))) {
      updatePos(e.clientX, e.clientY);
    }
  };

  // `lostpointercapture` covers the cases `pointerup` misses -- the browser
  // revoking capture, or the node unmounting mid-drag.
  const endDrag = (e) => {
    if (e?.currentTarget?.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  const handleKeyDown = (e) => {
    const back = isVertical ? "ArrowUp" : "ArrowLeft";
    const forward = isVertical ? "ArrowDown" : "ArrowRight";

    if (back === e.key || "ArrowLeft" === e.key) {
      setPos((prev) => Math.max(0, prev - 2));
    } else if (forward === e.key || "ArrowRight" === e.key) {
      setPos((prev) => Math.min(100, prev + 2));
    }
  };

  const wrapClasses = [
    "ba-wrap",
    isVertical ? "is-vertical" : "",
    isHover ? "is-hover" : "",
    "top" === labelPosition ? "labels-top" : "",
    "auto" === aspectRatio ? "" : "has-ratio",
  ]
    .filter(Boolean)
    .join(" ");

  const wrapStyle = {
    "--pos": `${pos}%`,
    "--ba-radius": mediaRadius || "0px",
    "--ba-divider-w": `${dividerWidth}px`,
    "--ba-grip": `${gripSize}px`,
    "--ba-label-size": `${labelFontSize}px`,
  };

  if ("auto" !== aspectRatio) {
    wrapStyle.aspectRatio = aspectRatio.replace(":", " / ");
  }

  return (
    <div className="bBeforeAfter">
      {badgeTitle && <h4 className="btb-ba-title">{badgeTitle}</h4>}
      <div
        ref={containerRef}
        className={wrapClasses}
        role="presentation"
        style={wrapStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}>
        {/* Both halves are absolutely positioned so their labels share one box.
            That leaves nothing in flow to give the wrapper a height on the
            `auto` ratio, which this hidden copy of the before image restores. */}
        <img className="ba-sizer" src={beforeUrl} alt="" aria-hidden="true" />
        <div className="ba-before">
          <img
            src={beforeUrl}
            alt={beforeImg?.alt || beforeLabel || "Before"}
          />
          {showLabels && beforeLabel && (
            <span className="ba-label ba-label-before">{beforeLabel}</span>
          )}
        </div>
        <div className="ba-after">
          <img src={afterUrl} alt={afterImg?.alt || afterLabel || "After"} />
          {showLabels && afterLabel && (
            <span className="ba-label ba-label-after">{afterLabel}</span>
          )}
        </div>
        <div
          className="ba-handle"
          style={{ borderColor: accentColor }}
          tabIndex={0}
          role="slider"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-orientation={isVertical ? "vertical" : "horizontal"}
          aria-label="Before after slider handle"
          onKeyDown={handleKeyDown}>
          <span
            className="ba-handle-line"
            style={{ background: accentColor }}
          />
          <span
            className="ba-handle-grip"
            style={{ background: accentColor }}
          />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
