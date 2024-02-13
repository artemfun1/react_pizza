import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

const createSliceWithThunks = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
	categoryId: 0,
	currentPage: 1,
	searchValue:'',
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
		selectCurrentPage:state=>state.currentPage,
		selectSearchValue: state=> state.searchValue,
		selectFilterState:state=>state
	},
	reducers: create => ({
		setCategoryId: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: "",
				rejected: "",
				fulfilled: (state, action) => {
					state.categoryId = action.payload;
				},
				settled: "",
			}
		),
		setSortType: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: "",
				rejected: "",
				fulfilled: (state, action) => {
					state.sort = action.payload;
				},
				settled: "",
			}
		),
		setCurrentPage: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: "",
				rejected: "",
				fulfilled: (state, action) => {
					state.currentPage = action.payload;
				},
				settled: "",
			}
		),
		setSearchValue: create.asyncThunk(
			async action => {
				return action;
			},
			{
				pending: "",
				rejected: "",
				fulfilled: (state, action) => {
					state.searchValue = action.payload;
				},
				settled: "",
			}
		),
	}),
});

export const { setCategoryId, setSortType,setCurrentPage,setSearchValue } = filterSlice.actions;

export const { selectCategoryId, selectSortType,selectCurrentPage,selectSearchValue,selectFilterState } = filterSlice.selectors;

export default filterSlice.reducer;
