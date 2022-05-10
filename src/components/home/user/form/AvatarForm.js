import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'semantic-ui-react';
import { USER_UPDATE_AVATAR, GET_USER, USER_DELETE_AVATAR } from '../../../../gql/user';
import { user_update_avatar, user_delete_avatar } from '../../../../actions/user';


export const AvatarForm = ({ setShow }) =>
{
	/* Dispatch & Selector */
	const dispatch = useDispatch();
	const { username } = useSelector(state => state.auth);


	/* Mutations */
	const [ userUpdateAvatar ] = useMutation( USER_UPDATE_AVATAR,
	{
		update( cache, { data: { userUpdateAvatar } })
		{
			const { getUser } = cache.readQuery(
			{
				query: GET_USER,
				variables: { username }
			});

			cache.writeQuery(
			{
				query: GET_USER,
				variables: { username },
				data:
				{
					getUser: { ...getUser, avatar: userUpdateAvatar.urlAvatar }
				}
			})
		}
	});

	const [ userDeleteAvatar ] = useMutation( USER_DELETE_AVATAR,
	{
		update( cache )
		{
			const { getUser } = cache.readQuery(
			{
				query: GET_USER,
				variables: { username }
			});

			cache.writeQuery(
			{
				query: GET_USER,
				variables: { username },
				data:
				{
					getUser: { ...getUser, avatar: "" }
				}
			})
		}
	});

	/* States */
	const [uploading, setUploading] = useState(false);
	const [deleting, setDeleting] = useState(false);
	
	const onDrop = useCallback(( file ) =>
	{
		setUploading(true);
		dispatch( user_update_avatar( userUpdateAvatar, file[0] ));
		
		setTimeout(() =>
		{
			setUploading(false);
			setShow(false);
			
		}, 3000);

	}, [ dispatch, userUpdateAvatar, setShow ]);

	const onDeleteAvatar = () =>
	{
		dispatch( user_delete_avatar( userDeleteAvatar, setShow, setDeleting ));
	}

	const { getRootProps, getInputProps } = useDropzone(
	{
		accept: 'image/jpeg, image/png',
		noKeyboard: true,
		multiple: false,
		onDrop
	});

	// Component
	return (
		<div className="form__avatar-form">
			<Button { ...getRootProps() } loading={ uploading } disabled={ deleting } >Actualizar foto de perfil</Button>
			<Button onClick={ onDeleteAvatar } loading={ deleting } disabled={ uploading }>Eliminar foto de perfil</Button>
			<Button onClick={ () => setShow( false ) } disabled={ uploading || deleting } >Cancelar</Button>

			<input { ...getInputProps() } />
		</div>
	)
}
