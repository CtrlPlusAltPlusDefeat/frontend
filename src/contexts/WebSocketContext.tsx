import React, { createContext, useContext } from 'react';
import { SocketMessage } from '../types/socket/receive';
import { useRoute } from '../hooks/socket/route';
import { useSocket } from '../hooks/socket/socket';

interface WebSocketContextObj {
	isConnected: boolean;
	send: (rawMessage: SocketMessage) => void;
}

const WebsocketContext = createContext<WebSocketContextObj>({
	isConnected: false,
	send: () => {}
});

export const WebsocketProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRoute();
	const { isConnected, send } = useSocket(router);
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
