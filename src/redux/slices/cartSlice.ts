import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { IPizzaItem } from "./pizzaSlice";
import { getCartItemFromLocalStorage, getPrice } from '../../utils/getCartItemFromLocalStorage'

const createSliceWithThunks = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
});

interface ICartItem {
	items: IPizzaItem[];
	totalPrice: number;
}

const initialState: ICartItem = {
	items: getCartItemFromLocalStorage(),
	totalPrice: getPrice() ,
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
				pending: () => {},
				rejected: () => {},
				fulfilled: (state: ICartItem, action) => {
					console.log(action.payload);
					const findItem = state.items.find(
						obj => obj.id === action.payload.id
					);
					if (findItem) {
						findItem.count++;
					} else {
						state.items.push({ ...action.payload, count: 1 });
					}

					state.totalPrice = state.items.reduce(
						(acc, item) => item.price * item.count + acc,
						0
					);
				},
				settled: () => {},
			}
		),
		countMinusItemInCart: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: () => {},
				rejected: () => {},
				fulfilled: (state: ICartItem, action) => {
					const findItem = state.items.find(obj => obj.id === action.payload);
					if (findItem) {
						findItem.count--;

						if (findItem.count === 0) {
							state.items = state.items.filter(
								obj => obj.id !== action.payload
							);
						}
					}

					state.totalPrice = state.items.reduce(
						(acc, item) => item.price * item.count + acc,
						0
					);
				},
				settled: () => {},
			}
		),
		countPlusItemInCart: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: () => {},
				rejected: () => {},
				fulfilled: (state, action) => {
					const findItem = state.items.find(obj => obj.id === action.payload);
					if (findItem) {
						findItem.count++;
					}

					state.totalPrice = state.items.reduce(
						(acc, item) => item.price * item.count + acc,
						0
					);
				},
				settled: () => {},
			}
		),
		removeItemInCart: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: () => {},
				rejected: () => {},
				fulfilled: (state, action) => {
					state.items = state.items.filter(obj => obj.id !== action.payload);
					state.totalPrice = state.items.reduce(
						(acc, item) => item.price * item.count + acc,
						0
					);
				},
				settled: () => {},
			}
		),
		clearItemInCart: create.asyncThunk(async () => {}, {
			pending: () => {},
			rejected: () => {},
			fulfilled: state => {
				state.items = [];
				state.totalPrice = 0;
			},
			settled: () => {},
		}),
	}),
});

export const {
	putItemInCart,
	removeItemInCart,
	clearItemInCart,
	countMinusItemInCart,
	countPlusItemInCart,
} = cartSlice.actions;

export const { selectCartItems } = cartSlice.selectors;

export default cartSlice.reducer;
