import { useParams } from 'react-router-dom';
import { useLobbyStore } from '../../stores/lobby/lobbyStore';
import { useJoinLobby } from '../../stores/lobby/lobbyActions';
import { useSetNameModal } from '../../components/common/Modal/Modals/SetName';
import { useEffect } from 'react';

export type Status = 'not-found' | 'joining' | 'joined';

export const useLoadLobby = (): Status => {
	const paramLobbyId = useParams().lobbyId;
	const lobbyId = useLobbyStore((s) => s.lobbyId) || paramLobbyId;
	const lobbyLoaded = useLobbyStore((s) => s.lobby !== undefined);
	const playerName = sessionStorage.getItem(`session-player-name-${lobbyId}`);

	const join = useJoinLobby(lobbyId);
	const openModal = useSetNameModal();

	useEffect(() => {
		if (lobbyLoaded) return;
		if (playerName) join(playerName);
		else openModal(join);
	}, [playerName, join, openModal, lobbyLoaded]);

	if (!lobbyId) return 'not-found';
	if (!playerName) return 'joining';

	return 'joined';
};
