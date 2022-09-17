// react
import React from "react";
import { useTheme } from "../hooks/useTheme";

// styles
import styles from "./ThemeSelector.module.css";
import sunIcon from "../assets/wb_sunny_FILL0_wght400_GRAD0_opsz48.svg";
import moonIcon from "../assets/nightlight_FILL0_wght400_GRAD0_opsz48.svg";

function ThemeSelector() {
	const { changeColor, changeMode, mode } = useTheme();
	const themeColors = ["#58249c", "#249c6b", "#b70233"];

	const toggleModeHandler = (event) => {
		if (mode === "light") {
			changeMode("dark");
			event.target.src = moonIcon;
		} else {
			changeMode("light");
			event.target.src = sunIcon;
		}
	};

	return (
		<div className={styles["theme-selector"]}>
			<div className={styles["theme-mode"]}>
				<img
					src={sunIcon}
					alt="dark/light mode toggle icon"
					onClick={toggleModeHandler}
					style={{
						filter: mode === "dark" ? "invert(100%)" : "invert(20%)",
					}}
				/>
			</div>
			<div className={styles["theme-buttons"]}>
				{themeColors.map((color) => (
					<div
						key={color}
						onClick={() => changeColor(color)}
						style={{ background: color }}
					/>
				))}
			</div>
		</div>
	);
}

export default ThemeSelector;
