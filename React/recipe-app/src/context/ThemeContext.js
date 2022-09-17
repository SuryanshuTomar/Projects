import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
	switch (action.type) {
		case "CHANGE_COLOR":
			return { ...state, color: action.payload };
		default:
			return state;
	}
};

export function ThemeContextProvider({ children }) {
	const [themeState, themeDispatch] = useReducer(themeReducer, {
		color: "#58249c",
	});

	const changeColor = (color) => {
		themeDispatch({ type: "CHANGE_COLOR", payload: color });
	};
	return (
		<ThemeContext.Provider value={{ ...themeState, changeColor }}>
			{children}
		</ThemeContext.Provider>
	);
}
