import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, ToggleControl } from '@wordpress/components';
import BlockSwitcher from '@shared/Components/Common/BlockSwitcher';

import '@shared/styles/rating-summary.scss';

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const { rating, outOf, count, showCount, countText, starColor, stacked } = attributes;

	useEffect( () => {
		clientId && setAttributes( { cId: clientId.substring( 0, 10 ) } );
	}, [ clientId ] );

	const pct = outOf > 0 ? Math.min( 100, ( rating / outOf ) * 100 ) : 0;
	const countLabel = ( countText || '' ).replace( '{count}', Number( count ).toLocaleString() );

	return (
		<>
			<InspectorControls>
				<BlockSwitcher clientId={ clientId } />
				<PanelBody title={ __( 'Rating', 'b-testimonials-block' ) }>
					<RangeControl label={ __( 'Rating', 'b-testimonials-block' ) } value={ rating } onChange={ ( val ) => setAttributes( { rating: val } ) } min={ 0 } max={ outOf } step={ 0.1 } />
					<RangeControl label={ __( 'Out of', 'b-testimonials-block' ) } value={ outOf } onChange={ ( val ) => setAttributes( { outOf: val } ) } min={ 1 } max={ 10 } />
					<ToggleControl label={ __( 'Show review count', 'b-testimonials-block' ) } checked={ showCount } onChange={ ( val ) => setAttributes( { showCount: val } ) } />
					{ showCount && <>
						<RangeControl label={ __( 'Review count', 'b-testimonials-block' ) } value={ count } onChange={ ( val ) => setAttributes( { count: val } ) } min={ 0 } max={ 100000 } step={ 1 } />
						<TextControl label={ __( 'Count text', 'b-testimonials-block' ) } help={ __( 'Use {count} for the number.', 'b-testimonials-block' ) } value={ countText } onChange={ ( val ) => setAttributes( { countText: val } ) } />
					</> }
					<ToggleControl label={ __( 'Stacked layout', 'b-testimonials-block' ) } checked={ stacked } onChange={ ( val ) => setAttributes( { stacked: val } ) } />
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color', 'b-testimonials-block' ) }
					initialOpen={ false }
					colorSettings={ [ { value: starColor, onChange: ( val ) => setAttributes( { starColor: val } ), label: __( 'Star color', 'b-testimonials-block' ) } ] }
				/>
			</InspectorControls>

			<div { ...useBlockProps( { className: `bRatingSummary ${ stacked ? 'is-stacked' : '' }` } ) }>
				<div className="rs-score">{ rating }</div>
				<div className="rs-stars">
					<div className="rs-stars-base">★★★★★</div>
					<div className="rs-stars-fill" style={ { width: `${ pct }%`, color: starColor } }>★★★★★</div>
				</div>
				{ showCount && <div className="rs-count">{ countLabel }</div> }
			</div>
		</>
	);
};

export default Edit;
