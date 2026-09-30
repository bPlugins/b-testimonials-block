import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from '../../../../bpl-tools/Admin/Header';

const navigation = [
	{ name: 'Welcome', href: '/welcome' },
	{ name: 'All Blocks', href: '/all-blocks' },
	{ name: 'Demos', href: '/demos' },
	{ name: 'Settings', href: '/settings' },
];

const Layout = (props) => {
	const { isPremium, hasPro } = props;
	const location = useLocation();

	return (
		<div className="bPlDashboard">
			{/* isPremium is what bpl-tools' Header keys the "Our Plugins" presentation
			    off: true renders it as <Button>, which the header stylesheet gives the
			    gradient to, and false renders a bare <a className="linkButton">. The
			    Submissions and Poll pages print `bPlButton variant-primary` by hand in
			    BPBTB_Admin_Menu::render_header(), so they had the button and this page
			    had the plain link -- one header in two visual languages.

			    Forced here rather than restyling .linkButton in our own stylesheet:
			    that would mean copying the gradient and re-drawing the plug icon as a
			    CSS mask, and the two headers would drift apart again the next time the
			    button design changes. This way both render the same component.

			    It only reaches Header. The real isPremium is still what filters the nav
			    above and what data.js reads for the " Pro" name suffix. The one other
			    thing it changes inside Header is dropping the "Upgrade Pro" button,
			    which dashboard.scss already hides. */}
			<Header {...props} isPremium={true}>
				<nav className="bPlDashboardNav">
					{navigation
						?.filter((item) => item.href !== '/activation' || hasPro)
						?.filter((item) => !isPremium || !['/purchase', '/pricing', '/feature-comparison'].includes(item.href))
						?.map((item, index) => (
							<Link
								key={index}
								to={item.href}
								className={`navLink ${location.pathname === item.href ? 'active' : ''}`}
							>
								{item.name}
							</Link>
						))}
				</nav>
			</Header>

			<main className="bPlDashboardMain">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
