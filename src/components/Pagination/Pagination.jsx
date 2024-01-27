import ReactPaginate from "react-paginate";

import style from "./pagination.module.scss";

export function Pagination({ pizzas,setCurrentPage }) {
	// current_page: 1;
	// per_page: 4;
	// remaining_count: 6;
	// total_items: 10;
	// total_pages: 3;

	return (
		<>
			<ReactPaginate
				className={style.root}
				breakLabel="..."
				nextLabel=">"
				onPageChange={e => setCurrentPage(e.selected+1)}
				pageRangeDisplayed={pizzas.meta.per_page}
				pageCount={pizzas.meta.total_pages}
				previousLabel="<"
				renderOnZeroPageCount={null}
			/>
		</>
	);
}
