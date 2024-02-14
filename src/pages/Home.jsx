import qs from "qs";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Categories } from "../components/Categories";
import { Pagination } from "../components/Pagination";
import { PizzaBlock, Skeleton } from "../components/PizzaBlock";
import { Sort } from "../components/Sort";
import {
	selectCategoryId,
	selectCurrentPage,
	selectSearchValue,
	selectSortType,
	setFiltersUserLink,
} from "../redux/slices/filterSlice";
import { selectPizzas, setPizzas } from "../redux/slices/pizzaSlice";

export function Home() {
	// console.log(window.location.href)

	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const categoryId = useSelector(selectCategoryId);
	const sortType = useSelector(selectSortType);
	const currentPage = useSelector(selectCurrentPage);
	const searchValue = useSelector(selectSearchValue);

	// const fetchPizza = useCallback(() => {

	// }, [dispatch, categoryId,sortType.sortProperty,currentPage,searchValue]);
useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sortType.sortProperty,
				categoryId: categoryId,
				currentPage: currentPage,
			});
			navigate(`?${queryString}`);
		}

		isMounted.current = true;
	}, [sortType.sortProperty, categoryId, currentPage, navigate]);

	
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			dispatch(setFiltersUserLink(params));
			isSearch.current = true;
		}
	}, [dispatch]);

	


	useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {

			let urlGetPizza = `https://1a52b31e9a964140.mokky.dev/pizzas?page=${currentPage}&limit=3&sortBy=${sortType.sortProperty}&title=*${searchValue}`;
			if (categoryId > 0) {
				urlGetPizza = `https://1a52b31e9a964140.mokky.dev/pizzas?page=${currentPage}&limit=3&category=${categoryId}&sortBy=${sortType.sortProperty}&title=*${searchValue}`;
			}

			dispatch(setPizzas(urlGetPizza));
		}
		isSearch.current = false;
	}, [dispatch, categoryId, sortType.sortProperty, currentPage, searchValue]);



	const pizzas = useSelector(selectPizzas);

	const resultPizza = pizzas.items.map(i => <PizzaBlock key={i.id} {...i} />);

	const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{pizzas.isSuccess ? resultPizza : skeletons}
			</div>
			<Pagination />
		</div>
	);
}
