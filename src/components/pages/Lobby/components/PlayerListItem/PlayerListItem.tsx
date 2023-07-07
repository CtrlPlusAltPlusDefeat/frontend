import { XMarkIcon } from '@heroicons/react/20/solid';
import { useLobbyStore } from '../../../../../stores/lobby/lobbyStore';
import { LobbyPlayer } from '../../../../../common/interfaces';

interface PlayerListItemProps extends LobbyPlayer {
	onClick?: () => void;
}

const PlayerListItem = ({ id, name, points, isOnline, onClick }: PlayerListItemProps) => {
	const player = useLobbyStore((s) => s.player?.id);
	const bgColor = player === id ? 'bg-slate-200' : 'bg-primaryWhite';
	return (
		<div
			className={`w-full flex items-center justify-between hover:cursor ${
				isOnline ? bgColor : 'bg-red-100'
			} p-6 h-16 last:rounded-b outline outline-primaryGrey outline-1 hover:drop-shadow hover:ease-in duration-100`}
		>
			<div className="flex flex-col">
				{name}
				<div className="text-sm text-primaryGrey">Points: {points}</div>
			</div>
			<XMarkIcon className="w-5 hover:text-primaryRed" onClick={onClick} />
		</div>
	);
};

export default PlayerListItem;
