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
 * @param {boolean}  props.autoplay    Start the embed as soon as the click swaps it in.
 * @param {boolean}  props.loop        Repeat the video once it ends.
 * @param {boolean}  props.muted       Start muted.
 * @param {boolean}  props.controls    Show the player's native controls.
 * @param {Function} props.SandBox     `@wordpress/components`' SandBox, passed in
 *                                     by the editor only -- see below. The front
 *                                     end must not pull wp-components in, so it
 *                                     is injected the way Layout.js already takes
 *                                     RichText and MediaUpload.
 */
const VideoCard = ({
  item,
  accentColor,
  playIcon = {},
  autoplay = true,
  loop = false,
  muted = false,
  controls = true,
  SandBox,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const embedHtml = item?.videoUrl
    ? getVideoEmbed(item.videoUrl, { autoplay, loop, muted, controls })
    : "";

  /*
   * SandBox is only for the iframe embeds. It is here to solve one problem --
   * a YouTube or Vimeo player in the canvas gets no Referer and answers with
   * Error 153 (see the note further down) -- and a self-hosted file has no
   * such problem: getVideoEmbed returns a plain <video> for anything that is
   * not YouTube or Vimeo, and it is served from this site.
   *
   * Sending it through SandBox actively broke it. The sandbox document is a
   * document of its own, so .video-frame's `video { position: absolute; inset:
   * 0; width: 100%; height: 100% }` cannot reach inside it, and the only
   * sizing left is SandBox's own `wp-has-aspect-ratio` rule -- which names
   * `html`, `body`, `body > div` and `body > div iframe`, and no `video`. The
   * file rendered at its intrinsic size in the corner of the card while the
   * published page, which never had SandBox, looked right.
   */
  const isIframeEmbed = /^s*<iframe/i.test(embedHtml);
  const useSandbox = Boolean(SandBox) && isIframeEmbed;

  const fillStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    inset: 0,
  };

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
          /*
           * Two separate elements rather than one with a spread, because a React
           * element may carry `dangerouslySetInnerHTML` or children, never both --
           * and `{useSandbox && <SandBox/>}` is a child even when it is `false`.
           * (`{SandBox && ...}` got away with it only because on the front end
           * SandBox is `undefined`, which React drops, while `false` it counts.
           * Caught in the editor as "Minified React error #60".)
           */
          useSandbox ? (
            <div className="video-embed-container" style={fillStyle}>
              {/* In the editor an iframe embed has to go through SandBox.
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
              <SandBox
                html={embedHtml}
                allowSameOrigin
                type="wp-has-aspect-ratio"
                title={item?.name ? `${item.name} video` : "Video testimonial"}
              />
            </div>
          ) : (
            <div
              className="video-embed-container"
              style={fillStyle}
              dangerouslySetInnerHTML={{ __html: embedHtml }}
            />
          )
        ) : (
          <span
            className="video-play"
            style={accentColor ? { color: accentColor } : undefined}>
            <BlockIcon
              icon={playIcon}
              size={26}
              defaultColor="currentColor"
              renderFallback={(color, box) => (
                <svg viewBox="0 0 24 24" width={box} height={box} fill={color}>
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
