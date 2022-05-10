import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';

import { Container, Image } from 'semantic-ui-react';
import logo from '../assets/img/instaclone.png';

export const AuthRouter = () =>
{
	return (
		<Container fluid className="auth__container">
			<Image src={ logo } />
			<Switch>
				<Route exact path="/auth/login" component={ Login } />
				<Route exact path="/auth/register" component={ Register } />

				<Redirect to="/auth/login" />
			</Switch>
		</Container>
	)
}
