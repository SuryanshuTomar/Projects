import {
	Children,
	createContext,
	ReactElement,
	useMemo,
	useReducer,
} from "react";

export type CartItemType = {
	sku: string;
	name: string;
	price: number;
	qty: number;
};

type CartStateType = {
	cart: CartItemType[];
};

const initialCartState: CartStateType = { cart: [] };

const REDUCER_ACTION_TYPE = {
	ADD: "ADD",
	REMOVE: "REMOVE",
	QUANTITY: "QUANTITY",
	SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
	type: string;
	payload?: CartItemType;
};

const reducer = (
	state: CartStateType,
	action: ReducerAction
): CartStateType => {
	switch (action.type) {
		case REDUCER_ACTION_TYPE.ADD: {
			if (!action.payload)
				throw new Error("action.payload missing in ADD Action");

			// Destructring payload
			const { sku, name, price } = action.payload;

			// filtering the cart with items that are not updating
			const filteredCart: CartItemType[] = state.cart.filter(
				(item) => item.sku !== sku
			);

			// find the item from the cart if it exists in the cart
			const itemExits: CartItemType | undefined = state.cart.find(
				(item) => item.sku === sku
			);

			// update the qty of the item that exits
			const qty: number = itemExits ? itemExits.qty + 1 : 1;

			// returning the state with the updated cart item
			return {
				...state,
				cart: [...filteredCart, { sku, name, price, qty }],
			};
		}

		case REDUCER_ACTION_TYPE.REMOVE: {
			if (!action.payload)
				throw new Error("action.payload missing in REMOVE Action");

			// Destructring payload
			const { sku } = action.payload;

			// filtering the cart with items that are not updating
			const filteredCart: CartItemType[] = state.cart.filter(
				(item) => item.sku !== sku
			);

			// returing the updated state
			return { ...state, cart: [...filteredCart] };
		}

		case REDUCER_ACTION_TYPE.QUANTITY: {
			if (!action.payload)
				throw new Error("action.payload missing in QUANTITY Action");

			// Destructring payload
			const { sku, qty } = action.payload;

			// find the item from the cart if it exists in the cart
			const itemExits: CartItemType | undefined = state.cart.find(
				(item) => item.sku === sku
			);

			if (!itemExits) {
				throw new Error("Item must exist in order to update quantity");
			}

			// item with updated qty
			const updatedItem: CartItemType = { ...itemExits, qty };

			// filtering the cart with items that are not updating
			const filteredCart: CartItemType[] = state.cart.filter(
				(item) => item.sku !== sku
			);

			// returing the updated state
			return { ...state, cart: [...filteredCart, { ...updatedItem }] };
		}

		case REDUCER_ACTION_TYPE.SUBMIT: {
			return { ...state, cart: [] };
		}

		default:
			throw new Error("Unidentified Reducer Action Type");
	}
};

const useCartContext = (initialCartState: CartStateType) => {
	const [state, dispatch] = useReducer(reducer, initialCartState);

	const REDUCER_ACTIONS = useMemo(() => {
		return REDUCER_ACTION_TYPE;
	}, []);

	const totalItems: number = state.cart.reduce((previousValue, cartItem) => {
		return previousValue + cartItem.qty;
	}, 0);

	const totalPrice = new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
	}).format(
		state.cart.reduce((previousVal, cartItem) => {
			return previousVal + cartItem.qty * cartItem.price;
		}, 0)
	);

	const cart = state.cart.sort((a, b) => {
		const itemA = Number(a.sku.slice(-4));
		const itemB = Number(b.sku.slice(-4));
		return itemA - itemB;
	});

	return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initialCartContextState: UseCartContextType = {
	dispatch: () => {},
	REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
	totalItems: 0,
	totalPrice: "",
	cart: [],
};

export const CartContext = createContext<UseCartContextType>(
	initialCartContextState
);

type ChildrenType = {
	children?: ReactElement | ReactElement[];
};

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
	return (
		<CartContext.Provider value={useCartContext(initialCartState)}>
			{children}
		</CartContext.Provider>
	);
};

export default CartContext;
