import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from '@shared/Components/Backend/Edit';
import { blockIcon } from '@shared/utils/icons';

registerBlockType( metadata, {
	icon: blockIcon,
	edit: Edit,
} );
