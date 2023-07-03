import { RequestTypes } from './enum';
import { SocketMessage } from '../receive';
import { Services } from '../general';
import { Role, TeamName } from './types';

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

export type SwapTeamsReq = SocketMessage<
	typeof RequestTypes.ClientActions.SwapTeams,
	{
		lobbyId: string;
		gameSessionId: string;
		team: TeamName;
		role: Role;
	},
	typeof Services.Game
>;
