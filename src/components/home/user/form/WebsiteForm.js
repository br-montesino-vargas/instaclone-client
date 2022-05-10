import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'semantic-ui-react';

import { USER_UPDATE } from '../../../../gql/user';
import { user_update } from '../../../../actions/user';

export const WebsiteForm = ({ currentWebsite, setShow, refetch }) =>
{
	/* Dispatch */
	const dispatch = useDispatch();

	/* Mutations */
	const [ userUpdate ] = useMutation( USER_UPDATE );

	/* Formik */
	const formik = useFormik(
	{ 
		initialValues : { website: currentWebsite || '' },
		validationSchema: Yup.object(
		{
			website : Yup.string().required()
		}),
		onSubmit: ( values ) =>
		{
			dispatch( user_update( userUpdate, values, setShow, refetch ));
		}
	});

	return (
		<Form className="form__password-form" onSubmit={ formik.handleSubmit }>
			<Form.Input
				placeholder="Sitio Web"
				name="website"
				value={ formik.values.website }
				error={ formik.errors.website && true }
				onChange={ formik.handleChange }
			/>

			<Button type="submit" className="btn-submit">Actualizar</Button>
		</Form>
	)
}
