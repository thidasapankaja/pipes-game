import { LevelsWrapper, LevelItem } from './styles';

export interface LevelsProps {
	level: number;
	onLevelChange: (arg0: number) => void;
}

export const gameLevels = [1, 2, 3, 4, 5, 6];

const Levels = ({ level, onLevelChange }: LevelsProps) => (
	<LevelsWrapper>
		{gameLevels.map(lvl => (
			<LevelItem key={lvl} onClick={() => onLevelChange(lvl)}>
				{lvl}
			</LevelItem>
		))}
	</LevelsWrapper>
);

export default Levels;
