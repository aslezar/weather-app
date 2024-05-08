import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { client_id } from '../config';
import { ToastContainer } from 'react-toastify';

//CSS
import './global.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<GoogleOAuthProvider clientId={client_id}>
				<ToastContainer
					position='top-center'
					theme='dark'
					autoClose={2500}
				/>
				<App />
			</GoogleOAuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
