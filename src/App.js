import React from 'react';
import { client } from './gql/config/apollo';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';

import { AppRouter } from './routers/AppRouter';
import { store } from './store';

export const App = () =>
{
	return (
		<ApolloProvider client={ client }>
			<Provider store={ store }>
				<AppRouter />
			</Provider>
			<ToastContainer
				position="top-center" 
				autoClose={ 2500 }
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={ false }
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</ApolloProvider>
	);
};