import {
	PayloadAction,
	asyncThunkCreator,
	buildCreateSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const createSliceWithThunks = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
});

export interface IPizzaItem {
	id: number;
	imageUrl: string;
	title: string;
	types: number[];
	sizes: number[];
	price: number;
	category: number;
	rating: number;
	mocId: number;
	count: number;
}

interface IPizzaState {
	items: IPizzaItem[];
	meta: { total_pages: number };
	isSuccess: boolean;
}

const initialState: IPizzaState = {
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
			async (action: string) => {
				const res = await axios.get(action);

				return res.data;
			},
			{
				pending: state => {
					state.isSuccess = false;
					state.items = [];
				},
				rejected: state => {
					state.items = [];
				},
				fulfilled: (state, action: PayloadAction<any>) => {
					console.log();
					state.items = [...action.payload.items];
					state.isSuccess = true;
					// _thunkApi
				},
				settled: () => {},
			}
		),
	}),
});

export const { setPizzas } = pizzaSlice.actions;

export const { selectPizzas } = pizzaSlice.selectors;

export default pizzaSlice.reducer;
