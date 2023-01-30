type PropTypes = {
	viewCart: boolean;
	setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

function Navbar({ viewCart, setViewCart }: PropTypes) {
	const button = false ? (
		<button onClick={() => setViewCart(false)}>View Products</button>
	) : (
		<button onClick={() => setViewCart(true)}>View Cart</button>
	);

	const content = <nav className="nav">{button}</nav>;

	return content;
}

export default Navbar;
