import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCart } from "../features/cartSlice.js";
// import { selectTotal } from "../features/cartSlice.js";

const Navbar = () => {
	// const cart = useSelector(selectAll);
	const cart = useSelector(getCart);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<span className="logo">
				<h2>RTK Shopping Store</h2>
			</span>
			<div>
				<NavLink className="navLink" to="/">
					Home
				</NavLink>
				<NavLink className="navLink" to="/cart">
					Cart
				</NavLink>
				<span className="cartCount">
					Cart items : {cart.cartItems.length ?? 0}
					{/* Cart items : {total} */}
				</span>
			</div>
		</div>
	);
};

export default Navbar;
