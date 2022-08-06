import styled from 'styled-components';

const ItemsRow = styled.div`
	display: flex;
	flex-direction: row;
`;

const Pipe = styled.div`
	height: 50px;
	width: 50px;
	cursor: pointer;
	background: #6FCFC4;
	color: #163240;

	&:hover {
		background-color: #238C9B;
	}
`;

export { ItemsRow, Pipe };
