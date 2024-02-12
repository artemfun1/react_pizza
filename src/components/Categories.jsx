import { selectCategoryId, setCategoryId } from '../redux/slices/filterSlice'
import { useDispatch, useSelector } from 'react-redux'

export function Categories() {
	// const [activeIndex, setActiveIndex] = useState(0);

	const dispatch = useDispatch()
	const categoryId = useSelector(selectCategoryId)

	const categories = [
		"Все",
		"Мясные",
		"Вегетарианская",
		"Гриль",
		"Острые",
		"Закрытые",
	];

	// function onClickCategory(index) {
	// 	setActiveIndex(index);
	// }

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
}
