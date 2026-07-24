import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';
import Edit from '@shared/Components/Backend/Edit';
import { blockIcon } from '@shared/utils/icons';

registerBlockType( metadata, {
	icon: blockIcon,
	edit: Edit,
	save: () => {
		const blockProps = useBlockProps.save();
		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
