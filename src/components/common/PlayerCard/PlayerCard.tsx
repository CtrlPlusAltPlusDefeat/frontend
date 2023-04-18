import { XMarkIcon } from '@heroicons/react/20/solid';

interface PlayerCardProps {
	name: string;
	photo: string;
	score: number;
	onClick?: () => void;
}

const PlayerCard = ({ name, photo, score, onClick }: PlayerCardProps) => {
	return (
		<>
			{/* Main Container */}
			<div className="flex items-center justify-between hover:cursor-pointer bg-primaryWhite p-6 w-60 h-16 rounded outline outline-primaryGrey outline-1 hover:drop-shadow hover:ease-in duration-100">
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

export default PlayerCard;
