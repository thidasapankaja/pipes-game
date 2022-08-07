import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReadyState } from 'react-use-websocket';

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface WebsocketState {
	level: Level;
	status: ReadyState;
	sentMessage: string;
}

const initialState: WebsocketState = {
	level: 1,
	status: ReadyState.UNINSTANTIATED,
	sentMessage: '',
};

export const websocketSlice = createSlice({
	name: 'websocket',
	initialState,
	reducers: {
		setGameLevel: (state, action: PayloadAction<Level>) => {
			state.level = action.payload;
		},
		setWebsocketStatus: (state, action: PayloadAction<ReadyState>) => {
			state.status = action.payload;
		},
		setMessage: (state, action: PayloadAction<string>) => {
			state.sentMessage = action.payload;
		},
	},
});

export const { setGameLevel, setWebsocketStatus, setMessage } = websocketSlice.actions;

export default websocketSlice.reducer;
