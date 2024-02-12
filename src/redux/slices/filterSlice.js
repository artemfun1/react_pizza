import {
	asyncThunkCreator,
	buildCreateSlice,
} from "@reduxjs/toolkit";

const createSliceWithThunks = buildCreateSlice({
	creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
	categoryId: 0,
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
	selectSortType:state =>state.sort
},
	reducers: create => ({
		setCategoryId: create.asyncThunk(
			async (action) => {
        return action
			},
			{
				pending: '',
				rejected: '',
				fulfilled:(state,action)=>{
          state.categoryId = action.payload
        },
				settled: '',
			}
		),
		setSortType: create.asyncThunk(
		async (action) => {
			return action
		},
		{
			pending: '',
			rejected: '',
			fulfilled:(state,action)=>{
				state.sort = action.payload
			
			},
			settled: '',
		}
	),
	}),
	
})





export const {setCategoryId,setSortType} = filterSlice.actions;


export const  {selectCategoryId,selectSortType}  = filterSlice.selectors



export default filterSlice.reducer;
