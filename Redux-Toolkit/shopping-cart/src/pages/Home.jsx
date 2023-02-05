import Products from "../components/Products";

const Home = () => {
	return (
		<div>
			<h2 className="heading">Welcome to the RTK Shopping Cart</h2>
			<section>
				<h3>Products</h3>
				<Products />
			</section>
		</div>
	);
};
export default Home;
