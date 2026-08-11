import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, TextControl, Button, Dashicon } from '@wordpress/components';
import { produce } from 'immer';
import BlockSwitcher from '../../shared/Components/Common/BlockSwitcher';
import ColorsPanel from '../../shared/Components/Backend/Settings/ColorsPanel';
import Style from '../../shared/Components/Common/Style';

import './edit.scss';
import '../../shared/styles/logos.scss';

const gridVars = ( { columns, columnGap, rowGap, logoHeight } ) => ( {
	'--cols-d': columns?.desktop || 4,
	'--cols-t': columns?.tablet || 3,
	'--cols-m': columns?.mobile || 2,
	'--col-gap': columnGap,
	'--row-gap': rowGap,
	'--logo-h': `${ logoHeight }px`,
} );

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const { logos = [], columns, columnGap, rowGap, logoHeight, grayscale } = attributes;

	useEffect( () => {
		clientId && setAttributes( { cId: clientId.substring( 0, 10 ) } );
	}, [ clientId, setAttributes ] );

	const setColumn = ( device, val ) => setAttributes( { columns: { ...columns, [ device ]: val } } );

	const updateLogo = ( index, key, val ) => {
		setAttributes( { logos: produce( logos, ( draft ) => { draft[ index ][ key ] = val; } ) } );
	};

	const addLogo = () => setAttributes( { logos: [ ...logos, { img: { url: '' }, link: '' } ] } );

	const removeLogo = ( index ) => setAttributes( { logos: logos.filter( ( _, i ) => i !== index ) } );

	return (
		<>
			<InspectorControls>
				<BlockSwitcher clientId={ clientId } />
				<ColorsPanel attributes={ attributes } setAttributes={ setAttributes } />
				<PanelBody className="bPlPanelBody" title={ __( 'Layout', 'b-testimonials-block' ) }>
					<RangeControl label={ __( 'Columns (Desktop)', 'b-testimonials-block' ) } value={ columns?.desktop } onChange={ ( val ) => setColumn( 'desktop', val ) } min={ 1 } max={ 8 } />
					<RangeControl label={ __( 'Columns (Tablet)', 'b-testimonials-block' ) } value={ columns?.tablet } onChange={ ( val ) => setColumn( 'tablet', val ) } min={ 1 } max={ 6 } />
					<RangeControl label={ __( 'Columns (Mobile)', 'b-testimonials-block' ) } value={ columns?.mobile } onChange={ ( val ) => setColumn( 'mobile', val ) } min={ 1 } max={ 4 } />
					<TextControl label={ __( 'Column gap', 'b-testimonials-block' ) } value={ columnGap } onChange={ ( val ) => setAttributes( { columnGap: val } ) } />
					<TextControl label={ __( 'Row gap', 'b-testimonials-block' ) } value={ rowGap } onChange={ ( val ) => setAttributes( { rowGap: val } ) } />
				</PanelBody>

				<PanelBody className="bPlPanelBody" title={ __( 'Style', 'b-testimonials-block' ) } initialOpen={ false }>
					<RangeControl label={ __( 'Logo height (px)', 'b-testimonials-block' ) } value={ logoHeight } onChange={ ( val ) => setAttributes( { logoHeight: val } ) } min={ 20 } max={ 200 } />
					<ToggleControl label={ __( 'Grayscale (color on hover)', 'b-testimonials-block' ) } checked={ grayscale } onChange={ ( val ) => setAttributes( { grayscale: val } ) } />
				</PanelBody>

				<PanelBody className="bPlPanelBody" title={ __( 'Logos', 'b-testimonials-block' ) } initialOpen={ false }>
					{ logos.map( ( logo, index ) => (
						<div key={ index } className="btb-logo-row">
							<MediaUploadCheck>
								<MediaUpload
									allowedTypes={ [ 'image' ] }
									value={ logo?.img }
									onSelect={ ( media ) => updateLogo( index, 'img', { id: media.id, url: media.url, alt: media.alt } ) }
									render={ ( { open } ) => (
										<Button variant="secondary" onClick={ open } className="btb-logo-pick">
											{ logo?.img?.url ? <img src={ logo.img.url } alt="" /> : __( 'Select image', 'b-testimonials-block' ) }
										</Button>
									) }
								/>
							</MediaUploadCheck>

							<TextControl placeholder={ __( 'Link (optional)', 'b-testimonials-block' ) } value={ logo?.link || '' } onChange={ ( val ) => updateLogo( index, 'link', val ) } />

							<Button isDestructive onClick={ () => removeLogo( index ) } label={ __( 'Remove', 'b-testimonials-block' ) }>
								<Dashicon icon="trash" />
							</Button>
						</div>
					) ) }

					<Button variant="primary" onClick={ addLogo }>
						<Dashicon icon="plus" /> { __( 'Add logo', 'b-testimonials-block' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'bClientLogos', id: `btbTestimonialsDir-${ clientId }` } ) }>
				<Style attributes={ attributes } clientId={ clientId } />
				<div className={ `logos-grid ${ grayscale ? 'is-grayscale' : '' }` } style={ gridVars( attributes ) }>
					{ logos.map( ( logo, index ) => (
						<div className="logo-item" key={ index }>
							{ logo?.img?.url && <img src={ logo.img.url } alt={ logo?.img?.alt || '' } /> }
						</div>
					) ) }
				</div>
			</div>
		</>
	);
};

export default Edit;
