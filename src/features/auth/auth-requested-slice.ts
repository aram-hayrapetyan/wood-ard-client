import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    value: boolean;
}

const initialState: AuthState = { value: false };

const authStateSlice = createSlice({
    name: 'authState',
    initialState,
    reducers: {
        authSending(state, action: PayloadAction<boolean>) {
            state.value = action.payload;
        },
    },
});

export const { authSending } = authStateSlice.actions;
export default authStateSlice.reducer;