import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from '../../shared/Components/Backend/Edit';
import { getBlockIcon } from '../../shared/utils/getBlockIcon';

registerBlockType( metadata, {
	icon: getBlockIcon( metadata.name ),
	edit: Edit,
} );
