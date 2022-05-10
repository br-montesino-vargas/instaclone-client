import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { Image } from 'semantic-ui-react';

import { GET_COMMENTS } from '../../../../gql/comment';

import ImageNotFound from '../../../../assets/img/avatar.png';

export const Comments = ({ publication }) =>
{
	/* Destructuring */
	const { id } = publication;

	/* Queries */
	const { data, loading, startPolling, stopPolling } = useQuery( GET_COMMENTS,
	{
		variables: { idPublication: id }
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
	const { getCommentsForID } = data;


	return (
		<div className="user__publication-comments">
			{ map( getCommentsForID, ( comment, index ) =>
				(
					<Link key={ index } to={ `/${ comment.idUser.username }` } className="user__publication-comments__comment" >
						<Image src={ comment.idUser.avatar || ImageNotFound } avatar />
						<div>
							<p>{ comment.idUser.username }</p>
							<p>{ comment.comment }</p>
						</div>
					</Link>
				))
			}
		</div>
	)
}
