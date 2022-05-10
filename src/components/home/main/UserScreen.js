import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { size } from 'lodash';

import { UserProfile } from '../user/UserProfile';
import { Publication } from '../user/Publication';

import { GET_PUBLICATIONS } from '../../../gql/publication';

export const UserScreen = () =>
{
	const { username } = useParams();

	const { data, loading, startPolling, stopPolling } = useQuery( GET_PUBLICATIONS,
	{
		variables: { username }
	});

	useEffect(() =>
	{
		startPolling(1000);

		return () =>
		{
			stopPolling();
		}
		
	}, [ startPolling, stopPolling ]);

	if( loading ) return null;
	if( data === undefined ) localStorage.clear();
	
	const { getPublicationsForUsername } = data;

	return (
		<div>
			<UserProfile username={ username } totalPublication={ size( getPublicationsForUsername ) } />
			<Publication publications={ getPublicationsForUsername } />
		</div>
	)
}
