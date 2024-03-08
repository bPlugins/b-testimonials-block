
import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import produce from 'immer';

// Settings Components
import { tabController } from '../../Components/utils/functions';
import ExpandButton from './Components/ExpandButton';

import Settings from './Settings';
import Style from './Style';
import Layout from './Layout';
import { upload } from './utils/icons';
import { htmlTagsStrip } from './utils/functions';

const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected } = props;
	const { items, elements, textLength } = attributes;

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	useEffect(() => tabController(), [isSelected]);
	const [activeIndex, setActiveIndex] = useState(0);

	const updateItem = (type, val, childType = false) => {
		const newItems = produce(items, draft => {
			if (childType) {
				draft[activeIndex][type][childType] = val;
			} else {
				draft[activeIndex][type] = val;
			}
		});
		setAttributes({ items: newItems });
	}

	const itemsEls = items.map((item) => {
		const { name, deg, img, reviewText } = item;
		const contentLength = htmlTagsStrip(reviewText).length;

		return {
			img: <div className="upload">
				<MediaUploadCheck >
					<MediaUpload allowedTypes={['image']} value={img} onSelect={({ id, url, alt, title }) => updateItem('img', { id, url, alt, title })} render={({ open }) => <ToolbarButton label="upload" icon={upload} onClick={open} />} />
				</MediaUploadCheck>
			</div>,

			name: elements?.name && <RichText tagName="h3" className='name' value={name} onChange={(val) => updateItem("name", val)} placeholder={__('Enter your name', 'b-testimonials-block')} inlineToolbar />,

			deg: elements?.deg && <RichText tagName="h5" className='deg' value={deg} onChange={(val) => updateItem("deg", val)} placeholder={__('Enter your designation', 'b-testimonials-block')} inlineToolbar />,

			reviewText: <ReviewText attributes={attributes} elements={elements} contentLength={contentLength} textLength={textLength} reviewText={reviewText} updateItem={updateItem} />
		}
	});

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} updateItem={updateItem} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

		<div className={className} id={`btbTestimonialsDir-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />

			<div className="btbTestimonialsDir">
				<Layout itemsEls={itemsEls} ToolbarButton={ToolbarButton} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} isBackend={true} attributes={attributes} activeIndex={activeIndex} setActiveIndex={setActiveIndex} updateItem={updateItem} __={__} RichText={RichText} />
			</div>
		</div>
	</>;
};
export default Edit;


const ReviewText = ({ attributes, elements, contentLength, textLength, reviewText, updateItem }) => {
	const [expanded, setExpanded] = useState(false);

	return <>
		{elements?.reviewText && <RichText tagName="p" className='reviewText' value={reviewText} onChange={(val) => updateItem("reviewText", val)} placeholder={__('Enter your review', 'b-testimonials-block')} inlineToolbar />}

		{contentLength > textLength && <ExpandButton attributes={attributes} reviewText={reviewText} expanded={expanded} onChange={() => setExpanded(!expanded)} />}
	</>
}