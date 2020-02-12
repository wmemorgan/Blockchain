import React from 'react'

import * as S from './BlockStyles'

const Block = props => {
    const { index, previous_hash } = props.block
    return (
			<S.BlockInfoContainer>
				<header />
				<div className="block-info">
					<h3 className="stat-data">{index}</h3>
					<div className="block-stats">
						<div className="stat-category">Previous Hash:</div>
						<div className="stat-data">{previous_hash}</div>
						{/* <div className="stat-category">Proof:</div>
						<div className="stat-category">Transactions:</div> */}
					</div>
				</div>
			</S.BlockInfoContainer>
		);
}

export default Block