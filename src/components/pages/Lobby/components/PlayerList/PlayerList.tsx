import { useLobbyStore } from '../../../../../stores/lobby/lobbyStore';
import PlayerListItem from '../PlayerListItem/PlayerListItem';

const PlayerList = () => {
	const players = useLobbyStore((s) => s.lobby?.players);
	return (
		<div className={'bg-white border-solid border border-slate rounded '}>
			<div className={'p-2'}>Lobby Players</div>
			<div className={'flex flex-col'}>
				{players?.map((player) => {
					if (!player.name) return null;
					return <PlayerListItem key={player.id} {...player} onClick={() => {}} />;
				})}
			</div>
		</div>
	);
};
export default PlayerList;
