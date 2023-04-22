import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { isSocketMessage, SocketMessage, unwrapMessage, wrapMessage } from '../types/socket/socket.types';
import { getSessionRequest } from '../stores/player/playerActions';
import { useSocketRoute } from '../hooks/socketRouter';
import { devTools } from '../common/devTools';

interface WebSocketContextObj {
	isConnected: boolean;
	send: (rawMessage: SocketMessage) => void;
}

const WebsocketContext = createContext<WebSocketContextObj>({
	isConnected: false,
	send: () => {}
});

export const WebsocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [isConnected, setIsConnected] = useState(false);

	const ws = useRef<WebSocket | null>(null);
	const send = (msg: SocketMessage) => {
		if (!ws.current) {
			console.error('Not connected to socket, cannot send data');
			return;
		}
		ws.current.send(wrapMessage(msg));
	};

	const route = useSocketRoute();

	const connectToSocket = useCallback(() => {
		if (ws.current) return;
		const socket = new WebSocket('ws://localhost:8080');
		socket.onopen = () => {
			setIsConnected(true);
			send(getSessionRequest());
		};
		socket.onclose = () => {
			setIsConnected(false);
			ws.current = null;
		};
		socket.onmessage = (event) => {
			const message = unwrapMessage(event.data);
			devTools.log('onmessage', message);
			if (isSocketMessage(message)) route(message);
			else console.error('Unknown socket response:', event.data);
		};
		ws.current = socket;
	}, [route]);

	useEffect(() => {
		const interval = setInterval(() => {
			connectToSocket();
		}, 1000);

		return () => {
			clearInterval(interval);
			ws.current?.close();
		};
	}, [connectToSocket, route]);

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
