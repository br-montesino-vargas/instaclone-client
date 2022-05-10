import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';

import { AuthRouter } from './AuthRouter';
import { UserRouter } from './UserRouter';

import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { AUTH_RENEW } from '../gql/user';

import { auth_renew } from '../actions/auth';

export const AppRouter = () =>
{
	const dispatch = useDispatch();
	const { check, uid } = useSelector(state => state.auth);

	const [ authRenew ] = useMutation( AUTH_RENEW );

	useEffect( () =>
	{
		dispatch( auth_renew( authRenew ) );

	}, [dispatch, authRenew]);

	if( check )
	{
		return 	<div className="ui__loader-center">
					<div className="lds-hourglass"></div>
				</div>
	}

	return (
		<Router>
			<Switch>

				<PublicRoute
					path="/auth"
					component={ AuthRouter }
					isAuthenticated={ !!uid }
				/>

				<PrivateRoute
					path="/"
					component={ UserRouter }
					isAuthenticated={ !!uid }
				/>

				<Redirect to="/auth/login" />
			</Switch>
		</Router>
	)
}
