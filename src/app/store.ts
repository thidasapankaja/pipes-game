import { combineReducers, configureStore } from '@reduxjs/toolkit';
import canvasSlice from '../store/canvas';
import websocketSlice from '../store/websocket';

export const store = configureStore({
	reducer: combineReducers({
		canvas: canvasSlice,
		webSocket: websocketSlice,
	}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
