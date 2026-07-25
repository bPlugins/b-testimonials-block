import { useState, useRef, useEffect } from 'react';

const BeforeAfterSlider = ({ attributes = {} }) => {
	const {
		beforeImg = {},
		afterImg = {},
		beforeLabel = 'Before',
		afterLabel = 'After',
		startPosition = 50,
		accentColor = '#ffffff',
		items = [],
		badgeTitle = ''
	} = attributes;

	const defaultBefore = 'https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png';
	const defaultAfter = 'https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png';

	const beforeUrl = beforeImg?.url || items?.[0]?.img?.url || defaultBefore;
	const afterUrl = afterImg?.url || items?.[1]?.img?.url || defaultAfter;

	const [pos, setPos] = useState(startPosition);
	const [isDragging, setIsDragging] = useState(false);
	const containerRef = useRef(null);

	const updatePos = (clientX) => {
		if (!containerRef.current) {
			return;
		}
		const rect = containerRef.current.getBoundingClientRect();
		if (!rect.width) {
			return;
		}
		const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
		setPos(percentage);
	};

	const onMouseDown = (e) => {
		setIsDragging(true);
		updatePos(e.clientX);
	};

	const onTouchStart = (e) => {
		setIsDragging(true);
		if (e.touches && e.touches[0]) {
			updatePos(e.touches[0].clientX);
		}
	};

	useEffect(() => {
		const onMouseMove = (e) => {
			if (isDragging) {
				updatePos(e.clientX);
			}
		};
		const onTouchMove = (e) => {
			if (isDragging && e.touches && e.touches[0]) {
				updatePos(e.touches[0].clientX);
			}
		};
		const onMouseUp = () => setIsDragging(false);
		const onTouchEnd = () => setIsDragging(false);

		if (isDragging) {
			window.addEventListener('mousemove', onMouseMove);
			window.addEventListener('touchmove', onTouchMove);
			window.addEventListener('mouseup', onMouseUp);
			window.addEventListener('touchend', onTouchEnd);
		}

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('mouseup', onMouseUp);
			window.removeEventListener('touchend', onTouchEnd);
		};
	}, [isDragging]);

	const handleKeyDown = (e) => {
		if ('ArrowLeft' === e.key) {
			setPos((prev) => Math.max(0, prev - 2));
		} else if ('ArrowRight' === e.key) {
			setPos((prev) => Math.min(100, prev + 2));
		}
	};

	return (
		<div className="bBeforeAfter">
			{badgeTitle && <h4 className="btb-ba-title" style={{ textAlign: 'center', marginBottom: '16px' }}>{badgeTitle}</h4>}
			<div
				ref={containerRef}
				className="ba-wrap"
				style={{ '--pos': `${pos}%` }}
				onMouseDown={onMouseDown}
				onTouchStart={onTouchStart}
			>
				<div className="ba-before">
					<img src={beforeUrl} alt={beforeImg?.alt || beforeLabel || 'Before'} />
					{beforeLabel && <span className="ba-label ba-label-before">{beforeLabel}</span>}
				</div>
				<div className="ba-after">
					<img src={afterUrl} alt={afterImg?.alt || afterLabel || 'After'} />
					{afterLabel && <span className="ba-label ba-label-after">{afterLabel}</span>}
				</div>
				<div
					className="ba-handle"
					style={{ borderColor: accentColor }}
					tabIndex={0}
					role="slider"
					aria-valuenow={Math.round(pos)}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-label="Before after slider handle"
					onKeyDown={handleKeyDown}
				>
					<span className="ba-handle-line" style={{ background: accentColor }} />
					<span className="ba-handle-grip" style={{ background: accentColor }} />
				</div>
			</div>
		</div>
	);
};

export default BeforeAfterSlider;
