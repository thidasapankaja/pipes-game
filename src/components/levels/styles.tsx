import styled from 'styled-components';

const LevelsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	cursor: pointer;
	height: 100px;
	align-items: center;
`;

interface LevelItemProps {
	selected: boolean;
}

const LevelItem = styled.div<LevelItemProps>`
	font-size: 36px;
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	background: ${(props: LevelItemProps) =>
		props.selected ? '#0096FF' : '#72FFFF'};
	margin: 0 2px;
	border-radius: 3px;

	&:hover {
		background: #00d7ff;
	}
`;

export { LevelsWrapper, LevelItem };
