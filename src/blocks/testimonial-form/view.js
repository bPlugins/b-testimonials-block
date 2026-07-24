import '@shared/styles/frontend.scss';
import '@shared/view';
import '@shared/styles/form.scss';

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

document.addEventListener( 'DOMContentLoaded', initForms );
