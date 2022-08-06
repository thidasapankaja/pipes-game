import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pipeRotations } from '../../helpers/canvasHelper';

export type PipesMap = string[][];

export type Coordinate = [number, number];

export interface CanvasState {
	pipes: PipesMap;
	level: number;
	rotations: Coordinate[];
}

const initialState: CanvasState = {
	pipes: [
		['┛', '┃', '╻', '┗', '╺', '╺', '┏', '╻'],
		['┣', '╹', '╺', '╋', '┫', '┓', '┃', '╹'],
		['┏', '┏', '┓', '┏', '━', '╻', '━', '━'],
		['╹', '┳', '┳', '╻', '╹', '━', '┣', '┛'],
		['━', '╻', '┻', '┣', '╻', '┳', '┣', '╺'],
		['┏', '┓', '┃', '┓', '┫', '┻', '╹', '╺'],
		['┗', '┳', '┳', '┓', '┛', '╋', '┓', '━'],
		['╻', '┗', '┓', '╺', '╸', '┗', '━', '┏'],
	],
	level: 1,
	rotations: [],
};

export const canvasSlice = createSlice({
	name: 'canvas',
	initialState,
	reducers: {
		setPipesCanvas: (state, action: PayloadAction<PipesMap>) => {
			state.pipes = action.payload;
		},
		setGameLevel: (state, action: PayloadAction<number>) => {
			state.level = action.payload;
		},
		rotatePipe: (state, action: PayloadAction<[number, number]>) => {
			const [row, column] = action.payload;
			const item = state.pipes[row][column];
			const newMap = [...state.pipes];
			newMap[row][column] = pipeRotations[item];

			state.pipes = newMap;
			state.rotations = [...state.rotations, action.payload];
		},
	},
});

export const { setPipesCanvas, setGameLevel, rotatePipe } = canvasSlice.actions;

export default canvasSlice.reducer;
