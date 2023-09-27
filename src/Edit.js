import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import produce from 'immer';

// Settings Components

import { tabController } from '../../Components/utils/functions';

import Settings from './Settings';
import Style from './Style';
import Layout from './Layout';
import { ToolbarButton } from '@wordpress/components';

const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected } = props;
	const { items } = attributes;

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

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} updateItem={updateItem} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

		<div className={className} id={`btbTestimonialsDir-${clientId}`}>
			<Style attributes={attributes} clientId={clientId} />

			<div className="btbTestimonialsDir">
				<Layout ToolbarButton={ToolbarButton} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} isBackend={true} attributes={attributes} activeIndex={activeIndex} setActiveIndex={setActiveIndex} updateItem={updateItem} __={__} RichText={RichText} />
			</div>
		</div>
	</>;
};
export default Edit;