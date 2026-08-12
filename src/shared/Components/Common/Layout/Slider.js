import { Navigation, A11y, Autoplay, Mousewheel, Pagination, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import Default from '../Themes/Default';
import ThemeOne from '../Themes/ThemeOne';
import ThemeTwo from '../Themes/ThemeTwo';
import ThemeThree from '../Themes/ThemeThree';
import ThemeFour from '../Themes/ThemeFour';
import ThemeFive from '../Themes/ThemeFive';
import ThemeSix from '../Themes/ThemeSix';

const Slider = ({ attributes = {}, itemsEls = [], itemProps = {}, isBackend = false, previewCols = 0, arrangement = '' }) => {
	const { items = [], slider = {}, columnGap = '30px', theme = 'default', columns = {}, layout, pauseInEditor = false } = attributes || {};
	const { desktop = 3, tablet = 2, mobile = 1 } = (columns && typeof columns === 'object') ? columns : { desktop: 3, tablet: 2, mobile: 1 };
	const { autoPlay = true, autoPlayDelay = 3, mouseWheel = true, navigation = true, coverRotate, coverDepth, coverScale, visibleSides = 1, cardWidth = '' } = (slider && typeof slider === 'object') ? slider : { autoPlay: true, mouseWheel: true, navigation: true };

	// The editor-only pause, so cards hold still while they are being styled.
	// Deliberately not folded into `autoPlay`: that one is a real setting and
	// would switch autoplay off on the published site too.
	const isPaused = isBackend && pauseInEditor;

	// Read from the arrangement, so a slider-3d block set to a plain slider gets
	// a plain slider instead of keeping the coverflow effect from its layout.
	const effective = arrangement || layout;
	const is3D = effective === 'slider-3d';
	const isCoverflow = effective === 'coverflow' || is3D;
	const spaceBetweenVal = parseInt( columnGap, 10 ) || 30;

	// Coverflow and 3D Slider are the same engine at two sets of numbers, so the
	// defaults live here per arrangement and a control only overrides the one it
	// touches. Left undefined until set, which is what lets switching arrangement
	// still move you between the two presets.
	const preset = is3D
		? { rotate: 0, depth: 300, scale: 0.85, modifier: 2 }
		: { rotate: 50, depth: 100, scale: 1, modifier: 1 };

	const pick = ( value, fallback ) =>
		( undefined === value || null === value || '' === value ) ? fallback : Number( value );

	const effectRotate = pick( coverRotate, preset.rotate );
	const effectDepth = pick( coverDepth, preset.depth );
	// Stored as a percentage, because a 0.85 slider is meaningless in the UI.
	const effectScale = undefined === coverScale || null === coverScale || '' === coverScale
		? preset.scale
		: Number( coverScale ) / 100;

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
	const rawSides = 'all' === visibleSides ? 3 : Number( visibleSides );
	const sideCards = Number.isFinite( rawSides ) ? Math.max( 0, rawSides ) : 1;
	const coverPerView = ( sideCards * 2 ) + 1;

	// Card Width overrides that split.
	//
	// Slides-per-view sets the slide width as a share of the track, so raising
	// the side-card count necessarily narrows every card -- at 3 a side they are
	// a seventh of the container each. Giving the slides an explicit width and
	// switching to slidesPerView 'auto' unpicks the two: width is then whatever
	// was asked for, and how many fit follows from it.
	const hasCardWidth = !! cardWidth && '0' !== String( parseInt( cardWidth, 10 ) );

	const maxPerView = isCoverflow
		? coverPerView
		: Math.max( Number( previewCols ) || 0, desktop, 1 );
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
	const minForLoop = ( maxPerView * 2 ) + 1;
	const repeats = items.length > 0 ? Math.max( 1, Math.ceil( minForLoop / items.length ) ) : 1;
	const isPadded = repeats > 1;

	// Each rendered slide keeps the index of the testimonial it came from, so a
	// repeat still reads and edits the original rather than a copy of it.
	const slideMap = Array.from(
		{ length: items.length * repeats },
		( _, i ) => i % items.length
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
			key={ `${ effective }-${ theme }-${ items.length }-${ spaceBetweenVal }-${ previewCols }-${ isPaused }-${ autoPlayDelay }-${ effectRotate }-${ effectDepth }-${ effectScale }-${ repeats }-${ sideCards }-${ cardWidth }` }
			modules={ [ Navigation, A11y, Autoplay, Mousewheel, Pagination, EffectCoverflow ] }
			effect={ isCoverflow ? 'coverflow' : undefined }
			// slideShadows stays off. Swiper paints them as an absolutely
			// positioned overlay filling the whole SLIDE box, which works for a
			// slide that is one flat image but not for these cards: the avatar
			// overhangs the top of the coloured card body, so the strip of slide
			// above the card had nothing behind it and the shadow showed there as
			// a grey rectangle floating over the layout. The cards carry their own
			// box-shadow, and the rotation and scale below already read as depth.
			coverflowEffect={ isCoverflow ? {
				rotate: effectRotate,
				stretch: 0,
				depth: effectDepth,
				scale: effectScale,
				modifier: preset.modifier,
				slideShadows: false,
			} : undefined }
			// Drives the fade-out of off-screen cards in the stylesheet. Only set
			// for the 3D arrangements; the flat slider shows every column it has.
			className={ isCoverflow ? `btb-cull${ hasCardWidth ? ' btb-fixed-w' : '' }` : undefined }
			// Read by the stylesheet as the slide width. Swiper measures the slides
			// themselves under slidesPerView 'auto', so this has to be real CSS on
			// the element rather than a Swiper parameter.
			style={ hasCardWidth ? { '--btb-slide-w': cardWidth } : undefined }
			// Required for Swiper to maintain .swiper-slide-visible, which is what
			// the stylesheet fades the off-screen cards with.
			watchSlidesProgress={ isCoverflow }
			centeredSlides={ isCoverflow }
			grabCursor={ true }
			loop={ items.length > 1 }
			// Coverflow overlaps its slides on purpose -- that overlap is the
			// effect. A gap between them holds the side slides away from the
			// centre one and flattens it into a plain slider that happens to be
			// rotated, so the column gap is not applied here.
			spaceBetween={ isCoverflow ? 0 : spaceBetweenVal }
			// In the editor follow the device buttons directly: Swiper's
			// breakpoints measure the window by default, so inside a non-iframed
			// canvas they report the desktop width whichever device is picked.
			// Coverflow takes its count from Visible Side Cards, not from Columns:
			// on a 3D carousel "how many cards flank the active one" is the real
			// question, and it should not change with the device the way a grid's
			// column count does.
			slidesPerView={ isCoverflow ? ( hasCardWidth ? 'auto' : coverPerView ) : ( isBackend ? ( previewCols || desktop ) : mobile ) }
			// min-width breakpoints, so these are the CSS max-widths in
			// _devices.scss plus one -- keeps the slider in step with the grids.
			breakpoints={ isCoverflow || isBackend ? undefined : { 641: { slidesPerView: tablet }, 1025: { slidesPerView: desktop } } }
			autoplay={ autoPlay && ! isPaused ? { delay: ( Number( autoPlayDelay ) || 3 ) * 1000, disableOnInteraction: false } : false }
			mousewheel={ mouseWheel }
			navigation={ navigation }
			// A repeated list means one bullet per rendered slide, which would show
			// more dots than there are testimonials. dynamicBullets keeps the
			// strip short rather than advertising the padding.
			pagination={ { clickable: true, dynamicBullets: isPadded } }
		>
			{ slideMap.map( ( index, slideIndex ) => {
				const item = items[ index ];
				const itemProp = { item, index, itemEls: itemsEls?.[ index ] || {}, ...itemProps };

				let content;
				switch ( theme ) {
					case 'theme_1':
						content = <ThemeOne { ...itemProp } />;
						break;
					case 'theme_2':
						content = <ThemeTwo { ...itemProp } />;
						break;
					case 'theme_3':
						content = <ThemeThree { ...itemProp } />;
						break;
					case 'theme_4':
						content = <ThemeFour { ...itemProp } />;
						break;
					case 'theme_5':
						content = <ThemeFive { ...itemProp } />;
						break;
					case 'theme_6':
						content = <ThemeSix { ...itemProp } />;
						break;
					default:
						content = <Default { ...itemProp } />;
						break;
				}

				// Keyed by position, not by testimonial: once the list is repeated
				// the same index appears several times, and reusing it would give
				// React duplicate keys.
				return (
					<SwiperSlide key={ slideIndex }>
						{ content }
					</SwiperSlide>
				);
			} ) }
		</Swiper>
	);
};

export default Slider;