import React from 'react'

import * as S from './TransactionStyles'

const Transaction = props => {
    const { sender, recipient, amount } = props.transaction
    return (
			<S.TransactionListContainer>
				<header />
				<div className="transaction-info">
					<h3 className="stat-data">{amount}</h3>
					<div className="transaction-stats">
						<div className="stat-category">Sender:</div>
						<div className="stat-data">{sender}</div>
					</div>
					<div className="transaction-stats">
						<div className="stat-category">Recipient:</div>
						<div className="stat-data">{recipient}</div>
					</div>
				</div>
			</S.TransactionListContainer>
		);
}

export default Transaction