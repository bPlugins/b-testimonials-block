import { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, Button, Dashicon, PanelRow, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { produce } from 'immer';
import BlockSwitcher from '../../shared/Components/Common/BlockSwitcher';
import { InlineDetailMediaUpload } from '../../../../bpl-tools/Components/MediaControl/MediaControl';
import usePreviewDevice, { colsForDevice } from '../../shared/utils/usePreviewDevice';
import Label from '../../../../bpl-tools/Components/Label/Label';
import BDevice from '../../../../bpl-tools/Components/Deprecated/BDevice/BDevice';
import { emUnit, perUnit, pxUnit } from '../../../../bpl-tools/utils/options';
import ColorsPanel from '../../shared/Components/Backend/Settings/ColorsPanel';
import SizeSpacingPanel from '../../shared/Components/Backend/Settings/SizeSpacingPanel';
import Style from '../../shared/Components/Common/Style';
import IconSettings from '../../shared/Components/Backend/Settings/IconSettings';
import BlockIcon from '../../shared/Components/Common/BlockIcon';
import { getIcon } from '../../shared/utils/blockIcons';

import './edit.scss';
import '../../shared/styles/trust-badges.scss';

const COLUMN_MAX = { desktop: 6, tablet: 4, mobile: 2 };

const gridVars = ( { columns, columnGap, rowGap } ) => ( {
	'--cols-d': columns?.desktop || 3,
	'--cols-t': columns?.tablet || 3,
	'--cols-m': columns?.mobile || 1,
	'--col-gap': columnGap,
	'--row-gap': rowGap,
} );

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const { items = [], columns, columnGap, rowGap } = attributes;

	// The device buttons only produce a real viewport when the editor canvas
	// is iframed, which one apiVersion 2 block anywhere on the site disables.
	const [ device, setDevice ] = useState( 'desktop' );
	const previewDevice = usePreviewDevice();

	useEffect( () => {
		clientId && setAttributes( { cId: clientId.substring( 0, 10 ) } );
	}, [ clientId, setAttributes ] );

	const setColumn = ( device, val ) => setAttributes( { columns: { ...columns, [ device ]: val } } );
	const updateItem = ( i, key, val ) => setAttributes( { items: produce( items, ( d ) => { d[ i ][ key ] = val; } ) } );
	const addItem = () => setAttributes( { items: [ ...items, { img: { url: '' }, title: '', subtitle: '' } ] } );
	const removeItem = ( i ) => setAttributes( { items: items.filter( ( _, idx ) => idx !== i ) } );

	return (
		<>
			<InspectorControls>
				<BlockSwitcher clientId={ clientId } />
				<ColorsPanel attributes={ attributes } setAttributes={ setAttributes } />
				<SizeSpacingPanel attributes={ attributes } setAttributes={ setAttributes } />
				<IconSettings attributes={ attributes } setAttributes={ setAttributes } />
				<PanelBody className="bPlPanelBody" title={ __( 'Layout', 'b-testimonials-block' ) }>
					{/* One responsive control behind the bpl-tools device switch, as the
					    shared Settings panel does, instead of three stacked ranges. */}
					<PanelRow>
						<Label mt="0">{ __( 'Columns:', 'b-testimonials-block' ) }</Label>
						<BDevice device={ device } onChange={ ( d ) => setDevice( d ) } />
					</PanelRow>
					<RangeControl value={ columns?.[ device ] } onChange={ ( v ) => setColumn( device, v ) } min={ 1 } max={ COLUMN_MAX[ device ] } step={ 1 } beforeIcon="grid-view" />
					<UnitControl className="mt20" label={ __( 'Column Gap:', 'b-testimonials-block' ) } labelPosition="left" value={ columnGap } onChange={ ( v ) => setAttributes( { columnGap: v } ) } units={ [ pxUnit( 30 ), perUnit( 3 ), emUnit( 2 ) ] } isResetValueOnUnitChange={ true } />
					<UnitControl className="mt20" label={ __( 'Row Gap:', 'b-testimonials-block' ) } labelPosition="left" value={ rowGap } onChange={ ( v ) => setAttributes( { rowGap: v } ) } units={ [ pxUnit( 40 ), perUnit( 3 ), emUnit( 2.5 ) ] } isResetValueOnUnitChange={ true } />
				</PanelBody>

				<PanelBody className="bPlPanelBody" title={ __( 'Badges', 'b-testimonials-block' ) } initialOpen={ false }>
					{ items.map( ( item, i ) => (
						<div key={ i } className="btb-badge-row">
							<InlineDetailMediaUpload
								label={ __( 'Icon', 'b-testimonials-block' ) }
								value={ item?.img }
								onChange={ ( val ) => updateItem( i, 'img', val ) }
							/>
							<TextControl label={ __( 'Title', 'b-testimonials-block' ) } value={ item?.title || '' } onChange={ ( v ) => updateItem( i, 'title', v ) } />
							<TextControl label={ __( 'Subtitle', 'b-testimonials-block' ) } value={ item?.subtitle || '' } onChange={ ( v ) => updateItem( i, 'subtitle', v ) } />
							<Button isDestructive onClick={ () => removeItem( i ) }><Dashicon icon="trash" /> { __( 'Remove', 'b-testimonials-block' ) }</Button>
							<hr />
						</div>
					) ) }
					<Button variant="primary" onClick={ addItem }><Dashicon icon="plus" /> { __( 'Add badge', 'b-testimonials-block' ) }</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'bTrustBadges' } ) } id={ `btbTestimonialsDir-${ clientId }` }>
				<Style attributes={ attributes } clientId={ clientId } />
				<div className="badges-grid" style={ { ...gridVars( attributes ), '--cols-d': colsForDevice( attributes.columns, previewDevice, 3 ) } }>
					{ items.map( ( item, i ) => (
						<div className="badge-item" key={ i }>
							{/* Falls back to the Icons panel, as the front end does, so a
							    badge with no image of its own still shows its icon here. */}
							{ item?.img?.url ? (
								<img className="badge-icon" src={ item.img.url } alt={ item?.img?.alt || '' } />
							) : (
								<BlockIcon
									icon={ getIcon( attributes, `trust${ i }` ) }
									size={ 32 }
									renderFallback={ ( color ) => (
										<svg viewBox="0 0 24 24" width="32" height="32">
											<path fill={ color } d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
										</svg>
									) }
								/>
							) }
							<div className="badge-text">
								{ item?.title && <h4 className="badge-title">{ item.title }</h4> }
								{ item?.subtitle && <p className="badge-subtitle">{ item.subtitle }</p> }
							</div>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
};

export default Edit;
