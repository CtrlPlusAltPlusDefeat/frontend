import { Services, SocketMessage } from './socket.types';

export const ChatTypes = {
	ClientActions: { Send: 'send' },
	ServerActions: { Receive: 'receive' }
} as const;

export type ChatReceived = SocketMessage<
	typeof ChatTypes.ServerActions.Receive,
	{
		text: string;
		playerId: string;
	},
	typeof Services.Chat
>;

export const isChatReceived = (msg: SocketMessage): msg is ChatReceived => msg.action === ChatTypes.ServerActions.Receive;

export type ChatSent = SocketMessage<typeof ChatTypes.ClientActions.Send, ChatSentData, typeof Services.Chat>;
export type ChatSentData = { text: string; lobbyId: string };
