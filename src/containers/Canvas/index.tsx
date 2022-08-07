import { useDispatch, useSelector } from 'react-redux';
import useWebSocket from 'react-use-websocket';

import GameCanvas from '../../components/gameCanvas';
import Levels from '../../components/levels';
import { RootState } from '../../app/store';
import { rotatePipe, setPipesCanvas } from '../../store/canvas';
import { useEffect, useState } from 'react';

export const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || '';

const Canvas = () => {
	const dispatch = useDispatch();
	const canvas = useSelector((state: RootState) => state.canvas);
	const [sentMessage, setSentMessage] = useState('');

	const { sendMessage, lastMessage } = useWebSocket(WEBSOCKET_URL);

	useEffect(() => {
		setSentMessage('new 1');
		sendMessage('new 1');
	}, [sendMessage]);

	useEffect(() => {
		if (sentMessage.includes('new')) {
			setSentMessage('map');
			sendMessage('map');
		}
	}, [sendMessage, sentMessage]);

	useEffect(() => {
		const response = lastMessage?.data;
		if (sentMessage === 'map' && response?.includes(sentMessage)) {
			const newMapResponseInArr = response?.split('\n').slice(1, -1);
			if (newMapResponseInArr?.length > 0) {
				const mappedPipes = newMapResponseInArr.map((row: any) =>
					row?.split('')
				);
				dispatch(setPipesCanvas(mappedPipes));
			}
		} else if (sentMessage === 'verify' && response?.includes(sentMessage)) {
			console.log(response);
		}
	}, [dispatch, lastMessage, sentMessage]);

	const onLevelChange = (num: number) => {
		console.log(num);
	};

	const onPipeRotate = (pipe: [number, number]) => {
		sendMessage(`rotate ${pipe[1]} ${pipe[0]}`);
		dispatch(rotatePipe(pipe));
		console.log(pipe);
	};

	const onVerify = () => {
		setSentMessage(`verify`);
		sendMessage(`verify`);
	};

	return (
		<div>
			<h1>Pipes</h1>
			<Levels level={0} onLevelChange={onLevelChange} />
			<GameCanvas pipes={canvas.pipes} rotatePipe={onPipeRotate} />
			<button onClick={onVerify}>VERIFY !</button>
		</div>
	);
};

export default Canvas;
