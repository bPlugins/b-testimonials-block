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
import Style from '../../shared/Components/Common/Style';
import { ColorControl } from '../../../../bpl-tools/Components/ColorControl/ColorControl';
import IconSettings from '../../shared/Components/Backend/Settings/IconSettings';
import BlockIcon from '../../shared/Components/Common/BlockIcon';
import { getIcon } from '../../shared/utils/blockIcons';

import './edit.scss';
import '../../shared/styles/video.scss';

const COLUMN_MAX = { desktop: 5, tablet: 4, mobile: 2 };

const gridVars = ( { columns, columnGap, rowGap, accentColor } ) => ( {
	'--cols-d': columns?.desktop || 3,
	'--cols-t': columns?.tablet || 2,
	'--cols-m': columns?.mobile || 1,
	'--col-gap': columnGap,
	'--row-gap': rowGap,
	'--accent': accentColor,
} );

const PlayIcon = ( { icon } ) => (
	<BlockIcon
		icon={ icon }
		size={ 26 }
		defaultColor="currentColor"
		renderFallback={ ( color ) => (
			<svg viewBox="0 0 24 24" width="26" height="26" fill={ color }><path d="M8 5v14l11-7z" /></svg>
		) }
	/>
);

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const { items = [], columns, columnGap, rowGap, accentColor } = attributes;

	// The device buttons only produce a real viewport when the editor canvas
	// is iframed, which one apiVersion 2 block anywhere on the site disables.
	const [ device, setDevice ] = useState( 'desktop' );
	const previewDevice = usePreviewDevice();

	useEffect( () => {
		clientId && setAttributes( { cId: clientId.substring( 0, 10 ) } );
	}, [ clientId, setAttributes ] );

	const setColumn = ( device, val ) => setAttributes( { columns: { ...columns, [ device ]: val } } );

	const updateItem = ( index, key, val ) => {
		setAttributes( { items: produce( items, ( draft ) => { draft[ index ][ key ] = val; } ) } );
	};

	const addItem = () => setAttributes( { items: [ ...items, { videoUrl: '', poster: { url: '' }, name: '', deg: '', company: '' } ] } );

	const removeItem = ( index ) => setAttributes( { items: items.filter( ( _, i ) => i !== index ) } );

	return (
		<>
			<InspectorControls>
				<BlockSwitcher clientId={ clientId } />
				<ColorsPanel attributes={ attributes } setAttributes={ setAttributes } />
				<IconSettings attributes={ attributes } setAttributes={ setAttributes } />
				<PanelBody className="bPlPanelBody" title={ __( 'Layout', 'b-testimonials-block' ) }>
					{/* One responsive control behind the bpl-tools device switch, as the
					    shared Settings panel does, instead of three stacked ranges. */}
					<PanelRow>
						<Label mt="0">{ __( 'Columns:', 'b-testimonials-block' ) }</Label>
						<BDevice device={ device } onChange={ ( d ) => setDevice( d ) } />
					</PanelRow>
					<RangeControl value={ columns?.[ device ] } onChange={ ( val ) => setColumn( device, val ) } min={ 1 } max={ COLUMN_MAX[ device ] } step={ 1 } beforeIcon="grid-view" />
					<UnitControl className="mt20" label={ __( 'Column Gap:', 'b-testimonials-block' ) } labelPosition="left" value={ columnGap } onChange={ ( val ) => setAttributes( { columnGap: val } ) } units={ [ pxUnit( 30 ), perUnit( 3 ), emUnit( 2 ) ] } isResetValueOnUnitChange={ true } />
					<UnitControl className="mt20" label={ __( 'Row Gap:', 'b-testimonials-block' ) } labelPosition="left" value={ rowGap } onChange={ ( val ) => setAttributes( { rowGap: val } ) } units={ [ pxUnit( 40 ), perUnit( 3 ), emUnit( 2.5 ) ] } isResetValueOnUnitChange={ true } />
				</PanelBody>

				<PanelBody className="bPlPanelBody" title={ __( 'Color', 'b-testimonials-block' ) } initialOpen={ false }>
					<ColorControl label={ __( 'Play button', 'b-testimonials-block' ) } value={ accentColor } onChange={ ( val ) => setAttributes( { accentColor: val } ) } />
				</PanelBody>

				<PanelBody className="bPlPanelBody" title={ __( 'Videos', 'b-testimonials-block' ) } initialOpen={ false }>
					{ items.map( ( item, index ) => (
						<div key={ index } className="btb-video-row">
							<strong>{ __( 'Video', 'b-testimonials-block' ) } { index + 1 }</strong>
							<TextControl label={ __( 'Video URL', 'b-testimonials-block' ) } placeholder="YouTube / Vimeo / .mp4" value={ item?.videoUrl || '' } onChange={ ( val ) => updateItem( index, 'videoUrl', val ) } />
							<InlineDetailMediaUpload
								label={ __( 'Poster image', 'b-testimonials-block' ) }
								value={ item?.poster }
								onChange={ ( val ) => updateItem( index, 'poster', val ) }
							/>
							<TextControl label={ __( 'Name', 'b-testimonials-block' ) } value={ item?.name || '' } onChange={ ( val ) => updateItem( index, 'name', val ) } />
							<TextControl label={ __( 'Designation', 'b-testimonials-block' ) } value={ item?.deg || '' } onChange={ ( val ) => updateItem( index, 'deg', val ) } />
							<TextControl label={ __( 'Company', 'b-testimonials-block' ) } value={ item?.company || '' } onChange={ ( val ) => updateItem( index, 'company', val ) } />
							<Button isDestructive onClick={ () => removeItem( index ) }><Dashicon icon="trash" /> { __( 'Remove', 'b-testimonials-block' ) }</Button>
							<hr />
						</div>
					) ) }
					<Button variant="primary" onClick={ addItem }><Dashicon icon="plus" /> { __( 'Add video', 'b-testimonials-block' ) }</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'bVideoTestimonials', id: `btbTestimonialsDir-${ clientId }` } ) }>
				<Style attributes={ attributes } clientId={ clientId } />
				<div className="videos-grid" style={ { ...gridVars( attributes ), '--cols-d': colsForDevice( attributes.columns, previewDevice, 3 ) } }>
					{ items.map( ( item, index ) => (
						<div className="video-item" key={ index }>
							<div className="video-frame" style={ item?.poster?.url ? { backgroundImage: `url(${ item.poster.url })` } : undefined }>
								<span className="video-play" style={ { color: accentColor } }><PlayIcon icon={ getIcon( attributes, 'play' ) } /></span>
							</div>
							<div className="video-meta">
								{ item?.name && <h3 className="name">{ item.name }</h3> }
								{ ( item?.deg || item?.company ) && <p className="deg">{ [ item?.deg, item?.company ].filter( Boolean ).join( ', ' ) }</p> }
							</div>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
};

export default Edit;
