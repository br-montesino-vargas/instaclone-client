import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';

import ImageNotFound from '../../../assets/img/avatar.png';

export const UserSearch = ({ user }) =>
{
	return (
		<Link className="ui__search-item" to={ `/${ user.username }` }>
			<Image src={ user.avatar || ImageNotFound } />
			<div>
				<p>{ user.title }</p>
				<p>{ user.username }</p>
			</div>
		</Link>
	)
}
