import { LevelsWrapper, LevelItem } from './styles';

export interface LevelsProps {
	level: number;
	onLevelChange: (arg0: number, arg1: boolean) => void;
}

export const gameLevels = [1, 2, 3, 4, 5, 6];

const Levels = ({ level, onLevelChange }: LevelsProps) => {
	return (
		<LevelsWrapper>
			{gameLevels.map(lvl => (
				<LevelItem
					key={lvl}
					onClick={() => onLevelChange(lvl, false)}
					selected={level === lvl}
				>
					<span>{lvl}</span>
				</LevelItem>
			))}
		</LevelsWrapper>
	);
};

export default Levels;
