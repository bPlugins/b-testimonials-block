import { __ } from '@wordpress/i18n';

/**
 * The Testimonial Form block's markup, shared by the editor and the front end.
 *
 * It used to exist twice over, and neither copy worked: the editor rendered a
 * disabled `.btb-tform` preview, while the page got an entirely different
 * `.btb-form-wrapper` of read-only inputs with a `type="button"` submit. So the
 * block's own view script -- which binds to `.btb-tform[data-endpoint]` and posts
 * to the REST route in includes/form.php -- never found a form to bind, and the
 * Title, Button text, Success message and Fields controls changed nothing that
 * a visitor could see. One component means the controls drive both.
 *
 * `formEndpoint` and `formNonce` are injected by render.php rather than stored
 * as block attributes: a nonce is per-visitor and must not be baked into post
 * content.
 *
 * @param {Object}  props.attributes Block attributes.
 * @param {boolean} props.isBackend  True in the editor, where the fields are
 *                                   inert and nothing may be submitted.
 */
const TestimonialForm = ( { attributes = {}, isBackend = false } ) => {
	const {
		formTitle = '',
		buttonText = '',
		successMessage = '',
		fields = {},
		accentColor,
		badgeTitle = '',
		badgeCount = ''
	} = attributes;

	// Blocks saved before this block had its own editor described themselves
	// through the generic badge fields, so those stay as the fallback.
	const title = formTitle || badgeTitle || __( 'Leave a Customer Review', 'b-testimonials-block' );
	const button = buttonText || badgeCount || __( 'Submit Testimonial', 'b-testimonials-block' );

	const field = ( label, input ) => (
		<div className="btb-tform-field">
			<label>{ label }</label>
			{ input }
		</div>
	);

	return (
		<div className="bTestimonialForm">
			<form
				className="btb-tform"
				method="post"
				data-endpoint={ attributes.formEndpoint || '' }
				data-nonce={ attributes.formNonce || '' }
				data-success={ successMessage || '' }
				onSubmit={ isBackend ? ( e ) => e.preventDefault() : undefined }
			>
				{ title && <h3 className="btb-tform-title">{ title }</h3> }

				{ field(
					`${ __( 'Name', 'b-testimonials-block' ) } *`,
					<input type="text" name="name" required disabled={ isBackend } />
				) }

				{ fields?.email && field(
					__( 'Email', 'b-testimonials-block' ),
					<input type="email" name="email" disabled={ isBackend } />
				) }

				{ fields?.designation && field(
					__( 'Designation', 'b-testimonials-block' ),
					<input type="text" name="designation" disabled={ isBackend } />
				) }

				{ fields?.company && field(
					__( 'Company', 'b-testimonials-block' ),
					<input type="text" name="company" disabled={ isBackend } />
				) }

				{ fields?.rating && field(
					__( 'Rating', 'b-testimonials-block' ),
					<select name="rating" defaultValue="5" disabled={ isBackend }>
						{ [ 5, 4, 3, 2, 1 ].map( ( n ) => <option key={ n } value={ n }>{ n }</option> ) }
					</select>
				) }

				{ fields?.image && field(
					__( 'Photo', 'b-testimonials-block' ),
					<input type="file" name="image" accept="image/*" disabled={ isBackend } />
				) }

				{ field(
					`${ __( 'Review', 'b-testimonials-block' ) } *`,
					<textarea name="review" required disabled={ isBackend } />
				) }

				<button
					type="submit"
					className="btb-tform-submit"
					style={ { backgroundColor: accentColor } }
					disabled={ isBackend }
				>
					{ button }
				</button>

				{/* The view script writes the success or error text in here. */}
				<p className="btb-tform-msg" />
			</form>
		</div>
	);
};

export default TestimonialForm;
