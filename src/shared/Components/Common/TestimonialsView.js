import { useState } from 'react';

import Style from './Style';
import Layout from './Layout/Layout';
import ExpandButton from './ExpandButton';

/**
 * Read-only rendering of a testimonials block, shared by the front end
 * (view.js) and the editor's CPT-source preview.
 */
const TestimonialsView = ( { attributes, clientId } ) => {
	const cId = clientId ?? attributes.cId;
	const { items = [], elements, textLength } = attributes;
	const { expandBtn } = elements;

	const itemsEls = items.map( ( item ) => {
		const { name, deg, reviewText } = item;

		const ReviewText = () => {
			const [ expanded, setExpanded ] = useState( false );

			const contentLength = ( reviewText || '' ).length;
			const showText = expanded ? reviewText : ( reviewText || '' ).slice( 0, textLength );
			const text = expandBtn ? showText : reviewText;

			return (
				( elements?.reviewText && reviewText ) && (
					<>
						<p className="reviewText" dangerouslySetInnerHTML={ { __html: text } } />

						{ contentLength > textLength && (
							<ExpandButton attributes={ attributes } reviewText={ reviewText } expanded={ expanded } onChange={ () => setExpanded( ! expanded ) } />
						) }
					</>
				)
			);
		};

		return {
			img: <></>,
			name: ( elements?.name && name ) && <h3 className="name" dangerouslySetInnerHTML={ { __html: name } } />,
			deg: ( elements?.deg && deg ) && <h5 className="deg" dangerouslySetInnerHTML={ { __html: deg } } />,
			reviewText: <ReviewText />,
		};
	} );

	return (
		<>
			<Style attributes={ attributes } clientId={ cId } />

			<div className="btbTestimonialsDir">
				<Layout attributes={ attributes } itemsEls={ itemsEls } />
			</div>
		</>
	);
};

export default TestimonialsView;
