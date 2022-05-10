import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

const httpLink = createUploadLink(
{
	uri: process.env.REACT_APP_APOLLO_URL,
});

const authLink = setContext( (_, { headers }) =>
{
	
	const token = localStorage.getItem('token');
	
	return {
		headers:
		{
			...headers,
			Authorization: token ? `Bearer ${ token }` : ""
		}
	}	
});

const client = new ApolloClient(
{
	connectToDevTools: true,
	cache: new InMemoryCache(),
	link: authLink.concat( httpLink )
});

export { client };