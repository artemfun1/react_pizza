import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { PizzaBlock, Skeleton } from "../components/PizzaBlock";
import { Sort } from "../components/Sort";

export function Home() {
	const [pizzas, setPizzas] = useState([]);

	const { isSuccess, isError, data, error } = useQuery({
		queryKey: ["pizzas"],
		queryFn: async () => {
			const res = await axios.get("https://1a52b31e9a964140.mokky.dev/pizzas");
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
	}, [isSuccess, isError, data, error]);

	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isSuccess
					? pizzas.map(i => <PizzaBlock key={i.id} {...i} />)
					: [...new Array(6)].map((_, i) => <Skeleton key={i} />)}
			</div>
		</>
	);
}
