"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
    isWorking: boolean;
};

const initialState = {
    isWorking: true
} as InitialStateType;


export const appState = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },

        setIsWorking: (state, action: PayloadAction<boolean>) => {
            state.isWorking = action.payload
        }
    }
});


export const { reset, setIsWorking } = appState.actions;
export default appState.reducer;