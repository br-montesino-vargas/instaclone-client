import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import { Image } from 'semantic-ui-react';

import { GET_NOT_FOLLOWEDS } from '../../../gql/follow';
import ImageNotFound from '../../../assets/img/avatar.png';

export const UsersNotFolloweds = () =>
{
	const { data, loading } = useQuery( GET_NOT_FOLLOWEDS );

	if( loading ) return null;
	const { getNotFolloweds } = data;

	return (
		<div className="main__not-followeds">
			<h3>Usuarios que no sigues</h3>
			{ map( getNotFolloweds, ( user, index ) =>
				(
					<Link key={ index } to={ `/${ user.username }`} className="main__not-followeds__user">
						<Image src={ user.avatar || ImageNotFound } avatar />
						<span>{ user.name }</span>
					</Link>
				))
			}
		</div>
	)
}
