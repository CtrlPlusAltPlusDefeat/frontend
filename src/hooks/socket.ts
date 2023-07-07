import React, { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { getSessionRequest } from '../stores/player/playerActions';
import { devTools } from '../common/devTools';
import { Service } from '../common/enum';

const socketEndpoint: string = import.meta.env.VITE_SOCKET_ENDPOINT ?? 'localhost:8080';
const socketRetryTime: number = Number(import.meta.env.VITE_SOCKET_RETRY_TIME) ?? 1000;

export type MessageHandler = (msg: string) => void;
export type StateChangeHandler = () => void;

export interface SocketMessage<A = string, D = object, S = Service> {
	service: S;
	action: A;
	data: D;
}

export interface WrappedMessage {
	service: string;
	action: string;
	data: string;
}

export const wrapMessage = (msg: SocketMessage): string => {
	return JSON.stringify({ ...msg, data: JSON.stringify(msg.data) });
};

export const useSend = (ws: React.MutableRefObject<WebSocket | null>, setLoading?: Dispatch<boolean>) => {
	return useCallback(
		(msg: SocketMessage, waitForResponse: boolean = false) => {
			if (!ws.current) {
				console.error('Not connected to socket, cannot send data');
				return;
			}

			if (setLoading && waitForResponse) setLoading(true);

			devTools.log(`sending ${msg.service}|${msg.action}`, msg.data);
			ws.current.send(wrapMessage(msg));
		},
		[setLoading, ws]
	);
};

const useConnectToSocket = (onConnect: StateChangeHandler, onDisconnect: StateChangeHandler, onMessage?: MessageHandler) => {
	return useCallback(
		(ws: WebSocket | null) => {
			if (ws) return;
			const socket = new WebSocket(socketEndpoint);
			socket.onopen = () => {
				onConnect();
			};
			socket.onclose = () => {
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
	const [loading, setLoading] = useState(false);

	const [isConnected, setIsConnected] = useState(false);
	const send = useSend(ws, setLoading);

	//unwrap send callback to make it stable
	const connectHandler = useCallback(() => {
		setIsConnected(true);
		send(getSessionRequest());
	}, [send]);

	const disconnectHandler = useCallback(() => {
		setIsConnected(false);
		ws.current = null;
	}, [ws]);

	const onMessageHandler = useCallback(
		(msg: string) => {
			// probably need to check the message relates to wait were waiting for
			// else we could end loading before actually getting the data we want
			setLoading(false);
			onMessage?.(msg);
		},
		[onMessage]
	);

	//connect to socket
	//the params to this have to be stable, so we use useCallback
	//we cannot send an object unless it is stored in state or memorized due to reference equality
	const connectToSocket = useConnectToSocket(connectHandler, disconnectHandler, onMessageHandler);

	//connect to socket on interval
	useEffect(() => {
		ws.current = connectToSocket(ws.current) ?? null;

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
		send: send,
		loading
	};
};
