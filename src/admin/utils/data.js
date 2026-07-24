const gridIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
const sliderIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" /><polyline points="15 12 19 12" /><polyline points="5 12 9 12" /></svg>;
const masonryIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>;
const tickerIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><polyline points="16 7 21 12 16 17" /></svg>;

// Getting Started Tab Icons (same as b-slider)
const gutenbergTabIcon = <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'><rect x='3' y='3' width='7' height='7' rx='1' /><rect x='14' y='3' width='7' height='7' rx='1' /><rect x='3' y='14' width='7' height='7' rx='1' /><rect x='14' y='14' width='7' height='7' rx='1' /></svg>;
const shortcodeTabIcon = <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={16} height={16} fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'><polyline points='16 18 22 12 16 6' /><polyline points='8 6 2 12 8 18' /></svg>;
const elementorTabIcon = <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={16} height={16} fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'><rect x='3' y='3' width='18' height='18' rx='2' /><line x1='9' y1='3' x2='9' y2='21' /></svg>;
const phpTabIcon = <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={16} height={16} fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' /><polyline points='14 2 14 8 20 8' /><line x1='9' y1='15' x2='15' y2='15' /></svg>;


const slug = 'b-testimonial';

export const dashboardInfo = (info) => {
	const { version, isPremium, hasPro, adminUrl, licenseActiveNonce, deleteDataOnUninstall = false, uninstallNonce = '' } = info;
	const proSuffix = isPremium ? ' Pro' : '';

	return {
		name: `B Testimonials Block${proSuffix}`,
		displayName: `B Testimonials Block${proSuffix} - Show Customer Reviews, Ratings, Badges & Video Testimonials`,
		description: 'B Testimonials Block is a WordPress plugin that lets you showcase customer reviews, star ratings, video testimonials, trust badges, and interactive feedback forms.',
		slug,
		version,
		isPremium,
		hasPro,
		displayOurPlugins: true,
		media: {
			logo: `https://ps.w.org/b-testimonial/assets/icon-128x128.png`,
			banner: `https://ps.w.org/b-testimonial/assets/banner-772x250.png`,
			thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
			// video: 'https://www.youtube.com/watch?v=DOvUG5ArWHE&t=3s',
			isYoutube: true,
		},
		pages: {
			org: `https://wordpress.org/plugins/${slug}/`,
			docs: `https://bplugins.com/docs/${slug}/`,
			pricing: `https://bplugins.com/products/${slug}/pricing`,
		},
		adminUrl,
		licenseActiveNonce,
		deleteDataOnUninstall,
		uninstallNonce,
		startButton: {
			label: 'Add Testimonial Block',
			url: `${adminUrl}post-new.php?post_type=page`,
		},
	};
};

export const demoInfo = {
	allInOneLabel: 'See All Demos',
	allInOneLink: 'https://bplugins.com/products/b-testimonials-block/#demos',
	demos: [
		{
			icon: gridIcon,
			title: 'Grid Layouts',
			children: [
				{
					title: 'Default Grid',
					type: 'iframe',
					url: 'https://b-testimonials.bplugins.com/demo/grid-default/',
				},
				{
					title: 'Centered Grid',
					type: 'iframe',
					url: 'https://b-testimonials.bplugins.com/demo/grid-centered/',
				},
				{
					title: 'Gradient Border Grid',
					type: 'iframe',
					url: 'https://b-testimonials.bplugins.com/demo/grid-gradient/',
				},
			],
		},
		{
			icon: sliderIcon,
			title: 'Sliders & Carousels',
			children: [
				{
					title: 'Default Slider',
					type: 'iframe',
					url: 'https://b-testimonials.bplugins.com/demo/slider-default/',
				},
				{
					title: '3D Coverflow',
					type: 'iframe',
					url: 'https://b-testimonials.bplugins.com/demo/slider-coverflow/',
				},
			],
		},
		{
			icon: masonryIcon,
			title: 'Masonry & Lists',
			children: [
				{
					title: 'Masonry Grid',
					type: 'iframe',
					url: 'https://b-testimonials.bplugins.com/demo/masonry/',
				},
				{
					title: 'Avatar List',
					type: 'iframe',
					url: 'https://b-testimonials.bplugins.com/demo/avatar-list/',
				},
			],
		},
		{
			icon: tickerIcon,
			title: 'Marquee & Widgets',
			children: [
				{
					title: 'Marquee Ticker',
					type: 'iframe',
					url: 'https://b-testimonials.bplugins.com/demo/marquee/',
				},
				{
					title: 'Rating Summary',
					type: 'iframe',
					url: 'https://b-testimonials.bplugins.com/demo/rating-summary/',
				},
			],
		},
	],
};


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

