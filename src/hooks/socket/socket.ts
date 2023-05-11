import { useCallback, useEffect, useRef, useState } from 'react';
import { useSend } from './send';
import { getSessionRequest } from '../../stores/player/playerActions';

const socketEndpoint: string = import.meta.env.VITE_SOCKET_ENDPOINT ?? 'localhost:8080';
const socketRetryTime: number = Number(import.meta.env.VITE_SOCKET_RETRY_TIME) ?? 1000;

export type MessageHandler = (msg: string) => void;
export type StateChangeHandler = () => void;

const useConnectToSocket = (onConnect: StateChangeHandler, onDisconnect: StateChangeHandler, onMessage?: MessageHandler) => {
	return useCallback(
		(ws: WebSocket | null) => {
			if (ws) return;
			const socket = new WebSocket(socketEndpoint);
			socket.onopen = () => {
				onConnect();
			};
			socket.onclose = () => {
				console.log('close');
				onDisconnect();
			};
			socket.onmessage = (event) => {
				onMessage?.(event.data);
			};
			return socket;
		},
		[onConnect, onDisconnect, onMessage]
	);
};

export const useSocket = (onMessage?: MessageHandler) => {
	const ws = useRef<WebSocket | null>(null);

	const [isConnected, setIsConnected] = useState(false);
	const send = useSend(ws);

	//unwrap send callback to make it stable
	const connectHandler = useCallback(() => {
		setIsConnected(true);
		send(getSessionRequest());
	}, [send]);

	const disconnectHandler = useCallback(() => {
		setIsConnected(false);
		ws.current = null;
	}, [ws]);

	//connect to socket
	//the params to this have to be stable, so we use useCallback
	//we cannot send an object unless it is stored in state or memorized due to reference equality
	const connectToSocket = useConnectToSocket(connectHandler, disconnectHandler, onMessage);

	//connect to socket on interval
	useEffect(() => {
		const interval = setInterval(() => {
			const socket = connectToSocket(ws.current);
			if (socket) {
				ws.current = socket;
				clearInterval(interval);
			}
		}, socketRetryTime);

		return () => {
			clearInterval(interval);
			ws.current?.close();
		};
	}, [connectToSocket, ws]);

	return {
		isConnected,
		send: send
	};
};
