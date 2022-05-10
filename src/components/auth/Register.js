import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import * as Yup from 'yup';

import { Form, Button } from 'semantic-ui-react';
import { AUTH_REGISTER } from '../../gql/user';
import { auth_register } from '../../actions/auth';

import { useDispatch } from 'react-redux';

const initialValues = { name: '', username: '', email: '', password: '', password2: '' };
const textForRequired = 'Este campo es obligatorio.';

export const Register = () =>
{
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);

	const [ authRegister ] = useMutation( AUTH_REGISTER );

	const formik = useFormik(
	{
		initialValues,
		validationSchema: Yup.object(
		{
			name:		Yup.string().required( textForRequired ),
			username: 	Yup.string().required( textForRequired ).matches( /^[a-zA-Z0-9-]*$/, "El nombre de usuario no puede tener espacios."),
			email: 		Yup.string().required( textForRequired ).email("El email no es válido"),
			password: 	Yup.string().required( textForRequired ).oneOf([ Yup.ref('password2') ], "Las contraseñas no son iguales"),
			password2: 	Yup.string().required( textForRequired ).oneOf([ Yup.ref('password') ], "Las contraseñas no son iguales")
		}),
		onSubmit: async ( values ) =>
		{
			setLoading(true);

			dispatch( auth_register( authRegister, values ) );

			setLoading(false);
		}
	});

	return (
		<Fragment>
			<div className="auth__container-form">
				<h2 className="auth__title">Regístrate para ver fotos y videos de tus amigos.</h2>
				<Form className="auth__form" onSubmit={ formik.handleSubmit }>

					<Form.Input
						type="text"
						placeholder="Nombre y apellidos"
						name="name"
						onChange={ formik.handleChange }
						autoComplete="off"
						error={ formik.errors.name && true }
					/>
					<Form.Input
						type="text"
						placeholder="Nombre de usuario"
						name="username"
						onChange={ formik.handleChange }
						autoComplete="off"
						error={ formik.errors.username && true }
					/>
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
					<Form.Input
						type="password"
						placeholder="Repetir contraseña"
						name="password2"
						onChange={ formik.handleChange }
						autoComplete="off"
						error={ formik.errors.password2 && true }
					/>

					<Button type="submit" className="btn-submit" disabled={ loading }>Registrar</Button>
				</Form>
			</div>

			<div className="auth__change-form">
				<p>
					¿Ya tienes una cuenta?
					<span>
						<Link to="/auth/login">
							Inicia sesión
						</Link>
					</span>
				</p>
			</div>
		</Fragment>
	)
}
