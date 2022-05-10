import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { USER_UPDATE } from '../../../../gql/user';
import { user_update } from '../../../../actions/user';

import { Form, Button } from 'semantic-ui-react';

const initialValues = { currentPassword: '', newPassword: '', repeatNewPassword: '' };

export const PasswordForm = () =>
{
	/* Dispatch */
	const dispatch = useDispatch();

	/* Mutations */
	const [ userUpdate ] = useMutation( USER_UPDATE );

	/* Formik */
	const formik = useFormik(
	{ 
		initialValues,
		validationSchema: Yup.object(
		{
			currentPassword		: Yup.string().required(),
			newPassword			: Yup.string().required().oneOf([ Yup.ref('repeatNewPassword') ], "Las contraseñas no son iguales"),
			repeatNewPassword	: Yup.string().required().oneOf([ Yup.ref('newPassword') ], "Las contraseñas no son iguales")
		}),
		onSubmit: ( values ) =>
		{
			dispatch( user_update( userUpdate, values ));
		}
	});

	/* Component */
	return (
		<Form className="form__password-form" onSubmit={ formik.handleSubmit }>

			<Form.Input
				type="password"
				placeholder="Contraseña actual"
				name="currentPassword"
				value={ formik.values.currentPassword }
				error={ formik.errors.currentPassword && true }
				onChange={ formik.handleChange }
			/>
			<Form.Input 
				type="password" 
				placeholder="Nueva contraseña" 
				name="newPassword" 
				value={ formik.values.newPassword }
				error={ formik.errors.newPassword && true } 
				onChange={ formik.handleChange }
			/>
			<Form.Input 
				type="password" 
				placeholder="Repetir nueva contraseña" 
				name="repeatNewPassword" 
				value={ formik.values.repeatNewPassword }
				error={ formik.errors.repeatNewPassword && true } 
				onChange={ formik.handleChange }
			/>

			<Button type="submit" className="btn-submit">Actualizar</Button>
		</Form>
	)
}
