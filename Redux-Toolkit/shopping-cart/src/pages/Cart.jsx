import { useDispatch, useSelector } from "react-redux";
// import { getCart } from "../features/cartSlice";
import { remove } from "../features/cartSlice";
import { selectAll } from "../features/cartSlice";

const Cart = () => {
	const dispatch = useDispatch();
	// const cart = useSelector(getCart);
	const cart = useSelector(selectAll);

	const handleRemove = (itemId) => {
		dispatch(remove(itemId));
	};

	return (
		<div>
			<h3>Cart</h3>
			<div className="cartWrapper">
				{/* {cart.cartItems.map((item) => ( */}
				{cart.map((item) => (
					<div className="cartCard" key={item.id}>
						<img src={item.image} alt={item.title} />
						<h5>{item.title}</h5>
						<h5>{item.price}</h5>
						<button className="btn" onClick={() => handleRemove(item.id)}>
							Remove
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
export default Cart;
