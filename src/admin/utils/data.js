const gridIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
const sliderIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" /><polyline points="15 12 19 12" /><polyline points="5 12 9 12" /></svg>;
const masonryIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>;
const tickerIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><polyline points="16 7 21 12 16 17" /></svg>;
const quoteIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 7H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3H4" /><path d="M19 7h-4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v3h-3" /></svg>;
const mediaIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><polygon points="10 8 16 12 10 16" /></svg>;
const chartIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="20" x2="4" y2="12" /><line x1="10" y1="20" x2="10" y2="4" /><line x1="16" y1="20" x2="16" y2="9" /><line x1="22" y1="20" x2="22" y2="15" /></svg>;
const shieldIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l7 3v5c0 4.4-3 8.4-7 10-4-1.6-7-5.6-7-10V6z" /><polyline points="9 12 11 14 15 10" /></svg>;
const feedbackIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><line x1="8" y1="9" x2="16" y2="9" /><line x1="8" y1="13" x2="13" y2="13" /></svg>;

// Getting Started Tab Icons (same as b-slider)
const gutenbergTabIcon = <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'><rect x='3' y='3' width='7' height='7' rx='1' /><rect x='14' y='3' width='7' height='7' rx='1' /><rect x='3' y='14' width='7' height='7' rx='1' /><rect x='14' y='14' width='7' height='7' rx='1' /></svg>;
const shortcodeTabIcon = <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={16} height={16} fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'><polyline points='16 18 22 12 16 6' /><polyline points='8 6 2 12 8 18' /></svg>;
const elementorTabIcon = <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={16} height={16} fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'><rect x='3' y='3' width='18' height='18' rx='2' /><line x1='9' y1='3' x2='9' y2='21' /></svg>;
const phpTabIcon = <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={16} height={16} fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' /><polyline points='14 2 14 8 20 8' /><line x1='9' y1='15' x2='15' y2='15' /></svg>;


import welcomeBanner from '../assets/welcomeBanner';
import { CHILD_BLOCKS_LIST } from '../../shared/utils/childBlocks';
import { blockIcon, getLayoutSvgIcon } from '../../shared/utils/icons';

const slug = 'b-testimonial';

/**
 * The icon for one demo card, by preview slug.
 *
 * Each card used to draw its category's icon, so all seven Grids & Lists demos
 * carried the same four-square glyph and the tile told you nothing the category
 * chip underneath it did not already say. These come from CHILD_BLOCKS_LIST --
 * the same list the block inserter and the canvas picker draw from -- so a block
 * looks like itself everywhere it appears.
 *
 * `b-testimonials` is the parent container and has no entry in that list, so it
 * takes the icon the block API already gives it in the inserter. Left to the
 * component's fallback it drew its category's four-square glyph -- the same icon
 * as the Minimalist Reviews Grid card two along from it.
 *
 * @param {string} demoSlug Preview slug, i.e. the block name after `bptmb/`.
 * @return {JSX.Element} Icon element.
 */
const demoBlockIcon = ( demoSlug ) => {
	const child = CHILD_BLOCKS_LIST.find( ( block ) => block.name === `bptmb/${ demoSlug }` );

	// 20px to match the category icons this replaces, which the card's own CSS
	// then sizes to 22px alongside them.
	return child ? getLayoutSvgIcon( child.icon, 20 ) : blockIcon.src;
};

export const dashboardInfo = (info) => {
	const { version, isPremium, hasPro, adminUrl, demoBase = '/', licenseActiveNonce, deleteDataOnUninstall = false, uninstallNonce = '' } = info;
	const proSuffix = isPremium ? ' Pro' : '';

	return {
		/*
		 * "Testimonials", not the plugin's registered "B Testimonials Block".
		 *
		 * This is the name the dashboard prints in three places -- the header
		 * wordmark, "Welcome to {name}" on the Welcome page, and "See the {name} in
		 * action" on Demos -- and next to the bPlugins mark in every one of them the
		 * "B" and the "Block" are saying what the surrounding chrome already says.
		 * The plugin's real name is untouched everywhere it identifies the plugin
		 * rather than decorates a heading: the Plugin Name header, the readme title,
		 * the block titles and `slug` below.
		 */
		name: `Testimonials${proSuffix}`,
		displayName: `B Testimonials Block${proSuffix} - Show Customer Reviews, Ratings, Badges & Video Testimonials`,
		description: 'Testimonials is a WordPress plugin that lets you showcase customer reviews, star ratings, video testimonials, trust badges, and interactive feedback forms.',
		slug,
		version,
		isPremium,
		hasPro,
		// Drives the Header's own "Our Plugins" button in the top-right corner.
		// It links to `#our-plugins`, so the matching route in App.js has to stay
		// even though the page is deliberately absent from the nav.
		displayOurPlugins: true,
		media: {
			logo: `https://ps.w.org/b-testimonial/assets/icon-128x128.png`,
			banner: `https://ps.w.org/b-testimonial/assets/banner-772x250.png`,
			// The Welcome hero's artwork. Vector and bundled -- see the module
			// for why it is a string rather than an imported .svg.
			thumbnail: welcomeBanner,
			// video: 'https://www.youtube.com/watch?v=DOvUG5ArWHE&t=3s',
			isYoutube: true,
		},
		pages: {
			org: `https://wordpress.org/plugins/${slug}/`,
			docs: `https://bplugins.com/docs/${slug}/`,
			pricing: `https://bplugins.com/products/${slug}/pricing`,
		},
		adminUrl,
		// Reaches App, which hands it to demoInfo() for the preview URLs.
		demoBase,
		licenseActiveNonce,
		deleteDataOnUninstall,
		uninstallNonce,
		startButton: {
			label: 'Add Testimonial Block',
			url: `${adminUrl}post-new.php?post_type=page`,
		},
	};
};

/**
 * Live demos, one per block.
 *
 * Every block the plugin registers is listed here -- the page previously showed
 * 9 hand-picked demos out of 40, so most blocks had no entry at all.
 *
 * The previews are rendered by this install, not fetched from a demo site:
 * `includes/demo-preview.php` answers `?bpbtb_demo=<slug>` with the real block.
 * The external host these used to point at (b-testimonials.bplugins.com) has no
 * DNS record, so every one of them opened an unreachable page -- and a working
 * external site would still drift out of step with the blocks over time. Local
 * previews are live, interactive, and cannot go stale.
 *
 * Each slug is the block name after the `bptmb/` prefix, which is what
 * demo-preview.php looks up in the block registry. That is usually the
 * directory name under src/blocks/, but not always: `src/blocks/testimonials`
 * registers `bptmb/b-testimonials`.
 */
const demoGroups = [
	{
		icon: gridIcon,
		title: 'Grids & Lists',
		blocks: [
			// `bptmb/b-testimonials`, not `bptmb/testimonials` -- the one block
			// whose registered name differs from its directory.
			[ 'b-testimonials', 'B Testimonials Block' ],
			[ 'testimonials-grid-2', 'Centered Cards Grid' ],
			[ 'testimonials-grid-3', 'Gradient Border Grid' ],
			[ 'testimonials-grid-minimal', 'Minimalist Reviews Grid' ],
			[ 'testimonials-list', 'Testimonials List' ],
			[ 'testimonials-compact', 'Compact Reviews List' ],
			[ 'testimonials-avatar-list', 'Avatar Reviews List' ],
		],
	},
	{
		icon: masonryIcon,
		title: 'Masonry & Stacks',
		blocks: [
			[ 'testimonials-masonry', 'Testimonials Masonry' ],
			[ 'testimonials-card-stack', 'Stacked Review Cards' ],
			[ 'testimonials-floating-bubble', 'Floating Avatar Bubbles' ],
		],
	},
	{
		icon: sliderIcon,
		title: 'Sliders & Carousels',
		blocks: [
			[ 'testimonials-slider', 'Testimonials Slider' ],
			[ 'testimonials-carousel-2', 'Coverflow Carousel' ],
			[ 'testimonials-slider-3d', '3D Flip Perspective Carousel' ],
		],
	},
	{
		icon: tickerIcon,
		title: 'Marquee & Toasts',
		blocks: [
			[ 'testimonials-marquee', 'Testimonials Marquee' ],
			[ 'social-proof-toast', 'Social Proof Toast' ],
		],
	},
	{
		icon: quoteIcon,
		title: 'Spotlight & Story',
		blocks: [
			[ 'testimonials-hero', 'Hero Testimonial Spotlight' ],
			[ 'testimonials-quote-box', 'Quote Box Showcase' ],
			[ 'testimonials-speech-bubble', 'Speech Bubble Cards' ],
			[ 'testimonials-timeline', 'Customer Journey Timeline' ],
			[ 'case-study-card', 'Customer Case Study' ],
		],
	},
	{
		icon: mediaIcon,
		title: 'Video & Audio',
		blocks: [
			[ 'video-testimonials', 'Video Testimonials' ],
			[ 'audio-testimonials', 'Audio Testimonials' ],
			[ 'before-after', 'Before / After' ],
		],
	},
	{
		icon: chartIcon,
		title: 'Ratings & Stats',
		blocks: [
			[ 'rating-summary', 'Rating Summary' ],
			[ 'star-rating-bars', 'Star Rating Progress Bars' ],
			[ 'testimonial-stats', 'Testimonial Stats' ],
			[ 'comparison-testimonial-table', 'Comparison Review Table' ],
		],
	},
	{
		icon: shieldIcon,
		title: 'Badges & Trust',
		blocks: [
			[ 'google-review-badge', 'Google Reviews Badge' ],
			[ 'facebook-review-badge', 'Facebook Recommendation Badge' ],
			[ 'g2-review-badge', 'G2 Review Badge' ],
			[ 'capterra-review-badge', 'Capterra Score Badge' ],
			[ 'trustpilot-review-badge', 'Trustpilot Score Badge' ],
			[ 'review-badge-widget', 'Floating Review Badge' ],
			[ 'verified-buyer-badge', 'Verified Buyer Trust Seal' ],
			[ 'trust-badges', 'Trust Badges' ],
			[ 'client-logos', 'Client Logos' ],
		],
	},
	{
		icon: feedbackIcon,
		title: 'Feedback & Forms',
		blocks: [
			[ 'testimonial-form', 'Testimonial Form' ],
			[ 'user-feedback-poll', 'Feedback & NPS Poll' ],
			[ 'faq-testimonial-accordion', 'FAQ Review Accordion' ],
			[ 'testimonials-popup-modal', 'Popup Modal Review Trigger' ],
		],
	},
];

/**
 * @param {string} demoBase Site home URL, passed through from home_url( '/' ).
 */
export const demoInfo = ( demoBase = '/' ) => ( {
	allInOneLabel: 'Browse All Blocks',
	// The plugin's own block list, rather than an off-site demo index.
	allInOneLink: `${ demoBase }wp-admin/edit.php?post_type=testimonial&page=bpbtb-dashboard#/welcome`,
	demos: demoGroups.map( ( { icon, title, blocks } ) => ( {
		icon,
		title,
		children: blocks.map( ( [ slug, label ] ) => ( {
			title: label,
			type: 'iframe',
			url: `${ demoBase }?bpbtb_demo=${ slug }`,
			// The block's own icon rather than this group's -- see demoBlockIcon().
			icon: demoBlockIcon( slug ),
		} ) ),
	} ) ),
} );


export const welcomeInfo = (adminUrl) => ({
	keywords: ['Grid', 'Slider', 'Video', 'Form', 'Badges'],
	keywordsLabel: 'Select Testimonial Layout',
	gettingStarted: {
		tabs: [
			{
				key: 'gutenberg',
				label: 'Gutenberg',
				icon: gutenbergTabIcon,
				steps: [
					{
						num: 1,
						title: 'Add the B Testimonials Block',
						body: 'Open the block editor on any post or page. Click the <strong>+</strong> icon in the top-left corner or type <strong>/b testimonials</strong> to find and insert the B Testimonials block.',
						link: { url: `${adminUrl}post-new.php?post_type=page`, label: 'Open Editor' },
					},
					{
						num: 2,
						title: 'Choose Layout & Child Block',
						body: 'Select from <strong>40+ modern layouts</strong> (Grid, Slider, Video, Marquee, Rating Summary, Feedback Form) on the canvas or via the Popup Modal.',
					},
					{
						num: 3,
						title: 'Configure Content Source',
						body: 'Choose between <strong>Manual Items</strong> or <strong>Testimonials CPT</strong> (reusable testimonials managed under Testimonials menu).',
					},
					{
						num: 4,
						title: 'Publish',
						body: 'Once everything is configured, click Publish. Make sure you have entered the <strong>Name</strong>, <strong>Designation</strong>, <strong>Review Text</strong>, and <strong>Rating</strong>.',
					},
				],
			},
			{
				key: 'shortcode',
				label: 'ShortCode',
				icon: shortcodeTabIcon,
				steps: [
					{
						num: 1,
						title: 'Open Testimonials CPT',
						body: 'Go to <strong>Testimonials &rsaquo; All Testimonials</strong> in your WordPress admin and click <strong>Add New</strong>.',
						link: { url: `${adminUrl}edit.php?post_type=testimonial`, label: 'All Testimonials' },
					},
					{
						num: 2,
						title: 'Add Testimonial Details',
						body: 'Fill in the <strong>Name</strong> (title), <strong>Review Text</strong> (content), <strong>Rating</strong>, <strong>Designation</strong>, and <strong>Company</strong> fields. Set a featured image for the avatar photo.',
					},
					{
						num: 3,
						title: 'Add the Gutenberg Block',
						body: 'Open any page in the block editor. Insert the <strong>B Testimonials</strong> block, pick your layout, and set the data source to <strong>Testimonials CPT</strong>.',
					},
					{
						num: 4,
						title: 'Publish & Preview',
						body: 'Click <strong>Publish</strong>. Your testimonials from the CPT will be rendered automatically using the chosen layout.',
					},
				],
			},
			{
				key: 'elementor',
				label: 'Elementor',
				icon: elementorTabIcon,
				steps: [
					{
						num: 1,
						title: 'Create Testimonials',
						body: 'Go to <strong>Testimonials &rsaquo; All Testimonials</strong>, click <strong>Add New</strong>, fill in the details (name, rating, review, designation), and publish.',
						link: { url: `${adminUrl}edit.php?post_type=testimonial`, label: 'All Testimonials' },
					},
					{
						num: 2,
						title: 'Add a Shortcode Widget',
						body: 'Open the Elementor editor on any page. Search for the <strong>Shortcode</strong> widget and drag it to your desired location on the canvas.',
					},
					{
						num: 3,
						title: 'Enter & Preview',
						body: 'Paste the block shortcode or use the <strong>Gutenberg Block</strong> widget in Elementor to embed the B Testimonials block directly.',
					},
				],
			},
			{
				key: 'php',
				label: 'Theme / PHP',
				icon: phpTabIcon,
				steps: [
					{
						num: 1,
						title: 'Create Testimonials',
						body: 'Go to <strong>Testimonials &rsaquo; All Testimonials</strong>, click <strong>Add New</strong>, configure your testimonial details, then publish.',
						link: { url: `${adminUrl}edit.php?post_type=testimonial`, label: 'All Testimonials' },
					},
					{
						num: 2,
						title: 'Open Your Template',
						body: 'Open the theme template file where you want to display testimonials — for example <code>single.php</code>, <code>page.php</code>, or a custom template part.',
					},
					{
						num: 3,
						title: 'Use WP_Query',
						body: 'Query testimonials with <code>&lt;?php $testimonials = get_posts([\'post_type\' =&gt; \'testimonial\', \'posts_per_page\' =&gt; 6]); ?&gt;</code> and loop through them to render in your custom HTML template.',
					},
				],
			},
		],
	},
	changelogs: [
		{
			version: '1.0.2 - 24 July 2026',
			type: 'new',
			list: [
				'<strong>New</strong> Added modern React Admin Dashboard.',
				'<strong>New</strong> Added 28 new child blocks (40 total child blocks).',
				'<strong>New</strong> Added Customer Submissions Management System.',
			],
		},
	],
	changelogsLimit: 5,
	changelogsReadMoreLabel: 'View More Changelogs',
	proFeatures: [
		'40+ Modern Child Block Layouts & Widgets',
		'Full Testimonials CPT & Reusable Content Source',
		'Customer Submissions & Review Management Dashboard',
		'Video Lightbox Playback (YouTube, Vimeo, MP4)',
		'Continuous Marquee Scrolling Ticker',
		'Star Rating Progress Bar Breakdown',
		'Google, Trustpilot & G2 Review Badges',
	],
});

