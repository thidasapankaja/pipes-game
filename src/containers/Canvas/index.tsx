import { useDispatch, useSelector } from 'react-redux';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import GameCanvas from '../../components/gameCanvas';
import Levels from '../../components/levels';
import { RootState } from '../../app/store';
import { rotatePipe, setPipesCanvas } from '../../store/canvas';
import { useCallback, useEffect } from 'react';
import { setMessage, setWebsocketStatus } from '../../store/websocket';
import { usePrevious } from '../../app/hooks';
import { Button, DivCentered } from './styles';

export const WEBSOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL || '';

const Canvas = () => {
	const dispatch = useDispatch();
	const canvas = useSelector((state: RootState) => state.canvas);
	const websocket = useSelector((state: RootState) => state.webSocket);

	const { sendMessage, lastMessage, readyState } = useWebSocket(WEBSOCKET_URL, {
		onOpen: () => dispatch(setWebsocketStatus(connectionStatus)),
		onClose: () => dispatch(setWebsocketStatus(connectionStatus)),
	});

	const connectionStatus: any = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Open',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState];

	const previousConnectionStatus = usePrevious(connectionStatus);

	const sendWebsocketMessage = useCallback(
		(message: any) => {
			sendMessage(message);
			dispatch(setMessage(message));
		},
		[dispatch, sendMessage]
	);

	useEffect(() => {
		if (
			previousConnectionStatus === 'Connecting' &&
			connectionStatus === 'Open'
		) {
			sendWebsocketMessage('new 1');
		}
	}, [
		connectionStatus,
		previousConnectionStatus,
		sendMessage,
		sendWebsocketMessage,
	]);

	useEffect(() => {
		if (websocket.sentMessage.includes('new')) {
			sendWebsocketMessage('map');
		}
	}, [sendMessage, sendWebsocketMessage, websocket.sentMessage]);

	useEffect(() => {
		const response = lastMessage?.data;
		if (
			websocket.sentMessage === 'map' &&
			response?.includes(websocket.sentMessage)
		) {
			const newMapResponseInArr = response?.split('\n').slice(1, -1);
			if (newMapResponseInArr?.length > 0) {
				const mappedPipes = newMapResponseInArr.map((row: any) =>
					row?.split('')
				);
				dispatch(setPipesCanvas(mappedPipes));
			}
		} else if (
			websocket.sentMessage === 'verify' &&
			response?.includes(websocket.sentMessage)
		) {
			console.log(response);
		} else if (
			websocket.sentMessage === 'help' &&
			response?.includes(websocket.sentMessage)
		) {
			alert(response);
		}
	}, [dispatch, lastMessage, websocket.sentMessage]);

	const onLevelChange = (num: number) => {
		sendWebsocketMessage(`new ${num}`);
	};

	const onPipeRotate = (pipe: [number, number]) => {
		sendWebsocketMessage(`rotate ${pipe[1]} ${pipe[0]}`);
		dispatch(rotatePipe(pipe));
	};

	const onVerify = () => {
		sendWebsocketMessage(`verify`);
	};

	// const onHelp = () => {
	// 	sendWebsocketMessage(`help`);
	// };

	return (
		<div style={{ width: '800px' }}>
			<DivCentered>
				<h1>Pipes</h1>
			</DivCentered>
			<DivCentered>
				<Levels level={0} onLevelChange={onLevelChange} />
			</DivCentered>
			<DivCentered style={{ padding: '30px' }}>
				<GameCanvas pipes={canvas.pipes} rotatePipe={onPipeRotate} />
			</DivCentered>
			<DivCentered>
				<Button onClick={onVerify}>VERIFY !</Button>
			</DivCentered>
		</div>
	);
};

export default Canvas;
