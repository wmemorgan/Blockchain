import React from "react";
// import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

import * as S from "./TransactionStyles";

const TransactionList = props => {
    console.log(`TransactionList props: `, props.transactions)
	return (
		<S.TransactionListContainer>
			<h2>WME TransactionList</h2>
			{props.transactions.length > 0 ? (
				props.transactions.map((transaction, index) => (
					<S.StyledLink key={index} to={`/transactions/${index}`}>
						<S.Preview>
							<div>Sender: {transaction.sender}</div>
							<div>Recipient: {transaction.recipient}</div>
							<div>Amount: {transaction.amount}</div>
						</S.Preview>
					</S.StyledLink>
				))
			) : (
				<S.SpinnerContainer>
					<h2>Loading...</h2>
					<Loader type="Puff" color="#265077" height={60} width={60} />
				</S.SpinnerContainer>
			)}
		</S.TransactionListContainer>
	);
};

export default TransactionList;
