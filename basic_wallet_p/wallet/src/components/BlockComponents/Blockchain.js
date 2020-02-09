import React from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

import * as S from "./BlockStyles";

const Blockchain = props => {
    console.log(`Blockchain props: `, props.chain)
	return (
		<S.BlockchainContainer>
			<h2>WME Blockchain</h2>
			{props.chain.length > 0 ? (
				props.chain.map(block => (
					<Link key={block.index} to={`/block/${block.index}`}>
						<S.Preview>
							<div>index: {block.index}</div>
						</S.Preview>
					</Link>
				))
			) : (
				<S.SpinnerContainer>
					<h2>Loading...</h2>
					<Loader type="Puff" color="#265077" height="60" width="60" />
				</S.SpinnerContainer>
			)}
		</S.BlockchainContainer>
	);
};

export default Blockchain;
