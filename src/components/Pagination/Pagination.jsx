import ReactPaginate from "react-paginate";

import style from "./pagination.module.scss";
import { setCurrentPage } from '../../redux/slices/filterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectPizzas } from '../../redux/slices/pizzaSlice'

export function Pagination() {
	// current_page: 1;
	// per_page: 4;
	// remaining_count: 6;
	// total_items: 10;
	// total_pages: 3;

	const dispatch = useDispatch()
	const pizzas = useSelector(selectPizzas)

	return (
		<>
			<ReactPaginate
				className={style.root}
				breakLabel="..."
				nextLabel=">"
				onPageChange={e => dispatch(setCurrentPage(e.selected+1))}
				pageRangeDisplayed={pizzas.meta.per_page}
				pageCount={pizzas.meta.total_pages}
				previousLabel="<"
				renderOnZeroPageCount={null}
			/>
		</>
	);
}
