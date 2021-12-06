import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
}

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incremented(state) {
            // it's ok to do this because immer makes it immutable
            // under the hood
            state.value++;
        },
        amoutAdded(state, action: PayloadAction<number>) {
            state.value += action.payload;
        },
    },
});

export const { incremented, amoutAdded } = counterSlice.actions;
export default counterSlice.reducer;