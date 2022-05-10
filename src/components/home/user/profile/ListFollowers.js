import React from 'react';
import { useHistory } from 'react-router-dom';
import { size, map } from 'lodash';

import { Image } from 'semantic-ui-react';
import imageNotFound from '../../../../assets/img/avatar.png';

export const ListFollowers = ({ followers, setShow }) =>
{
	const history = useHistory();

	const goToFollower = ( username ) =>
	{
		setShow(false);
		history.push(`/${ username }`);
	}

	return (
		<div className="user__profile-list-followers">
			{
				size( followers ) === 0
				?
				(
					<p className="user__profile-list-not-users" >No se han encontrado seguidores</p>
				)
				:
				(
					map( followers, ( follower, index ) =>
					(
						<div key={ index } className="user__profile-list-users" onClick={ ()  => goToFollower( follower.username ) }>
							<Image src={ follower.avatar || imageNotFound } avatar />
							<div>
								<p>{ follower.name }</p>
								<p>{ follower.username }</p>
							</div>
						</div>
					))
				)
			}
		</div>
	)
}
