import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './edit';
import { getBlockIcon } from '../../shared/utils/getBlockIcon';

registerBlockType( metadata, {
	icon: getBlockIcon( metadata.name ),
	edit: Edit,
} );
