import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, ToggleControl } from '@wordpress/components';
import BlockSwitcher from '../../shared/Components/Common/BlockSwitcher';
import ColorsPanel from '../../shared/Components/Backend/Settings/ColorsPanel';
import SizeSpacingPanel from '../../shared/Components/Backend/Settings/SizeSpacingPanel';
import Style from '../../shared/Components/Common/Style';
import TestimonialForm from '../../shared/Components/Common/TestimonialForm';
import { ColorControl } from '../../../../bpl-tools/Components/ColorControl/ColorControl';

import '../../shared/styles/form.scss';

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const { formTitle, buttonText, successMessage, fields, accentColor } = attributes;

	useEffect( () => {
		clientId && setAttributes( { cId: clientId.substring( 0, 10 ) } );
	}, [ clientId, setAttributes ] );

	const setField = ( key, val ) => setAttributes( { fields: { ...fields, [ key ]: val } } );

	const fieldToggles = [
		[ 'rating', __( 'Rating', 'b-testimonials-block' ) ],
		[ 'designation', __( 'Designation', 'b-testimonials-block' ) ],
		[ 'company', __( 'Company', 'b-testimonials-block' ) ],
		[ 'email', __( 'Email', 'b-testimonials-block' ) ],
		[ 'image', __( 'Photo upload', 'b-testimonials-block' ) ],
	];

	return (
		<>
			<InspectorControls>
				<BlockSwitcher clientId={ clientId } />
				<ColorsPanel attributes={ attributes } setAttributes={ setAttributes } />
				<SizeSpacingPanel attributes={ attributes } setAttributes={ setAttributes } />
				<PanelBody className="bPlPanelBody" title={ __( 'Form', 'b-testimonials-block' ) }>
					<TextControl label={ __( 'Title', 'b-testimonials-block' ) } value={ formTitle } onChange={ ( val ) => setAttributes( { formTitle: val } ) } />
					<TextControl label={ __( 'Button text', 'b-testimonials-block' ) } value={ buttonText } onChange={ ( val ) => setAttributes( { buttonText: val } ) } />
					<TextareaControl label={ __( 'Success message', 'b-testimonials-block' ) } value={ successMessage } onChange={ ( val ) => setAttributes( { successMessage: val } ) } />
				</PanelBody>

				<PanelBody className="bPlPanelBody" title={ __( 'Fields', 'b-testimonials-block' ) } initialOpen={ false }>
					<p className="description">{ __( 'Name and Review are always shown and required.', 'b-testimonials-block' ) }</p>
					{ fieldToggles.map( ( [ key, label ] ) => (
						<ToggleControl key={ key } label={ label } checked={ !! fields?.[ key ] } onChange={ ( val ) => setField( key, val ) } />
					) ) }
					{ fields?.image && (
						<p className="description">{ __( 'Note: photo upload allows anonymous image uploads. Submissions stay pending until you approve them.', 'b-testimonials-block' ) }</p>
					) }
				</PanelBody>

				<PanelBody className="bPlPanelBody" title={ __( 'Color', 'b-testimonials-block' ) } initialOpen={ false }>
					<ColorControl label={ __( 'Accent (button)', 'b-testimonials-block' ) } value={ accentColor } onChange={ ( val ) => setAttributes( { accentColor: val } ) } />
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() } id={ `btbTestimonialsDir-${ clientId }` }>
				<Style attributes={ attributes } clientId={ clientId } />
				{/* Same component the front end renders, so the preview cannot drift
				    away from the published form again. */}
				<TestimonialForm attributes={ attributes } isBackend={ true } />
			</div>
		</>
	);
};

export default Edit;
