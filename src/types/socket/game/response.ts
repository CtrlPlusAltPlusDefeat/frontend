import { SocketMessage } from '../receive';
import { Services } from '../general';
import { RequestTypes } from './enum';

export type GetStateRes = SocketMessage<typeof RequestTypes.ServerActions.GetState, {}, typeof Services.Game>;

export const isGetState = (msg: SocketMessage): msg is GetStateRes => msg.action === RequestTypes.ServerActions.GetState;
