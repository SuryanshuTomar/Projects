import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE_COLOR":
			return { ...state, color: action.payload };
		case "CHANGE_MODE":
			return { ...state, mode: action.payload };
		default:
			return state;
	}
};

export function ThemeContextProvider({ children }) {
	const [themeState, themeDispatch] = useReducer(themeReducer, {
		color: "#58249c",
		mode: "light",
	});

	const changeColor = (color) => {
		themeDispatch({ type: "CHANGE_COLOR", payload: color });
	};

	const changeMode = (mode) => {
		themeDispatch({ type: "CHANGE_MODE", payload: mode });
	};
	return (
		<ThemeContext.Provider value={{ ...themeState, changeColor, changeMode }}>
			{children}
		</ThemeContext.Provider>
	);
}
