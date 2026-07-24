import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './edit';
import { blockIcon } from '../../shared/utils/icons';

registerBlockType( metadata, {
	icon: blockIcon,
	edit: Edit,
} );
