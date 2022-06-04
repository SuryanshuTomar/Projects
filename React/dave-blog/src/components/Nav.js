import React from "react";
import { NavLink } from "react-router-dom";

function Nav({ search, setSearch }) {
	return (
		<nav className="Nav">
			<form onSubmit={(e) => e.preventDefault()} className="searchForm">
				<label htmlFor="search">Search Posts</label>
				<input
					type="text"
					id="search"
					placeholder="Search Posts"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="post">Post</NavLink>
					</li>
					<li>
						<NavLink to="about">About</NavLink>
					</li>
				</ul>
			</form>
		</nav>
	);
}

export default Nav;
