import { Services, SocketMessage } from '../send';
import { RequestTypes } from './enum';

export type SendChat = SocketMessage<
	typeof RequestTypes.ClientActions.Send,
	{
		text: string;
		lobbyId: string;
	},
	typeof Services.Chat
>;
