import { gql } from '@apollo/client';

export const GET_USER = gql`

	query getUser( $id: ID, $username: String )
	{
		getUser( id: $id, username: $username )
		{
			id
			name
			username
			email
			website
			description
			avatar
		}
	}

`;

export const GET_USERS = gql`

	query getUsers($name: String)
	{
		getUsers(name: $name)
		{
			name
			username
			avatar
		}
	}

`

export const AUTH_REGISTER = gql`

	mutation authRegister( $input: RegisterInput )
	{
		authRegister( input: $input )
		{
			token
		}
	}
`;

export const AUTH_LOGIN = gql`

	mutation authLogin( $input: LoginInput )
	{
		authLogin( input: $input )
		{
			token
		}
	}

`;

export const AUTH_RENEW = gql`

	mutation authRenew( $input: RenewInput )
	{
		authRenew (input: $input )
		{
			token
		}
	}

`;

export const USER_UPDATE_AVATAR = gql`

	mutation userUpdateAvatar( $file: Upload )
	{
		userUpdateAvatar( file: $file )
		{
			status
			urlAvatar
		}
	}

`;

export const USER_DELETE_AVATAR = gql`

	mutation userDeleteAvatar
	{
		userDeleteAvatar
	}

`;

export const USER_UPDATE = gql`

	mutation userUpdate($input: UserUpdateInput)
	{
		userUpdate(input: $input)
	}
	
`