import styles from "./Select.module.css";

type SelectOption = {
	label: string;
	value: string | number;
};

type SelectProps = {
	options: SelectOption[];
	value?: SelectOption;
	onChange: (value: SelectOption | undefined) => void;
};

function Select({ value, onChange, options }: SelectProps) {
	return (
		// Giving tabIndex so that we can focus on this container by clicking or using tab
		<div tabIndex={0} className={styles.container}>
			<span className={styles.value}></span>
			<button className={styles["clear-btn"]}>&times;</button>
			<div className={styles.divider}></div>
			<div className={styles.caret}></div>
			<ul className={`${styles.options} ${styles.show}`}>
				{options.map((option) => (
					<li key={option.value} className={styles.option}>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Select;
