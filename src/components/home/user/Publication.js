import React from 'react';
import { Grid } from 'semantic-ui-react';
import { map } from 'lodash';

import { PreviewPublication } from './profile/PreviewPublication';

export const Publication = ({ publications }) =>
{
	return (
		<div>
			<h1>Publicaciones</h1>
			<Grid columns={4}>
				{ map( publications, ( publication, index ) =>
					(
						<Grid.Column key={ index }>
							<PreviewPublication publication={ publication } />
						</Grid.Column>
					))
				}
			</Grid>
		</div>
	)
}
