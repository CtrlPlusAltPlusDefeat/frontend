import React, { lazy, useCallback, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const HomeController = lazy(() => import('./controllers/HomeController'));
const GameController = lazy(() => import('./controllers/GameController'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomeController />,
		errorElement: <div>404 Not Found!</div>
	},
	{
		path: '/lobby/:lobbyId',
		element: <GameController />
	}
]);
const App = () => {
	const windowSize = useCallback(() => {
		// We listen to the resize event
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', windowSize);
		return () => {
			window.removeEventListener('resize', windowSize);
		};
	}, [windowSize]);
	return <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />;
};
export default App;
