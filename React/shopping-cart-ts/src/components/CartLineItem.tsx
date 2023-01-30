import { ChangeEvent, ReactElement, memo } from "react";
import { CartItemType, ReducerAction } from "../context/CartProvider";
import { ReducerActionType } from "../context/CartProvider";

type PropTypes = {
	item: CartItemType;
	dispatch: React.Dispatch<ReducerAction>;
	REDUCER_ACTIONS: ReducerActionType;
};

function CartLineItem({ item, dispatch, REDUCER_ACTIONS }: PropTypes) {
	const img: string = new URL(`../assets/${item.sku}.jpg`, import.meta.url)
		.href;
	// console.log(img);

	const lineTotal: number = item.qty * item.price;

	const highestQty: number = 20 > item.qty ? 20 : item.qty;

	// if highest number is 20 then it will create an array of size 20 from 1 to 20.
	const optionValues: number[] = [...Array(highestQty).keys()].map(
		(i) => i + 1
	);

	const options: ReactElement[] = optionValues.map((val) => (
		<option key={`opt${val}`} value={val}>
			{val}
		</option>
	));

	const onChangeQuantity = (event: ChangeEvent<HTMLSelectElement>) => {
		dispatch({
			type: REDUCER_ACTIONS.QUANTITY,
			payload: { ...item, qty: parseInt(event.target.value) },
		});
	};

	const onRemoveFromCart = () =>
		dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: item });

	const content = (
		<li className="cart__item">
			<img src={img} alt={item.name} className="cart__img" />
			<div aria-label="Item Name">{item.name}</div>
			<div aria-label="Price Per Item">
				{new Intl.NumberFormat("en-IN", {
					style: "currency",
					currency: "INR",
				}).format(item.price)}
			</div>

			<label htmlFor="itemQty" className="offscreen">
				Item Quantity
			</label>
			<select
				name="itemQty"
				id="itemQty"
				className="cart__select"
				aria-label="Item Quantity"
				value={item.qty}
				onChange={onChangeQuantity}
			>
				{options}
			</select>

			<div className="cart__item-subtotal" aria-label="Line Item Subtotal">
				{new Intl.NumberFormat("en-IN", {
					style: "currency",
					currency: "INR",
				}).format(lineTotal)}
			</div>

			<button
				className="cart__button"
				aria-label="Remove Item From Cart"
				title="Remove Item from Cart"
				onClick={onRemoveFromCart}
			>
				❌
			</button>
		</li>
	);

	return content;
}

// To check whether the item passed in our components as prop is equal
// to the item of the previous re-render or not
// And if it is equal then the current component won't re-render else it will re-render
function areItemsEqual(
	{ item: prevItem }: PropTypes,
	{ item: nextItem }: PropTypes
) {
	return Object.keys(prevItem).every((key) => {
		return (
			prevItem[key as keyof CartItemType] ===
			nextItem[key as keyof CartItemType]
		);
	});
}

// Optimization
const MemoizedCartLineItem = memo<typeof CartLineItem>(
	CartLineItem,
	areItemsEqual
);

export default MemoizedCartLineItem;
