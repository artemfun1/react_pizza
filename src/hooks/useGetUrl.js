import { useSelector } from 'react-redux'
import { selectCategoryId, selectCurrentPage, selectSearchValue, selectSortType } from '../redux/slices/filterSlice'


export const useGetUrl = () => {
 
  const categoryId = useSelector(selectCategoryId);
	const sortType = useSelector(selectSortType);
	const currentPage = useSelector(selectCurrentPage);
	const searchValue = useSelector(selectSearchValue);



		let urlGetPizza = `https://1a52b31e9a964140.mokky.dev/pizzas?page=${currentPage}&limit=3&sortBy=${sortType.sortProperty}&title=*${searchValue}`;
		if (categoryId > 0) {
			urlGetPizza = `https://1a52b31e9a964140.mokky.dev/pizzas?page=${currentPage}&limit=3&category=${categoryId}&sortBy=${sortType.sortProperty}&title=*${searchValue}`;
		}
 
 
 
  return urlGetPizza
}
