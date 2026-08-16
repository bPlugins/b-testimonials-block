import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, ToggleControl, Button, Dashicon, PanelRow, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { produce } from 'immer';
import BlockSwitcher from '../../shared/Components/Common/BlockSwitcher';
import SettingsTabs from '../../shared/Components/Backend/Settings/SettingsTabs';
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
	const updateItem = ( i, key, val ) => setAttributes( { items: produce( items, ( d ) => { d[ i ][ key ] = val; } ) } );
	const addItem = () => setAttributes( { items: [ ...items, { number: 100, prefix: '', suffix: '+', label: 'Label' } ] } );
	const removeItem = ( i ) => setAttributes( { items: items.filter( ( _, idx ) => idx !== i ) } );

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
							{ items.map( ( item, i ) => (
								<div key={ i } className="btb-stat-row">
									<TextControl label={ __( 'Number', 'b-testimonials-block' ) } type="number" value={ item?.number } onChange={ ( v ) => updateItem( i, 'number', Number( v ) ) } />
									<div className="btb-stat-inline">
										<TextControl label={ __( 'Prefix', 'b-testimonials-block' ) } value={ item?.prefix || '' } onChange={ ( v ) => updateItem( i, 'prefix', v ) } />
										<TextControl label={ __( 'Suffix', 'b-testimonials-block' ) } value={ item?.suffix || '' } onChange={ ( v ) => updateItem( i, 'suffix', v ) } />
									</div>
									<TextControl label={ __( 'Label', 'b-testimonials-block' ) } value={ item?.label || '' } onChange={ ( v ) => updateItem( i, 'label', v ) } />
									<Button isDestructive onClick={ () => removeItem( i ) }><Dashicon icon="trash" /> { __( 'Remove', 'b-testimonials-block' ) }</Button>
									<hr />
								</div>
							) ) }
							<Button variant="primary" onClick={ addItem }><Dashicon icon="plus" /> { __( 'Add stat', 'b-testimonials-block' ) }</Button>
						</PanelBody>
						</>
					}
					style={
						<>
						<ColorsPanel attributes={ attributes } setAttributes={ setAttributes } />
						<SizeSpacingPanel attributes={ attributes } setAttributes={ setAttributes } />
						<PanelBody className="bPlPanelBody" title={ __( 'Color', 'b-testimonials-block' ) } initialOpen={ false }>
							<ColorControl label={ __( 'Number color', 'b-testimonials-block' ) } value={ accentColor } onChange={ ( v ) => setAttributes( { accentColor: v } ) } />
						</PanelBody>

						</>
					}
				/>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'bTestimonialStats' } ) } id={ `btbTestimonialsDir-${ clientId }` }>
				<Style attributes={ attributes } clientId={ clientId } />
				<div className={ `stats-grid ${ attributes.surfaceColor || attributes.borderColor ? 'has-surface' : '' }` } style={ { ...gridVars( attributes ), '--cols-d': colsForDevice( attributes.columns, previewDevice, 3 ) } }>
					{ items.map( ( item, i ) => (
						<div className="stat-item" key={ i }>
							<div className="stat-value" style={ { color: accentColor } }>
								<span className="stat-prefix">{ item?.prefix }</span>
								<span className="stat-number">{ Number( item?.number ).toLocaleString() }</span>
								<span className="stat-suffix">{ item?.suffix }</span>
							</div>
							<div className="stat-label">{ item?.label }</div>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
};

export default Edit;
