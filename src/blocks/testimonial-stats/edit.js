import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, ToggleControl, Button, Dashicon } from '@wordpress/components';
import { produce } from 'immer';
import BlockSwitcher from '../../shared/Components/Common/BlockSwitcher';

import './edit.scss';
import '../../shared/styles/stats.scss';

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

	useEffect( () => {
		clientId && setAttributes( { cId: clientId.substring( 0, 10 ) } );
	}, [ clientId ] );

	const setColumn = ( device, val ) => setAttributes( { columns: { ...columns, [ device ]: val } } );
	const updateItem = ( i, key, val ) => setAttributes( { items: produce( items, ( d ) => { d[ i ][ key ] = val; } ) } );
	const addItem = () => setAttributes( { items: [ ...items, { number: 100, prefix: '', suffix: '+', label: 'Label' } ] } );
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
					<ToggleControl label={ __( 'Animate count', 'b-testimonials-block' ) } checked={ animate } onChange={ ( v ) => setAttributes( { animate: v } ) } />
				</PanelBody>

				<PanelColorSettings title={ __( 'Color', 'b-testimonials-block' ) } initialOpen={ false } colorSettings={ [ { value: accentColor, onChange: ( v ) => setAttributes( { accentColor: v } ), label: __( 'Number color', 'b-testimonials-block' ) } ] } />

				<PanelBody title={ __( 'Stats', 'b-testimonials-block' ) } initialOpen={ false }>
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
			</InspectorControls>

			<div { ...useBlockProps( { className: 'bTestimonialStats' } ) }>
				<div className="stats-grid" style={ gridVars( attributes ) }>
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
