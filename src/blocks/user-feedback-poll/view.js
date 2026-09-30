import '../../shared/styles/frontend.scss';
import '../../shared/view';

// On `document` and outside DOMContentLoaded: a script that runs after that
// event has already fired would never have bound at all, and delegation from the
// document works whenever React mounts the poll.
document.addEventListener('click', (e) => {
	const btn = e.target?.closest?.('.btb-poll-num-btn');
	if (!btn || btn.disabled) {
		return;
	}

	const pollWrapper = btn.closest('.btb-poll-wrapper');
	if (!pollWrapper) {
		return;
	}

	const mark = btn.dataset.mark;
	if (mark === undefined) {
		return;
	}

	const buttons = pollWrapper.querySelectorAll('.btb-poll-num-btn');
	buttons.forEach((b) => {
		b.classList.remove('is-selected');
		b.disabled = true;
	});
	btn.classList.add('is-selected');

	const msgEl = pollWrapper.querySelector('.btb-poll-response-msg');
	if (msgEl) {
		msgEl.style.display = 'block';
		msgEl.textContent = 'Submitting your response...';
	}

	// A vote that did not save must not read as one that did. Every branch below
	// used to thank the visitor -- including the failure branch and the network
	// catch -- so a poll that recorded nothing looked identical to one that
	// worked, and the dashboard sat at zero with no way to notice.
	const failed = (text) => {
		if (msgEl) {
			msgEl.innerHTML = `<span class="btb-poll-error">${text}</span>`;
		}
		buttons.forEach((b) => {
			b.disabled = false;
		});
		btn.classList.remove('is-selected');
	};

	const restUrl =
		pollWrapper.dataset.endpoint ||
		(window.wpApiSettings && window.wpApiSettings.root
			? window.wpApiSettings.root + 'bptmb/v1/submit-nps'
			: '/wp-json/bptmb/v1/submit-nps');

	// Only send the nonce header when there is a nonce. An empty `X-WP-Nonce` is
	// not the same as none: rest_cookie_check_errors() takes the header being
	// present as a claim of cookie authentication and rejects the empty value
	// with a 403, which is what stopped every vote from this block reaching the
	// endpoint.
	const restNonce =
		pollWrapper.dataset.restNonce ||
		(window.wpApiSettings && window.wpApiSettings.nonce) ||
		'';
	const headers = { 'Content-Type': 'application/json' };
	if (restNonce) {
		headers['X-WP-Nonce'] = restNonce;
	}

	fetch(restUrl, {
		method: 'POST',
		headers,
		credentials: 'same-origin',
		body: JSON.stringify({
			mark: parseInt(mark, 10),
			page_url: window.location.href,
			page_title: document.title
		})
	})
		.then((res) => res.json())
		.then((data) => {
			if (data && data.success) {
				if (msgEl) {
					msgEl.innerHTML = `<span class="btb-poll-success">✔ ${data.message || 'Thank you for your feedback!'}</span>`;
				}
				return;
			}

			failed(
				'rest_cookie_invalid_nonce' === (data && data.code)
					? 'This page has been open too long. Please reload and vote again.'
					: (data && data.message) || 'Your vote could not be saved. Please try again.'
			);
		})
		.catch(() => {
			failed('Your vote could not be saved. Please try again.');
		});
});
