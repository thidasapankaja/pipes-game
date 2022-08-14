import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { RootState } from '../../app/store';
import { rotatePipe, setPipesCanvas } from '../../store/canvas';
import {
	setMessage,
	setWebsocketStatus,
	setGameLevel,
} from '../../store/websocket';

import { Button, DivCentered, Title } from './styles';

import GameCanvas from '../../components/GameCanvas';
import Toast from '../../components/Toast';
import Levels from '../../components/Levels';

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

	const sendWebsocketMessage = useCallback(
		(message: any) => {
			sendMessage(message);
			dispatch(setMessage(message));
		},
		[dispatch, sendMessage]
	);

	const onLevelChange = useCallback(
		(level: number, isUp: boolean) => {
			dispatch(setGameLevel({ level, isUp }));
		},
		[dispatch]
	);

	useEffect(() => {
		if (connectionStatus === 'Open') {
			sendWebsocketMessage(`new ${websocket.level}`);
		}
	}, [connectionStatus, sendWebsocketMessage, websocket.level]);

	useEffect(() => {
		if (websocket.sentMessage.includes('new')) {
			sendWebsocketMessage('map');
		}
	}, [sendWebsocketMessage, websocket.sentMessage]);

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
			if (response?.includes('Password')) {
				onLevelChange(0, true);
			}
		} else if (
			websocket.sentMessage === 'help' &&
			response?.includes(websocket.sentMessage)
		) {
			alert(response);
		}
	}, [dispatch, lastMessage, onLevelChange, websocket.sentMessage]);

	const onPipeRotate = (pipe: [number, number]) => {
		sendWebsocketMessage(`rotate ${pipe[1]} ${pipe[0]}`);
		dispatch(rotatePipe(pipe));
	};

	const onVerify = () => {
		sendWebsocketMessage(`verify`);
	};

	return (
		<div>
			<DivCentered>
				<Title>Play Pipes Puzzle</Title>
			</DivCentered>
			<DivCentered>
				<Levels level={websocket.level} onLevelChange={onLevelChange} />
			</DivCentered>
			<DivCentered>
				<GameCanvas pipes={canvas.pipes} rotatePipe={onPipeRotate} />
			</DivCentered>
			<DivCentered>
				<Button onClick={onVerify}>VERIFY</Button>
			</DivCentered>
			<Toast message={lastMessage} level={websocket.level} />
		</div>
	);
};

export default Canvas;
