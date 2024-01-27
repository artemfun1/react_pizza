import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Pagination } from "../components/Pagination";
import { PizzaBlock, Skeleton } from "../components/PizzaBlock";
import { Sort } from "../components/Sort";

export function Home({ searchValue }) {
	const [pizzas, setPizzas] = useState({items:[], meta:{}});

	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({
		name: "популярности",
		sortProperty: "rating",
	});
	const [currentPage, setCurrentPage] = useState(1);

	let urlGetPizza = `https://1a52b31e9a964140.mokky.dev/pizzas?page=${currentPage}&limit=3&sortBy=${sortType.sortProperty}&title=*${searchValue}`;
	if (categoryId > 0) {
		urlGetPizza = `https://1a52b31e9a964140.mokky.dev/pizzas?page=${currentPage}&limit=3&category=${categoryId}&sortBy=${sortType.sortProperty}&title=*${searchValue}`;
	}



	const { isSuccess, isError, data, error } = useQuery({
		queryKey: ["pizzas", categoryId, sortType, searchValue,currentPage],
		queryFn: async () => {
			const res = await axios.get(urlGetPizza);
			return res.data;
		},
	});

	useEffect(() => {
		if (isSuccess) {
			setPizzas(data);
			console.log(data)
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
				<Categories
					categoryId={categoryId}
					setCategoryId={i => setCategoryId(i)}
				/>
				<Sort sortType={sortType} setSortType={i => setSortType(i)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isSuccess ? resultPizza : skeletons}
			</div>
			<Pagination pizzas={pizzas} setCurrentPage={(i)=>setCurrentPage(i)} />
		</div>
	);
}
