import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { size } from 'lodash';

import { GET_USERS } from '../../../gql/user';

import { Search as SearchSU } from 'semantic-ui-react';
import { UserSearch } from './UserSearch';

export const Search = () =>
{
	const [search, setSearch] = useState(null);
	const [users, setUsers] = useState([]);

	const { data, loading } = useQuery( GET_USERS,
	{
		variables: { name: search }
	});

	useEffect(() =>
	{
		if( size(data?.getUsers) )
		{
			const result = [];

			data.getUsers.forEach(( user, index ) =>
			{
				result.push(
				{
					key: index,
					title: user.name,
					username: user.username,
					avatar: user.avatar
				});
			});

			setUsers( result );
		}
		else
		{
			setUsers([]);
		}

	}, [ data ]);

	const onChange = ( e ) =>
	{
		if( e.target.value )
		{
			setSearch( e.target.value );
		}
		else
		{
			setSearch( null );
		}
	}

	const clearSearch = () =>
	{
		setSearch(null);
		setUsers([]);
	}

	return (
		<SearchSU
			className="ui__search"
			fluid
			input={{ icon: "search", iconPosition: "left" }}
			loading={ loading }
			value={ search || "" }
			onSearchChange={ onChange }
			onResultSelect={ clearSearch }
			results={ users }
			resultRenderer={ (e) => <UserSearch user={ e } /> }
		/>
	)
}
