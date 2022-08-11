import styled from 'styled-components';

export const Button = styled.button`
	font-size: 18px;
	background-image: linear-gradient(
		to right,
		#eb3349 0%,
		#f45c43 51%,
		#eb3349 100%
	);
	margin: 10px;
	padding: 15px 45px;
	text-align: center;
	text-transform: uppercase;
	transition: 0.8s;
	background-size: 200% auto;
	color: white;
	box-shadow: 0 0 20px #eee;
	border-radius: 10px;
	display: block;
	cursor: pointer;
	border: none;

	&:hover {
		background-position: right center; /* change the direction of the change here */
		color: #fff;
		text-decoration: none;
	}
`;

export const DivCentered = styled.div`
	display: flex;
	justify-content: center;
`;

export const Title = styled.div`
	margin: 20px 0;
	font-size: 48px;
	font-weight: 800;
`;
