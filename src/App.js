import { Categories } from "./components/Categories";
import { Header } from "./components/Header";
import { PizzaBlock } from "./components/PizzaBlock";
import { Sort } from "./components/Sort";
import "./scss/app.scss";
import pizzasJson from './assets/pizza.json'

// const [] = useState()

export function App() {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sort />
					</div>
					<h2 className="content__title">Все пиццы</h2>
					<div className="content__items">

							{pizzasJson.map((i)=>(
								<PizzaBlock 
								key={i.id}
								{...i}
								 
								/>
							))}

						
					</div>
				</div>
			</div>
		</div>
	);
}
