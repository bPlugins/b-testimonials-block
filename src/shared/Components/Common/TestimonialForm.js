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
		fieldLabels = {},
		fieldPlaceholders = {},
		accentColor,
		btnBg = '',
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

	// Every visible label and placeholder was a hardcoded `__()` string, so the
	// form could only ever ask for "Name", "Email", "Designation" -- there was no
	// way to word a question for the site, or to translate one on a site that is
	// not running in the plugin's own locale. Placeholders did not exist at all.
	//
	// Empty means "use the shipped wording", not "blank": that keeps the default
	// form identical to what it renders today and leaves the strings translatable
	// through the usual .po route for anyone who has not overridden them.
	const labelFor = ( key, fallback ) => fieldLabels?.[ key ] || fallback;

	// `undefined` rather than `''` so React omits the attribute entirely instead
	// of writing `placeholder=""`.
	const placeholderFor = ( key ) => fieldPlaceholders?.[ key ] || undefined;

	// The two required fields carry a marker after whatever they are called.
	const required = ( label ) => `${ label } *`;

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
					required( labelFor( 'name', __( 'Name', 'b-testimonials-block' ) ) ),
					// Not `name`: that is one of WordPress's public query vars, and
					// WP::parse_request() reads those out of $_POST as well as $_GET.
					// A submit that reached the page URL therefore asked WordPress for
					// a post whose slug was whatever the visitor typed, and got the
					// 404 template. The endpoint accepts the old name too, for pages
					// cached with the previous markup.
					<input type="text" name="btb_name" required placeholder={ placeholderFor( 'name' ) } />
				) }

				{ fields?.email && field(
					labelFor( 'email', __( 'Email', 'b-testimonials-block' ) ),
					<input type="email" name="email" placeholder={ placeholderFor( 'email' ) } />
				) }

				{ fields?.designation && field(
					labelFor( 'designation', __( 'Designation', 'b-testimonials-block' ) ),
					<input type="text" name="designation" placeholder={ placeholderFor( 'designation' ) } />
				) }

				{ fields?.company && field(
					labelFor( 'company', __( 'Company', 'b-testimonials-block' ) ),
					<input type="text" name="company" placeholder={ placeholderFor( 'company' ) } />
				) }

				{/* No placeholder: a select shows its selected option, so there is
				    nowhere for one to appear. */}
				{ fields?.rating && field(
					labelFor( 'rating', __( 'Rating', 'b-testimonials-block' ) ),
					<select name="rating" defaultValue="5">
						{ [ 5, 4, 3, 2, 1 ].map( ( n ) => <option key={ n } value={ n }>{ n }</option> ) }
					</select>
				) }

				{/* Nor here -- a file input renders the browser's own button and
				    "no file selected" text, neither of which `placeholder` reaches. */}
				{ fields?.image && field(
					labelFor( 'image', __( 'Photo', 'b-testimonials-block' ) ),
					<input type="file" name="image" accept="image/*" />
				) }

				{ field(
					required( labelFor( 'review', __( 'Review', 'b-testimonials-block' ) ) ),
					<textarea name="review" required placeholder={ placeholderFor( 'review' ) } />
				) }

				<button
					type="submit"
					className="btb-tform-submit"
					// Inline, so it outranks every stylesheet -- which is why the new
					// Background control painted nothing until it was named here.
					// `btnBg` first: the button's own colour is the more specific
					// choice, and Accent stays the default when it is empty.
					style={ { backgroundColor: btnBg || accentColor } }
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
