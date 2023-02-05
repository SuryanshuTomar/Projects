import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const initialState = {
	cartItems: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		add: (state, action) => {
			state.cartItems.push(action.payload);
		},
		remove: (state, action) => {
			state.cartItems = state.cartItems.filter(
				(item) => item.id !== action.payload
			);
		},
	},
});

// Cart Using Entitty Adapter -
// const cartAdapter = createEntityAdapter({});

// const initialState = cartAdapter.getInitialState();

// const cartSlice = createSlice({
// 	name: "cart",
// 	initialState,
// 	reducers: {
// 		add: cartAdapter.addOne,
// 		remove: cartAdapter.removeOne,
// 	},
// });

// export reducer
export default cartSlice.reducer;

// export action creators
export const { add, remove } = cartSlice.actions;

// export selectors
export const getCart = (state) => state.cart;
// export const { selectAll, selectById, selectTotal } = cartAdapter.getSelectors(
// 	(state) => state.cart
// );
