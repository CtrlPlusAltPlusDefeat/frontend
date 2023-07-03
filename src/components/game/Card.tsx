import { Card as CardProps } from '../../types/socket/game/types';

const Card = ({ colour, word, revealed }: CardProps) => {
	if (revealed) {
	}

	return (
		<div className={colour}>
			<div className={''}>{word}</div>
		</div>
	);
};

export default Card;
