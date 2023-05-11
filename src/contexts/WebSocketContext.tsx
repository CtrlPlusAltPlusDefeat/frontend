import React, { createContext, useContext, useEffect, useRef } from 'react';
import { SocketMessage } from '../types/socket/receive';
import { useRoute } from '../hooks/socket/route';
import { useSend } from '../hooks/socket/send';
import { useSocket } from '../hooks/socket/socket';
import { getSessionRequest } from '../stores/player/playerActions';

interface WebSocketContextObj {
	isConnected: boolean;
	send: (rawMessage: SocketMessage) => void;
}

const WebsocketContext = createContext<WebSocketContextObj>({
	isConnected: false,
	send: () => {}
});

export const WebsocketProvider = ({ children }: { children: React.ReactNode }) => {
	const ws = useRef<WebSocket | null>(null);
	const router = useRoute();
	const send = useSend(ws.current);
	const { socket, isConnected } = useSocket({
		onConnect: () => {
			send(getSessionRequest());
		},
		onMessage: router
	});

	useEffect(() => {
		ws.current = socket;
	}, [socket]);

	return (
		<WebsocketContext.Provider
			value={{
				isConnected,
				send
			}}
		>
			{children}
		</WebsocketContext.Provider>
	);
};

export const useWebsocket = () => {
	return useContext(WebsocketContext);
};
