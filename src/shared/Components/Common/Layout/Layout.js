import { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Default from '../Themes/Default';
import ThemeOne from '../Themes/ThemeOne';
import ThemeTwo from '../Themes/ThemeTwo';
import ThemeThree from '../Themes/ThemeThree';
import ThemeFour from '../Themes/ThemeFour';
import ThemeFive from '../Themes/ThemeFive';
import ThemeSix from '../Themes/ThemeSix';
import Slider from './Slider';
import Marquee from './Marquee';
import BeforeAfterSlider from '../BeforeAfterSlider';

import { getStar, getVideoEmbed } from '../../../utils/functions';
import Image from '../Image';
import RatingIcon from '../ratingIcon';

const VideoCard = ( { item, accentColor } ) => {
	const [ isPlaying, setIsPlaying ] = useState( false );
	const embedHtml = item?.videoUrl ? getVideoEmbed( item.videoUrl ) : '';

	return (
		<div className="video-item">
			<div
				className={ `video-frame ${ isPlaying ? 'is-playing' : '' }` }
				style={ ! isPlaying && item?.poster?.url ? { backgroundImage: `url(${ item.poster.url })` } : undefined }
				data-embed={ embedHtml }
				onClick={ () => {
					if ( embedHtml ) {
						setIsPlaying( true );
					}
				} }
				tabIndex={ 0 }
				role="button"
				onKeyDown={ ( e ) => {
					if ( ( e.key === 'Enter' || e.key === ' ' ) && embedHtml ) {
						e.preventDefault();
						setIsPlaying( true );
					}
				} }
			>
				{ isPlaying ? (
					<div
						className="video-embed-container"
						style={ { width: '100%', height: '100%', position: 'absolute', inset: 0 } }
						dangerouslySetInnerHTML={ { __html: embedHtml } }
					/>
				) : (
					<span className="video-play" style={ accentColor ? { color: accentColor } : undefined }>
						<svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
							<path d="M8 5v14l11-7z" />
						</svg>
					</span>
				) }
			</div>
			<div className="video-meta">
				{ item?.name && <h3 className="name">{ item.name }</h3> }
				{ ( item?.deg || item?.company ) && (
					<p className="deg">{ [ item?.deg, item?.company ].filter( Boolean ).join( ', ' ) }</p>
				) }
			</div>
		</div>
	);
};

const SocialProofToast = ({ items = [], bt, bd, isBackend, activeIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (isBackend || items.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isBackend, items.length]);

    const activeItemIndex = isBackend ? (activeIndex < items.length ? activeIndex : 0) : currentIndex;
    const currentItem = items[activeItemIndex] || {};

    return (
        <div className="btb-toast-wrapper">
            <div className="btb-toast-card" key={activeItemIndex}>
                <div className="btb-toast-avatar">
                    <img src={currentItem.img?.url || 'https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png'} alt={currentItem.name || ''} />
                </div>
                <div className="btb-toast-body">
                    <p className="btb-toast-text">{currentItem.reviewText || bt || 'Someone just left a 5-star review!'}</p>
                    <span className="btb-toast-meta">{currentItem.name || 'John Doe'} — {bd || 'Just now'}</span>
                </div>
            </div>
        </div>
    );
};

const Layout = ({ itemsEls = [], ToolbarButton, MediaUpload, MediaUploadCheck, attributes = {}, setActiveIndex, activeIndex = 0, updateItem, isBackend = false, __, RichText }) => {
    const { items = [], columnGap = '30px', rowGap = '40px', layout = 'default', theme = 'default', columns = { desktop: 3, tablet: 2, mobile: 1 } } = attributes || {};
    const { desktop = 3, tablet = 2, mobile = 1 } = (columns && typeof columns === 'object') ? columns : { desktop: 3, tablet: 2, mobile: 1 };

    const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(0);
    const [cardStackIdx, setCardStackIdx] = useState(0);
    const itemProps = { attributes, setActiveIndex, activeIndex, updateItem, isBackend, __, RichText, MediaUpload, MediaUploadCheck, ToolbarButton };

    // Dynamic badge attributes (from block.json / sidebar settings)
    const bt = attributes.badgeTitle || '';
    const bd = attributes.badgeDesc || '';
    const bs = attributes.badgeScore || '';
    const bc = attributes.badgeCount || '';

    // === Theme selector (shared by all testimonial-items layouts) ===
    const themeSelect = (item, index) => {
        const itemProp = { item: item || {}, index, itemEls: itemsEls?.[index] || {}, ...itemProps };
        switch (theme) {
            case 'theme_1': return <ThemeOne {...itemProp} />;
            case 'theme_2': return <ThemeTwo {...itemProp} />;
            case 'theme_3': return <ThemeThree {...itemProp} />;
            case 'theme_4': return <ThemeFour {...itemProp} />;
            case 'theme_5': return <ThemeFive {...itemProp} />;
            case 'theme_6': return <ThemeSix {...itemProp} />;
            default: return <Default {...itemProp} />;
        }
    };

    // === Helper: render items grid with a custom wrapper class ===
    const renderItemsGrid = (extraClass = '') => (
        <div className={`layoutSection ${layout}-layout btb-${layout}-layout ${theme} ${extraClass} columns-${desktop} columns-tablet-${tablet} columns-mobile-${mobile} ${isBackend ? 'is-editing' : ''}`}>
            {items.map((item, index) => themeSelect(item, index))}
        </div>
    );

    // ================================================================
    //  CATEGORY D: Badge / Score Widgets (fully custom JSX, dynamic)
    // ================================================================

    // Helper to calculate dynamic rating stats from items array
    const computedStats = (() => {
        const total = Array.isArray(items) ? items.length : 0;
        if (total === 0) {
            return {
                total: 0,
                avg: '5.0',
                countText: '',
                counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
            };
        }
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let sum = 0;
        items.forEach(it => {
            const rawVal = Number(it?.rating ?? 5);
            const r = Math.min(5, Math.max(1, isNaN(rawVal) ? 5 : rawVal));
            const rounded = Math.round(r);
            counts[rounded] = (counts[rounded] || 0) + 1;
            sum += r;
        });
        const avg = (sum / total).toFixed(1);
        return {
            total,
            avg,
            countText: `Based on ${total} reviews`,
            counts
        };
    })();

    if (layout === 'google-review-badge') {
        const score = bs || (computedStats.total > 0 ? computedStats.avg : '4.9');
        const count = bc || (computedStats.total > 0 ? `(${computedStats.total}+ Reviews)` : '(128+ Reviews)');
        return (
            <div className="btb-badge-card btb-google-badge">
                <div className="btb-badge-header">
                    <svg className="btb-badge-brand-logo" viewBox="0 0 24 24" width="36" height="36"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                    <div className="btb-badge-info">
                        <h4 className="btb-badge-title">{bt || 'Google Reviews'}</h4>
                        <div className="btb-badge-rating">
                            <span className="score">{score}</span>
                            <span className="stars">★★★★★</span>
                            <span className="count">{count}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'capterra-review-badge') {
        const score = bs || (computedStats.total > 0 ? computedStats.avg : '4.8');
        const count = bc || (computedStats.total > 0 ? `(${computedStats.total} Reviews)` : 'Verified Software Reviews');
        return (
            <div className="btb-badge-card btb-capterra-badge">
                <div className="btb-badge-header">
                    <svg className="btb-badge-brand-logo" viewBox="0 0 24 24" width="36" height="36"><path fill="#FF9D28" d="M2 2h9v9H2z"/><path fill="#68C5ED" d="M13 2h9v9h-9z"/><path fill="#044D80" d="M2 13h9v9H2z"/><path fill="#E54747" d="M13 13h9v9h-9z"/></svg>
                    <div className="btb-badge-info">
                        <h4 className="btb-badge-title">{bt || 'Capterra Rating'}</h4>
                        <div className="btb-badge-rating">
                            <span className="score">{score}</span>
                            <span className="stars">★★★★★</span>
                            <span className="count">{count}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'facebook-review-badge') {
        const score = bs || (computedStats.total > 0 ? computedStats.avg : '5.0');
        const count = bc || (computedStats.total > 0 ? `Recommended by ${computedStats.total} Customers` : 'Recommended by 250+ Customers');
        return (
            <div className="btb-badge-card btb-facebook-badge">
                <div className="btb-badge-header">
                    <svg className="btb-badge-brand-logo" viewBox="0 0 24 24" width="36" height="36"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    <div className="btb-badge-info">
                        <h4 className="btb-badge-title">{bt || 'Facebook Reviews'}</h4>
                        <div className="btb-badge-rating">
                            <span className="score">{score}</span>
                            <span className="stars">★★★★★</span>
                            <span className="count">{count}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'trustpilot-review-badge') {
        const score = bs || (computedStats.total > 0 ? `${computedStats.avg} / 5` : '4.9 / 5');
        const count = bc || (computedStats.total > 0 ? `TrustScore | ${computedStats.total} Reviews` : 'TrustScore | 500+ Reviews');
        return (
            <div className="btb-badge-card btb-trustpilot-badge">
                <div className="btb-badge-header">
                    <svg className="btb-badge-brand-logo" viewBox="0 0 24 24" width="36" height="36"><path fill="#00B67A" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <div className="btb-badge-info">
                        <h4 className="btb-badge-title">{bt || 'Trustpilot Score'}</h4>
                        <div className="btb-badge-rating">
                            <span className="score">{score}</span>
                            <span className="stars">★★★★★</span>
                            <span className="count">{count}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'g2-review-badge') {
        const score = bs || (computedStats.total > 0 ? `${computedStats.avg} / 5` : '4.8 / 5');
        const count = bc || 'Leader Category 2026';
        return (
            <div className="btb-badge-card btb-g2-badge">
                <div className="btb-badge-header">
                    <svg className="btb-badge-brand-logo" viewBox="0 0 24 24" width="36" height="36"><circle cx="12" cy="12" r="11" fill="#FF492C"/><text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">G2</text></svg>
                    <div className="btb-badge-info">
                        <h4 className="btb-badge-title">{bt || 'G2 High Performer'}</h4>
                        <div className="btb-badge-rating">
                            <span className="score">{score}</span>
                            <span className="stars">★★★★★</span>
                            <span className="count">{count}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'verified-buyer-badge') {
        return (
            <div className="btb-badge-card btb-verified-badge">
                <div className="btb-badge-header">
                    <svg className="btb-badge-brand-logo" viewBox="0 0 24 24" width="36" height="36"><path fill="#4527a4" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                    <div className="btb-badge-info">
                        <h4 className="btb-badge-title">{bt || '100% Verified Reviews'}</h4>
                        <p className="btb-badge-desc">{bd || 'All customer testimonials are authenticated & verified.'}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'review-badge-widget') {
        const score = bs || (computedStats.total > 0 ? computedStats.avg : '4.9');
        const count = bc || (computedStats.total > 0 ? `Based on ${computedStats.total} reviews` : 'Based on 320+ reviews');
        return (
            <div className="btb-badge-card btb-review-widget">
                <div className="btb-badge-header">
                    <svg className="btb-badge-brand-logo" viewBox="0 0 24 24" width="36" height="36"><path fill="#4527a4" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <div className="btb-badge-info">
                        <h4 className="btb-badge-title">{bt || 'Customer Reviews'}</h4>
                        <div className="btb-badge-rating">
                            <span className="score">{score}</span>
                            <span className="stars">★★★★★</span>
                            <span className="count">{count}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'trust-badges') {
        return (
            <div className="btb-trust-badges-grid">
                <div className="btb-trust-item">
                    <svg viewBox="0 0 24 24" width="32" height="32"><path fill="#4527a4" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                    <span>{bt || 'Secure & Verified'}</span>
                </div>
                <div className="btb-trust-item">
                    <svg viewBox="0 0 24 24" width="32" height="32"><path fill="#34A853" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    <span>{bd || 'Money-Back Guarantee'}</span>
                </div>
                <div className="btb-trust-item">
                    <svg viewBox="0 0 24 24" width="32" height="32"><path fill="#FF9D28" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <span>{bs || '5-Star Support'}</span>
                </div>
                <div className="btb-trust-item">
                    <svg viewBox="0 0 24 24" width="32" height="32"><path fill="#1877F2" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    <span>{bc || 'Trusted by 10K+ Users'}</span>
                </div>
            </div>
        );
    }

    // ================================================================
    //  CATEGORY E: Interactive / Data Widgets (fully custom JSX)
    // ================================================================

    if (layout === 'testimonial-form') {
        return (
            <div className="btb-form-wrapper">
                <h3 className="btb-form-title">{bt || 'Leave a Customer Review'}</h3>
                <div className="btb-form-grid">
                    <input type="text" className="btb-input" placeholder="Your Name" readOnly />
                    <input type="text" className="btb-input" placeholder="Your Company / Designation" readOnly />
                    <div className="btb-form-rating-selector"><span>Rating: </span><span className="stars">★★★★★</span></div>
                    <textarea className="btb-textarea" placeholder="Write your testimonial review here..." readOnly></textarea>
                    <button type="button" className="btb-submit-btn">{bc || 'Submit Testimonial'}</button>
                </div>
            </div>
        );
    }

    if (layout === 'user-feedback-poll') {
        const minVal = attributes.minScore !== undefined ? Number(attributes.minScore) : 0;
        const maxVal = attributes.maxScore !== undefined ? Number(attributes.maxScore) : 10;
        const lowLbl = attributes.lowLabel !== undefined ? attributes.lowLabel : 'Not likely';
        const highLbl = attributes.highLabel !== undefined ? attributes.highLabel : 'Very likely';

        const pollNumbers = [];
        for (let i = minVal; i <= maxVal; i++) {
            pollNumbers.push(i);
        }

        return (
            <div className="btb-poll-wrapper">
                <h4 className="btb-poll-title">{bt || 'How likely are you to recommend us?'}</h4>
                <p className="btb-poll-desc">{bd || 'Net Promoter Score Survey'}</p>
                <div className="btb-poll-scale">
                    {lowLbl && <span className="btb-poll-label-low">{lowLbl}</span>}
                    <div className="btb-poll-buttons">
                        {pollNumbers.map(n => (
                            <button key={n} type="button" className="btb-poll-num-btn" data-mark={n}>{n}</button>
                        ))}
                    </div>
                    {highLbl && <span className="btb-poll-label-high">{highLbl}</span>}
                </div>
                <div className="btb-poll-response-msg" style={{ display: 'none' }}></div>
            </div>
        );
    }

    if (layout === 'rating-summary') {
        const displayScore = bs || (computedStats.total > 0 ? computedStats.avg : '4.8');
        const displayCountText = bc || (computedStats.total > 0 ? `Based on ${computedStats.total} reviews` : 'Based on 256 reviews');

        const defaultPcts = { 5: 78, 4: 15, 3: 4, 2: 2, 1: 1 };

        const rows = [5, 4, 3, 2, 1].map(s => {
            const count = computedStats.counts[s];
            const pct = computedStats.total > 0 
                ? Math.round((count / computedStats.total) * 100) 
                : (attributes[`star${s}Pct`] ?? defaultPcts[s]);
            return { star: s, pct, count };
        });

        return (
            <div className="btb-rating-summary">
                <div className="btb-rs-left">
                    <span className="btb-rs-big-number">{displayScore}</span>
                    <div className="btb-rs-stars">★★★★★</div>
                    <span className="btb-rs-count">{displayCountText}</span>
                </div>
                <div className="btb-rs-bars">
                    {rows.map(r => (
                        <div key={r.star} className="btb-rs-bar-row">
                            <span className="btb-rs-bar-label">{r.star} ★</span>
                            <div className="btb-rs-bar-track"><div className="btb-rs-bar-fill" style={{ width: `${r.pct}%` }}></div></div>
                            <span className="btb-rs-bar-pct">{r.pct}%</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (layout === 'star-rating-bars') {
        const defaultCounts = { 5: 184, 4: 46, 3: 15, 2: 7, 1: 3 };

        const rows = [5, 4, 3, 2, 1].map(s => {
            const overrideVal = attributes[`star${s}Count`];
            let count;
            if (overrideVal !== undefined && overrideVal !== '') {
                count = Number(overrideVal) || 0;
            } else if (computedStats.total > 0 && computedStats.counts[s] > 0) {
                count = computedStats.counts[s];
            } else {
                count = defaultCounts[s];
            }
            return { star: s, count };
        });

        const totalCountSum = rows.reduce((sum, r) => sum + (Number(r.count) || 0), 0);

        const rowsWithPct = rows.map(r => {
            const rawPct = totalCountSum > 0 ? Math.round((r.count / totalCountSum) * 100) : 0;
            const pct = isNaN(rawPct) ? 0 : rawPct;
            return { ...r, pct };
        });

        return (
            <div className="btb-star-rating-bars">
                <h4 className="btb-srb-title">{bt || 'Rating Breakdown'}</h4>
                {rowsWithPct.map(r => (
                    <div key={r.star} className="btb-srb-row">
                        <span className="btb-srb-label">{r.star} {r.star === 1 ? 'Star' : 'Stars'}</span>
                        <div className="btb-srb-track"><div className="btb-srb-fill" style={{ width: `${r.pct}%` }}></div></div>
                        <span className="btb-srb-count">{r.count} ({r.pct}%)</span>
                    </div>
                ))}
            </div>
        );
    }

    if (layout === 'testimonial-stats') {
        const fiveStarCount = computedStats.counts[5];
        const calcAvg = computedStats.total > 0 ? computedStats.avg : '4.9';
        const calc5Star = computedStats.total > 0 ? `${fiveStarCount}` : '500+';

        const stat1Num = bs || (computedStats.total > 0 ? `${computedStats.total}+` : '10K+');
        const stat1Label = bt || 'Happy Customers';
        const stat2Num = bc || '98%';
        const stat2Label = bd || 'Satisfaction Rate';
        const stat3Num = attributes.stat3Number || calcAvg;
        const stat3Label = attributes.stat3Label || 'Average Rating';
        const stat4Num = attributes.stat4Number || calc5Star;
        const stat4Label = attributes.stat4Label || '5-Star Reviews';

        return (
            <div className="btb-stats-grid">
                <div className="btb-stat-card">
                    <span className="btb-stat-number">{stat1Num}</span>
                    <span className="btb-stat-label">{stat1Label}</span>
                </div>
                <div className="btb-stat-card">
                    <span className="btb-stat-number">{stat2Num}</span>
                    <span className="btb-stat-label">{stat2Label}</span>
                </div>
                <div className="btb-stat-card">
                    <span className="btb-stat-number">{stat3Num}</span>
                    <span className="btb-stat-label">{stat3Label}</span>
                </div>
                <div className="btb-stat-card">
                    <span className="btb-stat-number">{stat4Num}</span>
                    <span className="btb-stat-label">{stat4Label}</span>
                </div>
            </div>
        );
    }

    if (layout === 'social-proof-toast') {
        return <SocialProofToast items={items} bt={bt} bd={bd} isBackend={isBackend} activeIndex={activeIndex} />;
    }

    if (layout === 'comparison-testimonial-table') {
        const title = bt || attributes.badgeTitle || 'Customer Comparison';
        const col1 = attributes.col1Header || 'Customer';
        const col2 = attributes.col2Header || 'Rating';
        const col3 = attributes.col3Header || 'Review';

        return (
            <div className="btb-comparison-table">
                <h4 className="btb-ct-title">{title}</h4>
                <table className="btb-ct-table">
                    <thead>
                        <tr>
                            <th>{col1}</th>
                            <th>{col2}</th>
                            <th>{col3}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, i) => (
                            <tr key={i}>
                                <td className="btb-ct-name">{item.name || ''}</td>
                                <td className="btb-ct-rating">{'★'.repeat(item.rating || 5)}</td>
                                <td className="btb-ct-text">{item.reviewText || ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (layout === 'faq-testimonial-accordion') {
        return (
            <div className="btb-faq-accordion">
                <h4 className="btb-faq-title">{bt || 'Frequently Asked Questions'}</h4>
                {items.map((item, i) => (
                    <details key={i} className="btb-faq-item">
                        <summary className="btb-faq-question">{item.name || `Question ${i + 1}`}</summary>
                        <div className="btb-faq-answer">
                            <p>{item.reviewText}</p>
                            <span className="btb-faq-author">— {item.deg || 'Customer'}</span>
                        </div>
                    </details>
                ))}
            </div>
        );
    }

    // ================================================================
    //  CATEGORY C: Custom testimonial layouts (unique JSX + items)
    // ================================================================

    if (layout === 'testimonials-avatar-list') {
        const activeItem = items[selectedAvatarIdx] || items[0] || {};
        return (
            <div className="btb-avatar-list-wrapper">
                <div className="btb-avatar-row">
                    {items.map((it, idx) => (
                        <div key={idx} onClick={() => setSelectedAvatarIdx(idx)}
                            className={`btb-avatar-thumb ${selectedAvatarIdx === idx ? 'active' : ''}`}>
                            <img src={it.img?.url || 'https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png'} alt={it.name} />
                        </div>
                    ))}
                </div>
                <div className="btb-avatar-detail">
                    <p className="btb-avatar-review">"{activeItem.reviewText}"</p>
                    <h4 className="btb-avatar-name">{activeItem.name}</h4>
                    <span className="btb-avatar-deg">{activeItem.deg}</span>
                </div>
            </div>
        );
    }

    if (layout === 'testimonials-timeline') {
        return (
            <div className="btb-timeline-layout">
                {items.map((item, index) => (
                    <div key={index} className="btb-timeline-item">
                        <div className="btb-timeline-dot"></div>
                        <div className="btb-timeline-card">
                            {themeSelect(item, index)}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (layout === 'audio-testimonials') {
        return (
            <div className={`layoutSection btb-audio-layout ${theme} columns-${desktop} columns-tablet-${tablet} columns-mobile-${mobile}`}>
                {items.map((item, index) => (
                    <div key={index} className="btb-audio-card">
                        <div className="btb-audio-player">
                            <svg viewBox="0 0 24 24" width="40" height="40"><circle cx="12" cy="12" r="11" fill="#4527a4" opacity="0.1"/><path fill="#4527a4" d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"/></svg>
                            <div className="btb-audio-wave">
                                {[35,55,25,65,45,70,30,60,40,50].map((h,i) => <div key={i} className="btb-wave-bar" style={{height: `${h}%`}}></div>)}
                            </div>
                        </div>
                        {themeSelect(item, index)}
                    </div>
                ))}
            </div>
        );
    }

    if (layout === 'video-testimonials') {
        const videoGridVars = {
            '--cols-d': desktop || 3,
            '--cols-t': tablet || 2,
            '--cols-m': mobile || 1,
            '--col-gap': columnGap || '30px',
            '--row-gap': rowGap || '30px',
            '--accent': attributes.accentColor || '#0575e6',
        };

        return (
            <div className="bVideoTestimonials">
                <div className="videos-grid" style={videoGridVars}>
                    {items.map((item, index) => (
                        <VideoCard key={index} item={item} accentColor={attributes.accentColor} />
                    ))}
                </div>
            </div>
        );
    }

    if (layout === 'before-after') {
        return <BeforeAfterSlider attributes={attributes} />;
    }


    if (layout === 'case-study-card') {
        return (
            <div className={`btb-case-study-grid columns-${desktop} columns-tablet-${tablet} columns-mobile-${mobile}`}>
                {items.map((item, index) => {
                    const sections = item.sections || [
                        {
                            title: item.challengeTitle ?? item.challengeLabel ?? 'Challenge',
                            content: item.challenge ?? 'The customer needed a reliable solution to improve their workflow.'
                        },
                        {
                            title: item.solutionTitle ?? item.solutionLabel ?? 'Solution',
                            content: item.solution ?? item.reviewText ?? 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout'
                        },
                        {
                            title: item.resultTitle ?? item.resultLabel ?? 'Result',
                            content: item.result ?? '95% improvement in efficiency and customer satisfaction.'
                        }
                    ];

                    return (
                        <div key={index} className="btb-case-study">
                            <div className="btb-cs-header">
                                <img src={item.img?.url || 'https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png'} alt={item.name} className="btb-cs-avatar" />
                                <div>
                                    <h4 className="btb-cs-name">{item.name || 'John Doe'}</h4>
                                    <span className="btb-cs-deg">{item.deg || 'Developer'}</span>
                                </div>
                            </div>
                            <div className="btb-cs-body">
                                {sections.map((sec, secIdx) => (
                                    <div key={secIdx} className="btb-cs-section">
                                        {sec.title && <span className="btb-cs-label">{sec.title}</span>}
                                        {sec.content && <p>{sec.content}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    if (layout === 'client-logos') {
        return (
            <div className={`btb-client-logos columns-${desktop} columns-tablet-${tablet} columns-mobile-${mobile}`}>
                {items.map((item, index) => (
                    <div key={index} className="btb-logo-item">
                        <img src={item.img?.url || 'https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png'} alt={item.name} />
                    </div>
                ))}
            </div>
        );
    }

    // ================================================================
    //  CATEGORY B: Testimonial layouts with custom CSS wrappers
    //  (use themeSelect but wrapped in unique layout classes)
    // ================================================================

    if (layout === 'testimonials-hero') {
        const heroItem = items[0] || {};
        return (
            <div className="btb-hero-layout">
                <div className="btb-hero-card">
                    {themeSelect(heroItem, 0)}
                </div>
                {items.length > 1 && (
                    <div className={`btb-hero-grid columns-${desktop} columns-tablet-${tablet} columns-mobile-${mobile}`}>
                        {items.slice(1).map((item, index) => themeSelect(item, index + 1))}
                    </div>
                )}
            </div>
        );
    }

    if (layout === 'testimonials-popup-modal') {
        return renderItemsGrid('btb-popup-modal-grid');
    }

    if (layout === 'testimonials-floating-bubble') {
        return (
            <div className="btb-floating-bubble-layout">
                {items.map((item, index) => (
                    <div key={index} className="btb-bubble-item" style={{ animationDelay: `${index * 0.3}s` }}>
                        <div className="btb-bubble-avatar">
                            <img src={item.img?.url || 'https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png'} alt={item.name} />
                        </div>
                        <div className="btb-bubble-content">
                            <p>{(item.reviewText || '').substring(0, 80)}</p>
                            <span className="btb-bubble-name">{item.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (layout === 'testimonials-card-stack') {
        const totalItems = items.length;
        const currentIdx = typeof setActiveIndex === 'function' ? (activeIndex || 0) : cardStackIdx;
        const activeIdx = totalItems > 0 ? (currentIdx % totalItems + totalItems) % totalItems : 0;

        const updateStackActive = (newIdx) => {
            setCardStackIdx(newIdx);
            if (typeof setActiveIndex === 'function') {
                setActiveIndex(newIdx);
            }
        };

        const nextCard = (e) => {
            if (e) e.preventDefault();
            if (totalItems > 1) {
                updateStackActive((activeIdx + 1) % totalItems);
            }
        };

        const prevCard = (e) => {
            if (e) e.preventDefault();
            if (totalItems > 1) {
                updateStackActive((activeIdx - 1 + totalItems) % totalItems);
            }
        };

        return (
            <div className={`btb-card-stack-wrapper ${isBackend ? 'is-editing' : ''}`}>
                <div className="btb-card-stack-layout" data-active-index={activeIdx} data-total-items={totalItems}>
                    {items.map((item, index) => {
                        const pos = totalItems > 0 ? (index - activeIdx + totalItems) % totalItems : 0;
                        const isTop = pos === 0;
                        const isVisibleBehind = pos > 0 && pos <= 2;
                        
                        return (
                            <div
                                key={index}
                                className={`btb-stacked-card ${isTop ? 'is-top' : ''} ${isVisibleBehind ? `is-behind-${pos}` : 'is-hidden'}`}
                                data-index={index}
                                data-stack-pos={pos}
                                style={{
                                    zIndex: isTop ? 10 : 10 - pos,
                                }}
                                onClick={() => {
                                    if (isBackend) {
                                        updateStackActive(index);
                                    }
                                }}
                            >
                                {themeSelect(item, index)}
                            </div>
                        );
                    })}
                </div>

                {totalItems > 1 && (
                    <div className="btb-stack-controls">
                        <button type="button" className="btb-stack-btn btb-stack-prev" onClick={prevCard} aria-label="Previous card">
                            ‹
                        </button>
                        <div className="btb-stack-dots">
                            {items.map((_, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`btb-stack-dot ${idx === activeIdx ? 'is-active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        updateStackActive(idx);
                                    }}
                                    aria-label={`Go to card ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <button type="button" className="btb-stack-btn btb-stack-next" onClick={nextCard} aria-label="Next card">
                            ›
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // ================================================================
    //  CATEGORY A: Standard layouts (existing switch logic, fixed)
    // ================================================================

    return (
        <div className={`layoutSection ${layout}-layout btb-${layout}-layout ${theme} columns-${desktop} columns-tablet-${tablet} columns-mobile-${mobile} ${isBackend ? 'is-editing' : ''}`}>
            {(() => {
                switch (layout) {
                    case 'masonry':
                        return (
                            <ResponsiveMasonry columnsCountBreakPoints={{ 0: mobile, 576: tablet, 768: desktop }}>
                                <Masonry columnsCount={3} gutter={`${rowGap} ${columnGap}`}>
                                    {items.map((item, index) => themeSelect(item, index))}
                                </Masonry>
                            </ResponsiveMasonry>
                        );
                    case 'slider':
                    case 'slider-3d':
                    case 'coverflow':
                        return <Slider attributes={attributes} itemsEls={itemsEls} itemProps={itemProps} />;
                    case 'marquee':
                        return <Marquee items={items} themeSelect={themeSelect} columnGap={columnGap} isBackend={isBackend} />;
                    // All other testimonial-items layouts: quote-box, speech-bubble, compact, list, etc.
                    // The unique visual is produced by the CSS class on the wrapper div
                    default:
                        return items.map((item, index) => themeSelect(item, index));
                }
            })()}
        </div>
    );
};

export default Layout;