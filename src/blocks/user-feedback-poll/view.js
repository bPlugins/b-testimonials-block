import '../../shared/styles/frontend.scss';
import '../../shared/view';

document.addEventListener('DOMContentLoaded', () => {
	document.body.addEventListener('click', (e) => {
		const btn = e.target.closest('.btb-poll-num-btn');
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

		const restUrl = (window.wpApiSettings && window.wpApiSettings.root) 
			? window.wpApiSettings.root + 'bptmb/v1/submit-nps'
			: '/wp-json/bptmb/v1/submit-nps';

		fetch(restUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': window.wpApiSettings ? window.wpApiSettings.nonce : ''
			},
			body: JSON.stringify({
				mark: parseInt(mark, 10),
				page_url: window.location.href,
				page_title: document.title
			})
		})
			.then((res) => res.json())
			.then((data) => {
				if (msgEl) {
					if (data && data.success) {
						msgEl.innerHTML = `<span class="btb-poll-success">✔ ${data.message || 'Thank you for your feedback!'}</span>`;
					} else {
						msgEl.innerHTML = `<span class="btb-poll-error">Thank you for voting! You selected mark ${mark}.</span>`;
					}
				}
			})
			.catch(() => {
				if (msgEl) {
					msgEl.innerHTML = `<span class="btb-poll-success">✔ Thank you for your feedback! You selected mark ${mark}.</span>`;
				}
			});
	});
});
