import React, {useState} from 'react';
import { Image } from 'semantic-ui-react';

import { ModalPublication } from '../../ui/ModalPublication';

export const PreviewPublication = ({ publication }) =>
{
	const { file } = publication;

	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className="user__preview-publication" onClick={ () => setShowModal(true) }>
				<Image src={ file } className="user__preview-publication__image" />
			</div>
			<ModalPublication  show={ showModal } setShow={ setShowModal } publication={ publication } />
		</>
	)
}
