import React, { Component } from "react";
import styles from "./CodeSubmitData.module.css";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";

class CodeSubmitData extends Component {
	state = {
		codeSubmitForm: {
			code: {
				elementType: "textarea",
				elementConfig: {
                    rows: "20",
                    placeholder: "Enter Your Code here"
				},
			},
			language: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "cpp", displayValue: "C++" },
						{ value: "python", displayValue: "python" },
					],
				},
			},
		},
		formIsValid: true,
		loading: false,
	};

	inputChangeHandler = (value, formKey) => {
		console.log(value, formKey);
		const updatedCodeSubmitForm = { ...this.state.codeSubmitForm };
		updatedCodeSubmitForm[formKey].value = value;
		// updatedOrderForm[formKey].valid = this.checkValidity(
		// 	value,
		// 	updatedOrderForm[formKey].validation
		// );
		// updatedOrderForm[formKey].touched = true;
		let formIsValid = true;
		// for (let key in updatedOrderForm)
		// 	formIsValid = formIsValid && updatedOrderForm[key].valid;

		if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
			console.log(updatedCodeSubmitForm[formKey]);
		this.setState({
			codeSubmitForm: updatedCodeSubmitForm,
			formIsValid: formIsValid,
		});
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.codeSubmitForm)
			formElementsArray.push(
				<Input
					{...this.state.codeSubmitForm[key]}
					key={key}
					changed={(event) => this.inputChangeHandler(event.target.value, key)}
				/>
			);
		return (
			<div className={styles.ContactData}>
				<h4> Enter your Code and Language</h4>
				<form onSubmit={this.orderHandler}>
					{formElementsArray}
					<Button buttonType="Success" disabled={!this.state.formIsValid}>
						Submit
					</Button>
				</form>
			</div>
		);
	}
}

export default CodeSubmitData;
