const Marquee = ({ items, themeSelect, columnGap }) => {
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

  return (
    <div className="marquee-track">
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
