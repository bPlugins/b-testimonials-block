
export const leftQuote = (color, size) => <svg xmlns="http://www.w3.org/2000/svg" fill={color} width={size} height={size} viewBox="0 0 512 512"><path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" /></svg>;

export const rightQuote = (color, size) => <svg xmlns="http://www.w3.org/2000/svg" fill={color} width={size} height={size} viewBox="0 0 512 512"><path d="M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z" /></svg>;

export const symbol = (color) => <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 19 13" fill={color} style={{ left: "24px" }}><path d="M0.965704 0.000125914H10.3736L19 5.15272e-05C19 5.15272e-05 16.2331 5.15665 10.3736 8.99489C6.68171 11.4132 3.12703 12.3741 1.00222 12.7541C0.488597 12.8459 0.227225 12.1436 0.617463 11.7973C2.03909 10.5355 3.88298 8.3072 3.88294 5.23718C3.88287 9.44134e-05 0.965704 0.000125914 0.965704 0.000125914Z"></path></svg>;

export const upload = <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="20px" height="20px" viewBox="0 0 512 512" ><path d="M232 280L64 280 64 232 232 232 232 64 280 64 280 232 448 232 448 280 280 280 280 448 232 448 232 280Z" /></svg>;

export const star = (color) => <svg xmlns="http://www.w3.org/2000/svg" fill={color} width="15px" height="15px" viewBox="0 -32 576 576"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" /></svg>

export const blockIcon = <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 20 20">
	<rect x="0" fill="none" width="20" height="20" /><g><path d="M4 3h12c.55 0 1.02.2 1.41.59S18 4.45 18 5v7c0 .55-.2 1.02-.59 1.41S16.55 14 16 14h-1l-5 5v-5H4c-.55 0-1.02-.2-1.41-.59S2 12.55 2 12V5c0-.55.2-1.02.59-1.41S3.45 3 4 3zm11 2H4v1h11V5zm1 3H4v1h12V8zm-3 3H4v1h9v-1z" /></g></svg>;

export const verticalLineIcon = <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 14.707 14.707'>
	<rect x='6.275' y='0' width='2.158' height='14.707' />
</svg>;

export const horizontalLineIcon = <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 357 357'>
	<path d='M357,204H0v-51h357V204z' />
</svg>;

export const getLayoutSvgIcon = (iconName, size = 22, color = 'currentColor') => {
	switch (iconName) {
		case 'slides':
		case 'carousel':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<rect x="2" y="5" width="20" height="14" rx="2" />
					<path d="M8 12l4-4 4 4" />
					<path d="M12 8v8" />
				</svg>
			);
		case 'editor-ul':
		case 'list':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<line x1="8" y1="6" x2="21" y2="6" />
					<line x1="8" y1="12" x2="21" y2="12" />
					<line x1="8" y1="18" x2="21" y2="18" />
					<line x1="3" y1="6" x2="3.01" y2="6" />
					<line x1="3" y1="12" x2="3.01" y2="12" />
					<line x1="3" y1="18" x2="3.01" y2="18" />
				</svg>
			);
		case 'dashboard':
		case 'masonry':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<rect x="3" y="3" width="7" height="9" rx="1" />
					<rect x="14" y="3" width="7" height="5" rx="1" />
					<rect x="14" y="12" width="7" height="9" rx="1" />
					<rect x="3" y="16" width="7" height="5" rx="1" />
				</svg>
			);
		case 'update-alt':
		case 'update':
		case 'marquee':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M21.5 2v6h-6" />
					<path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
				</svg>
			);
		case 'star-filled':
		case 'star-half':
		case 'rating':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill={color === 'currentColor' ? '#ff9800' : color} stroke={color === 'currentColor' ? '#ff9800' : color} strokeWidth="1.5">
					<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
				</svg>
			);
		case 'chart-bar':
		case 'stats':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<line x1="12" y1="20" x2="12" y2="10" />
					<line x1="18" y1="20" x2="18" y2="4" />
					<line x1="6" y1="20" x2="6" y2="16" />
				</svg>
			);
		case 'shield':
		case 'yes-alt':
		case 'verified':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
					<path d="M9 12l2 2 4-4" />
				</svg>
			);
		case 'groups':
		case 'admin-users':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
					<circle cx="9" cy="7" r="4" />
					<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
					<path d="M16 3.13a4 4 0 0 1 0 7.75" />
				</svg>
			);
		case 'video-alt3':
		case 'video':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<polygon points="23 7 16 12 23 17 23 7" />
					<rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
				</svg>
			);
		case 'image-flip-horizontal':
		case 'before-after':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<rect x="3" y="3" width="18" height="18" rx="2" />
					<line x1="12" y1="3" x2="12" y2="21" />
					<path d="M8 10l-3 3 3 3" />
					<path d="M16 10l3 3-3 3" />
				</svg>
			);
		case 'feedback':
		case 'form':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
				</svg>
			);
		case 'align-center':
		case 'grid-view':
		case 'grid':
		case 'layout':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<rect x="3" y="3" width="7" height="7" rx="1" />
					<rect x="14" y="3" width="7" height="7" rx="1" />
					<rect x="14" y="14" width="7" height="7" rx="1" />
					<rect x="3" y="14" width="7" height="7" rx="1" />
				</svg>
			);
		case 'columns':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<rect x="3" y="3" width="18" height="18" rx="2" />
					<line x1="9" y1="3" x2="9" y2="21" />
					<line x1="15" y1="3" x2="15" y2="21" />
				</svg>
			);
		case 'excerpt-view':
		case 'compact':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<rect x="3" y="4" width="18" height="4" rx="1" />
					<rect x="3" y="10" width="18" height="4" rx="1" />
					<rect x="3" y="16" width="18" height="4" rx="1" />
				</svg>
			);
		case 'format-quote':
		case 'quote':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill={color === 'currentColor' ? 'currentColor' : color}>
					<path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
				</svg>
			);
		case 'format-chat':
		case 'speech':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
				</svg>
			);
		case 'list-view':
		case 'timeline':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<line x1="12" y1="2" x2="12" y2="22" />
					<circle cx="12" cy="6" r="2" />
					<circle cx="12" cy="12" r="2" />
					<circle cx="12" cy="18" r="2" />
				</svg>
			);
		case 'index-card':
		case 'card-stack':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<rect x="2" y="7" width="16" height="14" rx="2" />
					<path d="M6 3h14a2 2 0 0 1 2 2v12" />
				</svg>
			);
		case 'welcome-learn-more':
		case 'case-study':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
					<polyline points="14 2 14 8 20 8" />
					<line x1="16" y1="13" x2="8" y2="13" />
					<line x1="16" y1="17" x2="8" y2="17" />
					<polyline points="10 9 9 9 8 9" />
				</svg>
			);
		case 'google':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24">
					<path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
					<path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.35 7.33 24 12 24z" />
					<path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.18 0 9.98 0 12s.46 3.82 1.26 5.42l4.02-3.15z" />
					<path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.65 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
				</svg>
			);
		case 'trustpilot':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="#00b67a">
					<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
				</svg>
			);
		case 'facebook':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2">
					<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
				</svg>
			);
		case 'awards':
		case 'capterra':
		case 'g2':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="12" cy="8" r="7" />
					<polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
				</svg>
			);
		case 'sticky':
		case 'widget':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z" />
					<polyline points="15 3 15 9 21 9" />
				</svg>
			);
		case 'testimonial':
		case 'toast':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<rect x="2" y="4" width="20" height="16" rx="3" />
					<circle cx="8" cy="12" r="2" />
					<path d="M14 10h4" />
					<path d="M14 14h3" />
				</svg>
			);
		case 'controls-play':
		case 'audio':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
					<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
					<path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
				</svg>
			);
		case 'chart-pie':
		case 'poll':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
					<path d="M22 12A10 10 0 0 0 12 2v10z" />
				</svg>
			);
		case 'table-col-after':
		case 'table':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<rect x="3" y="3" width="18" height="18" rx="2" />
					<line x1="12" y1="3" x2="12" y2="21" />
					<line x1="3" y1="9" x2="21" y2="9" />
					<line x1="3" y1="15" x2="21" y2="15" />
				</svg>
			);
		case 'arrow-down-alt2':
		case 'accordion':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<polyline points="6 9 12 15 18 9" />
				</svg>
			);
		case 'superhero':
		case 'hero':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<polygon points="12 2 2 7 12 12 22 7 12 2" />
					<polyline points="2 17 12 22 22 17" />
					<polyline points="2 12 12 17 22 12" />
				</svg>
			);
		case 'bubbles':
		case 'floating-bubble':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="7.5" cy="7.5" r="4.5" />
					<circle cx="16.5" cy="16.5" r="4.5" />
					<circle cx="17.5" cy="6.5" r="2.5" />
				</svg>
			);
		case 'external':
		case 'popup-modal':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
					<polyline points="15 3 21 3 21 9" />
					<line x1="10" y1="14" x2="21" y2="3" />
				</svg>
			);
		case 'search':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="11" cy="11" r="8" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
				</svg>
			);
		case 'close':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			);
		case 'settings':
		case 'admin-settings':
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<circle cx="12" cy="12" r="3" />
					<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
				</svg>
			);
		default:
			return (
				<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<rect x="3" y="3" width="7" height="7" rx="1" />
					<rect x="14" y="3" width="7" height="7" rx="1" />
					<rect x="14" y="14" width="7" height="7" rx="1" />
					<rect x="3" y="14" width="7" height="7" rx="1" />
				</svg>
			);
	}
};