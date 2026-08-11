import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';
import Edit from '../../shared/Components/Backend/Edit';
import { getBlockIcon } from '../../shared/utils/getBlockIcon';

const deprecated = [
	{
		attributes: metadata.attributes,
		save() {
			return null;
		},
	},
	{
		attributes: metadata.attributes,
		save() {
			return <div className="wp-block-bptmb-b-testimonials"></div>;
		},
	},
	{
		attributes: metadata.attributes,
		save() {
			return <div className="wp-block-bptmb-testimonials"></div>;
		},
	},
];

registerBlockType( metadata, {
	icon: getBlockIcon( metadata.name ),
	edit: Edit,
	save: () => {
		const blockProps = useBlockProps.save();
		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},
	deprecated,
} );
