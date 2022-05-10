import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import { Modal, Icon, Button, Dimmer, Loader } from 'semantic-ui-react';

import { PUBLISH } from '../../../gql/publication';
import { userPublish } from '../../../actions/user';

export const ModalUpload = ({ show, setShow }) =>
{
	/* Dispatch */
	const dispatch = useDispatch();

	/* States */
	const [fileUpload, setFileUpload] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	/* Mutations */
	const [ publish ] = useMutation( PUBLISH );

	/* Dropzone */
	const onDrop = useCallback((acceptedFile) =>
	{
		const file = acceptedFile[0];

		setFileUpload(
		{
			type: "image",
			file,
			preview: URL.createObjectURL( file )
		});
	}, []);

	const { getRootProps, getInputProps } = useDropzone(
	{
		accept: "image/jepg, image/png",
		noKeyboard: true,
		multiple: false,
		onDrop
	});

	/* Functions */
	const onPublish = () =>
	{
		setIsLoading(true);
		dispatch( userPublish( publish, fileUpload.file, setIsLoading, setShow ));
		setFileUpload(null);
	}

	return (
		<Modal size="small" open={ show } onClose={ () => setShow(false) } className="ui__modal-upload">
			<div { ...getRootProps() } className="ui__modal-upload-dropzone" style={ fileUpload && { border: 0 }}>

				{ !fileUpload &&
				(
					<>
						<Icon name="cloud upload" />
						<p>Arrastra la foto que quieras publicar!</p>
					</>
				)}
				<input { ...getInputProps() } />
			</div>

			{ fileUpload?.type === "image" &&
				(
					<div className="ui__modal-image" style={{ backgroundImage: `url("${ fileUpload.preview }")` }} />
				)
			}

			{ fileUpload &&
			(
				<Button className="btn-upload btn-action" onClick={ onPublish }>
					Publicar
				</Button>
			)}

			{ isLoading &&
			(
				<Dimmer active className="publishing">
					<Loader />
					<p>Publicando...</p>
				</Dimmer>
			)}
		</Modal>
	)
}
