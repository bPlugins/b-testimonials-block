import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, Button } from '@wordpress/components';
import BlockSwitcherModal from './BlockSwitcherModal';

const BlockSwitcher = ({ clientId, currentBlockName }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

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
