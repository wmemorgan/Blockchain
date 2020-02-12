import React from "react";

import TransactionList from "../TransactionComponents/TransactionList";
import * as S from "./UserStyles";

const User = props => {
	const user = props.user[0];
	const balance = props.user[1];
	const userTransactions = props.transactions.filter(
		transaction => transaction.sender === user || transaction.recipient === user
	);
	
	return (
		<S.UserInfoContainer>
			<div className="user-info">
				<h3>{user}</h3>
				<div className="user-stats">
					<div className="stat-category">Balance:</div>
					<div className="stat-data">{balance}</div>
				</div>
			</div>
			<div className="transaction-info">
				<h3>Transaction History</h3>
				<TransactionList transactions={userTransactions} />
			</div>
		</S.UserInfoContainer>
	);
};

export default User;
