import React, { useEffect } from 'react';
import Lobby from '../components/pages/Lobby/Lobby';
import { useLoadMessages } from '../stores/chat/chatActions';
import { useLoadLobby } from '../hooks/lobbyHooks';

const LobbyController = () => {
	const status = useLoadLobby();
	const statusRef = React.useRef(status);
	const loadChat = useLoadMessages();

	useEffect(() => {
		if (status !== 'loaded') return;
		// on join lobby, load newest 50 messages
		// we use a ref to prevent loading messages on every render
		if (statusRef.current !== 'loaded') {
			loadChat(0);
			statusRef.current = status;
		}
	}, [loadChat, status]);

	if (status === 'not-found') return <div>Lobby not found...</div>;
	else if (status === 'loading') return <div>Joining...</div>;

	return <Lobby />;
};
export default LobbyController;
