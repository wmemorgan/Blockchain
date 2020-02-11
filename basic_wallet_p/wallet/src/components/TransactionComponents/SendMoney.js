import React, { Component } from "react";
import axios from "axios"; /** External API calls only **/

import Transaction from "./Transaction";

import * as S from "../SharedComponents/FormStyles";

class SendMoney extends Component {
	state = {
		userList: [],
		sender: "",
		recipient: "",
		amount: "",
		success: false
	};

	handleInput = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	addData = async () => {
		const { sender, recipient, amount } = this.state;
		const endpoint = "/transactions/new";
		const transaction = {
			sender,
			recipient,
			amount
		};

		try {
			const data = await axios.post(endpoint, transaction);
			console.log(data);
			if (data.status === 201) {
				this.setState({ success: true });
			}
		} catch (err) {
			console.error(err.response);
		}
	};

	submitHandler = e => {
		e.preventDefault();
		this.addData(e);
	};

	render() {
		return (
			<S.FormContainer>
				{!this.state.success ? (
					<>
						<div className="windowFrame"></div>
						<form onSubmit={this.submitHandler}>
							<input
								name="sender"
								type="text"
								placeholder="Sender"
								onChange={this.handleInput}
								value={this.state.sender}
							/>
							<input
								name="recipient"
								type="text"
								placeholder="Recipient"
								onChange={this.handleInput}
								value={this.state.recipient}
							/>
							<input
								name="amount"
								type="number"
								placeholder="Amount"
								onChange={this.handleInput}
								value={this.state.amount}
							/>
							<S.FormButton type="submit">Send Coins</S.FormButton>
						</form>
					</>
				) : (
					<>
						<h2>Successfully sent!</h2>
						<Transaction transaction={this.state} />
					</>
				)}
			</S.FormContainer>
		);
	}
}

export default SendMoney;
