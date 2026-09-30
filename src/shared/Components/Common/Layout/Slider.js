import {
  Navigation,
  A11y,
  Autoplay,
  Mousewheel,
  Pagination,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import Default from "../Themes/Default";
import ThemeOne from "../Themes/ThemeOne";
import ThemeTwo from "../Themes/ThemeTwo";
import ThemeThree from "../Themes/ThemeThree";
import ThemeFour from "../Themes/ThemeFour";
import ThemeFive from "../Themes/ThemeFive";
import ThemeSix from "../Themes/ThemeSix";

const Slider = ({
  attributes = {},
  itemsEls = [],
  itemProps = {},
  isBackend = false,
  previewCols = 0,
  previewDevice = "Desktop",
  arrangement = "",
}) => {
  const {
    items = [],
    slider = {},
    columnGap = "30px",
    theme = "default",
    columns = {},
    layout,
    pauseInEditor = false,
  } = attributes || {};
  const {
    desktop = 3,
    tablet = 2,
    mobile = 1,
  } = columns && typeof columns === "object"
    ? columns
    : { desktop: 3, tablet: 2, mobile: 1 };
  const {
    autoPlay = true,
    autoPlayDelay = 3,
    mouseWheel = true,
    navigation = true,
    loop = true,
    coverRotate,
    coverDepth,
    coverScale,
    coverStretch,
    slideShadows = false,
    visibleSides = 1,
    cardWidth = "",
  } = slider && typeof slider === "object"
    ? slider
    : { autoPlay: true, mouseWheel: true, navigation: true, loop: true };

  // The editor-only pause, so cards hold still while they are being styled.
  // Deliberately not folded into `autoPlay`: that one is a real setting and
  // would switch autoplay off on the published site too.
  const isPaused = isBackend && pauseInEditor;

  // Read from the arrangement, so a slider-3d block set to a plain slider gets
  // a plain slider instead of keeping the coverflow effect from its layout.
  const effective = arrangement || layout;
  const is3D = effective === "slider-3d";
  const isCoverflow = effective === "coverflow" || is3D;
  const spaceBetweenVal = parseInt(columnGap, 10) || 30;

  // Coverflow and 3D Slider are the same engine at two sets of numbers, so the
  // defaults live here per arrangement and a control only overrides the one it
  // touches. Left undefined until set, which is what lets switching arrangement
  // still move you between the two presets.
  const preset = is3D
    ? { rotate: 0, depth: 300, scale: 0.85, modifier: 2 }
    : { rotate: 50, depth: 100, scale: 1, modifier: 1 };

  const pick = (value, fallback) =>
    undefined === value || null === value || "" === value
      ? fallback
      : Number(value);

  const effectRotate = pick(coverRotate, preset.rotate);
  const effectDepth = pick(coverDepth, preset.depth);
  // How far apart the cards are pushed along the track before the rotation is
  // applied. This is the coverflow effect's own spacing parameter, not
  // `spaceBetween` -- which is forced to 0 below, because a real gap holds the
  // side cards away from the centre one and flattens the effect into a plain
  // rotated slider. Stretch moves them without breaking the overlap, so it is
  // the knob a coverflow actually has for "further apart", and it was fixed at
  // 0 with nothing in the sidebar to change it. Negative values overlap them
  // harder, which is the tight fanned-deck look.
  const effectStretch = pick(coverStretch, 0);
  // Stored as a percentage, because a 0.85 slider is meaningless in the UI.
  const effectScale =
    undefined === coverScale || null === coverScale || "" === coverScale
      ? preset.scale
      : Number(coverScale) / 100;

  // How many cards flank the active one, as a plain count the user sets.
  //
  // This is the slides-per-view for coverflow rather than a separate culling
  // rule: laying out exactly 2n+1 slides means Swiper itself decides which are
  // on screen and tags the rest, instead of us trying to work it out. Earlier
  // attempts that guessed via sibling selectors, or added a class from JS that
  // React then wiped, both misfired -- Swiper maintains .swiper-slide-visible
  // on every update, so it cannot fall out of sync.
  //
  // 'all' is the old select's value; treated as 3 so those blocks keep working.
  const rawSides = "all" === visibleSides ? 3 : Number(visibleSides);
  const sideCards = Number.isFinite(rawSides) ? Math.max(0, rawSides) : 1;
  const coverPerView = sideCards * 2 + 1;

  // Card Width overrides that split.
  //
  // Slides-per-view sets the slide width as a share of the track, so raising
  // the side-card count necessarily narrows every card -- at 3 a side they are
  // a seventh of the container each. Giving the slides an explicit width and
  // switching to slidesPerView 'auto' unpicks the two: width is then whatever
  // was asked for, and how many fit follows from it.
  const hasCardWidth = !!cardWidth && "0" !== String(parseInt(cardWidth, 10));

  // Coverflow has to come down on a narrow screen.
  //
  // Visible Side Cards is deliberately not a per-device setting -- "how many
  // cards flank the active one" is the shape of the effect, not a column count.
  // But the count alone decides the slide width, so 1 card a side stayed three
  // slides wide at every size: measured on a 420px phone that is a 101px slide
  // holding 147px of content, spilling out of the card and unreadable.
  //
  // Fractional caps rather than a whole number, so the neighbours still peek in
  // from the edges and the effect survives at the smaller sizes instead of
  // collapsing to a plain one-up slider.
  const perViewCap = (device) => {
    if ("Mobile" === device) {
      return 1.4;
    }
    if ("Tablet" === device) {
      return 2.4;
    }
    return coverPerView;
  };

  // The editor follows the device buttons; the front end uses breakpoints
  // below, so it starts from the desktop count.
  const coverPerViewNow = isBackend
    ? Math.min(coverPerView, perViewCap(previewDevice))
    : coverPerView;

  const maxPerView = isCoverflow
    ? coverPerView
    : Math.max(Number(previewCols) || 0, desktop, 1);
  // Loop needs enough real slides to fill BOTH sides of the centred one --
  // Swiper reorders the slides it has rather than cloning without limit, so
  // short of that it can only pad one side, which left several cards to the
  // left of centre and one to the right.
  //
  // Rather than switch looping off below the threshold (symmetric, but with
  // hard ends, so the first and last slides look nothing like the middle ones),
  // the list is repeated until there are enough. Swiper then has real slides to
  // work with in both directions and the carousel is endless at any number of
  // testimonials.
  // Enough real slides to fill the view plus a full screen of buffer on BOTH
  // sides. At `maxPerView * 2 + 1` Swiper ran out of slides at the wrap and had
  // to hard-reset the track instead of sliding across it, which is the jump back
  // to the first card you could see once a cycle. Three screens' worth means the
  // reset always happens somewhere off-screen.
  const minForLoop = maxPerView * 3 + 1;
  // Swiper cannot loop a single slide -- asking it to warns and leaves the
  // slider stuck -- so the item count still overrides the setting.
  const isLooping = false !== loop && items.length > 1;
  // Only when looping. The repeat exists purely to give Swiper real slides to
  // reorder around the centre; with looping off it has nothing to do and the
  // block simply rendered every testimonial three times over, with a pagination
  // dot for each copy.
  const repeats =
    isLooping && items.length > 0
      ? Math.max(1, Math.ceil(minForLoop / items.length))
      : 1;
  const isPadded = repeats > 1;

  // Each rendered slide keeps the index of the testimonial it came from, so a
  // repeat still reads and edits the original rather than a copy of it.
  const slideMap = Array.from(
    { length: items.length * repeats },
    (_, i) => i % items.length,
  );

  return (
    <Swiper
      // Swiper resolves these once at init and caches them, so anything that
      // has to re-initialise the instance belongs in the key rather than
      // being left to a prop update:
      //
      // - `effective` because `effect` and `coverflowEffect` are init-time
      //   params. It used to be `layout`, which does not change when the
      //   arrangement does, so switching Slider -> Coverflow -> 3D Slider
      //   reused the running instance and the new effect never took. That is
      //   why an arrangement switch looked right sometimes and flat others:
      //   it depended on which one the block happened to mount with.
      // - previewCols, or a device switch keeps the previous slidesPerView.
      // - isPaused and the delay, or the old autoplay timer keeps running.
      // - the coverflow numbers, which are read once when the effect
      //   initialises, so dragging a slider would otherwise change nothing
      //   until the block remounted for some other reason.
      // - coverPerViewNow, so the editor's device buttons re-initialise the
      //   coverflow count. previewCols alone does not cover it: coverflow
      //   takes its count from Visible Side Cards, so switching to Mobile
      //   with the same column settings would not change the key at all.
      // - isLooping, because `loop` is an init-time param like the rest of
      //   these. Without it in the key the toggle did nothing at all: Swiper
      //   kept the instance it had already built and went on looping.
      // - autoPlay. The delay was already here but the on/off switch was not,
      //   so turning Autoplay back on in the editor changed nothing on screen
      //   -- Swiper had been built with `autoplay: false` and keeps that. The
      //   toggle looked broken, and a block could end up saved with autoplay
      //   off after flipping it twice to try to make it take.
      key={`${effective}-${theme}-${items.length}-${spaceBetweenVal}-${previewCols}-${isPaused}-${autoPlay}-${autoPlayDelay}-${effectRotate}-${effectDepth}-${effectScale}-${effectStretch}-${slideShadows}-${repeats}-${sideCards}-${cardWidth}-${coverPerViewNow}-${isLooping}`}
      modules={[
        Navigation,
        A11y,
        Autoplay,
        Mousewheel,
        Pagination,
        EffectCoverflow,
      ]}
      effect={isCoverflow ? "coverflow" : undefined}
      // slideShadows is off by default and opt-in through the Slider panel.
      //
      // Swiper paints them as an absolutely positioned overlay filling the
      // whole SLIDE box, which works for a slide that is one flat image but
      // not for these cards: on Theme 1 and Theme 4 the avatar overhangs the
      // top of the coloured card body, so the slide is 50px taller than the
      // card and the shadow showed in that strip as a grey rectangle floating
      // over the layout. That is why it was hardcoded off. The stylesheet now
      // insets the overlay by the same 50px on those two themes, so the
      // control can be offered without bringing the rectangle back.
      //
      // Still off unless asked for: the cards carry their own box-shadow, and
      // the rotation and scale below already read as depth.
      coverflowEffect={
        isCoverflow
          ? {
              rotate: effectRotate,
              stretch: effectStretch,
              depth: effectDepth,
              scale: effectScale,
              modifier: preset.modifier,
              slideShadows: !!slideShadows,
            }
          : undefined
      }
      // Drives the fade-out of off-screen cards in the stylesheet. Only set
      // for the 3D arrangements; the flat slider shows every column it has.
      className={
        isCoverflow
          ? `btb-cull${hasCardWidth ? " btb-fixed-w" : ""}`
          : undefined
      }
      // Read by the stylesheet as the slide width. Swiper measures the slides
      // themselves under slidesPerView 'auto', so this has to be real CSS on
      // the element rather than a Swiper parameter.
      style={hasCardWidth ? { "--btb-slide-w": cardWidth } : undefined}
      // Required for Swiper to maintain .swiper-slide-visible, which is what
      // the stylesheet fades the off-screen cards with.
      watchSlidesProgress={isCoverflow}
      centeredSlides={isCoverflow}
      grabCursor={true}
      // Looping was hardcoded on, so a slider could only ever run in a
      // circle -- there was no way to make one stop at the last review, and
      // with loop on the arrows never reach their disabled state either.
      // `loop` defaults to true, so a block saved before the control
      // existed keeps running exactly as it did.
      //
      // The item count still has the final say: Swiper cannot loop a single
      // slide, and asking it to warns in the console and leaves the slider
      // stuck.
      loop={isLooping}
      // Loop mode has to be told how many slides to keep in hand, because
      // `slidesPerView` above starts at the MOBILE count on the front end and
      // only reaches the desktop count once a breakpoint applies. Swiper works
      // its loop bookkeeping out at init, so it prepared a one-per-view loop and
      // then ran three per view: measured over 48s, `realIndex` kept counting
      // 6,7,8,0,1,2 exactly on schedule while `activeIndex` stuck at 6 with
      // `isEnd: true` -- the timer running normally against a track that could
      // no longer wrap. That is the "slides a few times then freezes".
      //
      // `maxPerView` is the largest count any breakpoint will ask for, so
      // reserving that many covers every size without depending on which one
      // happens to be active when Swiper initialises.
      // A full screen either side, not just one. With `maxPerView` the buffer
      // covered the slides coming into view but not the ones leaving it, so the
      // wrap still landed on the edge of what Swiper had prepared and snapped.
      loopAdditionalSlides={isLooping ? maxPerView * 2 : 0}
      // Coverflow overlaps its slides on purpose -- that overlap is the
      // effect. A gap between them holds the side slides away from the
      // centre one and flattens it into a plain slider that happens to be
      // rotated, so the column gap is not applied here.
      spaceBetween={isCoverflow ? 0 : spaceBetweenVal}
      // In the editor follow the device buttons directly: Swiper's
      // breakpoints measure the window by default, so inside a non-iframed
      // canvas they report the desktop width whichever device is picked.
      // Coverflow takes its count from Visible Side Cards, not from Columns:
      // on a 3D carousel "how many cards flank the active one" is the real
      // question, and it should not change with the device the way a grid's
      // column count does.
      slidesPerView={
        isCoverflow
          ? hasCardWidth
            ? "auto"
            : coverPerViewNow
          : isBackend
          ? previewCols || desktop
          : mobile
      }
      // min-width breakpoints, so these are the CSS max-widths in
      // _devices.scss plus one -- keeps the slider in step with the grids.
      //
      // Coverflow gets them too now. It used to opt out entirely, which is
      // what left its slides at the desktop count on a phone; the caps below
      // only ever lower that count, so a block asking for fewer side cards
      // than the cap keeps exactly what it asked for.
      breakpoints={
        isBackend
          ? undefined
          : isCoverflow
          ? hasCardWidth
            ? undefined
            : {
                0: {
                  slidesPerView: Math.min(coverPerView, perViewCap("Mobile")),
                },
                641: {
                  slidesPerView: Math.min(coverPerView, perViewCap("Tablet")),
                },
                1025: { slidesPerView: coverPerView },
              }
          : { 641: { slidesPerView: tablet }, 1025: { slidesPerView: desktop } }
      }
      autoplay={
        autoPlay && !isPaused
          ? {
              delay: (Number(autoPlayDelay) || 3) * 1000,
              disableOnInteraction: false,
            }
          : false
      }
      mousewheel={mouseWheel}
      navigation={navigation}
      // A repeated list means one bullet per rendered slide, which would show
      // more dots than there are testimonials. dynamicBullets keeps the
      // strip short rather than advertising the padding.
      pagination={{ clickable: true, dynamicBullets: isPadded }}>
      {slideMap.map((index, slideIndex) => {
        const item = items[index];
        const itemProp = {
          item,
          index,
          itemEls: itemsEls?.[index] || {},
          ...itemProps,
        };

        let content;
        switch (theme) {
          case "theme_1":
            content = <ThemeOne {...itemProp} />;
            break;
          case "theme_2":
            content = <ThemeTwo {...itemProp} />;
            break;
          case "theme_3":
            content = <ThemeThree {...itemProp} />;
            break;
          case "theme_4":
            content = <ThemeFour {...itemProp} />;
            break;
          case "theme_5":
            content = <ThemeFive {...itemProp} />;
            break;
          case "theme_6":
            content = <ThemeSix {...itemProp} />;
            break;
          default:
            content = <Default {...itemProp} />;
            break;
        }

        // Keyed by position, not by testimonial: once the list is repeated
        // the same index appears several times, and reusing it would give
        // React duplicate keys.
        return <SwiperSlide key={slideIndex}>{content}</SwiperSlide>;
      })}
    </Swiper>
  );
};

export default Slider;
