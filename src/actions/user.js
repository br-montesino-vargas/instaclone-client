import { toast } from 'react-toastify';

import { types } from '../types';

export const user_update_avatar = ( userUpdateAvatar, file ) =>
{
	return async () =>
	{
		try
		{
			const { data } = await userUpdateAvatar({ variables: { file } });
			
			if( !data.userUpdateAvatar.status )
			{
				toast.error('Error al actualizar la foto de perfil');
			}
		}
		catch (error)
		{
			toast.error( error.message );
			console.log( error );
		}
	}
}

export const user_delete_avatar = ( userDeleteAvatar, setShow, setDeleting ) =>
{
	return async () =>
	{
		try
		{
			setDeleting(true);

			const { data } = await userDeleteAvatar();
			
			if( !data.userDeleteAvatar )
			{
				toast.error('Error al eliminar la foto de perfil');
			}
			else
			{
				setTimeout(() =>
				{
					setDeleting(false);
					setShow(false);
				}, 500);
			}
		}
		catch (error)
		{
			toast.error( error.message );
			console.log( error );
		}
	}
}

export const user_update = ( userUpdate, dataUpdate, setShow, refetch ) =>
{
	return async ( dispatch ) =>
	{
		const { currentPassword, newPassword } = dataUpdate;

		try
		{
			if( currentPassword && newPassword )
			{
				const { data } = await userUpdate(
				{
					variables:
					{
						input: { currentPassword, newPassword }
					}
				});
	
				if( !data.userUpdate )
				{
					toast.error('Error al actualizar la contraseña');
				}
				else
				{
					toast.success('Contraseña cambiada correctamente!');
					localStorage.clear();
					dispatch( logout() );
				}
			}
			else
			{
				await userUpdate(
				{
					variables: { input: dataUpdate }
				});

				toast.success('Modificación realizada correctamente!');
				setShow(false);
				refetch();
			}
		}
		catch (error)
		{
			toast.error( error.message );
			console.log( error );
		}
	}
}

export const userFollow = ( follow, username, refetch ) =>
{
	return async () =>
	{
		try
		{
			await follow(
			{
				variables: { username }
			});

			refetch();
		}
		catch (error)
		{
			console.log(error);
		}
	}
}

export const userUnfollow = ( unfollow, username, refetch ) =>
{
	return async () =>
	{
		try
		{
			await unfollow(
			{
				variables: { username }
			});

			refetch();
		}
		catch (error)
		{
			console.log(error);
		}
	}
}

export const userPublish = ( publish, file, setIsLoading, setShow ) =>
{
	return async () =>
	{
		try
		{
			const { data } = await publish(
			{
				variables: { file }
			});

			if( !data.publish.status )
			{
				toast.warning('Error en la publicacion');
			}
			else
			{
				setShow(false);
			}
			setIsLoading(false);
		}
		catch (error)
		{
			setIsLoading(false);
			console.log(error);
		}
	}
}

export const userAddComment = ( addComment, { id:idPublication }, { comment } ) =>
{
	return async () =>
	{
		try
		{
			await addComment(
			{
				variables: { input: { idPublication, comment } }
			});
		}
		catch (error)
		{
			console.log(error);
		}
	}
}

export const userToogleLike = ( toogleLike, idPublication, refetch, refetchCount, setLoadingAction ) =>
{
	return async () =>
	{
		try
		{
			await toogleLike(
			{
				variables: { idPublication }
			});
			
			refetch();
			refetchCount();
			
			setLoadingAction(false);
		}
		catch (error)
		{
			setLoadingAction(false);
			console.log(error);
		}
	}
}

const logout = () => ({ type: types.authLogout });