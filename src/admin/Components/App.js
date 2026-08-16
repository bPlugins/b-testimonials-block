import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

import Welcome from '../../../../bpl-tools/Admin/Welcome';
import Demos from '../../../../bpl-tools/Admin/Demos';
import OurPlugins from '../../../../bpl-tools/Admin/OurPlugins';
import Settings from '../../../../bpl-tools/Admin/Settings';

import Layout from './Layout';
import { demoInfo, welcomeInfo } from '../utils/data';

const App = (props) => {
	const { adminUrl, demoBase } = props;

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout {...props} />}>
					<Route index element={<Welcome {...props} {...welcomeInfo(adminUrl)} />} />
					<Route path="welcome" element={<Welcome {...props} {...welcomeInfo(adminUrl)} />} />
					{/* The previews are served by this install, so the demo
					    cards need the site's own address. */}
					<Route path="demos" element={<Demos {...props} demoInfo={demoInfo(demoBase)} />} />
					{/* Reached from the Header's top-right button, which links to
					    `#our-plugins`. Intentionally not in Layout's nav. */}
					<Route path="our-plugins" element={<OurPlugins {...props} />} />
					{/* Same shared page the other free blocks route to, so the
					    uninstall toggle behaves identically across plugins. The
					    action name matches the wp_ajax_ hook in admin-menu.php. */}
					<Route
						path="settings"
						element={
							<Settings
								{...props}
								ajaxAction="bpbtbSaveUninstallOption"
								cleanupItems={[
									__('All testimonials, including pending submissions', 'b-testimonials-block'),
									__('Submitted photos attached to those testimonials', 'b-testimonials-block'),
									__('Feedback & NPS Poll responses and category settings', 'b-testimonials-block'),
								]}
							/>
						}
					/>
					<Route path="*" element={<Navigate to="/welcome" replace />} />
				</Route>
			</Routes>
		</Router>
	);
};

export default App;
