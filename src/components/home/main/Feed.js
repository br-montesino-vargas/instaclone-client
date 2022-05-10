import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { Image } from 'semantic-ui-react';

import { Actions } from '../user/publication/Actions';
import { CommentForm } from '../user/form/CommentForm';
import { ModalPublication } from '../ui/ModalPublication';

import { PUBLICATIONS_FOLLOWEDS } from '../../../gql/publication';
import ImageNotFound from '../../../assets/img/avatar.png';

export const Feed = () =>
{
	const [showModal, setShowModal] = useState(false);
	const [publicationSelect, setPublicationSelect] = useState(false);
	const { data, loading, startPolling, stopPolling } = useQuery( PUBLICATIONS_FOLLOWEDS );

	useEffect(() =>
	{
		startPolling(1000);

		return () =>
		{
			stopPolling();
		}

	}, [ startPolling, stopPolling ]);

	if( loading ) return null;
	const { getPublicationsFolloweds } = data;

	/* Functions */
	const openPublication = ( publication ) =>
	{
		setPublicationSelect( publication );
		setShowModal(true);
	}

	return (
		<>
			<div className="main__feed">
				{ map( getPublicationsFolloweds, ( publication, index ) =>
					(
						<div key={ index } className="main__feed__box" >
							<Link to={ `/${ publication.idUser.username }` }>
								<div className="main__feed__box-user">
									<Image
										src={ publication.idUser.avatar || ImageNotFound }
										avatar
									/>
									<span>{ publication.idUser.name }</span>
								</div>
							</Link>
							<div
								className="main__feed__box-photo"
								style={{ backgroundImage: `url("${ publication.file }")` }}
								onClick={ () => openPublication( publication ) }
							/>
							<div className="main__feed__box-actions">
								<Actions publication={ publication } />
							</div>
							<div className="main__feed__box-form">
								<CommentForm publication={ publication } />
							</div>
						</div>
					))
				}
			</div>
			{ showModal &&
				(
					<ModalPublication
						show={ showModal }
						setShow={ setShowModal }
						publication={ publicationSelect }
					/>
				)
			}
		</>
	)
}
