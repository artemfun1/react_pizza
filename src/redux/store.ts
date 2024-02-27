import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import filterReducer from "./slices/filterSlice";
import pizzaReducer from "./slices/pizzaSlice";

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		pizza: pizzaReducer,
		cart: cartReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
