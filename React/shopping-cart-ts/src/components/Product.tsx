import { memo, ReactElement } from "react";
import { ReducerAction, ReducerActionType } from "../context/CartProvider";
import { ProductType } from "../context/ProductsProvider";

type PropTypes = {
	product: ProductType;
	dispatch: React.Dispatch<ReducerAction>;
	REDUCER_ACTIONS: ReducerActionType;
	inCart: boolean;
};

function Product({
	product,
	dispatch,
	REDUCER_ACTIONS,
	inCart,
}: PropTypes): ReactElement {
	const img: string = new URL(`../assets/${product.sku}.jpg`, import.meta.url)
		.href;
	// console.log(img);

	const onAddToCart = () =>
		dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });

	const itemInCart = inCart ? " -> Item in Cart: ✅" : null;

	const content = (
		<article className="product">
			<h3>{product.name}</h3>
			<img src={img} alt={product.name} className="product_img" />
			<p>
				{new Intl.NumberFormat("en-IN", {
					style: "currency",
					currency: "INR",
				}).format(product.price)}
				{itemInCart}
			</p>
			<button onClick={onAddToCart}>Add To Cart</button>
		</article>
	);

	return content;
}

// To check whether the product and inCart passed in our components as prop are equal
// to the product and inCart of the previous re-render or not
// And if they are equal then the current component won't re-render
// else it will re-render
function areProductsEqual(
	{ product: prevProduct, inCart: prevInCart }: PropTypes,
	{ product: nextProduct, inCart: nextInCart }: PropTypes
) {
	return Object.keys(prevProduct).every((key) => {
		return (
			prevProduct[key as keyof ProductType] ===
				nextProduct[key as keyof ProductType] && prevInCart === nextInCart
		);
	});
}

// Optimization
const MemoizedProduct = memo(Product, areProductsEqual);

export default MemoizedProduct;
