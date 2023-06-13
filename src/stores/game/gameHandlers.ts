import { useCallback } from 'react';
import { SocketMessage } from '../../types/socket/receive';
import { isGetState, isPlayerAction, isSwapTeams } from '../../types/socket/game/response';
import { useGameStore } from './gameStore';

export const useHandleGetState = () => {
	const setState = useGameStore((s) => s.setState);
	const setInfo = useGameStore((s) => s.setInfo);
	const setTeams = useGameStore((s) => s.setTeams);
	return useCallback(
		(payload: SocketMessage) => {
			if (!isGetState(payload)) return;
			setState(payload.data.state);
			setTeams(payload.data.teams);
			setInfo(payload.data.info);
		},
		[setState, setInfo, setTeams]
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
