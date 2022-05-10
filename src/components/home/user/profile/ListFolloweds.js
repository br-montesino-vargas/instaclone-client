import React from 'react';
import { useHistory } from 'react-router-dom';
import { size, map } from 'lodash';

import { Image } from 'semantic-ui-react';
import imageNotFound from '../../../../assets/img/avatar.png';

export const ListFolloweds = ({ followeds, setShow }) =>
{
	const history = useHistory();

	const goToFollowed = ( username ) =>
	{
		setShow(false);
		history.push(`/${ username }`);
	}

	return (
		<div className="user__profile-list-followers">
			{
				size( followeds ) === 0
				?
				(
					<p className="user__profile-list-not-users" >No se han encontrado seguidos</p>
				)
				:
				(
					map( followeds, ( followed, index ) =>
					(
						<div key={ index } className="user__profile-list-users" onClick={ ()  => goToFollowed( followed.username ) }>
							<Image src={ followed.avatar || imageNotFound } avatar />
							<div>
								<p>{ followed.name }</p>
								<p>{ followed.username }</p>
							</div>
						</div>
					))
				)
			}
		</div>
	)
}
