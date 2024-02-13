import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import axios from "axios";

const createSliceWithThunks = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
	items: [],
	meta: { total_pages: 4 },
	isSuccess: false,
};

export const pizzaSlice = createSliceWithThunks({
	name: "pizza",
	initialState,
	selectors: {
		selectPizzas: state => state,
	},
	reducers: create => ({
		setPizzas: create.asyncThunk(
			async urlGetPizza => {
				console.log("получение пиц");

				const res = await axios.get(urlGetPizza);
				return res.data;
			},
			{
				pending: state => {
					state.isSuccess = false;
				},
				rejected: "",
				fulfilled: (state, action) => {
					state.items = [...action.payload.items];
					state.isSuccess = true;
				},
				settled: "",
			}
		),
	}),
});

export const { setPizzas } = pizzaSlice.actions;

export const { selectPizzas } = pizzaSlice.selectors;

export default pizzaSlice.reducer;
