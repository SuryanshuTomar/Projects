import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<div>
			<span className="logo">RTK Shopping Store</span>
			<div>
				<NavLink className="navLink" to="/">
					Home
				</NavLink>
				<NavLink className="navLink" to="/cart">
					Cart
				</NavLink>
				<span className="cartCount">Cart items : 0</span>
			</div>
		</div>
	);
};

export default Navbar;
