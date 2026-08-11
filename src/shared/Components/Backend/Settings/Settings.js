
import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, TextControl, SelectControl, RangeControl, __experimentalUnitControl as UnitControl, __experimentalNumberControl as NumberControl, Button, Dashicon, ToolbarGroup, ToolbarButton, TextareaControl, __experimentalBoxControl as BoxControl, ToggleControl } from '@wordpress/components';
import { produce } from 'immer';

// Settings Components
import IconSettings from './IconSettings';
import ColorsPanel from './ColorsPanel';
import Label from '../../../../../../bpl-tools/Components/Label/Label';
import { ColorControl } from '../../../../../../bpl-tools/Components/ColorControl/ColorControl';
import { InlineDetailMediaUpload } from '../../../../../../bpl-tools/Components/MediaControl/MediaControl';
import Typography from '../../../../../../bpl-tools/Components/Typography/Typography';
import BDevice from '../../../../../../bpl-tools/Components/Deprecated/BDevice/BDevice';
import BorderControl from '../../../../../../bpl-tools/Components/Deprecated/BorderControl/BorderControl';
import ShadowControl from '../../../../../../bpl-tools/Components/Deprecated/ShadowControl/ShadowControl';

import { gearIcon } from '../../../../../../bpl-tools/utils/icons';
import { tabController } from '../../../../../../bpl-tools/utils/functions';
import { emUnit, perUnit, pxUnit, vhUnit, vwUnit } from '../../../../../../bpl-tools/utils/options';

import { checkTheme } from '../../.././utils/functions';
import { rendersReviewText, resolveArrangement, supportsArrangement } from '../../../utils/layoutFeatures';
import { arrangementOpt, generalStyleTabs, themeOpt } from './../../../utils/options';
import BlockSwitcher from '../../Common/BlockSwitcher';

const Settings = ({ attributes = {}, setAttributes, updateItem, activeIndex, setActiveIndex, clientId, currentBlockName }) => {
    const {
        columns = { desktop: 3, tablet: 2, mobile: 1 },
        columnGap = '30px',
        rowGap = '40px',
        // Both empty per device by default, so an untouched block keeps taking
        // its width from the theme's layout and its height from its content.
        blockWidth = {},
        cardHeight = {},
        cardMargin = {},
        layout = 'default',
        theme = 'default',
        items = [],
        elements: rawElements = {},
        background = '#0000',
        padding = { top: '10px', right: '15px', bottom: '10px', left: '15px' },
        shadow = {},
        border = { width: '1px', style: 'solid', color: '#0575e6', side: 'all', radius: '3px' },
        image = { width: 50, height: 50 },
        imgBorder = { width: '1px', style: 'solid', color: '#0575e6', side: 'all', radius: '50%' },
        nameTypo = {},
        nameColor = '#000',
        degTypo = {},
        degColor = '#7B7B7B',
        textTypo = {},
        textColor = '#000',
        expandedTypo = {},
        expandColor = '',
        expandHoverColor = '',
        starIconColor = '#FF8C02',
        textLength = 120,
        grid2Bg = '#f9f8f8',
        grid2Padding = {},
        slider = { height: 500, autoPlay: true, mouseWheel: true, navigation: true },
        dataSource = 'manual',
        query = {}
    } = attributes || {};

    const elements = {
        img: true,
        name: true,
        deg: true,
        reviewText: true,
        icon: true,
        ...(rawElements || {})
    };

    const [device, setDevice] = useState('desktop');
    const {
        autoPlay = true, mouseWheel = true, navigation = true,
        // Arrow styling. Left undefined on purpose so Style.js emits nothing and
        // Swiper's own defaults stand until the user actually picks something.
        navSize, navOffset, navColor, navHoverColor, navBg, navHoverBg, navBorder
    } = (slider && typeof slider === 'object') ? slider : {};

    const singleItemBlocks = [
        'verified-buyer-badge',
        'trust-badges',
        'testimonial-form',
        'user-feedback-poll',
        'google-review-badge',
        'capterra-review-badge',
        'facebook-review-badge',
        'trustpilot-review-badge',
        'g2-review-badge',
        'review-badge-widget',
        'rating-summary',
        'star-rating-bars',
        'before-after',
        'testimonial-stats',
        'comparison-testimonial-table',
        'faq-testimonial-accordion',
        'testimonials-card-stack'
    ];
    const isSingleTestimonial = layout === 'single' || layout === 'testimonials-single';
    const isSingleItemBlock = singleItemBlocks.includes(layout) || isSingleTestimonial;
    const isCaseStudy = layout === 'case-study-card';

    // Whether this block's card list can be rearranged, and which arrangement is
    // currently in effect (falling back to `layout` for posts saved before the
    // attribute existed).
    const canArrange = supportsArrangement(layout);
    const arrangement = resolveArrangement(attributes);
    const isSliderArrangement = ['slider', 'slider-3d', 'coverflow'].includes(arrangement);

    // The excerpt cut and the Expand/Less toggle belong to the review text, so
    // they follow whether the layout prints it -- not how many items it shows.
    const hasExcerpt = rendersReviewText(layout) && elements?.reviewText !== false;

    const addItem = () => {
        setAttributes({
            items: [...items, {
                img: {
                    url: "https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png"
                },
                name: "John Doe",
                deg: "Developer",
                reviewText: "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout",
                rating: 4
            }]
        });
        setActiveIndex(items.length);
    }

    const duplicateItem = e => {
        e.preventDefault();
        setAttributes({ items: [...items.slice(0, activeIndex), { ...items[activeIndex] }, ...items.slice(activeIndex)] });
        setActiveIndex(activeIndex + 1);
    }

    const removeItem = e => {
        e.preventDefault();
        setAttributes({ items: [...items.slice(0, activeIndex), ...items.slice(activeIndex + 1)] });
        setActiveIndex(0 === activeIndex ? 0 : activeIndex - 1);
    }

    // update object 
    const updateObject = (attr, key, val) => {
        const newAttr = { ...attributes[attr] };
        newAttr[key] = val;
        setAttributes({ [attr]: newAttr })
    }
    const currentItem = items[activeIndex] || items[0] || {};
    const { img = {}, name = '', reviewText = '', deg = '', rating = 5 } = currentItem;

    return <>
        <InspectorControls>
            <TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
                {'general' === tab.name && <>
                    <BlockSwitcher clientId={clientId} currentBlockName={currentBlockName} attributes={attributes} setAttributes={setAttributes} />

                    {(!isSingleItemBlock || isSingleTestimonial) && (
                        <PanelBody className='bPlPanelBody' title={__('Content Source', 'b-testimonials-block')}>
                            <SelectControl
                                label={__('Source', 'b-testimonials-block')}
                                value={dataSource}
                                options={[
                                    { label: __('Manual', 'b-testimonials-block'), value: 'manual' },
                                    { label: __('Testimonials (CPT)', 'b-testimonials-block'), value: 'cpt' },
                                ]}
                                onChange={val => setAttributes({ dataSource: val })}
                            />

                            {'cpt' === dataSource && <>
                                <RangeControl label={__('Number', 'b-testimonials-block')} value={query?.number || 6} onChange={val => setAttributes({ query: { ...query, number: val } })} min={1} max={50} step={1} />

                                <SelectControl label={__('Order By', 'b-testimonials-block')} value={query?.orderBy || 'date'} options={[
                                    { label: __('Date', 'b-testimonials-block'), value: 'date' },
                                    { label: __('Title', 'b-testimonials-block'), value: 'title' },
                                    { label: __('Menu Order', 'b-testimonials-block'), value: 'menu_order' },
                                ]} onChange={val => setAttributes({ query: { ...query, orderBy: val } })} />

                                <SelectControl label={__('Order', 'b-testimonials-block')} value={query?.order || 'desc'} options={[
                                    { label: __('Descending', 'b-testimonials-block'), value: 'desc' },
                                    { label: __('Ascending', 'b-testimonials-block'), value: 'asc' },
                                ]} onChange={val => setAttributes({ query: { ...query, order: val } })} />

                                <p className='description'>{__('Manage testimonials under the Testimonials menu.', 'b-testimonials-block')}</p>
                            </>}
                        </PanelBody>
                    )}

                    {/* Context-aware Widget / Badge / Custom Block Settings */}
                    {(() => {
                        // Skip top panel for case-study-card (handled inside item cards)
                        if (layout === 'case-study-card') return null;

                        // Define context-specific labels per layout type
                        const fieldLabels = {
                            'google-review-badge': {
                                panel: 'Google Review Badge Settings',
                                title: 'Badge Title',
                                score: 'Rating Score',
                                count: 'Review Count',
                                titleHelp: 'Title for Google badge',
                                scoreHelp: 'Rating score e.g. 4.9',
                                countHelp: 'Total review count e.g. (128+ Reviews)',
                            },
                            'capterra-review-badge': {
                                panel: 'Capterra Rating Badge Settings',
                                title: 'Badge Title',
                                score: 'Rating Score',
                                count: 'Review Count / Text',
                                titleHelp: 'Title for Capterra badge',
                                scoreHelp: 'Rating score e.g. 4.8',
                                countHelp: 'Subtext for Capterra badge',
                            },
                            'facebook-review-badge': {
                                panel: 'Facebook Review Badge Settings',
                                title: 'Badge Title',
                                score: 'Rating Score',
                                count: 'Recommendation Text',
                                titleHelp: 'Title for Facebook badge',
                                scoreHelp: 'Rating score e.g. 5.0',
                                countHelp: 'Text e.g. Recommended by 250+ Customers',
                            },
                            'trustpilot-review-badge': {
                                panel: 'Trustpilot Badge Settings',
                                title: 'Badge Title',
                                score: 'TrustScore',
                                count: 'Review Count',
                                titleHelp: 'Title for Trustpilot badge',
                                scoreHelp: 'TrustScore e.g. 4.9 / 5',
                                countHelp: 'Subtext e.g. TrustScore | 500+ Reviews',
                            },
                            'g2-review-badge': {
                                panel: 'G2 Badge Settings',
                                title: 'Badge Title',
                                score: 'Rating Score',
                                count: 'Category / Text',
                                titleHelp: 'Title for G2 badge',
                                scoreHelp: 'Rating score e.g. 4.8 / 5',
                                countHelp: 'Subtext e.g. Leader Category 2026',
                            },
                            'verified-buyer-badge': {
                                panel: 'Verified Buyer Badge Settings',
                                title: 'Badge Title',
                                desc: 'Description',
                                titleHelp: 'Title for Verified badge',
                                descHelp: 'Subtext e.g. All customer testimonials are authenticated & verified.',
                            },
                            'review-badge-widget': {
                                panel: 'Review Badge Widget Settings',
                                title: 'Widget Title',
                                score: 'Rating Score',
                                count: 'Review Count',
                                titleHelp: 'Title for review widget',
                                scoreHelp: 'Rating score e.g. 4.9',
                                countHelp: 'Subtext e.g. Based on 320+ reviews',
                            },
                            'rating-summary': {
                                panel: 'Rating Summary Settings',
                                score: 'Overall Rating Score',
                                count: 'Review Count Text',
                                scoreHelp: 'Average score e.g. 4.8',
                                countHelp: 'Subtext e.g. Based on 256 reviews',
                            },
                            'before-after': {
                                panel: 'Before & After Settings',
                                title: 'Section Title',
                                desc: '',
                                score: '',
                                count: '',
                                titleHelp: 'Main heading above the comparison',
                            },
                            'testimonial-form': {
                                panel: 'Form Settings',
                                title: 'Form Title',
                                desc: '',
                                score: '',
                                count: 'Submit Button Text',
                                titleHelp: 'Heading above the form',
                                countHelp: 'Text shown on the submit button',
                            },
                            'user-feedback-poll': {
                                panel: 'Poll Settings',
                                title: 'Poll Question',
                                desc: 'Poll Subtitle',
                                score: '',
                                count: '',
                                titleHelp: 'The main question displayed to visitors',
                                descHelp: 'Short description below the question',
                            },
                            'social-proof-toast': {
                                panel: 'Toast Settings',
                                title: 'Toast Message',
                                desc: 'Time Label',
                                score: '',
                                count: '',
                                titleHelp: 'Notification message text',
                                descHelp: 'Timestamp text (e.g. "Just now", "2 min ago")',
                            },
                            'testimonial-stats': {
                                panel: 'Stats Settings',
                                title: 'Stat 1 Label',
                                desc: 'Stat 2 Label',
                                score: 'Stat 1 Number',
                                count: 'Stat 2 Number',
                                titleHelp: 'Label for first stat card',
                                descHelp: 'Label for second stat card',
                                scoreHelp: 'Number for first stat card (e.g. 10K+)',
                                countHelp: 'Number for second stat card (e.g. 98%)',
                            },
                            'star-rating-bars': {
                                panel: 'Rating Bars Settings',
                                title: 'Section Title',
                                desc: '',
                                score: '',
                                count: '',
                                titleHelp: 'Heading above the rating breakdown',
                            },
                            'comparison-testimonial-table': {
                                panel: 'Table Settings',
                                title: 'Table Title',
                                desc: '',
                                score: '',
                                count: '',
                                titleHelp: 'Heading above the comparison table',
                            },
                            'faq-testimonial-accordion': {
                                panel: 'FAQ Settings',
                                title: 'FAQ Title',
                                desc: '',
                                score: '',
                                count: '',
                                titleHelp: 'Heading above the FAQ accordion',
                            },
                            'trust-badges': {
                                panel: 'Trust Badges Settings',
                                title: 'Badge 1 Text',
                                desc: 'Badge 2 Text',
                                score: 'Badge 3 Text',
                                count: 'Badge 4 Text',
                                titleHelp: 'Text for first trust badge',
                                descHelp: 'Text for second trust badge',
                                scoreHelp: 'Text for third trust badge',
                                countHelp: 'Text for fourth trust badge',
                            },
                            'testimonials-avatar-list': {
                                panel: 'Avatar Reviews List Settings',
                            },
                        };

                        const labels = fieldLabels[layout];
                        if (!labels) return null;

                        return (
                            <PanelBody className='bPlPanelBody' title={__(labels.panel, 'b-testimonials-block')} initialOpen={true}>
                                {labels.title && <TextControl
                                    label={__(labels.title, 'b-testimonials-block')}
                                    value={attributes.badgeTitle ?? ''}
                                    onChange={val => setAttributes({ badgeTitle: val })}
                                    help={labels.titleHelp ? __(labels.titleHelp, 'b-testimonials-block') : ''}
                                />}
                                {labels.desc && <TextControl
                                    label={__(labels.desc, 'b-testimonials-block')}
                                    value={attributes.badgeDesc ?? ''}
                                    onChange={val => setAttributes({ badgeDesc: val })}
                                    help={labels.descHelp ? __(labels.descHelp, 'b-testimonials-block') : ''}
                                />}
                                {labels.score && <TextControl
                                    label={__(labels.score, 'b-testimonials-block')}
                                    value={attributes.badgeScore ?? ''}
                                    onChange={val => setAttributes({ badgeScore: val })}
                                    help={labels.scoreHelp ? __(labels.scoreHelp, 'b-testimonials-block') : ''}
                                />}
                                {labels.count && <TextControl
                                    label={__(labels.count, 'b-testimonials-block')}
                                    value={attributes.badgeCount ?? ''}
                                    onChange={val => setAttributes({ badgeCount: val })}
                                    help={labels.countHelp ? __(labels.countHelp, 'b-testimonials-block') : ''}
                                />}
                                {layout === 'user-feedback-poll' && (
                                    <>
                                        <hr style={{ margin: '15px 0', borderColor: '#e2e8f0' }} />
                                        <Label>{__('Scale & Rating Marks Options:', 'b-testimonials-block')}</Label>
                                        <TextControl
                                            className='mt5'
                                            label={__('Minimum Mark', 'b-testimonials-block')}
                                            type="number"
                                            value={attributes.minScore ?? 0}
                                            onChange={val => setAttributes({ minScore: parseInt(val, 10) || 0 })}
                                            help={__('Starting mark option (default: 0)', 'b-testimonials-block')}
                                        />
                                        <TextControl
                                            className='mt5'
                                            label={__('Maximum Mark', 'b-testimonials-block')}
                                            type="number"
                                            value={attributes.maxScore ?? 10}
                                            onChange={val => setAttributes({ maxScore: parseInt(val, 10) || 10 })}
                                            help={__('Ending mark option (e.g. 5, 10, 15, 20)', 'b-testimonials-block')}
                                        />
                                        <TextControl
                                            className='mt5'
                                            label={__('Low Scale Label', 'b-testimonials-block')}
                                            value={attributes.lowLabel ?? 'Not likely'}
                                            onChange={val => setAttributes({ lowLabel: val })}
                                        />
                                        <TextControl
                                            className='mt5'
                                            label={__('High Scale Label', 'b-testimonials-block')}
                                            value={attributes.highLabel ?? 'Very likely'}
                                            onChange={val => setAttributes({ highLabel: val })}
                                        />
                                    </>
                                )}
                                {layout === 'star-rating-bars' && (
                                    <>
                                        <hr style={{ margin: '15px 0', borderColor: '#e2e8f0' }} />
                                        <Label>{__('Manual Star Counts (Optional Overrides):', 'b-testimonials-block')}</Label>
                                        <TextControl
                                            className='mt5'
                                            label={__('5-Star Count', 'b-testimonials-block')}
                                            type="number"
                                            value={attributes.star5Count ?? ''}
                                            onChange={val => setAttributes({ star5Count: val })}
                                            help={__('Overrides automatic count from items', 'b-testimonials-block')}
                                        />
                                        <TextControl
                                            className='mt5'
                                            label={__('4-Star Count', 'b-testimonials-block')}
                                            type="number"
                                            value={attributes.star4Count ?? ''}
                                            onChange={val => setAttributes({ star4Count: val })}
                                        />
                                        <TextControl
                                            className='mt5'
                                            label={__('3-Star Count', 'b-testimonials-block')}
                                            type="number"
                                            value={attributes.star3Count ?? ''}
                                            onChange={val => setAttributes({ star3Count: val })}
                                        />
                                        <TextControl
                                            className='mt5'
                                            label={__('2-Star Count', 'b-testimonials-block')}
                                            type="number"
                                            value={attributes.star2Count ?? ''}
                                            onChange={val => setAttributes({ star2Count: val })}
                                        />
                                        <TextControl
                                            className='mt5'
                                            label={__('1-Star Count', 'b-testimonials-block')}
                                            type="number"
                                            value={attributes.star1Count ?? ''}
                                            onChange={val => setAttributes({ star1Count: val })}
                                        />
                                    </>
                                )}
                                {layout === 'comparison-testimonial-table' && (
                                    <>
                                        <hr style={{ margin: '15px 0', borderColor: '#e2e8f0' }} />
                                        <Label>{__('Table Column Headers:', 'b-testimonials-block')}</Label>
                                        <TextControl
                                            className='mt5'
                                            label={__('Column 1 Header', 'b-testimonials-block')}
                                            value={attributes.col1Header ?? 'Customer'}
                                            onChange={val => setAttributes({ col1Header: val })}
                                        />
                                        <TextControl
                                            className='mt5'
                                            label={__('Column 2 Header', 'b-testimonials-block')}
                                            value={attributes.col2Header ?? 'Rating'}
                                            onChange={val => setAttributes({ col2Header: val })}
                                        />
                                        <TextControl
                                            className='mt5'
                                            label={__('Column 3 Header', 'b-testimonials-block')}
                                            value={attributes.col3Header ?? 'Review'}
                                            onChange={val => setAttributes({ col3Header: val })}
                                        />

                                        <hr style={{ margin: '15px 0', borderColor: '#e2e8f0' }} />
                                        <Label>{__('Table Items / Rows:', 'b-testimonials-block')}</Label>
                                        {items.map((rowItem, rowIdx) => (
                                            <div key={rowIdx} className='mt10 btb-section-card' style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', background: '#f8fafc' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <strong style={{ fontSize: '12px', color: '#334155' }}>{__(`Row ${rowIdx + 1}`, 'b-testimonials-block')}</strong>
                                                    <div style={{ display: 'flex', gap: '4px' }}>
                                                        <Button
                                                            isSmall
                                                            variant='secondary'
                                                            onClick={() => {
                                                                const newItems = [...items.slice(0, rowIdx + 1), { ...items[rowIdx] }, ...items.slice(rowIdx + 1)];
                                                                setAttributes({ items: newItems });
                                                            }}
                                                            title={__('Duplicate Row', 'b-testimonials-block')}
                                                        >
                                                            <Dashicon icon='admin-page' />
                                                        </Button>
                                                        {items.length > 1 && (
                                                            <Button
                                                                isDestructive
                                                                isSmall
                                                                variant='tertiary'
                                                                onClick={() => {
                                                                    const newItems = items.filter((_, i) => i !== rowIdx);
                                                                    setAttributes({ items: newItems });
                                                                }}
                                                                title={__('Remove Row', 'b-testimonials-block')}
                                                            >
                                                                <Dashicon icon='no' />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>

                                                <TextControl
                                                    className='mt5'
                                                    label={__('Customer Name', 'b-testimonials-block')}
                                                    value={rowItem.name ?? ''}
                                                    onChange={val => {
                                                        const newItems = produce(items, draft => { draft[rowIdx].name = val; });
                                                        setAttributes({ items: newItems });
                                                    }}
                                                />

                                                <NumberControl
                                                    className='mt5'
                                                    label={__('Rating (1 - 5)', 'b-testimonials-block')}
                                                    labelPosition='left'
                                                    value={rowItem.rating ?? 5}
                                                    onChange={val => {
                                                        const newItems = produce(items, draft => { draft[rowIdx].rating = parseFloat(val) || 5; });
                                                        setAttributes({ items: newItems });
                                                    }}
                                                    min={1}
                                                    max={5}
                                                />

                                                <TextareaControl
                                                    className='mt5'
                                                    label={__('Review / Content', 'b-testimonials-block')}
                                                    value={rowItem.reviewText ?? ''}
                                                    onChange={val => {
                                                        const newItems = produce(items, draft => { draft[rowIdx].reviewText = val; });
                                                        setAttributes({ items: newItems });
                                                    }}
                                                />
                                            </div>
                                        ))}

                                        <Button
                                            className='mt15'
                                            variant='secondary'
                                            onClick={() => {
                                                const newItems = [...items, { name: 'Customer Name', rating: 5, reviewText: 'Great product and excellent support!' }];
                                                setAttributes({ items: newItems });
                                            }}
                                            style={{ width: '100%', justifyContent: 'center' }}
                                        >
                                            <Dashicon icon='plus' />{__('Add New Row', 'b-testimonials-block')}
                                        </Button>
                                    </>
                                )}
                                {layout === 'faq-testimonial-accordion' && (
                                    <>
                                        <hr style={{ margin: '15px 0', borderColor: '#e2e8f0' }} />
                                        <Label>{__('FAQ Questions & Answers:', 'b-testimonials-block')}</Label>
                                        {items.map((faqItem, faqIdx) => (
                                            <div key={faqIdx} className='mt10 btb-section-card' style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', background: '#f8fafc' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <strong style={{ fontSize: '12px', color: '#334155' }}>{__(`FAQ ${faqIdx + 1}`, 'b-testimonials-block')}</strong>
                                                    <div style={{ display: 'flex', gap: '4px' }}>
                                                        <Button
                                                            isSmall
                                                            variant='secondary'
                                                            onClick={() => {
                                                                const newItems = [...items.slice(0, faqIdx + 1), { ...items[faqIdx] }, ...items.slice(faqIdx + 1)];
                                                                setAttributes({ items: newItems });
                                                            }}
                                                            title={__('Duplicate Question', 'b-testimonials-block')}
                                                        >
                                                            <Dashicon icon='admin-page' />
                                                        </Button>
                                                        {items.length > 1 && (
                                                            <Button
                                                                isDestructive
                                                                isSmall
                                                                variant='tertiary'
                                                                onClick={() => {
                                                                    const newItems = items.filter((_, i) => i !== faqIdx);
                                                                    setAttributes({ items: newItems });
                                                                }}
                                                                title={__('Remove Question', 'b-testimonials-block')}
                                                            >
                                                                <Dashicon icon='no' />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>

                                                <TextControl
                                                    className='mt5'
                                                    label={__('Question Text', 'b-testimonials-block')}
                                                    value={faqItem.name ?? ''}
                                                    onChange={val => {
                                                        const newItems = produce(items, draft => { draft[faqIdx].name = val; });
                                                        setAttributes({ items: newItems });
                                                    }}
                                                />

                                                <TextareaControl
                                                    className='mt5'
                                                    label={__('Answer Content', 'b-testimonials-block')}
                                                    value={faqItem.reviewText ?? ''}
                                                    onChange={val => {
                                                        const newItems = produce(items, draft => { draft[faqIdx].reviewText = val; });
                                                        setAttributes({ items: newItems });
                                                    }}
                                                />

                                                <TextControl
                                                    className='mt5'
                                                    label={__('Author / Subtext (Optional)', 'b-testimonials-block')}
                                                    value={faqItem.deg ?? ''}
                                                    onChange={val => {
                                                        const newItems = produce(items, draft => { draft[faqIdx].deg = val; });
                                                        setAttributes({ items: newItems });
                                                    }}
                                                />
                                            </div>
                                        ))}

                                        <Button
                                            className='mt15'
                                            variant='secondary'
                                            onClick={() => {
                                                const newItems = [...items, { name: 'What is your refund policy?', reviewText: 'We offer a 30-day money-back guarantee with no questions asked.', deg: 'Customer Support' }];
                                                setAttributes({ items: newItems });
                                            }}
                                            style={{ width: '100%', justifyContent: 'center' }}
                                        >
                                            <Dashicon icon='plus' />{__('Add New Question', 'b-testimonials-block')}
                                        </Button>
                                    </>
                                )}
                                {layout === 'testimonials-avatar-list' && (
                                    <>
                                        <hr style={{ margin: '15px 0', borderColor: '#e2e8f0' }} />
                                        <Label>{__('Avatar Testimonial Items:', 'b-testimonials-block')}</Label>
                                        {items.map((avItem, avIdx) => (
                                            <div key={avIdx} className='mt10 btb-section-card' style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', background: '#f8fafc' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <strong style={{ fontSize: '12px', color: '#334155' }}>{__(`Avatar ${avIdx + 1}`, 'b-testimonials-block')}</strong>
                                                    <div style={{ display: 'flex', gap: '4px' }}>
                                                        <Button
                                                            isSmall
                                                            variant='secondary'
                                                            onClick={() => {
                                                                const newItems = [...items.slice(0, avIdx + 1), { ...items[avIdx] }, ...items.slice(avIdx + 1)];
                                                                setAttributes({ items: newItems });
                                                            }}
                                                            title={__('Duplicate Avatar', 'b-testimonials-block')}
                                                        >
                                                            <Dashicon icon='admin-page' />
                                                        </Button>
                                                        {items.length > 1 && (
                                                            <Button
                                                                isDestructive
                                                                isSmall
                                                                variant='tertiary'
                                                                onClick={() => {
                                                                    const newItems = items.filter((_, i) => i !== avIdx);
                                                                    setAttributes({ items: newItems });
                                                                }}
                                                                title={__('Remove Avatar', 'b-testimonials-block')}
                                                            >
                                                                <Dashicon icon='no' />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>

                                                <Label className='mt5'>{__('Avatar Image:', 'b-testimonials-block')}</Label>
                                                <InlineDetailMediaUpload
                                                    value={avItem.img || {}}
                                                    type={['image']}
                                                    onChange={val => {
                                                        const newItems = produce(items, draft => { draft[avIdx].img = val; });
                                                        setAttributes({ items: newItems });
                                                    }}
                                                />

                                                <TextControl
                                                    className='mt5'
                                                    label={__('Name', 'b-testimonials-block')}
                                                    value={avItem.name ?? ''}
                                                    onChange={val => {
                                                        const newItems = produce(items, draft => { draft[avIdx].name = val; });
                                                        setAttributes({ items: newItems });
                                                    }}
                                                />

                                                <TextControl
                                                    className='mt5'
                                                    label={__('Designation', 'b-testimonials-block')}
                                                    value={avItem.deg ?? ''}
                                                    onChange={val => {
                                                        const newItems = produce(items, draft => { draft[avIdx].deg = val; });
                                                        setAttributes({ items: newItems });
                                                    }}
                                                />

                                                <TextareaControl
                                                    className='mt5'
                                                    label={__('Review Text', 'b-testimonials-block')}
                                                    value={avItem.reviewText ?? ''}
                                                    onChange={val => {
                                                        const newItems = produce(items, draft => { draft[avIdx].reviewText = val; });
                                                        setAttributes({ items: newItems });
                                                    }}
                                                />
                                            </div>
                                        ))}

                                        <Button
                                            className='mt15'
                                            variant='secondary'
                                            onClick={() => {
                                                const newItems = [...items, { img: { url: 'https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png' }, name: 'John Doe', deg: 'Developer', reviewText: 'Fantastic product and smooth experience.' }];
                                                setAttributes({ items: newItems });
                                            }}
                                            style={{ width: '100%', justifyContent: 'center' }}
                                        >
                                            <Dashicon icon='plus' />{__('Add New Avatar Item', 'b-testimonials-block')}
                                        </Button>
                                    </>
                                )}
                                {layout === 'testimonials-card-stack' && (
                                    <>
                                        <hr style={{ margin: '15px 0', borderColor: '#e2e8f0' }} />
                                        <Label>{__('Stacked Cards Management:', 'b-testimonials-block')}</Label>
                                        {items.map((stkItem, stkIdx) => (
                                            <div key={stkIdx} className='mt10 btb-section-card' style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', background: '#f8fafc' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <strong style={{ fontSize: '12px', color: '#334155' }}>{__(`Card ${stkIdx + 1}`, 'b-testimonials-block')}</strong>
                                                    <div style={{ display: 'flex', gap: '4px' }}>
                                                        <Button
                                                            isSmall
                                                            variant='secondary'
                                                            onClick={() => {
                                                                const newItems = [...items.slice(0, stkIdx + 1), { ...items[stkIdx] }, ...items.slice(stkIdx + 1)];
                                                                setAttributes({ items: newItems });
                                                            }}
                                                            title={__('Duplicate Card', 'b-testimonials-block')}
                                                        >
                                                            <Dashicon icon='admin-page' />
                                                        </Button>
                                                        {items.length > 1 && (
                                                            <Button
                                                                isDestructive
                                                                isSmall
                                                                variant='tertiary'
                                                                onClick={() => {
                                                                    const newItems = items.filter((_, i) => i !== stkIdx);
                                                                    setAttributes({ items: newItems });
                                                                }}
                                                                title={__('Remove Card', 'b-testimonials-block')}
                                                            >
                                                                <Dashicon icon='no' />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>

                                                <TextControl
                                                    className='mt5'
                                                    label={__('Name', 'b-testimonials-block')}
                                                    value={stkItem.name ?? ''}
                                                    onChange={val => {
                                                        const newItems = produce(items, draft => { draft[stkIdx].name = val; });
                                                        setAttributes({ items: newItems });
                                                    }}
                                                />

                                                <TextControl
                                                    className='mt5'
                                                    label={__('Designation', 'b-testimonials-block')}
                                                    value={stkItem.deg ?? ''}
                                                    onChange={val => {
                                                        const newItems = produce(items, draft => { draft[stkIdx].deg = val; });
                                                        setAttributes({ items: newItems });
                                                    }}
                                                />

                                                <TextareaControl
                                                    className='mt5'
                                                    label={__('Review Text', 'b-testimonials-block')}
                                                    value={stkItem.reviewText ?? ''}
                                                    onChange={val => {
                                                        const newItems = produce(items, draft => { draft[stkIdx].reviewText = val; });
                                                        setAttributes({ items: newItems });
                                                    }}
                                                />
                                            </div>
                                        ))}

                                        <Button
                                            className='mt15'
                                            variant='secondary'
                                            onClick={() => {
                                                const newItems = [...items, { name: 'John Doe', deg: 'Developer', reviewText: 'Excellent service and top quality output.' }];
                                                setAttributes({ items: newItems });
                                            }}
                                            style={{ width: '100%', justifyContent: 'center' }}
                                        >
                                            <Dashicon icon='plus' />{__('Add New Stack Card', 'b-testimonials-block')}
                                        </Button>
                                    </>
                                )}
                            </PanelBody>
                        );
                    })()}

                    {/* Hide Card Content Settings panel for single item review badges / widgets (except single testimonial block) */}
                    {(() => {
                        if ('manual' !== dataSource) return null;
                        if (isSingleItemBlock && !isSingleTestimonial) return null;

                        return (
                            <PanelBody className='bPlPanelBody addRemoveItems editItem' title={isSingleTestimonial ? __('Single Testimonial Settings', 'b-testimonials-block') : isCaseStudy ? __('Add or Remove Case Study Cards', 'b-testimonials-block') : __('Add or Remove Testimonial Cards', 'b-testimonials-block')}>
                                {!isSingleItemBlock && items?.length > 1 && (
                                    <div className='btb-card-selector-list mb15' style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {items.map((_, idx) => (
                                            <Button
                                                key={idx}
                                                variant={activeIndex === idx ? 'primary' : 'secondary'}
                                                isSmall
                                                onClick={() => setActiveIndex(idx)}
                                            >
                                                {__(`Card ${idx + 1}`, 'b-testimonials-block')}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                                {null !== activeIndex && <>
                                    {!isSingleItemBlock && <h3 className='bplItemTitle'>{__(`Card ${activeIndex + 1}:`, 'b-testimonials-block')}</h3>}

                                    <Label>{__('Customer Image / Avatar:', 'b-testimonials-block')}</Label>
                                    <InlineDetailMediaUpload value={img} type={['image']} onChange={val => updateItem('img', val)} placeholder={__('Enter Image URL', 'b-testimonials-block')} />

                                    <TextControl className='mt10' label={__('Name', 'b-testimonials-block')} value={name} onChange={val => updateItem('name', val)} />

                                    <TextControl className='mt10' label={__('Company / Designation', 'b-testimonials-block')} value={deg} onChange={val => updateItem('deg', val)} />

                                    {isCaseStudy ? (
                                        <>
                                            {(() => {
                                                const sections = currentItem.sections || [
                                                    { title: currentItem.challengeTitle ?? 'Challenge', content: currentItem.challenge ?? 'The customer needed a reliable solution to improve their workflow.' },
                                                    { title: currentItem.solutionTitle ?? 'Solution', content: currentItem.solution ?? reviewText ?? 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout' },
                                                    { title: currentItem.resultTitle ?? 'Result', content: currentItem.result ?? '95% improvement in efficiency and customer satisfaction.' }
                                                ];

                                                const updateSection = (secIdx, field, val) => {
                                                    const newSections = sections.map((sec, i) => i === secIdx ? { ...sec, [field]: val } : sec);
                                                    updateItem('sections', newSections);
                                                };

                                                const removeSection = (secIdx) => {
                                                    const newSections = sections.filter((_, i) => i !== secIdx);
                                                    updateItem('sections', newSections);
                                                };

                                                const addSection = () => {
                                                    const newSections = [...sections, { title: 'New Section', content: '' }];
                                                    updateItem('sections', newSections);
                                                };

                                                return (
                                                    <div className='mt15 btb-case-study-sections'>
                                                        <Label>{__('Case Study Sections:', 'b-testimonials-block')}</Label>
                                                        {sections.map((sec, secIdx) => (
                                                            <div key={secIdx} className='mt10 btb-section-card' style={{ border: '1px dashed #cbd5e1', borderRadius: '6px', padding: '10px', background: '#f8fafc' }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <strong style={{ fontSize: '12px', color: '#475569' }}>{__(`Section ${secIdx + 1}`, 'b-testimonials-block')}</strong>
                                                                    {sections.length > 1 && (
                                                                        <Button
                                                                            isDestructive
                                                                            isSmall
                                                                            variant='tertiary'
                                                                            onClick={() => removeSection(secIdx)}
                                                                            title={__('Remove Section', 'b-testimonials-block')}
                                                                        >
                                                                            <Dashicon icon='no' />
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                                <TextControl
                                                                    className='mt5'
                                                                    label={__('Section Title', 'b-testimonials-block')}
                                                                    value={sec.title ?? ''}
                                                                    onChange={val => updateSection(secIdx, 'title', val)}
                                                                />
                                                                <TextareaControl
                                                                    className='mt5'
                                                                    label={__('Section Content', 'b-testimonials-block')}
                                                                    value={sec.content ?? ''}
                                                                    onChange={val => updateSection(secIdx, 'content', val)}
                                                                />
                                                            </div>
                                                        ))}
                                                        <Button
                                                            className='mt10'
                                                            variant='secondary'
                                                            onClick={addSection}
                                                            style={{ width: '100%', justifyContent: 'center' }}
                                                        >
                                                            <Dashicon icon='plus' />{__('Add New Section', 'b-testimonials-block')}
                                                        </Button>
                                                    </div>
                                                );
                                            })()}
                                        </>
                                    ) : (
                                        <TextareaControl className='mt10' label={__('Review / Quote Text', 'b-testimonials-block')} value={reviewText} onChange={val => updateItem('reviewText', val)} />
                                    )}

                                    {(!isSingleItemBlock || isSingleTestimonial) && !isCaseStudy && (
                                        <NumberControl className='mt10' label={__('Rating:', 'b-testimonials-block')} labelPosition='left' value={rating} onChange={val => updateItem('rating', parseFloat(val))} min={0} max={5} step={0.1} />
                                    )}

                                    {!isSingleItemBlock && (
                                        <PanelRow className='itemAction mt10 mb15'>
                                            {1 < items?.length && <Button className='removeItem' label={__('Remove', 'b-testimonials-block')} onClick={removeItem}><Dashicon icon='no' />{__('Remove', 'b-testimonials-block')}</Button>}
                                            <Button className='duplicateItem' label={__('Duplicate', 'b-testimonials-block')} onClick={duplicateItem}>{gearIcon}{__('Duplicate', 'b-testimonials-block')}</Button>
                                        </PanelRow>
                                    )}
                                </>}

                                {!isSingleItemBlock && (
                                    <div className='addItem'>
                                        <Button label={isCaseStudy ? __('Add New Case Study Card', 'b-testimonials-block') : __('Add New Card', 'b-testimonials-block')} onClick={addItem}><Dashicon icon='plus' size={23} />{isCaseStudy ? __('Add New Case Study Card', 'b-testimonials-block') : __('Add New Card', 'b-testimonials-block')}</Button>
                                    </div>
                                )}
                            </PanelBody>
                        );
                    })()}

                    {(!isSingleItemBlock || isSingleTestimonial) && (
                        <>
                            <PanelBody className='bPlPanelBody' title={__('Elements', 'b-testimonials-block')} initialOpen={false}>
                                <ToggleControl className='mt10' label={__('Image', 'b-testimonials-block')} labelPosition='left' checked={elements?.img} onChange={val => updateObject('elements', 'img', val)} />

                                <ToggleControl className='mt10' label={__('Name', 'b-testimonials-block')} labelPosition='left' checked={elements?.name} onChange={val => updateObject('elements', 'name', val)} />

                                <ToggleControl className='mt10' label={__('Designation', 'b-testimonials-block')} labelPosition='left' checked={elements?.deg} onChange={val => updateObject('elements', 'deg', val)} />

                                <ToggleControl className='mt10' label={__('Review Text', 'b-testimonials-block')} labelPosition='left' checked={elements?.reviewText} onChange={val => updateObject('elements', 'reviewText', val)} />

                                <ToggleControl className='mt10' label={__('Rating', 'b-testimonials-block')} labelPosition='left' checked={elements?.icon} onChange={val => updateObject('elements', 'icon', val)} />
                            </PanelBody>
                        </>
                    )}

                    {/* One panel for the whole excerpt story. These three used to
                        sit in three places -- the toggle under Elements, its
                        button labels in a panel called "Button", and the length
                        itself over in the Style tab. */}
                    {hasExcerpt && (
                        <PanelBody className='bPlPanelBody' title={__('Excerpt & Expand', 'b-testimonials-block')} initialOpen={false}>
                            <RangeControl label={__('Excerpt length', 'b-testimonials-block')} value={textLength} onChange={val => setAttributes({ textLength: val })} min={10} max={1000} step={1} help={__('Characters shown before the review is cut.', 'b-testimonials-block')} />

                            <ToggleControl className='mt10' label={__('Expand / Less button', 'b-testimonials-block')} labelPosition='left' checked={!!elements?.expandBtn} onChange={val => updateObject('elements', 'expandBtn', val)} help={__('Without it the review is never cut.', 'b-testimonials-block')} />

                            {elements?.expandBtn && <>
                                <TextControl className='mt10' label={__('Expand Text', 'b-testimonials-block')} value={elements?.expandText ?? 'Expand'} onChange={val => updateObject('elements', 'expandText', val)} />

                                <TextControl className='mt10' label={__('Collapse Text', 'b-testimonials-block')} value={elements?.collapseText ?? 'Less'} onChange={val => updateObject('elements', 'collapseText', val)} />
                            </>}
                        </PanelBody>
                    )}


                    <IconSettings attributes={attributes} setAttributes={setAttributes} />

                    {(!isSingleItemBlock || isSingleTestimonial) && (
                        <PanelBody className='bPlPanelBody' title={__('Layout', 'b-testimonials-block')} initialOpen={false}>
                            {/* Writes `arrangement`, not `layout`. Setting `layout` here
                                used to swap the block's identity: on a quote box it
                                replaced the class its whole look depends on, and on a
                                timeline or hero it converted the block outright with no
                                way back, because those values are not even in the list.
                                Shown only for layouts that reach the arrangement switch
                                -- the rest return their own markup before it. */}
                            {canArrange && (
                                <PanelRow>
                                    <Label className="mt0 mb0">{__('Arrangement:', 'b-testimonials-block')}</Label>
                                    <SelectControl value={arrangement} onChange={val => setAttributes({ arrangement: val })} options={arrangementOpt} />
                                </PanelRow>
                            )}

                            <PanelRow>
                                <Label className="mt0 mb0">{__('Theme:', 'b-testimonials-block')}</Label>
                                <SelectControl value={theme}
                                    onChange={val =>
                                        setAttributes({ theme: val, ...checkTheme(val, border) })}
                                    options={themeOpt} />
                            </PanelRow>

                            <PanelRow>
                                <Label mt='0'>{__('Columns:', 'b-testimonials-block')}</Label>
                                <BDevice device={device} onChange={val => setDevice(val)} />
                            </PanelRow>

                            <RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />

                            <UnitControl className='mt20' label={__('Column Gap:', 'b-testimonials-block')} labelPosition='left' value={columnGap} onChange={val => setAttributes({ columnGap: val })} units={[pxUnit(30), perUnit(3), emUnit(2)]} isResetValueOnUnitChange={true} />

                            {!isSliderArrangement && <UnitControl className='mt20' label={__('Row Gap:', 'b-testimonials-block')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(40), perUnit(3), emUnit(2.5)]} isResetValueOnUnitChange={true} />}

                        </PanelBody>
                    )}

                    {isSliderArrangement && <PanelBody className='bPlPanelBody' title={__('Slider', 'b-testimonials-block')} initialOpen={false}>
                        {/* Slider Height used to be commented out here, reading a
                            `height` variable that is no longer destructured. Card
                            Height in the Style tab covers it and works for grids
                            too, so it is gone rather than revived. */}
                        <ToggleControl className='mt10' label={__('AutoPlay', 'b-testimonials-block')} labelPosition='left' checked={autoPlay} onChange={val => updateObject('slider', 'autoPlay', val)} />

                        <ToggleControl className='mt10' label={__('MouseWheel', 'b-testimonials-block')} labelPosition='left' checked={mouseWheel} onChange={val => updateObject('slider', 'mouseWheel', val)} />

                        <ToggleControl className='mt10' label={__('Navigation', 'b-testimonials-block')} labelPosition='left' checked={navigation} onChange={val => updateObject('slider', 'navigation', val)} />

                        {/* Arrow styling. Hidden when navigation is off, since
                            there is no arrow to style. Every one of these is
                            reset-able back to Swiper's default rather than to a
                            value of ours, so "no opinion" stays expressible. */}
                        {navigation && <>
                            <RangeControl className='mt20' label={__('Arrow Size', 'b-testimonials-block')} value={navSize} onChange={val => updateObject('slider', 'navSize', val)} min={16} max={80} step={1} allowReset resetFallbackValue={undefined} />

                            {/* Inset only. The slider clips its own overflow --
                                that is what keeps the off-screen slides hidden --
                                so an arrow pushed past the edge is cut in half
                                rather than sitting outside. */}
                            <RangeControl label={__('Distance From Edge', 'b-testimonials-block')} value={navOffset} onChange={val => updateObject('slider', 'navOffset', val)} min={0} max={60} step={1} allowReset resetFallbackValue={undefined} help={__('Moves the arrows inward from the slider edge.', 'b-testimonials-block')} />

                            <ColorControl className='mt10' label={__('Arrow Color:', 'b-testimonials-block')} value={navColor} onChange={val => updateObject('slider', 'navColor', val)} />

                            <ColorControl className='mt10' label={__('Arrow Hover Color:', 'b-testimonials-block')} value={navHoverColor} onChange={val => updateObject('slider', 'navHoverColor', val)} />

                            <ColorControl className='mt10' label={__('Arrow Background:', 'b-testimonials-block')} value={navBg} onChange={val => updateObject('slider', 'navBg', val)} />

                            <ColorControl className='mt10' label={__('Arrow Hover Background:', 'b-testimonials-block')} value={navHoverBg} onChange={val => updateObject('slider', 'navHoverBg', val)} />

                            <BorderControl className='mt20' label={__('Arrow Border:', 'b-testimonials-block')} value={navBorder} onChange={val => updateObject('slider', 'navBorder', val)} />
                        </>}
                    </PanelBody>}
                </>}

                {'style' === tab.name && <>
                    <ColorsPanel attributes={attributes} setAttributes={setAttributes} layout={layout} />

                    <PanelBody className='bPlPanelBody' title={__('Width & Height', 'b-testimonials-block')} initialOpen={false}>
                        {/* Shares the device switch with the Layout panel, so the
                            device you are editing does not silently differ between
                            the two tabs. */}
                        <PanelRow>
                            <Label mt='0'>{__('Device:', 'b-testimonials-block')}</Label>
                            <BDevice device={device} onChange={val => setDevice(val)} />
                        </PanelRow>

                        {/* max-width, not width: a hard width would overflow a
                            container narrower than the value on small screens. */}
                        <UnitControl className='mt20' label={__('Block Width:', 'b-testimonials-block')} labelPosition='left' value={blockWidth?.[device] || ''} onChange={val => updateObject('blockWidth', device, val)} units={[pxUnit(1200), perUnit(100), emUnit(60), vwUnit(100)]} isResetValueOnUnitChange={true} help={__('Maximum width. Leave empty to follow the theme.', 'b-testimonials-block')} />

                        {/* min-height, so a card that needs more room still grows
                            rather than clipping its review text. */}
                        <UnitControl className='mt20' label={__('Card Height:', 'b-testimonials-block')} labelPosition='left' value={cardHeight?.[device] || ''} onChange={val => updateObject('cardHeight', device, val)} units={[pxUnit(320), emUnit(20), vhUnit(50)]} isResetValueOnUnitChange={true} help={__('Minimum height, for evening up ragged cards.', 'b-testimonials-block')} />
                    </PanelBody>

                    <PanelBody className='bPlPanelBody' title={__('Card', 'b-testimonials-block')} initialOpen={false} >

                        <ColorControl className="mb10" label={__('Background Color', 'b-testimonials-block')} value={background} onChange={val => setAttributes({ background: val })} />

                        <BoxControl label={__('Padding', 'b-testimonials-block')} values={padding} onChange={val => setAttributes({ padding: val })} resetValues={{ top: "5px", right: "10px", bottom: "5px", left: "10px" }} units={[pxUnit(3), emUnit(2)]} />

                        {/* Resets to nothing rather than to a value of ours: the
                            gap between cards is already set by Column/Row Gap in
                            the Layout panel, so a default margin here would fight
                            it. This is for nudging cards, not spacing them. */}
                        <BoxControl label={__('Margin', 'b-testimonials-block')} values={cardMargin} onChange={val => setAttributes({ cardMargin: val })} resetValues={{ top: "", right: "", bottom: "", left: "" }} units={[pxUnit(3), emUnit(2), perUnit(2)]} />

                        <BorderControl className='' label={__('Border', 'b-testimonials-block')} value={border}
                            onChange={(val) => setAttributes({ border: val })} />

                        <ShadowControl label={__('Shadow:', 'sound-cloud')} value={shadow} onChange={val => setAttributes({ shadow: val })} produce={produce} />
                    </PanelBody>

                    {(!isSingleItemBlock || isSingleTestimonial) && elements?.img !== false && (
                        <PanelBody className='bPlPanelBody' title={__('Image', 'b-testimonials-block')} initialOpen={false} >
                            <PanelRow>
                                <NumberControl className='mt10' label={__('Width:', 'b-testimonials-block')} labelPosition='left' value={image?.width} onChange={val => updateObject('image', 'width', val)} />

                                <NumberControl className='mt10' label={__('Height:', 'b-testimonials-block')} labelPosition='left' value={image?.height} onChange={val => updateObject('image', 'height', val)} />
                            </PanelRow>
                            <BorderControl className='' label={__('Border', 'b-testimonials-block')} value={imgBorder}
                                onChange={(val) => setAttributes({ imgBorder: val })} />
                        </PanelBody>
                    )}

                    {(!isSingleItemBlock || isSingleTestimonial) && elements?.name !== false && (
                        <PanelBody className='bPlPanelBody' title={__('Name', 'b-testimonials-block')} initialOpen={false} >
                            <Typography className='mt10' label={__('Typography', 'b-testimonials-block')} value={nameTypo} onChange={val => setAttributes({ nameTypo: val })} produce={produce} />

                            <ColorControl className="mb10" label={__('Color', 'b-testimonials-block')} value={nameColor} onChange={val => setAttributes({ nameColor: val })} />
                        </PanelBody>
                    )}

                    {(!isSingleItemBlock || isSingleTestimonial) && elements?.deg !== false && (
                        <PanelBody className='bPlPanelBody' title={__('Designation', 'b-testimonials-block')} initialOpen={false} >
                            <Typography className='mt10' label={__('Typography', 'b-testimonials-block')} value={degTypo} onChange={val => setAttributes({ degTypo: val })} produce={produce} />

                            <ColorControl className="mb10" label={__('Color', 'b-testimonials-block')} value={degColor} onChange={val => setAttributes({ degColor: val })} />
                        </PanelBody>
                    )}

                    {(!isSingleItemBlock || isSingleTestimonial) && elements?.reviewText !== false && (
                        <PanelBody className='bPlPanelBody' title={__('Review Text', 'b-testimonials-block')} initialOpen={false} >
                            <Typography className='mt10' label={__('Typography', 'b-testimonials-block')} value={textTypo} onChange={val => setAttributes({ textTypo: val })} produce={produce} />

                            <ColorControl className="mb10" label={__('Color', 'b-testimonials-block')} value={textColor} onChange={val => setAttributes({ textColor: val })} />

                            <ColorControl className="mb10" label={__('Rating Icon Color', 'b-testimonials-block')} value={starIconColor} onChange={val => setAttributes({ starIconColor: val })} />
                        </PanelBody>
                    )}

                    {/* `expandedTypo` was declared here and in Style.js but was
                        only ever used to emit a Google Font link -- nothing
                        selected the font, and nothing styled the button. */}
                    {hasExcerpt && elements?.expandBtn && (
                        <PanelBody className='bPlPanelBody' title={__('Expand / Less Button', 'b-testimonials-block')} initialOpen={false} >
                            <Typography className='mt10' label={__('Typography', 'b-testimonials-block')} value={expandedTypo} onChange={val => setAttributes({ expandedTypo: val })} produce={produce} />

                            <ColorControl className="mb10" label={__('Color', 'b-testimonials-block')} value={expandColor} onChange={val => setAttributes({ expandColor: val })} />

                            <ColorControl className="mb10" label={__('Hover Color', 'b-testimonials-block')} value={expandHoverColor} onChange={val => setAttributes({ expandHoverColor: val })} />
                        </PanelBody>
                    )}

                    {(theme === 'theme_2' || 'masonry' === arrangement) &&
                        <PanelBody className='bPlPanelBody' title={__('Top', 'b-testimonials-block')} initialOpen={false} >

                            <ColorControl className="mb10" label={__('Background Color', 'b-testimonials-block')} value={grid2Bg} onChange={val => setAttributes({ grid2Bg: val })} />

                            <BoxControl label={__('Padding', 'b-testimonials-block')} values={grid2Padding} onChange={val => setAttributes({ grid2Padding: val })} resetValues={{ top: "10px", right: "10px", bottom: "10px", left: "10px" }} units={[pxUnit(3), emUnit(2)]} />
                        </PanelBody>
                    }
                </>}
            </>}</TabPanel>
        </InspectorControls>

        {!isSingleItemBlock && (
            <BlockControls>
                <ToolbarGroup className='bPlToolbar'>
                    <ToolbarButton label={__('Add New Item', 'b-blocks')} onClick={addItem}><Dashicon icon='plus' size={23} /></ToolbarButton>
                </ToolbarGroup>
            </BlockControls>
        )}
    </>;
};
export default Settings;