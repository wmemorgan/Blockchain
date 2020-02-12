import React from 'react'

import * as S from './TransactionStyles'

const Transaction = props => {
    const { sender, recipient, amount } = props.transaction
    return (
			<S.TransactionListContainer>
				<header />
				<div className="transaction-info">
					<div className="transaction-stats">
						Sender: {sender}
					</div>
					<div className="transaction-stats">
						Recipient: {recipient}
					</div>
					<div className="transaction-stats">
						Amount: {amount}
					</div>
				</div>
			</S.TransactionListContainer>
		);
}

export default Transaction