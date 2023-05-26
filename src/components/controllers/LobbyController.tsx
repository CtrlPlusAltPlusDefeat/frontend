import React, { useEffect } from 'react';
import Lobby from '../pages/Lobby/Lobby';
import { useLoadLobby } from '../../hooks/loadLobby/loadLobby';
import { useLoadMessages } from '../../stores/chat/chatActions';

const LobbyController = () => {
	const status = useLoadLobby();
	const statusRef = React.useRef(status);
	const loadChat = useLoadMessages();

	useEffect(() => {
		if (status !== 'joined') return;
		// on join lobby, load newest 50 messages
		// we use a ref to prevent loading messages on every render
		if (statusRef.current !== 'joined') {
			loadChat(0);
			statusRef.current = status;
		}
	}, [loadChat, status]);

	if (status === 'not-found') return <div>Lobby not found...</div>;
	else if (status === 'joining') return <div>Joining...</div>;

	return <Lobby />;
};
export default LobbyController;
