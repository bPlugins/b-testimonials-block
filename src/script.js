
import { useState } from 'react';
import { render } from 'react-dom';

import './style.scss';
import Style from './Style';
import Layout from './Layout';
import ExpandButton from './Components/ExpandButton';

//b testimonials Directory
document.addEventListener('DOMContentLoaded', () => {

	const allBlockDirectory = document.querySelectorAll('.wp-block-bptmb-b-testimonials');
	allBlockDirectory.forEach(directory => {
		const attributes = JSON.parse(directory.dataset.attributes);

		render(<>
			<Style attributes={attributes} clientId={attributes.cId} />

			<TestimonialsDir attributes={attributes} />
		</>, directory);

		directory?.removeAttribute('data-attributes');
	});
});

const TestimonialsDir = ({ attributes }) => {
	const { items, elements, textLength } = attributes;
	const { expandBtn } = elements;

	const itemsEls = items.map((item) => {
		const { name, deg, reviewText } = item;

		const ReviewText = () => {
			const [expanded, setExpanded] = useState(false);

			const contentLength = reviewText.length;
			const showText = expanded ? reviewText : reviewText.slice(0, textLength);
			const text = expandBtn ? showText : reviewText;

			return (elements?.reviewText && reviewText) && <>
				<p className='reviewText' dangerouslySetInnerHTML={{ __html: text }} />

				{contentLength > textLength && <ExpandButton attributes={attributes} reviewText={reviewText} expanded={expanded} onChange={() => setExpanded(!expanded)} />}
			</>
		}

		return {
			img: <></>,
			name: (elements?.name && name) && <h3 className='name' dangerouslySetInnerHTML={{ __html: name }} />,
			deg: (elements?.deg && deg) && <h5 className='deg' dangerouslySetInnerHTML={{ __html: deg }} />,
			reviewText: <ReviewText />
		}
	})

	return <div className="btbTestimonialsDir">
		<Layout attributes={attributes} itemsEls={itemsEls} />
	</div>
}