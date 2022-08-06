import { PipesMap } from '../../store/canvas/canvas.slice';
import { ItemsRow, Pipe } from './styles';

export interface LevelsProps {
	pipes: PipesMap;
	rotatePipe: (arg0: [number, number]) => void;
}

const GameCanvas = ({ pipes, rotatePipe }: LevelsProps) => {
	return (
		<div style={{ fontSize: '42px' }}>
			{pipes?.map((row, rowIndex) => {
				return (
					<ItemsRow key={rowIndex}>
						{row?.map((col, colIndex) => (
							<Pipe
								key={`${rowIndex},${colIndex}`}
								onClick={() => {
									rotatePipe([rowIndex, colIndex]);
								}}
							>
								{col}
							</Pipe>
						))}
					</ItemsRow>
				);
			})}
		</div>
	);
};

export default GameCanvas;
