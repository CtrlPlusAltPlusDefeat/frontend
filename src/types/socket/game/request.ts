import { RequestTypes } from './enum';
import { SocketMessage } from '../receive';
import { Services } from '../general';

export type GetStateReq = SocketMessage<
	typeof RequestTypes.ClientActions.GetState,
	{
		lobbyId: string;
		gameSessionId: string;
	},
	typeof Services.Game
>;

export type PlayerActionReq = SocketMessage<
	typeof RequestTypes.ClientActions.PlayerAction,
	{
		lobbyId: string;
		gameSessionId: string;
	},
	typeof Services.Game
>;
