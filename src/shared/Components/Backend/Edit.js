import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText, MediaUpload, MediaUploadCheck, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { produce } from 'immer';

// Settings Components
import { tabController } from '../../../../../bpl-tools/utils/functions';
import ExpandButton from '../Common/ExpandButton';
import BlockPlaceholder from '../Common/BlockPlaceholder';
import { ALLOWED_CHILD_BLOCKS } from '../Common/BlockSwitcherModal';

import '../../styles/editor.scss';
import Settings from './Settings/Settings';
import Style from '../Common/Style';
import Layout from '../Common/Layout/Layout';
import TestimonialsView from '../Common/TestimonialsView';
import { upload } from '../../utils/icons';
import { htmlTagsStrip } from '../../utils/functions';

const mapCptPost = ( post ) => ( {
	img: { url: post?._embedded?.[ 'wp:featuredmedia' ]?.[ 0 ]?.source_url || '' },
	name: post?.title?.rendered || '',
	deg: post?.meta?.bpbtb_designation || '',
	reviewText: post?.content?.rendered || '',
	rating: Number( post?.meta?.bpbtb_rating ) || 5,
} );

const Edit = props => {
	const { attributes = {}, setAttributes, clientId, isSelected, name } = props;
	const {
		items: rawItems = [],
		elements: rawElements = {},
		textLength = 120,
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

	const DEFAULT_TESTIMONIAL = {
		img: { url: 'https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png' },
		name: 'John Doe',
		deg: 'Developer',
		reviewText: 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout',
		rating: 5,
	};

	const items = (Array.isArray(rawItems) && rawItems.length > 0) ? rawItems : [DEFAULT_TESTIMONIAL];
	const isCpt = 'cpt' === dataSource;

	// Check if current block is the Main Container Block (bptmb/b-testimonials)
	const isMainParentBlock = name === 'bptmb/b-testimonials';
	const innerBlocks = useSelect(
		(select) => (clientId ? select('core/block-editor').getBlock(clientId)?.innerBlocks : []),
		[clientId]
	);

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	useEffect(() => tabController(), [isSelected]);
	const [activeIndex, setActiveIndex] = useState(0);

	// Fetch testimonials from the CPT for the editor preview when that source is active.
	const [cptItems, setCptItems] = useState([]);
	const [cptLoading, setCptLoading] = useState(false);
	useEffect(() => {
		if (!isCpt) { return; }

		let active = true;
		setCptLoading(true);
		apiFetch({
			path: addQueryArgs('/wp/v2/testimonial', {
				per_page: query?.number || 6,
				orderby: query?.orderBy || 'date',
				order: query?.order || 'desc',
				_embed: true,
			}),
		})
			.then(posts => { if (active) { setCptItems(posts.map(mapCptPost)); } })
			.catch(() => { if (active) { setCptItems([]); } })
			.finally(() => { if (active) { setCptLoading(false); } });

		return () => { active = false; };
	}, [isCpt, query?.number, query?.orderBy, query?.order]);

	// Main Parent Block Rendering with InnerBlocks
	if (isMainParentBlock) {
		if (!innerBlocks?.length) {
			return (
				<div {...useBlockProps({ className: 'bTestimonialsMainBlock' })}>
					<Settings attributes={attributes} setAttributes={setAttributes} updateItem={() => {}} activeIndex={activeIndex} setActiveIndex={setActiveIndex} clientId={clientId} currentBlockName={name} />
					<BlockPlaceholder clientId={clientId} currentBlockName={name} />
					<InnerBlocks
						templateLock={false}
						allowedBlocks={ALLOWED_CHILD_BLOCKS}
						renderAppender={() => false}
					/>
				</div>
			);
		}

		return (
			<div {...useBlockProps({ className: 'bTestimonialsMainBlock' })}>
				<Settings attributes={attributes} setAttributes={setAttributes} updateItem={() => {}} activeIndex={activeIndex} setActiveIndex={setActiveIndex} clientId={clientId} currentBlockName={name} />
				<InnerBlocks
					templateLock={false}
					allowedBlocks={ALLOWED_CHILD_BLOCKS}
				/>
			</div>
		);
	}

	const updateItem = (type, val, childType = false) => {
		const newItems = produce(items, draft => {
			if (!draft || !draft[activeIndex]) return;
			if (childType) {
				if (!draft[activeIndex][type]) draft[activeIndex][type] = {};
				draft[activeIndex][type][childType] = val;
			} else {
				draft[activeIndex][type] = val;
			}
		});
		setAttributes({ items: newItems });
	};

	const itemsEls = items.map((item) => {
		if (!item) return { img: null, name: null, deg: null, reviewText: null };
		const { name = '', deg = '', img = {}, reviewText = '' } = item;
		const contentLength = htmlTagsStrip(reviewText || '').length;

		return {
			img: <div className="upload">
				<MediaUploadCheck >
					<MediaUpload allowedTypes={['image']} value={img} onSelect={({ id, url, alt, title }) => updateItem('img', { id, url, alt, title })} render={({ open }) => <ToolbarButton label="upload" icon={upload} onClick={open} />} />
				</MediaUploadCheck>
			</div>,

			name: elements?.name && <RichText tagName="h3" className='name' value={name || ''} onChange={(val) => updateItem("name", val)} placeholder={__('Enter your name', 'b-testimonials-block')} inlineToolbar />,

			deg: elements?.deg && <RichText tagName="h5" className='deg' value={deg || ''} onChange={(val) => updateItem("deg", val)} placeholder={__('Enter your designation', 'b-testimonials-block')} inlineToolbar />,

			reviewText: <ReviewText attributes={attributes} elements={elements} contentLength={contentLength} textLength={textLength} reviewText={reviewText || ''} updateItem={updateItem} />
		};
	});

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} updateItem={updateItem} activeIndex={activeIndex} setActiveIndex={setActiveIndex} clientId={clientId} currentBlockName={name} />

		<div {...useBlockProps({ className: 'bTestimonials' })} id={`btbTestimonialsDir-${clientId}`}>
			{isCpt ? (
				cptItems.length
					? <TestimonialsView attributes={{ ...attributes, items: cptItems }} clientId={clientId} />
					: <p className="btbCptNotice">{cptLoading
						? __('Loading testimonials…', 'b-testimonials-block')
						: __('No testimonials found. Add some under the Testimonials menu, or switch Content Source to Manual.', 'b-testimonials-block')}</p>
			) : <>
				<Style attributes={attributes} clientId={clientId} />

				<div className="btbTestimonialsDir">
					<Layout itemsEls={itemsEls} ToolbarButton={ToolbarButton} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} isBackend={true} attributes={attributes} activeIndex={activeIndex} setActiveIndex={setActiveIndex} updateItem={updateItem} __={__} RichText={RichText} />
				</div>
			</>}
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
