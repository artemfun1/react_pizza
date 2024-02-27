import style from "./NotFoundBlock.module.scss";

export function NotFoundBlock() {
	return (
		<div className={style.root}>
			<h1>
				<span>😕</span>
				<br />
				Ничего не найдено
			</h1>
			<p className={style.des}> Такой страницы нет</p>
		</div>
	);
}
