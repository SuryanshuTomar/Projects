import { BrowserRouter } from "react-router-dom";
import Category from "./components/Category";
import Pages from "./pages/Pages";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Category />
				<Pages />
			</BrowserRouter>
		</div>
	);
}

export default App;
