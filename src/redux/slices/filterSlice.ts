import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { sortList } from "../../components/Sort";

const createSliceWithThunks = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
	categoryId: 0,
	currentPage: 1,
	searchValue: "",
	sort: {
		name: "популярности",
		sortProperty: "rating",
	},
};

export const filterSlice = createSliceWithThunks({
	name: "filter",
	initialState,
	selectors: {
		selectCategoryId: state => state.categoryId,
		selectSortType: state => state.sort,
		selectCurrentPage: state => state.currentPage,
		selectSearchValue: state => state.searchValue,
		selectFilterState: state => state,
	},
	reducers: create => ({
		setCategoryId: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: () => {},
				rejected: () => {},
				fulfilled: (state, action) => {
					state.categoryId = action.payload;
				},
				settled: () => {},
			}
		),
		setSortType: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: () => {},
				rejected: () => {},
				fulfilled: (state, action) => {
					state.sort = action.payload;
				},
				settled: () => {},
			}
		),
		setCurrentPage: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: () => {},
				rejected: () => {},
				fulfilled: (state, action) => {
					state.currentPage = action.payload;
				},
				settled: () => {},
			}
		),
		setSearchValue: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: () => {},
				rejected: () => {},
				fulfilled: (state, action) => {
					state.searchValue = action.payload;
				},
				settled: () => {},
			}
		),
		setFiltersUserLink: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: () => {},
				rejected: () => {},
				fulfilled: (state, action) => {
					state.sort.name = sortList.find(
						item => item.sortProperty === action.payload.sortProperty
					)!.name;
					state.sort.sortProperty = action.payload.sortProperty;
					state.categoryId = +action.payload.categoryId;
					state.currentPage = +action.payload.currentPage;
				},
				settled: () => {},
			}
		),
	}),
});

export const {
	setCategoryId,
	setSortType,
	setCurrentPage,
	setSearchValue,
	setFiltersUserLink,
} = filterSlice.actions;

export const {
	selectCategoryId,
	selectSortType,
	selectCurrentPage,
	selectSearchValue,
	selectFilterState,
} = filterSlice.selectors;

export default filterSlice.reducer;
