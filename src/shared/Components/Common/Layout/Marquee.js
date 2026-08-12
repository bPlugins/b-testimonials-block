const Marquee = ({
  items,
  themeSelect,
  columnGap,
  marquee = {},
  isBackend = false,
  pauseInEditor = false,
}) => {
  const {
    speed = 30,
    direction = "left",
    pauseOnHover = true,
  } = marquee && "object" === typeof marquee ? marquee : {};

  const group = (dupe = false) => (
    <div
      className={`marquee-group${dupe ? " marquee-group-dupe" : ""}`}
      aria-hidden={dupe ? "true" : undefined}>
      {items.map((item, index) => (
        <div
          className="marquee-item"
          style={{ marginRight: columnGap }}
          key={`${dupe ? "dup-" : ""}${index}`}>
          {themeSelect(item, index)}
        </div>
      ))}
    </div>
  );

  // Paused rather than removed: `animation: none` snaps the track back to its
  // start, so toggling it would jump the cards around. `animation-play-state`
  // freezes them exactly where they are.
  const trackClasses = [
    "marquee-track",
    pauseOnHover ? "pause-on-hover" : "",
    isBackend && pauseInEditor ? "is-paused" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={trackClasses}
      style={{
        "--btb-marquee-duration": `${speed}s`,
        // The keyframes always translate the same way; reversing the animation
        // is what sends the cards the other way, and it keeps the seamless
        // wrap working in both directions.
        animationDirection: "right" === direction ? "reverse" : "normal",
      }}>
      {group()}
      {/* A second, identical group is what makes the scroll seamless: the
          animation translates the track by exactly one group's width, so the
          copy is already in place when it wraps.

          It used to be skipped in the editor, which left the track half as wide
          as the animation expected and the wall of testimonials jumping back to
          a gap. It now renders in both, and the editor marks the copy inert
          (see .marquee-group-dupe) so clicks always reach the first one. */}
      {group(true)}
    </div>
  );
};
export default Marquee;
