
import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, TextControl, SelectControl, RangeControl, __experimentalUnitControl as UnitControl, __experimentalNumberControl as NumberControl, Button, Dashicon, ToolbarGroup, ToolbarButton, TextareaControl, __experimentalBoxControl as BoxControl, ToggleControl } from '@wordpress/components';
import { produce } from 'immer';

// Settings Components
import { Label, ColorControl, InlineDetailMediaUpload, Typography, } from '../../../../../bpl-tools/Components';
import { BDevice, BorderControl, ShadowControl } from '../../../../../bpl-tools/Components/Deprecated';

import { gearIcon } from '../../../../../bpl-tools/utils/icons';
import { tabController } from '../../../../../bpl-tools/utils/functions';
import { emUnit, perUnit, pxUnit } from '../../../../../bpl-tools/utils/options';

import { checkTheme } from '../../.././utils/functions';
import { layoutOpt, generalStyleTabs, themeOpt } from './../../../utils/options';

const Settings = ({ attributes, setAttributes, updateItem, activeIndex, setActiveIndex }) => {
    const { columns, columnGap, rowGap, layout, theme, items, elements, background, padding, shadow, border, image, imgBorder, nameTypo, nameColor, degTypo, degColor, textTypo, textColor, starIconColor, textLength, grid2Bg, grid2Padding, slider } = attributes;

    const [device, setDevice] = useState('desktop');
    const { autoPlay, mouseWheel, navigation } = slider;

    const addItem = () => {
        setAttributes({
            items: [...items, {
                img: {
                    url: "https://i.ibb.co/n7qL1wJ/user-dummy.png"
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
    const { img, name, reviewText, deg, rating } = items[activeIndex] || {};

    return <>
        <InspectorControls>
            <TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
                {'general' === tab.name && <>

                    <PanelBody className='bPlPanelBody addRemoveItems editItem' title={__('Add or Remove Items', 'b-testimonials-block')}>
                        {null !== activeIndex && <>
                            <h3 className='bplItemTitle'>{__(`Item ${activeIndex + 1}:`, 'b-testimonials-block')}</h3>

                            <Label>{__('Image:', 'b-testimonials-block')}</Label>
                            <InlineDetailMediaUpload value={img} type={['image']} onChange={val => updateItem('img', val)} placeholder={__('Enter Image URL', 'b-testimonials-block')} />

                            <TextControl className='mt10' label={__('Name', 'b-testimonials-block')} value={name} onChange={val => updateItem('name', val)} />

                            <TextControl className='mt10' label={__('Designation', 'b-testimonials-block')} value={deg} onChange={val => updateItem('deg', val)} />

                            <TextareaControl className='mt10' label={__('Review', 'b-testimonials-block')} value={reviewText} onChange={val => updateItem('reviewText', val)} />

                            <NumberControl className='mt10' label={__('Rating:', 'b-testimonials-block')} labelPosition='left' value={rating} onChange={val => updateItem('rating', val)} min={1} max={5} />

                            <PanelRow className='itemAction mt10 mb15'>
                                {1 < items?.length && <Button className='removeItem' label={__('Remove', 'b-testimonials-block')} onClick={removeItem}><Dashicon icon='no' />{__('Remove', 'b-testimonials-block')}</Button>}

                                <Button className='duplicateItem' label={__('Duplicate', 'b-testimonials-block')} onClick={duplicateItem}>{gearIcon}{__('Duplicate', 'b-testimonials-block')}</Button>
                            </PanelRow>
                        </>}

                        <div className='addItem'>
                            <Button label={__('Add New Card', 'b-testimonials-block')} onClick={addItem}><Dashicon icon='plus' size={23} />{__('Add New Card', 'b-testimonials-block')}</Button>
                        </div>
                    </PanelBody>

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