import { combineReducers, configureStore } from '@reduxjs/toolkit';
import canvasSlice from '../store/canvas';

export const store = configureStore({
	reducer: combineReducers({
		canvas: canvasSlice,
	}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
