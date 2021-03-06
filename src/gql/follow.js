import { gql } from '@apollo/client';

export const IS_FOLLOW = gql`

	query isFollow($username: String!)
	{
		isFollow(username: $username)
	}

`;

export const GET_FOLLOWERS = gql`

	query getFollowers($username: String!)
	{
		getFollowers(username: $username)
		{
			name
			username
			avatar
			
		}
	}

`;

export const GET_FOLLOWEDS = gql`

	query getFolloweds($username: String!)
	{
		getFolloweds(username: $username)
		{
			name
			username
			avatar
		}
	}

`;

export const GET_NOT_FOLLOWEDS = gql`

	query getNotFolloweds
	{
		getNotFolloweds
		{
			name
			username
			avatar
		}
	}

`;

export const FOLLOW = gql`

	mutation follow($username: String!)
	{
		follow(username: $username)
	}

`;

export const UNFOLLOW = gql`

	mutation unFollow($username: String!)
	{
		unFollow(username: $username)
	}

`;