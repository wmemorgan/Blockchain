import React from 'react'
import Loader from 'react-loader-spinner'

import * as S from './UserStyles'

const UserList = props => {
  return (
		<S.UserListContainer>
			<h2>DigiCoin Wallet App</h2>
			{props.userList.length > 0 ? (
				props.userList.map((user, index) => (
					<S.StyledLink key={index} to={`/users/${index}`}>
						<S.Preview>
							<div>{user[0]}</div>
							<div>balance: {user[1]}</div>
						</S.Preview>
					</S.StyledLink>
				))
			) : (
				<S.SpinnerContainer>
					<h2>Loading...</h2>
					<Loader type="Puff" color="#265077" height={60} width={60} />
				</S.SpinnerContainer>
			)}
		</S.UserListContainer>
	);
}

export default UserList;