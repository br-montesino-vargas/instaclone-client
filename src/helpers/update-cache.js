import { useMutation } from '@apollo/client';

const UpdateCache = ( method, query, username ) =>
{
	useMutation( method,
	{
		update( cache, { data: { method } })
		{
			const { getUser } = cache.readQuery(
			{
				query: query,
				variables: { username }
			});
		
			cache.writeQuery(
			{
				query: query,
				variables: { username },
				data:
				{
					getUser: { ...getUser, avatar: method.urlAvatar }
				}
			});
		}
	});
}

export { UpdateCache };