import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Statuses = {
	IDLE: 'IDLE';
	CONNECTING: 'CONNECTING';
	RECONNECTING: 'RECONNECTING';
	DISCONNECTED: 'DISCONNECTED';
};

export type Level = 1 | 2 | 3 | 4 | 5 | 6;

export interface WebsocketState {
	level: Level;
	status: keyof Statuses;
}

const initialState: WebsocketState = {
	level: 1,
	status: 'IDLE',
};

export const websocketSlice = createSlice({
	name: 'canvas',
	initialState,
	reducers: {
		setGameLevel: (state, action: PayloadAction<Level>) => {
			state.level = action.payload;
		},
		setWebsocketStatus: (state, action: PayloadAction<keyof Statuses>) => {
			state.status = action.payload;
		},
	},
});

export const { setGameLevel, setWebsocketStatus } = websocketSlice.actions;

export default websocketSlice.reducer;
