import { useState } from 'react';
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

import { getStar } from '../../../utils/functions';
import Image from '../Image';
import RatingIcon from '../ratingIcon';

const Layout = ({ itemsEls = [], ToolbarButton, MediaUpload, MediaUploadCheck, attributes = {}, setActiveIndex, activeIndex = 0, updateItem, isBackend = false, __, RichText }) => {
    const { items = [], columnGap = '30px', rowGap = '40px', layout = 'default', theme = 'default', columns = { desktop: 3, tablet: 2, mobile: 1 } } = attributes || {};
    const { desktop = 3, tablet = 2, mobile = 1 } = (columns && typeof columns === 'object') ? columns : { desktop: 3, tablet: 2, mobile: 1 };

    const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(0);
    const itemProps = { attributes, setActiveIndex, activeIndex, updateItem, isBackend, __, RichText, MediaUpload, MediaUploadCheck, ToolbarButton };

    // Dynamic badge attributes (from block.json / sidebar settings)
    const bt = attributes.badgeTitle || '';
    const bd = attributes.badgeDesc || '';
    const bs = attributes.badgeScore || '';
    const bc = attributes.badgeCount || '';

    // === Theme selector (shared by all testimonial-items layouts) ===
    const themeSelect = (item, index) => {
        const itemProp = { item, index, itemEls: itemsEls[index], ...itemProps };
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

    if (layout === 'google-review-badge') {
        return (
            <div className="btb-badge-card btb-google-badge">
                <div className="btb-badge-header">
                    <svg className="btb-badge-brand-logo" viewBox="0 0 24 24" width="36" height="36"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
                    <div className="btb-badge-info">
                        <h4 className="btb-badge-title">{bt || 'Google Reviews'}</h4>
                        <div className="btb-badge-rating">
                            <span className="score">{bs || '4.9'}</span>
                            <span className="stars">★★★★★</span>
                            <span className="count">{bc || '(128+ Reviews)'}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'capterra-review-badge') {
        return (
            <div className="btb-badge-card btb-capterra-badge">
                <div className="btb-badge-header">
                    <svg className="btb-badge-brand-logo" viewBox="0 0 24 24" width="36" height="36"><path fill="#FF9D28" d="M2 2h9v9H2z"/><path fill="#68C5ED" d="M13 2h9v9h-9z"/><path fill="#044D80" d="M2 13h9v9H2z"/><path fill="#E54747" d="M13 13h9v9h-9z"/></svg>
                    <div className="btb-badge-info">
                        <h4 className="btb-badge-title">{bt || 'Capterra Rating'}</h4>
                        <div className="btb-badge-rating">
                            <span className="score">{bs || '4.8'}</span>
                            <span className="stars">★★★★★</span>
                            <span className="count">{bc || 'Verified Software Reviews'}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'facebook-review-badge') {
        return (
            <div className="btb-badge-card btb-facebook-badge">
                <div className="btb-badge-header">
                    <svg className="btb-badge-brand-logo" viewBox="0 0 24 24" width="36" height="36"><path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    <div className="btb-badge-info">
                        <h4 className="btb-badge-title">{bt || 'Facebook Reviews'}</h4>
                        <div className="btb-badge-rating">
                            <span className="score">{bs || '5.0'}</span>
                            <span className="stars">★★★★★</span>
                            <span className="count">{bc || 'Recommended by 250+ Customers'}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'trustpilot-review-badge') {
        return (
            <div className="btb-badge-card btb-trustpilot-badge">
                <div className="btb-badge-header">
                    <svg className="btb-badge-brand-logo" viewBox="0 0 24 24" width="36" height="36"><path fill="#00B67A" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <div className="btb-badge-info">
                        <h4 className="btb-badge-title">{bt || 'Trustpilot Score'}</h4>
                        <div className="btb-badge-rating">
                            <span className="score">{bs || '4.9 / 5'}</span>
                            <span className="stars">★★★★★</span>
                            <span className="count">{bc || 'TrustScore | 500+ Reviews'}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'g2-review-badge') {
        return (
            <div className="btb-badge-card btb-g2-badge">
                <div className="btb-badge-header">
                    <svg className="btb-badge-brand-logo" viewBox="0 0 24 24" width="36" height="36"><circle cx="12" cy="12" r="11" fill="#FF492C"/><text x="12" y="16" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">G2</text></svg>
                    <div className="btb-badge-info">
                        <h4 className="btb-badge-title">{bt || 'G2 High Performer'}</h4>
                        <div className="btb-badge-rating">
                            <span className="score">{bs || '4.8 / 5'}</span>
                            <span className="stars">★★★★★</span>
                            <span className="count">{bc || 'Leader Category 2026'}</span>
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
        return (
            <div className="btb-badge-card btb-review-widget">
                <div className="btb-badge-header">
                    <svg className="btb-badge-brand-logo" viewBox="0 0 24 24" width="36" height="36"><path fill="#4527a4" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <div className="btb-badge-info">
                        <h4 className="btb-badge-title">{bt || 'Customer Reviews'}</h4>
                        <div className="btb-badge-rating">
                            <span className="score">{bs || '4.9'}</span>
                            <span className="stars">★★★★★</span>
                            <span className="count">{bc || 'Based on 320+ reviews'}</span>
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
        return (
            <div className="btb-poll-wrapper">
                <h4 className="btb-poll-title">{bt || 'How likely are you to recommend us?'}</h4>
                <p className="btb-poll-desc">{bd || 'Net Promoter Score Survey'}</p>
                <div className="btb-poll-scale">
                    <span className="btb-poll-label-low">Not likely</span>
                    <div className="btb-poll-buttons">
                        {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
                            <button key={n} type="button" className="btb-poll-num-btn">{n}</button>
                        ))}
                    </div>
                    <span className="btb-poll-label-high">Very likely</span>
                </div>
            </div>
        );
    }

    if (layout === 'rating-summary') {
        return (
            <div className="btb-rating-summary">
                <div className="btb-rs-left">
                    <span className="btb-rs-big-number">{bs || '4.8'}</span>
                    <div className="btb-rs-stars">★★★★★</div>
                    <span className="btb-rs-count">{bc || 'Based on 256 reviews'}</span>
                </div>
                <div className="btb-rs-bars">
                    {[{star: 5, pct: 78}, {star: 4, pct: 15}, {star: 3, pct: 4}, {star: 2, pct: 2}, {star: 1, pct: 1}].map(r => (
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
        return (
            <div className="btb-star-rating-bars">
                <h4 className="btb-srb-title">{bt || 'Rating Breakdown'}</h4>
                {[{star: 5, pct: 72, count: 184}, {star: 4, pct: 18, count: 46}, {star: 3, pct: 6, count: 15}, {star: 2, pct: 3, count: 7}, {star: 1, pct: 1, count: 3}].map(r => (
                    <div key={r.star} className="btb-srb-row">
                        <span className="btb-srb-label">{r.star} Star</span>
                        <div className="btb-srb-track"><div className="btb-srb-fill" style={{ width: `${r.pct}%` }}></div></div>
                        <span className="btb-srb-count">{r.count}</span>
                    </div>
                ))}
            </div>
        );
    }

    if (layout === 'testimonial-stats') {
        return (
            <div className="btb-stats-grid">
                <div className="btb-stat-card">
                    <span className="btb-stat-number">{bs || '10K+'}</span>
                    <span className="btb-stat-label">{bt || 'Happy Customers'}</span>
                </div>
                <div className="btb-stat-card">
                    <span className="btb-stat-number">{bc || '98%'}</span>
                    <span className="btb-stat-label">{bd || 'Satisfaction Rate'}</span>
                </div>
                <div className="btb-stat-card">
                    <span className="btb-stat-number">4.9</span>
                    <span className="btb-stat-label">Average Rating</span>
                </div>
                <div className="btb-stat-card">
                    <span className="btb-stat-number">500+</span>
                    <span className="btb-stat-label">5-Star Reviews</span>
                </div>
            </div>
        );
    }

    if (layout === 'social-proof-toast') {
        const firstItem = items[0] || {};
        return (
            <div className="btb-toast-wrapper">
                <div className="btb-toast-card">
                    <div className="btb-toast-avatar">
                        <img src={firstItem.img?.url || 'https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png'} alt="" />
                    </div>
                    <div className="btb-toast-body">
                        <p className="btb-toast-text">{bt || 'Someone just left a 5-star review!'}</p>
                        <span className="btb-toast-meta">{firstItem.name || 'John Doe'} — {bd || 'Just now'}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'comparison-testimonial-table') {
        return (
            <div className="btb-comparison-table">
                <h4 className="btb-ct-title">{bt || 'Customer Comparison'}</h4>
                <table className="btb-ct-table">
                    <thead><tr><th>Customer</th><th>Rating</th><th>Review</th></tr></thead>
                    <tbody>
                        {items.slice(0, 5).map((item, i) => (
                            <tr key={i}>
                                <td className="btb-ct-name">{item.name}</td>
                                <td className="btb-ct-rating">{'★'.repeat(item.rating || 5)}</td>
                                <td className="btb-ct-text">{(item.reviewText || '').substring(0, 80)}…</td>
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
        return (
            <div className={`layoutSection btb-video-layout ${theme} columns-${desktop} columns-tablet-${tablet} columns-mobile-${mobile}`}>
                {items.map((item, index) => (
                    <div key={index} className="btb-video-card">
                        <div className="btb-video-thumb">
                            <img src={item.img?.url || 'https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png'} alt={item.name} />
                            <div className="btb-video-play">
                                <svg viewBox="0 0 24 24" width="48" height="48"><circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.6)"/><path fill="#fff" d="M10 8.64L15.27 12 10 15.36V8.64z"/></svg>
                            </div>
                        </div>
                        <div className="btb-video-info">
                            <h4>{item.name}</h4>
                            <span>{item.deg}</span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (layout === 'before-after') {
        return (
            <div className="btb-before-after">
                <h4 className="btb-ba-title">{bt || 'Before & After Using Our Product'}</h4>
                <div className="btb-ba-columns">
                    <div className="btb-ba-col btb-ba-before">
                        <span className="btb-ba-label">Before</span>
                        <div className="btb-ba-content">
                            {items[0] && <p>"{items[0].reviewText}"</p>}
                            {items[0] && <span className="btb-ba-author">— {items[0].name}</span>}
                        </div>
                    </div>
                    <div className="btb-ba-col btb-ba-after">
                        <span className="btb-ba-label">After</span>
                        <div className="btb-ba-content">
                            {items[1] && <p>"{items[1].reviewText}"</p>}
                            {items[1] && <span className="btb-ba-author">— {items[1].name}</span>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (layout === 'case-study-card') {
        return (
            <div className={`btb-case-study-grid columns-${desktop} columns-tablet-${tablet} columns-mobile-${mobile}`}>
                {items.map((item, index) => {
                    const challengeText = item.challenge ?? 'The customer needed a reliable solution to improve their workflow.';
                    const solutionText = item.solution ?? item.reviewText ?? 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout';
                    const resultText = item.result ?? '95% improvement in efficiency and customer satisfaction.';

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
                                <div className="btb-cs-section">
                                    <span className="btb-cs-label">Challenge</span>
                                    <p>{challengeText}</p>
                                </div>
                                <div className="btb-cs-section">
                                    <span className="btb-cs-label">Solution</span>
                                    <p>{solutionText}</p>
                                </div>
                                <div className="btb-cs-section">
                                    <span className="btb-cs-label">Result</span>
                                    <p>{resultText}</p>
                                </div>
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
        return (
            <div className="btb-card-stack-layout">
                {items.map((item, index) => (
                    <div key={index} className="btb-stacked-card" style={{ transform: `rotate(${(index - 1) * 2}deg)`, zIndex: items.length - index }}>
                        {themeSelect(item, index)}
                    </div>
                ))}
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