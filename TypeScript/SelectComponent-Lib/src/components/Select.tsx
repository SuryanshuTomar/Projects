import React, { useState, useEffect, useRef } from "react";
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
	const refContainer = useRef<HTMLDivElement>(null);

	const clearOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		multiple ? onChange([]) : onChange(undefined);
	};

	const selectOption = (
		event:
			| React.MouseEvent<HTMLLIElement>
			| React.MouseEvent<HTMLButtonElement>
			| KeyboardEvent,
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

	useEffect(() => {
		const keyboardEventHandler = (event: KeyboardEvent) => {
			if (event.target == refContainer.current) {
				switch (
					event.code // event.code gets which event occured like which button pressed etc
				) {
					case "Enter":
					case "Space":
						setIsOpen((prevIsOpen) => !prevIsOpen);
						if (isOpen) selectOption(event, options[highlightedIndex]);
						break;
					case "ArrowDown":
					case "ArrowUp": {
						if (!isOpen) {
							setIsOpen(true);
							break;
						}

						const newValue =
							highlightedIndex + (event.code === "ArrowDown" ? 1 : -1);

						if (newValue >= 0 && newValue < options.length) {
							setHighlightedIndex(newValue);
						}
						break;
					}
					case "Escape":
						setIsOpen(false);
						break;
				}
			}
		};

		refContainer.current?.addEventListener("keydown", keyboardEventHandler);

		return () => {
			refContainer.current?.removeEventListener(
				"keydown",
				keyboardEventHandler
			);
		};
	}, [isOpen, highlightedIndex, options]);

	return (
		// Giving tabIndex so that we can focus on this container by clicking or using tab
		<div
			ref={refContainer}
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
