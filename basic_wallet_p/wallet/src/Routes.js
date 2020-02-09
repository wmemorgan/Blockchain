import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";

import UserList from "./components/UserComponents/UserList";
import User from "./components/UserComponents/User";

const URL = "http://localhost:5000";

class Routes extends Component {
	state = {
		chain: [],
		transactions: [],
		userList: []
	};

	getData = async () => {
		try {
			let endpoint = `${URL}/chain`;
			let data = await axios.get(endpoint);
			console.log(`getData`, data.data, typeof data.data);
			const { chain } = data.data;
			this.setState({ chain }, () => {
				console.log(`getData state: `, this.state);
				this.parseTransactions(this.state.chain);
			});
		} catch (err) {
			console.error(err);
		}
	};

	parseTransactions = arr => {
		const transactions = arr.flatMap(block => block.transactions);
		console.log(`TRANSACTIONS: `, transactions);
		this.setState({
			transactions,
			userList: Object.entries(this.userBalances(transactions))
		});
		const idFilter = transactions.filter(
			transaction =>
				transaction.sender === "Julie" || transaction.recipient === "Julie"
		);
		console.log(`idFilter: `, idFilter);
	};

	userBalances = transactions => {
		const userList = {};
		for (const transaction of transactions) {
			const { sender, recipient, amount } = transaction;
			userList[sender]
				? (userList[sender] -= amount)
				: (userList[sender] = -Math.abs(amount));
			userList[recipient]
				? (userList[recipient] += amount)
				: (userList[recipient] = amount);
		}

		return userList;
	};

	componentDidMount() {
		this.getData();
	}

	render() {
		return (
			<>
				<Route
					exact
					path="/"
					render={props => (
						<UserList
							{...props}
							transactions={this.state.transactions}
							userList={this.state.userList}
						/>
					)}
				/>
				{this.state.userList.length > 0 &&
					this.state.userList.map((user, index) => (
						<Route
							key={index}
							path={`/users/${index}`}
							render={props => (
								<User
									{...props}
									user={user}
									transactions={this.state.transactions}
								/>
							)}
						/>
					))}
			</>
		);
	}
}

export default withRouter(Routes);
