import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import HomeController from './controllers/HomeController';
import LobbyController from './controllers/LobbyController';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeController />,
		errorElement: <div>404 Not Found!</div>,
		children: [
			{
				path: 'lobby/:lobbyId',
				element: <LobbyController />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
	</React.StrictMode>
);
