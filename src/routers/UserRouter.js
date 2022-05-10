import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import { HomeScreen } from '../components/home/main/HomeScreen';
import { UserScreen } from '../components/home/main/UserScreen';
import { Error404 } from '../components/home/main/Error404';
import { Navbar } from '../components/home/ui/Navbar';

import { Container } from 'semantic-ui-react';

export const UserRouter = () =>
{
	return (
		<Fragment>
			<Navbar />
			<Container className="main__basic">
				<Switch>
					<Route exact path="/" component={ HomeScreen } />
					<Route exact path="/:username" component={ UserScreen } />
					<Route exact path="/error" component={ Error404 } />

					<Redirect to="/error" />
				</Switch>
			</Container>
		</Fragment>
	)
}
