import '../../shared/styles/frontend.scss';
import '../../shared/view';
import '../../shared/styles/form.scss';

const setMessage = ( form, text, type ) => {
	const msg = form.querySelector( '.btb-tform-msg' );
	if ( ! msg ) {
		return;
	}
	msg.textContent = text;
	msg.className = `btb-tform-msg is-${ type }`;
};

const submitForm = async ( form ) => {
	const submitBtn = form.querySelector( '.btb-tform-submit' );
	const endpoint = form.dataset.endpoint;

	// Nothing to post to: render.php fills this in, so an empty value means
	// stale cached markup rather than a visitor mistake.
	if ( ! endpoint ) {
		setMessage( form, 'This form is not available right now. Please reload the page.', 'error' );
		return;
	}

	const data = new FormData( form );
	if ( ! data.has( 'nonce' ) ) {
		data.append( 'nonce', form.dataset.nonce || '' );
	}

	// Cookie-authenticated REST requests must carry the REST nonce, or
	// WordPress drops the current user to 0 for the duration of the
	// request -- which makes the form's own nonce fail to verify for
	// anyone logged in. Anonymous visitors are unaffected either way.
	const restNonce =
		form.dataset.restNonce ||
		( window.wpApiSettings && window.wpApiSettings.nonce ) ||
		'';
	const headers = restNonce ? { 'X-WP-Nonce': restNonce } : {};

	if ( submitBtn ) {
		submitBtn.disabled = true;
	}
	setMessage( form, '', '' );

	try {
		const res = await fetch( endpoint, {
			method: 'POST',
			body: data,
			headers,
			credentials: 'same-origin',
		} );
		const json = await res.json();

		if ( res.ok && json.success ) {
			setMessage( form, form.dataset.success || json.message, 'success' );
			form.reset();
		} else if ( 'rest_cookie_invalid_nonce' === json.code ) {
			// A page cached long enough for the nonce to expire. WordPress's
			// own wording here ("Cookie check failed") means nothing to a
			// visitor, so say what actually helps.
			setMessage( form, 'This page has been open too long. Please reload and try again.', 'error' );
		} else {
			setMessage( form, json.message || 'Submission failed.', 'error' );
		}
	} catch ( err ) {
		setMessage( form, 'Submission failed. Please try again.', 'error' );
	} finally {
		if ( submitBtn ) {
			submitBtn.disabled = false;
		}
	}
};

// One delegated listener rather than one per form.
//
// The form is rendered by React (shared/view), so it is not in the DOM when this
// script runs, and binding per element meant racing that mount -- three attempts
// over half a second, which a page carrying every block in the plugin loses. A
// form that lost the race submitted natively, and because it posts to the page
// URL, WordPress read its `name` field as the post-slug query var and served the
// 404 template. Delegation cannot be early or late: the listener is on the
// document before any form exists and catches every one that ever appears.
//
// Capture phase, so nothing that stops propagation in between can let the native
// submit through.
document.addEventListener(
	'submit',
	( e ) => {
		const form = e.target?.closest?.( '.btb-tform' );
		if ( ! form ) {
			return;
		}

		e.preventDefault();
		submitForm( form );
	},
	true
);
