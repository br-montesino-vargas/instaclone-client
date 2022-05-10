import React, { useEffect, Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import { size } from 'lodash';

import { ModalBasic } from '../../ui/ModalBasic';
import { ListFollowers } from './ListFollowers';
import { ListFolloweds } from './ListFolloweds';

import { GET_FOLLOWERS, GET_FOLLOWEDS } from '../../../../gql/follow';

export const Followers = ({ username, totalPublication }) =>
{
	const [ show, setShow ] = useState(false);
	const [ title, setTitle ] = useState('');
	const [ children, setChildren ] = useState(null);

	const { data: dataFollowers, loading: loadingFollowers, startPolling: startPollingFollowers, stopPolling: stopPollingFollowers } = useQuery( GET_FOLLOWERS,
	{
		variables: { username }
	});

	const { data: dataFolloweds, loading: loadingFolloweds, startPolling: startPollingFolloweds, stopPolling: stopPollingFolloweds } = useQuery( GET_FOLLOWEDS,
	{
		variables: { username }
	});

	useEffect(() =>
	{
		startPollingFollowers( 1000 );

		return () =>
		{
			startPollingFollowers();
		}

	}, [ startPollingFollowers, stopPollingFollowers ]);

	useEffect(() =>
	{
		startPollingFolloweds( 1000 );

		return () =>
		{
			stopPollingFolloweds();
		}

	}, [ startPollingFolloweds, stopPollingFolloweds ]);
	
	if( loadingFollowers || loadingFolloweds ) return null;
	
	const { getFollowers } = dataFollowers;
	const { getFolloweds } = dataFolloweds;

	const openFollowers = () =>
	{
		setShow(true);
		setTitle('Seguidores');
		setChildren( <ListFollowers followers={ getFollowers } setShow={ setShow } /> );
	}

	const openFolloweds = () =>
	{
		setShow(true);
		setTitle('Usuarios seguidos');
		setChildren( <ListFolloweds followeds={ getFolloweds } setShow={ setShow } /> );
	}

	return (
		<Fragment>
			<div className="user__profile-followers">
				<p>
					<span>{ totalPublication }</span> publicaciones
				</p>
				<p className="user__profile-followers-list" onClick={ openFollowers } >
					<span>{ size( getFollowers ) }</span> seguidores
				</p>
				<p className="user__profile-followers-list" onClick={ openFolloweds }>
				<span>{ size( getFolloweds ) }</span> seguidos
				</p>
			</div>

			<ModalBasic show={ show } setShow={ setShow } title={ title } >
				{ children }
			</ModalBasic>
		</Fragment>
	)
}
