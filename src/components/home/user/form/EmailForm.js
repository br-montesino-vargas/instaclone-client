import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'semantic-ui-react';

import { USER_UPDATE } from '../../../../gql/user';
import { user_update } from '../../../../actions/user';

export const EmailForm = ({ currentEmail, setShow, refetch }) =>
{
	/* Dispatch */
	const dispatch = useDispatch();

	/* Mutations */
	const [ userUpdate ] = useMutation( USER_UPDATE );

	/* Formik */
	const formik = useFormik(
	{ 
		initialValues : { email: currentEmail || '' },
		validationSchema: Yup.object(
		{
			email : Yup.string().required().email()
		}),
		onSubmit: ( values ) =>
		{
			dispatch( user_update( userUpdate, values, setShow, refetch ));
		}
	});

	return (
		<Form className="form__password-form" onSubmit={ formik.handleSubmit }>
			<Form.Input
				placeholder="Email"
				name="email"
				value={ formik.values.email }
				error={ formik.errors.email && true }
				onChange={ formik.handleChange }
			/>

			<Button type="submit" className="btn-submit">Actualizar</Button>
		</Form>
	)
}
