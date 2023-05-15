import React, { useEffect } from 'react';
import Home from '../pages/Home/Home';
import { useLobbyStore } from '../../stores/lobby/lobbyStore';
import { useNavigate } from 'react-router-dom';

const HomeController = () => {
	const lobbyId = useLobbyStore((s) => s.lobbyId);
	const navigate = useNavigate();

	useEffect(() => {
		if (!lobbyId) return;
		navigate(`lobby/${lobbyId}`);
	}, [lobbyId, navigate]);

	return <Home />;
};

export default HomeController;
