import { useState } from "react";

import BlockIcon from "./BlockIcon";
import { getVideoEmbed } from "../../utils/functions";

/**
 * One video testimonial: poster, play button, and the embed once it is clicked.
 *
 * Lifted out of Layout.js so the Video Testimonials block's own editor can use
 * it too. That editor had hand-written its own copy of this markup with no state
 * and no click handler at all, so a video could never be played while editing --
 * the play button was a picture of a play button. Sharing the component is what
 * stops the two drifting apart again.
 *
 * The embed is injected on click rather than up front: a grid of YouTube iframes
 * would load a player per card before anyone asked for one.
 *
 * @param {Object} props
 * @param {Object} props.item        Video item: { videoUrl, poster, name, deg, company }.
 * @param {string} props.accentColor Colour for the play glyph.
 * @param {Object} props.playIcon    Icon slot from the Icon panel.
 */
const VideoCard = ({ item, accentColor, playIcon = {} }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedHtml = item?.videoUrl ? getVideoEmbed(item.videoUrl) : "";

  const play = () => {
    if (embedHtml) {
      setIsPlaying(true);
    }
  };

  return (
    <div className="video-item">
      <div
        className={`video-frame ${isPlaying ? "is-playing" : ""}`}
        style={
          !isPlaying && item?.poster?.url
            ? { backgroundImage: `url(${item.poster.url})` }
            : undefined
        }
        data-embed={embedHtml}
        onClick={play}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && embedHtml) {
            e.preventDefault();
            play();
          }
        }}>
        {isPlaying ? (
          <div
            className="video-embed-container"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              inset: 0,
            }}
            dangerouslySetInnerHTML={{ __html: embedHtml }}
          />
        ) : (
          <span
            className="video-play"
            style={accentColor ? { color: accentColor } : undefined}>
            <BlockIcon
              icon={playIcon}
              size={26}
              defaultColor="currentColor"
              renderFallback={(color) => (
                <svg viewBox="0 0 24 24" width="26" height="26" fill={color}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            />
          </span>
        )}
      </div>
      <div className="video-meta">
        {item?.name && <h3 className="name">{item.name}</h3>}
        {(item?.deg || item?.company) && (
          <p className="deg">
            {[item?.deg, item?.company].filter(Boolean).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
