import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pipeRotations } from '../../helpers/canvasHelper';

export type PipesMap = string[][];

export type Coordinate = number[];

export interface CanvasState {
	pipes: PipesMap;
	rotations: Coordinate[];
}

const initialState: CanvasState = {
	pipes: [],
	rotations: [],
};

export const canvasSlice = createSlice({
	name: 'canvas',
	initialState,
	reducers: {
		setPipesCanvas: (state, action: PayloadAction<PipesMap>) => {
			state.pipes = action.payload;
		},
		rotatePipe: (state, action: PayloadAction<[number, number]>) => {
			const [y, x] = action.payload;
			const item = state.pipes[y][x];
			const newMap = [...state.pipes];
			newMap[y][x] = pipeRotations[item];

			state.pipes = newMap;
			state.rotations = [...state.rotations, action.payload];
		},
	},
});

export const { setPipesCanvas, rotatePipe } = canvasSlice.actions;

export default canvasSlice.reducer;
