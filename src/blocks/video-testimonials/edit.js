import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, Button, Dashicon } from '@wordpress/components';
import { produce } from 'immer';
import BlockSwitcher from '../../shared/Components/Common/BlockSwitcher';

import './edit.scss';
import '../../shared/styles/video.scss';

const gridVars = ( { columns, columnGap, rowGap, accentColor } ) => ( {
	'--cols-d': columns?.desktop || 3,
	'--cols-t': columns?.tablet || 2,
	'--cols-m': columns?.mobile || 1,
	'--col-gap': columnGap,
	'--row-gap': rowGap,
	'--accent': accentColor,
} );

const PlayIcon = () => (
	<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const { items = [], columns, columnGap, rowGap, accentColor } = attributes;

	useEffect( () => {
		clientId && setAttributes( { cId: clientId.substring( 0, 10 ) } );
	}, [ clientId ] );

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
				<PanelBody title={ __( 'Layout', 'b-testimonials-block' ) }>
					<RangeControl label={ __( 'Columns (Desktop)', 'b-testimonials-block' ) } value={ columns?.desktop } onChange={ ( val ) => setColumn( 'desktop', val ) } min={ 1 } max={ 5 } />
					<RangeControl label={ __( 'Columns (Tablet)', 'b-testimonials-block' ) } value={ columns?.tablet } onChange={ ( val ) => setColumn( 'tablet', val ) } min={ 1 } max={ 4 } />
					<RangeControl label={ __( 'Columns (Mobile)', 'b-testimonials-block' ) } value={ columns?.mobile } onChange={ ( val ) => setColumn( 'mobile', val ) } min={ 1 } max={ 2 } />
					<TextControl label={ __( 'Column gap', 'b-testimonials-block' ) } value={ columnGap } onChange={ ( val ) => setAttributes( { columnGap: val } ) } />
					<TextControl label={ __( 'Row gap', 'b-testimonials-block' ) } value={ rowGap } onChange={ ( val ) => setAttributes( { rowGap: val } ) } />
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color', 'b-testimonials-block' ) }
					initialOpen={ false }
					colorSettings={ [ { value: accentColor, onChange: ( val ) => setAttributes( { accentColor: val } ), label: __( 'Play button', 'b-testimonials-block' ) } ] }
				/>

				<PanelBody title={ __( 'Videos', 'b-testimonials-block' ) } initialOpen={ false }>
					{ items.map( ( item, index ) => (
						<div key={ index } className="btb-video-row">
							<strong>{ __( 'Video', 'b-testimonials-block' ) } { index + 1 }</strong>
							<TextControl label={ __( 'Video URL', 'b-testimonials-block' ) } placeholder="YouTube / Vimeo / .mp4" value={ item?.videoUrl || '' } onChange={ ( val ) => updateItem( index, 'videoUrl', val ) } />
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image' ] }
									value={ item?.poster }
									onSelect={ ( media ) => updateItem( index, 'poster', { id: media.id, url: media.url, alt: media.alt } ) }
									render={ ( { open } ) => (
										<Button variant="secondary" onClick={ open }>{ item?.poster?.url ? __( 'Change poster', 'b-testimonials-block' ) : __( 'Set poster image', 'b-testimonials-block' ) }</Button>
									) }
								/>
							</MediaUploadCheck>
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

			<div { ...useBlockProps( { className: 'bVideoTestimonials' } ) }>
				<div className="videos-grid" style={ gridVars( attributes ) }>
					{ items.map( ( item, index ) => (
						<div className="video-item" key={ index }>
							<div className="video-frame" style={ item?.poster?.url ? { backgroundImage: `url(${ item.poster.url })` } : undefined }>
								<span className="video-play" style={ { color: accentColor } }><PlayIcon /></span>
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
