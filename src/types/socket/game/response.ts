import { SocketMessage } from '../receive';
import { Services } from '../general';
import { RequestTypes } from './enum';
import { GameSession, GameSessionState } from './types';

export type GetStateRes = SocketMessage<typeof RequestTypes.ServerActions.GetState, GameSession, typeof Services.Game>;
export type PlayerActionRes = SocketMessage<typeof RequestTypes.ServerActions.PlayerAction, GameSessionState, typeof Services.Game>;

export const isGetState = (msg: SocketMessage): msg is GetStateRes => msg.action === RequestTypes.ServerActions.GetState;
export const isPlayerAction = (msg: SocketMessage): msg is PlayerActionRes => msg.action === RequestTypes.ServerActions.PlayerAction;
