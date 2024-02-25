import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const FillPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl:string,
		title:string,
		price:string
	}>();

	const navigate = useNavigate();

	const { id } = useParams();

	const urlPizzaId = `https://1a52b31e9a964140.mokky.dev/pizzas?id=${id}`;

	useEffect(() => {
		async function getPizza() {
			try {
				const response = await axios.get(urlPizzaId);

				setPizza(response.data[0]);
			} catch (error) {
				alert("Ошибка при получении питсы");
				navigate('/');
			}
		}
		getPizza();
	}, [urlPizzaId,navigate]);

	if (!pizza) {
		return <h2>Loading...</h2>;
	}
	const { price } = pizza;
	return (
		<div className="container">
			<img style={{ height: "200px" }} src={pizza.imageUrl} alt="pizza" />
			<p>{pizza.title}</p>
			<h4>{price} p</h4>
		</div>
	);
};
