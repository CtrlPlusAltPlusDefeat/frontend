import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useChatStore } from '../stores/chat/chatStore';

interface WebSocketContextObj {
	isConnected: boolean;
	send: ((data: string | ArrayBufferLike | Blob | ArrayBufferView) => void) | undefined;
}

const WebsocketContext = createContext<WebSocketContextObj>({ isConnected: false, send: undefined });

export const WebsocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [isConnected, setIsConnected] = useState(false);
	const addMessage = useChatStore((s) => s.addMessage);

	const ws = useRef<WebSocket | null>(null);

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:8080');

		socket.onopen = () => setIsConnected(true);
		socket.onclose = () => setIsConnected(false);
		socket.onmessage = (event) => {
			console.log('event', event);
			addMessage({ date: Date.now(), text: event.data, sender: '' });
		};

		ws.current = socket;

		return () => {
			socket.close();
		};
	}, [addMessage]);

	const send = ws.current?.send.bind(ws.current);

	return <WebsocketContext.Provider value={{ isConnected, send }}>{children}</WebsocketContext.Provider>;
};

export const useWebsocket = () => {
	return useContext(WebsocketContext);
};
