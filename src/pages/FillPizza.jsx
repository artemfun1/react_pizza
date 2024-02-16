import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const FillPizza = () => {
	const [pizza, setPizza] = useState(undefined);

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
	const { imageUrl, title, price } = pizza;
	return (
		<div className="container">
			<img style={{ height: "200px" }} src={imageUrl} alt="pizza" />
			<p>{title}</p>
			<h4>{price} p</h4>
		</div>
	);
};
