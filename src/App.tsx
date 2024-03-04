import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
// import { Cart } from "./pages/Cart";
// import { FillPizza } from "./pages/FillPizza";
import { Home } from "./pages/Home";
// import { NotFound } from "./pages/NotFound";

import React from "react";
import Loadable from "react-loadable";
import "./scss/app.scss";

const Cart = Loadable({
	loader: () => import(/* webpackChunkName: "Cart" */ "./pages/Cart"),
	loading: () => <div>Загрузка корзины c питсой...</div>,
});
// const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */"./pages/Cart"));
const FillPizza = React.lazy(() =>
	import(/* webpackChunkName: "FillPizza" */ "./pages/FillPizza").then(m => ({
		default: m.FillPizza,
	}))
);
const NotFound = React.lazy(
	() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

export function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Home />} />
				<Route
					path="cart"
					element={
						<Cart />
						// <React.Suspense fallback={<div>Загрузка корзины...</div>}>
						// 	<Cart />
						// </React.Suspense>
					}
				/>
				<Route
					path="pizza/:id"
					element={
						<React.Suspense fallback={<div>Загрузка питсы...</div>}>
							<FillPizza />
						</React.Suspense>
					}
				/>
				<Route
					path="*"
					element={
						<React.Suspense fallback={<div>Загрузка...</div>}>
							<NotFound />
						</React.Suspense>
					}
				/>
			</Route>
		</Routes>
	);
}
