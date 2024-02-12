import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Pagination } from "../components/Pagination";
import { PizzaBlock, Skeleton } from "../components/PizzaBlock";
import { Sort } from "../components/Sort";
import { MyContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { selectCategoryId, selectSortType, setCategoryId, setSortType } from "../redux/slices/filterSlice";

export function Home() {
	const { searchValue } = useContext(MyContext);

	const [pizzas, setPizzas] = useState({ items: [], meta: { total_pages: 0 } });

	const categoryId = useSelector(selectCategoryId);
	const sortType = useSelector(selectSortType)
	console.log(categoryId)
	console.log(sortType)
	
const dispatch = useDispatch()

	const [currentPage, setCurrentPage] = useState(1);

	let urlGetPizza = `https://1a52b31e9a964140.mokky.dev/pizzas?page=${currentPage}&limit=3&sortBy=${sortType.sortProperty}&title=*${searchValue}`;
	if (categoryId > 0) {
		urlGetPizza = `https://1a52b31e9a964140.mokky.dev/pizzas?page=${currentPage}&limit=3&category=${categoryId}&sortBy=${sortType.sortProperty}&title=*${searchValue}`;
	}

	const { isSuccess, isError, data, error } = useQuery({
		queryKey: ["pizzas", categoryId, sortType, searchValue, currentPage],
		queryFn: async () => {
			const res = await axios.get(urlGetPizza);
			return res.data;
		},
	});

	useEffect(() => {
		if (isSuccess) {
			setPizzas(data);
		}
		if (isError) {
			console.log("Ошибка в получении данных", error);
		}
		// window.scrollTo(0, 0);
	}, [isSuccess, isError, data, error]);

	const resultPizza = pizzas.items.map(i => <PizzaBlock key={i.id} {...i} />);

	const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories  />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isSuccess ? resultPizza : skeletons}
			</div>
			<Pagination pizzas={pizzas} setCurrentPage={i => setCurrentPage(i)} />
		</div>
	);
}
