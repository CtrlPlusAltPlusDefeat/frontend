import { WordGuessGame } from '../../../../common/wordguess';
import Card from './Card';

interface CardGridProps extends WordGuessGame {}

const CardGrid = ({ cards }: CardGridProps) => {
	return (
		<div className={'w-full '}>
			<table className={'table-auto m-auto'}>
				<tbody>
					{cards.map((row, rowI) => {
						return (
							<tr key={`row-${rowI}`}>
								{row.map((col, colI) => {
									return (
										<td key={`col-${rowI}-${colI}`}>
											<Card {...col} />
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
export default CardGrid;
