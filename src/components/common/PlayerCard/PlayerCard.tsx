import { XMarkIcon } from '@heroicons/react/20/solid';

const PlayerCard = ({ name = 'Username', photo = '', score = 0 }) => {
	return (
		<>
			{/* Main Container */}
			<div className="flex items-center justify-between hover:cursor-pointer bg-primaryWhite p-6 m-auto w-60 h-16 rounded outline outline-primaryGrey outline-1 hover:drop-shadow hover:ease-in duration-100">
				{photo}
				<div className="flex flex-col">
					{name}
					<div className="text-sm text-primaryGrey">Score: {score}</div>
				</div>
				<XMarkIcon className="w-5 hover:text-primaryRed" />
			</div>
		</>
	);
};

export default PlayerCard;
