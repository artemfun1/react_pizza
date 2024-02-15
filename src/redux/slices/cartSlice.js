import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

const createSliceWithThunks = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
	items: [],
	totalPrice: 0,
};

export const cartSlice = createSliceWithThunks({
	name: "cart",
	initialState,
	selectors: {
		selectCartItems: state => state,
	},
	reducers: create => ({
		putItemInCart: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: "",
				rejected: "",
				fulfilled: (state, action) => {
					const findItem = state.items.find(
						obj => obj.id === action.payload.id
					);
					if (findItem) {
						if (action.payload.plus === 1) {
							findItem.count++;
						} else if (action.payload.minus === 1) {
							findItem.count--;
							if (findItem.count === 0) {
								state.items = state.items.filter(
									obj => obj.id !== action.payload.id
								);
							}
						} else {
							findItem.count++;
						}
					} else {
						state.items.push({ ...action.payload, count: 1 });
					}

					state.totalPrice = state.items.reduce(
						(acc, item) => item.price * item.count + acc,
						0
					);
				},
				settled: "",
			}
		),
		removeItemInCart: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: "",
				rejected: "",
				fulfilled: (state, action) => {
					state.items = state.items.filter(obj => obj.id !== action.payload);
					state.totalPrice = state.items.reduce(
						(acc, item) => item.price * item.count + acc,
						0
					);
				},
				settled: "",
			}
		),
		clearItemInCart: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: "",
				rejected: "",
				fulfilled: state => {
					state.items = [];
					state.totalPrice = 0;
				},
				settled: "",
			}
		),
	}),
});

export const { putItemInCart, removeItemInCart, clearItemInCart } =
	cartSlice.actions;

export const { selectCartItems } = cartSlice.selectors;

export default cartSlice.reducer;
