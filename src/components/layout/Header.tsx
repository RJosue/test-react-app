import { NavLink, Link } from 'react-router-dom';
import classes from './Header.module.css';
const Header = () => {
	return (
		<header className={classes.header}>
			<div className={classes.logo}><Link className="no-decoration" to='/'>Test App</Link></div>
			<nav className={classes.nav}>
				<ul>
					<li>
						<NavLink activeClassName={classes.active} to='/task'>Task</NavLink>
					</li>
					<li>
						<NavLink activeClassName={classes.active} to='/contacts'>Contacts</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
