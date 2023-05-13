import { XMarkIcon } from '@heroicons/react/20/solid';
import { useLobbyStore } from '../../../stores/lobby/lobbyStore';

interface PlayerListItemProps {
	id: string;
	name: string;
	photo: string;
	score: number;
	onClick?: () => void;
}

const PlayerListItem = ({ id, name, photo, score, onClick }: PlayerListItemProps) => {
	const player = useLobbyStore((s) => s.player?.id);
	const bgColor = player === id ? 'bg-slate-200' : 'bg-primaryWhite';
	return (
		<>
			{/* Main Container */}
			<div className={`w-full flex items-center justify-between hover:cursor ${bgColor} p-6 h-16 last:rounded-b outline outline-primaryGrey outline-1 hover:drop-shadow hover:ease-in duration-100`}>
				{photo}
				<div className="flex flex-col">
					{name}
					<div className="text-sm text-primaryGrey">Score: {score}</div>
				</div>
				<XMarkIcon className="w-5 hover:text-primaryRed" onClick={onClick} />
			</div>
		</>
	);
};

export default PlayerListItem;
