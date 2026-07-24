import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import BlockSwitcherModal, { CHILD_BLOCKS_LIST } from './BlockSwitcherModal';

const BlockPlaceholder = ({ clientId, currentBlockName }) => {
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

	// Only show the first 12 popular blocks on the canvas page editor
	const canvasBlocks = CHILD_BLOCKS_LIST.slice(0, 12);

	return (
		<div className="btb-my-testimonials-feeds">
			<h2>{__('Select Your Testimonial Block', 'b-testimonials-block')}</h2>
			<h3>{__('Choose from the popular testimonial layouts or click below for all 40+ layouts', 'b-testimonials-block')}</h3>

			<div className="items-list">
				{canvasBlocks.map((item) => (
					<div
						key={item.name}
						className={`item ${item.category}-item`}
						onClick={() => handleInsertBlock(item.name)}
					>
						<div className="icon">
							<span className={`dashicons dashicons-${item.icon}`} />
						</div>
						<h3>{item.title}</h3>
						<p>{item.desc}</p>
						{item.badge && <span className="btbItemBadge">{item.badge}</span>}
					</div>
				))}
			</div>

			<div className="btbPlaceholderModalBtnWrap">
				<Button
					variant="primary"
					className="btbOpenModalBtn"
					onClick={() => setIsModalOpen(true)}
				>
					<span className="dashicons dashicons-grid-view" />
					{__('View All 40+ Layouts & Widgets in Modal Popup', 'b-testimonials-block')}
				</Button>
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
