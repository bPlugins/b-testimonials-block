import { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, ToggleControl } from '@wordpress/components';

import '@shared/styles/form.scss';

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const { formTitle, buttonText, successMessage, fields, accentColor } = attributes;

	useEffect( () => {
		clientId && setAttributes( { cId: clientId.substring( 0, 10 ) } );
	}, [ clientId ] );

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
				<PanelBody title={ __( 'Form', 'b-testimonials-block' ) }>
					<TextControl label={ __( 'Title', 'b-testimonials-block' ) } value={ formTitle } onChange={ ( val ) => setAttributes( { formTitle: val } ) } />
					<TextControl label={ __( 'Button text', 'b-testimonials-block' ) } value={ buttonText } onChange={ ( val ) => setAttributes( { buttonText: val } ) } />
					<TextareaControl label={ __( 'Success message', 'b-testimonials-block' ) } value={ successMessage } onChange={ ( val ) => setAttributes( { successMessage: val } ) } />
				</PanelBody>

				<PanelBody title={ __( 'Fields', 'b-testimonials-block' ) } initialOpen={ false }>
					<p className="description">{ __( 'Name and Review are always shown and required.', 'b-testimonials-block' ) }</p>
					{ fieldToggles.map( ( [ key, label ] ) => (
						<ToggleControl key={ key } label={ label } checked={ !! fields?.[ key ] } onChange={ ( val ) => setField( key, val ) } />
					) ) }
					{ fields?.image && (
						<p className="description">{ __( 'Note: photo upload allows anonymous image uploads. Submissions stay pending until you approve them.', 'b-testimonials-block' ) }</p>
					) }
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color', 'b-testimonials-block' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: accentColor,
							onChange: ( val ) => setAttributes( { accentColor: val } ),
							label: __( 'Accent (button)', 'b-testimonials-block' ),
						},
					] }
				/>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'bTestimonialForm' } ) }>
				<form className="btb-tform" onSubmit={ ( e ) => e.preventDefault() }>
					{ formTitle && <h3 className="btb-tform-title">{ formTitle }</h3> }

					<div className="btb-tform-field">
						<label>{ __( 'Name', 'b-testimonials-block' ) } *</label>
						<input type="text" disabled />
					</div>

					{ fields?.email && (
						<div className="btb-tform-field">
							<label>{ __( 'Email', 'b-testimonials-block' ) }</label>
							<input type="email" disabled />
						</div>
					) }

					{ fields?.designation && (
						<div className="btb-tform-field">
							<label>{ __( 'Designation', 'b-testimonials-block' ) }</label>
							<input type="text" disabled />
						</div>
					) }

					{ fields?.company && (
						<div className="btb-tform-field">
							<label>{ __( 'Company', 'b-testimonials-block' ) }</label>
							<input type="text" disabled />
						</div>
					) }

					{ fields?.rating && (
						<div className="btb-tform-field">
							<label>{ __( 'Rating', 'b-testimonials-block' ) }</label>
							<select disabled>
								{ [ 5, 4, 3, 2, 1 ].map( ( n ) => <option key={ n }>{ n }</option> ) }
							</select>
						</div>
					) }

					{ fields?.image && (
						<div className="btb-tform-field">
							<label>{ __( 'Photo', 'b-testimonials-block' ) }</label>
							<input type="file" accept="image/*" disabled />
						</div>
					) }

					<div className="btb-tform-field">
						<label>{ __( 'Review', 'b-testimonials-block' ) } *</label>
						<textarea disabled />
					</div>

					<button type="submit" className="btb-tform-submit" style={ { backgroundColor: accentColor } } disabled>
						{ buttonText }
					</button>
				</form>
			</div>
		</>
	);
};

export default Edit;
