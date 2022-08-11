import { PipesMap } from '../../store/canvas';
import { ItemsRow, Pipe, Image } from './styles';

import type1 from '../../assets/type1.png';
import type2 from '../../assets/type2.png';
import type3 from '../../assets/type3.png';
import type4 from '../../assets/type4.png';
import type5 from '../../assets/type5.png';
import { pipeRotationsStyle } from '../../helpers/canvasHelper';

export const pipeDesign: any = {
	// one side -- closed side
	'╸': type1,
	'╹': type1,
	'╺': type1,
	'╻': type1,

	// full
	'┃': type2,
	'━': type2,

	// 2 sides
	'┓': type3,
	'┛': type3,
	'┗': type3,
	'┏': type3,

	// 3 pieces
	'┫': type4,
	'┻': type4,
	'┣': type4,
	'┳': type4,

	// all sides
	'╋': type5,
};

export interface LevelsProps {
	pipes: PipesMap;
	rotatePipe: (arg0: [number, number]) => void;
}

const GameCanvas = ({ pipes, rotatePipe }: LevelsProps) => {
	return (
		<div style={{ fontSize: '42px' }}>
			{pipes?.map((row, rowIndex) => (
				<ItemsRow key={rowIndex}>
					{row?.map((col, colIndex) => {
						return (
							<Pipe
								key={`${colIndex},${rowIndex}`}
								onClick={() => {
									rotatePipe([rowIndex, colIndex]);
								}}
							>
								<Image
									src={pipeDesign[col]}
									col={col}
									rotation={`rotate(${pipeRotationsStyle[col]}deg)`}
								/>
							</Pipe>
						);
					})}
				</ItemsRow>
			))}
		</div>
	);
};

export default GameCanvas;
