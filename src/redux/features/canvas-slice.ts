"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type ActionsType = {
    drawing: boolean;
    moving: boolean;
};

const ActionsUnchecked: ActionsType = {
    drawing: false,
    moving: false
}
type InitialStateType = {
    actions: ActionsType
};

const initialState = {
    actions: {
        drawing: false,
        moving: true
    }
} as InitialStateType;

export const canvasState = createSlice({
    name: 'canvasState',
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },

        changeActionState(state, action: PayloadAction<{ key: keyof ActionsType, value: boolean }>) {
            const { key, value } = action.payload;

            return {
                ...state,
                actions: {
                    ...ActionsUnchecked,
                    [key]: value
                }
            }
        }

    }
});


export const { reset, changeActionState } = canvasState.actions;
export default canvasState.reducer;