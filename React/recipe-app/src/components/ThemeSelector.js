// react
import React from "react";
import { useTheme } from "../hooks/useTheme";

// styles
import styles from "./ThemeSelector.module.css";

function ThemeSelector() {
	const { changeColor } = useTheme();
	const themeColors = ["#58249c", "#249c6b", "#b70233"];
	return (
		<div className={styles["theme-selector"]}>
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
