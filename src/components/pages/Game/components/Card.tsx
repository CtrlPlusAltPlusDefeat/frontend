import { Card as CardProps } from '../../../../common/wordguess';

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
