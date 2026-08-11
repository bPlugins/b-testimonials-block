import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, ToggleControl } from '@wordpress/components';
import BlockSwitcher from '../../shared/Components/Common/BlockSwitcher';
import ColorsPanel from '../../shared/Components/Backend/Settings/ColorsPanel';
import Style from '../../shared/Components/Common/Style';
import { ColorControl } from '../../../../bpl-tools/Components/ColorControl/ColorControl';

import '../../shared/styles/rating-summary.scss';

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const { rating, outOf, count, showCount, countText, starColor, stacked, badgeTitle, badgeScore, badgeCount } = attributes;

	useEffect( () => {
		clientId && setAttributes( { cId: clientId.substring( 0, 10 ) } );
	}, [ clientId, setAttributes ] );

	const pct = outOf > 0 ? Math.min( 100, ( rating / outOf ) * 100 ) : 0;
	const countLabel = ( countText || '' ).replace( '{count}', Number( count ).toLocaleString() );

	return (
		<>
			<InspectorControls>
				<BlockSwitcher clientId={ clientId } />
				<ColorsPanel attributes={ attributes } setAttributes={ setAttributes } />
				<PanelBody className="bPlPanelBody" title={ __( 'Rating', 'b-testimonials-block' ) }>
					<RangeControl label={ __( 'Rating', 'b-testimonials-block' ) } value={ rating } onChange={ ( val ) => setAttributes( { rating: val } ) } min={ 0 } max={ outOf } step={ 0.1 } />
					<RangeControl label={ __( 'Out of', 'b-testimonials-block' ) } value={ outOf } onChange={ ( val ) => setAttributes( { outOf: val } ) } min={ 1 } max={ 10 } />
					<ToggleControl label={ __( 'Show review count', 'b-testimonials-block' ) } checked={ showCount } onChange={ ( val ) => setAttributes( { showCount: val } ) } />
					{ showCount && <>
						<RangeControl label={ __( 'Review count', 'b-testimonials-block' ) } value={ count } onChange={ ( val ) => setAttributes( { count: val } ) } min={ 0 } max={ 100000 } step={ 1 } />
						<TextControl label={ __( 'Count text', 'b-testimonials-block' ) } help={ __( 'Use {count} for the number.', 'b-testimonials-block' ) } value={ countText } onChange={ ( val ) => setAttributes( { countText: val } ) } />
					</> }
					<ToggleControl label={ __( 'Stacked layout', 'b-testimonials-block' ) } checked={ stacked } onChange={ ( val ) => setAttributes( { stacked: val } ) } />
				</PanelBody>

				{ /*
				  * The front end renders this block through Layout.js, which reads
				  * badgeScore/badgeCount and the per-star percentages -- not the
				  * rating/count fields above. Without these controls those values
				  * were unreachable, so the published block ignored the editor.
				  */ }
				<PanelBody className="bPlPanelBody" title={ __( 'Published Summary', 'b-testimonials-block' ) } initialOpen={ false }>
					<TextControl label={ __( 'Heading', 'b-testimonials-block' ) } value={ badgeTitle || '' } onChange={ ( val ) => setAttributes( { badgeTitle: val } ) } />
					<TextControl label={ __( 'Score', 'b-testimonials-block' ) } help={ __( 'Leave empty to calculate from your testimonials.', 'b-testimonials-block' ) } value={ badgeScore || '' } onChange={ ( val ) => setAttributes( { badgeScore: val } ) } />
					<TextControl label={ __( 'Count text', 'b-testimonials-block' ) } help={ __( 'Leave empty to calculate from your testimonials.', 'b-testimonials-block' ) } value={ badgeCount || '' } onChange={ ( val ) => setAttributes( { badgeCount: val } ) } />

					{ [ 5, 4, 3, 2, 1 ].map( ( star ) => (
						<RangeControl
							key={ star }
							label={ `${ star } ${ 1 === star ? __( 'Star', 'b-testimonials-block' ) : __( 'Stars', 'b-testimonials-block' ) } (%)` }
							value={ attributes[ `star${ star }Pct` ] ?? undefined }
							onChange={ ( val ) => setAttributes( { [ `star${ star }Pct` ]: val } ) }
							min={ 0 }
							max={ 100 }
							allowReset={ true }
						/>
					) ) }
				</PanelBody>

				<PanelBody className="bPlPanelBody" title={ __( 'Color', 'b-testimonials-block' ) } initialOpen={ false }>
					<ColorControl label={ __( 'Star color', 'b-testimonials-block' ) } value={ starColor } onChange={ ( val ) => setAttributes( { starColor: val } ) } />
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps( { className: `bRatingSummary ${ stacked ? 'is-stacked' : '' }`, id: `btbTestimonialsDir-${ clientId }` } ) }>
				<Style attributes={ attributes } clientId={ clientId } />
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
