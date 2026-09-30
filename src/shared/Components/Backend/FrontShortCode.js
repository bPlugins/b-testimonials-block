import { useRef } from "react";
import { __ } from "@wordpress/i18n";

const FrontShortCode = ({ shortCode }) => {
  const inputRef = useRef(null);
  const tooltip = useRef(null);

  const handleCopyShortCode = () => {
    const input = inputRef.current;
    if (input) {
      input.select();
      navigator.clipboard.writeText(shortCode).then(() => {
        if (tooltip.current) {
          tooltip.current.innerHTML = __("Copied Successfully!", "b-testimonials-block");
          setTimeout(() => {
            if (tooltip.current) {
              tooltip.current.innerHTML = __("Copy To Clipboard", "b-testimonials-block");
            }
          }, 1500);
        }
      });
    }
  };

  return (
    <div className="btbShortcodeBar">
      <div className="btbShortcodeInputGroup">
        <input ref={inputRef} readOnly value={shortCode} />
        <button type="button" onClick={handleCopyShortCode} className="btbShortcodeCopy">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          <span ref={tooltip} className="btbShortcodeTooltip">
            {__("Copy To Clipboard", "b-testimonials-block")}
          </span>
        </button>
      </div>
      <span className="btbShortcodeLabel">
        {__(
          "Copy this Block Shortcode and use it anywhere — it's different from the Classic Shortcode for a single testimonial in All Testimonials.",
          "b-testimonials-block",
        )}
      </span>
    </div>
  );
};
export default FrontShortCode;
