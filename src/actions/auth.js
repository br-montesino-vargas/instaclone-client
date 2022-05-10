import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

import { types } from '../types';

export const auth_login = ( authLogin, values ) =>
{
	return async ( dispatch ) =>
	{
		try
		{
			const { data } = await authLogin(
			{
				variables: { input: values }
			});

			const { token } = data.authLogin;

			localStorage.setItem('token', token );
			localStorage.setItem('token-init-date', new Date().getTime() );

			dispatch( login( jwtDecode( token )));
		}
		catch (error)
		{
			toast.error( error.message );
			console.log( error );
		}
	}
}

export const auth_register = ( authRegister, values ) =>
{
	return async ( dispatch ) =>
	{		
		try
		{
			delete values.password2;
			
			const { data } = await authRegister(
			{
				variables: { input: values }
			});

			const { token } = data.authRegister;

			localStorage.setItem('token', token );
			localStorage.setItem('token-init-date', new Date().getTime() );

			dispatch( login( jwtDecode( token )));
		}
		catch (error)
		{
			toast.error( error.message );
			console.log( error );
		}
	}
}

export const auth_renew = ( authRenew ) =>
{
	return async ( dispatch ) =>
	{
		try
		{
			const { uid:id, name, username } = jwtDecode( localStorage.getItem('token') );

			const dataUser = {
				id,
				name,
				username
			};

			const { data } = await authRenew(
			{
				variables: { input: dataUser }
			});

			const { token } = data.authRenew;

			if( token )
			{
				localStorage.setItem('token', token );
				localStorage.setItem('token-init-date', new Date().getTime() );

				dispatch( login( jwtDecode( token )));
			}
			else
			{
				localStorage.clear();
				dispatch( logout() );
			}

		}
		catch (error)
		{
			localStorage.clear();
			console.log(error);
			dispatch( clearCheck() );
		}
	}
}

export const auth_Logout = () =>
{
	return async ( dispatch ) =>
	{
		localStorage.clear();
		dispatch( logout() );
	}
};

const login = ( user ) => (
{
	type: types.authLogin,
	payload: user
});

const clearCheck = () => ({ type: types.authClearChecking });

const logout = () => ({ type: types.authLogout });