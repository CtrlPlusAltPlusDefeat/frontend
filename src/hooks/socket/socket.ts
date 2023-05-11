import { useCallback, useEffect, useRef, useState } from 'react';

const socketEndpoint: string = import.meta.env.VITE_SOCKET_ENDPOINT ?? 'wss://35hlhhl6z3.execute-api.eu-west-2.amazonaws.com/default';
const socketRetryTime: number = Number(import.meta.env.VITE_SOCKET_RETRY_TIME) ?? 10000;

interface ConnectionHandlers {
	onMessage?: (msg: string) => void;
	onConnect?: () => void;
	onDisconnect?: () => void;
}

const useConnectToSocket = (ws: WebSocket | null, { onConnect, onDisconnect, onMessage }: ConnectionHandlers) => {
	return useCallback(() => {
		if (ws) return null;
		const socket = new WebSocket(socketEndpoint);
		socket.onopen = () => {
			onConnect?.();
		};
		socket.onclose = () => {
			onDisconnect?.();
		};
		socket.onmessage = (event) => {
			onMessage?.(event.data);
		};
		return socket;
	}, [onConnect, onDisconnect, onMessage, ws]);
};

export const useSocket = ({ onMessage, onConnect, onDisconnect }: ConnectionHandlers) => {
	const [isConnected, setIsConnected] = useState(false);
	const ws = useRef<WebSocket | null>(null);

	//connect to socket
	const connectToSocket = useConnectToSocket(ws.current, {
		onConnect: () => {
			setIsConnected(true);
			onConnect?.();
		},
		onDisconnect: () => {
			ws.current = null;
			setIsConnected(false);
			onDisconnect?.();
		},
		onMessage
	});

	//connect to socket on interval
	useEffect(() => {
		const interval = setInterval(() => {
			ws.current = connectToSocket();
		}, socketRetryTime);

		return () => {
			clearInterval(interval);
			ws.current?.close();
		};
	}, [connectToSocket]);

	return { isConnected, socket: ws.current };
};
