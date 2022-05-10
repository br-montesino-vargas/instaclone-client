import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, TextArea } from 'semantic-ui-react';

import { USER_UPDATE } from '../../../../gql/user';
import { user_update } from '../../../../actions/user';

export const DescriptionForm = ({ currentDescription, setShow, refetch }) =>
{
	/* Dispatch */
	const dispatch = useDispatch();

	/* Mutations */
	const [ userUpdate ] = useMutation( USER_UPDATE );

	/* Formik */
	const formik = useFormik(
	{ 
		initialValues : { description: currentDescription || '' },
		validationSchema: Yup.object(
		{
			description : Yup.string().required()
		}),
		onSubmit: ( values ) =>
		{
			dispatch( user_update( userUpdate, values, setShow, refetch ));
		}
	});

	return (
		<Form className="form__password-form" onSubmit={ formik.handleSubmit }>
			<TextArea
				placeholder="Descripción..."
				name="description"
				value={ formik.values.description }
				className={ formik.errors.description && "error" }
				onChange={ formik.handleChange }
			/>

			<Button type="submit" className="btn-submit">Actualizar</Button>
		</Form>
	)
}
