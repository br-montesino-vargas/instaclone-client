import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@apollo/client';
import { Button } from 'semantic-ui-react';

import { IS_FOLLOW, FOLLOW, UNFOLLOW } from '../../../../gql/follow';
import { userFollow, userUnfollow } from '../../../../actions/user';

export const HeaderProfile = ({ username, optionModal }) =>
{
	/* Dispatch */
	const dispatch = useDispatch();
	const { username:authUsername } = useSelector(state => state.auth);

	/* Mutations and Queries */
	const [ follow ] = useMutation( FOLLOW );
	const [ unfollow ] = useMutation( UNFOLLOW );

	const { data, loading, refetch } = useQuery( IS_FOLLOW,
	{
		variables: { username }
	});


	const followOrNot = () =>
	{
		if( data.isFollow )
		{
			return (
				<Button className="btn-danger" onClick={ handleUnfollow } >
					Dejar de seguir
				</Button>
			)
		}
		else
		{
			return (
				<Button className="btn-action" onClick={ handleFollow } >
					Seguir
				</Button>
			)
		}
	}

	const handleFollow = () =>
	{
		dispatch( userFollow( follow, username, refetch ) );
	}

	const handleUnfollow = () =>
	{
		dispatch( userUnfollow( unfollow, username, refetch ) );
	}

	return (
		<div className="user__header-profile">
			<h2>{ username }</h2>
			{
				authUsername === username
				?
					<Button onClick={ () => optionModal('settings') } >Ajustes</Button>
				:
					!loading && followOrNot()
			}
		</div>
	)
}
