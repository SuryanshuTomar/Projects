import React, { useState, useRef } from "react";
import "./InputForm.css";

export const InputForm = React.forwardRef((props, ref) => {
	const [focused, setFocused] = useState(false);
	const { label, errorMessage, onChange, id, ...inputProps } = props;

	const handleFocus = (e) => {
		setFocused(true);
	};

	return (
		<div className="formInput">
			<label htmlFor="">{label} : </label>
			<input
				{...inputProps}
				onChange={onChange}
				onBlur={handleFocus}
				onFocus={() =>
					inputProps.name === "confirmPassword" && setFocused(true)
				}
				focused={focused.toString()}
			/>
			<span>{errorMessage}</span>
		</div>
	);
});
