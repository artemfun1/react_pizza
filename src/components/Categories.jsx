import { useState } from "react";

export function Categories() {
	const [activeIndex, setActiveIndex] = useState(0);

	const categories = [
		"Все",
		"Мясные",
		"Вегетарианская",
		"Гриль",
		"Острые",
		"Закрытые",
	];

	function onClickCategory(index) {
		setActiveIndex(index);
	}

	return (
		<div className="categories">
			<ul>
				{categories.map((item, i) => (
					<li
						key={i}
						onClick={() => onClickCategory(i)}
						className={activeIndex === i ? "active" : ""}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}
