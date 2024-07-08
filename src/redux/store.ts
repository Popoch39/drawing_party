import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import appSlice from './features/app-slice';
import canvasSlice from './features/canvas-slice';

export const store = configureStore({
    reducer: {
        appSlice,
        canvasSlice
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;