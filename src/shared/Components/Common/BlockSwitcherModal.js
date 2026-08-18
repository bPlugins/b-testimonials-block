import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { dispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { getLayoutSvgIcon } from '../../utils/icons';
import { clickable } from '../../utils/a11y';

// Moved to utils/childBlocks so it can be shared with the inserter icons.
import { CHILD_BLOCKS_LIST, CHILD_BLOCK_CATEGORIES } from '../../utils/childBlocks';

export { CHILD_BLOCKS_LIST };

export const ALLOWED_CHILD_BLOCKS = CHILD_BLOCKS_LIST.map((b) => b.name);

const BlockSwitcherModal = ({ isOpen, onRequestClose, clientId, currentBlockName }) => {
	const [activeCategory, setActiveCategory] = useState('all');
	const [searchQuery, setSearchQuery] = useState('');

	const { currentBlock, parentBlock, innerBlocks } = useSelect(
		(select) => {
			if (!clientId) return { currentBlock: null, parentBlock: null, innerBlocks: [] };
			const block = select('core/block-editor').getBlock(clientId);
			const parents = select('core/block-editor').getBlockParents(clientId);
			const parent = parents && parents.length > 0
				? select('core/block-editor').getBlock(parents[parents.length - 1])
				: null;
			return {
				currentBlock: block,
				parentBlock: parent,
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
				dispatch('core/block-editor').updateBlockAttributes(clientId, {
					useClassicEditor: false,
					isLegacyBlock: false,
				});
				if (innerBlocks && innerBlocks.length > 0) {
					dispatch('core/block-editor').replaceBlock(innerBlocks[0].clientId, newChildBlock);
				} else {
					dispatch('core/block-editor').insertBlock(newChildBlock, 0, clientId);
				}
			} else if (parentBlock && parentBlock.name === 'bptmb/b-testimonials') {
				dispatch('core/block-editor').updateBlockAttributes(parentBlock.clientId, {
					useClassicEditor: false,
					isLegacyBlock: false,
				});
				dispatch('core/block-editor').replaceBlock(clientId, newChildBlock);
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

	// The category labels are shared with the canvas placeholder's card chips; only
	// the "all" filter is local, since no block carries it.
	const categories = [
		{ id: 'all', label: __('All 40 Blocks', 'b-testimonials-block') },
		...CHILD_BLOCK_CATEGORIES,
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
		// Backdrop dismissal is a mouse convenience only; Escape is handled above.
		<div
			className="btb-custom-modal-backdrop"
			role="presentation"
			onClick={(e) => e.target === e.currentTarget && onRequestClose()}
		>
			<div
				className="btb-custom-modal-dialog"
				role="dialog"
				aria-modal="true"
				aria-label={__('Testimonial Block Switcher', 'b-testimonials-block')}
			>
				{/* Custom Modern Header */}
				<div className="btb-custom-modal-header">
					<div className="btb-modal-title-wrap">
						<div className="btb-modal-header-icon">
							{getLayoutSvgIcon('grid-view', 24, '#ffffff')}
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
						{getLayoutSvgIcon('close', 18)}
					</button>
				</div>

				{/* Custom Modern Toolbar */}
				<div className="btb-custom-modal-toolbar">
					<div className="btb-modal-cats">
						{categories.map((cat) => (
							<button
								key={cat.id}
								type="button"
								// `is-<id>` carries the category's accent to the chip's dot,
								// from the one accent map in editor.scss.
								className={`btb-cat-chip is-${cat.id} ${activeCategory === cat.id ? 'is-active' : ''}`}
								onClick={() => setActiveCategory(cat.id)}
							>
								{cat.label}
							</button>
						))}
					</div>
					<div className="btb-modal-search-box">
						<span className="search-icon">
							{getLayoutSvgIcon('search', 16)}
						</span>
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
								{getLayoutSvgIcon('close', 14)}
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
								// `<category>-item` tints the card with its category's accent,
								// the same class the canvas placeholder's cards carry.
								className={`btb-modern-card ${item.category}-item ${isCurrent ? 'is-active' : ''}`}
								{...clickable(() => handleSelectChildBlock(item.name), item.title)}
							>
								<div className="btb-modern-card-header">
									<div className="btb-modern-icon">
										{getLayoutSvgIcon(item.icon, 24)}
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
