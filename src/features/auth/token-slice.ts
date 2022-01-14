import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 

interface TokenState {
    value: string|null
}

const initialState: TokenState = { value: null };

const tokenSlice = createSlice({
    name: 'tokenSlice',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string|null>) {
            state.value = action.payload;
        }
    }
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;