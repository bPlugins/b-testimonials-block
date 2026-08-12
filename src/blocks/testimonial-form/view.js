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

const initForms = () => {
	document.querySelectorAll( '.btb-tform' ).forEach( ( form ) => {
		if ( form.dataset.bound ) {
			return;
		}
		form.dataset.bound = '1';

		form.addEventListener( 'submit', async ( e ) => {
			e.preventDefault();

			const submitBtn = form.querySelector( '.btb-tform-submit' );
			const endpoint = form.dataset.endpoint;

			// Nothing to post to: render.php fills this in, so an empty value means
			// stale cached markup rather than a visitor mistake.
			if ( ! endpoint ) {
				setMessage( form, 'This form is not available right now. Please reload the page.', 'error' );
				return;
			}

			const data = new FormData( form );
			data.append( 'nonce', form.dataset.nonce || '' );

			if ( submitBtn ) {
				submitBtn.disabled = true;
			}
			setMessage( form, '', '' );

			try {
				const res = await fetch( endpoint, { method: 'POST', body: data } );
				const json = await res.json();

				if ( res.ok && json.success ) {
					setMessage( form, form.dataset.success || json.message, 'success' );
					form.reset();
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
		} );
	} );
};

// The form is rendered by React (shared/view), and createRoot().render() commits
// asynchronously, so the markup is not always in the DOM on DOMContentLoaded.
// The retries catch that; `dataset.bound` keeps them from binding twice.
const bindForms = () => {
	initForms();
	setTimeout( initForms, 100 );
	setTimeout( initForms, 500 );
};

if ( 'loading' === document.readyState ) {
	document.addEventListener( 'DOMContentLoaded', bindForms );
} else {
	bindForms();
}
