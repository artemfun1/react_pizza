import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "../../redux/hookRTK";
import { setCurrentPage } from "../../redux/slices/filterSlice";
import { selectPizzas } from "../../redux/slices/pizzaSlice";
import style from "./pagination.module.scss";

export function Pagination() {
	// current_page: 1;
	// per_page: 4;
	// remaining_count: 6;
	// total_items: 10;
	// total_pages: 3;

	const dispatch = useAppDispatch();
	const pizzas = useAppSelector(selectPizzas);

	// console.log(pizzas.meta)

	return (
		<>
			<ReactPaginate
				className={style.root}
				breakLabel="..."
				nextLabel=">"
				onPageChange={e => dispatch(setCurrentPage(e.selected + 1))}
				pageRangeDisplayed={pizzas.meta.total_pages}
				pageCount={pizzas.meta.total_pages}
				previousLabel="<"
				renderOnZeroPageCount={null}
			/>
		</>
	);
}
