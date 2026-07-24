
import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, TextControl, SelectControl, RangeControl, __experimentalUnitControl as UnitControl, __experimentalNumberControl as NumberControl, Button, Dashicon, ToolbarGroup, ToolbarButton, TextareaControl, __experimentalBoxControl as BoxControl, ToggleControl } from '@wordpress/components';
import { produce } from 'immer';

// Settings Components
import { Label, ColorControl, InlineDetailMediaUpload, Typography, } from 'bpl-tools/Components';
import { BDevice, BorderControl, ShadowControl } from 'bpl-tools/Components/Deprecated';

import { gearIcon } from 'bpl-tools/utils/icons';
import { tabController } from 'bpl-tools/utils/functions';
import { emUnit, perUnit, pxUnit } from 'bpl-tools/utils/options';

import { checkTheme } from '../../.././utils/functions';
import { layoutOpt, generalStyleTabs, themeOpt } from './../../../utils/options';
import BlockSwitcher from '../../Common/BlockSwitcher';

const Settings = ({ attributes = {}, setAttributes, updateItem, activeIndex, setActiveIndex, clientId, currentBlockName }) => {
    const {
        columns = { desktop: 3, tablet: 2, mobile: 1 },
        columnGap = '30px',
        rowGap = '40px',
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
    const { autoPlay = true, mouseWheel = true, navigation = true } = (slider && typeof slider === 'object') ? slider : {};

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
                    <BlockSwitcher clientId={clientId} currentBlockName={currentBlockName} />

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

                    {/* Context-aware Widget / Badge / Custom Block Settings */}
                    {(() => {
                        // Skip top panel for case-study-card (handled inside item cards)
                        if (layout === 'case-study-card') return null;

                        // Define context-specific labels per layout type
                        const fieldLabels = {
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
                        };

                        // Default labels for badge blocks
                        const defaults = {
                            panel: 'Badge & Widget Settings',
                            title: 'Badge / Widget Title',
                            desc: 'Description / Subtitle',
                            score: 'Score / Rating Number',
                            count: 'Review Count / Extra Text',
                            titleHelp: 'Customize title for badges, forms, polls, or score widgets.',
                            descHelp: 'Customize description text.',
                            scoreHelp: 'Customize rating score e.g. 4.9 or 100%.',
                            countHelp: 'Customize review count or subtitle badge info.',
                        };

                        const labels = fieldLabels[layout] || defaults;

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
                            </PanelBody>
                        );
                    })()}

                    {/* Hide repeater buttons for single-card / widget blocks (excluding case-study-card which supports multiple cards) */}
                    {(() => {
                        const singleItemBlocks = [
                            'google-review-badge',
                            'capterra-review-badge',
                            'facebook-review-badge',
                            'trustpilot-review-badge',
                            'g2-review-badge',
                            'verified-buyer-badge',
                            'review-badge-widget',
                            'trust-badges',
                            'testimonial-form',
                            'user-feedback-poll',
                            'rating-summary',
                            'star-rating-bars',
                            'testimonial-stats',
                            'social-proof-toast'
                        ];
                        const isSingleItemBlock = singleItemBlocks.includes(layout);
                        const isCaseStudy = layout === 'case-study-card';

                        if ('manual' !== dataSource) return null;

                        return (
                            <PanelBody className='bPlPanelBody addRemoveItems editItem' title={isSingleItemBlock ? __('Card Content Settings', 'b-testimonials-block') : __('Add or Remove Case Study Cards', 'b-testimonials-block')}>
                                {null !== activeIndex && <>
                                    {!isSingleItemBlock && <h3 className='bplItemTitle'>{__(`Card ${activeIndex + 1}:`, 'b-testimonials-block')}</h3>}

                                    <Label>{__('Customer Image / Avatar:', 'b-testimonials-block')}</Label>
                                    <InlineDetailMediaUpload value={img} type={['image']} onChange={val => updateItem('img', val)} placeholder={__('Enter Image URL', 'b-testimonials-block')} />

                                    <TextControl className='mt10' label={__('Name', 'b-testimonials-block')} value={name} onChange={val => updateItem('name', val)} />

                                    <TextControl className='mt10' label={__('Company / Designation', 'b-testimonials-block')} value={deg} onChange={val => updateItem('deg', val)} />

                                    {isCaseStudy ? (
                                        <>
                                            <TextareaControl
                                                className='mt10'
                                                label={__('Challenge', 'b-testimonials-block')}
                                                value={currentItem.challenge ?? 'The customer needed a reliable solution to improve their workflow.'}
                                                onChange={val => updateItem('challenge', val)}
                                            />
                                            <TextareaControl
                                                className='mt10'
                                                label={__('Solution', 'b-testimonials-block')}
                                                value={currentItem.solution ?? reviewText ?? 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout'}
                                                onChange={val => updateItem('solution', val)}
                                            />
                                            <TextareaControl
                                                className='mt10'
                                                label={__('Result', 'b-testimonials-block')}
                                                value={currentItem.result ?? '95% improvement in efficiency and customer satisfaction.'}
                                                onChange={val => updateItem('result', val)}
                                            />
                                        </>
                                    ) : (
                                        <TextareaControl className='mt10' label={__('Review / Quote Text', 'b-testimonials-block')} value={reviewText} onChange={val => updateItem('reviewText', val)} />
                                    )}

                                    {!isSingleItemBlock && !isCaseStudy && (
                                        <NumberControl className='mt10' label={__('Rating:', 'b-testimonials-block')} labelPosition='left' value={rating} onChange={val => updateItem('rating', val)} min={1} max={5} />
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
                                        <Button label={__('Add New Case Study Card', 'b-testimonials-block')} onClick={addItem}><Dashicon icon='plus' size={23} />{__('Add New Case Study Card', 'b-testimonials-block')}</Button>
                                    </div>
                                )}
                            </PanelBody>
                        );
                    })()}

                    <PanelBody className='bPlPanelBody' title={__('Elements', 'b-testimonials-block')} initialOpen={false}>
                        <ToggleControl className='mt10' label={__('Image', 'b-testimonials-block')} labelPosition='left' checked={elements?.img} onChange={val => updateObject('elements', 'img', val)} />

                        <ToggleControl className='mt10' label={__('Name', 'b-testimonials-block')} labelPosition='left' checked={elements?.name} onChange={val => updateObject('elements', 'name', val)} />

                        <ToggleControl className='mt10' label={__('Designation', 'b-testimonials-block')} labelPosition='left' checked={elements?.deg} onChange={val => updateObject('elements', 'deg', val)} />

                        <ToggleControl className='mt10' label={__('Review Text', 'b-testimonials-block')} labelPosition='left' checked={elements?.reviewText} onChange={val => updateObject('elements', 'reviewText', val)} />

                        <ToggleControl className='mt10' label={__('Rating', 'b-testimonials-block')} labelPosition='left' checked={elements?.icon} onChange={val => updateObject('elements', 'icon', val)} />

                        <ToggleControl className='mt10' label={__('Expanded Button', 'b-testimonials-block')} labelPosition='left' checked={elements?.expandBtn} onChange={val => updateObject('elements', 'expandBtn', val)} />
                    </PanelBody>

                    {elements?.expandBtn && <PanelBody className='bPlPanelBody' title={__('Button', 'b-testimonials-block')} initialOpen={false}>
                        <TextControl className='' label={__('Expand Text', 'b-testimonials-block')} value={elements?.expandText} onChange={val => updateObject('elements', 'expandText', val)} />

                        <TextControl className='' label={__('Collapse Text', 'b-testimonials-block')} value={elements?.collapseText} onChange={val => updateObject('elements', 'collapseText', val)} />
                    </PanelBody>}


                    <PanelBody className='bPlPanelBody' title={__('Layout', 'b-testimonials-block')} initialOpen={false}>
                        <PanelRow>
                            <Label className="mt0 mb0">{__('Layout:', 'b-testimonials-block')}</Label>
                            <SelectControl value={layout} onChange={val => setAttributes({ layout: val })} options={layoutOpt} />
                        </PanelRow>

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

                        {layout !== "slider" && <UnitControl className='mt20' label={__('Row Gap:', 'b-testimonials-block')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(40), perUnit(3), emUnit(2.5)]} isResetValueOnUnitChange={true} />}

                    </PanelBody>

                    {layout === 'slider' && <PanelBody className='bPlPanelBody' title={__('Slider', 'b-testimonials-block')} initialOpen={false}>
                        {/* <PanelRow>
							<Label className="mt0 mb0">{__('Height', 'b-testimonials-block')}</Label>
							<NumberControl value={height} onChange={val => updateObject('slider', 'height', val)} />
						</PanelRow> */}

                        <ToggleControl className='mt10' label={__('AutoPlay', 'b-testimonials-block')} labelPosition='left' checked={autoPlay} onChange={val => updateObject('slider', 'autoPlay', val)} />

                        <ToggleControl className='mt10' label={__('MouseWheel', 'b-testimonials-block')} labelPosition='left' checked={mouseWheel} onChange={val => updateObject('slider', 'mouseWheel', val)} />

                        <ToggleControl className='mt10' label={__('Navigation', 'b-testimonials-block')} labelPosition='left' checked={navigation} onChange={val => updateObject('slider', 'navigation', val)} />
                    </PanelBody>}
                </>}

                {'style' === tab.name && <>
                    <PanelBody className='bPlPanelBody' title={__('Card', 'b-testimonials-block')} initialOpen={false} >

                        <ColorControl className="mb10" label={__('Background Color', 'b-testimonials-block')} value={background} onChange={val => setAttributes({ background: val })} />

                        <BoxControl label={__('Padding', 'b-testimonials-block')} values={padding} onChange={val => setAttributes({ padding: val })} resetValues={{ top: "5px", right: "10px", bottom: "5px", left: "10px" }} units={[pxUnit(3), emUnit(2)]} />

                        <BorderControl className='' label={__('Border', 'b-testimonials-block')} value={border}
                            onChange={(val) => setAttributes({ border: val })} />

                        <ShadowControl label={__('Shadow:', 'sound-cloud')} value={shadow} onChange={val => setAttributes({ shadow: val })} produce={produce} />
                    </PanelBody>

                    <PanelBody className='bPlPanelBody' title={__('Image', 'b-testimonials-block')} initialOpen={false} >
                        <PanelRow>
                            <NumberControl className='mt10' label={__('Width:', 'b-testimonials-block')} labelPosition='left' value={image?.width} onChange={val => updateObject('image', 'width', val)} />

                            <NumberControl className='mt10' label={__('Height:', 'b-testimonials-block')} labelPosition='left' value={image?.height} onChange={val => updateObject('image', 'height', val)} />
                        </PanelRow>
                        <BorderControl className='' label={__('Border', 'b-testimonials-block')} value={imgBorder}
                            onChange={(val) => setAttributes({ imgBorder: val })} />
                    </PanelBody>

                    <PanelBody className='bPlPanelBody' title={__('Name', 'b-testimonials-block')} initialOpen={false} >
                        <Typography className='mt10' label={__('Typography', 'b-testimonials-block')} value={nameTypo} onChange={val => setAttributes({ nameTypo: val })} produce={produce} />

                        <ColorControl className="mb10" label={__('Color', 'b-testimonials-block')} value={nameColor} onChange={val => setAttributes({ nameColor: val })} />
                    </PanelBody>

                    <PanelBody className='bPlPanelBody' title={__('Designation', 'b-testimonials-block')} initialOpen={false} >
                        <Typography className='mt10' label={__('Typography', 'b-testimonials-block')} value={degTypo} onChange={val => setAttributes({ degTypo: val })} produce={produce} />

                        <ColorControl className="mb10" label={__('Color', 'b-testimonials-block')} value={degColor} onChange={val => setAttributes({ degColor: val })} />
                    </PanelBody>

                    <PanelBody className='bPlPanelBody' title={__('Review Text', 'b-testimonials-block')} initialOpen={false} >
                        <Typography className='mt10' label={__('Typography', 'b-testimonials-block')} value={textTypo} onChange={val => setAttributes({ textTypo: val })} produce={produce} />

                        <ColorControl className="mb10" label={__('Color', 'b-testimonials-block')} value={textColor} onChange={val => setAttributes({ textColor: val })} />

                        <ColorControl className="mb10" label={__('Rating Icon Color', 'b-testimonials-block')} value={starIconColor} onChange={val => setAttributes({ starIconColor: val })} />

                        <RangeControl label={__('Excerpt length', 'b-testimonials-block')} labelPosition='left' value={textLength} onChange={(val) => { setAttributes({ textLength: val }) }} min={10} max={1000} step={1} beforeIcon='grid-view' />
                    </PanelBody>

                    {(layout === 'theme_2' || layout === 'masonry') &&
                        <PanelBody className='bPlPanelBody' title={__('Top', 'b-testimonials-block')} initialOpen={false} >

                            <ColorControl className="mb10" label={__('Background Color', 'b-testimonials-block')} value={grid2Bg} onChange={val => setAttributes({ grid2Bg: val })} />

                            <BoxControl label={__('Padding', 'b-testimonials-block')} values={grid2Padding} onChange={val => setAttributes({ grid2Padding: val })} resetValues={{ top: "10px", right: "10px", bottom: "10px", left: "10px" }} units={[pxUnit(3), emUnit(2)]} />
                        </PanelBody>
                    }
                </>}
            </>}</TabPanel>
        </InspectorControls>

        <BlockControls>
            <ToolbarGroup className='bPlToolbar'>
                <ToolbarButton label={__('Add New Item', 'b-blocks')} onClick={addItem}><Dashicon icon='plus' size={23} /></ToolbarButton>
            </ToolbarGroup>
        </BlockControls>
    </>;
};
export default Settings;