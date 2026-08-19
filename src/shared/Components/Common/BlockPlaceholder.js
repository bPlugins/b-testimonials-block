import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { getLayoutSvgIcon } from '../../utils/icons';
import { clickable } from '../../utils/a11y';
import { getChildBlockCategoryLabel } from '../../utils/childBlocks';
import { getDemoIndexUrl } from '../../utils/demoUrl';
import DemoLink from './DemoLink';
import BlockSwitcherModal, { registeredChildBlocks } from './BlockSwitcherModal';

const BlockPlaceholder = ({ clientId, currentBlockName, setAttributes }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleInsertBlock = (blockName) => {
		if (!clientId) return;
		try {
			const newChildBlock = createBlock(blockName);
			dispatch('core/block-editor').insertBlock(newChildBlock, 0, clientId);
		} catch (err) {
			console.error('Failed to insert child block:', err);
		}
	};

	// Only show the first 12 popular blocks on the canvas page editor.
	//
	// Taken from what is registered rather than from the full list, so a block
	// switched off on the All Blocks screen leaves this picker too -- otherwise
	// the twelve cards could include one that inserts nothing.
	const canvasBlocks = registeredChildBlocks().slice(0, 12);

	const demoIndex = getDemoIndexUrl();

	return (
		<div className="btb-my-testimonials-feeds">
			{/* Eyebrow, title, one line of description: the same opening the
			    plugin's Demo & Help dashboard uses, so the picker reads as part of
			    the same product. The description was an <h3> before -- the same tag
			    as the card titles below it, which put the page's subtitle and its
			    twelve card headings on one level. */}
			<header className="btbPickerHero">
				<span className="btbPickerEyebrow">{__('Testimonial Layouts', 'b-testimonials-block')}</span>
				<h2>{__('Select Your Testimonial Block', 'b-testimonials-block')}</h2>
				<p>{__('Choose from the popular testimonial layouts or click below for all 40+ layouts', 'b-testimonials-block')}</p>
				{/* One link for the whole collection, for the author who wants to
				    look before picking. Absent unless a demo index was supplied,
				    so it cannot become a link to nowhere once the demos move to
				    a hosted site. */}
				{demoIndex && (
					<a
						className="btbPickerDemoAll"
						href={demoIndex}
						target="_blank"
						rel="noreferrer"
					>
						{__('Browse all live demos', 'b-testimonials-block')}
						{getLayoutSvgIcon('external', 13)}
					</a>
				)}
			</header>

			<div className="items-list">
				{canvasBlocks.map((item) => (
					<div
						key={item.name}
						className={`item ${item.category}-item`}
						{...clickable(() => handleInsertBlock(item.name), item.title)}
					>
						<div className="icon">
							{getLayoutSvgIcon(item.icon, 24)}
						</div>
						{/* The dashboard's demo cards carry their category here, and
						    every child block has one -- so the chip is on every card
						    rather than only the few that also have a badge. */}
						<span className="btbItemCat">{getChildBlockCategoryLabel(item.category)}</span>
						<h3>{item.title}</h3>
						<p>{item.desc}</p>
						{item.badge && <span className="btbItemBadge">{item.badge}</span>}
						{/* Pinned to the bottom of the card by CSS rather than
						    shown on hover: a hover-only link is unreachable on a
						    touch screen and invisible to anyone who does not
						    happen to sweep the pointer across the card. */}
						<DemoLink blockName={item.name} title={item.title} />
					</div>
				))}
			</div>

			<div className="btbPlaceholderModalBtnWrap" style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
				<Button
					variant="primary"
					className="btbOpenModalBtn"
					onClick={() => setIsModalOpen(true)}
				>
					<span style={{ marginRight: '6px', display: 'inline-flex', alignItems: 'center' }}>
						{getLayoutSvgIcon('grid-view', 18)}
					</span>
					{__('View All 40+ Layouts & Widgets in Modal Popup', 'b-testimonials-block')}
				</Button>

				{setAttributes && (
					<Button
						variant="secondary"
						className="btbUseClassicBtn"
						onClick={() => setAttributes({ useClassicEditor: true, isLegacyBlock: true })}
					>
						<span style={{ marginRight: '6px', display: 'inline-flex', alignItems: 'center' }}>
							{getLayoutSvgIcon('settings', 18)}
						</span>
						{__('Use Classic Single Block Slider', 'b-testimonials-block')}
					</Button>
				)}
			</div>

			<BlockSwitcherModal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				clientId={clientId}
				currentBlockName={currentBlockName}
			/>
		</div>
	);
};

export default BlockPlaceholder;
