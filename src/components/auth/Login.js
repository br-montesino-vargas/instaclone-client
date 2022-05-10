import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Form, Button } from 'semantic-ui-react';

import { useMutation } from '@apollo/client';
import { AUTH_LOGIN } from '../../gql/user';

import { auth_login } from '../../actions/auth';

const initialValues = { email: '', password: '' };
const textForRequired = 'Este campo es obligatorio.';

export const Login = () =>
{
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);

	const [ authLogin ] = useMutation( AUTH_LOGIN );

	const formik = useFormik({ 
		initialValues,
		validationSchema: Yup.object(
		{
			email: 		Yup.string().required( textForRequired ).email("El email no es válido"),
			password: 	Yup.string().required( textForRequired )
		}),
		onSubmit: ( values ) =>
		{
			setLoading(true);

			dispatch( auth_login( authLogin, values ) );

			setLoading(false);
		}
	});

	return (
		<Fragment>
			<div className="auth__container-form">
				<h2 className="auth__title">Entra para ver fotos y videos de tus amigos.</h2>
				<Form className="auth__form" onSubmit={ formik.handleSubmit }>

					<Form.Input
						type="text"
						placeholder="Email"
						name="email"
						onChange={ formik.handleChange }
						autoComplete="off"
						error={ formik.errors.email && true }
					/>
					<Form.Input
						type="password"
						placeholder="Contraseña"
						name="password"
						onChange={ formik.handleChange }
						autoComplete="off"
						error={ formik.errors.password && true }
					/>
					
					<Button type="submit" className="btn-submit" disabled={ loading }>Iniciar sesión</Button>
				</Form>
			</div>

			<div className="auth__change-form">
				<p>
					¿No tienes una cuenta?
					<span>
						<Link to="/auth/register">
							Regístrate
						</Link>
					</span>
				</p>
			</div>
		</Fragment>
	)
}
