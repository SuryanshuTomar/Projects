import useCart from "../hooks/useCart";
import Navbar from "./Navbar";

type PropTypes = {
	viewCart: boolean;
	setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

function Header({ viewCart, setViewCart }: PropTypes) {
	const { totalItems, totalPrice } = useCart();

	const content = (
		<header className="header">
			<div className="header__title-bar">
				<h1>Acme Co.</h1>
				<div className="header__price-box">
					<p>Total Items: {totalItems}</p>
					<p>Total Price: {totalPrice}</p>
				</div>
			</div>
			<Navbar viewCart={viewCart} setViewCart={setViewCart} />
		</header>
	);
	return content;
}

export default Header;
