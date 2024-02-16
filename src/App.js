import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Cart } from "./pages/Cart";
import { FillPizza } from "./pages/FillPizza";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import "./scss/app.scss";

export function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Home />} />
				<Route path="cart" element={<Cart />} />
				<Route path="pizza/:id" element={<FillPizza />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}
