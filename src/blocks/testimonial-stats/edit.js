import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, ToggleControl, PanelRow, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import BlockSwitcher from '../../shared/Components/Common/BlockSwitcher';
import SettingsTabs from '../../shared/Components/Backend/Settings/SettingsTabs';
import ItemCards from '../../shared/Components/Backend/Settings/ItemCards';
import usePreviewDevice, { colsForDevice, useDeviceKey } from '../../shared/utils/usePreviewDevice';
import Label from '../../../../bpl-tools/Components/Label/Label';
import Device from '../../../../bpl-tools/Components/Device/Device';
import { emUnit, perUnit, pxUnit } from '../../../../bpl-tools/utils/options';
import ColorsPanel from '../../shared/Components/Backend/Settings/ColorsPanel';
import SizeSpacingPanel from '../../shared/Components/Backend/Settings/SizeSpacingPanel';
import Style from '../../shared/Components/Common/Style';
import { ColorControl } from '../../../../bpl-tools/Components/ColorControl/ColorControl';

import './edit.scss';
import '../../shared/styles/stats.scss';

const COLUMN_MAX = { desktop: 6, tablet: 4, mobile: 2 };

const gridVars = ( { columns, columnGap, rowGap, accentColor } ) => ( {
	'--cols-d': columns?.desktop || 3,
	'--cols-t': columns?.tablet || 3,
	'--cols-m': columns?.mobile || 1,
	'--col-gap': columnGap,
	'--row-gap': rowGap,
	'--accent': accentColor,
} );

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const { items = [], columns, columnGap, rowGap, accentColor, animate } = attributes;

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
							<RangeControl label={ __( 'Columns:', 'b-testimonials-block' ) } value={ columns?.[ device ] } onChange={ ( v ) => setColumn( device, v ) } min={ 1 } max={ COLUMN_MAX[ device ] } step={ 1 } beforeIcon="grid-view" />
							<UnitControl className="mt20" label={ __( 'Column Gap:', 'b-testimonials-block' ) } labelPosition="left" value={ columnGap } onChange={ ( v ) => setAttributes( { columnGap: v } ) } units={ [ pxUnit( 30 ), perUnit( 3 ), emUnit( 2 ) ] } isResetValueOnUnitChange={ true } />
							<UnitControl className="mt20" label={ __( 'Row Gap:', 'b-testimonials-block' ) } labelPosition="left" value={ rowGap } onChange={ ( v ) => setAttributes( { rowGap: v } ) } units={ [ pxUnit( 40 ), perUnit( 3 ), emUnit( 2.5 ) ] } isResetValueOnUnitChange={ true } />
							<ToggleControl label={ __( 'Animate count', 'b-testimonials-block' ) } checked={ animate } onChange={ ( v ) => setAttributes( { animate: v } ) } />
						</PanelBody>

						<PanelBody className="bPlPanelBody" title={ __( 'Stats', 'b-testimonials-block' ) } initialOpen={ false }>
							{/* One stat at a time, matching the testimonial card editor. */}
							<ItemCards
								items={ items }
								onChange={ ( next ) => setAttributes( { items: next } ) }
								newItem={ { number: 100, prefix: '', suffix: '+', label: 'Label' } }
								itemLabel={ __( 'Stat', 'b-testimonials-block' ) }
								addLabel={ __( 'Add New Stat', 'b-testimonials-block' ) }
							>
								{ ( item, i, update ) => (
									<>
										<TextControl label={ __( 'Number', 'b-testimonials-block' ) } type="number" value={ item?.number } onChange={ ( v ) => update( 'number', Number( v ) ) } />
										<div className="btb-stat-inline">
											<TextControl label={ __( 'Prefix', 'b-testimonials-block' ) } value={ item?.prefix || '' } onChange={ ( v ) => update( 'prefix', v ) } />
											<TextControl label={ __( 'Suffix', 'b-testimonials-block' ) } value={ item?.suffix || '' } onChange={ ( v ) => update( 'suffix', v ) } />
										</div>
										<TextControl label={ __( 'Label', 'b-testimonials-block' ) } value={ item?.label || '' } onChange={ ( v ) => update( 'label', v ) } />
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
						<PanelBody className="bPlPanelBody" title={ __( 'Stat Colors', 'b-testimonials-block' ) } initialOpen={ false }>
							<ColorControl label={ __( 'Number color', 'b-testimonials-block' ) } value={ accentColor } onChange={ ( v ) => setAttributes( { accentColor: v } ) } />
						</PanelBody>

						</>
					}
				/>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'bTestimonialStats' } ) } id={ `btbTestimonialsDir-${ clientId }` }>
				<Style attributes={ attributes } clientId={ clientId } />
				<div className={ `stats-grid btb-ts-grid ${ attributes.surfaceColor || attributes.borderColor ? 'has-surface' : '' }` } style={ { ...gridVars( attributes ), '--cols-d': colsForDevice( attributes.columns, previewDevice, 3 ) } }>
					{ items.map( ( item, i ) => (
						<div className="stat-item btb-ts-item" key={ i }>
							<div className="stat-value btb-ts-value" style={ { color: accentColor } }>
								<span className="stat-prefix btb-ts-prefix">{ item?.prefix }</span>
								<span className="stat-number btb-ts-number">{ Number( item?.number ).toLocaleString() }</span>
								<span className="stat-suffix btb-ts-suffix">{ item?.suffix }</span>
							</div>
							<div className="stat-label btb-ts-label">{ item?.label }</div>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
};

export default Edit;
