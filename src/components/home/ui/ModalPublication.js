import React from 'react';
import { Modal, Grid } from 'semantic-ui-react';

import { Comments } from '../user/publication/Comments';
import { CommentForm } from '../user/form/CommentForm';
import { Actions } from '../user/publication/Actions';

export const ModalPublication = ({ show, setShow, publication }) =>
{
	/* Destructuring */
	const { file } = publication;

	/* Functions */
	const closeModal = () => setShow(false);

	/* Components */
	return (
		<Modal open={ show } onClose={ closeModal } className="ui__modal-publication" >
			<Grid>
				<Grid.Column className="ui__modal-publication__left" width={10} style={{ backgroundImage: `url("${ file }")` }} />
				<Grid.Column className="ui__modal-publication__right" width={6}>
					<Comments publication={ publication } />
					<Actions publication={ publication } />
					<CommentForm publication={ publication } />
				</Grid.Column>
			</Grid>
		</Modal>
	)
}
