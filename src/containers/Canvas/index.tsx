import { useDispatch, useSelector } from 'react-redux';
import GameCanvas from '../../components/gameCanvas';
import Levels from '../../components/levels';
import { RootState } from '../../app/store';
import { rotatePipe } from '../../store/canvas/canvas.slice';

const Canvas = () => {
	const dispatch = useDispatch();
	const canvas = useSelector((state: RootState) => state.canvas);

	const onLevelChange = (num: number) => {
		console.log(num);
	};

	const onPipeRotate = (pipe: [number, number]) => {
		dispatch(rotatePipe(pipe));
		console.log(pipe);
	};

	const onVerify = () => {
		console.log('data : ', canvas.rotations);
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
