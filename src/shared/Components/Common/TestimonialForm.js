import { useState } from 'react';
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
 * `formEndpoint`, `formNonce` and `formRestNonce` are injected by render.php
 * rather than stored as block attributes: a nonce is per-visitor and must not be
 * baked into post content.
 *
 * @param {Object}  props.attributes Block attributes.
 * @param {boolean} props.isBackend  True in the editor, where the fields can be
 *                                   filled in to see the form take shape but
 *                                   nothing may be submitted.
 */
const TestimonialForm = ( { attributes = {}, isBackend = false } ) => {
	// Editor-only. On a page the block's view script writes into
	// `.btb-tform-msg` itself, so React must leave that node empty there.
	const [ previewNote, setPreviewNote ] = useState( '' );

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
				// Posting to the endpoint rather than to the page is the safe
				// default if a submit ever escapes the view script: the page URL
				// would hand WordPress the fields as query vars.
				action={ isBackend ? undefined : attributes.formEndpoint || '' }
				data-endpoint={ attributes.formEndpoint || '' }
				data-nonce={ attributes.formNonce || '' }
				data-rest-nonce={ attributes.formRestNonce || '' }
				data-success={ successMessage || '' }
				// The fields themselves are live in the editor so the form can
				// be tried out while it is being styled -- they used to be
				// `disabled`, which left the whole block unusable there. Only
				// the submit is stopped, and `noValidate` keeps the browser's
				// own required-field bubble from pre-empting the note below.
				noValidate={ isBackend }
				onSubmit={
					isBackend
						? ( e ) => {
							e.preventDefault();
							setPreviewNote( __( 'Preview only. The form accepts submissions on the published page.', 'b-testimonials-block' ) );
						}
						: undefined
				}
			>
				{ title && <h3 className="btb-tform-title">{ title }</h3> }

				{/* Carried in the markup rather than appended in JS, so the field
				    set is complete whichever way the form is posted. */}
				{ ! isBackend && attributes.formNonce && (
					<input type="hidden" name="nonce" value={ attributes.formNonce } />
				) }

				{ field(
					`${ __( 'Name', 'b-testimonials-block' ) } *`,
					// Not `name`: that is one of WordPress's public query vars, and
					// WP::parse_request() reads those out of $_POST as well as $_GET.
					// A submit that reached the page URL therefore asked WordPress for
					// a post whose slug was whatever the visitor typed, and got the
					// 404 template. The endpoint accepts the old name too, for pages
					// cached with the previous markup.
					<input type="text" name="btb_name" required />
				) }

				{ fields?.email && field(
					__( 'Email', 'b-testimonials-block' ),
					<input type="email" name="email" />
				) }

				{ fields?.designation && field(
					__( 'Designation', 'b-testimonials-block' ),
					<input type="text" name="designation" />
				) }

				{ fields?.company && field(
					__( 'Company', 'b-testimonials-block' ),
					<input type="text" name="company" />
				) }

				{ fields?.rating && field(
					__( 'Rating', 'b-testimonials-block' ),
					<select name="rating" defaultValue="5">
						{ [ 5, 4, 3, 2, 1 ].map( ( n ) => <option key={ n } value={ n }>{ n }</option> ) }
					</select>
				) }

				{ fields?.image && field(
					__( 'Photo', 'b-testimonials-block' ),
					<input type="file" name="image" accept="image/*" />
				) }

				{ field(
					`${ __( 'Review', 'b-testimonials-block' ) } *`,
					<textarea name="review" required />
				) }

				<button
					type="submit"
					className="btb-tform-submit"
					style={ { backgroundColor: accentColor } }
				>
					{ button }
				</button>

				{/* The view script writes the success or error text in here, so
				    on a page this stays empty for it to fill -- and it sets the
				    modifier class that makes the element visible, which is why
				    the editor's own note has to bring one too. */}
				<p className={ `btb-tform-msg${ isBackend && previewNote ? ' is-notice' : '' }` }>
					{ isBackend ? previewNote : null }
				</p>
			</form>
		</div>
	);
};

export default TestimonialForm;
