import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { dispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

export const CHILD_BLOCKS_LIST = [
	// Original 12 Blocks
	{
		name: 'bptmb/testimonials-slider',
		title: __('Testimonials Slider', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'slides',
		desc: __('Interactive carousel slider with navigation dots.', 'b-testimonials-block'),
		badge: __('Slider', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-list',
		title: __('Testimonials List', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'editor-ul',
		desc: __('Clean, vertical list representation of reviews.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-masonry',
		title: __('Testimonials Masonry', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'dashboard',
		desc: __('Staggered grid layout for variable height cards.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-single',
		title: __('Single Testimonial', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'format-quote',
		desc: __('Hero/Featured single testimonial highlight.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-marquee',
		title: __('Testimonials Marquee', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'update-alt',
		desc: __('Smooth infinite ticker tape / scrolling reviews.', 'b-testimonials-block'),
		badge: __('New', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/rating-summary',
		title: __('Rating Summary', 'b-testimonials-block'),
		category: 'social',
		icon: 'star-filled',
		desc: __('Overall score & star rating distribution summary.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonial-stats',
		title: __('Testimonial Stats', 'b-testimonials-block'),
		category: 'social',
		icon: 'chart-bar',
		desc: __('Key statistics, satisfaction percentages & counters.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/trust-badges',
		title: __('Trust Badges', 'b-testimonials-block'),
		category: 'social',
		icon: 'shield',
		desc: __('Security, guarantee, and award badges.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/client-logos',
		title: __('Client Logos', 'b-testimonials-block'),
		category: 'social',
		icon: 'groups',
		desc: __('Showcase brand and client logos in grid or carousel.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/video-testimonials',
		title: __('Video Testimonials', 'b-testimonials-block'),
		category: 'media',
		icon: 'video-alt3',
		desc: __('Video reviews with lightbox popup playback.', 'b-testimonials-block'),
		badge: __('Video', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/before-after',
		title: __('Before & After', 'b-testimonials-block'),
		category: 'media',
		icon: 'image-flip-horizontal',
		desc: __('Comparison showcase for results & transformation.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonial-form',
		title: __('Testimonial Form', 'b-testimonials-block'),
		category: 'interactive',
		icon: 'feedback',
		desc: __('Frontend form for collecting customer reviews.', 'b-testimonials-block'),
	},

	// 20 New Blocks
	{
		name: 'bptmb/testimonials-grid-2',
		title: __('Centered Cards Grid', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'align-center',
		desc: __('Sleek centered profile and testimonial card grid.', 'b-testimonials-block'),
		badge: __('Popular', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-grid-3',
		title: __('Gradient Border Grid', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'grid-view',
		desc: __('Modern gradient border cards with star badges.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-carousel-2',
		title: __('Coverflow Carousel', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'columns',
		desc: __('Center-focused 3D coverflow carousel slider.', 'b-testimonials-block'),
		badge: __('3D', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-compact',
		title: __('Compact Reviews List', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'excerpt-view',
		desc: __('Space-saving minimal customer testimonial list.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-avatar-list',
		title: __('Avatar Reviews List', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'admin-users',
		desc: __('Prominent avatar & customer spotlight review rows.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-quote-box',
		title: __('Quote Box Showcase', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'format-quote',
		desc: __('Bold quote mark styling with accent backgrounds.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-speech-bubble',
		title: __('Speech Bubble Cards', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'format-chat',
		desc: __('Chat bubble style testimonial cards.', 'b-testimonials-block'),
		badge: __('Popular', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-timeline',
		title: __('Customer Journey Timeline', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'list-view',
		desc: __('Vertical timeline of customer success stories.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-card-stack',
		title: __('Stacked Review Cards', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'index-card',
		desc: __('Overlapping stacked review card deck.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/case-study-card',
		title: __('Customer Case Study', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'welcome-learn-more',
		desc: __('Detailed case study card with metrics & quote.', 'b-testimonials-block'),
		badge: __('Pro', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/google-review-badge',
		title: __('Google Reviews Badge', 'b-testimonials-block'),
		category: 'social',
		icon: 'google',
		desc: __('Official style Google Business score badge.', 'b-testimonials-block'),
		badge: __('Badge', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/trustpilot-review-badge',
		title: __('Trustpilot Score Badge', 'b-testimonials-block'),
		category: 'social',
		icon: 'star-filled',
		desc: __('Trustpilot style rating & review summary badge.', 'b-testimonials-block'),
		badge: __('Badge', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/g2-review-badge',
		title: __('G2 Review Badge', 'b-testimonials-block'),
		category: 'social',
		icon: 'awards',
		desc: __('G2 / Capterra software review score badge.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/review-badge-widget',
		title: __('Floating Review Badge', 'b-testimonials-block'),
		category: 'social',
		icon: 'sticky',
		desc: __('Corner / floating trust review badge widget.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/star-rating-bars',
		title: __('Star Rating Progress Bars', 'b-testimonials-block'),
		category: 'social',
		icon: 'chart-bar',
		desc: __('5-star rating breakdown bars & percentage stats.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/social-proof-toast',
		title: __('Social Proof Toast', 'b-testimonials-block'),
		category: 'social',
		icon: 'testimonial',
		desc: __('Live social proof popup notification toast.', 'b-testimonials-block'),
		badge: __('New', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/audio-testimonials',
		title: __('Audio Testimonials', 'b-testimonials-block'),
		category: 'media',
		icon: 'controls-play',
		desc: __('Voice note & audio review player with wave style.', 'b-testimonials-block'),
		badge: __('Audio', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/user-feedback-poll',
		title: __('Feedback & NPS Poll', 'b-testimonials-block'),
		category: 'interactive',
		icon: 'chart-pie',
		desc: __('Quick Net Promoter Score (NPS) feedback poll.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/comparison-testimonial-table',
		title: __('Comparison Review Table', 'b-testimonials-block'),
		category: 'interactive',
		icon: 'table-col-after',
		desc: __('Side-by-side customer comparison table.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/faq-testimonial-accordion',
		title: __('FAQ Review Accordion', 'b-testimonials-block'),
		category: 'interactive',
		icon: 'arrow-down-alt2',
		desc: __('Collapsible FAQ & customer feedback accordion.', 'b-testimonials-block'),
	},

	// 8 New Blocks (40 Total)
	{
		name: 'bptmb/testimonials-hero',
		title: __('Hero Testimonial Spotlight', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'superhero',
		desc: __('High-impact hero banner with quote & CTA.', 'b-testimonials-block'),
		badge: __('Hero', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-grid-minimal',
		title: __('Minimalist Reviews Grid', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'layout',
		desc: __('Clean monochrome review cards with subtle hover elevation.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-slider-3d',
		title: __('3D Flip Perspective Carousel', 'b-testimonials-block'),
		category: 'layouts',
		icon: 'update',
		desc: __('Interactive 3D perspective flip card carousel slider.', 'b-testimonials-block'),
		badge: __('3D', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-floating-bubble',
		title: __('Floating Avatar Bubbles', 'b-testimonials-block'),
		category: 'social',
		icon: 'bubbles',
		desc: __('Interactive floating customer avatar bubbles with popup tooltips.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/facebook-review-badge',
		title: __('Facebook Recommendation Badge', 'b-testimonials-block'),
		category: 'social',
		icon: 'facebook',
		desc: __('Official style Facebook page recommendation & rating summary badge.', 'b-testimonials-block'),
		badge: __('Badge', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/capterra-review-badge',
		title: __('Capterra Score Badge', 'b-testimonials-block'),
		category: 'social',
		icon: 'star-half',
		desc: __('Software review rating summary badge styled like Capterra.', 'b-testimonials-block'),
		badge: __('Badge', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/verified-buyer-badge',
		title: __('Verified Buyer Trust Seal', 'b-testimonials-block'),
		category: 'social',
		icon: 'yes-alt',
		desc: __('E-commerce verified purchase seal & satisfaction guarantee widget.', 'b-testimonials-block'),
	},
	{
		name: 'bptmb/testimonials-popup-modal',
		title: __('Popup Modal Review Trigger', 'b-testimonials-block'),
		category: 'interactive',
		icon: 'external',
		desc: __('Clickable badge/button that opens a full review popup modal.', 'b-testimonials-block'),
		badge: __('New', 'b-testimonials-block'),
	},
];

export const ALLOWED_CHILD_BLOCKS = CHILD_BLOCKS_LIST.map((b) => b.name);

const BlockSwitcherModal = ({ isOpen, onRequestClose, clientId, currentBlockName }) => {
	const [activeCategory, setActiveCategory] = useState('all');
	const [searchQuery, setSearchQuery] = useState('');

	const { currentBlock, innerBlocks } = useSelect(
		(select) => {
			if (!clientId) return { currentBlock: null, innerBlocks: [] };
			const block = select('core/block-editor').getBlock(clientId);
			return {
				currentBlock: block,
				innerBlocks: block ? block.innerBlocks : [],
			};
		},
		[clientId]
	);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				onRequestClose();
			}
		};
		if (isOpen) {
			window.addEventListener('keydown', handleKeyDown);
		}
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, onRequestClose]);

	if (!isOpen) return null;

	const handleSelectChildBlock = (targetBlockName) => {
		onRequestClose();
		if (!clientId) return;

		try {
			const newChildBlock = createBlock(targetBlockName);

			if (currentBlock && currentBlock.name === 'bptmb/b-testimonials') {
				if (innerBlocks && innerBlocks.length > 0) {
					dispatch('core/block-editor').replaceBlock(innerBlocks[0].clientId, newChildBlock);
				} else {
					dispatch('core/block-editor').insertBlock(newChildBlock, 0, clientId);
				}
			} else {
				dispatch('core/block-editor').replaceBlock(clientId, newChildBlock);
			}
		} catch (err) {
			console.error('Failed to insert/switch child block:', err);
		}
	};

	const filteredBlocks = CHILD_BLOCKS_LIST.filter((item) => {
		const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
		const matchesSearch =
			!searchQuery ||
			item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.desc.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const categories = [
		{ id: 'all', label: __('All 40 Blocks', 'b-testimonials-block') },
		{ id: 'layouts', label: __('Grid & Layouts', 'b-testimonials-block') },
		{ id: 'social', label: __('Trust & Badges', 'b-testimonials-block') },
		{ id: 'media', label: __('Media & Audio', 'b-testimonials-block') },
		{ id: 'interactive', label: __('Forms & Polls', 'b-testimonials-block') },
	];

	let activeChildName = '';
	if (currentBlock) {
		if (currentBlock.name === 'bptmb/b-testimonials') {
			activeChildName = innerBlocks?.[0]?.name || '';
		} else {
			activeChildName = currentBlock.name;
		}
	}
	if (!activeChildName && currentBlockName) {
		activeChildName = currentBlockName.startsWith('bptmb/') ? currentBlockName : `bptmb/${currentBlockName}`;
	}

	return (
		<div className="btb-custom-modal-backdrop" onClick={onRequestClose}>
			<div className="btb-custom-modal-dialog" onClick={(e) => e.stopPropagation()}>
				{/* Custom Modern Header */}
				<div className="btb-custom-modal-header">
					<div className="btb-modal-title-wrap">
						<div className="btb-modal-header-icon">
							<span className="dashicons dashicons-grid-view" />
						</div>
						<div>
							<h3 className="btb-modal-title">{__('Testimonial Block Switcher', 'b-testimonials-block')}</h3>
							<p className="btb-modal-desc">
								{__('Select from 40+ modern layouts & social proof widgets', 'b-testimonials-block')}
							</p>
						</div>
					</div>
					<button
						type="button"
						className="btb-modal-close-btn"
						onClick={onRequestClose}
						aria-label={__('Close modal', 'b-testimonials-block')}
					>
						&times;
					</button>
				</div>

				{/* Custom Modern Toolbar */}
				<div className="btb-custom-modal-toolbar">
					<div className="btb-modal-cats">
						{categories.map((cat) => (
							<button
								key={cat.id}
								type="button"
								className={`btb-cat-chip ${activeCategory === cat.id ? 'is-active' : ''}`}
								onClick={() => setActiveCategory(cat.id)}
							>
								{cat.label}
							</button>
						))}
					</div>
					<div className="btb-modal-search-box">
						<span className="dashicons dashicons-search search-icon" />
						<input
							type="text"
							placeholder={__('Search layouts…', 'b-testimonials-block')}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						{searchQuery && (
							<button
								type="button"
								className="clear-search-btn"
								onClick={() => setSearchQuery('')}
							>
								&times;
							</button>
						)}
					</div>
				</div>

				{/* Custom Modern Cards Grid Container with Single Scrollbar */}
				<div className="btb-custom-modal-grid">
					{filteredBlocks.map((item) => {
						const isCurrent = item.name === activeChildName;
						return (
							<div
								key={item.name}
								className={`btb-modern-card ${isCurrent ? 'is-active' : ''}`}
								onClick={() => handleSelectChildBlock(item.name)}
							>
								<div className="btb-modern-card-header">
									<div className="btb-modern-icon">
										<span className={`dashicons dashicons-${item.icon}`} />
									</div>
									{item.badge && <span className="btb-modern-badge">{item.badge}</span>}
								</div>

								<div className="btb-modern-card-body">
									<h4 className="btb-modern-card-title">
										{item.title}
										{isCurrent && <span className="btb-active-pill">{__('Active', 'b-testimonials-block')}</span>}
									</h4>
									<p className="btb-modern-card-desc">{item.desc}</p>
								</div>

								<div className="btb-modern-card-footer">
									<button
										type="button"
										className={`btb-modern-select-btn ${isCurrent ? 'is-selected' : ''}`}
										onClick={(e) => {
											e.stopPropagation();
											handleSelectChildBlock(item.name);
										}}
									>
										{isCurrent ? __('Currently Selected', 'b-testimonials-block') : __('Use This Layout', 'b-testimonials-block')}
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default BlockSwitcherModal;
