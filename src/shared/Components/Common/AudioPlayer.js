import { useEffect, useRef, useState } from "react";

import BlockIcon, { resolveIconColor } from "./BlockIcon";

/**
 * The player above each Audio Testimonials card.
 *
 * This was previously a picture of a player: a static play glyph and ten
 * fixed-height bars, with no `<audio>` element and no per-item audio field
 * anywhere in the block. Nothing could be uploaded and nothing could be played,
 * in the editor or on the front end.
 *
 * The bars double as the scrub track -- the layout has no room for a separate
 * progress bar, and a waveform that fills as the clip plays is what the design
 * was already imitating.
 *
 * @param {Object}   props
 * @param {string}   props.src         Audio file URL. Without one the player
 *                                     renders disabled rather than disappearing,
 *                                     so the card keeps its shape.
 * @param {Object}   props.playIcon  Icon slot from the Icon panel.
 * @param {boolean} props.isBackend Whether this is the editor render.
 */

// Deterministic bar heights: a waveform generated per render would jump about on
// every state change, and Math.random() in the editor would also make the block
// look dirty to the change detector.
const BARS = [35, 55, 25, 65, 45, 70, 30, 60, 40, 50];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const AudioPlayer = ({ src = "", playIcon = {}, isBackend }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // A card can be removed, or its file swapped, while the clip is playing.
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !src) {
      return;
    }

    if (audio.paused) {
      // Pause every other card first: several testimonials playing at once is
      // never what a click on one of them meant.
      document.querySelectorAll("audio.btb-audio-el").forEach((el) => {
        if (el !== audio) {
          el.pause();
        }
      });
      // A rejected play() (autoplay policy, missing file) must not leave the
      // button stuck showing "pause".
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width) {
      return;
    }
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
    setCurrentTime(audio.currentTime);
  };

  const nudge = (delta) => {
    const audio = audioRef.current;
    if (!audio || !duration) {
      return;
    }
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + delta));
    setCurrentTime(audio.currentTime);
  };

  return (
    <div
      className={`btb-audio-player ${isPlaying ? "is-playing" : ""} ${
        src ? "" : "is-empty"
      }`}>
      <button
        type="button"
        className="btb-audio-toggle"
        onClick={toggle}
        disabled={!src}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        style={{ color: resolveIconColor(playIcon) }}>
        {/* The pause glyph is drawn here rather than through BlockIcon, and
            takes its colour from the same Icon-panel slot the play glyph
            resolves through -- otherwise the button would change colour the
            moment it was pressed. */}
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
            <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.1" />
            <path
              fill="currentColor"
              d="M9.5 7.5h1.8v9H9.5v-9zm3.2 0h1.8v9h-1.8v-9z"
            />
          </svg>
        ) : (
          <BlockIcon
            icon={playIcon}
            size={40}
            renderFallback={(color) => (
              <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                <circle cx="12" cy="12" r="11" fill={color} opacity="0.1" />
                <path
                  fill={color}
                  d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"
                />
              </svg>
            )}
          />
        )}
      </button>

      {/* The waveform is the scrub track, so it carries the slider contract
          rather than being decoration beside a hidden one. */}
      <div
        className="btb-audio-wave"
        onClick={src ? seek : undefined}
        role="slider"
        tabIndex={src ? 0 : -1}
        aria-label="Seek audio"
        aria-valuemin={0}
        aria-valuemax={Math.round(duration)}
        aria-valuenow={Math.round(currentTime)}
        aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
        onKeyDown={(e) => {
          if ("ArrowRight" === e.key) {
            e.preventDefault();
            nudge(5);
          } else if ("ArrowLeft" === e.key) {
            e.preventDefault();
            nudge(-5);
          } else if ("Enter" === e.key || " " === e.key) {
            e.preventDefault();
            toggle();
          }
        }}>
        {BARS.map((h, i) => (
          <div
            key={i}
            className={`btb-wave-bar ${
              progress > 0 && i / BARS.length < progress ? "is-played" : ""
            }`}
            style={{ height: `${h}%` }}></div>
        ))}
      </div>

      {src && duration > 0 && (
        <span className="btb-audio-time">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      )}

      {src ? (
        // No <track>: the block stores a single media URL per card and has no
        // field for a caption file, so an empty track element would advertise
        // captions that do not exist.
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <audio
          ref={audioRef}
          className="btb-audio-el"
          src={src}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        />
      ) : (
        isBackend && (
          <span className="btb-audio-hint">Add an audio file in the sidebar</span>
        )
      )}
    </div>
  );
};

export default AudioPlayer;
