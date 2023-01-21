import React, { useState, useEffect } from "react";
import styles from "./Select.module.css";

export type SelectOption = {
	label: string;
	value: string | number;
};

type SingleSelectProps = {
	multiple?: false;
	value?: SelectOption;
	onChange: (value: SelectOption | undefined) => void;
};

type MultiSelectProps = {
	multiple: true;
	value: SelectOption[];
	onChange: (value: SelectOption[]) => void;
};

type SelectProps = {
	options: SelectOption[];
} & (SingleSelectProps | MultiSelectProps);

function Select({ multiple, value, onChange, options }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

	const clearOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		multiple ? onChange([]) : onChange(undefined);
	};

	const selectOption = (
		event:
			| React.MouseEvent<HTMLLIElement>
			| React.MouseEvent<HTMLButtonElement>,
		option: SelectOption
	) => {
		event.stopPropagation();
		setIsOpen(false);
		if (multiple) {
			if (value.includes(option)) {
				onChange(
					value.filter((selectedOption) => selectedOption !== option)
				);
			} else {
				onChange([...value, option]);
			}
		} else {
			if (option !== value) onChange(option);
		}
	};

	const isOptionSelected = (option: SelectOption) => {
		return multiple ? value.includes(option) : option === value;
	};

	const isOptionHighlighted = (index: number) => {
		return index === highlightedIndex;
	};

	useEffect(() => {
		if (isOpen) setHighlightedIndex(0);
	}, [isOpen]);

	return (
		// Giving tabIndex so that we can focus on this container by clicking or using tab
		<div
			onBlur={() => setIsOpen(false)}
			onClick={() => setIsOpen(!isOpen)}
			tabIndex={0}
			className={styles.container}
		>
			<span className={styles.value}>
				{multiple
					? value.map((val) => (
							<button
								key={val.value}
								onClick={(event) => selectOption(event, val)}
								className={styles["option-badge"]}
							>
								{val.label}
								<span className={styles["remove-btn"]}>&times;</span>
							</button>
					  ))
					: value?.label}
			</span>
			<button onClick={clearOptions} className={styles["clear-btn"]}>
				&times;
			</button>
			<div className={styles.divider}></div>
			<div className={styles.caret}></div>
			<ul className={`${styles.options} ${isOpen && styles.show}`}>
				{options.map((option, index) => (
					<li
						key={option.value}
						onClick={(event) => selectOption(event, option)}
						onMouseEnter={() => setHighlightedIndex(index)}
						className={`
                  ${styles.option}
                  ${isOptionSelected(option) && styles.selected} 
                  ${isOptionHighlighted(index) && styles.highlighted}`}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Select;
