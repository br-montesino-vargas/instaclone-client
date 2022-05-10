import React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Form, Button } from 'semantic-ui-react';

import { ADD_COMMENT } from '../../../../gql/comment';
import { userAddComment } from '../../../../actions/user';

export const CommentForm = ({ publication }) =>
{
	/* Dispatch */
	const dispatch = useDispatch();

	/* Mutations */
	const [ addComment ] = useMutation( ADD_COMMENT );

	const formik = useFormik(
	{
		initialValues: { comment: "" },
		validationSchema: Yup.object({ comment: Yup.string().required() }),
		onSubmit: ( newComment ) =>
		{
			dispatch( userAddComment( addComment, publication, newComment ) );
			formik.handleReset();
		}
	});

	return (
		<Form className="user__form-comment" onSubmit={ formik.handleSubmit }>
			<Form.Input
				placeholder="Añade un comentario..."
				name="comment"
				value={ formik.values.comment }
				onChange={ formik.handleChange }
				error={ formik.errors.comment && true }
			/>
			<Button type="submit" >Publicar</Button>
		</Form>
	)
}
