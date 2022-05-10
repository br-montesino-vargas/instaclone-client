import React from 'react';
import { Grid } from 'semantic-ui-react';

import { Feed } from './Feed';
import { UsersNotFolloweds } from './UsersNotFolloweds';

export const HomeScreen = () =>
{
	return (
		<Grid className="main__home">
			<Grid.Column className="main__home__left" width={11}>
				<Feed />
			</Grid.Column>
			<Grid.Column className="main__home__right" width={5}>
				<UsersNotFolloweds />
			</Grid.Column>
		</Grid>
	)
}
