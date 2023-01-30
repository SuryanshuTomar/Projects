import useCart from "../hooks/useCart";

type PropsType = {
	viewCart: boolean;
};

function Footer({ viewCart }: PropsType) {
	const { totalItems, totalPrice } = useCart();

	const year = new Date().getFullYear();

	const pageContent = viewCart ? (
		<p>Shopping Cart &copy; {year}</p>
	) : (
		<>
			<p>Total Items: {totalItems}</p>
			<p>Total Items: {totalPrice}</p>
			<p>Shopping Cart &copy; {year}</p>
		</>
	);

	const content = <footer className="footer">{pageContent}</footer>;

	return content;
}

export default Footer;
