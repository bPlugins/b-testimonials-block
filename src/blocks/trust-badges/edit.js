import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, Button, Dashicon } from '@wordpress/components';
import { produce } from 'immer';
import BlockSwitcher from '../../shared/Components/Common/BlockSwitcher';

import './edit.scss';
import '../../shared/styles/trust-badges.scss';

const gridVars = ( { columns, columnGap, rowGap } ) => ( {
	'--cols-d': columns?.desktop || 3,
	'--cols-t': columns?.tablet || 3,
	'--cols-m': columns?.mobile || 1,
	'--col-gap': columnGap,
	'--row-gap': rowGap,
} );

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const { items = [], columns, columnGap, rowGap } = attributes;

	useEffect( () => {
		clientId && setAttributes( { cId: clientId.substring( 0, 10 ) } );
	}, [ clientId ] );

	const setColumn = ( device, val ) => setAttributes( { columns: { ...columns, [ device ]: val } } );
	const updateItem = ( i, key, val ) => setAttributes( { items: produce( items, ( d ) => { d[ i ][ key ] = val; } ) } );
	const addItem = () => setAttributes( { items: [ ...items, { img: { url: '' }, title: '', subtitle: '' } ] } );
	const removeItem = ( i ) => setAttributes( { items: items.filter( ( _, idx ) => idx !== i ) } );

	return (
		<>
			<InspectorControls>
				<BlockSwitcher clientId={ clientId } />
				<PanelBody title={ __( 'Layout', 'b-testimonials-block' ) }>
					<RangeControl label={ __( 'Columns (Desktop)', 'b-testimonials-block' ) } value={ columns?.desktop } onChange={ ( v ) => setColumn( 'desktop', v ) } min={ 1 } max={ 6 } />
					<RangeControl label={ __( 'Columns (Tablet)', 'b-testimonials-block' ) } value={ columns?.tablet } onChange={ ( v ) => setColumn( 'tablet', v ) } min={ 1 } max={ 4 } />
					<RangeControl label={ __( 'Columns (Mobile)', 'b-testimonials-block' ) } value={ columns?.mobile } onChange={ ( v ) => setColumn( 'mobile', v ) } min={ 1 } max={ 2 } />
					<TextControl label={ __( 'Column gap', 'b-testimonials-block' ) } value={ columnGap } onChange={ ( v ) => setAttributes( { columnGap: v } ) } />
					<TextControl label={ __( 'Row gap', 'b-testimonials-block' ) } value={ rowGap } onChange={ ( v ) => setAttributes( { rowGap: v } ) } />
				</PanelBody>

				<PanelBody title={ __( 'Badges', 'b-testimonials-block' ) } initialOpen={ false }>
					{ items.map( ( item, i ) => (
						<div key={ i } className="btb-badge-row">
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image' ] }
									value={ item?.img }
									onSelect={ ( m ) => updateItem( i, 'img', { id: m.id, url: m.url, alt: m.alt } ) }
									render={ ( { open } ) => (
										<Button variant="secondary" onClick={ open } className="btb-badge-pick">
											{ item?.img?.url ? <img src={ item.img.url } alt="" /> : __( 'Select icon', 'b-testimonials-block' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							<TextControl label={ __( 'Title', 'b-testimonials-block' ) } value={ item?.title || '' } onChange={ ( v ) => updateItem( i, 'title', v ) } />
							<TextControl label={ __( 'Subtitle', 'b-testimonials-block' ) } value={ item?.subtitle || '' } onChange={ ( v ) => updateItem( i, 'subtitle', v ) } />
							<Button isDestructive onClick={ () => removeItem( i ) }><Dashicon icon="trash" /> { __( 'Remove', 'b-testimonials-block' ) }</Button>
							<hr />
						</div>
					) ) }
					<Button variant="primary" onClick={ addItem }><Dashicon icon="plus" /> { __( 'Add badge', 'b-testimonials-block' ) }</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'bTrustBadges' } ) }>
				<div className="badges-grid" style={ gridVars( attributes ) }>
					{ items.map( ( item, i ) => (
						<div className="badge-item" key={ i }>
							{ item?.img?.url && <img className="badge-icon" src={ item.img.url } alt={ item?.img?.alt || '' } /> }
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
