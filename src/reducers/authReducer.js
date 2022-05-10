import { types } from '../types';

const initialState = {
	check : true
}

export const authReducer = ( state = initialState, action ) =>
{
	switch ( action.type )
	{
		case types.authLogin:
			return {

				...state,
				...action.payload,
				check: false
			}

		case types.authClearChecking:

			return {
				...state,
				check: false
			}

		case types.authLogout:

			return {
				check: false
			}
	
		default:
			return state;
	}
}