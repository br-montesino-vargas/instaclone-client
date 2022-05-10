import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import  { Grid, Image } from 'semantic-ui-react';

import { GET_USER } from '../../../gql/user';

import { UserNotFound } from '../main/UserNotFound';
import { ModalBasic } from '../ui/ModalBasic';

import { AvatarForm } from './form/AvatarForm';
import { SettingsForm } from './form/SettingsForm';
import { HeaderProfile } from './profile/HeaderProfile';
import { Followers } from './profile/Followers';

import imageNotFound from '../../../assets/img/avatar.png';

export const UserProfile = ({ username, totalPublication }) =>
{
	/* Selector */
	const auth = useSelector(state => state.auth);


	/* States */
	const [show, setShow] = useState(false);
	const [title, setTitle] = useState("");
	const [children, setChildren] = useState(null);


	/* Query */
	const { data, loading, refetch } = useQuery( GET_USER,
	{
		variables: { username }
	});


	/* Validations */
	if( loading ) return null;
	const { getUser } = data;

	if( !getUser ) return <UserNotFound />;
	const { name, website, description, avatar } = getUser;


	/* Functions */
	const optionModal = ( type ) =>
	{
		switch ( type )
		{
			case 'avatar':
			
				setTitle("Cambiar foto de perfil");
				setChildren( <AvatarForm setShow={ setShow } /> );
				setShow( true );

			break;

			case 'settings':

				setTitle("Modificar");
				setChildren( <SettingsForm setShow={ setShow } setTitle={ setTitle } setChildren={ setChildren } user={ getUser } refetch={ refetch } /> );
				setShow( true );

			break;
		
			default:
			break;
		}
	}


	/* Component */
	return (
		<Fragment>
			<Grid className="main__profile">

				<Grid.Column width={5} className="main__profile-avatar">
					<Image src={ avatar ? avatar : imageNotFound } avatar onClick={ () => username === auth.username && optionModal('avatar') } />
				</Grid.Column>

				<Grid.Column width={11} className="main__profile-content">
					
					<HeaderProfile username={ username } optionModal={ optionModal } />
					<Followers username={ username } totalPublication={ totalPublication } />

					<div className="main__profile-other">
						<p className="main__profile-name">{ name }</p>

						{ website && ( <a href={ website } target="_blank" rel="noopener noreferrer" className="main__profile-website" >{ website }</a> )}

						{ description && ( <p className="main__profile-description" >{ description }</p> ) }

					</div>

				</Grid.Column>

			</Grid>

			<ModalBasic show={ show } setShow={ setShow } title={ title }>
				{ children }
			</ModalBasic>

		</Fragment>
	)
}
