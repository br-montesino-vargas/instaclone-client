import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`

	query getCommentsForID($idPublication: ID!)
	{
		getCommentsForID(idPublication: $idPublication)
		{
			idPublication
			idUser
			{
				name
				username
				avatar
			}
			comment
			createAt
		}
	}

`;

export const ADD_COMMENT = gql`

	mutation addComment($input: CommentInput)
	{
		addComment(input: $input)
		{
			idPublication
			idUser
			{
				name
				username
				avatar
			}
			comment
			createAt
		}
	}
`;