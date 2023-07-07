import { useCallback } from 'react';

import { useGameStore } from './gameStore';
import { SocketMessage } from '../../hooks/socket';
import { GameActions, Services } from '../../common/enum';
import { GameSession, GameSessionState, Team } from '../../common/interfaces';

export type GetStateRes = SocketMessage<typeof GameActions.Server.GetState, GameSession, typeof Services.Game>;
export type PlayerActionRes = SocketMessage<typeof GameActions.Server.PlayerAction, GameSessionState, typeof Services.Game>;
export type SwapTeamsRes = SocketMessage<typeof GameActions.Server.SwapTeams, Team[], typeof Services.Game>;

export const isGetState = (msg: SocketMessage): msg is GetStateRes => msg.action === GameActions.Server.GetState;
export const isPlayerAction = (msg: SocketMessage): msg is PlayerActionRes => msg.action === GameActions.Server.PlayerAction;
export const isSwapTeams = (msg: SocketMessage): msg is SwapTeamsRes => msg.action === GameActions.Server.SwapTeams;

export const useHandleGetState = () => {
	const setState = useGameStore((s) => s.setState);
	const setInfo = useGameStore((s) => s.setInfo);
	const setTeams = useGameStore((s) => s.setTeams);
	const setGame = useGameStore((s) => s.setGame);
	return useCallback(
		(payload: SocketMessage) => {
			if (!isGetState(payload)) return;
			setState(payload.data.state);
			setTeams(payload.data.teams);
			setInfo(payload.data.info);
			setGame(payload.data.game);
		},
		[setState, setTeams, setInfo, setGame]
	);
};

export const useHandlePlayerAction = () => {
	const setState = useGameStore((s) => s.setState);
	return useCallback(
		(payload: SocketMessage) => {
			if (!isPlayerAction(payload)) return;
			setState(payload.data);
		},
		[setState]
	);
};

export const useHandleSwapTeam = () => {
	const setTeams = useGameStore((s) => s.setTeams);
	return useCallback(
		(payload: SocketMessage) => {
			if (!isSwapTeams(payload)) return;

			setTeams(payload.data);
		},
		[setTeams]
	);
};
