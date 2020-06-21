import React, { Component } from "react";
import styles from "./CodeSubmitData.module.css";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Input/Input";
import Spinner from "../../Components/UI/Spinner/Spinner";
import Axios from "axios";
import CodeEditor from "../../Components/CodeEditor/CodeEditor";

class CodeSubmitData extends Component {
	state = {
		codeSubmitForm: {
			language: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "python", displayValue: "Python" },
						{ value: "cpp", displayValue: "C++" },
					],
				},
				value: "python",
            },
            input: {
                elementType: "textarea",
                elementConfig: {
                    rows: 5,
                    placeholder: "Enter your input (Optional)"
                }
            }
		},
		code: "",
		formIsValid: true,
		loading: false,
		stdoutText: null,
	};

	submitCodeHandler = (event) => {
		console.log("Code is being submitted ");
		event.preventDefault();
		this.setState({
			loading: true,
		});
		let codeData = {
			code: this.state.code,
			language: this.state.codeSubmitForm.language.value,
			input: this.state.codeSubmitForm.input.value,
			timelimit: 2,
		};

		console.log(codeData);
		Axios.post("http://localhost:4000/submit", codeData)
			.then((response) =>
				this.setState({
					loading: false,
					stdoutText: response.data.output,
				})
			)
			.catch((err) => console.log(err));
	};
	codeChanged = (newCode) => {
		console.log("codeChanged:", newCode);
		this.setState({
			code: newCode,
		});
	};

	inputChangeHandler = (value, formKey) => {
		// console.log(value, formKey);
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

		// if (!process.env.NODE_ENV || process.env.NODE_ENV === "development")
		// 	console.log(updatedCodeSubmitForm[formKey]);
		this.setState({
			codeSubmitForm: updatedCodeSubmitForm,
			formIsValid: formIsValid,
		});
	};

	render() {
		const formElementsArray = [];
		let stdoutElement = null;
		if (this.state.loading) stdoutElement = <Spinner />;
		else if (this.state.stdoutText) {
			stdoutElement = (
				<div>
					<label>STDOUT</label>
					<Input
						elementType="textarea"
						value={this.state.stdoutText}
						elementConfig={{
							disabled: true,
							rows: 5,
						}}
					/>
				</div>
			);
		}

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
				<CodeEditor
					code={this.state.code}
					codeChanged={this.codeChanged}
					language={this.state.codeSubmitForm.language.value}
				/>
				<form onSubmit={this.submitCodeHandler}>
					{formElementsArray}
					<Button
						buttonType="Success"
						disabled={!this.state.formIsValid || this.state.loading}
					>
						Submit
					</Button>
				</form>
				{stdoutElement}
			</div>
		);
	}
}

export default CodeSubmitData;
