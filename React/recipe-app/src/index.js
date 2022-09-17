import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./context/ThemeContext";

ReactDOM.render(
	<React.StrictMode>
		<ThemeContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
