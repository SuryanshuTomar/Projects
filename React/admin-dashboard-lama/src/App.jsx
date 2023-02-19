import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { productInputs, userInputs } from "./data/formSource";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import NotFound from "./pages/not-found/NotFound";
import Single from "./pages/single/Single";
import "./styles/darkmode.scss";

function App() {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<div className={darkMode ? "app dark" : "app"}>
			<Routes>
				<Route path="/">
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="users">
						<Route index element={<List />} />
						<Route path=":userId" element={<Single />} />
						<Route
							path="new"
							element={<New title="Add new user" inputs={userInputs} />}
						/>
					</Route>
					<Route path="products">
						<Route index element={<List />} />
						<Route path=":productId" element={<Single />} />
						<Route
							path="new"
							element={
								<New title="Add new product" inputs={productInputs} />
							}
						/>
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
