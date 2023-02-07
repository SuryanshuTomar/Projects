import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import productsReducer from "../features/productSlice";

const store = configureStore({
	reducer: {
		cart: cartReducer,
		products: productsReducer,
	},
});

export default store;
