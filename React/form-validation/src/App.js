import { InputForm } from "./components/InputForm";
import { useState, useRef } from "react";

function App() {
	const userNameRef = useRef();
	const [formValues, setFormValues] = useState({
		username: "",
		email: "",
		birthday: "",
		password: "",
		confirmPassword: "",
	});

	const inputs = [
		{
			id: 1,
			name: "username",
			type: "text",
			placeholder: "Username",
			label: "Username",
			pattern: "^[A-Za-z0-9]{4,20}$",
			required: true,
			errorMessage:
				"Username should be 4-20 charachters and shouldn't include any special charachters.",
		},
		{
			id: 2,
			name: "email",
			type: "email",
			placeholder: "Email",
			label: "Email",
			required: true,
			errorMessage: "It should be a valid email address.",
		},
		{
			id: 3,
			name: "birthday",
			type: "date",
			placeholder: "Birthday",
			label: "Birthday",
			required: true,
			errorMessage: "Birthday cannot be empty",
		},
		{
			id: 4,
			name: "password",
			type: "password",
			placeholder: "Password",
			label: "Password",
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8, 20}$`,
			required: true,
			errorMessage:
				"Password should be 8-20 charachters and should atleast include 1 letter, 1 number and 1 charachter",
		},
		{
			id: 5,
			name: "confirmPassword",
			type: "password",
			placeholder: "Confirm Password",
			label: "Confirm Password",
			pattern: formValues.password,
			required: true,
			errorMessage: "Passwords don't match",
		},
	];

	const onChangeHandler = (e) => {
		setFormValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		// Using FormData Class to access the Form Data
		// console.log(userNameRef.current.value);
		// const data = new FormData(e.target);
		// console.log(Object.fromEntries(data.entries()));
	};

	// console.log(formValues);
	return (
		<div className="app">
			<form onSubmit={submitHandler}>
				<h1>Register</h1>
				{inputs.map((input) => {
					return (
						<InputForm
							key={input.id}
							{...input}
							value={formValues[input.name]}
							onChange={onChangeHandler}
						/>
					);
				})}

				<button>Submit</button>
			</form>
		</div>
	);
}

export default App;
