import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@apollo/client';

import { Icon } from 'semantic-ui-react';

import { IS_LIKE, COUNT_LIKES, ADD_LIKE, DELETE_LIKE } from '../../../../gql/like';
import { userToogleLike } from '../../../../actions/user';

export const Actions = ({ publication: { id } }) =>
{
	/* Dispatch */
	const dispatch = useDispatch();

	/* Queries */
	const { data, loading, refetch } = useQuery( IS_LIKE, { variables: { idPublication: id } });
	const { data:dataCount, loading:loadingCount, refetch:refetchCount } = useQuery( COUNT_LIKES, { variables: { idPublication: id } });

	/* Mutation */
	const [ addLike ] = useMutation( ADD_LIKE );
	const [ deleteLike ] = useMutation( DELETE_LIKE );

	/* States */
	const [loadingAction, setLoadingAction] = useState(false);

	const onAddLike = () =>
	{
		setLoadingAction(true);
		dispatch( userToogleLike( addLike, id, refetch, refetchCount, setLoadingAction ) );
	}

	const onDeleteLike = () =>
	{
		setLoadingAction(true);
		dispatch( userToogleLike( deleteLike, id, refetch, refetchCount, setLoadingAction ) );
	}

	const onAction = () =>
	{
		if( !loadingAction )
		{
			if( isLike )
			{
				onDeleteLike();
			}
			else
			{
				onAddLike();
			}
		}
	}

	if( loading || loadingCount ) return null;
	const { isLike } = data;
	const { countLikes } = dataCount;

	return (
		<div className="user__profile-actions">
			<Icon
				className={ isLike ? "user__profile-actions-like active" : "user__profile-actions-like" }
				name={ isLike ? "heart" : "heart outline" }
				onClick={ onAction }
			/>
			{ countLikes } Me gusta
		</div>
	)
}
