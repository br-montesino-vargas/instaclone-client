import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Icon, Image, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useApolloClient } from '@apollo/client';

import { GET_USER } from '../../../gql/user';
import { auth_Logout } from '../../../actions/auth';

import { ModalUpload } from './ModalUpload';

import imageNotFound from '../../../assets/img/avatar.png';

export const Options = () =>
{
	/* Dispatch, ApolloClient & Selector */
	const dispatch = useDispatch();
	const client = useApolloClient();
	const { username } = useSelector(state => state.auth);

	const [show, setShow] = useState(false);

	/* Query */
	const { data, loading } = useQuery( GET_USER,
	{
		variables: { username }
	});
	
	/* Validations */
	if( loading ) return null;
	
	const { getUser } = data;
	const { avatar } = getUser;


	/* Functions */
	const onLogout = () =>
	{
		client.clearStore();
		dispatch( auth_Logout() );
	}

	/* Component */
	return (
		<>
			<div className="ui__options">
				<Link to="/">
					<Icon name="home" />
				</Link>
				
				<Icon name="plus" onClick={ () => setShow(true) } />

				<Link to={ `/${ username }` }>
					<Image src={ avatar ? avatar : imageNotFound } avatar />
				</Link>
			</div>
			<div className="ui__logout">
				<Button animated='vertical' onClick={ onLogout }>
					<Button.Content hidden>Salir</Button.Content>
					<Button.Content visible>
						<Icon name='power off' />
					</Button.Content>
				</Button>
			</div>
			<ModalUpload  show={ show } setShow={ setShow }  />
		</>
	)
}
