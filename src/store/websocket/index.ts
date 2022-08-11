import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReadyState } from 'react-use-websocket';

export interface LevelUpPayload {
	level: number;
	isUp: boolean;
}
export interface WebsocketState {
	level: number;
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
		setGameLevel: (state, action: PayloadAction<LevelUpPayload>) => {
			if (action.payload.isUp) {
				state.level = state.level + 1;
			} else {
				state.level = action.payload.level;
			}
		},
		setWebsocketStatus: (state, action: PayloadAction<ReadyState>) => {
			state.status = action.payload;
		},
		setMessage: (state, action: PayloadAction<string>) => {
			state.sentMessage = action.payload;
		},
	},
});

export const { setGameLevel, setWebsocketStatus, setMessage } =
	websocketSlice.actions;

export default websocketSlice.reducer;
