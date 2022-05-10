import React from 'react';

import { Button } from 'semantic-ui-react';

import { PasswordForm } from './PasswordForm';
import { EmailForm } from './EmailForm';
import { DescriptionForm } from './DescriptionForm';
import { WebsiteForm } from './WebsiteForm';

export const SettingsForm = ({ setShow, setTitle, setChildren, user: { email, description, website }, refetch }) =>
{
	/* Functions  */
	const changeModalPass = () =>
	{
		setTitle('Cambiar contraseña');
		setChildren( <PasswordForm /> )
	}

	const changeModalEmail = () =>
	{
		setTitle('Cambiar email');
		setChildren( <EmailForm currentEmail={ email } setShow={ setShow } refetch={ refetch } /> )
	}

	const changeModalDescription = () =>
	{
		setTitle('Cambiar descripción');
		setChildren( <DescriptionForm currentDescription={ description } setShow={ setShow } refetch={ refetch } /> )
	}

	const changeModalWebsite = () =>
	{
		setTitle('Cambiar sitio web');
		setChildren( <WebsiteForm currentWebsite={ website } setShow={ setShow } refetch={ refetch } /> )
	}

	return (
		<div className="form__settings-form">
			<Button onClick={ changeModalEmail } >Email</Button>
			<Button onClick={ changeModalDescription } >Descripción</Button>
			<Button onClick={ changeModalWebsite } >Sitio Web</Button>
			<Button onClick={ changeModalPass } >Contraseña</Button>
			<Button onClick={ () => setShow(false) }>Cancelar</Button>
		</div>
	)
}
