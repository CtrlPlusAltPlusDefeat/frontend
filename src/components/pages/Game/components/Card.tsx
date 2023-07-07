import { Card as CardProps, getTeamBackgroundColour } from '../../../../common/wordguess';

const Card = ({ colour, word }: CardProps) => {
	const bg = getTeamBackgroundColour(colour);
	return (
		<div className={`${bg} flex items-end w-32 h-32 border border-solid rounded border-black m-2`}>
			<div className={' text-center w-full  '}>{word}</div>
		</div>
	);
};

export default Card;
