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

  const pointFrom = (e) => {
    const touch = e.touches && e.touches[0];
    return touch ? [touch.clientX, touch.clientY] : [e.clientX, e.clientY];
  };

  const onMouseDown = (e) => {
    if (isHover) {
      return;
    }
    setIsDragging(true);
    updatePos(...pointFrom(e));
  };

  const onTouchStart = (e) => {
    setIsDragging(true);
    updatePos(...pointFrom(e));
  };

  // Hover mode still tracks touch drags, since a touch device has no hover.
  const onMouseMove = (e) => {
    if (isHover) {
      updatePos(e.clientX, e.clientY);
    }
  };

  useEffect(() => {
    const onWindowMove = (e) => {
      if (isDragging) {
        updatePos(...pointFrom(e));
      }
    };
    const onEnd = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", onWindowMove);
      window.addEventListener("touchmove", onWindowMove);
      window.addEventListener("mouseup", onEnd);
      window.addEventListener("touchend", onEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onWindowMove);
      window.removeEventListener("touchmove", onWindowMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, updatePos]);

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
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}>
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
