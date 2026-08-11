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
import { clickable } from '../../utils/a11y';

const mapCptPost = (post) => ({
	img: { url: post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '' },
	name: post?.title?.rendered || '',
	deg: post?.meta?.bpbtb_designation || '',
	reviewText: post?.content?.rendered || '',
	rating: Number(post?.meta?.bpbtb_rating) || 5,
});
import useIframeAssetSync from '../../../../../bpl-tools/hooks/useIframeAssetSync.js';

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

	useIframeAssetSync(['bptmb-b-testimonials-editor-style-css', 'bptmb-b-testimonials-editor-script-js']);

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

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId, setAttributes]); // Set & Update clientId to cId

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

	const blockProps = useBlockProps({ className: 'bTestimonials' + (isMainParentBlock ? ' bTestimonialsMainBlock' : '') });

	// Main Parent Block Rendering Logic
	if (isMainParentBlock) {
		const isClassicExplicit = attributes.useClassicEditor === true || attributes.isLegacyBlock === true;
		const isClassicExplicitOff = attributes.useClassicEditor === false;

		const isFreshDefaultItem =
			Array.isArray(attributes?.items) &&
			attributes.items.length === 1 &&
			attributes.items[0]?.name === 'John Doe' &&
			attributes.items[0]?.deg === 'Developer' &&
			attributes.items[0]?.reviewText === 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout';

		const isFreshNewBlock =
			isFreshDefaultItem &&
			(attributes.theme === 'default' || !attributes.theme) &&
			(attributes.layout === 'default' || !attributes.layout) &&
			(attributes.dataSource === 'manual' || !attributes.dataSource);

		// If NOT explicitly classic mode:
		if (!isClassicExplicit) {
			// 1. If child blocks are present, render child blocks container
			if (innerBlocks && innerBlocks.length > 0) {
				return (
					<div {...blockProps}>
						<Settings attributes={attributes} setAttributes={setAttributes} updateItem={() => { }} activeIndex={activeIndex} setActiveIndex={setActiveIndex} clientId={clientId} currentBlockName={name} />
						<Style attributes={attributes} clientId={clientId} />
						<InnerBlocks
							templateLock={false}
							allowedBlocks={ALLOWED_CHILD_BLOCKS}
						/>
					</div>
				);
			}

			// 2. If no child blocks: show BlockPlaceholder if explicitly turned off classic OR if it is a fresh new block
			if (isClassicExplicitOff || isFreshNewBlock) {
				return (
					<div {...blockProps}>
						<Settings attributes={attributes} setAttributes={setAttributes} updateItem={() => { }} activeIndex={activeIndex} setActiveIndex={setActiveIndex} clientId={clientId} currentBlockName={name} />
						<BlockPlaceholder clientId={clientId} currentBlockName={name} setAttributes={setAttributes} />
						<InnerBlocks
							templateLock={false}
							allowedBlocks={ALLOWED_CHILD_BLOCKS}
							renderAppender={() => false}
						/>
					</div>
				);
			}
		}
		// Otherwise (isClassicExplicit is true OR existing saved block without classic off), fall through to Classic Single Block rendering below
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

		return {
			img: <div className="upload">
				<MediaUploadCheck >
					<MediaUpload allowedTypes={['image']} value={img} onSelect={({ id, url, alt, title }) => updateItem('img', { id, url, alt, title })} render={({ open }) => <ToolbarButton label="upload" icon={upload} onClick={open} />} />
				</MediaUploadCheck>
			</div>,

			name: elements?.name && <RichText tagName="h3" className='name' value={name || ''} onChange={(val) => updateItem("name", val)} placeholder={__('Enter your name', 'b-testimonials-block')} inlineToolbar />,

			deg: elements?.deg && <RichText tagName="h5" className='deg' value={deg || ''} onChange={(val) => updateItem("deg", val)} placeholder={__('Enter your designation', 'b-testimonials-block')} inlineToolbar />,

			reviewText: <ReviewText attributes={attributes} elements={elements} textLength={textLength} reviewText={reviewText || ''} updateItem={updateItem} />
		};
	});

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} updateItem={updateItem} activeIndex={activeIndex} setActiveIndex={setActiveIndex} clientId={clientId} currentBlockName={name} />

		<div {...blockProps} id={`btbTestimonialsDir-${clientId}`}>
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


const ReviewText = ({ attributes, elements, textLength, reviewText, updateItem }) => {
	const [expanded, setExpanded] = useState(false);

	// These three lines must stay identical to ViewReviewText in
	// Common/TestimonialsView.js -- that is what the front end renders, and any
	// difference here shows up as an editor preview that does not match the
	// published post. Measure the raw string, exactly as the front end does.
	const text = reviewText || '';
	const isCollapsible = !!elements?.expandBtn && text.length > textLength;
	const collapsed = isCollapsible && !expanded;

	// While collapsed the excerpt is a plain paragraph rather than a RichText:
	// this RichText *is* the editable source, so slicing its value would save the
	// shortened text back over the author's content. Swapping the element keeps
	// the stored text intact while showing the real front end cut. Clicking the
	// excerpt expands it, so editing is one click away.
	if (!elements?.reviewText) { return null; }

	return <>
		{collapsed
			? <p
				className="reviewText btbTextCollapsed"
				{...clickable(() => setExpanded(true), __('Expand the review text to edit it', 'b-testimonials-block'))}
				dangerouslySetInnerHTML={{ __html: text.slice(0, textLength) }}
			/>
			: <RichText tagName="p" className="reviewText" value={reviewText} onChange={(val) => updateItem("reviewText", val)} placeholder={__('Enter your review', 'b-testimonials-block')} inlineToolbar />}

		{isCollapsible && <ExpandButton attributes={attributes} expanded={expanded} onChange={() => setExpanded(!expanded)} />}
	</>
}
