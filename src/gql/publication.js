import { gql } from '@apollo/client';

export const GET_PUBLICATIONS = gql`

	query getPublicationsForUsername( $username: String! )
	{
		getPublicationsForUsername(username: $username)
		{
			id,
			idUser,
			file,
			typeFile	
		}
	}

`;

export const PUBLICATIONS_FOLLOWEDS = gql`

	query getPublicationsFolloweds
	{
		getPublicationsFolloweds
		{
			id
			idUser
			{
				name
				username
				avatar
			}
			file
			typeFile
			createAt
		}
	}

`;

export const PUBLISH = gql`

	mutation publish( $file: Upload )
	{
		publish( file: $file )
		{
			status
			urlFile
		}
	}

`;