import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<DarkModeContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</DarkModeContextProvider>
	</React.StrictMode>
);
