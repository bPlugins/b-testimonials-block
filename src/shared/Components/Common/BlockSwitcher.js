import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, Button } from '@wordpress/components';
import { dispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import BlockSwitcherModal from './BlockSwitcherModal';

const BlockSwitcher = ({ clientId, currentBlockName, attributes = {}, setAttributes }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const mainParentClientId = currentBlock?.name === 'bptmb/b-testimonials'
		? clientId
		: (parentBlock?.name === 'bptmb/b-testimonials' ? parentBlock.clientId : null);

	const targetAttributes = mainParentClientId
		? (currentBlock?.name === 'bptmb/b-testimonials' ? attributes : (parentBlock?.attributes || {}))
		: attributes;

	const isClassic = targetAttributes?.isLegacyBlock || targetAttributes?.useClassicEditor;

	const handleSwitchToClassic = () => {
		try {
			if (mainParentClientId) {
				// Update parent block attributes to Classic mode
				dispatch('core/block-editor').updateBlockAttributes(mainParentClientId, {
					useClassicEditor: true,
					isLegacyBlock: true,
				});

				// Remove any child blocks inside main parent
				const pBlock = dispatch('core/block-editor').getBlock ? null : null; // safe check
				const targetChildren = currentBlock?.name === 'bptmb/b-testimonials'
					? innerBlocks
					: (parentBlock?.innerBlocks || []);

				if (targetChildren && targetChildren.length > 0) {
					targetChildren.forEach((child) => {
						try {
							dispatch('core/block-editor').removeBlock(child.clientId);
						} catch (e) {
							console.warn('Could not remove child block:', e);
						}
					});
				}
			} else {
				// Standalone child block on canvas page: replace with bptmb/b-testimonials in classic mode
				const newParent = createBlock('bptmb/b-testimonials', {
					...(currentBlock?.attributes || {}),
					useClassicEditor: true,
					isLegacyBlock: true,
				});
				dispatch('core/block-editor').replaceBlock(clientId, newParent);
			}
		} catch (err) {
			console.error('Failed to switch to classic mode:', err);
		}
	};

	const handleSwitchToPlaceholder = () => {
		try {
			if (mainParentClientId) {
				// Update parent block attributes to non-classic mode
				dispatch('core/block-editor').updateBlockAttributes(mainParentClientId, {
					useClassicEditor: false,
					isLegacyBlock: false,
				});

				// Remove any child blocks inside main parent so placeholder displays
				const targetChildren = currentBlock?.name === 'bptmb/b-testimonials'
					? innerBlocks
					: (parentBlock?.innerBlocks || []);

				if (targetChildren && targetChildren.length > 0) {
					targetChildren.forEach((child) => {
						try {
							dispatch('core/block-editor').removeBlock(child.clientId);
						} catch (e) {
							console.warn('Could not remove child block:', e);
						}
					});
				}
			} else {
				// Standalone child block on canvas page: replace with bptmb/b-testimonials in placeholder mode
				const newParent = createBlock('bptmb/b-testimonials', {
					...(currentBlock?.attributes || {}),
					useClassicEditor: false,
					isLegacyBlock: false,
				});
				dispatch('core/block-editor').replaceBlock(clientId, newParent);
			}
		} catch (err) {
			console.error('Failed to switch to placeholder mode:', err);
		}
	};

	return (
		<>
			<PanelBody
				className="bPlPanelBody btbSidebarSwitcherPanel"
				title={__('Select / Switch Block', 'b-testimonials-block')}
				initialOpen={true}
			>
				<div className="btbSidebarSwitcherCard">
					<div className="btbSidebarIconWrap">
						<span className="dashicons dashicons-layout" />
					</div>
					<div className="btbSidebarTextWrap">
						<h4 className="btbSidebarTitle">{__('Change Block Layout', 'b-testimonials-block')}</h4>
						<p className="btbSidebarDesc">
							{__('Click below to open the popup modal and switch to any layout.', 'b-testimonials-block')}
						</p>
					</div>
					<Button
						variant="secondary"
						className="btbSidebarChangeBtn"
						onClick={() => setIsModalOpen(true)}
					>
						<span className="dashicons dashicons-update" />
						{__('Change Block / Layout', 'b-testimonials-block')}
					</Button>

					<div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
						{isClassic ? (
							<Button
								variant="tertiary"
								style={{ fontSize: '11px', height: 'auto', padding: '4px 0', textDecoration: 'underline' }}
								onClick={handleSwitchToPlaceholder}
							>
								{__('Switch to 40+ Layout Placeholder', 'b-testimonials-block')}
							</Button>
						) : (
							<Button
								variant="tertiary"
								style={{ fontSize: '11px', height: 'auto', padding: '4px 0', textDecoration: 'underline' }}
								onClick={handleSwitchToClassic}
							>
								{__('Switch to Classic Single Block Mode', 'b-testimonials-block')}
							</Button>
						)}
					</div>
				</div>
			</PanelBody>

			<BlockSwitcherModal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				clientId={clientId}
				currentBlockName={currentBlockName}
			/>
		</>
	);
};

export default BlockSwitcher;
