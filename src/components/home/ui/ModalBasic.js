import React from 'react';
import { Modal } from 'semantic-ui-react';

export const ModalBasic = ({ show, setShow, title, children }) =>
{
	const onClose = () =>
	{
		setShow(false);
	}

	return (
		<Modal size="mini" open={ show } onClose={ onClose } className="ui__modal">
			{ title && <Modal.Header>{ title }</Modal.Header> }
			{ children }
		</Modal>
	)
}
