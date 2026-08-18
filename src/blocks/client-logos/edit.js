import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, TextControl, PanelRow, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import BlockSwitcher from '../../shared/Components/Common/BlockSwitcher';
import SettingsTabs from '../../shared/Components/Backend/Settings/SettingsTabs';
import ItemCards from '../../shared/Components/Backend/Settings/ItemCards';
import { InlineDetailMediaUpload } from '../../../../bpl-tools/Components/MediaControl/MediaControl';
import usePreviewDevice, { colsForDevice, useDeviceKey } from '../../shared/utils/usePreviewDevice';
import Label from '../../../../bpl-tools/Components/Label/Label';
import Device from '../../../../bpl-tools/Components/Device/Device';
import { emUnit, perUnit, pxUnit } from '../../../../bpl-tools/utils/options';
import ColorsPanel from '../../shared/Components/Backend/Settings/ColorsPanel';
import SizeSpacingPanel from '../../shared/Components/Backend/Settings/SizeSpacingPanel';
import Style from '../../shared/Components/Common/Style';

import './edit.scss';
import '../../shared/styles/logos.scss';

const COLUMN_MAX = { desktop: 8, tablet: 6, mobile: 4 };

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

	// The device switch below is the editor's own preview device, so picking a
	// device there resizes the canvas and every other panel follows it. It used
	// to be local state, which let the switch say Tablet while the canvas stayed
	// on Desktop -- so the control edited a value the preview was not showing.
	//
	// That preview only becomes a real viewport when the canvas is iframed, which
	// one apiVersion 2 block anywhere on the site disables, which is why
	// colsForDevice below still resolves the column count by hand.
	const device = useDeviceKey();
	const previewDevice = usePreviewDevice();

	useEffect( () => {
		clientId && setAttributes( { cId: clientId.substring( 0, 10 ) } );
	}, [ clientId, setAttributes ] );

	const setColumn = ( device, val ) => setAttributes( { columns: { ...columns, [ device ]: val } } );


	return (
		<>
			<InspectorControls>
				<SettingsTabs
					general={
						<>
						<BlockSwitcher clientId={ clientId } />
						<PanelBody className="bPlPanelBody" title={ __( 'Layout', 'b-testimonials-block' ) }>
							{/* One responsive control behind the bpl-tools device switch, as the
							    shared Settings panel does, instead of three stacked ranges. */}
							<PanelRow>
								<Label mt="0">{ __( 'Device:', 'b-testimonials-block' ) }</Label>
								<Device className="" />
							</PanelRow>
							<RangeControl label={ __( 'Columns:', 'b-testimonials-block' ) } value={ columns?.[ device ] } onChange={ ( val ) => setColumn( device, val ) } min={ 1 } max={ COLUMN_MAX[ device ] } step={ 1 } beforeIcon="grid-view" />
							<UnitControl className="mt20" label={ __( 'Column Gap:', 'b-testimonials-block' ) } labelPosition="left" value={ columnGap } onChange={ ( val ) => setAttributes( { columnGap: val } ) } units={ [ pxUnit( 30 ), perUnit( 3 ), emUnit( 2 ) ] } isResetValueOnUnitChange={ true } />
							<UnitControl className="mt20" label={ __( 'Row Gap:', 'b-testimonials-block' ) } labelPosition="left" value={ rowGap } onChange={ ( val ) => setAttributes( { rowGap: val } ) } units={ [ pxUnit( 40 ), perUnit( 3 ), emUnit( 2.5 ) ] } isResetValueOnUnitChange={ true } />
						</PanelBody>

						<PanelBody className="bPlPanelBody" title={ __( 'Logos', 'b-testimonials-block' ) } initialOpen={ false }>
							{/* One logo at a time, matching the testimonial card editor. */}
							<ItemCards
								items={ logos }
								onChange={ ( next ) => setAttributes( { logos: next } ) }
								newItem={ { img: { url: '' }, link: '' } }
								itemLabel={ __( 'Logo', 'b-testimonials-block' ) }
								addLabel={ __( 'Add New Logo', 'b-testimonials-block' ) }
							>
								{ ( logo, index, update ) => (
									<>
										{/* bpl-tools picker: same { id, url, alt } shape, and it also
										    accepts a pasted URL, which the raw button did not. */}
										<InlineDetailMediaUpload
											label={ __( 'Logo', 'b-testimonials-block' ) }
											value={ logo?.img }
											onChange={ ( val ) => update( 'img', val ) }
										/>

										<TextControl label={ __( 'Link (optional)', 'b-testimonials-block' ) } value={ logo?.link || '' } onChange={ ( val ) => update( 'link', val ) } />
									</>
								) }
							</ItemCards>
						</PanelBody>
						</>
					}
					style={
						<>
						<ColorsPanel attributes={ attributes } setAttributes={ setAttributes } />
						<SizeSpacingPanel attributes={ attributes } setAttributes={ setAttributes } />
						<PanelBody className="bPlPanelBody" title={ __( 'Style', 'b-testimonials-block' ) } initialOpen={ false }>
							<RangeControl label={ __( 'Logo height (px)', 'b-testimonials-block' ) } value={ logoHeight } onChange={ ( val ) => setAttributes( { logoHeight: val } ) } min={ 20 } max={ 200 } />
							<ToggleControl label={ __( 'Grayscale (color on hover)', 'b-testimonials-block' ) } checked={ grayscale } onChange={ ( val ) => setAttributes( { grayscale: val } ) } />
						</PanelBody>

						</>
					}
				/>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'bClientLogos' } ) } id={ `btbTestimonialsDir-${ clientId }` }>
				<Style attributes={ attributes } clientId={ clientId } />
				<div className={ `logos-grid ${ grayscale ? 'is-grayscale' : '' } ${ attributes.trackColor || attributes.borderColor ? 'has-surface' : '' }` } style={ { ...gridVars( attributes ), '--cols-d': colsForDevice( attributes.columns, previewDevice, 4 ) } }>
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
