import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from 'semantic-ui-react';

import { AdminScreen } from '../components/admin/AdminScreen';

export const MainRouter = () =>
{
	return (
		<Container>
			<Switch>
				<Route exact path="/" component={ AdminScreen } />

				<Redirect to="/" />
			</Switch>
		</Container>
	)
}