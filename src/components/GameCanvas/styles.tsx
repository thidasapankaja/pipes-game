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

const CanvasContainer = styled.div`
	overflow-x: scroll;
	padding: 30px;

	::-webkit-scrollbar {
		width: 20px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #21E1E1;
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #3B9AE1;
	}
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

export { ItemsRow, Pipe, Image, CanvasContainer };
