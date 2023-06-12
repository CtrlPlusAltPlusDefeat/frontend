import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLobbyStore } from '../../stores/lobby/lobbyStore';
import { useJoinLobby } from '../../stores/lobby/lobbyActions';
import { useSetNameModal } from '../../components/common/Modal/Modals/SetName';
import { usePlayerStore } from '../../stores/player/playerStore';
import { Status } from '../../types/socket/general';

export const useLoadLobby = (): Status => {
	const sessionId = usePlayerStore((s) => s.sessionId);
	const paramLobbyId = useParams().lobbyId;
	const storeLobbyId = useLobbyStore((s) => s.lobbyId);
	const lobbyLoaded = useLobbyStore((s) => s.lobby !== undefined);
	const lobbyId = paramLobbyId || storeLobbyId;
	const playerName = sessionStorage.getItem(`session-player-name-${lobbyId}`);

	const join = useJoinLobby(lobbyId);
	const openModal = useSetNameModal();

	const joinCallback = useCallback(() => {
		if (playerName) join(playerName);
		else openModal(join);
	}, [join, openModal, playerName]);

	useEffect(() => {
		//wait for sessionId to be set before sending join request
		if (lobbyLoaded || !sessionId) return;
		joinCallback();
	}, [joinCallback, lobbyLoaded, sessionId]);

	if (!lobbyId) return 'not-found';
	if (!playerName || !storeLobbyId) return 'loading';

	return 'loaded';
};
