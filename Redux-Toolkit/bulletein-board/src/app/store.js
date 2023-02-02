import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		users: usersReducer,
	},
	// mandatory to add apiSlice Middleware if you use one
	middleware: (getDefaultMiddleware) =>
		// this apiSlice middleware managers cache lifetimes and expirations
		getDefaultMiddleware().concat(apiSlice.middleware),
});
