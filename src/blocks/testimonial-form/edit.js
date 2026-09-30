import { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, TextareaControl, ToggleControl, __experimentalUnitControl as UnitControl, __experimentalBoxControl as BoxControl } from '@wordpress/components';
import Typography from '../../../../bpl-tools/Components/Typography/Typography';
import BlockSwitcher from '../../shared/Components/Common/BlockSwitcher';
import SettingsTabs from '../../shared/Components/Backend/Settings/SettingsTabs';
import ColorsPanel from '../../shared/Components/Backend/Settings/ColorsPanel';
import FormFieldsPanel from '../../shared/Components/Backend/Settings/FormFieldsPanel';
import SizeSpacingPanel from '../../shared/Components/Backend/Settings/SizeSpacingPanel';
import Style from '../../shared/Components/Common/Style';
import TestimonialForm from '../../shared/Components/Common/TestimonialForm';
import { ColorControl } from '../../../../bpl-tools/Components/ColorControl/ColorControl';

import '../../shared/styles/form.scss';

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const { formTitle, buttonText, successMessage, fields, fieldLabels, fieldPlaceholders, btnBg, btnHoverBg, btnColor, btnHoverColor, btnTypo, btnPadding, btnRadius, btnWidth, btnAlign } = attributes;

	useEffect( () => {
		clientId && setAttributes( { cId: clientId.substring( 0, 10 ) } );
	}, [ clientId, setAttributes ] );

	const setField = ( key, val ) => setAttributes( { fields: { ...fields, [ key ]: val } } );

	// `fieldLabels` and `fieldPlaceholders` are kept beside `fields` rather than
	// folded into it. `fields` is a flat map of booleans in every form saved so
	// far, and turning its values into objects would have meant a deprecation for
	// a block whose only stored state is that map.
	const setText = ( bucket, key, val ) =>
		setAttributes( { [ bucket ]: { ...( attributes[ bucket ] || {} ), [ key ]: val } } );

	// One row per field, in the order the form renders them.
	//
	// `required` fields have no toggle -- the endpoint rejects a submission
	// without a name or a review, so offering to hide them would only build a
	// form that cannot be submitted. `hasPlaceholder` is false where the control
	// has nowhere to show one: a select displays its selected option, and a file
	// input draws the browser's own button and "no file selected" text.
	const fieldRows = [
		{ key: 'name', label: __( 'Name', 'b-testimonials-block' ), required: true, hasPlaceholder: true },
		{ key: 'rating', label: __( 'Rating', 'b-testimonials-block' ) },
		{ key: 'designation', label: __( 'Designation', 'b-testimonials-block' ), hasPlaceholder: true },
		{ key: 'company', label: __( 'Company', 'b-testimonials-block' ), hasPlaceholder: true },
		{ key: 'email', label: __( 'Email', 'b-testimonials-block' ), hasPlaceholder: true },
		{ key: 'image', label: __( 'Photo', 'b-testimonials-block' ), toggleLabel: __( 'Photo upload', 'b-testimonials-block' ) },
		{ key: 'review', label: __( 'Review', 'b-testimonials-block' ), required: true, hasPlaceholder: true },
	];

	// Wording is edited one field at a time, through a picker.
	//
	// Two shapes were tried before this and both fought the sidebar rather than
	// the other way round. Every field's Label and Placeholder inline turned a
	// five-line checklist into nineteen stacked controls; a collapsible section
	// per field inherited panel chrome meant for a top-level panel, and the
	// margin reset that fixed the nesting broke Gutenberg's own compensation, so
	// an open section indented and a closed one did not.
	//
	// A picker and two boxes is three controls however many fields there are, it
	// is the shape ItemsPanel already uses for per-item settings elsewhere in the
	// plugin, and it needs no CSS of its own -- so there is nothing left to
	// disagree with.
	const [ activeField, setActiveField ] = useState( 'name' );

	// Only fields actually on the form: wording controls for a hidden field are
	// the same dead control as a colour with nothing to paint.
	const namedFields = fieldRows.filter( ( { key, required } ) => required || !! fields?.[ key ] );

	// Switching a field off while it is picked would otherwise leave the boxes
	// editing something the form no longer renders.
	const field = namedFields.find( ( { key } ) => key === activeField ) || namedFields[ 0 ];

	return (
		<>
			<InspectorControls>
				<SettingsTabs
					general={
						<>
						<BlockSwitcher clientId={ clientId } />
						<PanelBody className="bPlPanelBody" title={ __( 'Form', 'b-testimonials-block' ) }>
							<TextControl label={ __( 'Title', 'b-testimonials-block' ) } value={ formTitle } onChange={ ( val ) => setAttributes( { formTitle: val } ) } />
							<TextControl label={ __( 'Button text', 'b-testimonials-block' ) } value={ buttonText } onChange={ ( val ) => setAttributes( { buttonText: val } ) } />
							<TextareaControl label={ __( 'Success message', 'b-testimonials-block' ) } value={ successMessage } onChange={ ( val ) => setAttributes( { successMessage: val } ) } />
						</PanelBody>



						{/* Which fields the form asks for. Toggles only -- putting each
						    field's Label and Placeholder inline here turned a five-line
						    checklist into a column of nineteen controls, and the one
						    thing this panel is for (is Email on or off?) stopped being
						    scannable. The wording lives in its own panel below. */}
						<PanelBody className="bPlPanelBody" title={ __( 'Fields', 'b-testimonials-block' ) } initialOpen={ false }>
							<p className="description">{ __( 'Name and Review are always shown and required.', 'b-testimonials-block' ) }</p>

							{ fieldRows.filter( ( { required } ) => ! required ).map( ( { key, label, toggleLabel } ) => (
								<ToggleControl
									key={ key }
									label={ toggleLabel || label }
									checked={ !! fields?.[ key ] }
									onChange={ ( val ) => setField( key, val ) }
								/>
							) ) }

							{ fields?.image && (
								<p className="description">{ __( 'Note: photo upload allows anonymous image uploads. Submissions stay pending until you approve them.', 'b-testimonials-block' ) }</p>
							) }
						</PanelBody>

						<PanelBody className="bPlPanelBody" title={ __( 'Labels & Placeholders', 'b-testimonials-block' ) } initialOpen={ false }>
							<p className="description">{ __( 'Pick a field, then change what it is called and the hint inside it. Leave a box empty to keep the default wording.', 'b-testimonials-block' ) }</p>

							{/* Renamed fields carry their new wording in the option, so the
							    picker doubles as the overview a collapsed list would have
							    given -- which fields have been reworded is readable without
							    stepping through them. */}
							<SelectControl
								label={ __( 'Field', 'b-testimonials-block' ) }
								value={ field?.key }
								options={ namedFields.map( ( { key, label } ) => ( {
									value: key,
									label: fieldLabels?.[ key ] ? `${ label } — ${ fieldLabels[ key ] }` : label,
								} ) ) }
								onChange={ setActiveField }
							/>

							{ field && (
								<>
									<TextControl
										label={ __( 'Label', 'b-testimonials-block' ) }
										value={ fieldLabels?.[ field.key ] || '' }
										onChange={ ( val ) => setText( 'fieldLabels', field.key, val ) }
										placeholder={ field.label }
									/>

									{ field.hasPlaceholder ? (
										<TextControl
											label={ __( 'Placeholder', 'b-testimonials-block' ) }
											value={ fieldPlaceholders?.[ field.key ] || '' }
											onChange={ ( val ) => setText( 'fieldPlaceholders', field.key, val ) }
										/>
									) : (
										<p className="description">
											{ __( 'This field has no placeholder: the browser draws its own text here.', 'b-testimonials-block' ) }
										</p>
									) }
								</>
							) }
						</PanelBody>

						</>
					}
					style={
						<>
						{/* Surface and Border are the input background and input border on
						    this layout -- nothing else in form.scss reads either role -- so
						    they are excluded here and offered in the Input Fields panel under
						    names that say what they paint. Same attributes either way, so a
						    form saved before this keeps the colours it has. */}
						<ColorsPanel attributes={ attributes } setAttributes={ setAttributes } exclude={ [ 'surfaceColor', 'borderColor', 'borderWidth' ] } />
						<SizeSpacingPanel attributes={ attributes } setAttributes={ setAttributes } />
						<FormFieldsPanel attributes={ attributes } setAttributes={ setAttributes } />
						{/* Appearance, so it belongs with the other Style panels rather than
						    beside the Title and Button text fields on General. The button had
						    exactly one control -- its text -- and everything else about it was
						    hardcoded in form.scss, so the one element a visitor is meant to
						    click was the only one nobody could style. Titled "Submit Button"
						    rather than "Button": the shared panels already collide on generic
						    names, which is what produced the duplicate Color/Colors panels
						    elsewhere in this plugin. */}
						<PanelBody className="bPlPanelBody" title={ __( 'Submit Button', 'b-testimonials-block' ) } initialOpen={ false }>
							<Typography label={ __( 'Typography', 'b-testimonials-block' ) } value={ btnTypo } onChange={ ( val ) => setAttributes( { btnTypo: val } ) } />

							{/* Empty means "use the accent", so a form whose Accent is set
							    keeps a matching button without anyone having to pick the
							    same colour twice. */}
							<ColorControl label={ __( 'Background:', 'b-testimonials-block' ) } value={ btnBg } onChange={ ( val ) => setAttributes( { btnBg: val } ) } />
							<ColorControl label={ __( 'Text Color:', 'b-testimonials-block' ) } value={ btnColor } onChange={ ( val ) => setAttributes( { btnColor: val } ) } />
							<ColorControl label={ __( 'Hover Background:', 'b-testimonials-block' ) } value={ btnHoverBg } onChange={ ( val ) => setAttributes( { btnHoverBg: val } ) } />
							<ColorControl label={ __( 'Hover Text Color:', 'b-testimonials-block' ) } value={ btnHoverColor } onChange={ ( val ) => setAttributes( { btnHoverColor: val } ) } />

							<BoxControl label={ __( 'Padding', 'b-testimonials-block' ) } values={ btnPadding } onChange={ ( val ) => setAttributes( { btnPadding: val } ) } />

							<UnitControl label={ __( 'Corner Radius:', 'b-testimonials-block' ) } value={ btnRadius } onChange={ ( val ) => setAttributes( { btnRadius: val } ) } />

							<SelectControl
								label={ __( 'Width', 'b-testimonials-block' ) }
								value={ btnWidth }
								options={ [
									{ label: __( 'Fit to text', 'b-testimonials-block' ), value: 'auto' },
									{ label: __( 'Full width', 'b-testimonials-block' ), value: 'full' },
								] }
								onChange={ ( val ) => setAttributes( { btnWidth: val } ) }
							/>

							{/* Only means anything while the button is fitted to its text;
							    a full-width button has nowhere to move. */}
							{ 'full' !== btnWidth && (
								<SelectControl
									label={ __( 'Alignment', 'b-testimonials-block' ) }
									value={ btnAlign }
									options={ [
										{ label: __( 'Left', 'b-testimonials-block' ), value: 'start' },
										{ label: __( 'Center', 'b-testimonials-block' ), value: 'center' },
										{ label: __( 'Right', 'b-testimonials-block' ), value: 'end' },
									] }
									onChange={ ( val ) => setAttributes( { btnAlign: val } ) }
								/>
							) }
						</PanelBody>
						</>
					}
				/>
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
