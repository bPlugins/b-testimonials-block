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
 * @param {Object}   props
 * @param {Object}   props.item        Video item: { videoUrl, poster, name, deg, company }.
 * @param {string}   props.accentColor Colour for the play glyph.
 * @param {Object}   props.playIcon    Icon slot from the Icon panel.
 * @param {Function} props.SandBox     `@wordpress/components`' SandBox, passed in
 *                                     by the editor only -- see below. The front
 *                                     end must not pull wp-components in, so it
 *                                     is injected the way Layout.js already takes
 *                                     RichText and MediaUpload.
 */
const VideoCard = ({ item, accentColor, playIcon = {}, SandBox }) => {
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
            {...(SandBox ? {} : { dangerouslySetInnerHTML: { __html: embedHtml } })}>
            {/* In the editor the embed has to go through SandBox.
                WordPress renders the canvas as an iframe whose document is a
                `blob:` URL, and Chrome sends no Referer from a blob: document --
                so a YouTube player dropped straight into the canvas answers with
                "Error 153: Video player configuration error" and never plays.
                Measured, not guessed: the same iframe markup requested from the
                canvas carries no `Referer` header, while core's embed block
                carries `http://localhost:8881/`.

                SandBox writes its document from the parent admin frame, which
                gives that document the admin page's URL instead of the blob one,
                so the player gets a referrer and loads. The front end has no
                blob document and no wp-components, and keeps the plain embed. */}
            {/* `type` becomes the class on the sandbox document's html and body,
                and SandBox's own stylesheet only stretches the embed to fill
                under `wp-has-aspect-ratio` -- without it the player renders at
                its intrinsic size in the corner of the card. Core's embed block
                passes the same class for the same reason. */}
            {/* `allowSameOrigin` is what makes the referrer work, and is not
                optional here: without it SandBox renders the `srcdoc` variant,
                whose document inherits the canvas's `blob:` URL and so sends no
                Referer -- the same Error 153 as before. With it, SandBox writes
                the document from the parent admin frame and it inherits the
                admin page's URL instead. Core's embed block passes it too. */}
            {SandBox && (
              <SandBox
                html={embedHtml}
                allowSameOrigin
                type="wp-has-aspect-ratio"
                title={item?.name ? `${item.name} video` : "Video testimonial"}
              />
            )}
          </div>
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
