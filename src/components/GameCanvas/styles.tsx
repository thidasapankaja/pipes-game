import styled from 'styled-components';

const ItemsRow = styled.div`
	display: flex;
	flex-direction: row;
`;

const Pipe = styled.div`
	height: 50px;
	width: 50px;
	cursor: pointer;
	background-color: #9df2ff;
	color: #163240;

	&:hover {
		background-color: #29e2ff;
	}
	border-style: solid;
	border-color: #22c3f47a;
`;

interface ImageProps {
	src: string;
	col: string;
	rotation: string;
}

const Image = styled.img<ImageProps>`
	src: ${props => props.src};
	alt: ${props => props.col};
	transform: ${props => props.rotation};
`;

export { ItemsRow, Pipe, Image };