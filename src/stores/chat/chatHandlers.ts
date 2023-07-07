import { useCallback } from 'react';
import { useChatStore } from './chatStore';
import { ChatActions, Services } from '../../common/enum';
import { SocketMessage } from '../../hooks/socket';
import { Message } from '../../common/interfaces';

export type ChatSend = SocketMessage<typeof ChatActions.Server.Send, Message, typeof Services.Chat>;
export type ChatLoad = SocketMessage<
	typeof ChatActions.Server.Load,
	{
		messages: Message[] | null;
	},
	typeof Services.Chat
>;

export const isChatSend = (msg: SocketMessage): msg is ChatSend => msg.action === ChatActions.Server.Send;
export const isChatLoad = (msg: SocketMessage): msg is ChatLoad => msg.action === ChatActions.Server.Load;

export const useReceivedMessage = () => {
	const addMessage = useChatStore((s) => s.addMessage);
	return useCallback(
		(payload: SocketMessage) => {
			if (isChatSend(payload)) addMessage(payload.data);
		},
		[addMessage]
	);
};

export const useLoadMessages = () => {
	const addMessage = useChatStore((s) => s.addMessage);
	return useCallback(
		(payload: SocketMessage) => {
			if (isChatLoad(payload)) addMessage(payload.data.messages);
		},
		[addMessage]
	);
};
