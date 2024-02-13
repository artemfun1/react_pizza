import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../components/Categories";
import { Pagination } from "../components/Pagination";
import { PizzaBlock, Skeleton } from "../components/PizzaBlock";
import { Sort } from "../components/Sort";
import { useGetUrl } from "../hooks/useGetUrl";
import { selectPizzas, setPizzas } from "../redux/slices/pizzaSlice";

export function Home() {
	console.log("render");
	const dispatch = useDispatch();
	const urlGetPizza = useGetUrl();

	useEffect(() => {
		dispatch(setPizzas(urlGetPizza));
	}, [urlGetPizza, dispatch]);

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
