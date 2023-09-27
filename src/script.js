
import { render } from 'react-dom';

import './style.scss';
import Style from './Style';
import Layout from './Layout';

//b testimonials Directory
document.addEventListener('DOMContentLoaded', () => {

	const allBlockDirectory = document.querySelectorAll('.wp-block-btb-b-testimonials');
	allBlockDirectory.forEach(directory => {
		const attributes = JSON.parse(directory.dataset.attributes);

		render(<>
			<Style attributes={attributes} clientId={attributes.cId} />

			<Directory attributes={attributes} />
		</>, directory);

		directory?.removeAttribute('data-attributes');
	});
});

const Directory = ({ attributes }) => {

	return <div className="btbTestimonialsDir">
		<Layout attributes={attributes} isBackend={false} />
	</div>
}