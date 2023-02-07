// imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Creating Status Enum Mechanism
export const STATUS = Object.freeze({
	IDLE: "IDLE",
	LOADING: "LOADING",
	ERROR: "ERROR",
});

// initialSlice
const initialState = {
	data: [],
	status: STATUS.IDLE,
};

// Async Action Creator using createAsyncThunk for Products
export const fetchProducts = createAsyncThunk("fetchProducts", async (url) => {
	const res = await fetch(url);
	const data = await res.json();
	return data;
});

// create productSlice
const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProducts: (state, action) => {
			state.data = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state, action) => {
				state.status = STATUS.LOADING;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = STATUS.IDLE;
				state.data = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.status = STATUS.ERROR;
			});
	},
});

// export reducer
export default productSlice.reducer;

// export actions
export const { setProducts } = productSlice.actions;

// export selectors
export const getProducts = (state) => state.products;
