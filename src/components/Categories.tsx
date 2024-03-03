import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hookRTK";
import { selectCategoryId, setCategoryId } from "../redux/slices/filterSlice";

export const Categories: React.FC = React.memo(() => {  
	const dispatch = useAppDispatch();
	const categoryId = useAppSelector(selectCategoryId);

	const categories = [
		"Все",
		"Мясные",
		"Вегетарианская",
		"Гриль",
		"Острые",
		"Закрытые",
	];

	return (
		<div className="categories">
			<ul>
				{categories.map((item, i) => (
					<li
						key={i}
						onClick={() => dispatch(setCategoryId(i))}
						className={categoryId === i ? "active" : ""}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
});
