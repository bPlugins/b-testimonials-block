import '../../shared/styles/frontend.scss';
import '../../shared/view';

document.addEventListener('DOMContentLoaded', () => {
	const initCardStack = (wrapper) => {
		const layout = wrapper.querySelector('.btb-card-stack-layout');
		if (!layout) return;

		const cards = Array.from(layout.querySelectorAll('.btb-stacked-card'));
		const totalCards = cards.length;
		if (totalCards <= 1) return;

		const prevBtn = wrapper.querySelector('.btb-stack-prev');
		const nextBtn = wrapper.querySelector('.btb-stack-next');
		const dots = Array.from(wrapper.querySelectorAll('.btb-stack-dot'));

		let activeIndex = parseInt(layout.getAttribute('data-active-index') || '0', 10);
		let isDragging = false;
		let startX = 0;
		let startY = 0;
		let currentX = 0;
		let currentY = 0;
		let animationFrameId = null;

		const updateStackDisplay = () => {
			cards.forEach((card, index) => {
				const pos = (index - activeIndex + totalCards) % totalCards;
				card.classList.remove('is-top', 'is-behind-1', 'is-behind-2', 'is-hidden', 'swiping-left', 'swiping-right');
				card.style.transform = '';
				card.style.opacity = '';

				if (pos === 0) {
					card.classList.add('is-top');
					card.style.zIndex = '10';
				} else if (pos === 1) {
					card.classList.add('is-behind-1');
					card.style.zIndex = '9';
				} else if (pos === 2) {
					card.classList.add('is-behind-2');
					card.style.zIndex = '8';
				} else {
					card.classList.add('is-hidden');
					card.style.zIndex = (10 - pos).toString();
				}
			});

			dots.forEach((dot, idx) => {
				dot.classList.toggle('is-active', idx === activeIndex);
			});

			layout.setAttribute('data-active-index', activeIndex.toString());
		};

		const goToNext = (direction = 'left') => {
			const topCard = cards[activeIndex];
			if (!topCard) return;

			topCard.classList.add(direction === 'left' ? 'swiping-left' : 'swiping-right');

			setTimeout(() => {
				activeIndex = (activeIndex + 1) % totalCards;
				updateStackDisplay();
			}, 280);
		};

		const goToPrev = () => {
			activeIndex = (activeIndex - 1 + totalCards) % totalCards;
			updateStackDisplay();
		};

		if (nextBtn) nextBtn.addEventListener('click', () => goToNext('left'));
		if (prevBtn) prevBtn.addEventListener('click', goToPrev);

		dots.forEach((dot, idx) => {
			dot.addEventListener('click', () => {
				activeIndex = idx;
				updateStackDisplay();
			});
		});

		const onDragStart = (e) => {
			const topCard = cards[activeIndex];
			if (!topCard) return;

			isDragging = true;
			const touch = e.touches ? e.touches[0] : e;
			startX = touch.clientX;
			startY = touch.clientY;
			currentX = startX;
			currentY = startY;

			topCard.style.transition = 'none';
		};

		const onDragMove = (e) => {
			if (!isDragging) return;

			const touch = e.touches ? e.touches[0] : e;
			currentX = touch.clientX;
			currentY = touch.clientY;

			const deltaX = currentX - startX;
			const deltaY = currentY - startY;

			if (Math.abs(deltaX) > Math.abs(deltaY) && e.cancelable) {
				e.preventDefault();
			}

			if (animationFrameId) cancelAnimationFrame(animationFrameId);

			animationFrameId = requestAnimationFrame(() => {
				const topCard = cards[activeIndex];
				if (topCard) {
					const rotateDeg = deltaX * 0.06;
					topCard.style.transform = `translate3d(${deltaX}px, ${deltaY * 0.3}px, 0) rotate(${rotateDeg}deg)`;
				}
			});
		};

		const onDragEnd = () => {
			if (!isDragging) return;
			isDragging = false;

			const deltaX = currentX - startX;
			const threshold = 70;

			const topCard = cards[activeIndex];
			if (topCard) {
				topCard.style.transition = '';
			}

			if (deltaX < -threshold) {
				goToNext('left');
			} else if (deltaX > threshold) {
				goToNext('right');
			} else {
				updateStackDisplay();
			}
		};

		layout.addEventListener('touchstart', onDragStart, { passive: true });
		layout.addEventListener('touchmove', onDragMove, { passive: false });
		layout.addEventListener('touchend', onDragEnd);
		layout.addEventListener('touchcancel', onDragEnd);

		layout.addEventListener('mousedown', onDragStart);
		window.addEventListener('mousemove', onDragMove);
		window.addEventListener('mouseup', onDragEnd);

		updateStackDisplay();
	};

	document.querySelectorAll('.btb-card-stack-wrapper').forEach(initCardStack);
});
