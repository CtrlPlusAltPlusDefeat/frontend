import React, { createContext, useContext } from 'react';
import { useRoute } from '../hooks/routeHooks';
import { SocketMessage, useSocket } from '../hooks/socket';

interface WebSocketContextObj {
	isConnected: boolean;
	send: (rawMessage: SocketMessage, waitForResponse?: boolean) => void;
	loading: boolean;
}

const WebsocketContext = createContext<WebSocketContextObj>({
	isConnected: false,
	send: () => {},
	loading: false
});

export const WebsocketProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRoute();
	const { isConnected, send, loading } = useSocket(router);
	return (
		<WebsocketContext.Provider
			value={{
				isConnected,
				send,
				loading
			}}
		>
			{children}
		</WebsocketContext.Provider>
	);
};

export const useWebsocket = () => {
	return useContext(WebsocketContext);
};
