import { NavLink } from "react-router-dom";

const Header = () => {
	return (
		<header className="Header">
			<h1>Redux Blog</h1>
			<nav>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="post">Add a Post</NavLink>
					</li>
					<li>
						<NavLink to="user">Users</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
