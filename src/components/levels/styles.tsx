import styled from 'styled-components';

const LevelsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	cursor: pointer;
	height: 100px;
	align-items: center;
`;

const LevelItem = styled.div`
	font-size: 36px;
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
`;

export { LevelsWrapper, LevelItem };
