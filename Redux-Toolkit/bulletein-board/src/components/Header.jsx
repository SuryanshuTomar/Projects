import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCount, increaseCount } from "../features/posts/postsSlice";

const Header = () => {
	const dispatch = useDispatch();
	const count = useSelector(getCount);
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

				<button onClick={() => dispatch(increaseCount())}>Count: {count}</button>
			</nav>
		</header>
	);
};

export default Header;
